export type Role = 'FE' | 'BE' | 'QA' | 'SL' | 'SM';
export type GraphicMode = 'performance' | 'quality';

export interface JiraTicket {
  key: string;
  title: string;
  status: 'In Progress' | 'In Review' | 'Done' | 'To Do';
  storyPoints: number;
  priority: 'Highest' | 'High' | 'Medium' | 'Low';
}

export interface BitbucketInfo {
  repo: string;
  branch: string;
  activePR: string | null;
  prStatus: 'OPEN' | 'MERGED' | 'CHANGES_REQUESTED' | null;
  lastCommit: string;
  sonarScore: number;
}

export interface Employee {
  id: string;
  pn: string;
  name: string;
  shortName?: string;
  isStanding?: boolean;
  role: Role;
  avatarColor: string;
  deskPosition: [number, number, number];
  rotationY: number;
  status: 'active' | 'blocked' | 'idle' | 'testing' | 'deploying';
  speechBubble: string;
  isBlocker: boolean;
  jiraTickets: JiraTicket[];
  bitbucket: BitbucketInfo;
}

export interface DocumentApprovals {
  brd: boolean;
  sitSignOff: boolean;
  uatSignOff: boolean;
  secmanSignOff: boolean;
  rfcDeployment: boolean;
}

export interface SquadMetrics {
  totalStoryPoints: number;
  completedStoryPoints: number;
  defects: {
    p1: number;
    p2: number;
    p3: number;
  };
  approvals: DocumentApprovals;
  pipeline: {
    stage: 'DEV' | 'SIT' | 'UAT' | 'SECMAN' | 'PROD_READY';
    health: 'green' | 'yellow' | 'red';
    sonarCoverage: number;
  };
}

export interface Squad {
  id: string;
  name: string;
  alias: string;
  leadPN: string;
  sprint: string;
  sprintGoal: string;
  zoneCenter: [number, number, number];
  zoneColor: string;
  metrics: SquadMetrics;
  members: Employee[];
}

export interface Playbook {
  id: string;
  title: string;
  schedule: string;
  description: string;
  status: 'active' | 'ready' | 'running';
  tag: string;
}

// =============================================================================
// Real Jira export (scripts/atlassian/fetch_jira_user.py -> output/jira_<pn>.json)
// =============================================================================
export interface JiraPerson {
  username: string | null;
  displayName: string | null;
}

export interface JiraIssue {
  key: string;
  url: string;
  summary: string | null;
  type: string | null;
  isSubtask: boolean;
  status: string | null;
  /** Jira status category key: 'new' | 'indeterminate' | 'done'. */
  statusCategory: string | null;
  priority: string | null;
  assignee: JiraPerson | null;
  reporter: JiraPerson | null;
  storyPoints: number | null;
  sprints: string[];
  epicLink: string | null;
  parent: string | null;
  resolution: string | null;
  created: string | null;
  updated: string | null;
  /** Missing in exports made before labels were fetched. */
  labels?: string[];
  /** Only on defectsAndSubtasks: how the user relates to the issue. */
  roles?: Array<'reporter' | 'assignee'>;
}

export interface JiraSprint {
  id: number;
  name: string | null;
  state: string | null;
  goal: string | null;
  boardId: number | null;
  startDate: string | null;
  endDate: string | null;
}

export interface JiraUserExport {
  generatedAt: string;
  jiraUrl: string;
  user: { username: string; displayName: string | null };
  activeSprints: JiraSprint[];
  defectsAndSubtasks: JiraIssue[];
  assignedWork: JiraIssue[];
  sprintStoriesAndEpics: JiraIssue[];
}

/** scripts/atlassian/fetch_jira_sprint.py -> output/sprint_<id>.json (whole sprint, every person). */
export interface JiraSprintExport {
  generatedAt: string;
  jiraUrl: string;
  boardId: number;
  sprint: JiraSprint;
  epics: JiraIssue[];
  /** Story + Task issues. */
  stories: JiraIssue[];
  /** "Sub-task" children of stories (parent = story key). */
  subtasks: JiraIssue[];
  /** "Defect Task" children of stories (parent = story key). */
  defects: JiraIssue[];
}
