import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Employee } from '../../types';
import {
  cachedColor,
  commitInstances,
  composeLocal,
  composeRoot,
  mergeParts,
  type Vec3,
} from './instancing';

// =============================================================================
// INSTANCED AVATARS
// Replaces 104 x <AvatarCharacter> (~18 meshes each) with ~9 InstancedMeshes
// per pose. Dimensions/offsets/animation are copied 1:1 from AvatarCharacter.
//
// - Static body parts: instance matrix = avatar root, written on data change.
// - Arms + head: instance matrix = root * animated local, written per frame.
//   The animation has no per-avatar phase, so the local matrix is computed
//   once per frame and only multiplied per avatar.
// - Picking: an invisible instanced hitbox; R3F reports `instanceId`.
// - Ring + Html badge stay regular components, mounted only for the few
//   avatars that are hovered, selected or blockers (as before).
// =============================================================================

const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
const plane = (w: number, h: number) => new THREE.PlaneGeometry(w, h);

interface ArmSpec {
  position: Vec3;
  rotation: Vec3; // rest pose
  animatedX: (t: number) => number;
}

interface Pose {
  key: 'seated' | 'standing';
  chairDistance: number;
  extraYaw: number;
  legs: THREE.BufferGeometry;
  torso: THREE.BufferGeometry;
  lanyard: THREE.BufferGeometry;
  dot: THREE.BufferGeometry;
  hitbox: THREE.BufferGeometry;
  leftArm: ArmSpec;
  rightArm: ArmSpec;
  headRestY: number;
  headAnimatedY: (t: number) => number;
  badgeY: number;
}

const LEG_UPPER = '#1e2230';
const LEG_LOWER = '#0f172a';

const SEATED: Pose = {
  key: 'seated',
  chairDistance: 0.52,
  extraYaw: Math.PI,
  legs: mergeParts(
    [
      { geometry: box(0.13, 0.13, 0.34), position: [-0.1, 0.44, -0.16], color: LEG_UPPER },
      { geometry: box(0.13, 0.13, 0.34), position: [0.1, 0.44, -0.16], color: LEG_UPPER },
      { geometry: box(0.11, 0.42, 0.13), position: [-0.1, 0.22, -0.32], color: LEG_LOWER },
      { geometry: box(0.11, 0.42, 0.13), position: [0.1, 0.22, -0.32], color: LEG_LOWER },
    ],
    true
  ),
  torso: mergeParts([{ geometry: box(0.36, 0.44, 0.22), position: [0, 0.74, 0] }]),
  lanyard: mergeParts(
    [
      { geometry: plane(0.1, 0.14), position: [0, 0.73, 0.115], color: '#ffffff' },
      { geometry: plane(0.08, 0.04), position: [0, 0.73, 0.118], color: '#00529c' },
    ],
    true
  ),
  dot: mergeParts([{ geometry: box(0.08, 0.04, 0.04), position: [0, 1.56, 0] }]),
  // Feet (y≈0) to top of hair (y≈1.28), lap/legs included (local -z). Stops
  // below the badge position on purpose: R3F computes the pointer from the
  // event's offsetX/Y, so a pointermove landing on the Html badge raycasts at
  // the wrong spot and cancels the hover that spawned the badge.
  hitbox: mergeParts([{ geometry: box(0.6, 1.28, 0.6), position: [0, 0.64, -0.14] }]),
  leftArm: { position: [-0.23, 0.85, 0.02], rotation: [-0.7, 0, 0.2], animatedX: (t) => -0.7 + Math.sin(t * 7) * 0.035 },
  rightArm: { position: [0.23, 0.85, 0.02], rotation: [-0.7, 0, -0.2], animatedX: (t) => -0.7 + Math.cos(t * 7) * 0.035 },
  headRestY: 1.12,
  headAnimatedY: (t) => 1.12 + Math.sin(t * 1.8) * 0.008,
  badgeY: 1.56,
};

const STANDING: Pose = {
  key: 'standing',
  chairDistance: 0,
  extraYaw: 0,
  legs: mergeParts(
    [
      { geometry: box(0.12, 0.44, 0.14), position: [-0.09, 0.22, 0], color: LEG_UPPER },
      { geometry: box(0.12, 0.44, 0.14), position: [0.09, 0.22, 0], color: LEG_UPPER },
    ],
    true
  ),
  torso: mergeParts([{ geometry: box(0.36, 0.44, 0.22), position: [0, 0.66, 0] }]),
  lanyard: mergeParts(
    [
      { geometry: plane(0.1, 0.14), position: [0, 0.66, 0.115], color: '#ffffff' },
      { geometry: plane(0.08, 0.04), position: [0, 0.66, 0.118], color: '#00529c' },
    ],
    true
  ),
  dot: mergeParts([{ geometry: box(0.08, 0.04, 0.04), position: [0, 1.48, 0] }]),
  // Feet to top of hair (y≈1.24); stops below the badge (see SEATED).
  hitbox: mergeParts([{ geometry: box(0.6, 1.24, 0.4), position: [0, 0.62, 0] }]),
  leftArm: { position: [-0.23, 0.66, 0], rotation: [0, 0, 0.08], animatedX: (t) => Math.sin(t * 2) * 0.05 },
  rightArm: { position: [0.23, 0.66, 0], rotation: [0, 0, -0.08], animatedX: (t) => -Math.sin(t * 2) * 0.05 },
  headRestY: 1.04,
  headAnimatedY: (t) => 1.08 + Math.sin(t * 1.5) * 0.008,
  badgeY: 1.48,
};

// Shared by both poses (arms are centered boxes; head parts relative to head origin).
const geoArm = box(0.09, 0.38, 0.09);
const geoSkin = box(0.28, 0.28, 0.26);
const geoHair = mergeParts([
  { geometry: box(0.3, 0.14, 0.28), position: [0, 0.09, -0.02] },
  { geometry: box(0.3, 0.22, 0.04), position: [0, 0.03, -0.14] },
]);
const geoEyes = mergeParts([
  { geometry: box(0.035, 0.035, 0.01), position: [-0.065, 0.01, 0.132] },
  { geometry: box(0.035, 0.035, 0.01), position: [0.065, 0.01, 0.132] },
]);

// Same parameters as the per-avatar materials in AvatarCharacter.
// Torso/arms use instanceColor (avatarColor) on a white base.
const matLegs = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true });
const matTorso = new THREE.MeshStandardMaterial({ color: '#ffffff', flatShading: true, roughness: 0.6 });
const matArm = new THREE.MeshStandardMaterial({ color: '#ffffff', flatShading: true });
const matLanyard = new THREE.MeshBasicMaterial({ vertexColors: true });
const matSkin = new THREE.MeshStandardMaterial({ color: '#fed7aa', flatShading: true, roughness: 0.5 });
const matHair = new THREE.MeshStandardMaterial({ color: '#1c1917', flatShading: true });
const matEyes = new THREE.MeshBasicMaterial({ color: '#1e293b' });
const matDot = new THREE.MeshBasicMaterial({ color: '#ffffff' });
// Never drawn (renderer skips invisible materials) but still raycastable.
const matHitbox = new THREE.MeshBasicMaterial({ visible: false });

const statusDotColor = (m: Employee) =>
  m.isBlocker ? '#ef4444' : m.status === 'testing' ? '#06b6d4' : m.status === 'idle' ? '#eab308' : '#22c55e';

const isAnimated = (m: Employee) => (m.isStanding ?? false) || m.status !== 'idle';
const poseOf = (m: Employee): Pose => (m.isStanding ? STANDING : SEATED);

/** Root transform of an avatar (chair offset + facing), as in AvatarCharacter. */
const avatarRoot = (out: THREE.Matrix4, m: Employee, pose: Pose) =>
  composeRoot(
    out,
    m.deskPosition[0] + Math.sin(m.rotationY) * pose.chairDistance,
    m.deskPosition[1],
    m.deskPosition[2] + Math.cos(m.rotationY) * pose.chairDistance,
    m.rotationY + pose.extraYaw
  );

// Scratch matrices (module-level: avoids per-frame allocation).
const _root = new THREE.Matrix4();
const _world = new THREE.Matrix4();
const _armL = new THREE.Matrix4();
const _armR = new THREE.Matrix4();
const _head = new THREE.Matrix4();

const writeAnimated = (
  roots: THREE.Matrix4[],
  indices: number[],
  armL: THREE.InstancedMesh | null,
  armR: THREE.InstancedMesh | null,
  headParts: Array<THREE.InstancedMesh | null>
) => {
  for (const i of indices) {
    const root = roots[i];
    armL?.setMatrixAt(i, _world.multiplyMatrices(root, _armL));
    armR?.setMatrixAt(i, _world.multiplyMatrices(root, _armR));
    _world.multiplyMatrices(root, _head);
    headParts.forEach((mesh) => mesh?.setMatrixAt(i, _world));
  }
};

// -----------------------------------------------------------------------------
// One pose's worth of instanced meshes.
// -----------------------------------------------------------------------------
interface PoseInstancesProps {
  pose: Pose;
  members: Employee[];
  capacity: number;
  badgeIds: Set<string>;
  onHoverStart: (id: string) => void;
  onHoverEnd: (id: string | undefined) => void;
  onSelect: (emp: Employee) => void;
}

const PoseInstances: React.FC<PoseInstancesProps> = ({
  pose,
  members,
  capacity,
  badgeIds,
  onHoverStart,
  onHoverEnd,
  onSelect,
}) => {
  const legs = useRef<THREE.InstancedMesh>(null);
  const torso = useRef<THREE.InstancedMesh>(null);
  const lanyard = useRef<THREE.InstancedMesh>(null);
  const armL = useRef<THREE.InstancedMesh>(null);
  const armR = useRef<THREE.InstancedMesh>(null);
  const skin = useRef<THREE.InstancedMesh>(null);
  const hair = useRef<THREE.InstancedMesh>(null);
  const eyes = useRef<THREE.InstancedMesh>(null);
  const dot = useRef<THREE.InstancedMesh>(null);
  const hitbox = useRef<THREE.InstancedMesh>(null);

  // Per-avatar root matrices + which instances animate, cached for useFrame.
  const roots = useRef<THREE.Matrix4[]>([]);
  const animatedIdx = useRef<number[]>([]);

  const count = Math.min(members.length, capacity);

  // Body + rest pose: only when the member list changes.
  useLayoutEffect(() => {
    roots.current = [];
    animatedIdx.current = [];
    const headParts = [skin.current, hair.current, eyes.current];
    // Animated buffers are rewritten every frame. Usage must be set before the
    // first GPU upload (it is ignored afterwards), i.e. before the first frame.
    [armL.current, armR.current, ...headParts].forEach((mesh) =>
      mesh?.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    );
    composeLocal(_armL, pose.leftArm.position, pose.leftArm.rotation);
    composeLocal(_armR, pose.rightArm.position, pose.rightArm.rotation);
    composeLocal(_head, [0, pose.headRestY, 0]);

    for (let i = 0; i < count; i++) {
      const m = members[i];
      const root = avatarRoot(new THREE.Matrix4(), m, pose);
      roots.current.push(root);
      if (isAnimated(m)) animatedIdx.current.push(i);

      [legs.current, torso.current, lanyard.current, hitbox.current].forEach((mesh) => mesh?.setMatrixAt(i, root));
      const color = cachedColor(m.avatarColor);
      torso.current?.setColorAt(i, color);
      armL.current?.setColorAt(i, color);
      armR.current?.setColorAt(i, color);
    }
    // Rest pose for everyone; animated instances get overwritten next frame.
    writeAnimated(roots.current, roots.current.map((_, i) => i), armL.current, armR.current, headParts);

    [legs, torso, lanyard, armL, armR, skin, hair, eyes, hitbox].forEach((r) => commitInstances(r.current, count));
  }, [members, count, pose]);

  // Status dots: hidden for avatars showing an Html badge, so compact the list.
  useLayoutEffect(() => {
    const mesh = dot.current;
    if (!mesh) return;
    let n = 0;
    for (let i = 0; i < count; i++) {
      const m = members[i];
      if (badgeIds.has(m.id)) continue;
      mesh.setMatrixAt(n, avatarRoot(_root, m, pose));
      mesh.setColorAt(n, cachedColor(statusDotColor(m)));
      n++;
    }
    commitInstances(mesh, n);
  }, [members, count, pose, badgeIds]);

  // Typing/breathing animation (skipped entirely when nobody animates).
  useFrame((state) => {
    const indices = animatedIdx.current;
    if (indices.length === 0) return;
    const t = state.clock.getElapsedTime();
    const { leftArm, rightArm } = pose;
    composeLocal(_armL, leftArm.position, [leftArm.animatedX(t), leftArm.rotation[1], leftArm.rotation[2]]);
    composeLocal(_armR, rightArm.position, [rightArm.animatedX(t), rightArm.rotation[1], rightArm.rotation[2]]);
    composeLocal(_head, [0, pose.headAnimatedY(t), 0]);
    const headParts = [skin.current, hair.current, eyes.current];
    writeAnimated(roots.current, indices, armL.current, armR.current, headParts);
    [armL.current, armR.current, ...headParts].forEach((mesh) => {
      if (mesh) mesh.instanceMatrix.needsUpdate = true;
    });
  });

  const memberAt = (e: Pick<ThreeEvent<PointerEvent>, 'instanceId'>) =>
    e.instanceId !== undefined && e.instanceId < count ? members[e.instanceId] : undefined;

  const layer = (
    ref: React.RefObject<THREE.InstancedMesh | null>,
    name: string,
    geometry: THREE.BufferGeometry,
    material: THREE.Material
  ) => (
    <instancedMesh
      key={`${pose.key}-${name}-${capacity}`}
      ref={ref}
      args={[geometry, material, capacity]}
      frustumCulled={false}
    />
  );

  return (
    <group>
      {layer(legs, 'legs', pose.legs, matLegs)}
      {layer(torso, 'torso', pose.torso, matTorso)}
      {layer(lanyard, 'lanyard', pose.lanyard, matLanyard)}
      {layer(armL, 'armL', geoArm, matArm)}
      {layer(armR, 'armR', geoArm, matArm)}
      {layer(skin, 'skin', geoSkin, matSkin)}
      {layer(hair, 'hair', geoHair, matHair)}
      {layer(eyes, 'eyes', geoEyes, matEyes)}
      {layer(dot, 'dot', pose.dot, matDot)}
      <instancedMesh
        key={`${pose.key}-hitbox-${capacity}`}
        ref={hitbox}
        args={[pose.hitbox, matHitbox, capacity]}
        frustumCulled={false}
        onClick={(e) => {
          const m = memberAt(e);
          if (!m) return;
          e.stopPropagation();
          onSelect(m);
        }}
        onPointerOver={(e) => {
          const m = memberAt(e);
          if (!m) return;
          e.stopPropagation();
          onHoverStart(m.id);
        }}
        onPointerOut={(e) => onHoverEnd(memberAt(e)?.id)}
      />
    </group>
  );
};

// -----------------------------------------------------------------------------
// Ring + Html badge for one highlighted avatar (hovered / selected / blocker).
// -----------------------------------------------------------------------------
interface AvatarOverlayProps {
  employee: Employee;
  isHovered: boolean;
  isSelected: boolean;
  onSelect: (emp: Employee) => void;
}

const AvatarOverlay = React.memo<AvatarOverlayProps>(({ employee, isHovered, isSelected, onSelect }) => {
  const pose = poseOf(employee);
  const { position, rotationY } = useMemo(() => {
    const p = new THREE.Vector3();
    const q = new THREE.Quaternion();
    avatarRoot(_root, employee, pose).decompose(p, q, new THREE.Vector3());
    return { position: p.toArray() as Vec3, rotationY: employee.rotationY + pose.extraYaw };
  }, [employee, pose]);

  const displayName = employee.shortName || employee.name.split(' ')[0];

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {(isHovered || isSelected) && (
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

      <Html
        position={[0, pose.badgeY, 0]}
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
          <span className="font-bold tracking-tight text-[11px] whitespace-nowrap">{displayName}</span>
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${employee.isBlocker ? 'animate-ping' : ''}`}
            style={{ backgroundColor: statusDotColor(employee) }}
          />
          {isHovered && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-48 p-2 rounded-xl bg-slate-950/95 border border-slate-700 text-[10px] text-slate-200 shadow-2xl z-50 pointer-events-none">
              <div className="font-bold text-sky-400 flex items-center justify-between">
                <span>
                  {employee.role} • PN {employee.pn}
                </span>
                {employee.isBlocker && <span className="text-red-400 font-black">BLOCKER</span>}
              </div>
              <p className="mt-0.5 leading-snug line-clamp-2">{employee.speechBubble}</p>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
});

// -----------------------------------------------------------------------------
// Public component
// -----------------------------------------------------------------------------
interface AvatarInstancesProps {
  /** Avatars to draw (already filtered). */
  members: Employee[];
  /** Max instances per pose = total member count; fixed buffer size. */
  capacity: number;
  selectedId: string | null;
  onSelect: (emp: Employee) => void;
}

const AvatarInstancesComponent: React.FC<AvatarInstancesProps> = ({ members, capacity, selectedId, onSelect }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const seated = useMemo(() => members.filter((m) => !m.isStanding), [members]);
  const standing = useMemo(() => members.filter((m) => m.isStanding), [members]);

  // Ignore a stale hover if that avatar was filtered out under the pointer.
  const activeHoverId = hoveredId && members.some((m) => m.id === hoveredId) ? hoveredId : null;

  const badgeIds = useMemo(() => {
    const ids = new Set<string>();
    members.forEach((m) => {
      if (m.isBlocker || m.id === activeHoverId || m.id === selectedId) ids.add(m.id);
    });
    return ids;
  }, [members, activeHoverId, selectedId]);

  // Cursor is derived from state, so hovering straight from one avatar to the
  // next can't leave it stuck on 'auto'. Cleanup also covers unmount.
  useEffect(() => {
    if (!activeHoverId) return;
    document.body.style.cursor = 'pointer';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [activeHoverId]);

  const onHoverStart = setHoveredId;
  const onHoverEnd = (id: string | undefined) => setHoveredId((prev) => (id === undefined || prev === id ? null : prev));

  const shared = { capacity, badgeIds, onHoverStart, onHoverEnd, onSelect };

  return (
    <group>
      <PoseInstances pose={SEATED} members={seated} {...shared} />
      <PoseInstances pose={STANDING} members={standing} {...shared} />
      {members
        .filter((m) => badgeIds.has(m.id))
        .map((m) => (
          <AvatarOverlay
            key={m.id}
            employee={m}
            isHovered={m.id === activeHoverId}
            isSelected={m.id === selectedId}
            onSelect={onSelect}
          />
        ))}
    </group>
  );
};

export const AvatarInstances = React.memo(AvatarInstancesComponent);
