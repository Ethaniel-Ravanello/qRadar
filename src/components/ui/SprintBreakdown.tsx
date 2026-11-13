import React, { useMemo, useState } from 'react';
import { Bug, ChevronRight, ListChecks, Search } from 'lucide-react';
import type { JiraIssue } from '../../types';
import {
  PHASES,
  STAGES,
  phasesOf,
  stageOf,
  type DefectCounts,
  type DefectPhase,
  type EpicNode,
  type Stage,
  type StoryNode,
} from '../../data/sprintBreakdown';
import { IssueKey, IssueRow, JiraLinkIcon, MeBadge, StatusChip } from './JiraIssueRow';
import { Collapse } from './Collapse';

// =============================================================================
// "Sprint" tab: search + status filter, then Epic accordions (epics with active
// work open by default) -> compact Story cards (one open at a time) ->
// Sub-tasks (status filter) then Defects (SIT/UAT filter).
// =============================================================================

const isOpenWork = (i: JiraIssue) => stageOf(i) !== 'Done';
const storyIsActive = (n: StoryNode) => isOpenWork(n.story) || n.subtasks.some(isOpenWork) || n.defects.some(isOpenWork);
const epicId = (e: EpicNode) => e.key ?? '__no-epic';

const matchesQuery = (node: StoryNode, epic: EpicNode, q: string) => {
  if (!q) return true;
  const issues = [node.story, ...node.subtasks, ...node.defects, ...(epic.epic ? [epic.epic] : [])];
  return issues.some((i) => i.key.toLowerCase().includes(q) || (i.summary ?? '').toLowerCase().includes(q));
};

/** Single-line meta: red bug icon + count, then SIT / UAT badges. */
const DefectMeta: React.FC<{ counts: DefectCounts }> = ({ counts }) => (
  <>
    <span
      className={`inline-flex shrink-0 items-center gap-1 ${counts.total ? 'text-slate-300' : ''}`}
      title={`${counts.total} defect`}
    >
      <Bug className={`h-3.5 w-3.5 ${counts.total ? 'text-red-400' : 'text-slate-600'}`} aria-hidden="true" />
      {counts.total}
      <span className="sr-only"> defect</span>
    </span>
    {counts.SIT > 0 && (
      <span className="shrink-0 rounded bg-amber-500/15 px-1.5 py-px text-[11px] font-medium text-amber-300">
        SIT {counts.SIT}
      </span>
    )}
    {counts.UAT > 0 && (
      <span className="shrink-0 rounded bg-fuchsia-500/15 px-1.5 py-px text-[11px] font-medium text-fuchsia-300">
        UAT {counts.UAT}
      </span>
    )}
    {counts.total > 0 && counts.Unlabeled > 0 && <span className="shrink-0">{counts.Unlabeled} no label</span>}
  </>
);

const META_LINE = 'mt-1 flex items-center gap-x-3 overflow-hidden whitespace-nowrap text-xs text-slate-500';

/** Segmented filter: "All" + each option that occurs, with counts. Hidden if only one bucket. */
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
  const chips: Array<[T | 'All', number]> = [
    ['All', total],
    ...options.filter((o) => counts.get(o)).map((o) => [o, counts.get(o)!] as [T, number]),
  ];
  if (chips.length <= 2) return null;
  return (
    <div className="flex flex-wrap gap-1" role="group" aria-label={label}>
      {chips.map(([opt, n]) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={`rounded-md px-2.5 py-1 text-xs transition cursor-pointer ${
            value === opt ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          {opt} <span className="tabular-nums opacity-60">{n}</span>
        </button>
      ))}
    </div>
  );
}

const countBy = <T extends string>(items: JiraIssue[], keyOf: (i: JiraIssue) => T[]) => {
  const m = new Map<T, number>();
  items.forEach((i) => keyOf(i).forEach((k) => m.set(k, (m.get(k) ?? 0) + 1)));
  return m;
};

const Group: React.FC<{
  icon: React.ReactNode;
  title: string;
  aside: React.ReactNode;
  filter: React.ReactNode;
  empty: string;
  children: React.ReactNode[];
}> = ({ icon, title, aside, filter, empty, children }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between gap-2">
      <h5 className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
        {icon}
        {title}
      </h5>
      <span className="flex items-center gap-x-3 text-xs text-slate-500">{aside}</span>
    </div>
    {filter}
    {children.length === 0 ? (
      <p className="text-xs text-slate-500">{empty}</p>
    ) : (
      <ul className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/40 divide-y divide-slate-800">
        {children}
      </ul>
    )}
  </div>
);

/** Sub-tasks then defects of the open story. Mounted per story, so filters reset on switch. */
const StoryDetail: React.FC<{ node: StoryNode; pn: string }> = ({ node, pn }) => {
  const [stage, setStage] = useState<Stage | 'All'>('All');
  const [phase, setPhase] = useState<DefectPhase | 'All'>('All');

  const subtasks = stage === 'All' ? node.subtasks : node.subtasks.filter((s) => stageOf(s) === stage);
  const defects = phase === 'All' ? node.defects : node.defects.filter((d) => phasesOf(d).includes(phase));
  const done = node.subtasks.filter((s) => stageOf(s) === 'Done').length;

  return (
    <div className="space-y-4 border-t border-slate-800 px-3 py-3">
      <Group
        icon={<ListChecks className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />}
        title="Sub-task"
        aside={`${done}/${node.subtasks.length} done`}
        filter={
          <FilterChips
            label="Filter sub-task per status"
            options={STAGES}
            counts={countBy(node.subtasks, (s) => [stageOf(s)])}
            value={stage}
            onChange={setStage}
          />
        }
        empty="Tidak ada sub-task."
      >
        {subtasks.map((s) => (
          <IssueRow key={s.key} issue={s} pn={pn} />
        ))}
      </Group>

      <Group
        icon={<Bug className="h-3.5 w-3.5 text-red-400" aria-hidden="true" />}
        title="Defect"
        aside={<DefectMeta counts={node.defectCounts} />}
        filter={
          <FilterChips
            label="Filter defect per fase"
            options={PHASES}
            counts={countBy(node.defects, phasesOf)}
            value={phase}
            onChange={setPhase}
          />
        }
        empty="Tidak ada defect."
      >
        {defects.map((d) => (
          <IssueRow key={d.key} issue={d} pn={pn} accent="defect">
            {(d.labels ?? []).map((l) => (
              <span key={l} className="shrink-0 rounded bg-slate-800 px-1.5 py-px font-mono text-[11px] text-slate-400">
                {l}
              </span>
            ))}
            {phasesOf(d).includes('Unlabeled') && <span className="shrink-0 text-amber-400/80">tanpa label SIT/UAT</span>}
          </IssueRow>
        ))}
      </Group>
    </div>
  );
};

const StoryCard: React.FC<{ node: StoryNode; pn: string; open: boolean; onToggle: () => void }> = ({
  node,
  pn,
  open,
  onToggle,
}) => {
  const { story } = node;
  const done = node.subtasks.filter((s) => stageOf(s) === 'Done').length;
  return (
    <li
      className={`overflow-hidden rounded-lg border transition-colors ${
        open ? 'border-cyan-500/40 bg-slate-950/70' : 'border-slate-800 bg-slate-950/40'
      }`}
    >
      <div className="flex items-start gap-1 pr-2 hover:bg-slate-800/30">
        <button
          onClick={onToggle}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-start gap-2.5 py-2.5 pl-3 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500"
        >
          <ChevronRight
            className={`mt-0.5 h-4 w-4 shrink-0 text-slate-500 transition-transform ${open ? 'rotate-90' : ''}`}
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-[13px] font-medium leading-snug text-white" title={story.summary ?? ''}>
              <IssueKey issueKey={story.key} className="mr-2" />
              {story.summary}
            </p>
            <div className={META_LINE}>
              {story.assignee?.username === pn && <MeBadge />}
              {story.storyPoints != null && <span className="shrink-0">{story.storyPoints} SP</span>}
              <span className="shrink-0">
                {done}/{node.subtasks.length} sub-task
              </span>
              <DefectMeta counts={node.defectCounts} />
            </div>
          </div>
        </button>
        <div className="flex shrink-0 items-center gap-0.5 pt-2.5">
          <StatusChip issue={story} />
          <JiraLinkIcon issue={story} />
        </div>
      </div>
      <Collapse open={open}>
        <StoryDetail key={story.key} node={node} pn={pn} />
      </Collapse>
    </li>
  );
};

// -----------------------------------------------------------------------------
export const SprintBreakdown: React.FC<{ tree: EpicNode[]; pn: string }> = ({ tree, pn }) => {
  const [query, setQuery] = useState('');
  const [stage, setStage] = useState<Stage | 'All'>('All');
  /** Explicit open/closed per epic; unset epics fall back to the default rule. */
  const [epicOverrides, setEpicOverrides] = useState<Record<string, boolean>>({});
  const [openStory, setOpenStory] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const filtering = q !== '' || stage !== 'All';

  const filtered = useMemo(
    () =>
      tree
        .map((e) => ({
          ...e,
          stories: e.stories.filter((n) => (stage === 'All' || stageOf(n.story) === stage) && matchesQuery(n, e, q)),
        }))
        .filter((e) => e.stories.length > 0),
    [tree, q, stage]
  );

  // Default: open epics that still have active work (fallback: the first epic).
  const activeEpics = useMemo(() => {
    const ids = new Set(tree.filter((e) => e.stories.some(storyIsActive)).map(epicId));
    if (ids.size === 0 && tree[0]) ids.add(epicId(tree[0]));
    return ids;
  }, [tree]);
  // While searching/filtering, every matching epic opens so results are visible.
  const isEpicOpen = (e: EpicNode) => epicOverrides[epicId(e)] ?? (filtering || activeEpics.has(epicId(e)));
  const allOpen = filtered.length > 0 && filtered.every(isEpicOpen);
  const setAll = (open: boolean) =>
    setEpicOverrides((prev) => ({ ...prev, ...Object.fromEntries(filtered.map((e) => [epicId(e), open])) }));

  const stageOptions = STAGES.filter((s) => tree.some((e) => e.stories.some((n) => stageOf(n.story) === s)));
  const storyCount = filtered.reduce((n, e) => n + e.stories.length, 0);

  if (tree.length === 0) {
    return <p className="py-6 text-center text-[13px] text-slate-500">Tidak ada story yang melibatkan orang ini di sprint ini.</p>;
  }

  return (
    <div className="space-y-4">
      {/* Search + status filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari story, epic, atau defect…"
              aria-label="Cari issue"
              className="w-full rounded-lg border border-slate-800 bg-slate-900/70 py-2 pl-9 pr-3 text-[13px] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <label htmlFor="story-stage-filter" className="sr-only">
            Filter status story
          </label>
          <select
            id="story-stage-filter"
            value={stage}
            onChange={(e) => setStage(e.target.value as Stage | 'All')}
            className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-[13px] text-slate-200 cursor-pointer hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="All" className="bg-slate-900">
              Semua status
            </option>
            {stageOptions.map((s) => (
              <option key={s} value={s} className="bg-slate-900">
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            {filtered.length} epic · {storyCount} story
          </span>
          <div className="flex items-center gap-3">
            {filtering && (
              <button
                onClick={() => {
                  setQuery('');
                  setStage('All');
                }}
                className="text-sky-400 hover:text-sky-300 cursor-pointer"
              >
                Reset filter
              </button>
            )}
            {filtered.length > 1 && (
              <button onClick={() => setAll(!allOpen)} className="text-slate-400 hover:text-slate-200 cursor-pointer">
                {allOpen ? 'Tutup semua' : 'Buka semua'}
              </button>
            )}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-6 text-center text-[13px] text-slate-500">Tidak ada yang cocok dengan filter.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((epicNode) => {
            const id = epicId(epicNode);
            const open = isEpicOpen(epicNode);
            const panelId = `epic-panel-${id}`;
            return (
              <section key={id} className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
                <div className="flex items-start gap-1 pr-3 hover:bg-slate-800/30">
                  <button
                    onClick={() => setEpicOverrides((prev) => ({ ...prev, [id]: !open }))}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex min-w-0 flex-1 items-start gap-3 py-3 pl-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500"
                  >
                    <ChevronRight
                      className={`mt-1 h-4 w-4 shrink-0 text-slate-500 transition-transform ${open ? 'rotate-90' : ''}`}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-300/70">Epic</span>
                        {epicNode.key && <IssueKey issueKey={epicNode.key} tone="epic" />}
                      </div>
                      <h4 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-white">
                        {epicNode.epic?.summary ?? epicNode.key ?? 'Tanpa Epic'}
                      </h4>
                      <div className={META_LINE}>
                        <span className="shrink-0">
                          {epicNode.stories.length} story
                          {epicNode.sprintStoryCount !== epicNode.stories.length && ` dari ${epicNode.sprintStoryCount}`}
                        </span>
                        <DefectMeta counts={epicNode.sprintDefectCounts} />
                      </div>
                    </div>
                  </button>
                  {epicNode.epic && (
                    <div className="flex shrink-0 items-center gap-0.5 pt-3">
                      <StatusChip issue={epicNode.epic} />
                      <JiraLinkIcon issue={epicNode.epic} />
                    </div>
                  )}
                </div>

                <Collapse open={open} id={panelId}>
                  <ul className="space-y-2 border-t border-slate-800 p-3">
                    {epicNode.stories.map((node) => {
                      const storyOpen = node.story.key === openStory;
                      return (
                        <StoryCard
                          key={node.story.key}
                          node={node}
                          pn={pn}
                          open={storyOpen}
                          onToggle={() => setOpenStory(storyOpen ? null : node.story.key)}
                        />
                      );
                    })}
                  </ul>
                </Collapse>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};
