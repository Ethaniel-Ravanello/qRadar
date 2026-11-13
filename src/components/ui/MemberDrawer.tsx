import React, { useMemo, useState } from 'react';
import {
  X,
  AlertTriangle,
  CheckCircle,
  Send,
  GitBranch,
  GitPullRequest,
  ShieldCheck,
  Clock,
  FolderKanban,
  ListTodo,
  Code2,
  Bug,
  Layers,
  ListChecks,
} from 'lucide-react';
import type { Employee, Squad } from '../../types';
import { getJiraExport, sprintExports } from '../../data/jiraData';
import { buildPersonTree, stageOf, type EpicNode } from '../../data/sprintBreakdown';
import { UNKNOWN_PN } from '../../data/realSquads';
import { JiraSections } from './JiraSections';
import { SprintBreakdown } from './SprintBreakdown';
import { SprintHeader } from './SprintHeader';
import { MEMBER_DRAWER_WIDTH } from './layout';

interface MemberDrawerProps {
  employee: Employee | null;
  squad: Squad | null;
  onClose: () => void;
  onResolveBlocker: (empId: string) => void;
}

// =============================================================================
// Member drawer: full-height panel, 30% of the screen, on the right.
//   Header (who) -> Sprint context + key numbers -> Tabs (Sprint / Issues / Code)
// =============================================================================

const ROLE_LABEL: Record<string, string> = {
  SL: 'Squad Lead',
  SM: 'Scrum Master',
  FE: 'Frontend Engineer',
  BE: 'Backend Engineer',
  QA: 'QA Engineer',
};

type TabId = 'sprint' | 'issues' | 'code';

/** Summary card, fixed ~92px tall so the row stays even. */
const Stat: React.FC<{ label: string; icon?: React.ReactNode; value: React.ReactNode; sub?: React.ReactNode }> = ({
  label,
  icon,
  value,
  sub,
}) => (
  <div className="flex h-[92px] min-w-0 flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3">
    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
      {icon}
      {label}
    </div>
    <div className="text-2xl font-semibold leading-none tabular-nums text-white">{value}</div>
    <div className="truncate text-xs text-slate-400">{sub}</div>
  </div>
);

/** Person-level totals for the selected sprint. */
const summarize = (tree: EpicNode[]) => {
  const stories = tree.flatMap((e) => e.stories);
  const subtasks = stories.flatMap((s) => s.subtasks);
  const defects = stories.flatMap((s) => s.defects);
  const openDefects = defects.filter((d) => stageOf(d) !== 'Done');
  return {
    epics: tree.length,
    stories: stories.length,
    subtasks: subtasks.length,
    subtasksDone: subtasks.filter((s) => stageOf(s) === 'Done').length,
    defects: defects.length,
    openDefects: openDefects.length,
    sit: stories.reduce((n, s) => n + s.defectCounts.SIT, 0),
    uat: stories.reduce((n, s) => n + s.defectCounts.UAT, 0),
  };
};

// -----------------------------------------------------------------------------
// Content for one person. Keyed by employee id, so tab/sprint state resets per person.
// -----------------------------------------------------------------------------
const DrawerContent: React.FC<Omit<MemberDrawerProps, 'employee'> & { employee: Employee }> = ({
  employee,
  squad,
  onClose,
  onResolveBlocker,
}) => {
  const pn = employee.pn;
  const jiraExport = getJiraExport(pn);

  // Only the sprints of this person's squad board (all sprints for mock squads without a board).
  const boardId = squad?.boardId;
  const boardSprints = useMemo(
    () =>
      boardId === undefined
        ? sprintExports
        : sprintExports.filter((e) => e.boardId === boardId || e.sprint.boardId === boardId),
    [boardId]
  );
  const defaultSprintId = (boardSprints.find((e) => e.sprint.state?.toLowerCase() === 'active') ?? boardSprints[0])
    ?.sprint.id;
  const [sprintId, setSprintId] = useState(defaultSprintId);
  const sprintData = boardSprints.find((e) => e.sprint.id === sprintId) ?? boardSprints[0];
  const tree = useMemo(() => (sprintData ? buildPersonTree(sprintData, pn) : []), [sprintData, pn]);
  const stats = useMemo(() => summarize(tree), [tree]);

  const tabs: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
    ...(sprintData ? [{ id: 'sprint' as const, label: 'Sprint', icon: <FolderKanban className="w-4 h-4" /> }] : []),
    { id: 'issues', label: 'Issues', icon: <ListTodo className="w-4 h-4" /> },
    { id: 'code', label: 'Code', icon: <Code2 className="w-4 h-4" /> },
  ];
  const [tab, setTab] = useState<TabId>(tabs[0].id);

  const headerSprint = sprintData?.sprint ?? jiraExport?.activeSprints[0];
  const syncedAt = sprintData?.generatedAt ?? jiraExport?.generatedAt;

  return (
    <>
      {/* ---------------------------------------------------------------- Compact header */}
      <header className="space-y-3 border-b border-slate-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ring-1 ring-white/15"
            style={{ backgroundColor: employee.avatarColor }}
            aria-hidden="true"
          >
            {employee.role}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-semibold leading-tight text-white">{employee.name}</h2>
            <p className="mt-0.5 flex items-center gap-x-2 overflow-hidden whitespace-nowrap text-xs text-slate-400">
              <span className="shrink-0">{ROLE_LABEL[employee.role] ?? employee.role}</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="shrink-0 font-mono">PN {pn}</span>
              {squad && (
                <>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="flex min-w-0 items-center gap-1.5" title={squad.name}>
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: squad.zoneColor }} />
                    <span className="truncate">Squad {squad.alias}</span>
                  </span>
                </>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup detail"
            className="-mr-2 rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {employee.isBlocker ? (
          <div className="space-y-3 rounded-xl border border-red-500/50 bg-red-950/50 p-3.5">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 w-4 h-4 shrink-0 text-red-400" aria-hidden="true" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-red-300">Blocker aktif</div>
                <p className="mt-0.5 text-[13px] text-red-100">{employee.speechBubble}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onResolveBlocker(employee.id)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" aria-hidden="true" />
                Resolve blocker
              </button>
              <button
                onClick={() => alert(`Mengirim pesan Slack/Teams ke ${employee.name} (PN ${pn})...`)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 cursor-pointer"
              >
                <Send className="w-4 h-4 text-sky-400" aria-hidden="true" />
                Ping
              </button>
            </div>
          </div>
        ) : (
          <p className="truncate text-xs italic text-slate-500" title={employee.speechBubble}>
            {employee.speechBubble}
          </p>
        )}
      </header>

      {/* ---------------------------------------------------------------- Body (scrolls with the panel) */}
        {(headerSprint || sprintData) && (
          <div className="space-y-4 px-6 py-5">
            {headerSprint && (
              <SprintHeader
                key={headerSprint.id}
                sprint={headerSprint}
                options={boardSprints.map((e) => e.sprint)}
                onSelect={sprintData ? setSprintId : undefined}
              />
            )}
            {sprintData && (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                <Stat
                  label="Story"
                  icon={<Layers className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />}
                  value={stats.stories}
                  sub={`${stats.epics} epic`}
                />
                <Stat
                  label="Sub-task"
                  icon={<ListChecks className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />}
                  value={
                    <>
                      {stats.subtasksDone}
                      <span className="text-base font-normal text-slate-500">/{stats.subtasks}</span>
                    </>
                  }
                  sub={stats.subtasks ? `${Math.round((stats.subtasksDone / stats.subtasks) * 100)}% done` : 'belum ada'}
                />
                <Stat
                  label="Defect open"
                  icon={<Bug className="h-3.5 w-3.5 text-red-400" aria-hidden="true" />}
                  value={stats.openDefects}
                  sub={`dari ${stats.defects} defect`}
                />
                <Stat
                  label="SIT · UAT"
                  value={
                    <>
                      <span className="text-amber-300">{stats.sit}</span>
                      <span className="text-base font-normal text-slate-600"> / </span>
                      <span className="text-fuchsia-300">{stats.uat}</span>
                    </>
                  }
                  sub="defect berlabel"
                />
              </div>
            )}
          </div>
        )}

        {/* Tabs stick to the top while the content scrolls underneath. */}
        <div
          role="tablist"
          aria-label="Detail member"
          className="sticky top-0 z-10 flex gap-6 border-b border-slate-800 bg-[#0b0e17]/95 px-6 backdrop-blur"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              id={`drawer-tab-${t.id}`}
              role="tab"
              aria-selected={tab === t.id}
              aria-controls={`drawer-panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`-mb-px flex items-center gap-1.5 border-b-2 py-3 text-[13px] font-medium transition cursor-pointer ${
                tab === t.id
                  ? 'border-sky-400 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`drawer-panel-${tab}`} aria-labelledby={`drawer-tab-${tab}`} className="px-6 py-5">
          {tab === 'sprint' && sprintData && <SprintBreakdown key={sprintData.sprint.id} tree={tree} pn={pn} />}

          {tab === 'issues' &&
            (jiraExport ? (
              <JiraSections data={jiraExport} />
            ) : pn === UNKNOWN_PN ? (
              <p className="py-6 text-center text-[13px] text-slate-500">
                PN belum diketahui, jadi data Jira belum bisa diambil. Tambahkan PN di squads.json atau jalankan
                sync_qla.py.
              </p>
            ) : sprintExports.length > 0 ? (
              <p className="py-6 text-center text-[13px] text-slate-500">
                Belum ada ekspor Jira untuk PN {pn}.
              </p>
            ) : (
              <MockTickets employee={employee} />
            ))}

          {tab === 'code' && <CodePanel employee={employee} />}
        </div>

        {syncedAt && (
          <p className="px-6 pb-6 text-[11px] text-slate-600">
            Data Jira · sync {new Date(syncedAt).toLocaleString('id-ID')}
          </p>
        )}
    </>
  );
};

// -----------------------------------------------------------------------------
// Fallbacks for data that isn't connected yet (clearly marked as sample data).
// -----------------------------------------------------------------------------
const SampleBadge = () => (
  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[11px] font-medium text-slate-400">Data contoh</span>
);

const MockTickets: React.FC<{ employee: Employee }> = ({ employee }) => (
  <section className="space-y-2.5">
    <div className="flex items-center justify-between">
      <h3 className="text-[13px] font-semibold text-slate-200">Jira tickets</h3>
      <SampleBadge />
    </div>
    <ul className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 divide-y divide-slate-800">
      {employee.jiraTickets.map((t) => (
        <li key={t.key} className="flex items-start justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <div className="font-mono text-xs font-semibold text-sky-400">{t.key}</div>
            <p className="mt-1 text-[13px] text-slate-200">{t.title}</p>
            <div className="mt-1.5 text-xs text-slate-500">
              {t.priority} · {t.storyPoints} SP
            </div>
          </div>
          <span className="shrink-0 rounded-md bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">{t.status}</span>
        </li>
      ))}
    </ul>
  </section>
);

const CodePanel: React.FC<{ employee: Employee }> = ({ employee }) => {
  const bb = employee.bitbucket;
  const rows: Array<{ id: string; icon?: React.ReactNode; label: string; value: React.ReactNode }> = [
    {
      id: 'repo',
      icon: <GitBranch className="w-4 h-4 text-blue-400" aria-hidden="true" />,
      label: 'Repository',
      value: <span className="font-mono text-slate-200">{bb.repo}</span>,
    },
    { id: 'branch', label: 'Branch', value: <span className="font-mono text-sky-300">{bb.branch}</span> },
    {
      id: 'sonar',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />,
      label: 'SonarQube',
      value: <span className="font-semibold text-emerald-300">{bb.sonarScore}% pass</span>,
    },
    {
      id: 'commit',
      icon: <Clock className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      label: 'Last commit',
      value: bb.lastCommit,
    },
  ];

  return (
    <section className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-semibold text-slate-200">Bitbucket & code quality</h3>
        <SampleBadge />
      </div>
      <dl className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 divide-y divide-slate-800 text-[13px]">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <dt className="flex items-center gap-2 text-slate-400">
              {r.icon}
              {r.label}
            </dt>
            <dd className="text-right text-slate-300">{r.value}</dd>
          </div>
        ))}
        <div className="px-4 py-3">
          <dt className="flex items-center gap-2 text-slate-400">
            <GitPullRequest className="w-4 h-4 text-emerald-400" aria-hidden="true" /> Pull request
          </dt>
          <dd className="mt-1.5">
            {bb.activePR ? (
              <div className="flex items-start justify-between gap-3">
                <span className="text-slate-200">{bb.activePR}</span>
                <span className="shrink-0 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                  {bb.prStatus}
                </span>
              </div>
            ) : (
              <span className="text-slate-500">Tidak ada PR terbuka.</span>
            )}
          </dd>
        </div>
      </dl>
    </section>
  );
};

// -----------------------------------------------------------------------------
export const MemberDrawer: React.FC<MemberDrawerProps> = ({ employee, squad, onClose, onResolveBlocker }) => {
  // Keep showing the last person while the panel slides out.
  const [cachedEmployee, setCachedEmployee] = useState<Employee | null>(employee);
  if (employee && employee !== cachedEmployee) {
    setCachedEmployee(employee);
  }
  const isOpen = Boolean(employee);
  const displayEmployee = employee || cachedEmployee;

  return (
    <aside
      aria-label={displayEmployee ? `Detail ${displayEmployee.name}` : 'Detail member'}
      inert={!isOpen}
      style={{
        width: MEMBER_DRAWER_WIDTH,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 360ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}
      // One scroll container for the whole panel; the tab bar inside is sticky.
      className="fixed inset-y-0 right-0 z-50 max-w-full overflow-y-auto overscroll-contain border-l border-slate-800 bg-[#0b0e17]/[0.97] shadow-2xl shadow-black/60 backdrop-blur-2xl"
    >
      {displayEmployee && (
        <DrawerContent
          key={displayEmployee.id}
          employee={displayEmployee}
          squad={squad}
          onClose={onClose}
          onResolveBlocker={onResolveBlocker}
        />
      )}
    </aside>
  );
};
