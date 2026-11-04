import React, { useEffect, useState } from 'react';
import { addEffect, addAfterEffect, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// =============================================================================
// DEV-ONLY PERFORMANCE MONITOR
// Replacement for r3f-perf (v7 targets R3F v8 / React 18 and never updates on
// R3F v9 + React 19). Split in two halves so the panel is plain react-dom:
//   - <PerfProbe />  lives inside <Canvas>, samples renderer stats per frame.
//   - <PerfPanel />  lives outside <Canvas>, displays them at 2 Hz.
// The probe never triggers React renders; it only mutates a shared object.
// =============================================================================

interface PerfSnapshot {
  fps: number;
  cpuMs: number; // JS time per frame: useFrame callbacks + render submission
  gpuMs: number | null; // null when the timer-query extension is unavailable
  calls: number;
  triangles: number;
  geometries: number;
  textures: number;
  programs: number;
  meshes: number;
  lastFrameAt: number;
}

const stats: PerfSnapshot = {
  fps: 0,
  cpuMs: 0,
  gpuMs: null,
  calls: 0,
  triangles: 0,
  geometries: 0,
  textures: 0,
  programs: 0,
  meshes: 0,
  lastFrameAt: 0,
};

const SAMPLE_WINDOW_MS = 500;

export const PerfProbe: React.FC = () => {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const ctx = gl.getContext();
    const gl2 = typeof WebGL2RenderingContext !== 'undefined' && ctx instanceof WebGL2RenderingContext ? ctx : null;
    // GPU timing via disjoint timer queries (Chrome/Edge desktop; often absent elsewhere).
    const timerExt = gl2?.getExtension('EXT_disjoint_timer_query_webgl2') ?? null;
    const pendingQueries: WebGLQuery[] = [];
    let activeQuery: WebGLQuery | null = null;

    let frameStart = 0;
    let frames = 0;
    let cpuAccum = 0;
    let gpuAccum = 0;
    let gpuSamples = 0;
    let windowStart = performance.now();
    let lastMeshCount = 0;

    const countMeshes = () => {
      let n = 0;
      scene.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) n++;
      });
      lastMeshCount = n;
    };
    countMeshes();

    const unsubBefore = addEffect(() => {
      frameStart = performance.now();
      // Frameloop was stopped (eco mode / tab blur). Start a fresh window so the
      // idle gap isn't averaged into the first FPS sample after waking up.
      if (stats.lastFrameAt && frameStart - stats.lastFrameAt > 250) {
        frames = 0;
        cpuAccum = 0;
        gpuAccum = 0;
        gpuSamples = 0;
        windowStart = frameStart;
      }
      if (gl2 && timerExt && !activeQuery) {
        activeQuery = gl2.createQuery();
        if (activeQuery) gl2.beginQuery(timerExt.TIME_ELAPSED_EXT, activeQuery);
      }
    });

    const unsubAfter = addAfterEffect(() => {
      const now = performance.now();
      cpuAccum += now - frameStart;
      frames++;
      stats.lastFrameAt = now;

      if (gl2 && timerExt) {
        if (activeQuery) {
          gl2.endQuery(timerExt.TIME_ELAPSED_EXT);
          pendingQueries.push(activeQuery);
          activeQuery = null;
        }
        // A disjoint event (GPU reset, power state change) invalidates every
        // in-flight query, so drop them all instead of reading bogus timings.
        if (gl2.getParameter(timerExt.GPU_DISJOINT_EXT)) {
          pendingQueries.forEach((q) => gl2.deleteQuery(q));
          pendingQueries.length = 0;
        }
        // Results arrive a few frames later; drain whatever is ready.
        while (pendingQueries.length) {
          const q = pendingQueries[0];
          if (!gl2.getQueryParameter(q, gl2.QUERY_RESULT_AVAILABLE)) break;
          gpuAccum += gl2.getQueryParameter(q, gl2.QUERY_RESULT) / 1e6; // ns -> ms
          gpuSamples++;
          gl2.deleteQuery(q);
          pendingQueries.shift();
        }
        // Never let the queue grow unbounded if results stop arriving.
        while (pendingQueries.length > 8) {
          gl2.deleteQuery(pendingQueries.shift()!);
        }
      }

      // Renderer counters reflect the frame just rendered (incl. shadow pass).
      const info = gl.info;
      stats.calls = info.render.calls;
      stats.triangles = info.render.triangles;
      stats.geometries = info.memory.geometries;
      stats.textures = info.memory.textures;
      stats.programs = info.programs?.length ?? 0;

      const elapsed = now - windowStart;
      if (elapsed >= SAMPLE_WINDOW_MS) {
        stats.fps = (frames * 1000) / elapsed;
        stats.cpuMs = cpuAccum / frames;
        stats.gpuMs = timerExt ? (gpuSamples ? gpuAccum / gpuSamples : stats.gpuMs) : null;
        countMeshes(); // scene traversal only at 2 Hz
        stats.meshes = lastMeshCount;
        frames = 0;
        cpuAccum = 0;
        gpuAccum = 0;
        gpuSamples = 0;
        windowStart = now;
      }
    });

    return () => {
      unsubBefore();
      unsubAfter();
      if (gl2 && timerExt) {
        if (activeQuery) {
          gl2.endQuery(timerExt.TIME_ELAPSED_EXT);
          gl2.deleteQuery(activeQuery);
        }
        pendingQueries.forEach((q) => gl2.deleteQuery(q));
      }
    };
  }, [gl, scene]);

  return null;
};

const fmt = (n: number) => n.toLocaleString('en-US');

export const PerfPanel: React.FC = () => {
  const [snap, setSnap] = useState<PerfSnapshot>({ ...stats });
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSnap({ ...stats });
      // No frames for >1s means frameloop is stopped (eco mode / tab blurred).
      setPaused(performance.now() - stats.lastFrameAt > 1000);
    }, SAMPLE_WINDOW_MS);
    return () => window.clearInterval(id);
  }, []);

  const fpsColor = snap.fps >= 55 ? 'text-emerald-400' : snap.fps >= 30 ? 'text-amber-400' : 'text-red-400';

  const rows: Array<[string, string]> = [
    ['CPU', `${snap.cpuMs.toFixed(2)} ms`],
    ['GPU', snap.gpuMs === null ? 'n/a' : `${snap.gpuMs.toFixed(2)} ms`],
    ['Draw calls', fmt(snap.calls)],
    ['Triangles', fmt(snap.triangles)],
    ['Meshes', fmt(snap.meshes)],
    ['Geometries', fmt(snap.geometries)],
    ['Textures', fmt(snap.textures)],
    ['Shaders', fmt(snap.programs)],
  ];

  return (
    <div
      role="status"
      aria-label="3D performance monitor"
      className="absolute bottom-3 right-3 z-50 w-44 rounded-lg border border-slate-700 bg-black/80 p-2 font-mono text-[11px] text-slate-200 shadow-xl pointer-events-none select-none"
    >
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-slate-400">FPS</span>
        <span className={`text-base font-bold ${paused ? 'text-slate-500' : fpsColor}`}>
          {paused ? 'PAUSED' : snap.fps.toFixed(0)}
        </span>
      </div>
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between">
          <span className="text-slate-400">{label}</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};
