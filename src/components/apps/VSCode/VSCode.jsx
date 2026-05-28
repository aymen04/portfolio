import { useState } from 'react';
import { PROJECTS } from '../../../data/portfolio';
import { useLang } from '../../../context/LangContext';
import './VSCode.css';

const FILE_ICONS = { TypeScript: '🔷', Python: '🐍', JavaScript: '🟨' };
const STATUS_COLOR = { production: '#30d158', wip: '#ffd60a' };
const STATUS_LABEL = { production: 'production', wip: 'WIP' };

const MOCK_CODE = {
  proj1: `// TEMPO SaaS — Schedule Management
import { create } from 'zustand';

interface Schedule {
  id: string;
  employee: string;
  shifts: Shift[];
  leaveRequests: LeaveRequest[];
}

export const useScheduleStore = create<{
  schedules: Schedule[];
  addLeaveRequest: (id: string, req: LeaveRequest) => void;
}>((set) => ({
  schedules: [],
  addLeaveRequest: (id, req) =>
    set((state) => ({
      schedules: state.schedules.map((s) =>
        s.id === id
          ? { ...s, leaveRequests: [...s.leaveRequests, req] }
          : s
      ),
    })),
}));`,
  proj2: `// Glalux — VIP Transport Booking
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const containerStyle = { width: '100%', height: '400px' };

export default function BookingMap({ pickup, dropoff }) {
  const [route, setRoute] = useState(null);

  const calculateRoute = async () => {
    const directionsService = new google.maps.DirectionsService();
    const result = await directionsService.route({
      origin: pickup,
      destination: dropoff,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setRoute(result);
  };

  return (
    <GoogleMap mapContainerStyle={containerStyle} zoom={12}>
      <Marker position={pickup} label="A" />
      <Marker position={dropoff} label="B" />
    </GoogleMap>
  );
}`,
  proj3: `# ECU-Parser — XDF/XML Engine Mapping
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from typing import List

@dataclass
class ECUMap:
    name: str
    address: int
    x_axis: List[float]
    y_axis: List[float]
    values: List[List[float]]

def parse_xdf(file_path: str) -> List[ECUMap]:
    tree = ET.parse(file_path)
    root = tree.getroot()
    maps = []
    for table in root.findall('.//XDFTABLE'):
        ecu_map = ECUMap(
            name=table.get('uniqueid', 'unknown'),
            address=int(table.find('XDFADDRESS').text, 16),
            x_axis=[], y_axis=[], values=[]
        )
        maps.append(ecu_map)
    return maps`,
  proj4: `# PolyBot — Arbitrage Scanner
import ccxt
import asyncio
from decimal import Decimal

class ArbitrageScanner:
    def __init__(self, exchanges: list[str]):
        self.exchanges = {
            name: ccxt.Exchange({'id': name})
            for name in exchanges
        }

    async def scan_opportunities(self, symbol: str):
        prices = {}
        for name, ex in self.exchanges.items():
            ticker = await ex.fetch_ticker(symbol)
            prices[name] = Decimal(str(ticker['last']))

        best_buy  = min(prices, key=prices.get)
        best_sell = max(prices, key=prices.get)
        spread = prices[best_sell] - prices[best_buy]

        if spread > Decimal('0.005'):
            return { 'buy': best_buy, 'sell': best_sell, 'spread': spread }
        return None`,
};

export default function VSCode() {
  const { t } = useLang();
  const [active, setActive]     = useState(PROJECTS[0].id);
  const [openTabs, setOpenTabs] = useState([PROJECTS[0].id]);

  const openTab = (id) => {
    if (!openTabs.includes(id)) setOpenTabs(tabs => [...tabs, id]);
    setActive(id);
  };
  const closeTab = (e, id) => {
    e.stopPropagation();
    const next = openTabs.filter(tab => tab !== id);
    setOpenTabs(next);
    if (active === id) setActive(next[next.length - 1] ?? null);
  };

  const proj = PROJECTS.find(p => p.id === active);
  const translated = proj ? (t.projData?.[proj.id] ?? {}) : {};

  return (
    <div className="vscode">
      <div className="vscode__activity">
        <div className="activity-icon activity-icon--active" title="Explorer">📁</div>
        <div className="activity-icon" title="Search">🔍</div>
        <div className="activity-icon" title="Git">🌿</div>
        <div className="activity-icon" title="Extensions">🧩</div>
      </div>

      <div className="vscode__sidebar">
        <div className="vsc-sidebar-title">EXPLORER</div>
        <div className="vsc-folder"><span className="vsc-folder-icon">▾</span><span>portfolio — projects</span></div>
        {PROJECTS.map(p => (
          <div key={p.id} className={`vsc-file ${active === p.id ? 'vsc-file--active' : ''}`} onClick={() => openTab(p.id)}>
            <span>{FILE_ICONS[p.lang] || '📄'}</span>
            <span>{p.name.toLowerCase().replace(/\s/g, '-')}.{p.lang === 'Python' ? 'py' : 'ts'}</span>
          </div>
        ))}
        <div style={{ marginTop: 16, padding: '0 12px' }}>
          <div className="vsc-sidebar-title" style={{ marginBottom: 8 }}>STATUS</div>
          {PROJECTS.map(p => (
            <div key={p.id} className="vsc-stat-row">
              <span style={{ color: p.langColor || '#fff', fontSize: 10 }}>●</span>
              <span>{p.name}</span>
              <span style={{ marginLeft: 'auto', color: STATUS_COLOR[p.status], fontSize: 10 }}>{STATUS_LABEL[p.status]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="vscode__editor">
        <div className="vsc-tabs">
          {openTabs.map(id => {
            const p = PROJECTS.find(x => x.id === id);
            if (!p) return null;
            return (
              <div key={id} className={`vsc-tab ${id === active ? 'vsc-tab--active' : ''}`} onClick={() => setActive(id)}>
                <span>{FILE_ICONS[p.lang] || '📄'}</span>
                <span>{p.name.toLowerCase().replace(/\s/g, '-')}.{p.lang === 'Python' ? 'py' : 'ts'}</span>
                <button className="vsc-tab-close" onClick={e => closeTab(e, id)}>✕</button>
              </div>
            );
          })}
        </div>

        {proj && (
          <div className="vsc-breadcrumb">
            <span>portfolio</span><span className="vsc-bc-sep">›</span>
            <span>src</span><span className="vsc-bc-sep">›</span>
            <span style={{ color: '#e2e8f0' }}>{proj.name.toLowerCase().replace(/\s/g, '-')}.{proj.lang === 'Python' ? 'py' : 'ts'}</span>
          </div>
        )}

        {proj ? (
          <>
            <div className="vsc-project-header">
              <div className="vsc-proj-name">{proj.name}</div>
              <div className="vsc-proj-tagline">{translated.tagline ?? proj.tagline}</div>
              <div className="vsc-proj-stack">
                {proj.stack.map(s => <span key={s} className="vsc-proj-tag">{s}</span>)}
              </div>
            </div>
            <div className="vsc-code">
              <div className="vsc-line-nums">
                {MOCK_CODE[proj.id]?.split('\n').map((_, i) => (
                  <div key={i} className="vsc-num">{i + 1}</div>
                ))}
              </div>
              <pre className="vsc-pre"><code>{MOCK_CODE[proj.id]}</code></pre>
            </div>
          </>
        ) : (
          <div className="vsc-empty">
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔵</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Select a file to start</div>
          </div>
        )}

        {proj && (
          <div className="vsc-statusbar">
            <div className="vsc-status-left">
              <span>🌿 main</span>
              <span>⚡ {proj.lines} {t.vscLines}</span>
            </div>
            <div className="vsc-status-right">
              <span style={{ color: proj.langColor || '#fff' }}>● {proj.lang}</span>
              <span>UTF-8</span>
              <span style={{ color: STATUS_COLOR[proj.status] }}>{STATUS_LABEL[proj.status]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}