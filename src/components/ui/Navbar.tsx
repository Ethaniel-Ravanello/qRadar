import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Zap, Sparkles } from 'lucide-react';
import type { Squad, GraphicMode } from '../../types';

interface NavbarProps {
  squads: Squad[];
  activeSquad: Squad;
  onSelectSquad: (squad: Squad) => void;
  graphicMode: GraphicMode;
  onGraphicModeChange: (mode: GraphicMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  squads,
  activeSquad,
  onSelectSquad,
  graphicMode,
  onGraphicModeChange,
}) => {
  const [isAllSquadsDropdownOpen, setIsAllSquadsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsAllSquadsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isPerformance = graphicMode === 'performance';

  return (
    <header className="fixed top-4 left-0 right-0 z-30 pointer-events-none flex flex-col items-center">
      <div className="flex flex-col items-center gap-2 pointer-events-auto max-w-4xl px-4">
        {/* Golden Monospace Headquarters Title */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-amber-500/40 hidden sm:block" />
          <h1 className="text-xs sm:text-sm font-black font-mono tracking-[0.25em] text-[#f59e0b] drop-shadow-md uppercase select-none">
            Q-CASH HEADQUARTERS
          </h1>
          <div className="h-[1px] w-8 bg-amber-500/40 hidden sm:block" />
        </div>

        {/* Squad Selection Row & Mode Toggle (Below HQ Title) */}
        <div className="flex items-center gap-2 flex-wrap justify-center bg-[#0e111a]/85 backdrop-blur-xl px-3 py-1.5 rounded-2xl border border-slate-800/80 shadow-2xl">
          {/* Active Squad Selector Dropdown (single source for choosing a squad) */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsAllSquadsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-tight text-white bg-slate-900/90 hover:bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition min-w-[180px]"
              title="Pilih Squad Aktif (10 Squads)"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: activeSquad.zoneColor }}
              />
              <span className="truncate">{activeSquad.name}</span>
              {activeSquad.members.some((m) => m.isBlocker) && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping shrink-0" />
              )}
              <ChevronDown
                className={`w-3.5 h-3.5 ml-auto text-slate-400 transition-transform duration-200 ${
                  isAllSquadsDropdownOpen ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>

            {isAllSquadsDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 max-h-[60vh] overflow-y-auto bg-[#0b0e17]/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50 space-y-1">
                <div className="px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800">
                  DAFTAR 10 SQUAD BRI
                </div>
                {squads.map((sq, idx) => {
                  const isSelected = sq.id === activeSquad.id;
                  const hasBlocker = sq.members.some((m) => m.isBlocker);
                  return (
                    <button
                      key={sq.id}
                      onClick={() => {
                        onSelectSquad(sq);
                        setIsAllSquadsDropdownOpen(false);
                      }}
                      className={`w-full p-2 rounded-xl flex items-center justify-between text-left transition font-mono text-xs ${
                        isSelected
                          ? 'bg-sky-500/20 border border-sky-500/40 text-white'
                          : 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: sq.zoneColor }}
                        />
                        <span className="truncate">
                          Row {idx + 1}: {sq.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {hasBlocker && (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                        )}
                        {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="h-4 w-[1px] bg-slate-800 mx-1 hidden sm:block" />

          {/* Mode Performance vs Graphic Mode Toggle (User Requirement) */}
          <button
            onClick={() => onGraphicModeChange(isPerformance ? 'quality' : 'performance')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-tight transition-all border ${
              isPerformance
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25'
                : 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25'
            }`}
            title={
              isPerformance
                ? 'Performance Mode: Baterai hemat, shadow dimatikan (Klik untuk beralih ke Graphic Quality)'
                : 'Graphic Mode: Soft shadows & high quality render (Klik untuk beralih ke Performance)'
            }
          >
            {isPerformance ? (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>PERFORMANCE</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>GRAPHIC</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
