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
  selectedSquadId,
}) => {
  return (
    <group>
      {/* ============================================================== */}
      {/* 1. TERRAZZO FLOOR PLATE (Front to Back Hallway Layout)          */}
      {/* ============================================================== */}
      {/* Main Floor Plate spanning the entire 30m depth along Z */}
      <mesh position={[1.5, -0.05, 0]} receiveShadow>
        <boxGeometry args={[23, 0.1, 30]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} flatShading />
      </mesh>

      {/* Central Walkway Tile Section running from front to back */}
      <mesh position={[-0.2, 0.004, 0]}>
        <boxGeometry args={[3.0, 0.008, 29.6]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.25} flatShading />
      </mesh>

      {/* Polished Black / Dark Granite Border Accents along Central Aisle */}
      <mesh position={[1.4, 0.005, 0]}>
        <boxGeometry args={[0.18, 0.01, 29.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} flatShading />
      </mesh>
      <mesh position={[-1.8, 0.005, 0]}>
        <boxGeometry args={[0.18, 0.01, 29.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} flatShading />
      </mesh>

      {/* ============================================================== */}
      {/* 2. SQUAD POD MATS & AIR PURIFIERS (Depan - Belakang along Z)   */}
      {/* ============================================================== */}
      {squads.map((squad) => {
        const cz = squad.zoneCenter[2];
        return (
          <group key={`squad-pod-${squad.id}`}>
            {/* Pod Carpet Mats */}
            {/* Left Pod Mat (2x2) */}
            <mesh position={[-4.9, 0.012, cz]}>
              <boxGeometry args={[4.8, 0.01, 4.8]} />
              <meshStandardMaterial color="#e2e8f0" flatShading roughness={0.7} />
            </mesh>
            {/* Right Pod Mat (2x4) */}
            <mesh position={[6.0, 0.012, cz]}>
              <boxGeometry args={[8.8, 0.01, 4.8]} />
              <meshStandardMaterial color="#e2e8f0" flatShading roughness={0.7} />
            </mesh>

            {/* Air Purifier Unit near the squad aisle entrance */}
            <group position={[1.8, 0, cz + 2.5]}>
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

            {/* Left Wall Squad Signboard Badge */}
            <group position={[-8.45, 1.8, cz]}>
              <mesh>
                <boxGeometry args={[0.05, 0.6, 2.2]} />
                <meshStandardMaterial color="#1e293b" flatShading />
              </mesh>
              <Html position={[0.04, 0, 0]} rotation={[0, Math.PI / 2, 0]} center distanceFactor={14}>
                <div
                  className="font-bold text-white text-[10px] uppercase tracking-wider select-none px-2 py-1 rounded shadow-lg border whitespace-nowrap"
                  style={{
                    backgroundColor: `${squad.zoneColor}ee`,
                    borderColor: squad.zoneColor,
                  }}
                >
                  BAY: {squad.alias.toUpperCase()} • {squad.sprint.split(' ')[0]}
                </div>
              </Html>
            </group>
          </group>
        );
      })}

      {/* ============================================================== */}
      {/* 3. LEFT WALL: CARVED BATIK WOODEN SCREEN PANELS                */}
      {/* ============================================================== */}
      <group position={[-8.5, 0, 0]}>
        {/* Grey Wall running along Z */}
        <mesh position={[-0.2, 1.3, 0]} castShadow>
          <boxGeometry args={[0.3, 2.6, 29.8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.8} flatShading />
        </mesh>

        {/* Decorative Lotus / Batik Carved Wooden Panels along the wall */}
        {[-8.5, 0, 8.5].map((z, idx) => (
          <group key={idx} position={[0, 1.3, z]}>
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
          <boxGeometry args={[0.3, 0.7, 29.8]} />
          <meshStandardMaterial color="#f1f5f9" flatShading />
        </mesh>

        {/* Panoramic Glass Panes */}
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[0.04, 1.8, 29.6]} />
          <meshStandardMaterial color="#bae6fd" transparent opacity={0.35} flatShading />
        </mesh>

        {/* Roller Blinds */}
        {[-12, -8.5, -5, -1.5, 2, 5.5, 9, 12.5].map((z, i) => (
          <mesh key={i} position={[-0.03, 1.9, z]}>
            <boxGeometry args={[0.02, 1.2, 2.8]} />
            <meshStandardMaterial color="#fef9c3" transparent opacity={0.85} flatShading />
          </mesh>
        ))}

        {/* Window Pillars along Z */}
        {[-14, -10.5, -7, -3.5, 0, 3.5, 7, 10.5, 14].map((z, i) => (
          <mesh key={i} position={[0, 1.6, z]}>
            <boxGeometry args={[0.18, 2.0, 0.2]} />
            <meshStandardMaterial color="#e2e8f0" flatShading />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 5. BACK WALL (REAR OF ROOM - BEHIND SQUAD SLYTHERIN)           */}
      {/* ============================================================== */}
      <group position={[1.5, 1.3, -14.9]}>
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
      {/* 6. FRONT WALL BOUNDARY (NEAR SQUAD HERMES)                     */}
      {/* ============================================================== */}
      <group position={[1.5, 1.3, 14.9]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[23, 2.6, 0.3]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.6} flatShading />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 7. 3D FLOATING SQUAD BANNERS (Depan - Belakang along Z)        */}
      {/* ============================================================== */}
      {squads.map((squad) => (
        <Html
          key={`banner-${squad.id}`}
          position={[1.5, 3.4, squad.zoneCenter[2]]}
          center
          distanceFactor={18}
          zIndexRange={[15, 0]}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectSquad(squad);
            }}
            className={`group px-4 py-2 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-3 cursor-pointer transition-all transform hover:scale-105 active:scale-95 text-white ${
              squad.id === selectedSquadId
                ? 'bg-slate-900/95 border-sky-400 ring-2 ring-sky-400/50'
                : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-500'
            }`}
          >
            <div
              className="w-3.5 h-3.5 rounded-md animate-pulse"
              style={{ backgroundColor: squad.zoneColor }}
            />
            <div className="text-left">
              <div className="text-[13px] font-black uppercase tracking-wider flex items-center gap-2">
                <span>{squad.name}</span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-bold border"
                  style={{
                    backgroundColor: `${squad.zoneColor}22`,
                    color: '#e2e8f0',
                    borderColor: `${squad.zoneColor}66`,
                  }}
                >
                  {squad.sprint.split(' ')[0]}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                Target:{' '}
                <strong className="text-sky-300">
                  {squad.metrics.completedStoryPoints}/{squad.metrics.totalStoryPoints} SP
                </strong>{' '}
                ({Math.round((squad.metrics.completedStoryPoints / squad.metrics.totalStoryPoints) * 100)}%)
                {squad.metrics.defects.p1 > 0 && (
                  <span className="ml-2 text-red-400 font-bold">⚠️ {squad.metrics.defects.p1} P1</span>
                )}
              </div>
            </div>
          </button>
        </Html>
      ))}
    </group>
  );
};
