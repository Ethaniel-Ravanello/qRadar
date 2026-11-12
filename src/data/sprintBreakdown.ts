import type { JiraIssue, JiraSprintExport } from '../types';

// =============================================================================
// Sprint breakdown logic (pure, no React): status stages, SIT/UAT defect
// phases from labels, and the per-person Epic -> Story -> children tree.
// =============================================================================

/** Workflow stages, in board order. */
export const STAGES = ['To Do', 'In Progress', 'Unit Testing', 'Ready for Testing', 'SIT', 'UAT', 'Done'] as const;
export type Stage = (typeof STAGES)[number];

const STATUS_TO_STAGE: Record<string, Stage> = {
  open: 'To Do',
  'to do': 'To Do',
  backlog: 'To Do',
  'in progress': 'In Progress',
  'in development': 'In Progress',
  'unit testing': 'Unit Testing',
  'ready for testing': 'Ready for Testing',
  sit: 'SIT',
  uat: 'UAT',
  done: 'Done',
  closed: 'Done',
  resolved: 'Done',
};

/** Map a Jira status to a stage; unknown statuses fall back to the status category. */
export const stageOf = (issue: JiraIssue): Stage =>
  STATUS_TO_STAGE[(issue.status ?? '').trim().toLowerCase()] ??
  (issue.statusCategory === 'done' ? 'Done' : issue.statusCategory === 'new' ? 'To Do' : 'In Progress');

// -----------------------------------------------------------------------------
// Defect phase from labels. Label names are team-specific (e.g. DEFECT_<FEATURE>_SIT),
// so any label containing SIT / UAT as a standalone token counts. Edit here to change.
// -----------------------------------------------------------------------------
export const PHASES = ['SIT', 'UAT', 'Unlabeled'] as const;
export type DefectPhase = (typeof PHASES)[number];

const PHASE_PATTERNS: Array<[Exclude<DefectPhase, 'Unlabeled'>, RegExp]> = [
  ['SIT', /(^|[^a-z])sit([^a-z]|$)/i],
  ['UAT', /(^|[^a-z])uat([^a-z]|$)/i],
];

export const phasesOf = (defect: JiraIssue): DefectPhase[] => {
  const labels = defect.labels ?? [];
  const found = PHASE_PATTERNS.filter(([, re]) => labels.some((l) => re.test(l))).map(([phase]) => phase);
  return found.length ? found : ['Unlabeled'];
};

export type DefectCounts = Record<DefectPhase, number> & { total: number };

export const countDefects = (defects: JiraIssue[]): DefectCounts => {
  const counts: DefectCounts = { total: defects.length, SIT: 0, UAT: 0, Unlabeled: 0 };
  defects.forEach((d) => phasesOf(d).forEach((p) => counts[p]++));
  return counts;
};

// -----------------------------------------------------------------------------
// Per-person tree
// -----------------------------------------------------------------------------
export const isMine = (issue: JiraIssue, pn: string) =>
  issue.assignee?.username === pn || issue.reporter?.username === pn;

export interface StoryNode {
  story: JiraIssue;
  subtasks: JiraIssue[];
  defects: JiraIssue[];
  defectCounts: DefectCounts;
}

export interface EpicNode {
  /** null = stories without an Epic Link. */
  key: string | null;
  epic: JiraIssue | null;
  /** Only stories that involve the person. */
  stories: StoryNode[];
  /** Whole sprint (every person) for this epic. */
  sprintStoryCount: number;
  sprintDefectCounts: DefectCounts;
}

/**
 * Epics (and their stories) in the sprint that involve `pn`: a story counts when the
 * person is its assignee, or is assignee/reporter of any of its sub-tasks or defects.
 * Every story keeps ALL of its sub-tasks and defects.
 */
export function buildPersonTree(data: JiraSprintExport, pn: string): EpicNode[] {
  const childrenOf = (list: JiraIssue[]) => {
    const map = new Map<string, JiraIssue[]>();
    list.forEach((c) => c.parent && map.set(c.parent, [...(map.get(c.parent) ?? []), c]));
    return map;
  };
  const subtasksByStory = childrenOf(data.subtasks);
  const defectsByStory = childrenOf(data.defects);

  const nodes: StoryNode[] = data.stories.map((story) => {
    const defects = defectsByStory.get(story.key) ?? [];
    return { story, subtasks: subtasksByStory.get(story.key) ?? [], defects, defectCounts: countDefects(defects) };
  });

  const involves = (n: StoryNode) =>
    n.story.assignee?.username === pn || [...n.subtasks, ...n.defects].some((c) => isMine(c, pn));

  const epicsByKey = new Map(data.epics.map((e) => [e.key, e]));
  const groups = new Map<string | null, StoryNode[]>();
  nodes.forEach((n) => groups.set(n.story.epicLink, [...(groups.get(n.story.epicLink) ?? []), n]));

  return [...groups.entries()]
    .map(([key, all]): EpicNode => ({
      key,
      epic: key ? epicsByKey.get(key) ?? null : null,
      stories: all.filter(involves),
      sprintStoryCount: all.length,
      sprintDefectCounts: countDefects(all.flatMap((n) => n.defects)),
    }))
    .filter((e) => e.stories.length > 0)
    .sort((a, b) => (a.key === null ? 1 : b.key === null ? -1 : a.key.localeCompare(b.key)));
}
