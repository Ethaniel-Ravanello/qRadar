"""Smoke test: confirm both PATs authenticate. Prints only who you are, never the token.

Run from the repo root:
    .venv\\Scripts\\python.exe scripts\\atlassian\\check_connection.py
"""

import sys

from client import get_confluence, get_jira


def check(label: str, fn) -> bool:
    try:
        print(f"[OK]   {label}: {fn()}")
        return True
    except Exception as exc:  # report and keep checking the other service
        print(f"[FAIL] {label}: {type(exc).__name__}: {exc}")
        return False


def jira_user() -> str:
    me = get_jira().myself()
    return f"{me.get('displayName')} ({me.get('name')})"


def confluence_user() -> str:
    me = get_confluence().get_current_user()
    return f"{me.get('displayName')} ({me.get('username')})"


if __name__ == "__main__":
    results = [check("Jira", jira_user), check("Confluence", confluence_user)]
    sys.exit(0 if all(results) else 1)
