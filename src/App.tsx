import React, { useState, useCallback, useEffect, useRef } from 'react';
import { INITIAL_SQUADS } from './data/officeData';
import type { Squad, Employee, GraphicMode } from './types';
import { OfficeScene } from './components/canvas/OfficeScene';
import { Navbar } from './components/ui/Navbar';
import { LeftToolbar } from './components/ui/LeftToolbar';
import { PlaybookSidebar } from './components/ui/PlaybookSidebar';
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
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isPlaybookOpen, setIsPlaybookOpen] = useState<boolean>(true);

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
  const isAsleepRef = useRef<boolean>(false);

  // Keep a ref in sync so the listener effect can read the latest value
  // without needing isAsleep in its dependency array (which would otherwise
  // tear down and re-add every window listener on each sleep/wake).
  useEffect(() => {
    isAsleepRef.current = isAsleep;
  }, [isAsleep]);

  const resetAfkTimer = useCallback(() => {
    if (afkTimerRef.current) {
      clearTimeout(afkTimerRef.current);
    }
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
      if (!isAsleepRef.current) {
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
  }, [resetAfkTimer]);

  // Helper sound wrapper
  const triggerSound = useCallback(
    (type: 'click' | 'resolve' | 'alert') => {
      if (soundEnabled) playSoundEffect(type);
    },
    [soundEnabled]
  );

  // Select employee from 3D scene or UI
  const handleSelectEmployee = useCallback(
    (emp: Employee) => {
      setSelectedSquad((prevSquad) => {
        const empSquad = squads.find((s) => s.members.some((m) => m.id === emp.id)) || prevSquad;
        return empSquad;
      });
      setSelectedEmployee(emp);
      triggerSound(emp.isBlocker ? 'alert' : 'click');
    },
    [squads, triggerSound]
  );

  const handleSelectEmployeeById = useCallback(
    (empId: string) => {
      const emp = selectedSquad.members.find((m) => m.id === empId);
      if (emp) {
        handleSelectEmployee(emp);
      }
    },
    [selectedSquad, handleSelectEmployee]
  );

  // Select squad
  const handleSelectSquad = useCallback(
    (squad: Squad) => {
      setSelectedSquad(squad);
      setSelectedEmployee(null);
      triggerSound('click');
    },
    [triggerSound]
  );

  const handleSelectSquadBanner = useCallback(
    (squad: Squad) => {
      setSelectedSquad(squad);
      setModalSquad(squad);
      triggerSound('click');
    },
    [triggerSound]
  );

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

  const handleClearSelection = useCallback(() => {
    setSelectedEmployee(null);
  }, []);

  const handleResetView = () => {
    setSelectedSquad(INITIAL_SQUADS[0]);
    setSelectedEmployee(null);
    setModalSquad(null);
    triggerSound('click');
  };

  const activeEmployeeSquad = selectedEmployee
    ? squads.find((s) => s.members.some((m) => m.id === selectedEmployee.id)) || selectedSquad
    : selectedSquad;

  return (
    <main className="w-screen h-screen relative overflow-hidden bg-[#07090e] font-sans select-none">
      {/* Top Header: Golden Monospace HQ Title & Squad Pills (Hermes & Slytherin) */}
      <Navbar
        squads={squads}
        activeSquad={selectedSquad}
        onSelectSquad={handleSelectSquad}
        graphicMode={graphicMode}
        onGraphicModeChange={handleGraphicModeChange}
      />

      {/* Left Vertical Toolbar (Matching Reference Image) */}
      <LeftToolbar
        onResetView={handleResetView}
        filterMode={filterMode}
        onFilterChange={setFilterMode}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenPlaybooks={() => setIsPlaybookOpen(true)}
      />

      {/* Right Headquarters Command & Playbooks Panel (Matching Reference Image) */}
      <PlaybookSidebar
        squad={selectedSquad}
        onOpenSquadModal={() => setModalSquad(selectedSquad)}
        onSelectEmployeeById={handleSelectEmployeeById}
        isOpen={isPlaybookOpen}
        onToggleOpen={() => setIsPlaybookOpen((prev) => !prev)}
      />

      {/* 3D WebGL Canvas: Isometric Headquarters Room */}
      <div className="w-full h-full">
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
      </div>

      {/* Slide-out Employee Detail Drawer (Jira, Bitbucket, Blocker) */}
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

      {/* Bottom Minimalist Status Bar */}
      <BottomControls
        onResetView={handleResetView}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenSquadModal={() => setModalSquad(selectedSquad)}
      />

      {/* Eco Mode Frosted Blur Overlay when Asleep */}
      <EcoModeOverlay isAsleep={isAsleep} onWakeUp={handleWakeUp} />
    </main>
  );
};

export default App;
