import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';
import type { Squad, Employee, GraphicMode } from '../../types';
import { OfficeFloor } from './OfficeFloor';
import { DeskInstances } from './DeskInstances';
import { AvatarInstances } from './AvatarInstances';
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
  isAsleep?: boolean;
  graphicMode?: GraphicMode;
}

export const OfficeScene: React.FC<OfficeSceneProps> = ({
  squads,
  selectedEmployee,
  selectedSquad,
  onSelectEmployee,
  onSelectSquad,
  onClearSelection,
  filterMode,
  isAsleep = false,
  graphicMode = 'quality',
}) => {
  const controlsRef = useRef<any>(null);

  // Focus camera target smoothly when an employee or squad is selected
  useEffect(() => {
    if (selectedEmployee && controlsRef.current) {
      const [x, y, z] = selectedEmployee.deskPosition;
      controlsRef.current.target.set(x, y + 0.8, z);
    } else if (selectedSquad && controlsRef.current) {
      const [x, y, z] = selectedSquad.zoneCenter;
      controlsRef.current.target.set(x, y + 0.8, z);
    }
  }, [selectedEmployee, selectedSquad]);

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
          ref={controlsRef}
          target={[selectedSquad ? selectedSquad.zoneCenter[0] : 6.0, 0.8, selectedSquad ? selectedSquad.zoneCenter[2] : 0]}
          makeDefault
          enableDamping
          dampingFactor={0.08}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={5}
          maxDistance={65}
        />

        {/* Oval Headquarters Room with Walls on All Sides */}
        <OfficeFloor
          squads={squads}
          onSelectSquad={onSelectSquad}
          selectedSquadId={selectedSquad?.id || null}
        />

        {/* Desks & avatars for all squads, GPU-instanced (a few draw calls total) */}
        <DeskInstances members={visibleMembers} capacity={capacity} />
        <AvatarInstances
          members={visibleMembers}
          capacity={capacity}
          selectedId={selectedEmployee?.id ?? null}
          onSelect={onSelectEmployee}
        />
      </Canvas>
      {import.meta.env.DEV && <PerfPanel />}
    </div>
  );
};
