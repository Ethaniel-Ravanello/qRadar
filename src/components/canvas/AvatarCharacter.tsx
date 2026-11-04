import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Employee } from '../../types';

interface AvatarCharacterProps {
  employee: Employee;
  isSelected: boolean;
  onSelect: (emp: Employee) => void;
}

const AvatarCharacterComponent: React.FC<AvatarCharacterProps> = ({
  employee,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);

  const isStanding = employee.isStanding ?? false;

  // Position calculation
  const chairDistance = isStanding ? 0 : 0.52;
  const posX = employee.deskPosition[0] + Math.sin(employee.rotationY) * chairDistance;
  const posY = employee.deskPosition[1];
  const posZ = employee.deskPosition[2] + Math.cos(employee.rotationY) * chairDistance;

  // Only idle seated avatars have nothing to animate; everyone else does.
  const isAnimated = isStanding || employee.status !== 'idle';

  // Animation — skip subscribing entirely when there is nothing to move.
  useFrame((state) => {
    if (!isAnimated) return;
    const t = state.clock.getElapsedTime();
    if (isStanding) {
      if (headRef.current) {
        headRef.current.position.y = 1.08 + Math.sin(t * 1.5) * 0.008;
      }
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(t * 2) * 0.05;
        rightArmRef.current.rotation.x = -Math.sin(t * 2) * 0.05;
      }
    } else {
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = -0.7 + Math.sin(t * 7) * 0.035;
        rightArmRef.current.rotation.x = -0.7 + Math.cos(t * 7) * 0.035;
      }
      if (headRef.current) {
        headRef.current.position.y = 1.12 + Math.sin(t * 1.8) * 0.008;
      }
    }
  });

  // Reset the shared body cursor if this avatar unmounts while still hovered
  // (e.g. a status filter removes it), otherwise the pointer stays stuck.
  // Tracked in a ref with an unmount-only cleanup: a [hovered]-dependent
  // cleanup would also fire on every hover change, running after a
  // neighbouring avatar's onPointerOver and clobbering its 'pointer' cursor.
  const hoveredRef = useRef(false);
  useEffect(() => {
    return () => {
      if (hoveredRef.current) document.body.style.cursor = 'auto';
    };
  }, []);

  // Status dot color (matching reference image)
  const statusDotColor = employee.isBlocker
    ? '#ef4444' // Red
    : employee.status === 'testing'
    ? '#06b6d4' // Cyan
    : employee.status === 'idle'
    ? '#eab308' // Amber
    : '#22c55e'; // Green active

  const displayName = employee.shortName || employee.name.split(' ')[0];

  return (
    <group
      position={[posX, posY, posZ]}
      rotation={[0, isStanding ? employee.rotationY : employee.rotationY + Math.PI, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(employee);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        hoveredRef.current = true;
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        hoveredRef.current = false;
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Selection / Hover Indicator Ring on Floor */}
      {(hovered || isSelected) && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.38, 0.48, 16]} />
          <meshBasicMaterial
            color={isSelected ? '#38bdf8' : '#f59e0b'}
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
          />
        </mesh>
      )}

      {/* Voxel Legs: Standing or Seated */}
      {isStanding ? (
        <group position={[0, 0.22, 0]}>
          <mesh position={[-0.09, 0, 0]}>
            <boxGeometry args={[0.12, 0.44, 0.14]} />
            <meshStandardMaterial color="#1e2230" flatShading />
          </mesh>
          <mesh position={[0.09, 0, 0]}>
            <boxGeometry args={[0.12, 0.44, 0.14]} />
            <meshStandardMaterial color="#1e2230" flatShading />
          </mesh>
        </group>
      ) : (
        <group position={[0, 0.44, 0]}>
          {/* Lap */}
          <mesh position={[-0.1, 0, -0.16]}>
            <boxGeometry args={[0.13, 0.13, 0.34]} />
            <meshStandardMaterial color="#1e2230" flatShading />
          </mesh>
          <mesh position={[0.1, 0, -0.16]}>
            <boxGeometry args={[0.13, 0.13, 0.34]} />
            <meshStandardMaterial color="#1e2230" flatShading />
          </mesh>
          {/* Lower legs */}
          <mesh position={[-0.1, -0.22, -0.32]}>
            <boxGeometry args={[0.11, 0.42, 0.13]} />
            <meshStandardMaterial color="#0f172a" flatShading />
          </mesh>
          <mesh position={[0.1, -0.22, -0.32]}>
            <boxGeometry args={[0.11, 0.42, 0.13]} />
            <meshStandardMaterial color="#0f172a" flatShading />
          </mesh>
        </group>
      )}

      {/* Voxel Torso (Cozy sweater/polo matching reference image) */}
      <mesh position={[0, isStanding ? 0.66 : 0.74, 0]}>
        <boxGeometry args={[0.36, 0.44, 0.22]} />
        <meshStandardMaterial color={employee.avatarColor} flatShading roughness={0.6} />
      </mesh>

      {/* BRI ID Lanyard on Chest */}
      <mesh position={[0, isStanding ? 0.66 : 0.73, 0.115]}>
        <planeGeometry args={[0.1, 0.14]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, isStanding ? 0.66 : 0.73, 0.118]}>
        <planeGeometry args={[0.08, 0.04]} />
        <meshBasicMaterial color="#00529c" />
      </mesh>

      {/* Arms */}
      <mesh
        ref={leftArmRef}
        position={[-0.23, isStanding ? 0.66 : 0.85, isStanding ? 0 : 0.02]}
        rotation={isStanding ? [0, 0, 0.08] : [-0.7, 0, 0.2]}
      >
        <boxGeometry args={[0.09, 0.38, 0.09]} />
        <meshStandardMaterial color={employee.avatarColor} flatShading />
      </mesh>

      <mesh
        ref={rightArmRef}
        position={[0.23, isStanding ? 0.66 : 0.85, isStanding ? 0 : 0.02]}
        rotation={isStanding ? [0, 0, -0.08] : [-0.7, 0, -0.2]}
      >
        <boxGeometry args={[0.09, 0.38, 0.09]} />
        <meshStandardMaterial color={employee.avatarColor} flatShading />
      </mesh>

      {/* Voxel Head & Hair */}
      <group ref={headRef} position={[0, isStanding ? 1.04 : 1.12, 0]}>
        {/* Head Cube */}
        <mesh>
          <boxGeometry args={[0.28, 0.28, 0.26]} />
          <meshStandardMaterial color="#fed7aa" flatShading roughness={0.5} />
        </mesh>

        {/* Pixel Hair */}
        <mesh position={[0, 0.09, -0.02]}>
          <boxGeometry args={[0.3, 0.14, 0.28]} />
          <meshStandardMaterial color="#1c1917" flatShading />
        </mesh>
        <mesh position={[0, 0.03, -0.14]}>
          <boxGeometry args={[0.3, 0.22, 0.04]} />
          <meshStandardMaterial color="#1c1917" flatShading />
        </mesh>

        {/* Pixel Eyes */}
        <mesh position={[-0.065, 0.01, 0.132]}>
          <boxGeometry args={[0.035, 0.035, 0.01]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.065, 0.01, 0.132]}>
          <boxGeometry args={[0.035, 0.035, 0.01]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* Floating Name Badge Pill: Only mount HTML when Hovered, Selected, or Active Blocker! */}
      {(hovered || isSelected || employee.isBlocker) && (
        <Html
          position={[0, isStanding ? 1.48 : 1.56, 0]}
          center
          distanceFactor={13}
          zIndexRange={[5, 0]}
          style={{ pointerEvents: 'auto' }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelect(employee);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-md border text-xs cursor-pointer select-none transition-all transform hover:scale-110 shadow-2xl ${
              isSelected
                ? 'bg-slate-900/95 border-sky-400 ring-2 ring-sky-400/50 text-white'
                : employee.isBlocker
                ? 'bg-red-950/90 border-red-500 text-red-200'
                : 'bg-slate-900/95 border-slate-500 text-white'
            }`}
          >
            {/* Short Name */}
            <span className="font-bold tracking-tight text-[11px] whitespace-nowrap">
              {displayName}
            </span>

            {/* Status Dot (Red/Green/Amber/Cyan) */}
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                employee.isBlocker ? 'animate-ping' : ''
              }`}
              style={{ backgroundColor: statusDotColor }}
            />

            {/* Expanded Speech Tooltip on Hover */}
            {hovered && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-48 p-2 rounded-xl bg-slate-950/95 border border-slate-700 text-[10px] text-slate-200 shadow-2xl z-50 pointer-events-none">
                <div className="font-bold text-sky-400 flex items-center justify-between">
                  <span>{employee.role} • PN {employee.pn}</span>
                  {employee.isBlocker && <span className="text-red-400 font-black">BLOCKER</span>}
                </div>
                <p className="mt-0.5 leading-snug line-clamp-2">{employee.speechBubble}</p>
              </div>
            )}
          </div>
        </Html>
      )}

      {/* Discrete 3D Indicator Dot when NOT hovered / selected / blocker (Zero DOM Overhead!) */}
      {!(hovered || isSelected || employee.isBlocker) && (
        <mesh position={[0, isStanding ? 1.48 : 1.56, 0]}>
          <boxGeometry args={[0.08, 0.04, 0.04]} />
          <meshBasicMaterial color={statusDotColor} />
        </mesh>
      )}
    </group>
  );
};

// Memoize: avatars only need to re-render when their own selection state or
// the (static) employee data changes — not when unrelated App state updates.
export const AvatarCharacter = React.memo(AvatarCharacterComponent);
