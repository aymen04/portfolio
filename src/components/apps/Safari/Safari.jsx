import { useState } from 'react';
import { SiGithub } from 'react-icons/si';
import { HiLink } from 'react-icons/hi';
import { HiMail, HiDocumentDownload } from 'react-icons/hi';
import { TbCompass } from 'react-icons/tb';
import { ME, PROJECTS } from '../../../data/portfolio';
import './Safari.css';

const PAGES = [
  { id: 'contact',  url: `${ME.website}/contact`,  label: 'Contact'  },
  { id: 'projects', url: `${ME.website}/projects`,  label: 'Projects' },
];

const LINKS = [
  { icon: HiMail,            label: 'Email',    val: ME.email,   href: `mailto:${ME.email}`, bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.25)', color: '#60a5fa' },
  { icon: SiGithub,          label: 'GitHub',   val: 'aymen',    href: ME.github,            bg: 'rgba(255,255,255,0.05)',border: 'rgba(255,255,255,0.12)',color: '#e2e8f0' },
  { icon: HiLink,            label: 'LinkedIn', val: 'in/aymen', href: ME.linkedin,          bg: 'rgba(14,102,194,0.1)',  border: 'rgba(14,102,194,0.3)', color: '#60a5fa' },
  { icon: HiDocumentDownload,label: 'CV PDF',   val: 'Télécharger', href: '#',              bg: 'rgba(48,209,88,0.08)', border: 'rgba(48,209,88,0.22)', color: '#34d399' },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleSubmit = () => { if (form.name && form.email && form.message) setSent(true); };

  if (sent) return (
    <div className="safari-sent">
      <HiMail size={40} color="#60a5fa" />
      <div className="sent-title">Message envoyé !</div>
      <div className="sent-sub">Je vous répondrai dans les 24h.</div>
    </div>
  );

  return (
    <div className="safari-contact">
      <div className="contact-header">
        <div className="contact-avatar">{ME.avatar}</div>
        <div>
          <div className="contact-name">{ME.name} {ME.lastName}</div>
          <div className="contact-role">{ME.titleAlt}</div>
        </div>
      </div>
      <div className="contact-links">
        {LINKS.map(l => {
          const Icon = l.icon;
          return (
            <a key={l.label} href={l.href} className="cl-link" style={{ background: l.bg, border: `0.5px solid ${l.border}` }}>
              <div className="cl-icon-wrap" style={{ background: l.bg }}>
                <Icon size={18} color={l.color} />
              </div>
              <div>
                <div className="cl-label">{l.label}</div>
                <div className="cl-val">{l.val}</div>
              </div>
            </a>
          );
        })}
      </div>
      <div className="contact-form">
        <div className="form-title">Envoyer un message</div>
        <input className="form-input" placeholder="Votre nom"   value={form.name}    onChange={e => setForm(f=>({...f,name:e.target.value}))} />
        <input className="form-input" placeholder="Votre email" type="email" value={form.email}   onChange={e => setForm(f=>({...f,email:e.target.value}))} />
        <textarea className="form-input form-textarea" placeholder="Votre message..." value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} />
        <button className="form-btn" onClick={handleSubmit}>Envoyer →</button>
      </div>
    </div>
  );
}

function ProjectsPage() {
  return (
    <div className="safari-projects">
     
      {PROJECTS.filter(p => p.featured).map(p => (
        <a key={p.id} href={p.url} className="sp-card" target="_blank" rel="noreferrer">
          <div className="sp-card-header">
            <span className="sp-name">{p.name}</span>
           
          </div>
          <div className="sp-tagline">{p.tagline}</div>
          <div className="sp-stack">{p.stack.map(s => <span key={s} className="sp-tag">{s}</span>)}</div>
          <div className="sp-arrow">↗</div>
        </a>
      ))}
    </div>
  );
}

export default function Safari() {
  const [page, setPage]     = useState('contact');
  const [urlInput]          = useState(PAGES[0].url);

  return (
    <div className="safari">
      <div className="safari__bar">
        <div className="safari-navbtns">
          <button className="safari-navbtn">←</button>
          <button className="safari-navbtn">→</button>
          <button className="safari-navbtn">↻</button>
        </div>
        <div className="safari-url-wrap">
          <span className="safari-lock">🔒</span>
          <input className="safari-url" value={PAGES.find(p=>p.id===page)?.url ?? urlInput} readOnly />
        </div>
        <div className="safari-tabs-row">
          {PAGES.map(p => (
            <button key={p.id} className={`safari-tab-btn ${page===p.id?'safari-tab-btn--active':''}`} onClick={()=>setPage(p.id)}>
              {p.id === 'contact' ? <HiMail size={11} style={{marginRight:4,verticalAlign:'middle'}}/> : <TbCompass size={11} style={{marginRight:4,verticalAlign:'middle'}}/>}
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="safari__content">
        {page === 'contact'  && <ContactPage />}
        {page === 'projects' && <ProjectsPage />}
      </div>
    </div>
  );
}
