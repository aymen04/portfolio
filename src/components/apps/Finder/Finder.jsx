import { useState } from 'react';
import { VscAccount, VscBriefcase, VscMortarBoard, VscActivateBreakpoints } from 'react-icons/vsc';
import { ME, SKILLS, EXPERIENCE, EDUCATION } from '../../../data/portfolio';
import { useLang } from '../../../context/LangContext';
import './Finder.css';

function AboutPanel() {
  const { t } = useLang();
  return (
    <div className="finder-panel">
      <div className="about-hero">
       <div className="about-avatar">
  {ME.photo
    ? <img src={ME.photo} alt={ME.name} style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%' }} />
    : ME.avatar
  }
</div>
        <div>
          <h1 className="about-name">{ME.name} {ME.lastName}</h1>
          <div className="about-title">{ME.title}</div>
          <div className="about-loc">📍 {ME.location}</div>
          {ME.status === 'open' && (
            <div className="about-badge"><span className="badge-dot" />{t.available}</div>
          )}
        </div>
      </div>
      <p className="about-bio">{t.bio}</p>
      <div className="about-tags">
        {SKILLS.flatMap(s => s.items.slice(0, 2)).map(s => (
          <span key={s.name} className="tag">{s.name}</span>
        ))}
      </div>
    </div>
  );
}

function ExpPanel() {
  const { t } = useLang();
  const [open, setOpen] = useState(EXPERIENCE[0]?.id);
  return (
    <div className="finder-panel">
      <div className="section-title">{t.expTitle}</div>
      {EXPERIENCE.map(e => {
        const desc = t.expData?.[e.id]?.desc ?? e.desc;
        return (
          <div key={e.id} className={`exp-block ${open === e.id ? 'exp-block--open' : ''}`}>
            <div className="exp-header" onClick={() => setOpen(open === e.id ? null : e.id)}>
              <div className="exp-left">
                <div className="exp-company">{e.current && <span className="live-dot"/>}{e.company}</div>
                <div className="exp-role">{e.role}</div>
              </div>
              <div className="exp-right">
                <div className="exp-date">{e.date}</div>
                <div className="exp-loc">{e.location}</div>
              </div>
              <span className="exp-chevron">{open === e.id ? '▾' : '▸'}</span>
            </div>
            {open === e.id && (
              <div className="exp-body">
                {Array.isArray(desc)
                  ? desc.map((line, i) => <p key={i} className="exp-desc">{line}</p>)
                  : <p className="exp-desc">{desc}</p>
                }
                <div className="exp-tags">{e.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function EduPanel() {
  const { t } = useLang();
  return (
    <div className="finder-panel">
      <div className="section-title">{t.eduTitle}</div>
      {EDUCATION.map((e, i) => {
        const translated = t.eduData?.[i] ?? e;
        return (
          <div key={i} className="edu-row">
            <div className="edu-icon">
              {e.icon && e.icon.startsWith('/')
                ? <img src={e.icon} alt={translated.school} />
                : e.icon
              }
            </div>
            <div className="edu-info">
              <div className="edu-title">{translated.title}</div>
              <div className="edu-school">{translated.school}</div>
            </div>
            <div className="edu-year">{e.year}</div>
          </div>
        );
      })}
    </div>
  );
}

function SkillsPanel() {
  const { t } = useLang();
  return (
    <div className="finder-panel">
      <div className="section-title">{t.skillsTitle}</div>
      <div className="skills-grid">
        {SKILLS.map(cat => (
          <div key={cat.cat} className="skill-cat">
<div className="skill-cat-title" style={{ color: cat.color }}>
  {t.skillCats?.[cat.cat] ?? cat.cat}
</div>            {cat.items.map(s => (
              <div key={s.name} className="skill-row">
                <div className="skill-meta">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-pct">{s.level}%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-bar" style={{ '--w': `${s.level}%`, '--c': cat.color }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const PANELS = { about: AboutPanel, exp: ExpPanel, edu: EduPanel, skills: SkillsPanel };

export default function Finder() {
  const { t } = useLang();
  const [tab, setTab] = useState('about');
  const Panel = PANELS[tab];

  const TABS = [
    { id: 'about',  Icon: VscAccount,            label: t.about      },
    { id: 'exp',    Icon: VscBriefcase,           label: t.experience },
    { id: 'edu',    Icon: VscMortarBoard,         label: t.education  },
    { id: 'skills', Icon: VscActivateBreakpoints, label: t.skills     },
  ];

  return (
    <div className="finder">
      <div className="finder__sidebar">
        <div className="sidebar-section">{t.favorites}</div>
        {TABS.map(({ id, Icon, label }) => (
          <button
            key={id}
            className={`sidebar-item ${tab === id ? 'sidebar-item--active' : ''}`}
            onClick={() => setTab(id)}
          >
            <Icon size={13} style={{ flexShrink: 0 }} />
            <span>{label}</span>
          </button>
        ))}
        <div className="sidebar-section" style={{ marginTop: 20 }}>{t.info}</div>
        <div className="sidebar-meta">
          <div className="meta-row"><span>{t.name}</span><span>{ME.name} {ME.lastName}</span></div>
          <div className="meta-row"><span>Stack</span><span>React · Node</span></div>
          <div className="meta-row"><span>{t.status}</span><span className="meta-green">● Open</span></div>
        </div>
      </div>
      <div className="finder__content"><Panel /></div>
    </div>
  );
}