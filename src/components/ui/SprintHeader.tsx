import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import type { JiraSprint } from '../../types';

// =============================================================================
// Sprint context at the top of the member drawer: picker, day X/Y, progress,
// dates, and the (collapsible) sprint goal.
// =============================================================================

const DAY_MS = 24 * 60 * 60 * 1000;

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';

interface SprintHeaderProps {
  sprint: JiraSprint;
  /** Sprints to pick from; the picker only shows when there is more than one. */
  options?: Array<Pick<JiraSprint, 'id' | 'name' | 'state'>>;
  onSelect?: (id: number) => void;
}

export const SprintHeader: React.FC<SprintHeaderProps> = ({ sprint, options = [], onSelect }) => {
  // Read the clock once per mount (keeps render pure).
  const [now] = useState(() => Date.now());
  const start = sprint.startDate ? Date.parse(sprint.startDate) : NaN;
  const end = sprint.endDate ? Date.parse(sprint.endDate) : NaN;
  const hasRange = Number.isFinite(start) && Number.isFinite(end) && end > start;
  const totalDays = hasRange ? Math.round((end - start) / DAY_MS) : 0;
  const day = hasRange ? Math.min(totalDays, Math.max(1, Math.ceil((now - start) / DAY_MS))) : 0;
  const progress = hasRange ? Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100)) : 0;
  const daysLeft = hasRange ? Math.max(0, Math.ceil((end - now) / DAY_MS)) : 0;
  const isActive = sprint.state?.toLowerCase() === 'active';

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Sprint</div>
          {options.length > 1 && onSelect ? (
            <>
              <label htmlFor="drawer-sprint-picker" className="sr-only">
                Pilih sprint
              </label>
              <select
                id="drawer-sprint-picker"
                value={sprint.id}
                onChange={(e) => onSelect(Number(e.target.value))}
                className="-ml-1 mt-0.5 max-w-full truncate rounded-md bg-transparent px-1 py-0.5 text-[15px] font-semibold text-white cursor-pointer hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                {options.map((o) => (
                  <option key={o.id} value={o.id} className="bg-slate-900 text-sm font-normal">
                    {o.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <div className="mt-0.5 text-[15px] font-semibold text-white truncate">{sprint.name}</div>
          )}
        </div>
        {hasRange && (
          <span
            className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold tabular-nums ${
              isActive ? 'bg-sky-500/15 text-sky-300' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {isActive ? `Day ${day}/${totalDays}` : sprint.state}
          </span>
        )}
      </div>

      {hasRange && (
        <div className="space-y-1.5">
          <div
            className="h-1.5 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-label="Progress sprint"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="h-full rounded-full bg-sky-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
              {formatDate(sprint.startDate)} – {formatDate(sprint.endDate)}
            </span>
            {isActive && <span>{daysLeft} hari lagi</span>}
          </div>
        </div>
      )}

      {sprint.goal && (
        <details className="group rounded-lg bg-slate-900/60 border border-slate-800">
          <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-xs font-medium text-slate-300 hover:text-white [&::-webkit-details-marker]:hidden">
            Sprint goal
            <span className="text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true">
              ▾
            </span>
          </summary>
          <p className="whitespace-pre-line border-t border-slate-800 px-3 py-2.5 text-[13px] leading-relaxed text-slate-300">
            {sprint.goal}
          </p>
        </details>
      )}
    </div>
  );
};
