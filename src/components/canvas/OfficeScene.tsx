import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';
import type { Squad, Employee, GraphicMode } from '../../types';
import { OfficeFloor } from './OfficeFloor';
import { DeskUnit } from './DeskUnit';
import { AvatarCharacter } from './AvatarCharacter';

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

  // Focus camera target smoothly when an employee or pod is clicked
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

  return (
    <div className="w-full h-full relative bg-[#e2e8f0]">
      <Canvas
        key={graphicMode} // Recreates canvas cleanly when switching performance vs quality
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
        shadows={isPerformance ? false : { type: THREE.PCFSoftShadowMap }}
        camera={{ position: [2.0, 26, 36], fov: 46, near: 0.1, far: 200 }}
        onPointerMissed={(e) => {
          if (e.target === (e.currentTarget as any).querySelector('canvas')) {
            onClearSelection();
          }
        }}
      >
        {/* Adaptive Dynamic Performance Helpers */}
        <AdaptiveDpr pixelated={isPerformance} />
        <AdaptiveEvents />

        {/* Ambient Office Lighting */}
        <ambientLight intensity={isPerformance ? 1.4 : 1.2} color="#ffffff" />

        {/* Directional Sun/Window Light from Right Windows */}
        <directionalLight
          position={[18, 26, 0]}
          intensity={isPerformance ? 1.0 : 1.4}
          color="#fffbeb"
          castShadow={!isPerformance}
          shadow-mapSize-width={isPerformance ? 256 : 1024}
          shadow-mapSize-height={isPerformance ? 256 : 1024}
          shadow-camera-far={80}
          shadow-camera-left={-16}
          shadow-camera-right={16}
          shadow-camera-top={28}
          shadow-camera-bottom={-28}
          shadow-bias={-0.0005}
        />

        {/* Soft Warm Fill Light */}
        <directionalLight position={[-14, 16, -6]} intensity={0.5} color="#fef3c7" />

        {/* Orbit Controls with bounded angles */}
        <OrbitControls
          ref={controlsRef}
          target={[selectedSquad ? selectedSquad.zoneCenter[0] : 1.0, 0, selectedSquad ? selectedSquad.zoneCenter[2] : 0]}
          makeDefault
          enableDamping
          dampingFactor={0.08}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={3}
          maxDistance={85}
        />

        {/* Real Office Floor Blueprint from BRI Photo for all squads */}
        <OfficeFloor
          squads={squads}
          onSelectSquad={onSelectSquad}
          selectedSquadId={selectedSquad?.id || null}
        />

        {/* Render Desks and Avatars for all Squads */}
        {squads.map((squad) =>
          squad.members.map((member) => {
            // Check filter
            if (filterMode === 'BLOCKERS' && !member.isBlocker) return null;
            if (filterMode === 'IDLE' && member.status !== 'idle') return null;

            const isSelected = selectedEmployee?.id === member.id;

            return (
              <group key={member.id}>
                {/* 3D Voxel Desk Setup */}
                <DeskUnit
                  position={member.deskPosition}
                  rotationY={member.rotationY}
                  status={member.status}
                  role={member.role}
                  isBlocker={member.isBlocker}
                />

                {/* 3D Voxel Character Sitting at Desk */}
                <AvatarCharacter
                  employee={member}
                  isSelected={isSelected}
                  onSelect={onSelectEmployee}
                />
              </group>
            );
          })
        )}
      </Canvas>
    </div>
  );
};
