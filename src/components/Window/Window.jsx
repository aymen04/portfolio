import { useRef, useEffect, useCallback } from 'react';
import {
  VscFolder,
  VscTerminalBash,
  VscCode,
} from 'react-icons/vsc';
import { TbCompass } from 'react-icons/tb';
import './Window.css';

const APP_META = {
  finder:   { title: 'Finder — Portfolio', Icon: VscFolder,          iconColor: '#4a9eff' },
  terminal: { title: 'Terminal',           Icon: VscTerminalBash,    iconColor: '#30d158' },
  vscode:   { title: 'VS Code — projects', Icon: VscCode,  iconColor: '#4a9eff' },
  safari:   { title: 'Safari',             Icon: TbCompass,           iconColor: '#0ea5e9' },
};

export default function Window({ id, win, onClose, onMinimize, onFocus, onMove, children }) {
  const ref       = useRef(null);
  const dragging  = useRef(false);
  const offset    = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('.traffic-lights')) return;
    onFocus(id);
    dragging.current = true;
    const rect = ref.current.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    e.preventDefault();
  }, [id, onFocus]);

  useEffect(() => {
    const onMove_ = (e) => {
      if (!dragging.current) return;
      const parent = ref.current.parentElement.getBoundingClientRect();
      let x = e.clientX - offset.current.x - parent.left;
      let y = e.clientY - offset.current.y - parent.top;
      x = Math.max(0, Math.min(parent.width  - 120, x));
      y = Math.max(28, Math.min(parent.height - 80, y));
      onMove(id, x, y);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove_);
    window.addEventListener('mouseup',   onUp);
    return () => {
      window.removeEventListener('mousemove', onMove_);
      window.removeEventListener('mouseup',   onUp);
    };
  }, [id, onMove]);

  const visible = win.open && !win.minimized;
  const meta    = APP_META[id] ?? { title: id, Icon: VscFolder, iconColor: '#fff' };
  const { Icon } = meta;

  return (
    <div
      ref={ref}
      className={`window ${visible ? 'window--visible' : 'window--hidden'} ${win.minimized ? 'window--minimized' : ''}`}
      style={{ left: win.pos.x, top: win.pos.y, width: win.pos.w, height: win.pos.h, zIndex: win.z }}
      onMouseDown={() => onFocus(id)}
    >
      <div className="window__titlebar" onMouseDown={handleMouseDown}>
        <div className="traffic-lights">
          <button className="tl tl--close"  onClick={() => onClose(id)}    aria-label="Close" />
          <button className="tl tl--min"    onClick={() => onMinimize(id)} aria-label="Minimize" />
          <button className="tl tl--max"    aria-label="Maximize" />
        </div>
        <span className="window__title">
          <Icon style={{ width: 13, height: 13, color: meta.iconColor, marginRight: 5, verticalAlign: 'middle' }} />
          {meta.title}
        </span>
        <div style={{ width: 52 }} />
      </div>
      <div className="window__body">
        {children}
      </div>
    </div>
  );
}
