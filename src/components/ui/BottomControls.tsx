import React from 'react';
import { Activity, ShieldCheck, RotateCcw } from 'lucide-react';

interface BottomControlsProps {
  onResetView: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSquadModal?: () => void;
}

export const BottomControls: React.FC<BottomControlsProps> = ({
  onResetView,
  onOpenSquadModal,
}) => {
  return (
    <footer className="fixed bottom-4 left-6 right-6 z-20 pointer-events-none flex items-center justify-between font-mono text-[10px]">
      {/* Left: System Status Chips */}
      <div className="flex items-center gap-2 bg-[#0e111a]/85 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-slate-800/80 shadow-2xl pointer-events-auto text-slate-400">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>CONNECTED</span>
        </div>
        <span className="text-slate-700">•</span>
        <div className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-sky-400" />
          <span>60 FPS</span>
        </div>
        <span className="text-slate-700">•</span>
        <span className="text-slate-300">BRI Q-CASH ECOSYSTEM</span>
      </div>

      {/* Right: Reset View + Quick Governance Trigger */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={onResetView}
          title="Reset View: tampilkan semua squad & recenter kamera"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-2xl font-bold tracking-wider transition backdrop-blur-xl group"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400 group-hover:-rotate-90 transition-transform" />
          <span>RESET VIEW</span>
        </button>

        {onOpenSquadModal && (
          <button
            onClick={onOpenSquadModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-2xl font-bold tracking-wider transition backdrop-blur-xl group"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-12 transition-transform" />
            <span>RFC CAB MATRIX</span>
          </button>
        )}
      </div>
    </footer>
  );
};
