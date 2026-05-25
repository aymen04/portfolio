import { useState, useEffect } from 'react';
import { SiApple } from 'react-icons/si';
import './MenuBar.css';

const APP_MENUS = {
  finder:   ['Finder',   'Fichier', 'Édition', 'Présentation', 'Aller',       'Fenêtre'],
  terminal: ['Terminal', 'Fichier', 'Édition', 'Affichage',    'Shell',       'Fenêtre'],
  vscode:   ['Code',     'Fichier', 'Édition', 'Sélection',    'Afficher',    'Terminal'],
  safari:   ['Safari',   'Fichier', 'Édition', 'Présentation', 'Historique',  'Signets'],
  default:  ['Finder',   'Fichier', 'Édition'],
};

export default function MenuBar({ activeApp }) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  const menus = APP_MENUS[activeApp] ?? APP_MENUS.default;

  return (
    <div className="menubar">
      <div className="menubar__left">
        <span className="menubar__apple">
          <SiApple size={14} />
        </span>
        {menus.map((m, i) => (
          <span key={m} className={`menubar__item ${i === 0 ? 'menubar__item--bold' : ''}`}>
            {m}
          </span>
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
