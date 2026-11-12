import React, { useState, useCallback, lazy, Suspense } from 'react';
import { INITIAL_SQUADS } from './data/officeData';
import type { Squad, Employee, DocumentApprovals } from './types';
import { Navbar } from './components/ui/Navbar';
import { LeftToolbar } from './components/ui/LeftToolbar';
import { PlaybookSidebar } from './components/ui/PlaybookSidebar';
import { MemberDrawer } from './components/ui/MemberDrawer';
import { SquadModal } from './components/ui/SquadModal';
import { BottomControls } from './components/ui/BottomControls';
import { EcoModeOverlay } from './components/ui/EcoModeOverlay';
import { useSoundEffects } from './hooks/useSoundEffects';
import { useEcoMode } from './hooks/useEcoMode';
import { useGraphicMode } from './hooks/useGraphicMode';

// Lazy-load the 3D scene so the Three.js / R3F bundles (the bulk of the app's
// JS) download after the 2D dashboard shell has painted. OfficeScene is a named
// export, so adapt it to the default export React.lazy expects.
const OfficeScene = lazy(() =>
  import('./components/canvas/OfficeScene').then((m) => ({ default: m.OfficeScene }))
);

export const App: React.FC = () => {
  const [squads, setSquads] = useState<Squad[]>(() => INITIAL_SQUADS);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedSquad, setSelectedSquad] = useState<Squad>(() => INITIAL_SQUADS[0]);
  const [modalSquad, setModalSquad] = useState<Squad | null>(null);
  const [filterMode, setFilterMode] = useState<'ALL' | 'BLOCKERS' | 'IDLE'>('ALL');
  const [isPlaybookOpen, setIsPlaybookOpen] = useState<boolean>(true);
  // Whether the scene is focused on a single squad (hides other squads'
  // avatars). Toggled on by picking a squad; cleared by Reset View.
  const [isSquadFocused, setIsSquadFocused] = useState<boolean>(false);

  // UI sound effects (click / resolve / alert) with mute toggle
  const { soundEnabled, toggleSound, triggerSound } = useSoundEffects(true);

  // Eco / battery-saver mode: auto-sleep on AFK, tab-out, or window blur
  const { isAsleep, wakeUp } = useEcoMode();

  // Synchronize squads and selectedSquad during render if stale from HMR/state preservation
  if (
    squads.length !== INITIAL_SQUADS.length ||
    squads[0]?.id !== INITIAL_SQUADS[0]?.id ||
    !INITIAL_SQUADS.some((s) => s.id === selectedSquad.id)
  ) {
    setSquads(INITIAL_SQUADS);
    setSelectedSquad(INITIAL_SQUADS[0]);
  }

  // Graphic quality preference (performance vs quality) persisted to localStorage
  const [graphicMode, setGraphicMode] = useGraphicMode('quality');

  const handleGraphicModeChange = (mode: typeof graphicMode) => {
    setGraphicMode(mode);
    triggerSound('click');
  };

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

  // Select squad (from dropdown) -> focus the scene on just that squad
  const handleSelectSquad = useCallback(
    (squad: Squad) => {
      setSelectedSquad(squad);
      setSelectedEmployee(null);
      setIsSquadFocused(true);
      triggerSound('click');
    },
    [triggerSound]
  );

  const handleSelectSquadBanner = useCallback(
    (squad: Squad) => {
      setSelectedSquad(squad);
      setModalSquad(squad);
      setIsSquadFocused(true);
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
  const handleApproveStep = (squadId: string, step: keyof DocumentApprovals) => {
    setSquads((prev) =>
      prev.map((squad) => {
        if (squad.id === squadId) {
          const updatedApprovals: DocumentApprovals = {
            ...squad.metrics.approvals,
            [step]: !squad.metrics.approvals[step],
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

  // Reset View: clear the squad focus so every squad's avatars show again,
  // drop any selection/modal, and recenter the camera.
  // Clear only the squad filter (show every squad's avatars again). Unlike
  // Reset View, this keeps the camera, the selected squad and any open drawer.
  const handleClearSquadFilter = () => {
    setIsSquadFocused(false);
    triggerSound('click');
  };

  const handleResetView = () => {
    setSelectedSquad(INITIAL_SQUADS[0]);
    setSelectedEmployee(null);
    setModalSquad(null);
    setIsSquadFocused(false);
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
        isSquadFiltered={isSquadFocused}
        onClearSquadFilter={handleClearSquadFilter}
        graphicMode={graphicMode}
        onGraphicModeChange={handleGraphicModeChange}
      />

      {/* Left Vertical Toolbar (Matching Reference Image) */}
      <LeftToolbar
        onResetView={handleResetView}
        filterMode={filterMode}
        onFilterChange={setFilterMode}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
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

      {/* 3D WebGL Canvas: Isometric Headquarters Room (lazy-loaded) */}
      <div className="w-full h-full">
        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#07090e] text-slate-400 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-sky-400 animate-spin" />
              <span className="text-xs font-mono tracking-wider uppercase">
                Memuat Headquarters 3D...
              </span>
            </div>
          }
        >
          <OfficeScene
            squads={squads}
            selectedEmployee={selectedEmployee}
            selectedSquad={selectedSquad}
            focusActiveSquad={isSquadFocused}
            onSelectEmployee={handleSelectEmployee}
            onSelectSquad={handleSelectSquadBanner}
            onClearSelection={handleClearSelection}
            filterMode={filterMode}
            isAsleep={isAsleep}
            graphicMode={graphicMode}
          />
        </Suspense>
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
        onToggleSound={toggleSound}
        onOpenSquadModal={() => setModalSquad(selectedSquad)}
      />

      {/* Eco Mode Frosted Blur Overlay when Asleep */}
      <EcoModeOverlay isAsleep={isAsleep} onWakeUp={wakeUp} />
    </main>
  );
};

export default App;
