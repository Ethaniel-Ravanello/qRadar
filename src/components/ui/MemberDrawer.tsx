import React from 'react';
import {
  X,
  AlertTriangle,
  GitBranch,
  GitPullRequest,
  CheckCircle,
  Clock,
  Layers,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Send,
} from 'lucide-react';
import type { Employee, Squad } from '../../types';

interface MemberDrawerProps {
  employee: Employee | null;
  squad: Squad | null;
  onClose: () => void;
  onResolveBlocker: (empId: string) => void;
}

export const MemberDrawer: React.FC<MemberDrawerProps> = ({
  employee,
  squad,
  onClose,
  onResolveBlocker,
}) => {
  if (!employee) return null;

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'FE':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
      case 'BE':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'QA':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'SL':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Highest':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'High':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  return (
    <aside className="fixed top-20 right-4 bottom-6 w-96 max-w-[calc(100vw-2rem)] z-40 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-5 border-b border-slate-800 flex items-start justify-between relative bg-gradient-to-b from-slate-800/60 to-transparent">
        <div className="flex items-center gap-3">
          {/* Avatar Color Orb */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-lg border-2 border-white/20"
            style={{ backgroundColor: employee.avatarColor }}
          >
            {employee.role}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white leading-tight">
                {employee.name}
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded-md border border-sky-800/60 font-semibold">
                PN {employee.pn}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getRoleBadge(
                  employee.role
                )}`}
              >
                {employee.role === 'SL' ? 'Squad Lead' : `${employee.role} Engineer`}
              </span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Squad info pill */}
      {squad && (
        <div className="px-5 py-2.5 bg-slate-800/40 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Squad:</span>
          <span className="font-semibold text-slate-200">{squad.name}</span>
        </div>
      )}

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Blocker Alert Banner */}
        {employee.isBlocker ? (
          <div className="p-3.5 rounded-2xl bg-red-950/70 border border-red-500/70 text-red-200 space-y-2 shadow-lg">
            <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>ACTIVE BLOCKER REPORTED</span>
            </div>
            <p className="text-xs font-medium text-red-100 bg-red-900/40 p-2.5 rounded-xl border border-red-800/50">
              "{employee.speechBubble}"
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onResolveBlocker(employee.id)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Resolve Blocker</span>
              </button>
              <button
                onClick={() => alert(`Mengirim pesan Slack/Teams ke ${employee.name} (PN ${employee.pn})...`)}
                className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition border border-slate-700"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>Ping</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-300 flex items-start gap-2.5">
            <MessageSquare className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                Current Status:
              </span>
              <p className="text-slate-200 mt-0.5">"{employee.speechBubble}"</p>
            </div>
          </div>
        )}

        {/* Jira Tickets Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Jira Sprint Tasks</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              Total SP:{' '}
              <strong className="text-sky-300">
                {employee.jiraTickets.reduce((acc, t) => acc + t.storyPoints, 0)}
              </strong>
            </span>
          </div>

          <div className="space-y-2">
            {employee.jiraTickets.map((ticket) => (
              <div
                key={ticket.key}
                className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/70 hover:border-slate-500 transition space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-sky-400 flex items-center gap-1 hover:underline cursor-pointer">
                    {ticket.key}
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getPriorityBadge(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono font-semibold">
                      {ticket.storyPoints} SP
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-snug">
                  {ticket.title}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Status:</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-full text-[10px] ${
                      ticket.status === 'Done'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : ticket.status === 'In Progress'
                        ? 'bg-blue-500/20 text-blue-300'
                        : ticket.status === 'In Review'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bitbucket & CI/CD Pipeline Section */}
        <div className="space-y-2.5 pt-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-blue-400" />
            <span>Bitbucket & Code Quality</span>
          </h3>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Repository:</span>
              <span className="font-mono font-semibold text-slate-200">
                {employee.bitbucket.repo}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Active Branch:</span>
              <span className="font-mono text-sky-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                {employee.bitbucket.branch}
              </span>
            </div>

            {employee.bitbucket.activePR ? (
              <div className="pt-1.5 border-t border-slate-700/60">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                  Active Pull Request:
                </span>
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 flex items-start gap-2">
                  <GitPullRequest className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-200 truncate">
                      {employee.bitbucket.activePR}
                    </p>
                    <span
                      className={`inline-block mt-1 text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        employee.bitbucket.prStatus === 'MERGED'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {employee.bitbucket.prStatus}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 italic">No open Pull Request.</div>
            )}

            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>SonarQube Gate:</span>
              </div>
              <span className="font-mono font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                {employee.bitbucket.sonarScore}% PASS
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                Last commit:
              </span>
              <span>{employee.bitbucket.lastCommit}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
