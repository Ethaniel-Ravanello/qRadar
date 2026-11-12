import React, { useState } from 'react';
import { Bug, Layers, UserCheck } from 'lucide-react';
import type { JiraIssue, JiraUserExport } from '../../types';
import { IssueRow } from './JiraIssueRow';

// =============================================================================
// "Issues" tab: the person's own Jira work (from jira_<pn>.json).
// =============================================================================

const PREVIEW_COUNT = 5;

const sumSP = (issues: JiraIssue[]) => issues.reduce((acc, i) => acc + (i.storyPoints ?? 0), 0);

interface IssueSectionProps {
  title: string;
  icon: React.ReactNode;
  issues: JiraIssue[];
  pn: string;
  showSP?: boolean;
}

const IssueSection: React.FC<IssueSectionProps> = ({ title, icon, issues, pn, showSP }) => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? issues : issues.slice(0, PREVIEW_COUNT);

  return (
    <section className="space-y-2.5">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="flex items-center gap-2 text-[13px] font-semibold text-slate-200">
          {icon}
          {title}
          <span className="text-xs font-normal tabular-nums text-slate-500">{issues.length}</span>
        </h3>
        {showSP && <span className="text-xs tabular-nums text-slate-400">{sumSP(issues)} SP</span>}
      </div>

      {issues.length === 0 ? (
        <p className="text-xs text-slate-500">Tidak ada issue.</p>
      ) : (
        <ul className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 divide-y divide-slate-800">
          {visible.map((issue) => (
            <IssueRow key={issue.key} issue={issue} pn={pn} highlightMine={false} showType>
              {issue.roles?.map((role) => (
                <span key={role} className="text-indigo-300">
                  {role === 'reporter' ? 'Dibuat' : 'Di-assign'}
                </span>
              ))}
            </IssueRow>
          ))}
        </ul>
      )}

      {issues.length > PREVIEW_COUNT && (
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="text-xs font-medium text-sky-400 hover:text-sky-300 cursor-pointer"
        >
          {expanded ? 'Tampilkan lebih sedikit' : `Tampilkan semua ${issues.length}`}
        </button>
      )}
    </section>
  );
};

export const JiraSections: React.FC<{ data: JiraUserExport }> = ({ data }) => {
  const pn = data.user.username;
  return (
    <div className="space-y-7">
      <IssueSection
        title="Di-assign"
        icon={<UserCheck className="w-4 h-4 text-sky-400" aria-hidden="true" />}
        issues={data.assignedWork}
        pn={pn}
        showSP
      />
      <IssueSection
        title="Defect & Sub-task"
        icon={<Bug className="w-4 h-4 text-red-400" aria-hidden="true" />}
        issues={data.defectsAndSubtasks}
        pn={pn}
      />
      <IssueSection
        title="Story & Epic di sprint"
        icon={<Layers className="w-4 h-4 text-purple-400" aria-hidden="true" />}
        issues={data.sprintStoriesAndEpics}
        pn={pn}
        showSP
      />
    </div>
  );
};
