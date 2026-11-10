import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// =============================================================================
// KEYBOARD CAMERA CONTROLS (fly-style, on top of OrbitControls)
//   W / S        forward / back   (relative to where the camera looks, on XZ)
//   A / D        strafe left / right
//   Space        up
//   Shift        down
//
// Camera position AND the OrbitControls target are moved by the same delta, so
// the orbit offset is preserved: mouse orbit/zoom keep working unchanged and
// simply pivot around the new spot.
//
// Keys are matched by `event.code` (physical key), so it works on any keyboard
// layout (AZERTY, etc.).
// =============================================================================

type Action = 'forward' | 'back' | 'left' | 'right' | 'up' | 'down';

const KEY_MAP: Record<string, Action> = {
  KeyW: 'forward',
  KeyS: 'back',
  KeyA: 'left',
  KeyD: 'right',
  Space: 'up',
  ShiftLeft: 'down',
  ShiftRight: 'down',
};

// Keep the pivot inside the office (stadium floor is ~±18.4 x ±37.9).
const BOUNDS = {
  min: new THREE.Vector3(-20, 0, -40),
  max: new THREE.Vector3(20, 30, 40),
};

/** Ignore keys while the user types in a form field. */
const isTypingTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
};

interface OrbitLike {
  target: THREE.Vector3;
}

interface CameraKeyboardControlsProps {
  enabled?: boolean;
  /** Base speed in world units per second (scaled by zoom distance). */
  speed?: number;
}

const _forward = new THREE.Vector3();
const _right = new THREE.Vector3();
const _wish = new THREE.Vector3();
const _prevTarget = new THREE.Vector3();
const _delta = new THREE.Vector3();
const UP = new THREE.Vector3(0, 1, 0);

export const CameraKeyboardControls: React.FC<CameraKeyboardControlsProps> = ({
  enabled = true,
  speed = 14,
}) => {
  const camera = useThree((s) => s.camera);
  // Set by <OrbitControls makeDefault />.
  const controls = useThree((s) => s.controls) as unknown as OrbitLike | null;

  const pressed = useRef(new Set<Action>());
  const velocity = useRef(new THREE.Vector3());

  useEffect(() => {
    const keys = pressed.current;
    if (!enabled) {
      keys.clear();
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const action = KEY_MAP[e.code];
      if (!action || e.ctrlKey || e.metaKey || e.altKey || isTypingTarget(e.target)) return;
      // Space would otherwise scroll the page or "click" a focused toolbar button.
      if (e.code === 'Space') e.preventDefault();
      keys.add(action);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const action = KEY_MAP[e.code];
      if (!action) return;
      // Buttons activate on Space *keyup*; block that too unless the user is typing.
      if (e.code === 'Space' && !isTypingTarget(e.target)) e.preventDefault();
      keys.delete(action);
    };
    // Releasing a key while the window is unfocused never fires keyup, which
    // would leave the camera drifting. Drop everything on blur/tab switch.
    const reset = () => keys.clear();
    const onVisibility = () => document.hidden && reset();

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', reset);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', reset);
      document.removeEventListener('visibilitychange', onVisibility);
      keys.clear();
    };
  }, [enabled]);

  useFrame((_, rawDt) => {
    const vel = velocity.current;
    const keys = pressed.current;
    if (!controls || (keys.size === 0 && vel.lengthSq() < 1e-6)) return;

    // Clamp dt so a long frame (tab refocus, GC pause) can't teleport the camera.
    const dt = Math.min(rawDt, 0.1);

    // Horizontal basis from the view direction, flattened onto the floor.
    camera.getWorldDirection(_forward);
    _forward.y = 0;
    if (_forward.lengthSq() < 1e-6) {
      // Looking straight down: use the camera's screen-up as "forward".
      _forward.copy(camera.up).applyQuaternion(camera.quaternion).setY(0);
    }
    _forward.normalize();
    _right.crossVectors(_forward, UP).normalize();

    _wish.set(0, 0, 0);
    if (keys.has('forward')) _wish.add(_forward);
    if (keys.has('back')) _wish.sub(_forward);
    if (keys.has('right')) _wish.add(_right);
    if (keys.has('left')) _wish.sub(_right);
    if (keys.has('up')) _wish.y += 1;
    if (keys.has('down')) _wish.y -= 1;
    if (_wish.lengthSq() > 0) _wish.normalize();

    // Move faster when zoomed out, slower up close.
    const distance = camera.position.distanceTo(controls.target);
    _wish.multiplyScalar(speed * THREE.MathUtils.clamp(distance / 25, 0.4, 2.5));

    // Frame-rate independent ease in/out instead of instant start/stop.
    vel.lerp(_wish, 1 - Math.exp(-10 * dt));
    if (_wish.lengthSq() === 0 && vel.lengthSq() < 1e-4) {
      vel.set(0, 0, 0);
      return;
    }

    // Move the pivot (clamped to the office), then shift the camera by the
    // delta actually applied so the orbit offset stays intact at the bounds.
    _prevTarget.copy(controls.target);
    controls.target.addScaledVector(vel, dt).clamp(BOUNDS.min, BOUNDS.max);
    _delta.subVectors(controls.target, _prevTarget);
    camera.position.add(_delta);
  });

  return null;
};
