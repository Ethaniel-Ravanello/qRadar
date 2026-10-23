import React from 'react';
import {
  Users,
  AlertTriangle,
  Coffee,
  RefreshCw,
  FileCheck2,
} from 'lucide-react';
import type { Squad } from '../../types';

interface NavbarProps {
  squads: Squad[];
  filterMode: 'ALL' | 'BLOCKERS' | 'IDLE';
  onFilterChange: (mode: 'ALL' | 'BLOCKERS' | 'IDLE') => void;
  onSelectPodPreset: (podName: string | null) => void;
  onOpenSquadModal: () => void;
  isLiveApi: boolean;
  onToggleLiveApi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  squads,
  filterMode,
  onFilterChange,
  onSelectPodPreset,
  onOpenSquadModal,
  isLiveApi,
  onToggleLiveApi,
}) => {
  const qcash = squads[0];
  const totalEmployees = qcash?.members.length || 0;
  const totalBlockers = qcash?.members.filter((m) => m.isBlocker).length || 0;
  const totalIdle = qcash?.members.filter((m) => m.status === 'idle').length || 0;

  return (
    <header className="absolute top-0 left-0 right-0 z-30 p-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Branding & Bank Logo */}
        <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700/80 shadow-2xl pointer-events-auto">
          {/* BRI Logo Graphic */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 flex items-center justify-center shadow-lg font-black text-white text-base tracking-tighter">
            BRI
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold text-white tracking-wide">
                BRITwin <span className="text-sky-400">3D</span>
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40">
                Squad QCash
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Oval Wing Floor • Atlassian Operations Command Center
            </p>
          </div>
        </div>

        {/* Center: QCash Sprint KPIs */}
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-700/80 shadow-2xl pointer-events-auto overflow-x-auto text-xs">
          <button
            onClick={onOpenSquadModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-950/70 border border-blue-500/40 text-blue-200 hover:bg-blue-900/60 transition"
            title="Open QCash Governance & Approval Matrix"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-bold">{qcash?.sprint.split(' ')[0]}</span>
            <span className="text-slate-400 text-[11px]">
              ({qcash?.metrics.completedStoryPoints}/{qcash?.metrics.totalStoryPoints} SP)
            </span>
          </button>

          <button
            onClick={() => onFilterChange(filterMode === 'BLOCKERS' ? 'ALL' : 'BLOCKERS')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-semibold transition-all ${
              filterMode === 'BLOCKERS'
                ? 'bg-red-500 text-white shadow-lg ring-2 ring-red-400'
                : 'bg-red-950/60 text-red-300 hover:bg-red-900/60 border border-red-800/50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>{totalBlockers}</span>
            <span className="text-[11px] opacity-90">Blockers</span>
          </button>

          <button
            onClick={() => onFilterChange(filterMode === 'IDLE' ? 'ALL' : 'IDLE')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-semibold transition-all ${
              filterMode === 'IDLE'
                ? 'bg-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>{totalIdle}</span>
            <span className="text-[11px] text-slate-400">Standby</span>
          </button>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800/80 text-slate-200">
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-semibold">{totalEmployees}</span>
            <span className="text-slate-400 text-[11px]">Engineers</span>
          </div>
        </div>

        {/* Right: Pod Jump Presets & API Mode */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Pod Camera Shortcuts */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700/80 shadow-2xl text-xs">
            <button
              onClick={() => onSelectPodPreset(null)}
              className="px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-white font-semibold transition"
            >
              Overview
            </button>
            <button
              onClick={() => onSelectPodPreset('BE')}
              className="px-2.5 py-1.5 rounded-xl text-blue-300 hover:text-blue-200 font-semibold transition hover:bg-blue-950/40"
            >
              BE
            </button>
            <button
              onClick={() => onSelectPodPreset('FE')}
              className="px-2.5 py-1.5 rounded-xl text-pink-300 hover:text-pink-200 font-semibold transition hover:bg-pink-950/40"
            >
              FE
            </button>
            <button
              onClick={() => onSelectPodPreset('QA')}
              className="px-2.5 py-1.5 rounded-xl text-emerald-300 hover:text-emerald-200 font-semibold transition hover:bg-emerald-950/40"
            >
              QA
            </button>
            <button
              onClick={() => onSelectPodPreset('LEAD')}
              className="px-2.5 py-1.5 rounded-xl text-amber-300 hover:text-amber-200 font-semibold transition hover:bg-amber-950/40"
            >
              Lead
            </button>
          </div>

          {/* Sync Mode Toggle Button */}
          <button
            onClick={onToggleLiveApi}
            title="Toggle between Mock data and Live Atlassian/Astra Bridge"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-semibold backdrop-blur-md shadow-2xl transition-all ${
              isLiveApi
                ? 'bg-emerald-900/80 border-emerald-500 text-emerald-200'
                : 'bg-slate-900/90 border-slate-700/80 text-slate-300 hover:border-slate-500'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLiveApi ? 'animate-spin text-emerald-400' : 'text-slate-400'}`} />
            <span>{isLiveApi ? 'Astra: LIVE' : 'Mode: MOCK'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
