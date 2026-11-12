import type { JiraSprintExport, JiraUserExport } from '../types';

// Every export produced by scripts/atlassian/fetch_jira_user.py is picked up
// automatically. The folder is git-ignored, so on a machine without exports
// this glob is simply empty and the app falls back to the mock tickets.
// NOTE: eager = bundled into the build. Don't deploy a build made with real
// exports present to a public host.
const modules = import.meta.glob<JiraUserExport>('/scripts/atlassian/output/jira_*.json', {
  eager: true,
  import: 'default',
});

/** Jira exports keyed by Jira username (= BRI PN). */
const byPn = new Map<string, JiraUserExport>(
  Object.values(modules).map((data) => [data.user.username, data])
);

export const getJiraExport = (pn: string): JiraUserExport | undefined => byPn.get(pn);

const sprintModules = import.meta.glob<JiraSprintExport>('/scripts/atlassian/output/sprint_*.json', {
  eager: true,
  import: 'default',
});

/** Sprint breakdowns, newest first (future > active > closed by start date). */
export const sprintExports: JiraSprintExport[] = Object.values(sprintModules).sort((a, b) => {
  const start = (s: JiraSprintExport) => (s.sprint.startDate ? Date.parse(s.sprint.startDate) : Infinity);
  return start(b) - start(a) || b.sprint.id - a.sprint.id;
});
