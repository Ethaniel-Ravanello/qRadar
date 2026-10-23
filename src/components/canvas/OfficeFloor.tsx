import React from 'react';
import { Html } from '@react-three/drei';
import type { Squad } from '../../types';

interface OfficeFloorProps {
  squads: Squad[];
  onSelectSquad: (squad: Squad) => void;
  selectedSquadId: string | null;
}

export const OfficeFloor: React.FC<OfficeFloorProps> = ({
  squads,
  onSelectSquad,
  selectedSquadId: _selectedSquadId,
}) => {
  void _selectedSquadId;
  const qcashSquad = squads[0];

  return (
    <group>
      {/* ============================================================== */}
      {/* 1. TERRAZZO FLOOR PLATE (Glossy White Terrazzo + Black Stripe) */}
      {/* ============================================================== */}

      {/* Main Bright Terrazzo Floor Plate */}
      <mesh position={[1, -0.05, 0]} receiveShadow>
        <boxGeometry args={[23, 0.1, 15]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} flatShading />
      </mesh>

      {/* Polished Black / Dark Granite Border Accent Along Central Aisle */}
      <mesh position={[1.4, 0.005, 0]}>
        <boxGeometry args={[0.18, 0.01, 14.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} flatShading />
      </mesh>
      <mesh position={[-1.8, 0.005, 0]}>
        <boxGeometry args={[0.18, 0.01, 14.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} flatShading />
      </mesh>

      {/* Central Walkway Tile Section */}
      <mesh position={[-0.2, 0.004, 0]}>
        <boxGeometry args={[3.0, 0.008, 14.8]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.25} flatShading />
      </mesh>

      {/* Pod Carpet Mats (Soft warm sand/cream under the parallel desk pods) */}
      {/* Left Pod Mat (2x2) */}
      <mesh position={[-4.9, 0.012, 0]}>
        <boxGeometry args={[4.8, 0.01, 4.8]} />
        <meshStandardMaterial color="#e2e8f0" flatShading roughness={0.7} />
      </mesh>
      {/* Right Long Pod Mat (2x4) */}
      <mesh position={[6.0, 0.012, 0]}>
        <boxGeometry args={[8.8, 0.01, 4.8]} />
        <meshStandardMaterial color="#e2e8f0" flatShading roughness={0.7} />
      </mesh>

      {/* ============================================================== */}
      {/* 2. LEFT SIDE: CARVED BATIK WOODEN SCREEN (Wall Only, NO ROOF) */}
      {/* ============================================================== */}
      <group position={[-8.5, 0, 0]}>
        {/* Grey Wall Behind Left Desks */}
        <mesh position={[-0.2, 1.3, 0]} castShadow>
          <boxGeometry args={[0.3, 2.6, 14.8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.8} flatShading />
        </mesh>

        {/* Lotus / Batik Carved Wooden Feature Panel */}
        <group position={[0, 1.3, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.15, 2.5, 2.6]} />
            <meshStandardMaterial color="#b45309" roughness={0.4} flatShading />
          </mesh>
          {/* Decorative Lotus Lattice Cutouts */}
          {[-0.8, 0, 0.8].map((z, i) => (
            <mesh key={i} position={[0.08, 0, z]}>
              <boxGeometry args={[0.04, 0.8, 0.6]} />
              <meshStandardMaterial color="#78350f" flatShading />
            </mesh>
          ))}
        </group>
      </group>

      {/* ============================================================== */}
      {/* 3. RIGHT SIDE: PANORAMIC WINDOWS WITH ROLLER BLINDS            */}
      {/* ============================================================== */}
      <group position={[11.5, 0, 0]}>
        {/* Lower Window Sill */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.3, 0.7, 14.8]} />
          <meshStandardMaterial color="#f1f5f9" flatShading />
        </mesh>

        {/* Panoramic Glass Panes */}
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[0.04, 1.8, 14.6]} />
          <meshStandardMaterial color="#bae6fd" transparent opacity={0.35} flatShading />
        </mesh>

        {/* Translucent Roller Blinds (Half-drawn) */}
        {[-4.5, -1.5, 1.5, 4.5].map((z, i) => (
          <mesh key={i} position={[-0.03, 1.9, z]}>
            <boxGeometry args={[0.02, 1.2, 2.8]} />
            <meshStandardMaterial color="#fef9c3" transparent opacity={0.85} flatShading />
          </mesh>
        ))}

        {/* Window Pillars */}
        {[-6, -3, 0, 3, 6].map((z, i) => (
          <mesh key={i} position={[0, 1.6, z]}>
            <boxGeometry args={[0.18, 2.0, 0.2]} />
            <meshStandardMaterial color="#e2e8f0" flatShading />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 4. OFFICE AIR PURIFIER UNIT (Next to Right Aisle)              */}
      {/* ============================================================== */}
      <group position={[1.8, 0, 3.2]}>
        {/* White Tower Body */}
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[0.32, 0.84, 0.3]} />
          <meshStandardMaterial color="#ffffff" flatShading />
        </mesh>
        {/* Top Dark Grill */}
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[0.28, 0.02, 0.26]} />
          <meshStandardMaterial color="#1e293b" flatShading />
        </mesh>
        {/* LED Air Quality Ring */}
        <mesh position={[-0.165, 0.68, 0]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 5. BACK WALL (REAR OF ROOM)                                    */}
      {/* ============================================================== */}
      <group position={[1, 1.3, -7.4]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[23, 2.6, 0.3]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.6} flatShading />
        </mesh>

        {/* Filing Cabinets Along Back Wall */}
        <mesh position={[5.5, -0.6, 0.25]}>
          <boxGeometry args={[6.0, 1.2, 0.5]} />
          <meshStandardMaterial color="#cbd5e1" flatShading />
        </mesh>

        {/* Daily Scrum / Sprint 34 Board */}
        <group position={[-1.5, 0.2, 0.2]}>
          <mesh>
            <boxGeometry args={[4.2, 1.8, 0.06]} />
            <meshStandardMaterial color="#0284c7" flatShading />
          </mesh>
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[4.0, 1.6]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} flatShading />
          </mesh>
          {/* Sticky Post-it Notes */}
          {[-1.4, -0.8, -0.2, 0.4, 1.0, 1.5].map((x, i) => (
            <mesh key={i} position={[x, (i % 2 === 0 ? 0.25 : -0.25), 0.045]}>
              <planeGeometry args={[0.3, 0.3]} />
              <meshBasicMaterial
                color={i % 3 === 0 ? '#fde047' : i % 3 === 1 ? '#7dd3fc' : '#f9a8d4'}
              />
            </mesh>
          ))}
          <Html position={[0, 0.65, 0.05]} center distanceFactor={14}>
            <div className="font-bold text-white text-[9px] uppercase tracking-wider select-none bg-blue-600 px-2 py-0.5 rounded">
              DAILY SCRUM QCASH • SPRINT 34
            </div>
          </Html>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 6. SQUAD QCASH 3D FLOATING BANNER                              */}
      {/* ============================================================== */}
      {qcashSquad && (
        <Html position={[1.5, 3.4, 0]} center distanceFactor={18} zIndexRange={[60, 0]}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectSquad(qcashSquad);
            }}
            className="group px-4 py-2 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-3 cursor-pointer transition-all transform hover:scale-105 active:scale-95 bg-slate-900/90 border-blue-500/80 text-white"
          >
            <div className="w-3.5 h-3.5 rounded-md bg-sky-400 animate-pulse" />
            <div className="text-left">
              <div className="text-[13px] font-black uppercase tracking-wider flex items-center gap-2">
                <span>{qcashSquad.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 text-sky-200 border border-blue-400">
                  {qcashSquad.sprint.split(' ')[0]}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                Target: <strong className="text-sky-300">{qcashSquad.metrics.completedStoryPoints}/{qcashSquad.metrics.totalStoryPoints} SP</strong> ({Math.round((qcashSquad.metrics.completedStoryPoints / qcashSquad.metrics.totalStoryPoints) * 100)}%)
                {qcashSquad.metrics.defects.p1 > 0 && (
                  <span className="ml-2 text-red-400 font-bold">⚠️ {qcashSquad.metrics.defects.p1} P1</span>
                )}
              </div>
            </div>
          </button>
        </Html>
      )}
    </group>
  );
};
