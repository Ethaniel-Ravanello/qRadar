import React, { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import type { Employee } from '../../types';
import { addVec, cachedColor, commitInstances, composeRoot, mergeParts, type Vec3 } from './instancing';

// =============================================================================
// INSTANCED DESKS
// Replaces 104 x <DeskUnit> (~30 meshes each => ~3,000 draw calls) with 7
// InstancedMeshes. Part dimensions/offsets are copied 1:1 from DeskUnit.tsx.
// Parts sharing a material are merged into one geometry; the "misc" layer
// merges every default-roughness part by baking its color as a vertex color.
// =============================================================================

const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
const cyl = (rt: number, rb: number, h: number, seg: number) => new THREE.CylinderGeometry(rt, rb, h, seg);

// Sub-group origins inside the desk (were nested <group>s in DeskUnit).
const MONITOR: Vec3 = [0, 0.755, -0.12];
const BEACON: Vec3 = [0.66, 0.76, -0.26];
const COFFEE: Vec3 = [-0.58, 0.76, 0.16];
const CHAIR: Vec3 = [0, 0, 0.52];

const geoWalnut = mergeParts([{ geometry: box(1.6, 0.07, 0.82), position: [0, 0.72, 0] }]);

const geoDarkMetal = mergeParts([
  { geometry: box(0.06, 0.7, 0.76), position: [-0.72, 0.35, 0] },
  { geometry: box(0.06, 0.7, 0.76), position: [0.72, 0.35, 0] },
  { geometry: box(0.42, 0.008, 0.14), position: [0, 0.76, 0.14] }, // keyboard
]);

// All remaining opaque, default-roughness standard parts -> one draw call.
const geoMisc = mergeParts(
  [
    // Modesty panel + waste bin
    { geometry: box(1.38, 0.44, 0.02), position: [0, 0.42, -0.34], color: '#2d3242' },
    { geometry: cyl(0.11, 0.09, 0.28, 8), position: [0.62, 0.14, 0.18], color: '#2d3242' },
    // Monitor base, stem, frame
    { geometry: box(0.22, 0.015, 0.16), position: addVec(MONITOR, [0, 0.01, 0]), color: '#181b24' },
    { geometry: box(0.04, 0.3, 0.04), position: addVec(MONITOR, [0, 0.16, -0.04]), color: '#181b24' },
    { geometry: box(0.62, 0.36, 0.03), position: addVec(MONITOR, [0, 0.32, 0]), color: '#10131a' },
    // Mouse pad
    { geometry: box(0.08, 0.008, 0.12), position: [0.3, 0.76, 0.14], color: '#0f172a' },
    // Beacon base
    { geometry: cyl(0.035, 0.045, 0.06, 8), position: addVec(BEACON, [0, 0.03, 0]), color: '#222530' },
    // Coffee lid
    { geometry: cyl(0.038, 0.038, 0.01, 8), position: addVec(COFFEE, [0, 0.125, 0]), color: '#f8fafc' },
    // Chair: star base, chrome stem, cushion, backrest, armrests
    { geometry: cyl(0.26, 0.26, 0.04, 5), position: addVec(CHAIR, [0, 0.05, 0]), color: '#10131a' },
    { geometry: cyl(0.025, 0.025, 0.3, 6), position: addVec(CHAIR, [0, 0.22, 0]), color: '#475569' },
    { geometry: box(0.44, 0.08, 0.44), position: addVec(CHAIR, [0, 0.42, 0]), color: '#1a1d29' },
    { geometry: box(0.4, 0.52, 0.05), position: addVec(CHAIR, [0, 0.74, 0.18]), rotation: [0.08, 0, 0], color: '#141722' },
    { geometry: box(0.04, 0.2, 0.26), position: addVec(CHAIR, [-0.23, 0.56, 0.02]), color: '#141722' },
    { geometry: box(0.04, 0.2, 0.26), position: addVec(CHAIR, [0.23, 0.56, 0.02]), color: '#141722' },
  ],
  true
);

const geoCoffeeCup = mergeParts([{ geometry: cyl(0.035, 0.025, 0.12, 8), position: addVec(COFFEE, [0, 0.06, 0]) }]);
const geoStraw = mergeParts([
  { geometry: cyl(0.004, 0.004, 0.06, 6), position: addVec(COFFEE, [0.01, 0.15, 0]), rotation: [0, 0, 0.15] },
]);
const geoScreen = mergeParts([
  { geometry: new THREE.PlaneGeometry(0.58, 0.32), position: addVec(MONITOR, [0, 0.32, 0.018]) },
]);
const geoBeacon = mergeParts([
  { geometry: new THREE.SphereGeometry(0.03, 8, 8), position: addVec(BEACON, [0, 0.08, 0]) },
]);

// Materials: same parameters as the DeskUnit singletons. Per-desk colors
// (screen glow, status beacon) come from instanceColor on a white base.
const matWalnut = new THREE.MeshStandardMaterial({ color: '#9c623d', roughness: 0.35, flatShading: true });
const matDarkMetal = new THREE.MeshStandardMaterial({ color: '#1e212b', roughness: 0.5, flatShading: true });
const matMisc = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true });
const matCoffeeCup = new THREE.MeshStandardMaterial({ color: '#b45309', transparent: true, opacity: 0.8, flatShading: true });
const matStraw = new THREE.MeshBasicMaterial({ color: '#0284c7' });
const matScreen = new THREE.MeshBasicMaterial({ color: '#ffffff' });
const matBeacon = new THREE.MeshBasicMaterial({ color: '#ffffff' });

const screenColor = (m: Employee) => (m.isBlocker ? '#dc2626' : '#0ea5e9');
const beaconColor = (m: Employee) =>
  m.isBlocker
    ? '#ef4444'
    : m.status === 'deploying'
    ? '#22c55e'
    : m.status === 'idle'
    ? '#94a3b8'
    : m.status === 'testing'
    ? '#06b6d4'
    : '#0284c7';

interface Layer {
  key: string;
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  shadows?: boolean;
  colorOf?: (m: Employee) => string;
}

const LAYERS: Layer[] = [
  { key: 'walnut', geometry: geoWalnut, material: matWalnut, shadows: true },
  { key: 'darkMetal', geometry: geoDarkMetal, material: matDarkMetal },
  { key: 'misc', geometry: geoMisc, material: matMisc },
  { key: 'coffeeCup', geometry: geoCoffeeCup, material: matCoffeeCup },
  { key: 'straw', geometry: geoStraw, material: matStraw },
  { key: 'screen', geometry: geoScreen, material: matScreen, colorOf: screenColor },
  { key: 'beacon', geometry: geoBeacon, material: matBeacon, colorOf: beaconColor },
];

interface DeskInstancesProps {
  /** Desks to draw (already filtered). */
  members: Employee[];
  /** Max instances = total member count; fixed buffer size. */
  capacity: number;
}

const _root = new THREE.Matrix4();

const DeskInstancesComponent: React.FC<DeskInstancesProps> = ({ members, capacity }) => {
  const meshes = useRef<Array<THREE.InstancedMesh | null>>([]);

  // Desks are static: matrices/colors are only rewritten when the member list
  // changes (filter toggle, blocker resolved) — never per frame.
  useLayoutEffect(() => {
    const count = Math.min(members.length, capacity);
    for (let i = 0; i < count; i++) {
      const m = members[i];
      composeRoot(_root, m.deskPosition[0], m.deskPosition[1], m.deskPosition[2], m.rotationY);
      LAYERS.forEach((layer, li) => {
        const mesh = meshes.current[li];
        if (!mesh) return;
        mesh.setMatrixAt(i, _root);
        if (layer.colorOf) mesh.setColorAt(i, cachedColor(layer.colorOf(m)));
      });
    }
    meshes.current.forEach((mesh) => commitInstances(mesh, count));
  }, [members, capacity]);

  return (
    <group>
      {LAYERS.map((layer, li) => (
        <instancedMesh
          // Capacity is baked into the buffer size, so a new capacity needs a new mesh.
          key={`${layer.key}-${capacity}`}
          ref={(el: THREE.InstancedMesh | null) => {
            meshes.current[li] = el;
          }}
          args={[layer.geometry, layer.material, capacity]}
          castShadow={layer.shadows}
          receiveShadow={layer.shadows}
          // Instances span the whole floor; skip the per-mesh bounding-sphere
          // cull (it would need recomputing whenever instances change).
          frustumCulled={false}
        />
      ))}
    </group>
  );
};

export const DeskInstances = React.memo(DeskInstancesComponent);
