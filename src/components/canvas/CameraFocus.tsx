import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// =============================================================================
// CAMERA FOCUS
// - Person selected: fly in to frame them (keeps the current viewing direction,
//   so the camera never swings around and disorients).
// - Squad selected (no person): pan the pivot to the squad, keeping the zoom.
// - While the member drawer is open, the projection is shifted with
//   setViewOffset so the person sits in the middle of the visible area instead
//   of behind the drawer. The orbit pivot stays on the person.
// Any user camera input (mouse orbit/zoom, WASD) cancels a running flight.
// Cost: a few vector lerps per frame, only while animating.
// =============================================================================

export type Vec3 = [number, number, number];

interface OrbitLike extends THREE.EventDispatcher<{ start: object }> {
  target: THREE.Vector3;
}

interface CameraFocusProps {
  /** Changes whenever a different person is selected (null = none). */
  personKey: string | null;
  personPoint: Vec3 | null;
  /** Changes whenever a different squad is selected. */
  squadKey: string | null;
  squadPoint: Vec3 | null;
  /** Width (px) of the drawer covering the right side of the canvas; 0 = closed. */
  coveredRightPx: number;
}

const PERSON_DISTANCE = 9;
const PERSON_POLAR = 0.95; // rad from vertical (~54°): looks down at the desk
const SPEED = 4; // higher = faster ease-out
const MOVE_KEYS = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'ShiftLeft', 'ShiftRight']);

const _offset = new THREE.Vector3();
const _spherical = new THREE.Spherical();

export const CameraFocus: React.FC<CameraFocusProps> = ({
  personKey,
  personPoint,
  squadKey,
  squadPoint,
  coveredRightPx,
}) => {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const controls = useThree((s) => s.controls) as unknown as OrbitLike | null;
  const size = useThree((s) => s.size);

  const flight = useRef<{ target: THREE.Vector3; position: THREE.Vector3 } | null>(null);
  const viewOffset = useRef(0);
  // Latest points, read by the effects below without re-triggering them.
  const points = useRef({ personPoint, squadPoint, personKey });
  points.current = { personPoint, squadPoint, personKey };

  // Fly to a newly selected person.
  useEffect(() => {
    const p = points.current.personPoint;
    if (!personKey || !p || !controls) return;
    const target = new THREE.Vector3(p[0], p[1], p[2]);
    _spherical.setFromVector3(_offset.subVectors(camera.position, controls.target));
    _spherical.radius = PERSON_DISTANCE;
    _spherical.phi = PERSON_POLAR;
    _spherical.makeSafe();
    flight.current = { target, position: target.clone().add(_offset.setFromSpherical(_spherical)) };
  }, [personKey, controls, camera]);

  // Pan to a newly selected squad (ignored when a person drives the camera).
  useEffect(() => {
    const p = points.current.squadPoint;
    if (!squadKey || !p || !controls || points.current.personKey) return;
    const target = new THREE.Vector3(p[0], p[1], p[2]);
    flight.current = { target, position: target.clone().add(_offset.subVectors(camera.position, controls.target)) };
  }, [squadKey, controls, camera]);

  // User takes over -> stop the flight.
  useEffect(() => {
    if (!controls) return;
    const cancel = () => {
      flight.current = null;
    };
    const onKey = (e: KeyboardEvent) => MOVE_KEYS.has(e.code) && cancel();
    controls.addEventListener('start', cancel);
    window.addEventListener('keydown', onKey);
    return () => {
      controls.removeEventListener('start', cancel);
      window.removeEventListener('keydown', onKey);
    };
  }, [controls]);

  const applyViewOffset = (px: number) => {
    if (px < 0.5) camera.clearViewOffset();
    else camera.setViewOffset(size.width, size.height, px, 0, size.width, size.height);
  };

  // Canvas resize: re-apply with the new full size (R3F only updates aspect).
  useEffect(() => {
    applyViewOffset(viewOffset.current);
    return () => camera.clearViewOffset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width, size.height, camera]);

  useFrame((_, rawDt) => {
    const k = 1 - Math.exp(-SPEED * Math.min(rawDt, 0.1));

    // Shift framing by half the covered width (skip if the drawer covers almost everything).
    const wanted = coveredRightPx > 0 && size.width - coveredRightPx > 240 ? coveredRightPx / 2 : 0;
    if (viewOffset.current !== wanted) {
      const next = viewOffset.current + (wanted - viewOffset.current) * k;
      viewOffset.current = Math.abs(wanted - next) < 0.5 ? wanted : next;
      applyViewOffset(viewOffset.current);
    }

    const f = flight.current;
    if (!f || !controls) return;
    camera.position.lerp(f.position, k);
    controls.target.lerp(f.target, k);
    if (camera.position.distanceToSquared(f.position) < 1e-4 && controls.target.distanceToSquared(f.target) < 1e-4) {
      camera.position.copy(f.position);
      controls.target.copy(f.target);
      flight.current = null;
    }
  });

  return null;
};
