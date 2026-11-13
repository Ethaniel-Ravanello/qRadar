import type { Employee, Squad } from '../types';
import { sprintExports } from './jiraData';

// =============================================================================
// Real QLA squads, built from scripts/atlassian/squads.json (order, board,
// testers) and, when present, output/roster.json (testers resolved in Jira by
// sync_qla.py). Both files are git-ignored (real names/PNs); without
// squads.json the app falls back to the mock squads.
//
// Layout: squad i takes floor row i of the template squads (row 1 = front),
// and its testers take that row's first desks.
// =============================================================================

interface TesterConfig {
  name: string;
  pn?: string | null;
}
interface SquadConfig {
  name: string;
  boardId: number;
  testers: TesterConfig[];
}
interface RosterTester {
  name: string;
  pn: string | null;
  displayName: string | null;
  status: 'ok' | 'not_found' | 'ambiguous' | 'error';
  reason?: string;
}
interface Roster {
  squads: Array<{ name: string; testers: RosterTester[] }>;
}

const firstOf = <T,>(modules: Record<string, T>) => Object.values(modules)[0];
const config = firstOf(
  import.meta.glob<{ squads: SquadConfig[] }>('/scripts/atlassian/squads.json', { eager: true, import: 'default' })
);
const roster = firstOf(
  import.meta.glob<Roster>('/scripts/atlassian/output/roster.json', { eager: true, import: 'default' })
);

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** PN placeholder for testers not (yet) found in Jira. */
export const UNKNOWN_PN = '-';

export function buildRealSquads(templates: Squad[]): Squad[] | null {
  if (!config?.squads?.length) return null;

  return config.squads.slice(0, templates.length).map((cfg, row): Squad => {
    const tpl = templates[row];
    const id = `squad-${slug(cfg.name)}`;
    const resolved = roster?.squads.find((s) => s.name === cfg.name)?.testers ?? [];

    // Real sprint name/goal for the squad's board, when exported.
    const boardSprint = sprintExports.find(
      (e) => (e.boardId === cfg.boardId || e.sprint.boardId === cfg.boardId) && e.sprint.state?.toLowerCase() === 'active'
    )?.sprint;

    const members = cfg.testers.slice(0, tpl.members.length).map((t, i): Employee => {
      const r = resolved.find((x) => x.name === t.name);
      const pn = t.pn?.trim() || (r?.status === 'ok' ? r.pn : null) || UNKNOWN_PN;
      const name = (r?.status === 'ok' && r.displayName) || t.name;
      const seat = tpl.members[i];
      return {
        ...seat, // desk position, facing, avatar color, Bitbucket placeholder
        id: `${id}-qa-${i + 1}`,
        pn,
        name,
        shortName: name.split(' ')[0],
        isStanding: false,
        role: 'QA',
        status: 'active',
        isBlocker: false,
        jiraTickets: [],
        speechBubble:
          pn !== UNKNOWN_PN
            ? `QA Tester · Squad ${cfg.name}`
            : r?.reason ?? 'PN belum diketahui. Jalankan sync_qla.py untuk mencari berdasarkan nama.',
      };
    });

    return {
      ...tpl, // floor zone + (still mock) metrics
      id,
      name: `Squad ${cfg.name}`,
      alias: cfg.name,
      leadPN: '-',
      boardId: cfg.boardId,
      sprint: boardSprint?.name ?? tpl.sprint,
      sprintGoal: boardSprint?.goal ?? tpl.sprintGoal,
      members,
    };
  });
}
