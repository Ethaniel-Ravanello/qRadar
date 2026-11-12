import React, { useMemo, useState } from 'react';
import { Bug, ChevronDown, ExternalLink, FolderKanban, ListChecks } from 'lucide-react';
import type { JiraIssue, JiraSprintExport } from '../../types';
import {
  PHASES,
  STAGES,
  buildPersonTree,
  isMine,
  phasesOf,
  stageOf,
  type DefectCounts,
  type DefectPhase,
  type Stage,
  type StoryNode,
} from '../../data/sprintBreakdown';

// =============================================================================
// Sprint breakdown for one person: sprint picker -> Epic -> Story (one open at a
// time) -> Sub-tasks (stage filter) + Defects (SIT/UAT filter).
// =============================================================================

const STAGE_CLASS: Record<Stage, string> = {
  'To Do': 'bg-slate-700 text-slate-300',
  'In Progress': 'bg-blue-500/20 text-blue-300',
  'Unit Testing': 'bg-cyan-500/20 text-cyan-300',
  'Ready for Testing': 'bg-amber-500/20 text-amber-300',
  SIT: 'bg-orange-500/20 text-orange-300',
  UAT: 'bg-fuchsia-500/20 text-fuchsia-300',
  Done: 'bg-emerald-500/20 text-emerald-300',
};

const PHASE_CLASS: Record<DefectPhase, string> = {
  SIT: 'bg-orange-500/15 text-orange-300 border-orange-500/40',
  UAT: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/40',
  Unlabeled: 'bg-slate-700/60 text-slate-400 border-slate-600',
};

const StageChip: React.FC<{ issue: JiraIssue }> = ({ issue }) => {
  const stage = stageOf(issue);
  return (
    <span
      className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${STAGE_CLASS[stage]}`}
      title={issue.status ?? ''}
    >
      {issue.status ?? stage}
    </span>
  );
};

const IssueLink: React.FC<{ issue: JiraIssue; className?: string }> = ({ issue, className = '' }) => (
  <a
    href={issue.url}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className={`font-mono font-bold text-sky-400 hover:underline inline-flex items-center gap-1 ${className}`}
  >
    {issue.key}
    <ExternalLink className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
    <span className="sr-only">(opens Jira in a new tab)</span>
  </a>
);

const DefectSummary: React.FC<{ counts: DefectCounts; prefix?: string }> = ({ counts, prefix }) => (
  <span className="text-[10px] text-slate-400 font-mono">
    {prefix}
    <Bug className="inline w-3 h-3 text-red-400 -mt-0.5" aria-hidden="true" /> {counts.total}
    {counts.total > 0 && (
      <>
        {' '}· <span className="text-orange-300">SIT {counts.SIT}</span> · <span className="text-fuchsia-300">UAT {counts.UAT}</span>
        {counts.Unlabeled > 0 && <> · <span className="text-slate-400">no label {counts.Unlabeled}</span></>}
      </>
    )}
  </span>
);

/** Toggle chips: "All" + each option that occurs, with counts. */
function FilterChips<T extends string>({
  label,
  options,
  counts,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  counts: Map<T, number>;
  value: T | 'All';
  onChange: (v: T | 'All') => void;
}) {
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  const chips: Array<[T | 'All', number]> = [['All', total], ...options.filter((o) => counts.get(o)).map((o) => [o, counts.get(o)!] as [T, number])];
  return (
    <div className="flex flex-wrap gap-1" role="group" aria-label={label}>
      {chips.map(([opt, n]) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={`text-[10px] px-2 py-0.5 rounded-full border transition cursor-pointer ${
            value === opt
              ? 'bg-sky-500/20 border-sky-500/60 text-sky-200'
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          {opt} <span className="font-mono opacity-70">{n}</span>
        </button>
      ))}
    </div>
  );
}

const ChildRow: React.FC<{ issue: JiraIssue; pn: string; showLabels?: boolean }> = ({ issue, pn, showLabels }) => {
  const mine = isMine(issue, pn);
  return (
    <div
      className={`p-2 rounded-lg border space-y-1 ${
        mine ? 'bg-indigo-950/40 border-indigo-500/50' : 'bg-slate-900/60 border-slate-700/70'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <IssueLink issue={issue} className="text-[11px]" />
        <StageChip issue={issue} />
      </div>
      <p className="text-[11px] text-slate-200 leading-snug">{issue.summary}</p>
      <div className="flex items-center gap-1 flex-wrap text-[10px] text-slate-400">
        {mine && (
          <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold">
            Me
          </span>
        )}
        {issue.assignee?.displayName && <span>@{issue.assignee.displayName}</span>}
        {showLabels &&
          phasesOf(issue).map((p) => (
            <span key={p} className={`px-1.5 py-0.5 rounded border font-semibold ${PHASE_CLASS[p]}`}>
              {p === 'Unlabeled' ? 'No SIT/UAT label' : p}
            </span>
          ))}
        {showLabels &&
          (issue.labels?.length ? issue.labels : []).map((l) => (
            <span key={l} className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">
              {l}
            </span>
          ))}
      </div>
    </div>
  );
};

const countBy = <T extends string>(items: JiraIssue[], keyOf: (i: JiraIssue) => T[]) => {
  const m = new Map<T, number>();
  items.forEach((i) => keyOf(i).forEach((k) => m.set(k, (m.get(k) ?? 0) + 1)));
  return m;
};

/** Sub-tasks + defects of the selected story. Mounted per story, so filters reset on switch. */
const StoryDetail: React.FC<{ node: StoryNode; pn: string }> = ({ node, pn }) => {
  const [stage, setStage] = useState<Stage | 'All'>('All');
  const [phase, setPhase] = useState<DefectPhase | 'All'>('All');

  const subtasks = stage === 'All' ? node.subtasks : node.subtasks.filter((s) => stageOf(s) === stage);
  const defects = phase === 'All' ? node.defects : node.defects.filter((d) => phasesOf(d).includes(phase));
  const done = node.subtasks.filter((s) => stageOf(s) === 'Done').length;

  return (
    <div className="mt-2 pl-2 border-l-2 border-sky-800/60 space-y-3">
      <section className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
            <ListChecks className="w-3 h-3 text-sky-400" aria-hidden="true" /> Sub-tasks
          </h5>
          <span className="text-[10px] font-mono text-slate-400">
            {done}/{node.subtasks.length} done
          </span>
        </div>
        {node.subtasks.length > 0 && (
          <FilterChips label="Filter sub-tasks by status" options={STAGES} counts={countBy(node.subtasks, (s) => [stageOf(s)])} value={stage} onChange={setStage} />
        )}
        {subtasks.length === 0 ? (
          <p className="text-[10px] text-slate-500 italic">Tidak ada sub-task.</p>
        ) : (
          subtasks.map((s) => <ChildRow key={s.key} issue={s} pn={pn} />)
        )}
      </section>

      <section className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
            <Bug className="w-3 h-3 text-red-400" aria-hidden="true" /> Defects
          </h5>
          <DefectSummary counts={node.defectCounts} />
        </div>
        {node.defects.length > 0 && (
          <FilterChips label="Filter defects by phase" options={PHASES} counts={countBy(node.defects, phasesOf)} value={phase} onChange={setPhase} />
        )}
        {defects.length === 0 ? (
          <p className="text-[10px] text-slate-500 italic">Tidak ada defect.</p>
        ) : (
          defects.map((d) => <ChildRow key={d.key} issue={d} pn={pn} showLabels />)
        )}
      </section>
    </div>
  );
};

// -----------------------------------------------------------------------------
export const SprintBreakdown: React.FC<{ pn: string; exports: JiraSprintExport[] }> = ({ pn, exports }) => {
  const defaultId = (exports.find((e) => e.sprint.state?.toLowerCase() === 'active') ?? exports[0]).sprint.id;
  const [sprintId, setSprintId] = useState(defaultId);
  // undefined = nothing picked yet (open the first story); null = user collapsed everything.
  const [openStory, setOpenStory] = useState<string | null | undefined>(undefined);

  const data = exports.find((e) => e.sprint.id === sprintId) ?? exports[0];
  const tree = useMemo(() => buildPersonTree(data, pn), [data, pn]);
  // Default to the first story; a stale key (after switching sprint) falls back too.
  const allStories = tree.flatMap((e) => e.stories);
  const selectedKey =
    openStory === null
      ? null
      : allStories.some((n) => n.story.key === openStory)
      ? openStory
      : allStories[0]?.story.key ?? null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <FolderKanban className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
          <span>Sprint Breakdown</span>
        </h3>
        <label className="sr-only" htmlFor="sprint-picker">
          Sprint
        </label>
        <select
          id="sprint-picker"
          value={data.sprint.id}
          onChange={(e) => setSprintId(Number(e.target.value))}
          className="max-w-[60%] text-[11px] bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 cursor-pointer hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {exports.map((e) => (
            <option key={e.sprint.id} value={e.sprint.id}>
              {e.sprint.name} ({e.sprint.state})
            </option>
          ))}
        </select>
      </div>

      {tree.length === 0 ? (
        <p className="text-[11px] text-slate-500 italic">Tidak ada story yang melibatkan orang ini di sprint ini.</p>
      ) : (
        tree.map((epicNode) => (
          <div key={epicNode.key ?? 'no-epic'} className="rounded-2xl bg-slate-800/50 border border-slate-700/70 p-3 space-y-2">
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Epic</span>
                {epicNode.epic && <StageChip issue={epicNode.epic} />}
              </div>
              {epicNode.epic ? (
                <p className="text-xs text-slate-100 font-semibold leading-snug">
                  <IssueLink issue={epicNode.epic} className="text-[11px] mr-1" /> {epicNode.epic.summary}
                </p>
              ) : (
                <p className="text-xs text-slate-300 font-semibold">{epicNode.key ?? 'Tanpa Epic'}</p>
              )}
              <DefectSummary counts={epicNode.sprintDefectCounts} prefix={`${epicNode.sprintStoryCount} story di sprint · `} />
            </div>

            <ul className="space-y-1.5">
              {epicNode.stories.map((node) => {
                const open = node.story.key === selectedKey;
                return (
                  <li
                    key={node.story.key}
                    className={`rounded-xl border p-2 transition-colors ${
                      open ? 'bg-slate-900/70 border-sky-700/70' : 'bg-slate-900/40 border-slate-700/60 hover:border-slate-500 hover:bg-slate-900/70'
                    }`}
                  >
                    <button
                      onClick={() => setOpenStory(open ? null : node.story.key)}
                      aria-expanded={open}
                      className="w-full text-left space-y-1 cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 min-w-0">
                          <ChevronDown className={`w-3 h-3 shrink-0 text-slate-400 transition-transform ${open ? '' : '-rotate-90'}`} aria-hidden="true" />
                          <IssueLink issue={node.story} className="text-[11px]" />
                          {node.story.assignee?.username === pn && (
                            <span className="text-[9px] px-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">Me</span>
                          )}
                        </span>
                        <StageChip issue={node.story} />
                      </div>
                      <p className="text-[11px] text-slate-200 leading-snug">{node.story.summary}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>
                          {node.subtasks.length} sub-task
                          {node.story.storyPoints != null && <> · {node.story.storyPoints} SP</>}
                        </span>
                        <DefectSummary counts={node.defectCounts} />
                      </div>
                    </button>
                    {open && <StoryDetail key={node.story.key} node={node} pn={pn} />}
                  </li>
                );
              })}
            </ul>
          </div>
        ))
      )}
    </section>
  );
};
