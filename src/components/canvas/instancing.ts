import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// =============================================================================
// INSTANCING HELPERS
// Shared by DeskInstances / AvatarInstances. The idea:
//   1. Every sub-part of a model (desk leg, monitor, chair...) is baked at its
//      local offset and merged with the other parts that share a material,
//      producing ONE geometry per material.
//   2. That geometry is drawn with a THREE.InstancedMesh: one draw call renders
//      it for every desk/avatar, each with its own transform (and color).
// =============================================================================

export type Vec3 = [number, number, number];

export interface PartSpec {
  /** Fresh geometry; mergeParts takes ownership and transforms it in place. */
  geometry: THREE.BufferGeometry;
  position?: Vec3;
  rotation?: Vec3;
  /** Baked as a vertex color when merging with `vertexColors = true`. */
  color?: THREE.ColorRepresentation;
}

const _local = new THREE.Matrix4();
const _pos = new THREE.Vector3();
const _quat = new THREE.Quaternion();
const _euler = new THREE.Euler();
const _scale = new THREE.Vector3(1, 1, 1);
const _color = new THREE.Color();

export const addVec = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

/** Local TRS matrix (Euler XYZ, same as an R3F `rotation` prop). */
export const composeLocal = (
  out: THREE.Matrix4,
  position: Vec3 = [0, 0, 0],
  rotation: Vec3 = [0, 0, 0]
): THREE.Matrix4 =>
  out.compose(
    _pos.set(position[0], position[1], position[2]),
    _quat.setFromEuler(_euler.set(rotation[0], rotation[1], rotation[2])),
    _scale.set(1, 1, 1)
  );

const _yAxis = new THREE.Vector3(0, 1, 0);
const _rootPos = new THREE.Vector3();
const _rootQuat = new THREE.Quaternion();
const _one = new THREE.Vector3(1, 1, 1);

/** World matrix of a model root standing at `position`, yawed by `rotationY`. */
export const composeRoot = (
  out: THREE.Matrix4,
  x: number,
  y: number,
  z: number,
  rotationY: number
): THREE.Matrix4 =>
  out.compose(_rootPos.set(x, y, z), _rootQuat.setFromAxisAngle(_yAxis, rotationY), _one);

/**
 * Bake each part at its local transform and merge them into one geometry.
 * With `vertexColors`, each part's color is written to a `color` attribute so
 * differently-colored parts can still share a single material/draw call.
 */
export function mergeParts(parts: PartSpec[], vertexColors = false): THREE.BufferGeometry {
  const prepared = parts.map((part) => {
    const g = part.geometry;
    g.applyMatrix4(composeLocal(_local, part.position, part.rotation));
    if (vertexColors) {
      // THREE.Color converts sRGB hex -> linear, which is what vertex colors expect.
      _color.set(part.color ?? '#ffffff');
      const count = g.getAttribute('position').count;
      const colors = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        colors[i * 3] = _color.r;
        colors[i * 3 + 1] = _color.g;
        colors[i * 3 + 2] = _color.b;
      }
      g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
    return g;
  });

  if (prepared.length === 1) return prepared[0];
  const merged = mergeGeometries(prepared, false);
  if (!merged) throw new Error('mergeParts: parts have incompatible attributes');
  prepared.forEach((g) => g.dispose());
  return merged;
}

/** Small cache so per-instance colors don't allocate a THREE.Color per frame/update. */
const colorCache = new Map<string, THREE.Color>();
export const cachedColor = (hex: string): THREE.Color => {
  let c = colorCache.get(hex);
  if (!c) {
    c = new THREE.Color(hex);
    colorCache.set(hex, c);
  }
  return c;
};

/** Mark matrices (and colors, if any) dirty and set the active instance count. */
export const commitInstances = (mesh: THREE.InstancedMesh | null, count: number) => {
  if (!mesh) return;
  mesh.count = count;
  mesh.visible = count > 0;
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
};
