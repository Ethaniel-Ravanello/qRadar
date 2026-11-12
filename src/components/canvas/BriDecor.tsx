import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { addVec, mergeParts, type PartSpec, type Vec3 } from './instancing';

// =============================================================================
// BRI OFFICE DECOR (inspired by the real 18F office photos)
//   A. Pantry / coffee bar: bar counter + rattan stools, moss wall, wood slats,
//      upper oak cabinets, water gallons          (east, rows 9-10 inner pod)
//   B. Cream metal lockers                        (east, next to the pantry)
//   C. Lit arch niches on a stone panel           (east core face, z<0)
//   D. Gold hexagon feature wall + TV + green sofa (north end of the core)
//   E. Warm cove-light strips on the core cornice
//
// Everything is static, so it is baked into TWO merged, vertex-colored
// geometries at module load: one lit (standard) mesh and one glowing (basic)
// mesh => 2 draw calls total, no extra lights.
//
// Free-space notes (see OfficeFloor.tsx):
//   - Rows 7-10 have no inner pod, so x 5.2..8.4 for z < -4 is empty.
//     Air purifiers sit at x 5.2..5.5, z = cz+1.2 (-13.5, -17.7), so the decor
//     starts at x 5.6 and the pantry wall spans z -13.9..-17.3 (between them).
//   - Middle walk path starts at x 8.5: nothing here goes past x 8.0.
//   - Core: x ±2.6, z ±12, top of cornice y 2.66.
// =============================================================================

/** Facing +x: a shape built in the XY plane (normal +z) is yawed +90°. */
const FACE_X: Vec3 = [0, Math.PI / 2, 0];
/** Cylinder axis Y -> Z, so its 6-sided cap faces +z (pointy-top hexagon). */
const AXIS_Z: Vec3 = [Math.PI / 2, 0, 0];

const box = (size: Vec3, position: Vec3, color: string, rotation?: Vec3): PartSpec => ({
  geometry: new THREE.BoxGeometry(size[0], size[1], size[2]),
  position,
  rotation,
  color,
});

const cyl = (
  radius: number,
  height: number,
  segments: number,
  position: Vec3,
  color: string,
  rotation?: Vec3
): PartSpec => ({
  geometry: new THREE.CylinderGeometry(radius, radius, height, segments),
  position,
  rotation,
  color,
});

/** Round-top arch outline (rectangle + semicircle), base at y=0, centered on x. */
const roundArch = (width: number, height: number): THREE.Shape => {
  const r = width / 2;
  const s = new THREE.Shape();
  s.moveTo(-r, 0);
  s.lineTo(r, 0);
  s.lineTo(r, height);
  s.absarc(0, height, r, 0, Math.PI, false);
  s.lineTo(-r, 0);
  return s;
};

/** Shift a list of locally-built parts to a world origin. */
const at = (origin: Vec3, parts: PartSpec[]): PartSpec[] =>
  parts.map((p) => ({ ...p, position: addVec(origin, p.position ?? [0, 0, 0]) }));

// Palette (sampled from the photos)
const C = {
  wallWarm: '#e7e5e4',
  oak: '#c08a4f',
  walnut: '#7c4a1e',
  slat: '#a16207',
  marble: '#f5f5f4',
  rattan: '#c8a26b',
  black: '#111827',
  moss: ['#365314', '#4d7c0f', '#65a30d', '#3f6212'],
  gallon: '#7dd3fc',
  gallonCap: '#1d4ed8',
  locker: '#e7e2d3',
  lockerSeam: '#a8a29e',
  stone: '#57534e',
  gold: ['#ca8a04', '#eab308', '#a16207', '#d4a017'],
  sofa: '#4d7c0f',
  sofaDark: '#3f6212',
  glowWarm: '#fde68a',
  glowArch: '#fbbf24',
  screen: '#93c5fd',
} as const;

// -----------------------------------------------------------------------------
// A. PANTRY (local frame: x out of the back wall toward +x, z along the wall)
// -----------------------------------------------------------------------------
const PANTRY_ORIGIN: Vec3 = [5.6, 0, -15.6];
const PANTRY_LEN = 3.4; // z -13.9 .. -17.3 in world

const pantrySolid = (): PartSpec[] => {
  const p: PartSpec[] = [
    // Back wall
    box([0.12, 2.6, PANTRY_LEN], [0.06, 1.3, 0], C.wallWarm),

    // Moss / plant wall (z +0.9 .. +1.7)
    box([0.06, 2.4, 0.8], [0.15, 1.25, 1.3], C.moss[0]),

    // Vertical wood slat panel (z +0.45 .. +0.9)
    box([0.04, 2.5, 0.45], [0.14, 1.25, 0.675], C.walnut),

    // Back counter (base cabinet) + marble top (z +0.4 .. -1.7)
    box([0.6, 0.9, 2.1], [0.42, 0.45, -0.65], C.slat),
    box([0.64, 0.04, 2.12], [0.44, 0.92, -0.65], C.marble),
    // Backsplash between counter and upper cabinets
    box([0.02, 0.66, 2.1], [0.13, 1.27, -0.65], '#d6d3d1'),
    // Upper oak cabinets
    box([0.36, 0.7, 2.1], [0.3, 1.95, -0.65], C.oak),

    // Bar counter (peninsula) + top
    box([0.5, 1.0, 2.6], [1.45, 0.5, -0.2], C.walnut),
    box([0.62, 0.05, 2.7], [1.45, 1.025, -0.2], C.marble),
  ];

  // Moss clumps for texture
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      p.push(
        box(
          [0.08, 0.28, 0.22],
          [0.2, 0.35 + i * 0.55 + (j % 2) * 0.2, 1.3 + (j - 1) * 0.24],
          C.moss[(i + j) % C.moss.length]
        )
      );
    }
  }

  // Wood slats on the slat panel
  for (let k = 0; k < 4; k++) {
    p.push(box([0.05, 2.45, 0.06], [0.18, 1.25, 0.5 + k * 0.11], C.slat));
  }

  // Upper cabinet door seams
  for (const z of [-1.175, -0.65, -0.125]) {
    p.push(box([0.005, 0.66, 0.01], [0.481, 1.95, z], C.walnut));
  }

  // Water gallons on the back counter
  for (let k = 0; k < 3; k++) {
    const z = -1.45 + k * 0.27;
    p.push(cyl(0.12, 0.36, 12, [0.4, 1.12, z], C.gallon));
    p.push(cyl(0.04, 0.05, 8, [0.4, 1.325, z], C.gallonCap));
  }

  // Vertical slats on the bar counter front (faces the walk path)
  for (let k = 0; k < 20; k++) {
    p.push(box([0.03, 0.95, 0.07], [1.71, 0.5, -1.45 + k * 0.132], C.slat));
  }

  // Rattan bar stools (sitter faces -x, toward the bar)
  for (const z of [-1.1, -0.5, 0.1, 0.7]) {
    const s: Vec3 = [2.15, 0, z];
    p.push(cyl(0.19, 0.06, 14, addVec(s, [0, 0.74, 0]), C.rattan));
    for (const [dx, dz] of [
      [0.12, 0.12],
      [0.12, -0.12],
      [-0.12, 0.12],
      [-0.12, -0.12],
    ]) {
      p.push(box([0.03, 0.74, 0.03], addVec(s, [dx, 0.37, dz]), C.black));
    }
    p.push(box([0.26, 0.02, 0.02], addVec(s, [0, 0.3, 0.12]), C.black)); // footrest
    p.push(box([0.03, 0.32, 0.34], addVec(s, [0.17, 1.0, 0]), C.rattan)); // backrest
    p.push(box([0.03, 0.3, 0.03], addVec(s, [0.17, 0.92, 0.17]), C.black));
    p.push(box([0.03, 0.3, 0.03], addVec(s, [0.17, 0.92, -0.17]), C.black));
  }

  return at(PANTRY_ORIGIN, p);
};

const pantryGlow = (): PartSpec[] =>
  at(PANTRY_ORIGIN, [
    // Under-cabinet strip and cove strip on top of the pantry wall
    box([0.3, 0.015, 2.05], [0.3, 1.592, -0.65], C.glowWarm),
    box([0.05, 0.03, PANTRY_LEN], [0.15, 2.62, 0], C.glowWarm),
  ]);

// -----------------------------------------------------------------------------
// B. LOCKERS (world z -18.0 .. -19.0, past the purifier at z -17.7)
// -----------------------------------------------------------------------------
const LOCKER_ORIGIN: Vec3 = [5.6, 0, -18.5];

const lockersSolid = (): PartSpec[] => {
  const p: PartSpec[] = [
    box([0.43, 0.06, 0.98], [0.225, 0.03, 0], C.stone), // plinth
    box([0.45, 1.8, 1.0], [0.225, 0.96, 0], C.locker),
    box([0.005, 1.76, 0.01], [0.452, 0.96, 0], C.lockerSeam),
    box([0.35, 0.25, 0.3], [0.2, 1.985, 0.2], '#c2a27a'), // carton on top
  ];
  for (const y of [0.66, 1.26]) {
    p.push(box([0.005, 0.01, 0.98], [0.452, y, 0], C.lockerSeam));
  }
  for (const y of [0.45, 1.05, 1.65]) {
    for (const z of [-0.08, 0.08]) {
      p.push(box([0.015, 0.08, 0.02], [0.46, y, z], C.black));
    }
  }
  return at(LOCKER_ORIGIN, p);
};

// -----------------------------------------------------------------------------
// C. ARCH NICHES on the east core face, between the signage (z -1.6) and the
//    Pria door (z -4.9), where Lift 2 used to be.
// -----------------------------------------------------------------------------
const NICHE_Z = -3.2;

const nicheSolid = (): PartSpec[] => [
  box([0.04, 2.3, 2.9], [2.645, 1.15, NICHE_Z], C.stone),
  box([0.08, 0.03, 2.6], [2.7, 0.95, NICHE_Z], C.slat), // little shelf
];

const nicheGlow = (): PartSpec[] =>
  [-2.3, -2.9, -3.5, -4.1].map((z, i) => ({
    geometry: new THREE.ShapeGeometry(roundArch(0.3, 0.45), 12),
    position: [2.67, i % 2 === 0 ? 1.1 : 1.35, z] as Vec3,
    rotation: FACE_X,
    color: C.glowArch,
  }));

// -----------------------------------------------------------------------------
// D. GOLD HEXAGON WALL + TV on the north end of the core (face at z=12.1),
//    plus a green sofa facing it.
// -----------------------------------------------------------------------------
const HEX_ORIGIN: Vec3 = [0, 0, 12.1];

const hexSolid = (): PartSpec[] => {
  const p: PartSpec[] = [box([3.6, 2.3, 0.03], [0, 1.2, 0.015], '#292524')];

  // Honeycomb: spacing for r=0.24, tiles r=0.215 => small grout gaps.
  const r = 0.24;
  const dx = Math.sqrt(3) * r;
  const dy = 1.5 * r;
  for (let row = 0; row < 6; row++) {
    const y = 0.3 + row * dy;
    const offset = (row % 2) * (dx / 2);
    for (let x = -1.6 + offset; x <= 1.6; x += dx) {
      p.push(cyl(0.215, 0.04, 6, [x, y, 0.05], C.gold[(row + Math.round(x * 3)) & 3], AXIS_Z));
    }
  }

  // Wood slats flanking the hex panel
  for (let k = 0; k < 5; k++) {
    const x = 1.95 + k * 0.13;
    p.push(box([0.06, 2.3, 0.04], [x, 1.15, 0.05], C.walnut));
    p.push(box([0.06, 2.3, 0.04], [-x, 1.15, 0.05], C.walnut));
  }

  // Wall-mounted TV frame (in front of the tiles)
  p.push(box([1.5, 0.86, 0.05], [0, 1.35, 0.1], '#0b0f19'));

  // Green sofa facing the TV (seat, backrest on the far side, arms)
  p.push(box([2.0, 0.4, 0.7], [0, 0.2, 1.8], C.sofa));
  p.push(box([2.0, 0.45, 0.18], [0, 0.62, 2.1], C.sofaDark));
  p.push(box([0.15, 0.55, 0.7], [1.0, 0.28, 1.8], C.sofaDark));
  p.push(box([0.15, 0.55, 0.7], [-1.0, 0.28, 1.8], C.sofaDark));

  return at(HEX_ORIGIN, p);
};

const hexGlow = (): PartSpec[] =>
  at(HEX_ORIGIN, [box([1.4, 0.78, 0.01], [0, 1.35, 0.13], C.screen)]);

// -----------------------------------------------------------------------------
// E. COVE LIGHT strips on top of the core cornice (cornice top y = 2.66)
// -----------------------------------------------------------------------------
const coveGlow = (): PartSpec[] => [
  box([0.04, 0.03, 24.0], [2.66, 2.675, 0], C.glowWarm),
  box([0.04, 0.03, 24.0], [-2.66, 2.675, 0], C.glowWarm),
  box([5.3, 0.03, 0.04], [0, 2.675, 12.06], C.glowWarm),
  box([5.3, 0.03, 0.04], [0, 2.675, -12.06], C.glowWarm),
];

// -----------------------------------------------------------------------------
// Bake once at module load.
// -----------------------------------------------------------------------------
const geoDecor = mergeParts([...pantrySolid(), ...lockersSolid(), ...nicheSolid(), ...hexSolid()], true);
const geoGlow = mergeParts([...pantryGlow(), ...nicheGlow(), ...hexGlow(), ...coveGlow()], true);

const matDecor = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6 });
// Basic + no tone mapping keeps the "lit" parts bright without adding lights.
const matGlow = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false });

const BriDecorComponent: React.FC = () => (
  <group>
    <mesh geometry={geoDecor} material={matDecor} castShadow receiveShadow />
    <mesh geometry={geoGlow} material={matGlow} />

    {/* Pantry label above the back wall, facing the walk path */}
    <Html
      position={[PANTRY_ORIGIN[0] + 0.2, 2.35, PANTRY_ORIGIN[2]]}
      rotation={[0, Math.PI / 2, 0]}
      center
      distanceFactor={11}
      zIndexRange={[5, 0]}
    >
      <div className="flex items-center gap-1.5 bg-slate-900/95 border border-amber-500/60 text-amber-300 px-2 py-1 rounded shadow-lg whitespace-nowrap select-none">
        <span className="text-[8px] font-mono font-bold tracking-wider">☕ PANTRY</span>
      </div>
    </Html>
  </group>
);

/** Static decor; props-less + memo => renders once. */
export const BriDecor = React.memo(BriDecorComponent);
