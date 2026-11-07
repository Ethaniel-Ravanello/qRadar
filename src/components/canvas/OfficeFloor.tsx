import React, { useMemo, useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Squad } from '../../types';

interface OfficeFloorProps {
  squads: Squad[];
  onSelectSquad: (squad: Squad) => void;
  selectedSquadId: string | null;
}

/**
 * Public component. Splits the floor into:
 *   - <StaticOffice /> : everything that never changes (walls, core, windows,
 *     elevators, caps, lounge...). Props-less + React.memo => renders once.
 *   - <SquadPods />    : the only hover/select-reactive part (pod mats, ribbon,
 *     badge). Re-renders on hover without touching the ~150 static meshes.
 */
export const OfficeFloor: React.FC<OfficeFloorProps> = ({
  squads,
  onSelectSquad,
  selectedSquadId,
}) => {
  return (
    <group>
      <StaticOffice squadZ={useMemo(() => squads.map((s) => s.zoneCenter[2]), [squads])} />
      <SquadPods squads={squads} onSelectSquad={onSelectSquad} selectedSquadId={selectedSquadId} />
    </group>
  );
};

// =============================================================================
// SQUAD PODS: the only hover/select-reactive layer.
// =============================================================================
interface SquadPodsProps {
  squads: Squad[];
  onSelectSquad: (squad: Squad) => void;
  selectedSquadId: string | null;
}

const SquadPods: React.FC<SquadPodsProps> = ({ squads, onSelectSquad, selectedSquadId }) => {
  const [hoveredSquadId, setHoveredSquadId] = useState<string | null>(null);

  return (
    <group>
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
            {/* A. INNER POD CARPET MAT (4 Meja Berhadapan / 2x2 - Only for Rows 1 to 6) */}
            {idx < 6 && (
              <mesh position={[5.6, 0.008, cz]}>
                <boxGeometry args={[3.4, 0.01, 2.2]} />
                <meshStandardMaterial
                  color={isSelected ? '#cbd5e1' : '#e2e8f0'}
                  roughness={0.7}
                />
              </mesh>
            )}

            {/* B. OUTER POD CARPET MAT (8 Meja Berhadapan Deket Jendela / 4x2 at X = 11.2) */}
            <mesh position={[11.2, 0.008, cz]}>
              <boxGeometry args={[6.6, 0.01, 2.2]} />
              <meshStandardMaterial
                color={isSelected ? '#cbd5e1' : '#e2e8f0'}
                roughness={0.7}
              />
            </mesh>

            {/* Squad Color Accent Ribbon on Floor near Main Corridor */}
            <mesh position={[3.8, 0.01, cz]}>
              <boxGeometry args={[0.08, 0.012, 2.2]} />
              <meshStandardMaterial color={squad.zoneColor} roughness={0.3} />
            </mesh>

            {/* White Air Purifier Unit at Squad Aisle Entrance */}
            <group position={[3.6, 0, cz + 1.2]}>
              <mesh position={[0, 0.42, 0]} castShadow>
                <boxGeometry args={[0.3, 0.84, 0.28]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.85, 0]}>
                <boxGeometry args={[0.26, 0.02, 0.24]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              <mesh position={[0.155, 0.68, 0]}>
                <planeGeometry args={[0.08, 0.08]} />
                <meshBasicMaterial color={squad.zoneColor} />
              </mesh>
            </group>

            {/* Floating Squad Signboard Plaque (Only on Hover or Select) */}
            {showBadge && (
              <group position={[3.6, 2.0, cz]}>
                <Html
                  position={[0, 0, 0]}
                  rotation={[0, Math.PI / 2, 0]}
                  center
                  distanceFactor={13}
                  zIndexRange={[5, 0]}
                  occlude={false}
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSquad(squad);
                    }}
                    className="font-bold text-white text-[10px] uppercase tracking-wider select-none px-2.5 py-1 rounded shadow-xl border whitespace-nowrap cursor-pointer transition hover:scale-105 flex items-center gap-1.5"
                    style={{
                      backgroundColor: `${squad.zoneColor}ee`,
                      borderColor: squad.zoneColor,
                    }}
                  >
                    <span>ROW {idx + 1}</span>
                    <span>•</span>
                    <span>{squad.alias.toUpperCase()}</span>
                    <span>•</span>
                    <span>{squad.sprint.split(' ')[0]}</span>
                  </div>
                </Html>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
};

// =============================================================================
// STATIC OFFICE: walls, core, windows, elevators, caps, lounge, benches.
// No props that change at runtime (squadZ is derived from static zone data),
// so React.memo keeps this subtree from reconciling on squad hover/select.
// =============================================================================
interface StaticOfficeProps {
  /** Z centers of each squad row (stable), for per-row batik panels. */
  squadZ: number[];
}

const StaticOfficeComponent: React.FC<StaticOfficeProps> = ({ squadZ }) => {

  // =========================================================================
  // 1. STADIUM / CAPSULE RACETRACK GEOMETRIES ("PANJANG LURUS, UJUNG MELENGKUNG")
  // =========================================================================
  const { floorGeo, borderGeo, innerTrackGeo, northCapSegments, southCapSegments } =
    useMemo(() => {
      const xRadius = 16.8; // Half-width (Total Width = 33.6m to accommodate 4+8 desks + aisles)
      const straightHalfZ = 19.5; // Straight length along Z = 39m (-19.5 to +19.5)

      // A. Main Floor: Straight parallel sides with semicircular caps at both ends
      const shape = new THREE.Shape();
      shape.moveTo(xRadius, -straightHalfZ);
      shape.lineTo(xRadius, straightHalfZ);
      shape.absarc(0, straightHalfZ, xRadius, 0, Math.PI, false);
      shape.lineTo(-xRadius, -straightHalfZ);
      shape.absarc(0, -straightHalfZ, xRadius, Math.PI, Math.PI * 2, false);
      const fGeo = new THREE.ShapeGeometry(shape, 32);

      // B. Outer Border Rim Skirting
      const bx = xRadius + 0.35;
      const bShape = new THREE.Shape();
      bShape.moveTo(bx, -straightHalfZ);
      bShape.lineTo(bx, straightHalfZ);
      bShape.absarc(0, straightHalfZ, bx, 0, Math.PI, false);
      bShape.lineTo(-bx, -straightHalfZ);
      bShape.absarc(0, -straightHalfZ, bx, Math.PI, Math.PI * 2, false);
      const bGeo = new THREE.ShapeGeometry(bShape, 32);

      // C. Inner Walkway Circulation Track
      const ix = 14.0;
      const iz = 17.5;
      const tShape = new THREE.Shape();
      tShape.moveTo(ix, -iz);
      tShape.lineTo(ix, iz);
      tShape.absarc(0, iz, ix, 0, Math.PI, false);
      tShape.lineTo(-ix, -iz);
      tShape.absarc(0, -iz, ix, Math.PI, Math.PI * 2, false);
      const tGeo = new THREE.ShapeGeometry(tShape, 24);

      // D. Curved North Cap Segments (Ujung Utara Melengkung)
      const N_cap = 24;
      const nSegments: Array<{ mid: [number, number]; len: number; angle: number; isApex: boolean }> =
        [];
      for (let i = 0; i < N_cap; i++) {
        const a1 = (i / N_cap) * Math.PI;
        const a2 = ((i + 1) / N_cap) * Math.PI;
        const p1 = [Math.cos(a1) * xRadius, straightHalfZ + Math.sin(a1) * xRadius];
        const p2 = [Math.cos(a2) * xRadius, straightHalfZ + Math.sin(a2) * xRadius];
        const mid: [number, number] = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
        const dx = p2[0] - p1[0];
        const dz = p2[1] - p1[1];
        const len = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dx, dz);
        const isApex = i >= 10 && i <= 13;
        nSegments.push({ mid, len, angle, isApex });
      }

      // E. Curved South Cap Segments (Ujung Selatan Melengkung)
      const sSegments: Array<{ mid: [number, number]; len: number; angle: number }> = [];
      for (let i = 0; i < N_cap; i++) {
        const a1 = Math.PI + (i / N_cap) * Math.PI;
        const a2 = Math.PI + ((i + 1) / N_cap) * Math.PI;
        const p1 = [Math.cos(a1) * xRadius, -straightHalfZ + Math.sin(a1) * xRadius];
        const p2 = [Math.cos(a2) * xRadius, -straightHalfZ + Math.sin(a2) * xRadius];
        const mid: [number, number] = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
        const dx = p2[0] - p1[0];
        const dz = p2[1] - p1[1];
        const len = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dx, dz);
        sSegments.push({ mid, len, angle });
      }

      return {
        floorGeo: fGeo,
        borderGeo: bGeo,
        innerTrackGeo: tGeo,
        northCapSegments: nSegments,
        southCapSegments: sSegments,
      };
    }, []);

  return (
    <group>
      {/* ============================================================== */}
      {/* 1. STADIUM FLOOR PLATE: Terrazzo Warm Cream & Circulation Loop */}
      {/* ============================================================== */}
      {/* Outer Dark Rim Skirting Plate */}
      <mesh
        geometry={borderGeo}
        position={[0, -0.052, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      {/* Main Stadium Floor Plate */}
      <mesh
        geometry={floorGeo}
        position={[0, -0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#f8fafc" roughness={0.32} />
      </mesh>

      {/* Circulation Walkway Track (Subtle Lighter Track Looping around Core) */}
      <mesh
        geometry={innerTrackGeo}
        position={[0, -0.048, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#f1f5f9" roughness={0.28} />
      </mesh>

      {/* Polished Main East Corridor Runway (In front of Squad Desks) */}
      <mesh position={[3.6, 0.003, 0]}>
        <boxGeometry args={[1.6, 0.006, 38.0]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} />
      </mesh>
      {/* Black Granite Lis Inlay Borders */}
      <mesh position={[2.75, 0.005, 0]}>
        <boxGeometry args={[0.1, 0.008, 38.0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} />
      </mesh>
      <mesh position={[4.45, 0.005, 0]}>
        <boxGeometry args={[0.1, 0.008, 38.0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} />
      </mesh>

      {/* Intermediate Sub-Aisle Runway (Between Inner 4-desk pod & Outer 8-desk pod) */}
      <mesh position={[8.15, 0.002, 0]}>
        <boxGeometry args={[1.0, 0.004, 38.0]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
      </mesh>

      {/* Polished West Corridor Runway (Open Circulation Half) */}
      <mesh position={[-3.6, 0.003, 0]}>
        <boxGeometry args={[1.6, 0.006, 38.0]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} />
      </mesh>
      <mesh position={[-2.75, 0.005, 0]}>
        <boxGeometry args={[0.1, 0.008, 38.0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} />
      </mesh>
      <mesh position={[-4.45, 0.005, 0]}>
        <boxGeometry args={[0.1, 0.008, 38.0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} />
      </mesh>

      {/* ============================================================== */}
      {/* 2. CENTRAL CORE (DI TENGAH "O"): ELEVATORS & RESTROOMS         */}
      {/* ============================================================== */}
      <group position={[0, 0, 0]}>
        {/* Core Main Architectural Slate Block */}
        <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 2.6, 24.0]} />
          <meshStandardMaterial color="#1e293b" roughness={0.65} />
        </mesh>

        {/* Core Ceiling Cornice Trim */}
        <mesh position={[0, 2.62, 0]}>
          <boxGeometry args={[5.36, 0.08, 24.16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>

        {/* Core Floor Plinth Skirting */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[5.32, 0.08, 24.12]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>

        {/* Vertical Acoustic Walnut Wood Slats lining the Core Faces */}
        {[-10, -9.6, -9.2, -6.8, -6.4, -6.0, -0.8, -0.4, 0, 0.4, 0.8, 6.0, 6.4, 6.8, 9.2, 9.6, 10].map(
          (zVal, i) => (
            <React.Fragment key={`wood-slat-${i}`}>
              <mesh position={[2.62, 1.3, zVal]}>
                <boxGeometry args={[0.04, 2.5, 0.18]} />
                <meshStandardMaterial color="#854d0e" roughness={0.45} />
              </mesh>
              <mesh position={[-2.62, 1.3, zVal]}>
                <boxGeometry args={[0.04, 2.5, 0.18]} />
                <meshStandardMaterial color="#854d0e" roughness={0.45} />
              </mesh>
            </React.Fragment>
          )
        )}

        {/* ------------------------------------------------------------ */}
        {/* ELEVATORS (LIFT) ON EAST CORE FACE (FACING SQUADS CORRIDOR)  */}
        {/* ------------------------------------------------------------ */}
        {[3.4, -3.4].map((zPos, liftIdx) => (
          <group key={`lift-east-${liftIdx}`} position={[2.61, 0, zPos]}>
            <mesh position={[0.02, 1.15, 0]}>
              <boxGeometry args={[0.04, 2.3, 2.1]} />
              <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.25} />
            </mesh>
            <mesh position={[0.03, 1.1, -0.48]}>
              <boxGeometry args={[0.02, 2.15, 0.94]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0.03, 1.1, 0.48]}>
              <boxGeometry args={[0.02, 2.15, 0.94]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0.035, 1.1, 0]}>
              <boxGeometry args={[0.01, 2.15, 0.04]} />
              <meshStandardMaterial color="#1e293b" roughness={0.2} />
            </mesh>

            {/* Overhead Floor Indicator Screen: ▲ 18 ▼ */}
            <mesh position={[0.035, 2.38, 0]}>
              <boxGeometry args={[0.02, 0.22, 0.8]} />
              <meshStandardMaterial color="#0f172a" roughness={0.2} />
            </mesh>
            <Html
              position={[0.06, 2.38, 0]}
              rotation={[0, Math.PI / 2, 0]}
              center
              distanceFactor={10}
              zIndexRange={[5, 0]}
            >
              <div className="flex items-center gap-1.5 bg-black/90 px-2 py-0.5 rounded border border-amber-500/50 shadow-md">
                <span className="text-[9px] font-mono font-bold text-amber-400 animate-pulse">
                  ▲ 18 ▼
                </span>
                <span className="text-[7px] font-mono text-slate-400">LIFT {liftIdx + 1}</span>
              </div>
            </Html>

            {/* Floor Call Button Plate */}
            <mesh position={[0.035, 1.05, 1.2]}>
              <boxGeometry args={[0.02, 0.35, 0.16]} />
              <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0.046, 1.12, 1.2]}>
              <boxGeometry args={[0.005, 0.04, 0.04]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
            <mesh position={[0.046, 0.98, 1.2]}>
              <boxGeometry args={[0.005, 0.04, 0.04]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
          </group>
        ))}

        {/* ------------------------------------------------------------ */}
        {/* ELEVATORS (LIFT) ON WEST CORE FACE (WEST CORRIDOR)           */}
        {/* ------------------------------------------------------------ */}
        {[3.4, -3.4].map((zPos, liftIdx) => (
          <group key={`lift-west-${liftIdx}`} position={[-2.61, 0, zPos]}>
            <mesh position={[-0.02, 1.15, 0]}>
              <boxGeometry args={[0.04, 2.3, 2.1]} />
              <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.25} />
            </mesh>
            <mesh position={[-0.03, 1.1, -0.48]}>
              <boxGeometry args={[0.02, 2.15, 0.94]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.03, 1.1, 0.48]}>
              <boxGeometry args={[0.02, 2.15, 0.94]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.035, 2.38, 0]}>
              <boxGeometry args={[0.02, 0.22, 0.8]} />
              <meshStandardMaterial color="#0f172a" roughness={0.2} />
            </mesh>
            <Html
              position={[-0.06, 2.38, 0]}
              rotation={[0, -Math.PI / 2, 0]}
              center
              distanceFactor={10}
              zIndexRange={[5, 0]}
            >
              <div className="flex items-center gap-1.5 bg-black/90 px-2 py-0.5 rounded border border-amber-500/50 shadow-md">
                <span className="text-[9px] font-mono font-bold text-amber-400">▲ 18 ▼</span>
                <span className="text-[7px] font-mono text-slate-400">LIFT {liftIdx + 3}</span>
              </div>
            </Html>
          </group>
        ))}

        {/* ------------------------------------------------------------ */}
        {/* KAMAR MANDI / RESTROOMS (PRIA & WANITA)                       */}
        {/* ------------------------------------------------------------ */}
        {/* KAMAR MANDI PRIA - At Z = 8.0 on East */}
        <group position={[2.61, 0, 8.0]}>
          <mesh position={[0.02, 1.15, 0]}>
            <boxGeometry args={[0.04, 2.3, 1.4]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </mesh>
          <mesh position={[0.03, 1.1, 0]}>
            <boxGeometry args={[0.02, 2.15, 1.25]} />
            <meshStandardMaterial color="#334155" roughness={0.5} />
          </mesh>
          <mesh position={[0.05, 1.05, 0.45]}>
            <boxGeometry args={[0.02, 0.25, 0.03]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
          </mesh>
          <Html position={[0.06, 2.0, 0]} rotation={[0, Math.PI / 2, 0]} center distanceFactor={11} zIndexRange={[5, 0]}>
            <div className="flex items-center gap-1.5 bg-slate-900/95 border border-sky-500/60 text-sky-400 px-2 py-1 rounded shadow-lg whitespace-nowrap">
              <span className="text-xs">🚹</span>
              <div className="flex flex-col text-left">
                <span className="text-[8px] font-bold tracking-wider uppercase font-mono text-white">
                  TOILET PRIA
                </span>
                <span className="text-[6.5px] font-mono text-sky-300">GENTLEMEN</span>
              </div>
            </div>
          </Html>
        </group>

        {/* KAMAR MANDI WANITA - At Z = -8.0 on East */}
        <group position={[2.61, 0, -8.0]}>
          <mesh position={[0.02, 1.15, 0]}>
            <boxGeometry args={[0.04, 2.3, 1.4]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </mesh>
          <mesh position={[0.03, 1.1, 0]}>
            <boxGeometry args={[0.02, 2.15, 1.25]} />
            <meshStandardMaterial color="#334155" roughness={0.5} />
          </mesh>
          <mesh position={[0.05, 1.05, 0.45]}>
            <boxGeometry args={[0.02, 0.25, 0.03]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
          </mesh>
          <Html position={[0.06, 2.0, 0]} rotation={[0, Math.PI / 2, 0]} center distanceFactor={11} zIndexRange={[5, 0]}>
            <div className="flex items-center gap-1.5 bg-slate-900/95 border border-pink-500/60 text-pink-400 px-2 py-1 rounded shadow-lg whitespace-nowrap">
              <span className="text-xs">🚺</span>
              <div className="flex flex-col text-left">
                <span className="text-[8px] font-bold tracking-wider uppercase font-mono text-white">
                  TOILET WANITA
                </span>
                <span className="text-[6.5px] font-mono text-pink-300">LADIES</span>
              </div>
            </div>
          </Html>
        </group>

        {/* ------------------------------------------------------------ */}
        {/* CORE CENTER SIGNAGE: MENARA BRI HQ COMMAND CENTER            */}
        {/* ------------------------------------------------------------ */}
        <group position={[2.62, 1.6, 0]}>
          <mesh>
            <boxGeometry args={[0.04, 0.9, 3.2]} />
            <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.3} />
          </mesh>
          <Html position={[0.04, 0, 0]} rotation={[0, Math.PI / 2, 0]} center distanceFactor={11} zIndexRange={[5, 0]}>
            <div className="flex flex-col items-center bg-[#090d16]/95 border border-amber-500/40 p-2.5 rounded-lg shadow-2xl text-center select-none min-w-[200px]">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span className="text-[10px] font-black font-mono tracking-widest text-[#f59e0b]">
                  BANK BRI DIGITAL TOWER
                </span>
              </div>
              <div className="text-[8.5px] font-bold font-mono tracking-wide text-white">
                18F • Q-CASH & QRIS COMMAND CORE
              </div>
              <div className="text-[7px] font-mono text-slate-400 mt-1 flex items-center gap-2">
                <span>ELEVATORS ▲▼</span>
                <span>•</span>
                <span>RESTROOMS 🚹🚺</span>
                <span>•</span>
                <span>10 SQUADS</span>
              </div>
            </div>
          </Html>
        </group>

        {/* North and South Ends of the Central Core */}
        <mesh position={[0, 1.3, 12.0]}>
          <boxGeometry args={[5.2, 2.6, 0.2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.65} />
        </mesh>
        <mesh position={[0, 1.3, -12.0]}>
          <boxGeometry args={[5.2, 2.6, 0.2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.65} />
        </mesh>
      </group>

      {/* Squad pods (hover/select-reactive) live in <SquadPods />, not here. */}

      {/* ============================================================== */}
      {/* 4. SISI KANAN: PANJANG LURUS DINDING KACA PANORAMA (AT X=16.8)  */}
      {/* ============================================================== */}
      <group position={[16.8, 0, 0]}>
        {/* Lower Structural Window Sill */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.26, 0.44, 39.0]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>

        {/* Large Panoramic Double-Glazed Glass Pane (LURUS SEJAJAR MEJA) */}
        <mesh position={[0, 1.35, 0]}>
          <boxGeometry args={[0.04, 1.82, 38.8]} />
          <meshStandardMaterial
            color="#bae6fd"
            transparent
            opacity={0.35}
            roughness={0.1}
            metalness={0.15}
          />
        </mesh>

        {/* Top Ceiling Header Beam */}
        <mesh position={[0, 2.45, 0]}>
          <boxGeometry args={[0.26, 0.38, 39.0]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>

        {/* Window Mullions / Vertical Steel Pillars along the Straight Window Wall */}
        {[-19, -15.2, -11.4, -7.6, -3.8, 0, 3.8, 7.6, 11.4, 15.2, 19].map((zPos, pIdx) => (
          <mesh key={`win-pillar-${pIdx}`} position={[0, 1.3, zPos]}>
            <boxGeometry args={[0.14, 2.6, 0.16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.5} />
          </mesh>
        ))}

        {/* Roller Blinds (Tirai Gulung) along the Straight Panoramic Windows */}
        {[-17.1, -13.3, -9.5, -5.7, -1.9, 1.9, 5.7, 9.5, 13.3, 17.1].map((zPos, bIdx) => (
          <mesh key={`blind-${bIdx}`} position={[-0.04, 1.85, zPos]}>
            <boxGeometry args={[0.02, 1.1, 3.2]} />
            <meshStandardMaterial color="#fef9c3" transparent opacity={0.82} roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 5. SISI KIRI: PANJANG LURUS DINDING BATIK LOTUS (AT X=-16.8)   */}
      {/* ============================================================== */}
      <group position={[-16.8, 0, 0]}>
        {/* Full Height Solid Architectural Charcoal Wall */}
        <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.26, 2.6, 39.0]} />
          <meshStandardMaterial color="#475569" roughness={0.75} />
        </mesh>
        {/* Top Crown Molding */}
        <mesh position={[0, 2.62, 0]}>
          <boxGeometry args={[0.32, 0.08, 39.0]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* Decorative Carved Batik Lotus Wooden Panels along each Squad Row */}
        {squadZ.map((cz, row) => (
          <group key={`batik-${row}`} position={[0.14, 1.3, cz]}>
            <mesh>
              <boxGeometry args={[0.04, 2.2, 2.6]} />
              <meshStandardMaterial color="#854d0e" roughness={0.4} />
            </mesh>
            {[-0.8, 0, 0.8].map((offsetZ, i) => (
              <mesh key={i} position={[0.03, 0, offsetZ]}>
                <boxGeometry args={[0.02, 0.7, 0.5]} />
                <meshStandardMaterial color="#78350f" />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 6. UJUNG UTARA: MELENGKUNG (NORTH CURVED CAP + SPRINT BOARD)   */}
      {/* ============================================================== */}
      {northCapSegments.map((seg, i) => (
        <group
          key={`north-cap-seg-${i}`}
          position={[seg.mid[0], 0, seg.mid[1]]}
          rotation={[0, seg.angle, 0]}
        >
          {/* Solid Wall following the curved arc */}
          <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.26, 2.6, seg.len + 0.05]} />
            <meshStandardMaterial color="#475569" roughness={0.75} />
          </mesh>
          <mesh position={[0, 2.62, 0]}>
            <boxGeometry args={[0.32, 0.08, seg.len + 0.05]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>

          {/* Master Sprint Command Board on North Apex Curve */}
          {seg.isApex && (
            <group position={[-0.14, 1.4, 0]}>
              <mesh>
                <boxGeometry args={[0.06, 1.6, seg.len * 0.9]} />
                <meshStandardMaterial color="#0284c7" />
              </mesh>
              <mesh position={[-0.04, 0, 0]}>
                <boxGeometry args={[0.01, 1.4, seg.len * 0.8]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
              </mesh>
            </group>
          )}
        </group>
      ))}

      {/* ============================================================== */}
      {/* 7. UJUNG SELATAN: MELENGKUNG (SOUTH CURVED CAP)                */}
      {/* ============================================================== */}
      {southCapSegments.map((seg, i) => (
        <group
          key={`south-cap-seg-${i}`}
          position={[seg.mid[0], 0, seg.mid[1]]}
          rotation={[0, seg.angle, 0]}
        >
          <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.26, 2.6, seg.len + 0.05]} />
            <meshStandardMaterial color="#475569" roughness={0.75} />
          </mesh>
          <mesh position={[0, 2.62, 0]}>
            <boxGeometry args={[0.32, 0.08, seg.len + 0.05]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 8. WEST SIDE (OPEN HALF OF "O"): LOUNGE SEATING & GREENERY     */}
      {/* ============================================================== */}
      {[-12, -6, 0, 6, 12].map((zPos, pIdx) => (
        <group key={`lounge-plant-${pIdx}`} position={[-8.5, 0, zPos]}>
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[0.65, 0.7, 0.65]} />
            <meshStandardMaterial color="#334155" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.71, 0]}>
            <boxGeometry args={[0.55, 0.04, 0.55]} />
            <meshStandardMaterial color="#3e2723" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.05, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.7, 8]} />
            <meshStandardMaterial color="#78350f" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.45, 0]}>
            <sphereGeometry args={[0.38, 8, 8]} />
            <meshStandardMaterial color="#15803d" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Architectural Timber Corridor Benches on West Walkway */}
      {[-8, 0, 8].map((zPos, bIdx) => (
        <group key={`bench-west-${bIdx}`} position={[-4.5, 0, zPos]} rotation={[0, Math.PI / 2, 0]}>
          <mesh position={[0, 0.42, 0]}>
            <boxGeometry args={[1.8, 0.06, 0.5]} />
            <meshStandardMaterial color="#854d0e" roughness={0.4} />
          </mesh>
          <mesh position={[-0.7, 0.21, 0]}>
            <boxGeometry args={[0.05, 0.42, 0.45]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0.7, 0.21, 0]}>
            <boxGeometry args={[0.05, 0.42, 0.45]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// squadZ is derived from static zone data, so the subtree never needs to
// re-render in practice. React.memo makes that explicit (and cheap: a shallow
// prop compare) so a parent re-render can't drag the ~150 static meshes along.
const StaticOffice = React.memo(StaticOfficeComponent);
