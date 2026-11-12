"""Export a board's sprints as Epic -> Story/Task -> Sub-task + Defect breakdowns.

One file per sprint (scripts/atlassian/output/sprint_<id>.json, git-ignored). It
holds the WHOLE sprint (every person), so the web app can filter per person:
  - stories   : Story/Task issues in the sprint (plus parents of in-sprint children)
  - subtasks  : "Sub-task" children of those stories   (Sub-documentation ignored)
  - defects   : "Defect Task" children of those stories
  - epics     : epics referenced by the stories' Epic Link
Children are linked via `parent`; stories to epics via `epicLink`.

Usage (from the repo root):
    # active + future sprints + the 2 most recent closed sprints of board 3484
    .venv\\Scripts\\python.exe scripts\\atlassian\\fetch_jira_sprint.py --board 3484
    # specific sprint(s) only
    .venv\\Scripts\\python.exe scripts\\atlassian\\fetch_jira_sprint.py --board 3484 --sprint 11331
"""

import argparse
import json
import sys
from datetime import datetime, timezone

from client import get_jira
from fetch_jira_user import BASE_FIELDS, OUTPUT_DIR, discover_fields, jql_list, serialize

# Issue type names on BRI Jira (matched case-insensitively).
STORY_TYPES = {"story", "task"}
SUBTASK_TYPES = {"sub-task"}
DEFECT_TYPES = {"defect task"}

KEY_CHUNK = 80  # keys per `key in (...)` / `parent in (...)` query (keeps URLs short)


def type_of(issue: dict) -> str:
    return str(((issue.get("fields") or {}).get("issuetype") or {}).get("name", "")).casefold()


def parent_of(issue: dict) -> str | None:
    return ((issue.get("fields") or {}).get("parent") or {}).get("key")


def board_sprints(jira, board_id: int, states: str) -> list:
    sprints, start = [], 0
    while True:
        page = jira.get_all_sprints_from_board(board_id, state=states, start=start, limit=50) or {}
        values = page.get("values") or []
        sprints.extend(values)
        if page.get("isLast", True) or not values:
            return sprints
        start += len(values)


def pick_sprints(jira, board_id: int, sprint_ids: list | None, closed: int, future: bool) -> list:
    states = "active,closed,future" if future else "active,closed"
    sprints = board_sprints(jira, board_id, states)
    if sprint_ids:
        wanted = {int(s) for s in sprint_ids}
        found = [s for s in sprints if int(s["id"]) in wanted]
        missing = wanted - {int(s["id"]) for s in found}
        if missing:
            print(f"[WARN] Sprint(s) not on board {board_id}: {sorted(missing)}")
        return found
    by_state = lambda st: [s for s in sprints if str(s.get("state", "")).lower() == st]  # noqa: E731
    recent_closed = sorted(by_state("closed"), key=lambda s: int(s["id"]), reverse=True)[:closed]
    return by_state("active") + (by_state("future") if future else []) + recent_closed


def export_sprint(jira, sprint: dict, board_id: int, fields_map: dict) -> None:
    fields = BASE_FIELDS + [v for v in fields_map.values() if v]
    search = lambda jql: jira.jql_get_list_of_tickets(jql, fields=fields)  # noqa: E731

    def by_keys(clause: str, keys) -> list:
        keys = sorted(set(keys))
        found = []
        for i in range(0, len(keys), KEY_CHUNK):
            found += search(f"{clause} in {jql_list(keys[i:i + KEY_CHUNK])}")
        return found

    sid = int(sprint["id"])
    in_sprint = search(f"sprint = {sid} ORDER BY rank ASC")

    stories = {i["key"]: i for i in in_sprint if type_of(i) in STORY_TYPES}
    children = {i["key"]: i for i in in_sprint if type_of(i) in SUBTASK_TYPES | DEFECT_TYPES}

    # Children whose story isn't itself in the sprint (carry-over): pull the story in.
    missing_parents = {p for c in children.values() if (p := parent_of(c)) and p not in stories}
    for parent in by_keys("key", missing_parents) if missing_parents else []:
        if type_of(parent) in STORY_TYPES:
            stories[parent["key"]] = parent

    # Every child of every story, even if the child itself isn't tagged with the sprint.
    for child in by_keys("parent", stories) if stories else []:
        if type_of(child) in SUBTASK_TYPES | DEFECT_TYPES:
            children.setdefault(child["key"], child)
    children = {k: c for k, c in children.items() if parent_of(c) in stories}

    epic_field = fields_map["epicLink"]
    epic_keys = {e for s in stories.values() if epic_field and (e := s["fields"].get(epic_field))}
    epics = by_keys("key", epic_keys) if epic_keys else []

    base_url = jira.url.rstrip("/")
    ser = lambda issues: [serialize(i, fields_map, base_url) for i in issues]  # noqa: E731
    result = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "jiraUrl": base_url,
        "boardId": board_id,
        "sprint": {
            "id": sid,
            "name": sprint.get("name"),
            "state": sprint.get("state"),
            "goal": sprint.get("goal"),
            "boardId": sprint.get("originBoardId", board_id),
            "startDate": sprint.get("startDate"),
            "endDate": sprint.get("endDate"),
        },
        "epics": ser(epics),
        "stories": ser(stories.values()),
        "subtasks": ser(c for c in children.values() if type_of(c) in SUBTASK_TYPES),
        "defects": ser(c for c in children.values() if type_of(c) in DEFECT_TYPES),
    }

    OUTPUT_DIR.mkdir(exist_ok=True)
    out = OUTPUT_DIR / f"sprint_{sid}.json"
    out.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
    print(
        f"[OK] {sprint.get('name')} ({sprint.get('state')}): {len(result['epics'])} epic, "
        f"{len(result['stories'])} story/task, {len(result['subtasks'])} sub-task, "
        f"{len(result['defects'])} defect -> {out}"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Export sprint Epic/Story/Sub-task/Defect breakdowns to JSON.")
    parser.add_argument("--board", type=int, required=True, help="Jira board ID (e.g. 3484 for Hermes).")
    parser.add_argument("--sprint", type=int, action="append", help="Sprint ID. Repeat for several. Default: auto.")
    parser.add_argument("--closed", type=int, default=2, help="How many recent closed sprints (default 2).")
    parser.add_argument("--no-future", action="store_true", help="Skip future sprints.")
    args = parser.parse_args()

    jira = get_jira()
    fields_map = discover_fields(jira)
    sprints = pick_sprints(jira, args.board, args.sprint, args.closed, not args.no_future)
    if not sprints:
        print(f"[FAIL] No sprints found on board {args.board}.")
        return 1

    failures = 0
    for sprint in sprints:
        try:
            export_sprint(jira, sprint, args.board, fields_map)
        except Exception as exc:  # one bad sprint shouldn't stop the rest
            print(f"[FAIL] {sprint.get('name')} ({sprint.get('id')}): {type(exc).__name__}: {exc}")
            failures += 1
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
