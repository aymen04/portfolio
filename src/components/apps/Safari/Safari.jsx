import { useState } from 'react';
import { SiGithub } from 'react-icons/si';
import { HiLink, HiMail, HiDocumentDownload } from 'react-icons/hi';
import { TbCompass } from 'react-icons/tb';
import { ME, PROJECTS } from '../../../data/portfolio';
import { useLang } from '../../../context/LangContext';
import './Safari.css';

function ContactPage() {
const { t, lang } = useLang();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  

  const LINKS = [
    { icon: HiMail,             label: 'Email',    val: ME.email,   href: `mailto:${ME.email}`, bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.25)', color: '#60a5fa' },
    { icon: SiGithub,           label: 'GitHub',   val: 'aymen',    href: ME.github,            bg: 'rgba(255,255,255,0.05)',border: 'rgba(255,255,255,0.12)',color: '#e2e8f0' },
    { icon: HiLink,             label: 'LinkedIn', val: 'in/aymen', href: ME.linkedin,          bg: 'rgba(14,102,194,0.1)',  border: 'rgba(14,102,194,0.3)', color: '#60a5fa' },
    { icon: HiDocumentDownload, label: 'CV PDF', val: t.download, href: lang === 'en' ? ME.cvEn : ME.cv, bg: 'rgba(48,209,88,0.08)', border: 'rgba(48,209,88,0.22)', color: '#34d399', download: true },
  ];

  if (sent) return (
    <div className="safari-sent">
      <HiMail size={40} color="#60a5fa" />
      <div className="sent-title">{t.sentTitle}</div>
      <div className="sent-sub">{t.sentSub}</div>
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
      <div className="contact-sub">{t.contactSub}</div>
      <div className="contact-links">
        {LINKS.map(l => {
          const Icon = l.icon;
          return (
            <a key={l.label} href={l.href} className="cl-link"
              style={{ background: l.bg, border: `0.5px solid ${l.border}` }}
              download={l.download || undefined}
              target={l.download ? undefined : '_blank'}
              rel="noreferrer"
            >
              <div className="cl-icon-wrap"><Icon size={18} color={l.color} /></div>
              <div>
                <div className="cl-label">{l.label}</div>
                <div className="cl-val">{l.val}</div>
              </div>
            </a>
          );
        })}
      </div>
      <div className="contact-form">
        <div className="form-title">{t.sendMsg}</div>
        <input  className="form-input"    placeholder={t.yourName}  value={form.name}    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input  className="form-input"    placeholder={t.yourEmail} type="email" value={form.email}   onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <textarea className="form-input form-textarea" placeholder={t.yourMsg} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
        <button className="form-btn" onClick={() => { if (form.name && form.email && form.message) setSent(true); }}>{t.send}</button>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const { t } = useLang();
  return (
    <div className="safari-projects">
      <div className="sp-title">{t.openSource}</div>
      {PROJECTS.filter(p => p.featured).map(p => (
        <a key={p.id} href={p.url} className="sp-card" target="_blank" rel="noreferrer">
          <div className="sp-card-header">
            <span className="sp-name">{p.name}</span>
            <span className="sp-stars">★ {p.stars}</span>
          </div>
          <div className="sp-tagline">{p.tagline}</div>
          <div className="sp-stack">{p.stack.map(s => <span key={s} className="sp-tag">{s}</span>)}</div>
          <div className="sp-arrow">↗</div>
        </a>
      ))}
    </div>
  );
}

const PAGES = [
  { id: 'contact',  label: (t) => t.contactTitle, Icon: HiMail    },
  { id: 'projects', label: (t) => t.openSource,   Icon: TbCompass },
];

export default function Safari() {
  const { t } = useLang();
  const [page, setPage] = useState('contact');
  const current = PAGES.find(p => p.id === page);

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
          <input className="safari-url" value={`${ME.website}/${page}`} readOnly />
        </div>
        <div className="safari-tabs-row">
          {PAGES.map(p => {
            const Icon = p.Icon;
            return (
              <button key={p.id} className={`safari-tab-btn ${page === p.id ? 'safari-tab-btn--active' : ''}`} onClick={() => setPage(p.id)}>
                <Icon size={11} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                {p.label(t)}
              </button>
            );
          })}
        </div>
      </div>
      <div className="safari__content">
        {page === 'contact'  && <ContactPage />}
        {page === 'projects' && <ProjectsPage />}
      </div>
    </div>
  );
}
