// src/components/ios/IosHomeScreen.js
import React from 'react';
import { useLang } from '../../context/LangContext';
import { PROJECTS, ME } from '../../data/portfolio';
import './IosMobile.css';

export default function IosHomeScreen({ onOpenApp }) {
  const { lang } = useLang();

  const dockApps = [
    { id: 'profil', icon: '👨‍💻', color: '#3b82f6', label: 'Profil' },
    { id: 'experience', icon: '💼', color: '#f59e0b', label: 'Expérience' },
    { id: 'skills', icon: '⚡', color: '#8b5cf6', label: 'Compétences' },
    { id: 'contact', icon: '✉️', color: '#10b981', label: 'Contact' },
  ];

  const handleAppClick = (appId, url = null) => {
    if (appId === 'cv' && url) {
      window.open(url, '_blank');
    } else {
      onOpenApp(appId);
    }
  };

  return (
    <div className="ios-homescreen">
      <div className="ios-statusbar">
        <span>12:44</span>
        <div>🔋</div>
      </div>

      <div className="ios-grid">
        {PROJECTS.map((project) => (
          <div key={project.id} className="ios-app" onClick={() => handleAppClick(project.id)}>
            <div className="ios-app-icon text-icon" style={{ backgroundColor: project.langColor || '#333' }}>
              {project.name.charAt(0)}
            </div>
            <span className="ios-app-label">{project.name}</span>
          </div>
        ))}

        <div className="ios-app" onClick={() => handleAppClick('cv', lang === 'en' ? ME.cvEn : ME.cv)}>
          <div className="ios-app-icon emoji-icon" style={{ backgroundColor: '#ef4444' }}>
            📄
          </div>
          <span className="ios-app-label">CV</span>
        </div>
        {/* À insérer dans la div className="ios-grid" de IosHomeScreen.js */}
        <div className="ios-app" onClick={() => handleAppClick('education')}>
          <div className="ios-app-icon emoji-icon" style={{ backgroundColor: '#f59e0b' }}>
            🎓
          </div>
          <span className="ios-app-label">Formation</span>
        </div>
      </div>

      <div className="ios-dock">
        {dockApps.map((app) => (
          <div key={app.id} className="ios-app" onClick={() => handleAppClick(app.id)}>
            <div className="ios-dock-icon ios-app-icon emoji-icon" style={{ backgroundColor: app.color }}>
              {app.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}