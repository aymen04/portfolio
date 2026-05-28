import { useState, useEffect } from 'react';
import { HiLockClosed } from 'react-icons/hi';
import { SiUnitedkingdom, SiFrance } from 'react-icons/si';
import { ME } from '../../data/portfolio';
import { useLang } from '../../context/LangContext';
import './LockScreen.css';
import { MdLanguage } from 'react-icons/md';

const LANGUAGES = [
  { code: 'en', label: 'English',  flag: 'EN', sub: 'Continue in English'   },
  { code: 'fr', label: 'Français', flag: 'FR', sub: 'Continuer en français' },
];

export default function LockScreen() {
  const { setLang } = useLang();
  const [time,      setTime]      = useState('');
  const [date,      setDate]      = useState('');
  const [phase,     setPhase]     = useState('locked');
  const [chosen,    setChosen]    = useState(null);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  const handleUnlock = () => {
    if (phase === 'locked') setPhase('choosing');
  };

  const handleChoose = (code) => {
    setChosen(code);
    setUnlocking(true);
    setTimeout(() => setLang(code), 800);
  };

  return (
    <div
      className={`lockscreen ${unlocking ? 'lockscreen--unlocking' : ''}`}
      onClick={phase === 'locked' ? handleUnlock : undefined}
    >
      <div className="lock-wallpaper" />
      <div className="lock-overlay" />

      <div className={`lock-clock ${phase !== 'locked' ? 'lock-clock--up' : ''}`}>
        <div className="lock-time">{time}</div>
        <div className="lock-date">{date}</div>
      </div>

      {phase === 'locked' && (
        <div className="lock-hint">
          <div className="lock-icon">
            <HiLockClosed size={28} color="rgba(255,255,255,0.85)" />
          </div>
          <div className="lock-slide-text">Click to unlock</div>
          <div className="lock-dots">
            <span /><span /><span />
          </div>
        </div>
      )}

      {phase === 'choosing' && (
        <div className={`lock-lang-picker ${unlocking ? 'lock-lang-picker--out' : 'lock-lang-picker--in'}`}>
          <div className="lock-avatar">
            {ME.photo
              ? <img src={ME.photo} alt={ME.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              : ME.avatar
            }
          </div>
          <div className="lock-username">{ME.name} {ME.lastName}</div>
          <div className="lock-choose-label">Choose your language</div>

          <div className="lock-lang-cards">
            {LANGUAGES.map(l => {
              const Icon = l.Icon;
              return (
                <button
                  key={l.code}
                  className={`lang-card ${chosen === l.code ? 'lang-card--chosen' : ''}`}
                  onClick={() => handleChoose(l.code)}
                >
<div className="lang-flag-text">{l.flag}</div>                  <span className="lang-name">{l.label}</span>
                  <span className="lang-sub">{l.sub}</span>
                  {chosen === l.code && <span className="lang-check">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}