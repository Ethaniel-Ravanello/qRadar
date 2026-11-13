import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';
import type { Squad, Employee, GraphicMode } from '../../types';
import { OfficeFloor } from './OfficeFloor';
import { BriDecor } from './BriDecor';
import { DeskInstances } from './DeskInstances';
import { AvatarInstances } from './AvatarInstances';
import { CameraKeyboardControls } from './CameraKeyboardControls';
import { CameraFocus, type Vec3 } from './CameraFocus';
import { MEMBER_DRAWER_WIDTH } from '../ui/layout';
// Dev-only perf monitor; the import.meta.env.DEV guards below let the
// production build tree-shake it out entirely.
import { PerfProbe, PerfPanel } from './PerfMonitor';

interface OfficeSceneProps {
  squads: Squad[];
  selectedEmployee: Employee | null;
  selectedSquad: Squad | null;
  onSelectEmployee: (emp: Employee) => void;
  onSelectSquad: (squad: Squad) => void;
  onClearSelection: () => void;
  filterMode: 'ALL' | 'BLOCKERS' | 'IDLE';
  /** When true, only the selected squad's avatars are rendered. */
  focusActiveSquad?: boolean;
  isAsleep?: boolean;
  graphicMode?: GraphicMode;
}

export const OfficeScene: React.FC<OfficeSceneProps> = ({
  squads,
  selectedEmployee,
  selectedSquad,
  focusActiveSquad = false,
  onSelectEmployee,
  onSelectSquad,
  onClearSelection,
  filterMode,
  isAsleep = false,
  graphicMode = 'quality',
}) => {
  // Initial orbit pivot only. Later moves are animated by <CameraFocus>, so this
  // must stay constant (a changing `target` prop would snap the camera).
  const [initialTarget] = useState<Vec3>(() =>
    selectedSquad ? [selectedSquad.zoneCenter[0], 0.8, selectedSquad.zoneCenter[2]] : [6, 0.8, 0]
  );

  // Head height of the selected person's avatar (seated: chair is 0.52 in front
  // of the desk, same as AvatarInstances' avatarRoot).
  const personPoint = useMemo<Vec3 | null>(() => {
    if (!selectedEmployee) return null;
    const [x, , z] = selectedEmployee.deskPosition;
    const r = selectedEmployee.rotationY;
    const chair = selectedEmployee.isStanding ? 0 : 0.52;
    return [x + Math.sin(r) * chair, 1.0, z + Math.cos(r) * chair];
  }, [selectedEmployee]);
  const squadPoint = useMemo<Vec3 | null>(
    () => (selectedSquad ? [selectedSquad.zoneCenter[0], 0.8, selectedSquad.zoneCenter[2]] : null),
    [selectedSquad]
  );

  const isPerformance = graphicMode === 'performance';

  // Flattened + filtered member list feeding the instanced desks/avatars.
  // Memoized so selection changes don't rewrite instance buffers.
  const capacity = useMemo(() => squads.reduce((n, s) => n + s.members.length, 0), [squads]);
  const visibleMembers = useMemo(
    () =>
      squads
        .flatMap((s) => s.members)
        .filter((m) => {
          if (filterMode === 'BLOCKERS') return m.isBlocker;
          if (filterMode === 'IDLE') return m.status === 'idle';
          return true;
        }),
    [squads, filterMode]
  );

  // When focused on a squad, only its avatars are rendered; avatars of other
  // squads are dropped entirely (no draw, no per-frame animation) while their
  // desks stay, so the room still reads as populated. Avatars are the costly
  // part (more parts + the only per-frame work), so this is the real win.
  // Reset View clears the focus (focusActiveSquad=false) -> every avatar shows.
  const avatarMembers = useMemo(() => {
    if (!focusActiveSquad || !selectedSquad) return visibleMembers;
    const activeIds = new Set(selectedSquad.members.map((m) => m.id));
    return visibleMembers.filter((m) => activeIds.has(m.id));
  }, [focusActiveSquad, selectedSquad, visibleMembers]);

  return (
    <div className="w-full h-full relative bg-[#07090e]">
      <Canvas
        key={graphicMode}
        frameloop={isAsleep ? 'never' : 'always'}
        performance={{ min: 0.5 }}
        dpr={isPerformance ? [0.75, 1.0] : [1.0, 1.5]}
        gl={{
          powerPreference: isPerformance ? 'low-power' : 'high-performance',
          precision: isPerformance ? 'mediump' : 'highp',
          antialias: !isPerformance,
          stencil: false,
          depth: true,
        }}
        // PCFSoftShadowMap was removed in three r18x (it silently falls back to
        // PCFShadowMap with a console warning), so request PCF explicitly.
        shadows={isPerformance ? false : { type: THREE.PCFShadowMap }}
        camera={{ position: [22, 24, 25], fov: 42, near: 0.1, far: 160 }}
        onPointerMissed={() => {
          onClearSelection();
        }}
      >
        {/* Adaptive Dynamic Performance Helpers */}
        <AdaptiveDpr pixelated={isPerformance} />
        <AdaptiveEvents />
        {import.meta.env.DEV && <PerfProbe />}

        {/* Ambient Room Lighting */}
        <ambientLight intensity={isPerformance ? 1.4 : 1.25} color="#ffffff" />

        {/* Warm Sunlight & Studio Directional Light */}
        <directionalLight
          position={[20, 30, 0]}
          intensity={isPerformance ? 1.1 : 1.45}
          color="#fffbeb"
          castShadow={!isPerformance}
          shadow-mapSize-width={isPerformance ? 256 : 1024}
          shadow-mapSize-height={isPerformance ? 256 : 1024}
          shadow-camera-far={85}
          shadow-camera-left={-32}
          shadow-camera-right={32}
          shadow-camera-top={32}
          shadow-camera-bottom={-32}
          shadow-bias={-0.0001}
          shadow-normalBias={0.03}
        />

        {/* Soft Warm Interior Fill Light */}
        <directionalLight position={[-18, 22, -6]} intensity={0.5} color="#fed7aa" />

        {/* Orbit Controls with bounded angles */}
        <OrbitControls
          target={initialTarget}
          makeDefault
          enableDamping
          dampingFactor={0.08}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={5}
          maxDistance={65}
        />

        {/* WASD = move, Space = up, Shift = down (moves camera + orbit pivot) */}
        <CameraKeyboardControls enabled={!isAsleep} />

        {/* Smooth fly-to on person / squad selection; keeps the person clear of the drawer */}
        <CameraFocus
          personKey={selectedEmployee?.id ?? null}
          personPoint={personPoint}
          squadKey={selectedSquad?.id ?? null}
          squadPoint={squadPoint}
          coveredRightPx={selectedEmployee ? MEMBER_DRAWER_WIDTH : 0}
        />

        {/* Oval Headquarters Room with Walls on All Sides */}
        <OfficeFloor
          squads={squads}
          onSelectSquad={onSelectSquad}
          selectedSquadId={selectedSquad?.id || null}
        />
        <BriDecor />

        {/* Desks for every visible squad; avatars only for the focused squad. */}
        <DeskInstances members={visibleMembers} capacity={capacity} />
        <AvatarInstances
          members={avatarMembers}
          capacity={capacity}
          selectedId={selectedEmployee?.id ?? null}
          onSelect={onSelectEmployee}
        />
      </Canvas>
      {import.meta.env.DEV && <PerfPanel />}
    </div>
  );
};
