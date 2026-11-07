import { useCallback, useState } from 'react';

export type SoundEffectType = 'click' | 'resolve' | 'alert';

// Minimal typing for the legacy Safari-prefixed AudioContext constructor.
interface WebkitWindow {
  webkitAudioContext?: typeof AudioContext;
}

// Lightweight synthesized Web Audio effects (no asset files required).
const playSoundEffect = (type: SoundEffectType) => {
  try {
    const AudioCtx =
      window.AudioContext || (window as unknown as WebkitWindow).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'resolve') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'alert') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.setValueAtTime(280, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch {
    // AudioContext blocked or not supported
  }
};

/**
 * Manages UI sound effects and an enabled/disabled toggle.
 * `triggerSound` is a no-op while sound is disabled.
 */
export function useSoundEffects(initialEnabled = true) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(initialEnabled);

  const triggerSound = useCallback(
    (type: SoundEffectType) => {
      if (soundEnabled) playSoundEffect(type);
    },
    [soundEnabled]
  );

  const toggleSound = useCallback(() => setSoundEnabled((prev) => !prev), []);

  return { soundEnabled, setSoundEnabled, toggleSound, triggerSound };
}
