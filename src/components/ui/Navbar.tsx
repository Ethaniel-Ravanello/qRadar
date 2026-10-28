import React, { useState, useRef, useEffect } from 'react';
import {
  Users,
  AlertTriangle,
  Coffee,
  RefreshCw,
  FileCheck2,
  ChevronDown,
  Check,
  Zap,
  Sparkles,
} from 'lucide-react';
import type { Squad, GraphicMode } from '../../types';

interface NavbarProps {
  squads: Squad[];
  activeSquad: Squad;
  onSelectSquad: (squad: Squad) => void;
  filterMode: 'ALL' | 'BLOCKERS' | 'IDLE';
  onFilterChange: (mode: 'ALL' | 'BLOCKERS' | 'IDLE') => void;
  onSelectPodPreset: (podName: string | null) => void;
  onOpenSquadModal: () => void;
  isLiveApi: boolean;
  onToggleLiveApi: () => void;
  graphicMode: GraphicMode;
  onGraphicModeChange: (mode: GraphicMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  squads,
  activeSquad,
  onSelectSquad,
  filterMode,
  onFilterChange,
  onSelectPodPreset,
  onOpenSquadModal,
  isLiveApi,
  onToggleLiveApi,
  graphicMode,
  onGraphicModeChange,
}) => {
  const [isSquadDropdownOpen, setIsSquadDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalEmployees = activeSquad?.members.length || 0;
  const totalBlockers = activeSquad?.members.filter((m) => m.isBlocker).length || 0;
  const totalIdle = activeSquad?.members.filter((m) => m.status === 'idle').length || 0;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsSquadDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-40 p-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Branding & Dynamic Squad Switcher */}
        <div ref={dropdownRef} className="relative pointer-events-auto">
          <button
            onClick={() => setIsSquadDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700/80 shadow-2xl hover:border-slate-500 transition text-left group"
          >
            {/* BRI Logo Graphic */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 flex items-center justify-center shadow-lg font-black text-white text-base tracking-tighter shrink-0">
              BRI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-extrabold text-white tracking-wide">
                  BRITwin <span className="text-sky-400">3D</span>
                </h1>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-bold border transition flex items-center gap-1.5"
                  style={{
                    backgroundColor: `${activeSquad.zoneColor}25`,
                    color: activeSquad.zoneColor,
                    borderColor: `${activeSquad.zoneColor}60`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-ping"
                    style={{ backgroundColor: activeSquad.zoneColor }}
                  />
                  {activeSquad.alias}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover:text-white ${
                    isSquadDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate max-w-[210px]">
                {activeSquad.name}
              </p>
            </div>
          </button>

          {/* Squad Switcher Dropdown */}
          {isSquadDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                PILIH SQUAD AKTIF
              </div>
              {squads.map((squad) => {
                const isSelected = squad.id === activeSquad.id;
                const blockers = squad.members.filter((m) => m.isBlocker).length;
                return (
                  <button
                    key={squad.id}
                    onClick={() => {
                      onSelectSquad(squad);
                      setIsSquadDropdownOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition ${
                      isSelected
                        ? 'bg-blue-600/20 border border-blue-500/40 text-white'
                        : 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: squad.zoneColor }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate text-white">{squad.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {squad.sprint.split(' ')[0]} • Lead: {squad.leadPN.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {blockers > 0 && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                          {blockers} blocker
                        </span>
                      )}
                      {isSelected && <Check className="w-4 h-4 text-sky-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Center: Active Squad Sprint KPIs */}
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-700/80 shadow-2xl pointer-events-auto overflow-x-auto text-xs">
          <button
            onClick={onOpenSquadModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-950/70 border border-blue-500/40 text-blue-200 hover:bg-blue-900/60 transition"
            title="Buka Governance & Matriks Approval Squad"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-bold">{activeSquad?.sprint.split(' ')[0]}</span>
            <span className="text-slate-400 text-[11px]">
              ({activeSquad?.metrics.completedStoryPoints}/{activeSquad?.metrics.totalStoryPoints} SP)
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

        {/* Right: Graphic Mode Toggle, Pod Jump Presets, & API Sync */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Graphic Setting: Performance vs Quality */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700/80 shadow-2xl text-xs">
            <button
              onClick={() => onGraphicModeChange('performance')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-semibold transition ${
                graphicMode === 'performance'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Performance Mode: Matikan bayangan, resolusi optimal untuk laptop kantor / iGPU"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Perf</span>
            </button>
            <button
              onClick={() => onGraphicModeChange('quality')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-semibold transition ${
                graphicMode === 'quality'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Quality Mode: Soft shadow Three.js, resolusi tinggi & visual maksimal"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Quality</span>
            </button>
          </div>

          {/* Pod Camera Shortcuts for Active Squad */}
          <div className="hidden sm:flex items-center bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700/80 shadow-2xl text-xs">
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
            <span className="hidden lg:inline">{isLiveApi ? 'Astra: LIVE' : 'Mode: MOCK'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
