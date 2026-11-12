"""Authenticated clients for BRI's self-hosted Jira and Confluence (Data Center).

Credentials come from environment variables (loaded from the repo-root `.env`),
never from source code. PATs are sent as `Authorization: Bearer <PAT>`, which is
how Server/Data Center personal access tokens authenticate.
"""

import os
from pathlib import Path

from atlassian import Confluence, Jira
from dotenv import load_dotenv

# Repo root = two levels up from scripts/atlassian/.
load_dotenv(Path(__file__).resolve().parents[2] / ".env")

DEFAULT_JIRA_URL = "https://jira.bri.co.id"
DEFAULT_CONFLUENCE_URL = "https://confluence.bri.co.id"
TIMEOUT_SECONDS = 30


def _require(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise RuntimeError(f"Missing {name}. Add it to the .env file at the repo root (see .env.example).")
    return value


def _verify_ssl() -> bool | str:
    # Corporate hosts are often signed by an internal CA. Point to its bundle
    # instead of turning verification off.
    return os.getenv("ATLASSIAN_CA_BUNDLE", "").strip() or True


def get_jira() -> Jira:
    return Jira(
        url=os.getenv("JIRA_URL", DEFAULT_JIRA_URL).strip(),
        token=_require("JIRA_PAT"),
        cloud=False,
        timeout=TIMEOUT_SECONDS,
        verify_ssl=_verify_ssl(),
    )


def get_confluence() -> Confluence:
    return Confluence(
        url=os.getenv("CONFLUENCE_URL", DEFAULT_CONFLUENCE_URL).strip(),
        token=_require("CONFLUENCE_PAT"),
        cloud=False,
        timeout=TIMEOUT_SECONDS,
        verify_ssl=_verify_ssl(),
    )
