import React from 'react';
import * as THREE from 'three';

interface DeskUnitProps {
  position: [number, number, number];
  rotationY?: number;
  status?: 'active' | 'blocked' | 'idle' | 'testing' | 'deploying';
  role?: string;
  isBlocker?: boolean;
}

// =============================================================================
// SHARED MATERIALS (module-level singletons)
// Every desk is geometrically identical, so all 100+ instances can share the
// same material objects instead of each mesh allocating its own. This slashes
// GPU material count and lets three.js batch far more aggressively.
// Only the screen + status beacon vary by state, so those stay per-instance.
// =============================================================================
const matWalnut = new THREE.MeshStandardMaterial({ color: '#9c623d', roughness: 0.35, flatShading: true });
const matDarkMetal = new THREE.MeshStandardMaterial({ color: '#1e212b', roughness: 0.5, flatShading: true });
const matPanel = new THREE.MeshStandardMaterial({ color: '#2d3242', flatShading: true });
const matMonitorBody = new THREE.MeshStandardMaterial({ color: '#181b24', flatShading: true });
const matScreenFrame = new THREE.MeshStandardMaterial({ color: '#10131a', flatShading: true });
const matMousePad = new THREE.MeshStandardMaterial({ color: '#0f172a', flatShading: true });
const matBeaconBase = new THREE.MeshStandardMaterial({ color: '#222530', flatShading: true });
const matCoffeeCup = new THREE.MeshStandardMaterial({ color: '#b45309', transparent: true, opacity: 0.8, flatShading: true });
const matCoffeeLid = new THREE.MeshStandardMaterial({ color: '#f8fafc', flatShading: true });
const matStraw = new THREE.MeshBasicMaterial({ color: '#0284c7' });
const matChairBase = new THREE.MeshStandardMaterial({ color: '#10131a', flatShading: true });
const matChrome = new THREE.MeshStandardMaterial({ color: '#475569', flatShading: true });
const matCushion = new THREE.MeshStandardMaterial({ color: '#1a1d29', flatShading: true });
const matChairBack = new THREE.MeshStandardMaterial({ color: '#141722', flatShading: true });

// Screen glow materials (two fixed variants keyed by blocker state).
const matScreenNormal = new THREE.MeshBasicMaterial({ color: '#0ea5e9' });
const matScreenBlocked = new THREE.MeshBasicMaterial({ color: '#dc2626' });

// Status-beacon materials shared across every desk, keyed by the handful of
// possible status colors — avoids allocating one material per desk instance.
const beaconMaterialCache = new Map<string, THREE.MeshBasicMaterial>();
const getBeaconMaterial = (color: string): THREE.MeshBasicMaterial => {
  let mat = beaconMaterialCache.get(color);
  if (!mat) {
    mat = new THREE.MeshBasicMaterial({ color });
    beaconMaterialCache.set(color, mat);
  }
  return mat;
};

const DeskUnitComponent: React.FC<DeskUnitProps> = ({
  position,
  rotationY = 0,
  status = 'active',
  role: _role = 'DEV',
  isBlocker = false,
}) => {
  void _role;

  // Status indicator light color
  const statusColor = isBlocker
    ? '#ef4444' // Red warning
    : status === 'deploying'
    ? '#22c55e' // Bright green
    : status === 'idle'
    ? '#94a3b8' // Grey
    : status === 'testing'
    ? '#06b6d4' // Cyan
    : '#0284c7'; // Blue

  // Beacon color varies per-desk but only across a handful of fixed colors,
  // so reuse a shared cached material instead of allocating per instance.
  const beaconMaterial = getBeaconMaterial(statusColor);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Table Top: Rich Warm Teak / Walnut Wood */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow material={matWalnut}>
        <boxGeometry args={[1.6, 0.07, 0.82]} />
      </mesh>

      {/* Dark Modern Metal Legs / Frame */}
      <mesh position={[-0.72, 0.35, 0]} material={matDarkMetal}>
        <boxGeometry args={[0.06, 0.7, 0.76]} />
      </mesh>
      <mesh position={[0.72, 0.35, 0]} material={matDarkMetal}>
        <boxGeometry args={[0.06, 0.7, 0.76]} />
      </mesh>

      {/* Minimalist Modesty Panel Under Desk */}
      <mesh position={[0, 0.42, -0.34]} material={matPanel}>
        <boxGeometry args={[1.38, 0.44, 0.02]} />
      </mesh>

      {/* Sleek Modern Dev Monitor */}
      <group position={[0, 0.755, -0.12]}>
        {/* Monitor Base */}
        <mesh position={[0, 0.01, 0]} material={matMonitorBody}>
          <boxGeometry args={[0.22, 0.015, 0.16]} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0.16, -0.04]} material={matMonitorBody}>
          <boxGeometry args={[0.04, 0.3, 0.04]} />
        </mesh>
        {/* Screen Frame */}
        <mesh position={[0, 0.32, 0]} material={matScreenFrame}>
          <boxGeometry args={[0.62, 0.36, 0.03]} />
        </mesh>
        {/* Glowing Screen Display (Cyan blue / Red if blocker) */}
        <mesh
          position={[0, 0.32, 0.018]}
          material={isBlocker ? matScreenBlocked : matScreenNormal}
        >
          <planeGeometry args={[0.58, 0.32]} />
        </mesh>
      </group>

      {/* Keyboard & Mouse Pad */}
      <mesh position={[0, 0.76, 0.14]} material={matDarkMetal}>
        <boxGeometry args={[0.42, 0.008, 0.14]} />
      </mesh>
      <mesh position={[0.3, 0.76, 0.14]} material={matMousePad}>
        <boxGeometry args={[0.08, 0.008, 0.12]} />
      </mesh>

      {/* Desk Status Beacon */}
      <group position={[0.66, 0.76, -0.26]}>
        <mesh position={[0, 0.03, 0]} material={matBeaconBase}>
          <cylinderGeometry args={[0.035, 0.045, 0.06, 8]} />
        </mesh>
        <mesh position={[0, 0.08, 0]} material={beaconMaterial}>
          <sphereGeometry args={[0.03, 8, 8]} />
        </mesh>
      </group>

      {/* Iced Coffee Cup */}
      <group position={[-0.58, 0.76, 0.16]}>
        <mesh position={[0, 0.06, 0]} material={matCoffeeCup}>
          <cylinderGeometry args={[0.035, 0.025, 0.12, 8]} />
        </mesh>
        <mesh position={[0, 0.125, 0]} material={matCoffeeLid}>
          <cylinderGeometry args={[0.038, 0.038, 0.01, 8]} />
        </mesh>
        <mesh position={[0.01, 0.15, 0]} rotation={[0, 0, 0.15]} material={matStraw}>
          <cylinderGeometry args={[0.004, 0.004, 0.06, 6]} />
        </mesh>
      </group>

      {/* Modern Black Ergonomic Office Swivel Chair */}
      <group position={[0, 0, 0.52]}>
        {/* Star Base with Casters */}
        <mesh position={[0, 0.05, 0]} material={matChairBase}>
          <cylinderGeometry args={[0.26, 0.26, 0.04, 5]} />
        </mesh>
        {/* Chrome Stem */}
        <mesh position={[0, 0.22, 0]} material={matChrome}>
          <cylinderGeometry args={[0.025, 0.025, 0.3, 6]} />
        </mesh>
        {/* Dark Mesh Cushion */}
        <mesh position={[0, 0.42, 0]} material={matCushion}>
          <boxGeometry args={[0.44, 0.08, 0.44]} />
        </mesh>
        {/* Curved Mesh Backrest */}
        <mesh position={[0, 0.74, 0.18]} rotation={[0.08, 0, 0]} material={matChairBack}>
          <boxGeometry args={[0.4, 0.52, 0.05]} />
        </mesh>
        {/* Armrests */}
        <mesh position={[-0.23, 0.56, 0.02]} material={matChairBack}>
          <boxGeometry args={[0.04, 0.2, 0.26]} />
        </mesh>
        <mesh position={[0.23, 0.56, 0.02]} material={matChairBack}>
          <boxGeometry args={[0.04, 0.2, 0.26]} />
        </mesh>
      </group>

      {/* Small Minimalist Waste Bin beside desk */}
      <mesh position={[0.62, 0.14, 0.18]} material={matPanel}>
        <cylinderGeometry args={[0.11, 0.09, 0.28, 8]} />
      </mesh>
    </group>
  );
};

// Desk geometry is static per member; memoize so unrelated App state changes
// (selecting an avatar, toggling approvals) don't re-render all 100+ desks.
export const DeskUnit = React.memo(DeskUnitComponent);
