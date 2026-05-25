import { useState, useCallback, useRef } from 'react';

const DEFAULT_POSITIONS = {
  finder:   { x: 60,  y: 42,  w: 680, h: 480 },
  terminal: { x: 200, y: 62,  w: 620, h: 420 },
  vscode:   { x: 100, y: 52,  w: 720, h: 520 },
  safari:   { x: 140, y: 52,  w: 580, h: 460 },
};

export function useWindowManager() {
  const [windows, setWindows] = useState({
    finder:   { open: true,  minimized: false, pos: DEFAULT_POSITIONS.finder,   z: 10 },
    terminal: { open: false, minimized: false, pos: DEFAULT_POSITIONS.terminal, z: 9  },
    vscode:   { open: false, minimized: false, pos: DEFAULT_POSITIONS.vscode,   z: 8  },
    safari:   { open: false, minimized: false, pos: DEFAULT_POSITIONS.safari,   z: 7  },
  });
  const [activeApp, setActiveApp] = useState('finder');
  const topZRef = useRef(20);

  const bringToFront = useCallback((id) => {
    topZRef.current += 1;
    const z = topZRef.current;
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], z },
    }));
    setActiveApp(id);
  }, []);

  const openApp = useCallback((id) => {
    topZRef.current += 1;
    const z = topZRef.current;
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], open: true, minimized: false, z },
    }));
    setActiveApp(id);
  }, []);

  const closeApp = useCallback((id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], open: false },
    }));
    setActiveApp(null);
  }, []);

  const minimizeApp = useCallback((id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], minimized: true },
    }));
  }, []);

  const moveWindow = useCallback((id, x, y) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], pos: { ...prev[id].pos, x, y } },
    }));
  }, []);

  return { windows, activeApp, openApp, closeApp, minimizeApp, moveWindow, bringToFront };
}
