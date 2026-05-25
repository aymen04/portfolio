import { useState, useRef } from 'react';
import {
  VscFolder,        // Finder
  VscTerminalBash,  // Terminal
  VscCode,        // VS Code
} from 'react-icons/vsc';
import { TbCompass } from 'react-icons/tb';
import './Dock.css';

const APPS = [
  {
    id: 'finder',
    label: 'Finder',
    bg: 'linear-gradient(145deg,#4a9eff,#2563eb)',
    Icon: VscFolder,
    iconColor: '#fff',
    iconSize: '52%',
  },
  {
    id: 'terminal',
    label: 'Terminal',
    bg: 'linear-gradient(160deg,#1c1c1e,#2a2a2e)',
    border: '0.5px solid #3a3a3e',
    Icon: VscTerminalBash,
    iconColor: '#30d158',
    iconSize: '52%',
  },
  {
    id: 'vscode',
    label: 'VS Code',
    bg: 'linear-gradient(145deg,#0ea5e9,#1d4ed8)',
    Icon: VscCode,
    iconColor: '#fff',
    iconSize: '58%',
  },
  {
    id: 'safari',
    label: 'Safari',
    bg: 'linear-gradient(145deg,#ffffff,#e8f4fd)',
    Icon: TbCompass,
    iconColor: '#0ea5e9',
    iconSize: '62%',
  },
];

const BASE   = 52;
const MAG    = 78;
const RADIUS = 100;

export default function Dock({ windows, openApp }) {
  const [mouseX, setMouseX]     = useState(null);
  const dockRef                 = useRef(null);

  const getSize = (idx) => {
    if (mouseX === null) return BASE;
    const rect = dockRef.current?.getBoundingClientRect();
    if (!rect) return BASE;
    const center = rect.left + idx * (BASE + 12) + BASE / 2 + 12;
    const dist   = Math.abs(mouseX - center);
    if (dist > RADIUS) return BASE;
    return BASE + (MAG - BASE) * (1 - dist / RADIUS);
  };

  return (
    <div className="dock-wrap">
      <div
        className="dock"
        ref={dockRef}
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
      >
        {APPS.map((app, idx) => {
          const size   = getSize(idx);
          const isOpen = windows[app.id]?.open;
          const { Icon } = app;

          return (
            <div key={app.id} className="dock__item" onClick={() => openApp(app.id)}>
              <div
                className="dock__icon"
                style={{
                  width: size,
                  height: size,
                  background: app.bg,
                  border: app.border || 'none',
                }}
              >
                <Icon
                  style={{
                    width:  app.iconSize,
                    height: app.iconSize,
                    color:  app.iconColor,
                    flexShrink: 0,
                  }}
                />
              </div>
              <div className={`dock__dot ${isOpen ? 'dock__dot--on' : ''}`} />
              <div className="dock__label">{app.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
