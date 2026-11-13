import React, { useEffect, useRef, useState } from 'react';

// =============================================================================
// Animated expand/collapse for accordion content.
// - Height animates via CSS grid rows (0fr <-> 1fr): no JS height measuring.
// - Content mounts only when opening and unmounts after the close animation,
//   so collapsed sections cost nothing (no hidden DOM kept around).
// - prefers-reduced-motion: no height slide, opacity fade only (no movement).
//   Note: Windows "Show animations" = off also turns this on in Chrome.
// =============================================================================

const DURATION_MS = 200;

interface CollapseProps {
  open: boolean;
  id?: string;
  children: React.ReactNode;
}

export const Collapse: React.FC<CollapseProps> = ({ open, id, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(open);
  // Reduced motion: keep full height and only fade, so the fade-out stays visible.
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // Mount immediately when opening (render-phase update; React re-renders before commit).
  if (open && !mounted) setMounted(true);

  useEffect(() => {
    if (open) {
      if (shown) return;
      // Force the collapsed (0fr) state to be laid out first, then expand next frame,
      // otherwise the browser skips straight to 1fr without transitioning.
      void ref.current?.offsetHeight;
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    const raf = requestAnimationFrame(() => setShown(false));
    const timer = window.setTimeout(() => setMounted(false), DURATION_MS + 50);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
    // `shown` is intentionally not a dependency: only `open` drives the sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      ref={ref}
      id={id}
      inert={!open}
      style={{ gridTemplateRows: shown || reduced ? '1fr' : '0fr', transitionDuration: `${DURATION_MS}ms` }}
      className={`grid ease-out ${reduced ? 'transition-opacity' : 'transition-[grid-template-rows,opacity]'} ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
};
