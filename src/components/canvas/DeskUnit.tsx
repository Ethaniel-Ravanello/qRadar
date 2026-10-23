import React from 'react';

interface DeskUnitProps {
  position: [number, number, number];
  rotationY?: number;
  status?: 'active' | 'blocked' | 'idle' | 'testing' | 'deploying';
  role?: string;
  isBlocker?: boolean;
}

export const DeskUnit: React.FC<DeskUnitProps> = ({
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

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Table Top: Light Natural Beech / Oak Wood (As seen in photo) */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <boxGeometry args={[1.7, 0.06, 0.85]} />
        <meshStandardMaterial color="#e5ccab" flatShading roughness={0.4} />
      </mesh>

      {/* White Clean Metal Legs */}
      <mesh position={[-0.76, 0.35, 0]}>
        <boxGeometry args={[0.06, 0.7, 0.78]} />
        <meshStandardMaterial color="#f8fafc" flatShading />
      </mesh>
      <mesh position={[0.76, 0.35, 0]}>
        <boxGeometry args={[0.06, 0.7, 0.78]} />
        <meshStandardMaterial color="#f8fafc" flatShading />
      </mesh>

      {/* White Perforated Modesty Screen Under Desk (Distinctive from photo) */}
      <mesh position={[0, 0.42, -0.36]}>
        <boxGeometry args={[1.44, 0.44, 0.03]} />
        <meshStandardMaterial color="#f1f5f9" flatShading />
      </mesh>

      {/* Primary Laptop / Monitor on Desk */}
      <group position={[-0.2, 0.75, -0.08]}>
        {/* Laptop Base */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[0.38, 0.02, 0.28]} />
          <meshStandardMaterial color="#1e293b" flatShading />
        </mesh>
        {/* Laptop Screen Angled */}
        <mesh position={[0, 0.16, -0.12]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[0.38, 0.26, 0.02]} />
          <meshStandardMaterial color="#0f172a" flatShading />
        </mesh>
        {/* Screen Display */}
        <mesh position={[0, 0.16, -0.108]} rotation={[-0.25, 0, 0]}>
          <planeGeometry args={[0.35, 0.23]} />
          <meshBasicMaterial color={isBlocker ? '#dc2626' : '#0284c7'} />
        </mesh>
      </group>

      {/* External Monitor (For dev stations) */}
      <group position={[0.35, 0.75, -0.12]} rotation={[0, -0.2, 0]}>
        {/* Stand */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.05, 0.26, 0.05]} />
          <meshStandardMaterial color="#0f172a" flatShading />
        </mesh>
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.16, 0.02, 0.14]} />
          <meshStandardMaterial color="#0f172a" flatShading />
        </mesh>
        {/* Screen Frame */}
        <mesh position={[0, 0.32, 0]}>
          <boxGeometry args={[0.5, 0.32, 0.04]} />
          <meshStandardMaterial color="#090d16" flatShading />
        </mesh>
        {/* Screen Display */}
        <mesh position={[0, 0.32, 0.022]}>
          <planeGeometry args={[0.46, 0.28]} />
          <meshBasicMaterial color={isBlocker ? '#991b1b' : '#10b981'} />
        </mesh>
      </group>

      {/* Desk Status Gem Beacon */}
      <group position={[0.7, 0.75, -0.28]}>
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color="#e2e8f0" flatShading />
        </mesh>
        <mesh position={[0, 0.11, 0]}>
          <boxGeometry args={[0.07, 0.07, 0.07]} />
          <meshBasicMaterial color={statusColor} />
        </mesh>
      </group>

      {/* Iced Coffee Cup with Straw & Plastic Cup (Like FamilyMart iced coffee in photo!) */}
      <group position={[-0.62, 0.75, 0.18]}>
        {/* Plastic Cup Body */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.045, 0.035, 0.14, 10]} />
          <meshStandardMaterial color="#b45309" transparent opacity={0.85} flatShading />
        </mesh>
        {/* White Lid */}
        <mesh position={[0, 0.155, 0]}>
          <cylinderGeometry args={[0.048, 0.048, 0.015, 10]} />
          <meshStandardMaterial color="#f8fafc" flatShading />
        </mesh>
        {/* Straw */}
        <mesh position={[0.01, 0.18, 0]} rotation={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.005, 0.005, 0.08, 6]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      </group>

      {/* Black Mesh Ergonomic Office Chair (From photo) */}
      <group position={[0, 0, 0.46]}>
        {/* 5-star Black Base */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.04, 5]} />
          <meshStandardMaterial color="#090d16" flatShading />
        </mesh>
        {/* Chrome / Black Stem */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.28, 6]} />
          <meshStandardMaterial color="#334155" flatShading />
        </mesh>
        {/* Black Mesh Seat Cushion */}
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.46, 0.09, 0.46]} />
          <meshStandardMaterial color="#1e293b" flatShading />
        </mesh>
        {/* Curved Mesh Backrest */}
        <mesh position={[0, 0.74, 0.18]} rotation={[0.06, 0, 0]}>
          <boxGeometry args={[0.42, 0.54, 0.06]} />
          <meshStandardMaterial color="#0f172a" flatShading />
        </mesh>
        {/* Black Armrests */}
        <mesh position={[-0.24, 0.58, 0.04]}>
          <boxGeometry args={[0.05, 0.22, 0.28]} />
          <meshStandardMaterial color="#1e293b" flatShading />
        </mesh>
        <mesh position={[0.24, 0.58, 0.04]}>
          <boxGeometry args={[0.05, 0.22, 0.28]} />
          <meshStandardMaterial color="#1e293b" flatShading />
        </mesh>
      </group>

      {/* Small Trash Bin Under Desk (Visible under desk in photo) */}
      <mesh position={[0.6, 0.15, 0.15]}>
        <cylinderGeometry args={[0.12, 0.1, 0.28, 8]} />
        <meshStandardMaterial color="#475569" flatShading />
      </mesh>
    </group>
  );
};
