import { useState, useEffect, useRef } from 'react';
import { useLang } from '../../../context/LangContext';
import './Maps.css';

const JOURNEY = [
  {
    id: 'casa',
    city: 'Casablanca',
    country: 'Maroc', countryEn: 'Morocco',
    year: '2002 – 2021',
    role: { fr: 'Origines & Baccalauréat', en: 'Origins & High School' },
    desc: {
      fr: "Né et grandi à Casablanca. Obtention du Baccalauréat STMG Gestion Finance au Lycée Léon l'Africain.",
      en: "Born and raised in Casablanca. Graduated with a Finance & Management Baccalaureate from Lycée Léon l'Africain.",
    },
    color: '#f59e0b', current: false,
  },
  {
    id: 'lyon',
    city: 'Lyon',
    country: 'France', countryEn: 'France',
    year: '2021 – 2024',
    role: { fr: 'Bachelor & Expériences Pro', en: "Bachelor's & Work Experience" },
    desc: {
      fr: "Bachelor Chef de Projet Web à Epitech Digital. Stages chez STEF Europe et ITES COM GROUP. Première expérience en entreprise.",
      en: "Bachelor's in Web Dev at Epitech Digital. Internships at STEF Europe and ITES COM GROUP. First professional experience.",
    },
    color: '#3b82f6',  current: false,
  },
  {
    id: 'montreal',
    city: 'Montréal',
    country: 'Canada', countryEn: 'Canada',
    year: '2024 – Présent',
    role: { fr: 'AEC Marketing & Open to Work', en: 'AEC Marketing & Open to Work' },
    desc: {
      fr: "AEC en Marketing Numérique au Collège Universel. Permis de travail post-diplôme (PTPD). Activement à la recherche d'opportunités.",
      en: "AEC in Digital Marketing at Collège Universel. Post-graduation work permit (PGWP). Actively seeking opportunities.",
    },
    color: '#30d158',  current: true,
  },
];

const MAP_COORDS = {
  casa:     { x: 490, y: 215 },
  lyon:     { x: 513, y: 152 },
  montreal: { x: 192, y: 152 },
};

export default function Maps() {
  const { lang } = useLang();
  const L = lang === 'fr' ? 'fr' : 'en';
  const [active, setActive]       = useState('montreal');
  const [progress, setProgress]   = useState(0);
  const [visible, setVisible]     = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 2000, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  const activeStop = JOURNEY.find(j => j.id === active);

  // Curved path between 3 cities
  const { casa, lyon, montreal } = MAP_COORDS;
  const path1 = `M${casa.x},${casa.y} C${casa.x},${casa.y - 60} ${lyon.x},${lyon.y - 60} ${lyon.x},${lyon.y}`;
  const path2 = `M${lyon.x},${lyon.y} C${lyon.x - 60},${lyon.y - 80} ${montreal.x + 80},${montreal.y - 80} ${montreal.x},${montreal.y}`;
  const fullPath = `M${casa.x},${casa.y} C${casa.x},${casa.y-60} ${lyon.x},${lyon.y-60} ${lyon.x},${lyon.y} C${lyon.x-60},${lyon.y-80} ${montreal.x+80},${montreal.y-80} ${montreal.x},${montreal.y}`;

  return (
    <div className="maps">
      <div className="maps__header">
        <div className="maps__title"> {L === 'fr' ? 'Mon Parcours' : 'My Journey'}</div>
        <div className="maps__subtitle">Casablanca → Lyon → Montréal</div>
      </div>

      <div className="maps__body">
        {/* SVG World Map */}
        <div className="maps__map-wrap">
          <svg viewBox="0 0 800 420" className="maps__svg" preserveAspectRatio="xMidYMid meet">
            {/* Grid */}
            {[...Array(7)].map((_, i) => <line key={`h${i}`} x1="0" y1={i*70} x2="800" y2={i*70} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>)}
            {[...Array(11)].map((_, i) => <line key={`v${i}`} x1={i*80} y1="0" x2={i*80} y2="420" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>)}

            {/* Continents simplified */}
            {/* North America */}
            <path d="M98,88 L172,76 L222,82 L258,94 L278,122 L272,156 L248,176 L210,184 L168,174 L130,152 L106,126 L94,104 Z" fill="rgba(40,80,55,0.65)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
            {/* South America */}
            <path d="M192,194 L244,188 L270,210 L275,250 L260,294 L234,314 L206,308 L184,282 L176,244 L188,212 Z" fill="rgba(40,80,55,0.65)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
            {/* Europe */}
            <path d="M474,136 L514,126 L544,132 L560,122 L574,128 L580,142 L564,154 L548,160 L522,164 L502,158 L480,150 Z" fill="rgba(40,80,55,0.65)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
            {/* Africa */}
            <path d="M482,162 L528,156 L556,164 L566,200 L560,242 L544,272 L520,282 L494,272 L476,242 L470,200 Z" fill="rgba(40,80,55,0.65)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
            {/* Asia */}
            <path d="M566,96 L654,86 L724,96 L744,128 L724,160 L682,176 L632,170 L586,158 L566,136 Z" fill="rgba(40,80,55,0.65)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
            {/* Oceania */}
            <path d="M676,238 L720,232 L740,248 L730,270 L698,276 L672,260 Z" fill="rgba(40,80,55,0.65)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>

            {/* Dashed ghost path */}
            <path d={fullPath} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="5 4"/>

            {/* Animated path */}
            <path
              d={fullPath}
              fill="none"
              stroke="rgba(99,179,237,0.65)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1200"
              strokeDashoffset={1200 - progress * 1200}
            />

            {/* City markers */}
            {JOURNEY.map((stop, i) => {
              const c = MAP_COORDS[stop.id];
              const isActive = active === stop.id;
              const labelRight = stop.id !== 'casa';
              return (
                <g key={stop.id} onClick={() => setActive(stop.id)} style={{ cursor: 'pointer' }}>
                  {stop.current && (
                    <circle cx={c.x} cy={c.y} r="12" fill="none" stroke={stop.color} strokeWidth="1.5" opacity="0.4">
                      <animate attributeName="r" values="8;18;8" dur="2.5s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  <circle cx={c.x} cy={c.y} r={isActive ? 9 : 6} fill={stop.color} fillOpacity="0.2" stroke={stop.color} strokeWidth={isActive ? 2 : 1} style={{transition:'all 0.3s'}}/>
                  <circle cx={c.x} cy={c.y} r={isActive ? 4.5 : 3} fill={stop.color} style={{transition:'all 0.3s'}}/>
                  <text x={c.x + (labelRight ? 13 : -13)} y={c.y - 10} fill="rgba(255,255,255,0.92)" fontSize="11.5" fontWeight={isActive ? '700' : '400'} fontFamily="-apple-system,sans-serif" textAnchor={labelRight ? 'start' : 'end'} style={{transition:'all 0.3s'}}>{stop.city}</text>
                  <text x={c.x + (labelRight ? 13 : -13)} y={c.y + 2} fill="rgba(255,255,255,0.38)" fontSize="9" fontFamily="-apple-system,sans-serif" textAnchor={labelRight ? 'start' : 'end'}>{stop.year.split('–')[0].trim()}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Sidebar timeline + detail */}
        <div className="maps__sidebar">
          <div className="timeline__label">{L === 'fr' ? 'Étapes' : 'Timeline'}</div>

          <div className="timeline">
            {JOURNEY.map((stop, i) => (
              <div key={stop.id} className={`timeline__item ${active === stop.id ? 'timeline__item--active' : ''}`} onClick={() => setActive(stop.id)}>
                <div className="timeline__track">
                  <div className="timeline__dot" style={{ background: stop.color, boxShadow: `0 0 8px ${stop.color}70` }}/>
                  {i < JOURNEY.length - 1 && <div className="timeline__line"/>}
                </div>
                <div className="timeline__content">
                  <div className="timeline__city">
                    <span>{stop.icon} {stop.city}</span>
                    {stop.current && <span className="timeline__now">{L === 'fr' ? 'Actuel' : 'Now'}</span>}
                  </div>
                  <div className="timeline__year">{stop.year}</div>
                  <div className="timeline__role">{stop.role[L]}</div>
                </div>
              </div>
            ))}
          </div>

          {activeStop && (
            <div className="maps__detail" style={{ borderColor: activeStop.color + '50' }}>
              <div className="detail__header" style={{ color: activeStop.color }}>
                {activeStop.icon} {activeStop.city}, {L === 'fr' ? activeStop.country : activeStop.countryEn}
                <span className="detail__year">{activeStop.year}</span>
              </div>
              <div className="detail__role">{activeStop.role[L]}</div>
              <div className="detail__desc">{activeStop.desc[L]}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
