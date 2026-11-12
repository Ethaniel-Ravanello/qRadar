"""Export one or more users' Jira sprint data to JSON.

For each user it collects:
  1. activeSprints          - active sprints the user has work in
  2. defectsAndSubtasks     - Defects/Bugs + Sub-tasks the user REPORTED or is ASSIGNED
                              (each issue lists which via "roles")
  3. assignedWork           - Stories/Tasks/Epics assigned to the user
  4. sprintStoriesAndEpics  - every Story/Epic in those active sprints (whole team)

Scope for 2 + 3: unresolved issues, plus anything in an open sprint (so items
closed during the current sprint still show up). Change SCOPE_JQL to adjust.

Usage (from the repo root):
    .venv\\Scripts\\python.exe scripts\\atlassian\\fetch_jira_user.py --user "Ethaniel Ravanello"
    .venv\\Scripts\\python.exe scripts\\atlassian\\fetch_jira_user.py --user 90185980 --user "Another Name"

Output: scripts/atlassian/output/jira_<username>.json (git-ignored: contains real data).
"""

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

from client import get_jira

OUTPUT_DIR = Path(__file__).resolve().parent / "output"

# Issue type names differ per Jira instance; only the ones that exist are used.
DEFECT_TYPES = ("Defect", "Bug")
WORK_TYPES = ("Story", "Task", "Epic")
SPRINT_BACKLOG_TYPES = ("Story", "Epic")

SCOPE_JQL = "(resolution = Unresolved OR sprint in openSprints())"

BASE_FIELDS = [
    "summary", "issuetype", "status", "priority", "assignee", "reporter",
    "created", "updated", "resolution", "parent", "labels",
]


# -----------------------------------------------------------------------------
# Helpers
# -----------------------------------------------------------------------------
def jql_str(value: str) -> str:
    """Quote a value for JQL (escapes backslashes and double quotes)."""
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def jql_list(values) -> str:
    return "(" + ", ".join(jql_str(v) for v in values) + ")"


def resolve_user(jira, query: str) -> dict:
    """Find exactly one active user by username, display name or email."""
    candidates = jira.user_find_by_user_string(username=query, limit=20) or []
    exact = [
        u for u in candidates
        if query.casefold() in (str(u.get("name", "")).casefold(), str(u.get("displayName", "")).casefold())
    ]
    matches = exact or candidates
    if len(matches) == 1:
        return matches[0]
    if not matches:
        raise SystemExit(f'No Jira user found for "{query}".')
    options = "\n".join(f'  - {u.get("displayName")} (username: {u.get("name")})' for u in matches)
    raise SystemExit(f'"{query}" matches several users; pass the exact username:\n{options}')


def discover_fields(jira) -> dict:
    """Custom field IDs vary per instance; look them up by schema/name."""
    found = {"sprint": None, "storyPoints": None, "epicLink": None}
    for f in jira.get_all_fields():
        custom = (f.get("schema") or {}).get("custom", "")
        name = str(f.get("name", "")).casefold()
        if custom.endswith(":gh-sprint"):
            found["sprint"] = f["id"]
        elif custom.endswith(":gh-epic-link"):
            found["epicLink"] = f["id"]
        elif name in ("story points", "story point estimate") and not found["storyPoints"]:
            found["storyPoints"] = f["id"]
    if not found["sprint"]:
        raise SystemExit("Sprint field not found. Is Jira Software (Agile) enabled on this instance?")
    return found


def existing_types(jira, wanted) -> list:
    available = {str(t.get("name", "")).casefold(): t["name"] for t in jira.get_issue_types()}
    return [available[w.casefold()] for w in wanted if w.casefold() in available]


_SPRINT_ATTR = re.compile(r"(\w+)=([^,\]]*)")


def parse_sprints(raw) -> list:
    """Sprint field values come back as dicts (newer DC) or legacy
    'com.atlassian.greenhopper...Sprint@x[id=1,state=ACTIVE,name=...]' strings."""
    sprints = []
    for value in raw or []:
        if isinstance(value, dict):
            sprints.append({"id": value.get("id"), "name": value.get("name"), "state": value.get("state")})
        elif isinstance(value, str):
            attrs = dict(_SPRINT_ATTR.findall(value))
            sprints.append({"id": attrs.get("id"), "name": attrs.get("name"), "state": attrs.get("state")})
    return [s for s in sprints if s["id"]]


def person(value) -> dict | None:
    if not value:
        return None
    return {"username": value.get("name"), "displayName": value.get("displayName")}


def serialize(issue: dict, fields_map: dict, base_url: str) -> dict:
    f = issue.get("fields", {})
    return {
        "key": issue["key"],
        "url": f"{base_url}/browse/{issue['key']}",
        "summary": f.get("summary"),
        "type": (f.get("issuetype") or {}).get("name"),
        "isSubtask": bool((f.get("issuetype") or {}).get("subtask")),
        "status": (f.get("status") or {}).get("name"),
        "statusCategory": ((f.get("status") or {}).get("statusCategory") or {}).get("key"),
        "priority": (f.get("priority") or {}).get("name"),
        "assignee": person(f.get("assignee")),
        "reporter": person(f.get("reporter")),
        "storyPoints": f.get(fields_map["storyPoints"]) if fields_map["storyPoints"] else None,
        "sprints": [s["name"] for s in parse_sprints(f.get(fields_map["sprint"]))],
        "epicLink": f.get(fields_map["epicLink"]) if fields_map["epicLink"] else None,
        "parent": (f.get("parent") or {}).get("key"),
        "labels": f.get("labels") or [],
        "resolution": (f.get("resolution") or {}).get("name"),
        "created": f.get("created"),
        "updated": f.get("updated"),
    }


# -----------------------------------------------------------------------------
# Per-user export
# -----------------------------------------------------------------------------
def export_user(jira, query: str, fields_map: dict, types: dict) -> Path:
    user = resolve_user(jira, query)
    username = user["name"]
    u = jql_str(username)
    base_url = jira.url.rstrip("/")
    fields = BASE_FIELDS + [v for v in fields_map.values() if v]

    def search(jql: str) -> list:
        return jira.jql_get_list_of_tickets(jql, fields=fields)

    jqls = {}

    # 2. Defects/Bugs + Sub-tasks the user reported or is assigned to.
    type_clauses = ["issuetype in subTaskIssueTypes()"]
    if types["defect"]:
        type_clauses.insert(0, f"issuetype in {jql_list(types['defect'])}")
    jqls["defectsAndSubtasks"] = (
        f"({' OR '.join(type_clauses)}) AND (reporter = {u} OR assignee = {u}) AND {SCOPE_JQL} "
        "ORDER BY updated DESC"
    )

    # 3. Stories/Tasks/Epics assigned to the user.
    jqls["assignedWork"] = (
        f"issuetype in {jql_list(types['work'])} AND assignee = {u} AND {SCOPE_JQL} ORDER BY updated DESC"
        if types["work"] else None
    )

    # 1. Active sprints = open sprints containing any of the user's issues.
    jqls["userSprintIssues"] = f"sprint in openSprints() AND (assignee = {u} OR reporter = {u})"
    sprint_ids = set()
    for issue in search(jqls["userSprintIssues"]):
        for s in parse_sprints(issue["fields"].get(fields_map["sprint"])):
            if str(s.get("state", "")).upper() == "ACTIVE":
                sprint_ids.add(str(s["id"]))
    active_sprints = []
    for sprint_id in sorted(sprint_ids, key=int):
        s = jira.get_sprint(sprint_id)
        active_sprints.append({
            "id": s.get("id"),
            "name": s.get("name"),
            "state": s.get("state"),
            "goal": s.get("goal"),
            "boardId": s.get("originBoardId"),
            "startDate": s.get("startDate"),
            "endDate": s.get("endDate"),
        })

    # 4. Every Story/Epic in those active sprints.
    jqls["sprintStoriesAndEpics"] = (
        f"sprint in ({', '.join(sorted(sprint_ids, key=int))}) AND issuetype in {jql_list(types['sprintBacklog'])} "
        "ORDER BY rank ASC"
        if sprint_ids and types["sprintBacklog"] else None
    )

    def run(name: str) -> list:
        return [serialize(i, fields_map, base_url) for i in search(jqls[name])] if jqls[name] else []

    defects = run("defectsAndSubtasks")
    for item in defects:
        item["roles"] = [
            role for role, who in (("reporter", item["reporter"]), ("assignee", item["assignee"]))
            if who and who["username"] == username
        ]

    result = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "jiraUrl": base_url,
        "user": {"username": username, "displayName": user.get("displayName")},
        "activeSprints": active_sprints,
        "defectsAndSubtasks": defects,
        "assignedWork": run("assignedWork"),
        "sprintStoriesAndEpics": run("sprintStoriesAndEpics"),
        "jql": jqls,  # kept for transparency / debugging
    }

    OUTPUT_DIR.mkdir(exist_ok=True)
    safe_name = re.sub(r"[^\w.-]", "_", username)
    out = OUTPUT_DIR / f"jira_{safe_name}.json"
    out.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")

    print(
        f"[OK] {user.get('displayName')} ({username}): "
        f"{len(active_sprints)} active sprint(s), {len(defects)} defect/sub-task, "
        f"{len(result['assignedWork'])} assigned, {len(result['sprintStoriesAndEpics'])} story/epic in sprint -> {out}"
    )
    return out


def main() -> int:
    parser = argparse.ArgumentParser(description="Export users' Jira sprint data to JSON.")
    parser.add_argument(
        "--user", action="append", required=True,
        help="Username, display name or email. Repeat for multiple users.",
    )
    args = parser.parse_args()

    jira = get_jira()
    fields_map = discover_fields(jira)
    types = {
        "defect": existing_types(jira, DEFECT_TYPES),
        "work": existing_types(jira, WORK_TYPES),
        "sprintBacklog": existing_types(jira, SPRINT_BACKLOG_TYPES),
    }

    failures = 0
    for query in args.user:
        try:
            export_user(jira, query, fields_map, types)
        except SystemExit as exc:  # user-level problem: report and continue with the rest
            print(f"[FAIL] {query}: {exc}")
            failures += 1
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
