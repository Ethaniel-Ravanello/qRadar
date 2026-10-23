import React from 'react';
import { Moon, Zap, MousePointerClick, Activity } from 'lucide-react';

interface EcoModeOverlayProps {
  isAsleep: boolean;
  onWakeUp: () => void;
}

export const EcoModeOverlay: React.FC<EcoModeOverlayProps> = ({
  isAsleep,
  onWakeUp,
}) => {
  if (!isAsleep) return null;

  return (
    <div
      onClick={onWakeUp}
      onMouseMove={onWakeUp}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md cursor-pointer transition-all duration-300 select-none animate-in fade-in"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onWakeUp();
        }}
        className="max-w-md w-full bg-slate-900/95 border border-slate-700/80 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center space-y-4 transform hover:scale-[1.02] transition-all"
      >
        {/* Animated Moon / Eco Icon */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white">
            <Moon className="w-8 h-8 animate-pulse text-amber-200" />
          </div>
          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-[9px] font-black text-slate-950 flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5 fill-current" />
            0% GPU
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-white tracking-wide flex items-center justify-center gap-2">
            <span>Eco Saver Mode Aktif</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
              3D PAUSED
            </span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
            Render canvas 3D dijeda otomatis saat AFK / pindah tab untuk memangkas penggunaan GPU & memori.
          </p>
        </div>

        {/* Metrics Pill */}
        <div className="grid grid-cols-2 gap-2 w-full pt-1 text-[11px]">
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center gap-2 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>GPU Load: <strong className="text-emerald-400">Idle</strong></span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center gap-2 text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Render: <strong className="text-amber-400">0 FPS</strong></span>
          </div>
        </div>

        {/* Wake Up Button */}
        <button
          onClick={onWakeUp}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition active:scale-95"
        >
          <MousePointerClick className="w-4 h-4" />
          <span>Klik atau Gerakkan Mouse untuk Melanjutkan</span>
        </button>

        <span className="text-[10px] text-slate-500 font-medium">
          Auto sleep aktif setelah 30 detik tanpa aktivitas atau saat beralih tab.
        </span>
      </div>
    </div>
  );
};
