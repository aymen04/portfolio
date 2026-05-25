import { useState } from 'react';
import { VscAccount, VscBriefcase, VscMortarBoard, VscActivateBreakpoints } from 'react-icons/vsc';
import { ME, SKILLS, EXPERIENCE, EDUCATION } from '../../../data/portfolio';
import './Finder.css';

const TABS = [
  { id: 'about',  icon: VscAccount,     label: 'À propos'    },
  { id: 'exp',    icon: VscBriefcase,   label: 'Expériences' },
  { id: 'edu',    icon: VscMortarBoard, label: 'Formation'   },
  { id: 'skills', icon: VscActivateBreakpoints, label: 'Compétences' },
];

function AboutPanel() {
  return (
    <div className="finder-panel">
      <div className="about-hero">
        <div className="about-avatar">{ME.avatar}</div>
        <div>
          <h1 className="about-name">{ME.name} {ME.lastName}</h1>
          <div className="about-title">{ME.title}</div>
          <div className="about-loc"> {ME.location}</div>
          {ME.status === 'open' && (
            <div className="about-badge"><span className="badge-dot" />Disponible</div>
          )}
        </div>
      </div>
      <p className="about-bio">{ME.bio}</p>
      <div className="about-tags">
        {SKILLS.flatMap(s => s.items.slice(0,2)).map(s => (
          <span key={s.name} className="tag">{s.name}</span>
        ))}
      </div>
    </div>
  );
}

function ExpPanel() {
  const [open, setOpen] = useState('job1');
  return (
    <div className="finder-panel">
      <div className="section-title">Expériences professionnelles</div>
      {EXPERIENCE.map(e => (
        <div key={e.id} className={`exp-block ${open===e.id?'exp-block--open':''}`}>
          <div className="exp-header" onClick={()=>setOpen(open===e.id?null:e.id)}>
            <div className="exp-left">
              <div className="exp-company">{e.current&&<span className="live-dot"/>}{e.company}</div>
              <div className="exp-role">{e.role}</div>
            </div>
            <div className="exp-right">
              <div className="exp-date">{e.date}</div>
              <div className="exp-loc">{e.location}</div>
            </div>
            <span className="exp-chevron">{open===e.id?'▾':'▸'}</span>
          </div>
          {open===e.id && (
            <div className="exp-body">
              {Array.isArray(e.desc)
  ? e.desc.map((line, i) => <p key={i} className="exp-desc">{line}</p>)
  : <p className="exp-desc">{e.desc}</p>
}
              <div className="exp-tags">{e.tags.map(t=><span key={t} className="tag">{t}</span>)}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function EduPanel() {
  return (
    <div className="finder-panel">
      <div className="section-title">Formation & certifications</div>
      {EDUCATION.map((e,i)=>(
        <div key={i} className="edu-row">
          <div className="edu-icon">{e.icon}</div>
          <div className="edu-info">
            <div className="edu-title">{e.title}</div>
            <div className="edu-school">{e.school}</div>
          </div>
          <div className="edu-year">{e.year}</div>
        </div>
      ))}
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="finder-panel">
      <div className="section-title">Compétences techniques</div>
      <div className="skills-grid">
        {SKILLS.map(cat=>(
          <div key={cat.cat} className="skill-cat">
            <div className="skill-cat-title" style={{color:cat.color}}>{cat.cat}</div>
            {cat.items.map(s=>(
              <div key={s.name} className="skill-row">
                <div className="skill-meta">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-pct">{s.level}%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-bar" style={{'--w':`${s.level}%`,'--c':cat.color}} />
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
  const [tab, setTab] = useState('about');
  const Panel = PANELS[tab];

  return (
    <div className="finder">
      <div className="finder__sidebar">
        <div className="sidebar-section">Favoris</div>
        {TABS.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} className={`sidebar-item ${tab===t.id?'sidebar-item--active':''}`} onClick={()=>setTab(t.id)}>
              <Icon size={13} style={{flexShrink:0}} />
              <span>{t.label}</span>
            </button>
          );
        })}
        <div className="sidebar-section" style={{marginTop:20}}>Infos</div>
        <div className="sidebar-meta">
          <div className="meta-row"><span>Nom</span><span>{ME.name} {ME.lastName}</span></div>
          <div className="meta-row"><span>Stack</span><span>React · Node</span></div>
          <div className="meta-row"><span>Dispo</span><span className="meta-green">● Open</span></div>
        </div>
      </div>
      <div className="finder__content"><Panel /></div>
    </div>
  );
}
