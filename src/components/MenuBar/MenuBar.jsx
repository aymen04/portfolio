import { useState, useEffect } from 'react';
import { SiApple } from 'react-icons/si';
import { useLang } from '../../context/LangContext';
import './MenuBar.css';

const APP_MENUS = (t) => ({
  finder:   ['Finder',    t.file, t.edit, t.view, t.go,      t.window],
  terminal: ['Terminal',  t.file, t.edit, t.view, 'Shell',   t.window],
  vscode:   ['Code',      t.file, t.edit, 'Selection', t.view, 'Terminal'],
  safari:   ['Safari',    t.file, t.edit, t.view, 'History', 'Bookmarks'],
  default:  ['Finder',    t.file, t.edit],
});

export default function MenuBar({ activeApp }) {
  const { t } = useLang();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const menus = (APP_MENUS(t)[activeApp] ?? APP_MENUS(t).default);

  return (
    <div className="menubar">
      <div className="menubar__left">
        <span className="menubar__apple"><SiApple size={14} /></span>
        {menus.map((m, i) => (
          <span key={m} className={`menubar__item ${i === 0 ? 'menubar__item--bold' : ''}`}>{m}</span>
        ))}
      </div>
      <div className="menubar__right">
        <span className="menubar__status">🔋 87%</span>
        <span className="menubar__date">{date}</span>
        <span className="menubar__time">{time}</span>
      </div>
    </div>
  );
}
