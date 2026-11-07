import { useCallback, useEffect, useRef, useState } from 'react';

const AFK_TIMEOUT_MS = 30000;

const ACTIVITY_EVENTS = ['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart'] as const;

/**
 * Eco / battery-saver mode.
 *
 * Puts the app to "sleep" after {@link AFK_TIMEOUT_MS} of inactivity, or
 * immediately when the tab is hidden or the window loses focus. Consumers use
 * `isAsleep` to pause expensive work (e.g. the 3D canvas frameloop).
 */
export function useEcoMode() {
  const [isAsleep, setIsAsleep] = useState<boolean>(false);
  const afkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAsleepRef = useRef<boolean>(false);

  // Keep a ref in sync so the listener effect can read the latest value
  // without needing isAsleep in its dependency array (which would otherwise
  // tear down and re-add every window listener on each sleep/wake).
  useEffect(() => {
    isAsleepRef.current = isAsleep;
  }, [isAsleep]);

  const resetAfkTimer = useCallback(() => {
    if (afkTimerRef.current) {
      clearTimeout(afkTimerRef.current);
    }
    afkTimerRef.current = setTimeout(() => {
      setIsAsleep(true);
    }, AFK_TIMEOUT_MS);
  }, []);

  const sleep = useCallback(() => {
    setIsAsleep(true);
    if (afkTimerRef.current) clearTimeout(afkTimerRef.current);
  }, []);

  const wakeUp = useCallback(() => {
    setIsAsleep(false);
    resetAfkTimer();
  }, [resetAfkTimer]);

  useEffect(() => {
    resetAfkTimer();

    const onUserActivity = () => {
      if (!isAsleepRef.current) {
        resetAfkTimer();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsAsleep(true);
        if (afkTimerRef.current) clearTimeout(afkTimerRef.current);
      }
    };

    const handleWindowBlur = () => {
      setIsAsleep(true);
      if (afkTimerRef.current) clearTimeout(afkTimerRef.current);
    };

    const handleWindowFocus = () => {
      resetAfkTimer();
    };

    ACTIVITY_EVENTS.forEach((evt) =>
      window.addEventListener(evt, onUserActivity, { passive: true })
    );
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      ACTIVITY_EVENTS.forEach((evt) => window.removeEventListener(evt, onUserActivity));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      if (afkTimerRef.current) clearTimeout(afkTimerRef.current);
    };
  }, [resetAfkTimer]);

  return { isAsleep, sleep, wakeUp };
}
