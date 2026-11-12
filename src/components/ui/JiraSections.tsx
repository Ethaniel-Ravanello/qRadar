import React, { useState } from 'react';
import { Bug, CalendarDays, ChevronDown, ExternalLink, Flag, Layers, UserCheck } from 'lucide-react';
import type { JiraIssue, JiraSprint, JiraUserExport } from '../../types';

// =============================================================================
// Real Jira data for one user (from jira_<pn>.json), rendered in MemberDrawer.
// =============================================================================

const PREVIEW_COUNT = 5;
const DAY_MS = 24 * 60 * 60 * 1000;

const statusClass = (category: string | null) =>
  category === 'done'
    ? 'bg-emerald-500/20 text-emerald-300'
    : category === 'indeterminate'
    ? 'bg-blue-500/20 text-blue-300'
    : 'bg-slate-700 text-slate-300';

const priorityClass = (priority: string | null) => {
  switch (priority) {
    case 'Highest':
    case 'Blocker':
      return 'bg-red-500/20 text-red-300 border-red-500/40';
    case 'High':
      return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
    case 'Medium':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
    default:
      return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
  }
};

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';

const sumSP = (issues: JiraIssue[]) => issues.reduce((acc, i) => acc + (i.storyPoints ?? 0), 0);

// -----------------------------------------------------------------------------
const SprintCard: React.FC<{ sprint: JiraSprint; now: number }> = ({ sprint, now }) => {
  const start = sprint.startDate ? new Date(sprint.startDate).getTime() : NaN;
  const end = sprint.endDate ? new Date(sprint.endDate).getTime() : NaN;
  const hasRange = Number.isFinite(start) && Number.isFinite(end) && end > start;
  const totalDays = hasRange ? Math.round((end - start) / DAY_MS) : 0;
  const day = hasRange ? Math.min(totalDays, Math.max(1, Math.ceil((now - start) / DAY_MS))) : 0;
  const progress = hasRange ? Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100)) : 0;

  return (
    <div className="p-3.5 rounded-2xl bg-sky-950/40 border border-sky-800/60 space-y-2 text-xs">
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-sky-200 truncate" title={sprint.name ?? ''}>
          {sprint.name}
        </span>
        {hasRange && (
          <span className="shrink-0 text-[10px] font-mono text-sky-300 bg-sky-900/60 px-1.5 py-0.5 rounded">
            Day {day}/{totalDays}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
        <CalendarDays className="w-3 h-3" />
        <span>
          {formatDate(sprint.startDate)} – {formatDate(sprint.endDate)}
        </span>
      </div>
      {hasRange && (
        <div
          className="h-1.5 rounded-full bg-slate-800 overflow-hidden"
          role="progressbar"
          aria-label="Sprint progress"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full bg-sky-500" style={{ width: `${progress}%` }} />
        </div>
      )}
      {sprint.goal && (
        <div className="pt-1">
          <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
            Sprint Goal
          </span>
          <p className="text-[11px] text-slate-200 leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto pr-1">
            {sprint.goal}
          </p>
        </div>
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
const IssueRow: React.FC<{ issue: JiraIssue; username: string }> = ({ issue, username }) => (
  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/70 hover:border-slate-500 transition space-y-1.5">
    <div className="flex items-center justify-between gap-2">
      <a
        href={issue.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs font-bold text-sky-400 flex items-center gap-1 hover:underline"
      >
        {issue.key}
        <ExternalLink className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
        <span className="sr-only">(opens Jira in a new tab)</span>
      </a>
      <div className="flex items-center gap-1.5 shrink-0">
        {issue.priority && (
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${priorityClass(issue.priority)}`}>
            {issue.priority}
          </span>
        )}
        {issue.storyPoints != null && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono font-semibold">
            {issue.storyPoints} SP
          </span>
        )}
      </div>
    </div>
    <p className="text-xs text-slate-200 font-medium leading-snug">{issue.summary}</p>
    <div className="pt-1 flex items-center justify-between gap-2 text-[10px]">
      <div className="flex items-center gap-1 flex-wrap text-slate-400">
        <span className="px-1.5 py-0.5 rounded bg-slate-900/80 border border-slate-700">{issue.type}</span>
        {issue.parent && <span className="font-mono">↳ {issue.parent}</span>}
        {issue.roles?.map((role) => (
          <span key={role} className="px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            {role === 'reporter' ? 'Created by me' : 'Assigned to me'}
          </span>
        ))}
        {!issue.roles && issue.assignee && issue.assignee.username !== username && (
          <span className="truncate max-w-[110px]" title={issue.assignee.displayName ?? ''}>
            @{issue.assignee.displayName}
          </span>
        )}
      </div>
      <span className={`shrink-0 font-semibold px-2 py-0.5 rounded-full ${statusClass(issue.statusCategory)}`}>
        {issue.status}
      </span>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
interface IssueSectionProps {
  title: string;
  icon: React.ReactNode;
  issues: JiraIssue[];
  username: string;
  showSP?: boolean;
}

const IssueSection: React.FC<IssueSectionProps> = ({ title, icon, issues, username, showSP }) => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? issues : issues.slice(0, PREVIEW_COUNT);

  return (
    <section className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          {icon}
          <span>{title}</span>
          <span className="text-[10px] font-mono text-slate-500 normal-case">({issues.length})</span>
        </h3>
        {showSP && (
          <span className="text-[10px] text-slate-400 font-mono">
            Total SP: <strong className="text-sky-300">{sumSP(issues)}</strong>
          </span>
        )}
      </div>

      {issues.length === 0 ? (
        <p className="text-[11px] text-slate-500 italic">Tidak ada issue.</p>
      ) : (
        <div className="space-y-2">
          {visible.map((issue) => (
            <IssueRow key={issue.key} issue={issue} username={username} />
          ))}
        </div>
      )}

      {issues.length > PREVIEW_COUNT && (
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="w-full py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-[11px] font-semibold text-slate-300 flex items-center justify-center gap-1 transition cursor-pointer"
        >
          <span>{expanded ? 'Show less' : `Show all ${issues.length}`}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      )}
    </section>
  );
};

// -----------------------------------------------------------------------------
export const JiraSections: React.FC<{ data: JiraUserExport }> = ({ data }) => {
  // Read the clock once per mount (keeps render pure).
  const [now] = useState(() => Date.now());
  const username = data.user.username;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span className="flex items-center gap-1">
          <Flag className="w-3 h-3 text-emerald-400" />
          Live Jira data
        </span>
        <span>Synced {new Date(data.generatedAt).toLocaleString('id-ID')}</span>
      </div>

      <section className="space-y-2.5">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5 text-sky-400" />
          <span>Active Sprint</span>
        </h3>
        {data.activeSprints.length === 0 ? (
          <p className="text-[11px] text-slate-500 italic">Tidak ada sprint aktif.</p>
        ) : (
          data.activeSprints.map((s) => <SprintCard key={s.id} sprint={s} now={now} />)
        )}
      </section>

      <IssueSection
        title="Assigned to Me"
        icon={<UserCheck className="w-3.5 h-3.5 text-sky-400" />}
        issues={data.assignedWork}
        username={username}
        showSP
      />
      <IssueSection
        title="Defects & Sub-tasks"
        icon={<Bug className="w-3.5 h-3.5 text-red-400" />}
        issues={data.defectsAndSubtasks}
        username={username}
      />
      <IssueSection
        title="Sprint Stories & Epics"
        icon={<Layers className="w-3.5 h-3.5 text-purple-400" />}
        issues={data.sprintStoriesAndEpics}
        username={username}
        showSP
      />
    </div>
  );
};
