import React, { useState } from 'react';
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
  selectedSquadId,
}) => {
  const [hoveredSquadId, setHoveredSquadId] = useState<string | null>(null);

  return (
    <group>
      {/* ============================================================== */}
      {/* 1. TERRAZZO FLOOR PLATE (Extended 48m depth for 10 Rows)       */}
      {/* ============================================================== */}
      {/* Main Floor Plate spanning 48m depth along Z */}
      <mesh position={[1.5, -0.05, 0]} receiveShadow>
        <boxGeometry args={[23, 0.1, 48]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} flatShading />
      </mesh>

      {/* Central Walkway Tile Section running from front to back */}
      <mesh position={[-0.2, 0.004, 0]}>
        <boxGeometry args={[3.2, 0.008, 47.6]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.25} flatShading />
      </mesh>

      {/* Polished Black / Dark Granite Border Accents along Central Aisle */}
      <mesh position={[1.4, 0.005, 0]}>
        <boxGeometry args={[0.18, 0.01, 47.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} flatShading />
      </mesh>
      <mesh position={[-1.8, 0.005, 0]}>
        <boxGeometry args={[0.18, 0.01, 47.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} flatShading />
      </mesh>

      {/* ============================================================== */}
      {/* 2. SQUAD POD MATS & AIR PURIFIERS (For all 10 Rows along Z)    */}
      {/* ============================================================== */}
      {squads.map((squad, idx) => {
        const cz = squad.zoneCenter[2];
        const isHovered = hoveredSquadId === squad.id;
        const isSelected = selectedSquadId === squad.id;
        const showBadge = isHovered || isSelected;

        return (
          <group
            key={`squad-pod-${squad.id}`}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredSquadId(squad.id);
            }}
            onPointerOut={() => {
              setHoveredSquadId(null);
            }}
          >
            {/* Pod Carpet Mats */}
            {/* Left Pod Mat (2x2 desks) */}
            <mesh position={[-4.9, 0.012, cz]}>
              <boxGeometry args={[4.8, 0.01, 3.4]} />
              <meshStandardMaterial
                color={isSelected ? '#cbd5e1' : '#e2e8f0'}
                flatShading
                roughness={0.7}
              />
            </mesh>
            {/* Right Pod Mat (2x3 desks) */}
            <mesh position={[5.1, 0.012, cz]}>
              <boxGeometry args={[6.8, 0.01, 3.4]} />
              <meshStandardMaterial
                color={isSelected ? '#cbd5e1' : '#e2e8f0'}
                flatShading
                roughness={0.7}
              />
            </mesh>

            {/* Air Purifier Unit near the squad aisle entrance */}
            <group position={[1.8, 0, cz + 1.6]}>
              <mesh position={[0, 0.42, 0]} castShadow>
                <boxGeometry args={[0.32, 0.84, 0.3]} />
                <meshStandardMaterial color="#ffffff" flatShading />
              </mesh>
              <mesh position={[0, 0.85, 0]}>
                <boxGeometry args={[0.28, 0.02, 0.26]} />
                <meshStandardMaterial color="#1e293b" flatShading />
              </mesh>
              <mesh position={[-0.165, 0.68, 0]}>
                <planeGeometry args={[0.08, 0.08]} />
                <meshBasicMaterial color={squad.zoneColor} />
              </mesh>
            </group>

            {/* Left Wall Squad Signboard Badge (Only mount HTML on hover or when selected) */}
            <group position={[-8.45, 1.8, cz]}>
              <mesh>
                <boxGeometry args={[0.05, 0.6, 2.4]} />
                <meshStandardMaterial color="#1e293b" flatShading />
              </mesh>
              {showBadge && (
                <Html position={[0.04, 0, 0]} rotation={[0, Math.PI / 2, 0]} center distanceFactor={14}>
                  <div
                    className="font-bold text-white text-[10px] uppercase tracking-wider select-none px-2 py-1 rounded shadow-lg border whitespace-nowrap"
                    style={{
                      backgroundColor: `${squad.zoneColor}ee`,
                      borderColor: squad.zoneColor,
                    }}
                  >
                    ROW {idx + 1} • {squad.alias.toUpperCase()} • {squad.sprint.split(' ')[0]}
                  </div>
                </Html>
              )}
            </group>
          </group>
        );
      })}

      {/* ============================================================== */}
      {/* 3. LEFT WALL: CARVED BATIK WOODEN SCREEN PANELS                */}
      {/* ============================================================== */}
      <group position={[-8.5, 0, 0]}>
        {/* Grey Wall running along Z (48m length) */}
        <mesh position={[-0.2, 1.3, 0]} castShadow>
          <boxGeometry args={[0.3, 2.6, 47.8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.8} flatShading />
        </mesh>

        {/* Decorative Lotus / Batik Carved Wooden Panels along each Row */}
        {squads.map((squad) => (
          <group key={`batik-${squad.id}`} position={[0, 1.3, squad.zoneCenter[2]]}>
            <mesh castShadow>
              <boxGeometry args={[0.15, 2.5, 2.6]} />
              <meshStandardMaterial color="#b45309" roughness={0.4} flatShading />
            </mesh>
            {[-0.8, 0, 0.8].map((offsetZ, i) => (
              <mesh key={i} position={[0.08, 0, offsetZ]}>
                <boxGeometry args={[0.04, 0.8, 0.6]} />
                <meshStandardMaterial color="#78350f" flatShading />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 4. RIGHT WALL: PANORAMIC WINDOWS WITH ROLLER BLINDS            */}
      {/* ============================================================== */}
      <group position={[11.5, 0, 0]}>
        {/* Lower Window Sill */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.3, 0.7, 47.8]} />
          <meshStandardMaterial color="#f1f5f9" flatShading />
        </mesh>

        {/* Panoramic Glass Panes */}
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[0.04, 1.8, 47.6]} />
          <meshStandardMaterial color="#bae6fd" transparent opacity={0.35} flatShading />
        </mesh>

        {/* Roller Blinds along 48m depth */}
        {[-21, -17.2, -13.4, -9.6, -5.8, -2, 1.8, 5.6, 9.4, 13.2, 17, 20.8].map((z, i) => (
          <mesh key={`blind-${i}`} position={[-0.03, 1.9, z]}>
            <boxGeometry args={[0.02, 1.2, 3.2]} />
            <meshStandardMaterial color="#fef9c3" transparent opacity={0.85} flatShading />
          </mesh>
        ))}

        {/* Window Pillars along Z */}
        {[-23, -19.2, -15.4, -11.6, -7.8, -4, -0.2, 3.6, 7.4, 11.2, 15, 18.8, 22.6].map((z, i) => (
          <mesh key={`pillar-${i}`} position={[0, 1.6, z]}>
            <boxGeometry args={[0.18, 2.0, 0.2]} />
            <meshStandardMaterial color="#e2e8f0" flatShading />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 5. BACK WALL (REAR OF ROOM - BEHIND ROW 10)                    */}
      {/* ============================================================== */}
      <group position={[1.5, 1.3, -23.9]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[23, 2.6, 0.3]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.6} flatShading />
        </mesh>

        {/* Filing Cabinets Along Back Wall */}
        <mesh position={[5.5, -0.6, 0.25]}>
          <boxGeometry args={[6.0, 1.2, 0.5]} />
          <meshStandardMaterial color="#cbd5e1" flatShading />
        </mesh>

        {/* Master Sprint Command Board */}
        <group position={[-1.5, 0.2, 0.2]}>
          <mesh>
            <boxGeometry args={[5.2, 1.8, 0.06]} />
            <meshStandardMaterial color="#0284c7" flatShading />
          </mesh>
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[5.0, 1.6]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} flatShading />
          </mesh>
          {/* Sticky Post-it Notes */}
          {[-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((x, i) => (
            <mesh key={i} position={[x, i % 2 === 0 ? 0.25 : -0.25, 0.045]}>
              <planeGeometry args={[0.3, 0.3]} />
              <meshBasicMaterial
                color={i % 3 === 0 ? '#fde047' : i % 3 === 1 ? '#7dd3fc' : '#f9a8d4'}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* ============================================================== */}
      {/* 6. FRONT WALL BOUNDARY (NEAR ROW 1)                            */}
      {/* ============================================================== */}
      <group position={[1.5, 1.3, 23.9]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[23, 2.6, 0.3]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.6} flatShading />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 7. 3D FLOATING SQUAD BANNERS (Only show on HOVER or SELECTED)  */}
      {/* ============================================================== */}
      {squads.map((squad, idx) => {
        const isHovered = hoveredSquadId === squad.id;
        const isSelected = selectedSquadId === squad.id;

        // Performance & Cleanliness fix: Only render floating banner on hover or when selected
        if (!isHovered && !isSelected) return null;

        return (
          <Html
            key={`banner-${squad.id}`}
            position={[1.5, 3.2, squad.zoneCenter[2]]}
            center
            distanceFactor={18}
            zIndexRange={[15, 0]}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectSquad(squad);
              }}
              className={`group px-3 py-1.5 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-2.5 cursor-pointer transition-all transform hover:scale-105 active:scale-95 text-white ${
                isSelected
                  ? 'bg-slate-900/95 border-sky-400 ring-2 ring-sky-400/50'
                  : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-500'
              }`}
            >
              <div
                className="w-3 h-3 rounded-md animate-pulse shrink-0"
                style={{ backgroundColor: squad.zoneColor }}
              />
              <div className="text-left">
                <div className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <span>ROW {idx + 1}: {squad.alias}</span>
                  <span
                    className="text-[9px] px-1.5 py-0.2 rounded-full font-bold border"
                    style={{
                      backgroundColor: `${squad.zoneColor}22`,
                      color: '#e2e8f0',
                      borderColor: `${squad.zoneColor}66`,
                    }}
                  >
                    {squad.sprint.split(' ')[0]}
                  </span>
                </div>
                <div className="text-[10px] text-slate-300 font-medium mt-0.5">
                  Target:{' '}
                  <strong className="text-sky-300">
                    {squad.metrics.completedStoryPoints}/{squad.metrics.totalStoryPoints} SP
                  </strong>{' '}
                  ({Math.round((squad.metrics.completedStoryPoints / squad.metrics.totalStoryPoints) * 100)}%)
                  {squad.metrics.defects.p1 > 0 && (
                    <span className="ml-1.5 text-red-400 font-bold">⚠️ {squad.metrics.defects.p1} P1</span>
                  )}
                </div>
              </div>
            </button>
          </Html>
        );
      })}
    </group>
  );
};
