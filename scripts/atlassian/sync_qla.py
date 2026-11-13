"""One command to refresh every QLA squad, driven by squads.json.

For each squad:
  1. Resolve every tester to a Jira user (by PN if given, otherwise by name).
  2. Export each resolved tester      -> output/jira_<pn>.json
  3. Export the squad board's sprints -> output/sprint_<id>.json
Then write output/roster.json: who was resolved, and who wasn't (with the reason).

Usage (from the repo root):
    .venv\\Scripts\\python.exe scripts\\atlassian\\sync_qla.py
    .venv\\Scripts\\python.exe scripts\\atlassian\\sync_qla.py --squad Leon --squad Hermes
    .venv\\Scripts\\python.exe scripts\\atlassian\\sync_qla.py --skip-sprints      # testers only
"""

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

from client import get_jira
from fetch_jira_sprint import export_sprint, pick_sprints
from fetch_jira_user import (
    DEFECT_TYPES,
    OUTPUT_DIR,
    SPRINT_BACKLOG_TYPES,
    WORK_TYPES,
    discover_fields,
    existing_types,
    export_user,
)

CONFIG = Path(__file__).resolve().parent / "squads.json"


def load_config() -> list:
    if not CONFIG.exists():
        raise SystemExit(f"Missing {CONFIG.name}. Copy squads.example.json to squads.json and fill it in.")
    squads = json.loads(CONFIG.read_text(encoding="utf-8")).get("squads") or []
    for s in squads:
        if not s.get("name") or not isinstance(s.get("boardId"), int):
            raise SystemExit(f"Every squad needs a 'name' and an integer 'boardId': {s}")
    return squads


def person(u: dict) -> dict:
    return {"pn": u.get("name"), "displayName": u.get("displayName")}


def find_user(jira, tester: dict) -> dict:
    """Resolve one tester. Never raises; failures are reported in the result."""
    name = str(tester.get("name", "")).strip()
    pn = str(tester.get("pn") or "").strip()
    base = {"name": name, "pn": None, "displayName": None}
    try:
        if pn:
            hits = jira.user_find_by_user_string(username=pn, limit=20) or []
            exact = [u for u in hits if str(u.get("name", "")) == pn]
            if exact:
                return {**base, **person(exact[0]), "status": "ok", "matchedBy": "pn"}
            return {**base, "status": "not_found", "reason": f"PN {pn} tidak ditemukan di Jira"}

        hits = [u for u in (jira.user_find_by_user_string(username=name, limit=20) or []) if u.get("active", True)]
        exact = [u for u in hits if str(u.get("displayName", "")).casefold() == name.casefold()]
        matches = exact or hits
        if len(matches) == 1:
            return {**base, **person(matches[0]), "status": "ok", "matchedBy": "name"}
        if not matches:
            return {**base, "status": "not_found", "reason": f'Nama "{name}" tidak ditemukan di Jira'}
        return {
            **base,
            "status": "ambiguous",
            "reason": f'Nama "{name}" cocok dengan {len(matches)} user; tambahkan PN di squads.json',
            "candidates": [person(u) for u in matches],
        }
    except Exception as exc:  # network/permission problems: report, keep going
        return {**base, "status": "error", "reason": f"{type(exc).__name__}: {exc}"}


def main() -> int:
    parser = argparse.ArgumentParser(description="Refresh Jira exports for every QLA squad in squads.json.")
    parser.add_argument("--squad", action="append", help="Only these squads (by name). Repeat for several.")
    parser.add_argument("--closed", type=int, default=2, help="Recent closed sprints per board (default 2).")
    parser.add_argument("--no-future", action="store_true", help="Skip future sprints.")
    parser.add_argument("--skip-users", action="store_true", help="Don't export per-tester files.")
    parser.add_argument("--skip-sprints", action="store_true", help="Don't export board sprints.")
    args = parser.parse_args()

    squads = load_config()
    if args.squad:
        wanted = {s.casefold() for s in args.squad}
        squads = [s for s in squads if s["name"].casefold() in wanted]
        if not squads:
            raise SystemExit(f"No squad named {args.squad} in {CONFIG.name}.")

    jira = get_jira()
    fields_map = discover_fields(jira)
    types = {
        "defect": existing_types(jira, DEFECT_TYPES),
        "work": existing_types(jira, WORK_TYPES),
        "sprintBacklog": existing_types(jira, SPRINT_BACKLOG_TYPES),
    }

    roster, failures = [], 0
    for squad in squads:
        print(f"\n=== {squad['name']} (board {squad['boardId']}) ===")
        testers = [find_user(jira, t) for t in squad.get("testers", [])]

        for t in testers:
            if t["status"] != "ok":
                print(f"[MISS] {t['name']}: {t['reason']}")
                continue
            if args.skip_users:
                continue
            try:
                export_user(jira, t["pn"], fields_map, types)
            except (Exception, SystemExit) as exc:
                t["exportError"] = str(exc)
                print(f"[FAIL] export {t['name']} ({t['pn']}): {exc}")
                failures += 1

        if not args.skip_sprints:
            try:
                for sprint in pick_sprints(jira, squad["boardId"], None, args.closed, not args.no_future):
                    export_sprint(jira, sprint, squad["boardId"], fields_map)
            except Exception as exc:
                print(f"[FAIL] board {squad['boardId']}: {type(exc).__name__}: {exc}")
                failures += 1

        roster.append({"name": squad["name"], "boardId": squad["boardId"], "testers": testers})

    OUTPUT_DIR.mkdir(exist_ok=True)
    out = OUTPUT_DIR / "roster.json"
    out.write_text(
        json.dumps({"generatedAt": datetime.now(timezone.utc).isoformat(), "squads": roster}, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    missing = [(s["name"], t) for s in roster for t in s["testers"] if t["status"] != "ok"]
    total = sum(len(s["testers"]) for s in roster)
    print(f"\n{total - len(missing)}/{total} tester ter-resolve -> {out}")
    if missing:
        print("Belum bisa diambil:")
        for squad_name, t in missing:
            print(f"  - [{squad_name}] {t['name']}: {t['reason']}")
            for c in t.get("candidates", []):
                print(f"      kandidat: {c['displayName']} (PN {c['pn']})")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
