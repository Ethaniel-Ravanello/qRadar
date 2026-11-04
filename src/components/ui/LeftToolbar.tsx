import React from 'react';
import {
  ChevronRight,
  Maximize2,
  Home,
  Users,
  Briefcase,
  AlertTriangle,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface LeftToolbarProps {
  onResetView: () => void;
  filterMode: 'ALL' | 'BLOCKERS' | 'IDLE';
  onFilterChange: (mode: 'ALL' | 'BLOCKERS' | 'IDLE') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenPlaybooks: () => void;
}

export const LeftToolbar: React.FC<LeftToolbarProps> = ({
  onResetView,
  filterMode,
  onFilterChange,
  soundEnabled,
  onToggleSound,
  onOpenPlaybooks,
}) => {
  return (
    <aside className="fixed top-6 left-6 z-30 pointer-events-auto flex flex-col items-center gap-2">
      <div className="bg-[#0e111a]/90 backdrop-blur-xl border border-slate-800/80 p-1.5 rounded-2xl shadow-2xl flex flex-col items-center gap-2">
        {/* Toggle / Collapse */}
        <button
          onClick={onResetView}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
          title="Reset Camera View"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* View mode toggle */}
        <button
          onClick={onResetView}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
          title="Isometric View Mode"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Home */}
        <button
          onClick={onResetView}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
          title="Home"
        >
          <Home className="w-4 h-4" />
        </button>

        {/* Filter Blockers / Team */}
        <button
          onClick={() => onFilterChange(filterMode === 'BLOCKERS' ? 'ALL' : 'BLOCKERS')}
          className={`p-2 rounded-xl transition ${
            filterMode === 'BLOCKERS'
              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
          }`}
          title="Filter Blockers"
        >
          {filterMode === 'BLOCKERS' ? (
            <AlertTriangle className="w-4 h-4 text-red-400" />
          ) : (
            <Users className="w-4 h-4" />
          )}
        </button>

        {/* Headquarters / Playbooks (Active golden icon matching reference image) */}
        <button
          onClick={onOpenPlaybooks}
          className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 hover:bg-amber-500/30 transition shadow-lg"
          title="Open Playbooks & SRE Runs"
        >
          <Briefcase className="w-4 h-4" />
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
          title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-sky-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-600" />
          )}
        </button>
      </div>
    </aside>
  );
};
