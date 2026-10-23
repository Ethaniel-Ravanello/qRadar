import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';
import type { Squad, Employee } from '../../types';
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

  return (
    <div className="w-full h-full relative bg-[#e2e8f0]">
      <Canvas
        frameloop={isAsleep ? 'never' : 'always'}
        performance={{ min: 0.5 }}
        dpr={[1, 1.2]}
        gl={{
          powerPreference: 'high-performance',
          precision: 'mediump', // 16-bit precision: 2x faster fragment shader math on Intel/AMD GPUs
          antialias: false,     // Eliminates multisample renderbuffer overhead
          stencil: false,
          depth: true,
        }}
        shadows={{ type: THREE.BasicShadowMap }} // Ultra-fast lightweight shadow sampling
        camera={{ position: [1.0, 14, 16], fov: 40, near: 0.1, far: 80 }}
        onPointerMissed={(e) => {
          if (e.target === (e.currentTarget as any).querySelector('canvas')) {
            onClearSelection();
          }
        }}
      >
        {/* Adaptive Dynamic Performance Helpers */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Modern Bright Office Lighting */}
        <ambientLight intensity={1.2} color="#ffffff" />

        {/* Natural Daylight Coming from the RIGHT WINDOWS */}
        <directionalLight
          position={[16, 15, 2]}
          intensity={1.4}
          color="#fffbeb"
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-camera-far={40}
          shadow-camera-left={-14}
          shadow-camera-right={14}
          shadow-camera-top={14}
          shadow-camera-bottom={-14}
          shadow-bias={-0.001}
        />

        {/* Soft Warm Fill Light */}
        <directionalLight position={[-10, 12, -5]} intensity={0.5} color="#fef3c7" />

        {/* Orbit Controls with bounded angles */}
        <OrbitControls
          ref={controlsRef}
          target={[1.0, 0, 0]}
          makeDefault
          enableDamping
          dampingFactor={0.08}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={5}
          maxDistance={35}
        />

        {/* Real Office Floor Blueprint from BRI Photo */}
        <OfficeFloor
          squads={squads}
          onSelectSquad={onSelectSquad}
          selectedSquadId={selectedSquad?.id || null}
        />

        {/* Render Desks and Avatars for Squad QCash */}
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
