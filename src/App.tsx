import React, { useState, useCallback, useEffect, useRef } from 'react';
import { INITIAL_SQUADS } from './data/officeData';
import type { Squad, Employee, GraphicMode } from './types';
import { OfficeScene } from './components/canvas/OfficeScene';
import { Navbar } from './components/ui/Navbar';
import { MemberDrawer } from './components/ui/MemberDrawer';
import { SquadModal } from './components/ui/SquadModal';
import { BottomControls } from './components/ui/BottomControls';
import { EcoModeOverlay } from './components/ui/EcoModeOverlay';

// Lightweight Synthesized Web Audio Effects
const playSoundEffect = (type: 'click' | 'resolve' | 'alert') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'resolve') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'alert') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.setValueAtTime(280, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch {
    // AudioContext blocked or not supported
  }
};

export const App: React.FC = () => {
  const [squads, setSquads] = useState<Squad[]>(() => INITIAL_SQUADS);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedSquad, setSelectedSquad] = useState<Squad>(() => INITIAL_SQUADS[0]);
  const [modalSquad, setModalSquad] = useState<Squad | null>(null);
  const [filterMode, setFilterMode] = useState<'ALL' | 'BLOCKERS' | 'IDLE'>('ALL');
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Synchronize squads and selectedSquad during render if stale from HMR/state preservation
  if (
    squads.length !== INITIAL_SQUADS.length ||
    squads[0]?.id !== INITIAL_SQUADS[0]?.id ||
    !INITIAL_SQUADS.some((s) => s.id === selectedSquad.id)
  ) {
    setSquads(INITIAL_SQUADS);
    setSelectedSquad(INITIAL_SQUADS[0]);
  }

  // --- GRAPHIC QUALITY OPTION (PERFORMANCE VS QUALITY) ---
  const [graphicMode, setGraphicMode] = useState<GraphicMode>(() => {
    return (localStorage.getItem('qradar_graphic_mode') as GraphicMode) || 'quality';
  });

  const handleGraphicModeChange = (mode: GraphicMode) => {
    setGraphicMode(mode);
    localStorage.setItem('qradar_graphic_mode', mode);
    triggerSound('click');
  };

  // --- ECO MODE & AFK DETECTION (30 SECONDS & TAB OUT) ---
  const [isAsleep, setIsAsleep] = useState<boolean>(false);
  const afkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetAfkTimer = useCallback(() => {
    if (afkTimerRef.current) {
      clearTimeout(afkTimerRef.current);
    }
    // Set 30 seconds timer for AFK
    afkTimerRef.current = setTimeout(() => {
      setIsAsleep(true);
    }, 30000);
  }, []);

  const handleWakeUp = useCallback(() => {
    setIsAsleep(false);
    resetAfkTimer();
  }, [resetAfkTimer]);

  useEffect(() => {
    resetAfkTimer();

    const onUserActivity = () => {
      if (!isAsleep) {
        resetAfkTimer();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsAsleep(true);
        if (afkTimerRef.current) clearTimeout(afkTimerRef.current);
      }
    };

    const handleWindowBlur = () => {
      setIsAsleep(true);
      if (afkTimerRef.current) clearTimeout(afkTimerRef.current);
    };

    const handleWindowFocus = () => {
      resetAfkTimer();
    };

    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart'];
    activityEvents.forEach((evt) => window.addEventListener(evt, onUserActivity, { passive: true }));
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      activityEvents.forEach((evt) => window.removeEventListener(evt, onUserActivity));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      if (afkTimerRef.current) clearTimeout(afkTimerRef.current);
    };
  }, [isAsleep, resetAfkTimer]);

  // Helper sound wrapper
  const triggerSound = useCallback(
    (type: 'click' | 'resolve' | 'alert') => {
      if (soundEnabled) playSoundEffect(type);
    },
    [soundEnabled]
  );

  // Select employee from 3D scene
  const handleSelectEmployee = (emp: Employee) => {
    const empSquad = squads.find((s) => s.members.some((m) => m.id === emp.id)) || selectedSquad;
    setSelectedSquad(empSquad);
    setSelectedEmployee(emp);
    triggerSound(emp.isBlocker ? 'alert' : 'click');
  };

  // Select squad (from Dropdown or 3D banner)
  const handleSelectSquad = (squad: Squad) => {
    setSelectedSquad(squad);
    setSelectedEmployee(null);
    triggerSound('click');
  };

  // Select squad banner from 3D scene -> open detailed approval modal
  const handleSelectSquadBanner = (squad: Squad) => {
    setSelectedSquad(squad);
    setModalSquad(squad);
    triggerSound('click');
  };

  // Pod Jump Navigation relative to active squad's zone (depan-belakang along Z)
  const handleSelectPodPreset = (pod: string | null) => {
    setSelectedEmployee(null);
    const [cx, , cz] = selectedSquad.zoneCenter;
    if (!pod) {
      setSelectedSquad({ ...selectedSquad, zoneCenter: [cx, 0, cz] });
    } else if (pod === 'BE') {
      setSelectedSquad({ ...selectedSquad, zoneCenter: [cx + 5.0, 0, cz - 0.9] });
    } else if (pod === 'QA') {
      setSelectedSquad({ ...selectedSquad, zoneCenter: [cx + 5.0, 0, cz + 0.9] });
    } else if (pod === 'FE') {
      setSelectedSquad({ ...selectedSquad, zoneCenter: [cx - 4.9, 0, cz + 0.9] });
    } else if (pod === 'LEAD') {
      setSelectedSquad({ ...selectedSquad, zoneCenter: [cx - 4.9, 0, cz - 0.9] });
    }
    triggerSound('click');
  };

  // Resolve Blocker
  const handleResolveBlocker = (empId: string) => {
    setSquads((prev) =>
      prev.map((squad) => ({
        ...squad,
        members: squad.members.map((m) => {
          if (m.id === empId) {
            return {
              ...m,
              isBlocker: false,
              status: 'active' as const,
              speechBubble: '✅ Blocker resolved! Kembali melanjutkan development.',
            };
          }
          return m;
        }),
      }))
    );

    // Update selected employee view
    if (selectedEmployee && selectedEmployee.id === empId) {
      setSelectedEmployee((prev) =>
        prev
          ? {
              ...prev,
              isBlocker: false,
              status: 'active',
              speechBubble: '✅ Blocker resolved! Kembali melanjutkan development.',
            }
          : null
      );
    }

    triggerSound('resolve');
  };

  // Toggle approval step in Squad Modal
  const handleApproveStep = (squadId: string, step: string) => {
    setSquads((prev) =>
      prev.map((squad) => {
        if (squad.id === squadId) {
          const currentApprovals = squad.metrics.approvals as any;
          const updatedApprovals = {
            ...currentApprovals,
            [step]: !currentApprovals[step],
          };

          const allApproved =
            updatedApprovals.brd &&
            updatedApprovals.sitSignOff &&
            updatedApprovals.uatSignOff &&
            updatedApprovals.secmanSignOff &&
            updatedApprovals.rfcDeployment;

          const updatedSquad: Squad = {
            ...squad,
            metrics: {
              ...squad.metrics,
              approvals: updatedApprovals,
              pipeline: {
                ...squad.metrics.pipeline,
                stage: allApproved ? 'PROD_READY' : squad.metrics.pipeline.stage,
                health: allApproved ? 'green' : squad.metrics.pipeline.health,
              },
            },
          };

          if (modalSquad && modalSquad.id === squadId) {
            setModalSquad(updatedSquad);
          }

          if (selectedSquad.id === squadId) {
            setSelectedSquad(updatedSquad);
          }

          return updatedSquad;
        }
        return squad;
      })
    );

    triggerSound('click');
  };

  const handleClearSelection = () => {
    setSelectedEmployee(null);
  };

  const handleResetView = () => {
    setSelectedSquad(INITIAL_SQUADS[0]);
    setSelectedEmployee(null);
    setModalSquad(null);
    triggerSound('click');
  };

  const handleToggleLiveApi = () => {
    setIsLiveApi((prev) => !prev);
    triggerSound('click');
  };

  const activeEmployeeSquad = selectedEmployee
    ? squads.find((s) => s.members.some((m) => m.id === selectedEmployee.id)) || selectedSquad
    : selectedSquad;

  return (
    <main className="w-screen h-screen relative overflow-hidden bg-[#e5dfd3] font-sans select-none">
      {/* Top Navigation & KPI Radar */}
      <Navbar
        squads={squads}
        activeSquad={selectedSquad}
        onSelectSquad={handleSelectSquad}
        filterMode={filterMode}
        onFilterChange={setFilterMode}
        onSelectPodPreset={handleSelectPodPreset}
        onOpenSquadModal={() => setModalSquad(selectedSquad)}
        isLiveApi={isLiveApi}
        onToggleLiveApi={handleToggleLiveApi}
        graphicMode={graphicMode}
        onGraphicModeChange={handleGraphicModeChange}
      />

      {/* 3D WebGL Canvas with frameloop eco mode */}
      <OfficeScene
        squads={squads}
        selectedEmployee={selectedEmployee}
        selectedSquad={selectedSquad}
        onSelectEmployee={handleSelectEmployee}
        onSelectSquad={handleSelectSquadBanner}
        onClearSelection={handleClearSelection}
        filterMode={filterMode}
        isAsleep={isAsleep}
        graphicMode={graphicMode}
      />

      {/* Slide-out Employee Detail Drawer (Jira, Bitbucket, Blocker) with smooth animation & z-50 */}
      <MemberDrawer
        employee={selectedEmployee}
        squad={activeEmployeeSquad}
        onClose={() => setSelectedEmployee(null)}
        onResolveBlocker={handleResolveBlocker}
      />

      {/* Squad Approval & Governance Modal */}
      <SquadModal
        squad={modalSquad}
        onClose={() => setModalSquad(null)}
        onApproveStep={handleApproveStep}
      />

      {/* Bottom Controls & Legend */}
      <BottomControls
        onResetView={handleResetView}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
      />

      {/* Quick Eco Mode Sleep Button at Bottom-Right */}
      <div className="absolute bottom-4 right-28 z-30 pointer-events-auto">
        <button
          onClick={() => setIsAsleep(true)}
          className="px-3 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700/80 shadow-2xl text-xs font-semibold flex items-center gap-1.5 transition backdrop-blur-md"
          title="Pause 3D Render & Save Battery/GPU"
        >
          <span>💤</span>
          <span className="hidden sm:inline">Sleep Mode</span>
        </button>
      </div>

      {/* Eco Mode Frosted Blur Overlay when Asleep */}
      <EcoModeOverlay isAsleep={isAsleep} onWakeUp={handleWakeUp} />
    </main>
  );
};

export default App;
