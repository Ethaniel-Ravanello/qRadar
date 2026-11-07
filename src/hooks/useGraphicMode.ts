import { useCallback, useState } from 'react';
import type { GraphicMode } from '../types';

const STORAGE_KEY = 'qradar_graphic_mode';

/**
 * Graphic quality preference (performance vs quality), persisted to
 * localStorage so the choice survives reloads.
 */
export function useGraphicMode(defaultMode: GraphicMode = 'quality') {
  const [graphicMode, setGraphicModeState] = useState<GraphicMode>(() => {
    return (localStorage.getItem(STORAGE_KEY) as GraphicMode) || defaultMode;
  });

  const setGraphicMode = useCallback((mode: GraphicMode) => {
    setGraphicModeState(mode);
    localStorage.setItem(STORAGE_KEY, mode);
  }, []);

  return [graphicMode, setGraphicMode] as const;
}
