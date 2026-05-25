import { useState } from 'react';
import { PROJECTS } from '../../../data/portfolio';
import './VSCode.css';

const FILE_ICONS = {
  TypeScript: '🔷',
  Python: '🐍',
  JavaScript: '🟨',
};

const MOCK_CODE = {
  proj1: `// DevFlow — Sprint Management
import { create } from 'zustand';

interface Sprint {
  id: string;
  name: string;
  tasks: Task[];
  velocity: number;
}

export const useSprintStore = create<{
  sprints: Sprint[];
  activeSprint: string | null;
  addTask: (sprintId: string, task: Task) => void;
}>((set) => ({
  sprints: [],
  activeSprint: null,

  addTask: (sprintId, task) =>
    set((state) => ({
      sprints: state.sprints.map((s) =>
        s.id === sprintId
          ? { ...s, tasks: [...s.tasks, task] }
          : s
      ),
    })),
}));`,

  proj2: `# AIWriter — FastAPI Content Generator
from fastapi import FastAPI, HTTPException
from openai import AsyncOpenAI
from redis import asyncio as aioredis
import json

app = FastAPI(title="AIWriter API")
client = AsyncOpenAI()
redis = await aioredis.from_url("redis://localhost")

@app.post("/generate")
async def generate_content(prompt: str, model: str = "gpt-4"):
    cache_key = f"gen:{hash(prompt)}"
    cached = await redis.get(cache_key)
    if cached:
        return json.loads(cached)

    stream = await client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        stream=True,
    )
    # Stream response to client...`,

  proj3: `// ShopKit — E-commerce Starter
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SK!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function createCheckoutSession(
  cartItems: CartItem[],
  userId: string
) {
  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: 'eur',
      product_data: { name: item.name, images: [item.image] },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: \`\${process.env.NEXT_PUBLIC_URL}/success\`,
    cancel_url: \`\${process.env.NEXT_PUBLIC_URL}/cart\`,
  });
}`,

  proj4: `// PortfolioOS — macOS in React
import { useWindowManager } from './hooks/useWindowManager';
import Window from './components/Window/Window';
import Background from './components/Effects/Background';
import Dock from './components/Dock/Dock';
import MenuBar from './components/MenuBar/MenuBar';

export default function Desktop() {
  const {
    windows, activeApp,
    openApp, closeApp,
    minimizeApp, moveWindow,
    bringToFront,
  } = useWindowManager();

  return (
    <div className="desktop">
      <Background />
      <MenuBar activeApp={activeApp} />
      {/* Windows rendered here */}
      <Dock windows={windows} openApp={openApp} />
    </div>
  );
}`,
};

const STATUS_COLOR = { production: '#30d158', wip: '#ffd60a' };
const STATUS_LABEL = { production: 'production', wip: 'WIP' };

export default function VSCode() {
  const [active, setActive] = useState(PROJECTS[0].id);
  const [openTabs, setOpenTabs] = useState([PROJECTS[0].id]);

  const openTab = (id) => {
    if (!openTabs.includes(id)) setOpenTabs(t => [...t, id]);
    setActive(id);
  };

  const closeTab = (e, id) => {
    e.stopPropagation();
    const next = openTabs.filter(t => t !== id);
    setOpenTabs(next);
    if (active === id) setActive(next[next.length - 1] ?? null);
  };

  const proj = PROJECTS.find(p => p.id === active);

  return (
    <div className="vscode">

      {/* Activity bar */}
      <div className="vscode__activity">
        <div className="activity-icon activity-icon--active" title="Explorer">📁</div>
        <div className="activity-icon" title="Search">🔍</div>
        <div className="activity-icon" title="Git">🌿</div>
        <div className="activity-icon" title="Extensions">🧩</div>
      </div>

      {/* Sidebar explorer */}
      <div className="vscode__sidebar">
        <div className="vsc-sidebar-title">EXPLORATEUR</div>
        <div className="vsc-folder">
          <span className="vsc-folder-icon">▾</span>
          <span>portfolio — projets</span>
        </div>
        {PROJECTS.map(p => (
          <div
            key={p.id}
            className={`vsc-file ${active === p.id ? 'vsc-file--active' : ''}`}
            onClick={() => openTab(p.id)}
          >
            <span>{FILE_ICONS[p.lang] || '📄'}</span>
            <span>{p.name.toLowerCase()}.{p.lang === 'Python' ? 'py' : 'ts'}</span>
          </div>
        ))}
        <div style={{ marginTop: 16, padding: '0 12px' }}>
          <div className="vsc-sidebar-title" style={{ marginBottom: 8 }}>STATS</div>
          {PROJECTS.map(p => (
            <div key={p.id} className="vsc-stat-row">
              <span style={{ color: p.langColor || '#fff', fontSize: 10 }}>●</span>
              <span>{p.name}</span>
              <span style={{ marginLeft: 'auto', color: STATUS_COLOR[p.status], fontSize: 10 }}>
                {STATUS_LABEL[p.status]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Editor area */}
      <div className="vscode__editor">

        {/* Tabs */}
        <div className="vsc-tabs">
          {openTabs.map(id => {
            const p = PROJECTS.find(x => x.id === id);
            if (!p) return null;
            return (
              <div
                key={id}
                className={`vsc-tab ${id === active ? 'vsc-tab--active' : ''}`}
                onClick={() => setActive(id)}
              >
                <span>{FILE_ICONS[p.lang] || '📄'}</span>
                <span>{p.name.toLowerCase()}.{p.lang === 'Python' ? 'py' : 'ts'}</span>
                <button className="vsc-tab-close" onClick={e => closeTab(e, id)}>✕</button>
              </div>
            );
          })}
        </div>

        {/* Breadcrumb */}
        {proj && (
          <div className="vsc-breadcrumb">
            <span>portfolio</span>
            <span className="vsc-bc-sep">›</span>
            <span>src</span>
            <span className="vsc-bc-sep">›</span>
            <span style={{ color: '#e2e8f0' }}>{proj.name.toLowerCase()}.{proj.lang === 'Python' ? 'py' : 'ts'}</span>
          </div>
        )}

        {/* Code */}
        {proj ? (
          <div className="vsc-code">
            <div className="vsc-line-nums">
              {MOCK_CODE[proj.id]?.split('\n').map((_, i) => (
                <div key={i} className="vsc-num">{i + 1}</div>
              ))}
            </div>
            <pre className="vsc-pre">
              <code>{MOCK_CODE[proj.id]}</code>
            </pre>
          </div>
        ) : (
          <div className="vsc-empty">
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔵</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Sélectionne un fichier pour commencer</div>
          </div>
        )}

        {/* Status bar */}
        {proj && (
          <div className="vsc-statusbar">
            <div className="vsc-status-left">
              <span>🌿 main</span>
              <span>⚡ {proj.lines} lignes</span>
              <span>★ {proj.stars} stars</span>
            </div>
            <div className="vsc-status-right">
              <span style={{ color: proj.langColor || '#fff' }}>● {proj.lang}</span>
              <span>UTF-8</span>
              <span style={{ color: STATUS_COLOR[proj.status] }}>
                {STATUS_LABEL[proj.status]}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
