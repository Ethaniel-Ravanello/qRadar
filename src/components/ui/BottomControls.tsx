import React from 'react';
import { Info, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface BottomControlsProps {
  onResetView: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const BottomControls: React.FC<BottomControlsProps> = ({
  onResetView,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <footer className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex items-center justify-between">
      {/* Role Legend Bar */}
      <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700/80 shadow-2xl pointer-events-auto text-[11px]">
        <span className="text-slate-400 font-semibold mr-1">Role Legend:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-slate-300 font-medium">SL</span>
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-slate-300 font-medium">BE</span>
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
          <span className="text-slate-300 font-medium">FE</span>
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-slate-300 font-medium">QA</span>
        </div>
      </div>

      {/* Guide Hints */}
      <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700/80 shadow-2xl pointer-events-auto text-xs text-slate-300 flex items-center gap-2">
        <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
        <span>
          <strong className="text-white">Klik Avatar / Meja</strong> untuk buka Jira & Bitbucket. <strong className="text-white">Klik Banner Squad</strong> untuk Approval Matrix.
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={onResetView}
          className="p-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500 shadow-2xl transition"
          title="Reset Camera View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleSound}
          className="p-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500 shadow-2xl transition"
          title={soundEnabled ? 'Mute Sounds' : 'Enable UI Sounds'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-sky-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
        </button>
      </div>
    </footer>
  );
};
