import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { JiraIssue } from '../../types';
import { isMine, stageOf, type Stage } from '../../data/sprintBreakdown';

// =============================================================================
// Shared Jira building blocks for the member drawer. Visual hierarchy:
//   Story ID = cyan, Epic ID = purple, status = badge, title = white (dominant),
//   SP / meta = secondary text, defect = red accent (never red body text).
// =============================================================================

const STAGE_CLASS: Record<Stage, string> = {
  'To Do': 'bg-slate-700/60 text-slate-300',
  'In Progress': 'bg-blue-500/15 text-blue-300',
  'Unit Testing': 'bg-cyan-500/15 text-cyan-300',
  'Ready for Testing': 'bg-amber-500/15 text-amber-300',
  SIT: 'bg-orange-500/15 text-orange-300',
  UAT: 'bg-fuchsia-500/15 text-fuchsia-300',
  Done: 'bg-emerald-500/15 text-emerald-300',
};

export const StatusChip: React.FC<{ issue: JiraIssue }> = ({ issue }) => {
  const stage = stageOf(issue);
  return (
    <span
      title={stage}
      className={`shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-medium ${STAGE_CLASS[stage]}`}
    >
      {issue.status ?? stage}
    </span>
  );
};

type Tone = 'story' | 'epic';
const TONE_CLASS: Record<Tone, string> = { story: 'text-cyan-400', epic: 'text-purple-300' };

/** Plain (non-link) issue key, for use inside toggle buttons. */
export const IssueKey: React.FC<{ issueKey: string; tone?: Tone; className?: string }> = ({
  issueKey,
  tone = 'story',
  className = '',
}) => <span className={`font-mono text-xs font-semibold ${TONE_CLASS[tone]} ${className}`}>{issueKey}</span>;

/** Issue key as a link to Jira (for rows that aren't toggles). */
export const IssueLink: React.FC<{ issue: JiraIssue; tone?: Tone }> = ({ issue, tone = 'story' }) => (
  <a
    href={issue.url}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className={`font-mono text-xs font-semibold hover:underline ${TONE_CLASS[tone]}`}
  >
    {issue.key}
    <span className="sr-only"> (buka di Jira, tab baru)</span>
  </a>
);

/** Icon-only "open in Jira" link, placed next to a toggle button. */
export const JiraLinkIcon: React.FC<{ issue: JiraIssue }> = ({ issue }) => (
  <a
    href={issue.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Buka ${issue.key} di Jira (tab baru)`}
    title={`Buka ${issue.key} di Jira`}
    className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-200"
  >
    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
  </a>
);

export const MeBadge: React.FC = () => (
  <span className="shrink-0 rounded bg-indigo-500/15 px-1.5 py-px text-[11px] font-semibold text-indigo-300">Me</span>
);

interface IssueRowProps {
  issue: JiraIssue;
  /** Person whose drawer this is (for the "Me" badge and hiding their own name). */
  pn: string;
  highlightMine?: boolean;
  showType?: boolean;
  accent?: 'defect';
  /** Extra meta items (labels, roles...) appended to the single meta line. */
  children?: React.ReactNode;
}

/** One issue as a compact list row. Render inside a `<ul className="divide-y ...">`. */
export const IssueRow: React.FC<IssueRowProps> = ({
  issue,
  pn,
  highlightMine = true,
  showType = false,
  accent,
  children,
}) => {
  const mine = highlightMine && isMine(issue, pn);
  const otherAssignee = issue.assignee && issue.assignee.username !== pn ? issue.assignee.displayName : null;
  const meta = [
    showType ? issue.type : null,
    issue.parent ? `↳ ${issue.parent}` : null,
    otherAssignee ? `@${otherAssignee}` : null,
    issue.storyPoints != null ? `${issue.storyPoints} SP` : null,
  ].filter((m): m is string => Boolean(m));
  const hasMeta = mine || meta.length > 0 || Boolean(children);

  return (
    <li className="relative flex items-start gap-3 py-2.5 pl-4 pr-3">
      {accent === 'defect' && (
        <span aria-hidden="true" className="absolute inset-y-2 left-0 w-[3px] rounded-r bg-red-500/80" />
      )}
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[13px] leading-snug text-slate-100" title={issue.summary ?? ''}>
          <IssueLink issue={issue} />
          <span className="ml-2">{issue.summary}</span>
        </p>
        {hasMeta && (
          <div className="mt-1 flex items-center gap-x-3 overflow-hidden whitespace-nowrap text-xs text-slate-500">
            {mine && <MeBadge />}
            {meta.map((m) => (
              <span key={m} className="shrink-0">
                {m}
              </span>
            ))}
            {children}
          </div>
        )}
      </div>
      <StatusChip issue={issue} />
    </li>
  );
};
