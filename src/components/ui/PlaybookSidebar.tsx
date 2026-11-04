import React, { useState } from 'react';
import {
  RotateCcw,
  ShieldCheck,
  Zap,
  Activity,
  GitPullRequest,
  Calendar,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import type { Squad } from '../../types';

interface PlaybookSidebarProps {
  squad: Squad;
  onOpenSquadModal: () => void;
  onSelectEmployeeById: (empId: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const PlaybookSidebar: React.FC<PlaybookSidebarProps> = ({
  squad,
  onOpenSquadModal,
  onSelectEmployeeById,
  isOpen,
  onToggleOpen,
}) => {
  const [activeTab, setActiveTab] = useState<'PLAYBOOKS' | 'INBOX' | 'HISTORY'>('PLAYBOOKS');
  const [activeJobMessage, setActiveJobMessage] = useState<string | null>(null);

  const handleRunPlaybook = (title: string, actionType: string) => {
    if (actionType === 'GOVERNANCE') {
      onOpenSquadModal();
    } else if (actionType === 'BLOCKER') {
      const blockerEmp = squad.members.find((m) => m.isBlocker);
      if (blockerEmp) onSelectEmployeeById(blockerEmp.id);
    } else {
      setActiveJobMessage(`⚡ Executing ${title}... All systems nominal.`);
      setTimeout(() => setActiveJobMessage(null), 4000);
    }
  };

  const blockers = squad.members.filter((m) => m.isBlocker);

  return (
    <aside
      className={`fixed top-0 right-0 h-full z-40 flex pointer-events-auto transition-transform duration-300 ease-in-out font-mono ${
        isOpen ? 'translate-x-0' : 'translate-x-[calc(100%-28px)]'
      }`}
    >
      {/* Collapse Tab on the left edge (matching reference image) */}
      <button
        onClick={onToggleOpen}
        className="w-7 h-36 self-center -mr-[1px] bg-[#121520]/95 hover:bg-[#1a1f30] border-y border-l border-slate-700/80 rounded-l-xl text-[10px] font-bold text-sky-400 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-2xl transition group select-none"
        title={isOpen ? 'Collapse Headquarters Panel' : 'Expand Headquarters Panel'}
      >
        <span className="[writing-mode:vertical-rl] tracking-widest text-[9px] uppercase group-hover:text-white">
          {isOpen ? 'COLLAPSE HQ' : 'EXPAND HQ'}
        </span>
        {isOpen ? (
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
        )}
      </button>

      {/* Main Headquarters Sidebar Content */}
      <div className="w-84 sm:w-96 h-full bg-[#0b0e17]/95 border-l border-slate-800/80 backdrop-blur-2xl flex flex-col shadow-2xl text-slate-300">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black tracking-[0.2em] text-[#38bdf8] uppercase">
              HEADQUARTERS
            </h2>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
          </div>
          <p className="text-[11px] text-slate-400 font-sans mt-0.5">
            Monitor outputs, runs, and schedules.
          </p>

          {/* Navigation Tabs (INBOX | HISTORY | PLAYBOOKS) */}
          <div className="flex items-center gap-1 mt-3 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px]">
            <button
              onClick={() => setActiveTab('INBOX')}
              className={`flex-1 py-1 rounded-lg text-center font-bold tracking-wider transition ${
                activeTab === 'INBOX'
                  ? 'bg-slate-800 text-sky-400 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              INBOX
            </button>
            <button
              onClick={() => setActiveTab('HISTORY')}
              className={`flex-1 py-1 rounded-lg text-center font-bold tracking-wider transition ${
                activeTab === 'HISTORY'
                  ? 'bg-slate-800 text-sky-400 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              HISTORY
            </button>
            <button
              onClick={() => setActiveTab('PLAYBOOKS')}
              className={`flex-1 py-1 rounded-lg text-center font-bold tracking-wider transition ${
                activeTab === 'PLAYBOOKS'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              PLAYBOOKS
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
          {activeTab === 'PLAYBOOKS' && (
            <>
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-mono text-xs font-bold text-slate-200 tracking-wider">
                    PLAYBOOKS
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Launch reusable schedules for the whole headquarters.
                  </p>
                </div>
                <button
                  onClick={() => handleRunPlaybook('Refresh', 'REFRESH')}
                  className="px-2 py-1 rounded border border-slate-700 bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-300 font-mono uppercase tracking-wider transition flex items-center gap-1"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  REFRESH
                </button>
              </div>

              {/* Active Jobs Card */}
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] tracking-wider text-slate-500 uppercase font-bold">
                  ACTIVE JOBS
                </span>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400">
                  {activeJobMessage ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-mono">
                      <Zap className="w-3.5 h-3.5 animate-spin" />
                      <span>{activeJobMessage}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-slate-400">
                      <span>No active jobs running.</span>
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Standby
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Templates Header */}
              <div className="space-y-2.5 pt-1">
                <span className="font-mono text-[10px] tracking-wider text-slate-500 uppercase font-bold">
                  TEMPLATES
                </span>

                {/* 1. Daily Morning Briefing */}
                <div
                  onClick={() => handleRunPlaybook('Daily Morning Briefing', 'STANDUP')}
                  className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs font-bold text-amber-400 group-hover:text-amber-300 tracking-wide flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      DAILY MORNING BRIEFING
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium mt-1 leading-relaxed">
                    Every day at 9am. Summarize priorities, blockers ({blockers.length} active), and what changed overnight.
                  </p>
                </div>

                {/* 2. Nightly Code Review Digest */}
                <div
                  onClick={() => handleRunPlaybook('Nightly Code Review', 'BITBUCKET')}
                  className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs font-bold text-sky-400 group-hover:text-sky-300 tracking-wide flex items-center gap-2">
                      <GitPullRequest className="w-3.5 h-3.5" />
                      NIGHTLY CODE REVIEW DIGEST
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium mt-1 leading-relaxed">
                    Every night at midnight. Review Bitbucket PRs, SonarQube score ({squad.metrics.pipeline.sonarCoverage}%), and risky regressions.
                  </p>
                </div>

                {/* 3. Hourly Health Check */}
                <div
                  onClick={() => handleRunPlaybook('Hourly Health Check', 'HEALTH')}
                  className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs font-bold text-emerald-400 group-hover:text-emerald-300 tracking-wide flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5" />
                      HOURLY HEALTH CHECK
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium mt-1 leading-relaxed">
                    Every 60 minutes. Report runtime health, payment latency (&lt;80ms), and anything that needs intervention.
                  </p>
                </div>

                {/* 4. Weekly Progress Report & Governance */}
                <div
                  onClick={() => handleRunPlaybook('Weekly Progress Report', 'GOVERNANCE')}
                  className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs font-bold text-purple-400 group-hover:text-purple-300 tracking-wide flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      WEEKLY PROGRESS REPORT
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium mt-1 leading-relaxed">
                    Every Monday at 8am. Roll up wins, story points ({squad.metrics.completedStoryPoints}/{squad.metrics.totalStoryPoints} SP), and RFC CAB sign-offs.
                  </p>
                </div>

                {/* 5. Continuous SRE Monitor */}
                <div
                  onClick={() => handleRunPlaybook('Continuous SRE Monitor', 'BLOCKER')}
                  className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs font-bold text-rose-400 group-hover:text-rose-300 tracking-wide flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5" />
                      CONTINUOUS SRE MONITOR
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium mt-1 leading-relaxed">
                    Every 15 minutes. Watch for transaction drift, silent failures, or anomalous timeouts.
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'INBOX' && (
            <div className="space-y-3 font-mono">
              <span className="text-[10px] tracking-wider text-slate-500 uppercase font-bold">
                INCIDENT NOTIFICATIONS & FEED
              </span>
              {squad.members
                .filter((m) => m.isBlocker)
                .map((m) => (
                  <div
                    key={m.id}
                    onClick={() => onSelectEmployeeById(m.id)}
                    className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 hover:border-red-500 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-red-400 text-[11px] font-bold">
                      <span>⚠️ BLOCKER ALERT</span>
                      <span>{m.role}</span>
                    </div>
                    <p className="text-[11px] text-slate-200 mt-1 font-sans">{m.speechBubble}</p>
                    <div className="text-[10px] text-slate-400 mt-2 font-mono">
                      Assignee: {m.name} (PN {m.pn})
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === 'HISTORY' && (
            <div className="space-y-3 font-mono text-xs">
              <span className="text-[10px] tracking-wider text-slate-500 uppercase font-bold">
                RECENT RUNS & EVENTS
              </span>
              <div className="space-y-2 font-sans text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-emerald-400 font-mono font-bold text-[10px]">
                    09:00:00 • STANDUP COMPLETE
                  </div>
                  <div className="text-slate-300 mt-0.5">Sprint 28 Day 7 burndown velocity on target.</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-sky-400 font-mono font-bold text-[10px]">
                    08:15:22 • BITBUCKET PR MERGED
                  </div>
                  <div className="text-slate-300 mt-0.5">PR #142 Release candidate v2.8.0 into staging.</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-amber-400 font-mono font-bold text-[10px]">
                    07:45:10 • SRE HEALTH PING
                  </div>
                  <div className="text-slate-300 mt-0.5">Payment latency 45ms. Switcher Sandbox active.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
