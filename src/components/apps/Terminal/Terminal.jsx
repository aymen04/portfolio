import { useState, useRef, useEffect, useCallback } from 'react';
import { ME, SKILLS, EXPERIENCE, EDUCATION, PROJECTS } from '../../../data/portfolio';
import { useLang } from '../../../context/LangContext';
import './Terminal.css';

const txt   = (text, cls = '') => ({ type: 'text', text, cls });
const line  = (segments)       => ({ type: 'line', segments });
const blank = ()               => txt('');

const PROMPT_SEGS = [
  { text: 'aymen',     cls: 'c-green'  },
  { text: '@',         cls: 'c-dim'    },
  { text: 'portfolio', cls: 'c-blue'   },
  { text: ':',         cls: 'c-dim'    },
  { text: '~',         cls: 'c-yellow' },
  { text: ' $ ',       cls: 'c-dim'    },
];

function buildOutput(cmd, t) {
  switch (cmd.trim().toLowerCase()) {
    case 'help':
      return [
        line([{ text: t.termHelp, cls: 'c-yellow c-bold' }]),
        blank(),
        ...t.termCmds.map(([c, d]) => line([
          { text: `  ${c.padEnd(16)}`, cls: 'c-green' },
          { text: d,                   cls: 'c-dim'   },
        ])),
      ];

    case 'whoami':
      return [
        line([{ text: '╔══════════════════════════════════╗', cls: 'c-blue' }]),
        line([{ text: '║  ', cls: 'c-blue' }, { text: `${ME.name} ${ME.lastName}`, cls: 'c-bold' }, { text: '                  ║', cls: 'c-blue' }]),
        line([{ text: '║  ', cls: 'c-blue' }, { text: ME.title,       cls: 'c-green' }, { text: '             ║', cls: 'c-blue' }]),
        line([{ text: '║  ', cls: 'c-blue' }, { text: `📍 ${ME.location}`, cls: 'c-dim' }, { text: '                ║', cls: 'c-blue' }]),
        line([{ text: '╚══════════════════════════════════╝', cls: 'c-blue' }]),
        blank(),
        txt(ME.bio, 'c-dim'),
      ];

    case 'skills':
      return [
        line([{ text: t.termSkills, cls: 'c-yellow c-bold' }]),
        blank(),
        ...SKILLS.flatMap(cat => [
          line([{ text: `  [${cat.cat}]`, cls: 'c-bold' }]),
          ...cat.items.map(s => {
            const bars = Math.round(s.level / 10);
            const bar  = '█'.repeat(bars) + '░'.repeat(10 - bars);
            return line([
              { text: `    ${s.name.padEnd(24)}`, cls: 'c-dim'   },
              { text: bar,                         cls: 'c-blue'  },
              { text: `  ${s.level}%`,             cls: 'c-green' },
            ]);
          }),
          blank(),
        ]),
      ];

    case 'exp':
      return [
        line([{ text: t.termExp, cls: 'c-yellow c-bold' }]),
        blank(),
        ...EXPERIENCE.flatMap(e => [
          line([
            { text: e.company, cls: 'c-bold'  },
            { text: ' — ',     cls: 'c-dim'   },
            { text: e.role,    cls: 'c-green' },
          ]),
          line([{ text: `  ${e.date} · ${e.location}`, cls: 'c-dim' }]),
          txt(`  ${Array.isArray(e.desc) ? e.desc[0] : e.desc}`, 'c-dim'),
          blank(),
        ]),
      ];

    case 'edu':
      return [
        line([{ text: t.termEdu, cls: 'c-yellow c-bold' }]),
        blank(),
        ...EDUCATION.flatMap(e => [
          line([{ text: `🎓  ${e.title}`, cls: 'c-bold' }]),
          line([
            { text: `   ${e.school}`, cls: 'c-blue' },
            { text: ` · ${e.year}`,   cls: 'c-dim'  },
          ]),
          blank(),
        ]),
      ];

    case 'projects':
      return [
        line([{ text: t.termProjects, cls: 'c-yellow c-bold' }]),
        blank(),
        ...PROJECTS.flatMap(p => [
          line([
            { text: p.name,          cls: 'c-bold c-green' },
            { text: ` ★ ${p.stars}`, cls: 'c-yellow'       },
          ]),
          line([{ text: `  ${p.tagline}`,                 cls: 'c-dim'  }]),
          line([{ text: `  Stack: ${p.stack.join(' · ')}`, cls: 'c-blue' }]),
          txt(`  ${p.desc}`, 'c-dim'),
          blank(),
        ]),
      ];

    case 'contact':
      return [
        line([{ text: t.termContact, cls: 'c-yellow c-bold' }]),
        blank(),
        line([{ text: '  Email    ', cls: 'c-dim' }, { text: ME.email,    cls: 'c-blue' }]),
        line([{ text: '  GitHub   ', cls: 'c-dim' }, { text: ME.github,   cls: 'c-blue' }]),
        line([{ text: '  LinkedIn ', cls: 'c-dim' }, { text: ME.linkedin, cls: 'c-blue' }]),
        line([{ text: '  Website  ', cls: 'c-dim' }, { text: ME.website,  cls: 'c-blue' }]),
      ];

    case 'neofetch':
      return [
        line([{ text: '       .:`            ', cls: 'c-blue' }, { text: `${ME.name}@portfolio`,     cls: 'c-bold' }]),
        line([{ text: '    .+sdho.           ', cls: 'c-blue' }, { text: '─────────────────',         cls: 'c-dim'  }]),
        line([{ text: ' .+ydddddddh+.        ', cls: 'c-blue' }, { text: 'OS:     ', cls: 'c-dim' }, { text: 'AymenOS 1.0',            cls: '' }]),
        line([{ text: ':sdddddddddddds:      ', cls: 'c-blue' }, { text: 'Host:   ', cls: 'c-dim' }, { text: 'React 18',               cls: '' }]),
        line([{ text: ':sdddddddddddds:      ', cls: 'c-blue' }, { text: 'Shell:  ', cls: 'c-dim' }, { text: 'zsh 5.9',                cls: '' }]),
        line([{ text: ' .+ydddddddh+.        ', cls: 'c-blue' }, { text: 'DE:     ', cls: 'c-dim' }, { text: 'AymenOS Desktop',        cls: '' }]),
        line([{ text: '    .+sdho.           ', cls: 'c-blue' }, { text: 'Stack:  ', cls: 'c-dim' }, { text: 'React · Node · Postgres', cls: '' }]),
        line([{ text: '       .:`            ', cls: 'c-blue' }, { text: 'Memory: ', cls: 'c-dim' }, { text: '7.4 GiB caffeine',       cls: '' }]),
        blank(),
        line([{ text: '  ██████████', cls: 'c-red' }, { text: '████████', cls: 'c-green' }, { text: '████████', cls: 'c-yellow' }, { text: '██████████', cls: 'c-blue' }]),
      ];

    case 'cv':
      setTimeout(() => window.open('/cv-aymen.pdf', '_blank'), 100);
      return [
        line([{ text: t.termCVOpen,         cls: 'c-green' }]),
        line([{ text: '  → /cv-aymen.pdf',  cls: 'c-dim'   }]),
      ];

    default:
      return [
        line([
          { text: t.termNotFound(cmd).split(cmd)[0], cls: 'c-red' },
          { text: cmd, cls: '' },
          { text: t.termNotFound(cmd).split(cmd)[1], cls: 'c-dim' },
        ]),
      ];
  }
}

export default function Terminal() {
  const { t } = useLang();
  const [history,  setHistory]  = useState([{ type: 'boot' }]);
  const [input,    setInput]    = useState('');
  const [cmdHist,  setCmdHist]  = useState([]);
  const [histIdx,  setHistIdx]  = useState(-1);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    setTimeout(() => {
      setHistory(h => [
        ...h,
        line([{ text: t.termBoot(date), cls: 'c-dim' }]),
        line([
          { text: t.termStart[0], cls: 'c-dim'   },
          { text: t.termStart[1], cls: 'c-green'  },
          { text: t.termStart[2], cls: 'c-dim'    },
        ]),
        blank(),
      ]);
    }, 200);
  // eslint-disable-next-line
  }, []);

  const submit = useCallback(() => {
    const cmd = input.trim();
    if (!cmd) return;
    if (cmd === 'clear') { setHistory([]); setInput(''); return; }
    const output = buildOutput(cmd, t);
    setHistory(h => [...h, { type: 'cmd', cmd }, ...output]);
    setCmdHist(h => [cmd, ...h]);
    setHistIdx(-1);
    setInput('');
  }, [input, t]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') { submit(); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(next);
      setInput(cmdHist[next] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInput(''); }
      else          { setHistIdx(next); setInput(cmdHist[next]); }
    }
  };

  const renderEntry = (entry, idx) => {
    if (entry.type === 'boot') return null;
    if (entry.type === 'text') return (
      <div key={idx} className={`term-line ${entry.cls || ''}`}>{entry.text || '\u00a0'}</div>
    );
    if (entry.type === 'line') return (
      <div key={idx} className="term-line">
        {entry.segments.map((s, i) => <span key={i} className={s.cls || ''}>{s.text}</span>)}
      </div>
    );
    if (entry.type === 'cmd') return (
      <div key={idx} className="term-line">
        {PROMPT_SEGS.map((s, i) => <span key={i} className={s.cls}>{s.text}</span>)}
        <span>{entry.cmd}</span>
      </div>
    );
    return null;
  };

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal__output">
        {history.map(renderEntry)}
        <div ref={bottomRef} />
      </div>
      <div className="terminal__input-row">
        {PROMPT_SEGS.map((s, i) => <span key={i} className={s.cls}>{s.text}</span>)}
        <input
          ref={inputRef}
          className="terminal__input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoFocus
        />
      </div>
    </div>
  );
}
