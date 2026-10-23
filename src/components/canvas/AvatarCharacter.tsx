import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Employee } from '../../types';

interface AvatarCharacterProps {
  employee: Employee;
  isSelected: boolean;
  onSelect: (emp: Employee) => void;
}

export const AvatarCharacter: React.FC<AvatarCharacterProps> = ({
  employee,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);

  // Correct seating offset based on desk rotation
  const chairDistance = 0.46;
  const posX = employee.deskPosition[0] + Math.sin(employee.rotationY) * chairDistance;
  const posY = employee.deskPosition[1];
  const posZ = employee.deskPosition[2] + Math.cos(employee.rotationY) * chairDistance;

  // Optimized lightweight voxel typing animation
  useFrame((state) => {
    if (employee.status !== 'idle') {
      const t = state.clock.getElapsedTime();
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = -0.7 + Math.sin(t * 7) * 0.035;
        rightArmRef.current.rotation.x = -0.7 + Math.cos(t * 7) * 0.035;
      }
      if (headRef.current) {
        headRef.current.position.y = 1.12 + Math.sin(t * 1.8) * 0.008;
      }
    }
  });

  const getRoleBg = (role: string) => {
    switch (role) {
      case 'FE':
        return 'bg-pink-500 text-white';
      case 'BE':
        return 'bg-blue-600 text-white';
      case 'QA':
        return 'bg-emerald-600 text-white';
      case 'SL':
        return 'bg-amber-500 text-white font-bold';
      default:
        return 'bg-purple-600 text-white';
    }
  };

  // Performance win: Only mount heavy DOM <Html> when actually needed (Blocker, Hovered, or Selected)
  const shouldRenderHtml = employee.isBlocker || hovered || isSelected;

  return (
    <group
      position={[posX, posY, posZ]}
      rotation={[0, employee.rotationY + Math.PI, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(employee);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Selection / Hover Indicator Ring on Floor */}
      {(hovered || isSelected) && (
        <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.42, 0.52, 8]} />
          <meshBasicMaterial
            color={isSelected ? '#38bdf8' : '#f59e0b'}
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* Voxel Sitting Legs */}
      <group position={[0, 0.44, 0]}>
        <mesh position={[-0.1, 0, -0.16]}>
          <boxGeometry args={[0.14, 0.14, 0.34]} />
          <meshStandardMaterial color="#1e293b" flatShading />
        </mesh>
        <mesh position={[0.1, 0, -0.16]}>
          <boxGeometry args={[0.14, 0.14, 0.34]} />
          <meshStandardMaterial color="#1e293b" flatShading />
        </mesh>
        <mesh position={[-0.1, -0.22, -0.32]}>
          <boxGeometry args={[0.12, 0.42, 0.14]} />
          <meshStandardMaterial color="#0f172a" flatShading />
        </mesh>
        <mesh position={[0.1, -0.22, -0.32]}>
          <boxGeometry args={[0.12, 0.42, 0.14]} />
          <meshStandardMaterial color="#0f172a" flatShading />
        </mesh>
      </group>

      {/* Voxel Torso with Role Color */}
      <mesh position={[0, 0.74, 0]}>
        <boxGeometry args={[0.38, 0.46, 0.24]} />
        <meshStandardMaterial color={employee.avatarColor} flatShading roughness={0.6} />
      </mesh>

      {/* BRI ID Lanyard on Chest */}
      <mesh position={[0, 0.73, 0.125]}>
        <planeGeometry args={[0.12, 0.16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.73, 0.128]}>
        <planeGeometry args={[0.1, 0.05]} />
        <meshBasicMaterial color="#00529c" />
      </mesh>

      {/* Voxel Left Arm */}
      <mesh
        ref={leftArmRef}
        position={[-0.24, 0.85, 0.02]}
        rotation={[-0.7, 0, 0.2]}
      >
        <boxGeometry args={[0.1, 0.38, 0.1]} />
        <meshStandardMaterial color={employee.avatarColor} flatShading />
      </mesh>

      {/* Voxel Right Arm */}
      <mesh
        ref={rightArmRef}
        position={[0.24, 0.85, 0.02]}
        rotation={[-0.7, 0, -0.2]}
      >
        <boxGeometry args={[0.1, 0.38, 0.1]} />
        <meshStandardMaterial color={employee.avatarColor} flatShading />
      </mesh>

      {/* Voxel Head & Accessories */}
      <group ref={headRef} position={[0, 1.12, 0]}>
        {/* Head Cube */}
        <mesh>
          <boxGeometry args={[0.3, 0.3, 0.28]} />
          <meshStandardMaterial color="#fed7aa" flatShading roughness={0.5} />
        </mesh>

        {/* Pixel Hair */}
        <mesh position={[0, 0.1, -0.02]}>
          <boxGeometry args={[0.32, 0.14, 0.3]} />
          <meshStandardMaterial color="#1c1917" flatShading />
        </mesh>
        <mesh position={[0, 0.04, -0.15]}>
          <boxGeometry args={[0.32, 0.24, 0.04]} />
          <meshStandardMaterial color="#1c1917" flatShading />
        </mesh>

        {/* Pixel Eyes */}
        <mesh position={[-0.07, 0.01, 0.142]}>
          <boxGeometry args={[0.04, 0.04, 0.01]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.07, 0.01, 0.142]}>
          <boxGeometry args={[0.04, 0.04, 0.01]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>

        {/* Voxel Headphones */}
        <group>
          <mesh position={[0, 0.17, 0]}>
            <boxGeometry args={[0.34, 0.04, 0.08]} />
            <meshStandardMaterial color="#0f172a" flatShading />
          </mesh>
          <mesh position={[-0.17, 0, 0]}>
            <boxGeometry args={[0.05, 0.12, 0.12]} />
            <meshStandardMaterial color="#f97316" flatShading />
          </mesh>
          <mesh position={[0.17, 0, 0]}>
            <boxGeometry args={[0.05, 0.12, 0.12]} />
            <meshStandardMaterial color="#f97316" flatShading />
          </mesh>
        </group>
      </group>

      {/* 3D Mini Role Dot above head (Super lightweight pure WebGL, 0 DOM overhead) */}
      {!shouldRenderHtml && (
        <group position={[0, 1.45, 0]}>
          <mesh>
            <boxGeometry args={[0.12, 0.06, 0.06]} />
            <meshBasicMaterial color={employee.avatarColor} />
          </mesh>
        </group>
      )}

      {/* Floating Tag / Speech Bubble (Conditionally Mounted to save 85% DOM reflows) */}
      {shouldRenderHtml && (
        <Html
          position={[0, 1.55, 0]}
          center
          distanceFactor={14}
          zIndexRange={[100, 0]}
          style={{ pointerEvents: 'auto' }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelect(employee);
            }}
            className="flex flex-col items-center cursor-pointer select-none transition-transform duration-150"
          >
            <div
              className={`px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-md border text-xs max-w-[210px] ${
                employee.isBlocker
                  ? 'bg-red-950/95 border-red-500 text-red-100 ring-2 ring-red-500/50 animate-pulse'
                  : employee.status === 'deploying'
                  ? 'bg-emerald-950/95 border-emerald-500 text-emerald-100'
                  : employee.status === 'idle'
                  ? 'bg-slate-900/95 border-slate-600 text-slate-300'
                  : 'bg-slate-900/95 border-slate-700 text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 pb-1 border-b border-white/10">
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider ${getRoleBg(
                    employee.role
                  )}`}
                >
                  {employee.role}
                </span>
                <span className="font-semibold text-slate-200 truncate">
                  {employee.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-400 font-mono ml-auto">
                  PN {employee.pn}
                </span>
              </div>
              <p className="text-[11px] leading-tight font-medium text-slate-100">
                {employee.speechBubble}
              </p>
            </div>
            <div
              className={`w-2.5 h-2.5 rotate-45 -mt-1.5 border-r border-b ${
                employee.isBlocker
                  ? 'bg-red-950 border-red-500'
                  : employee.status === 'deploying'
                  ? 'bg-emerald-950 border-emerald-500'
                  : 'bg-slate-900 border-slate-700'
              }`}
            />
          </div>
        </Html>
      )}
    </group>
  );
};
