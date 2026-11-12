import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { addVec, mergeParts, type PartSpec, type Vec3 } from './instancing';

// =============================================================================
// BRI OFFICE DECOR (inspired by the real 18F office photos)
//   A. Long L-shaped pantry bar with eight rattan stools
//   B. Light-oak cabinets, refrigerator, microwave, kettle, and water gallons
//   C. Plant wall + walnut slats at the pantry entrance
//   D. Gray feature wall with warm illuminated arch and circle niches
//   E. Gold hexagon feature wall without a TV
//   F. Warm cove-light strips on the core cornice
//
// Everything is static and baked into TWO merged, vertex-colored geometries at
// module load: one lit (standard) mesh and one glowing (basic) mesh. This keeps
// all of the decor to two draw calls and adds no dynamic lights.
//
// Placement (see OfficeFloor.tsx): rows 7-10 have no inner pod, leaving
// x 5.2..8.4 and z -4..-19 free. The pantry uses x 5.6..8.15 and
// z -5.15..-18.15, stopping before the middle walk path at x=8.5.
// =============================================================================

/** Facing +x: a shape built in the XY plane (normal +z) is yawed +90°. */
const FACE_X: Vec3 = [0, Math.PI / 2, 0];
/** Cylinder axis Y -> X, so its six-sided cap faces +x. */
const AXIS_X: Vec3 = [0, 0, Math.PI / 2];

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

/** Round-top arch silhouette, base at y=0 and centered on its local x-axis. */
const roundArch = (width: number, height: number): THREE.Shape => {
  const radius = width / 2;
  const shape = new THREE.Shape();
  shape.moveTo(-radius, 0);
  shape.lineTo(radius, 0);
  shape.lineTo(radius, height);
  shape.absarc(0, height, radius, 0, Math.PI, false);
  shape.lineTo(-radius, 0);
  return shape;
};

/** Shift locally-built parts to a world origin. */
const at = (origin: Vec3, parts: PartSpec[]): PartSpec[] =>
  parts.map((part) => ({ ...part, position: addVec(origin, part.position ?? [0, 0, 0]) }));

// Palette sampled from the three pantry reference photos.
const C = {
  wallWarm: '#e7e5e4',
  concrete: '#66635f',
  oak: '#c99a64',
  oakLight: '#d8b487',
  walnut: '#70411d',
  slat: '#9a5b24',
  marble: '#f5f5f4',
  rattan: '#c9aa78',
  black: '#111827',
  steel: '#94a3b8',
  steelDark: '#475569',
  moss: ['#365314', '#4d7c0f', '#65a30d', '#3f6212'],
  gallon: '#7dd3fc',
  gallonCap: '#1d4ed8',
  gold: ['#ca8a04', '#eab308', '#a16207', '#d4a017'],
  glowWarm: '#fde68a',
  glowArch: '#ffd27a',
} as const;

// -----------------------------------------------------------------------------
// A-D. PANTRY
// Local frame: x comes out from the back wall toward the squad desks; z runs
// along the long pantry. The plant wall is at the +z end, followed by wood
// slats, refrigerator/cabinets, and the long gray niche wall at the -z end.
// -----------------------------------------------------------------------------
const PANTRY_ORIGIN: Vec3 = [5.6, 0, -11.65];
const PANTRY_LEN = 13.0; // world z -5.15 .. -18.15
const BAR_CENTER_Z = -2.55;
const BAR_LENGTH = 7.5;

interface ArchNiche {
  z: number;
  baseY: number;
  width: number;
  height: number;
}

const ARCH_NICHES: ArchNiche[] = [
  { z: 0.05, baseY: 1.06, width: 0.5, height: 0.62 },
  { z: -0.78, baseY: 1.03, width: 0.38, height: 0.46 },
  { z: -2.15, baseY: 1.22, width: 0.36, height: 0.45 },
  { z: -2.9, baseY: 1.03, width: 0.42, height: 0.52 },
  { z: -3.65, baseY: 1.0, width: 0.3, height: 0.36 },
  { z: -4.25, baseY: 1.03, width: 0.28, height: 0.32 },
];

const pantrySolid = (): PartSpec[] => {
  const parts: PartSpec[] = [
    // One continuous warm wall anchors the full pantry run.
    box([0.12, 2.6, PANTRY_LEN], [0.06, 1.3, 0], C.wallWarm),

    // Full-height plant wall and adjacent walnut slat transition.
    box([0.08, 2.5, 2.05], [0.15, 1.25, 5.42], C.moss[0]),
    box([0.06, 2.5, 0.64], [0.15, 1.25, 4.04], C.walnut),

    // Kitchen run: lower cabinets, white top and backsplash.
    box([0.64, 0.9, 3.25], [0.42, 0.45, 2.05], C.oak),
    box([0.7, 0.05, 3.3], [0.45, 0.93, 2.05], C.marble),
    box([0.025, 0.62, 3.25], [0.14, 1.27, 2.05], '#d6d3d1'),

    // Light-oak upper cabinets. The refrigerator occupies their +z end.
    box([0.38, 0.72, 2.15], [0.31, 2.0, 1.48], C.oakLight),

    // Tall stainless refrigerator with two doors and a dark water dispenser.
    box([0.62, 2.18, 0.92], [0.42, 1.09, 3.18], C.steel),
    box([0.02, 2.08, 0.025], [0.74, 1.1, 3.18], C.steelDark),
    box([0.025, 0.02, 0.82], [0.745, 1.28, 3.18], C.steelDark),
    box([0.035, 0.46, 0.3], [0.755, 0.88, 3.18], '#1f2937'),

    // Gray concrete feature wall behind the long bar.
    box([0.08, 2.5, 5.55], [0.15, 1.25, -2.45], C.concrete),
    // Horizontal walnut band seen below the illuminated niches.
    box([0.12, 0.24, 5.35], [0.2, 0.83, -2.45], C.walnut),

    // Long bar counter, plus a short return to make the L shape from the photo.
    box([0.58, 1.0, BAR_LENGTH], [1.48, 0.5, BAR_CENTER_Z], C.oak),
    box([0.7, 0.055, BAR_LENGTH + 0.08], [1.48, 1.03, BAR_CENTER_Z], C.marble),
    box([1.55, 1.0, 0.58], [0.98, 0.5, 1.23], C.oak),
    box([1.62, 0.055, 0.68], [0.98, 1.03, 1.23], C.marble),

    // Microwave and kettle on the kitchen counter.
    box([0.38, 0.3, 0.55], [0.72, 1.1, 0.9], C.black),
    box([0.02, 0.22, 0.36], [0.92, 1.1, 0.9], '#334155'),
    cyl(0.12, 0.28, 12, [0.54, 1.09, 1.62], C.steelDark),
    cyl(0.07, 0.05, 12, [0.54, 1.255, 1.62], C.black),
  ];

  // Plant wall clumps create the dense, irregular texture in the reference.
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      parts.push(
        box(
          [0.09, 0.27, 0.3],
          [0.22, 0.25 + row * 0.49 + (col % 2) * 0.06, 4.78 + col * 0.31],
          C.moss[(row + col) % C.moss.length]
        )
      );
    }
  }

  // Closely-spaced vertical timber slats at the edge of the green wall.
  for (let index = 0; index < 7; index++) {
    parts.push(box([0.055, 2.45, 0.055], [0.205, 1.25, 3.76 + index * 0.09], C.slat));
  }

  // Cabinet fronts and slim dark handles.
  for (const z of [0.96, 1.5, 2.04]) {
    parts.push(box([0.012, 0.68, 0.018], [0.505, 2.0, z], C.walnut));
    parts.push(box([0.022, 0.12, 0.025], [0.52, 1.96, z + 0.2], C.black));
  }
  for (const z of [0.62, 1.18, 1.74, 2.3]) {
    parts.push(box([0.012, 0.82, 0.018], [0.745, 0.45, z], C.walnut));
  }

  // Three water gallons beside the small appliances.
  for (let index = 0; index < 3; index++) {
    const z = 2.2 + index * 0.3;
    parts.push(cyl(0.13, 0.36, 12, [0.48, 1.13, z], C.gallon));
    parts.push(cyl(0.045, 0.05, 8, [0.48, 1.335, z], C.gallonCap));
  }

  // Vertical oak slats across the full public-facing bar front.
  const barStart = BAR_CENTER_Z - BAR_LENGTH / 2 + 0.09;
  for (let index = 0; index < 48; index++) {
    parts.push(box([0.035, 0.94, 0.07], [1.79, 0.5, barStart + index * 0.155], C.slat));
  }
  // Slats on the short return.
  for (let index = 0; index < 10; index++) {
    parts.push(box([0.07, 0.94, 0.035], [0.3 + index * 0.15, 0.5, 1.56], C.slat));
  }

  // Eight tall black-and-rattan chairs line the long bar.
  for (const z of [-5.55, -4.72, -3.89, -3.06, -2.23, -1.4, -0.57, 0.26]) {
    const stool: Vec3 = [2.22, 0, z];
    // Woven seat.
    parts.push(box([0.36, 0.065, 0.38], addVec(stool, [0, 0.74, 0]), C.rattan));
    // Four dark metal legs.
    for (const [dx, dz] of [
      [0.14, 0.15],
      [0.14, -0.15],
      [-0.14, 0.15],
      [-0.14, -0.15],
    ]) {
      parts.push(box([0.035, 0.74, 0.035], addVec(stool, [dx, 0.37, dz]), C.black));
    }
    // Lower footrest and tall rattan backrest with a dark frame.
    parts.push(box([0.3, 0.025, 0.025], addVec(stool, [0, 0.31, 0.15]), C.black));
    parts.push(box([0.045, 0.5, 0.42], addVec(stool, [0.19, 1.02, 0]), C.rattan));
    parts.push(box([0.035, 0.54, 0.035], addVec(stool, [0.2, 0.98, 0.19]), C.black));
    parts.push(box([0.035, 0.54, 0.035], addVec(stool, [0.2, 0.98, -0.19]), C.black));
    parts.push(box([0.035, 0.035, 0.42], addVec(stool, [0.2, 1.24, 0]), C.black));
  }

  // Dark inner silhouettes make the glowing arch shapes read as outlines.
  for (const niche of ARCH_NICHES) {
    parts.push({
      geometry: new THREE.ShapeGeometry(
        roundArch(Math.max(0.12, niche.width - 0.12), Math.max(0.18, niche.height - 0.08)),
        12
      ),
      position: [0.225, niche.baseY + 0.055, niche.z],
      rotation: FACE_X,
      color: C.concrete,
    });
  }

  return at(PANTRY_ORIGIN, parts);
};

const pantryGlow = (): PartSpec[] => {
  const parts: PartSpec[] = [
    // Cabinet task light, warm cornice, and the bar's under-counter strip.
    box([0.32, 0.018, 2.1], [0.31, 1.62, 1.48], C.glowWarm),
    box([0.05, 0.03, PANTRY_LEN], [0.17, 2.62, 0], C.glowWarm),
    box([0.035, 0.035, BAR_LENGTH - 0.15], [1.81, 0.85, BAR_CENTER_Z], C.glowWarm),
  ];

  for (const niche of ARCH_NICHES) {
    parts.push({
      geometry: new THREE.ShapeGeometry(roundArch(niche.width, niche.height), 12),
      position: [0.215, niche.baseY, niche.z],
      rotation: FACE_X,
      color: C.glowArch,
    });
  }

  // One circular niche, matching the large round opening in the reference.
  parts.push({
    geometry: new THREE.RingGeometry(0.2, 0.27, 24),
    position: [0.215, 1.9, -1.25],
    rotation: FACE_X,
    color: C.glowArch,
  });

  return at(PANTRY_ORIGIN, parts);
};

// -----------------------------------------------------------------------------
// E. GOLD HEXAGON FEATURE WALL (TV removed)
// Remains on the east core face, where it appears in the third reference photo.
// Lifts stay on the north end face in OfficeFloor.tsx.
// -----------------------------------------------------------------------------
const HEX_ORIGIN: Vec3 = [2.6, 0, 3.8];

const hexSolid = (): PartSpec[] => {
  const parts: PartSpec[] = [box([0.03, 2.3, 3.8], [0.02, 1.2, 0], '#292524')];

  const radius = 0.24;
  const deltaZ = 1.5 * radius;
  const deltaY = Math.sqrt(3) * radius;
  for (let column = 0; column < 10; column++) {
    const z = -1.62 + column * deltaZ;
    const offset = (column % 2) * (deltaY / 2);
    for (let y = 0.3 + offset; y <= 2.15; y += deltaY) {
      parts.push(
        cyl(
          0.215,
          0.04,
          6,
          [0.06, y, z],
          C.gold[(column + Math.round(y * 3)) & 3],
          AXIS_X
        )
      );
    }
  }

  return at(HEX_ORIGIN, parts);
};

// -----------------------------------------------------------------------------
// F. COVE LIGHT strips on top of the core cornice (cornice top y = 2.66)
// -----------------------------------------------------------------------------
const coveGlow = (): PartSpec[] => [
  box([0.04, 0.03, 24.0], [2.66, 2.675, 0], C.glowWarm),
  box([0.04, 0.03, 24.0], [-2.66, 2.675, 0], C.glowWarm),
  box([5.3, 0.03, 0.04], [0, 2.675, 12.06], C.glowWarm),
  box([5.3, 0.03, 0.04], [0, 2.675, -12.06], C.glowWarm),
];

// Bake all static parts once at module load.
const geoDecor = mergeParts([...pantrySolid(), ...hexSolid()], true);
const geoGlow = mergeParts([...pantryGlow(), ...coveGlow()], true);

const matDecor = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6 });
const matGlow = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false });

const BriDecorComponent: React.FC = () => (
  <group>
    <mesh geometry={geoDecor} material={matDecor} castShadow receiveShadow />
    <mesh geometry={geoGlow} material={matGlow} />

    <Html
      position={[PANTRY_ORIGIN[0] + 0.22, 2.36, PANTRY_ORIGIN[2] + 2.0]}
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

/** Static decor; props-less + memo means it renders once. */
export const BriDecor = React.memo(BriDecorComponent);
