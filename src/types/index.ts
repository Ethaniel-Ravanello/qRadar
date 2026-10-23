export type Role = 'FE' | 'BE' | 'QA' | 'SL' | 'SM';

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
