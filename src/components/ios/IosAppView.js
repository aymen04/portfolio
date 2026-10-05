// src/components/ios/IosAppView.js
import React from 'react';
import { ME, EXPERIENCE, PROJECTS, SKILLS, EDUCATION } from '../../data/portfolio';

export default function IosAppView({ appId, onClose }) {

  const renderContent = () => {
    switch(appId) {
      case 'profil':
        return (
          <div className="ios-app-content">
            <h1>{ME.name} {ME.lastName}</h1>
            <h3>{ME.title}</h3>
            <p>{ME.bio}</p>
          </div>
        );
      case 'experience':
        return (
          <div className="ios-app-content">
            <h1>Expérience</h1>
            {EXPERIENCE.map(exp => (
              <div key={exp.id} className="ios-exp-item">
                <h2>{exp.role}</h2>
                <h3>{exp.company}</h3>
                <p className="ios-exp-date">{exp.date}</p>
              </div>
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="ios-app-content">
            <h1>Formation</h1>
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="ios-exp-item">
                <h2>{edu.title}</h2>
                <h3>{edu.school}</h3>
                <p className="ios-exp-date">{edu.year}</p>
              </div>
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className="ios-app-content">
            <h1>Compétences</h1>
            {SKILLS.map((skillCat, idx) => (
              <div key={idx} className="ios-mb-6">
                <h2 style={{ color: skillCat.color }}>{skillCat.cat}</h2>
                <div className="ios-skills-list">
                  {skillCat.items.map((item, i) => (
                    <div key={i} className="ios-skill-item">
                      <div className="ios-skill-header">
                        <span>{item.name}</span>
                        <span>{item.level}%</span>
                      </div>
                      <div className="ios-skill-bar-bg">
                        <div 
                          className="ios-skill-bar-fill" 
                          style={{ width: `${item.level}%`, backgroundColor: skillCat.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'contact':
        return (
          <div className="ios-app-content">
            <h1>Contact</h1>
            <p>N'hésitez pas à me contacter pour toute opportunité ou projet !</p>
            <div className="ios-contact-links">
              <a href={`mailto:${ME.email}`} className="ios-btn-primary" style={{backgroundColor: '#ef4444'}}>Email</a>
              <a href={ME.linkedin} target="_blank" rel="noreferrer" className="ios-btn-primary" style={{backgroundColor: '#0a66c2'}}>LinkedIn</a>
              <a href={ME.github} target="_blank" rel="noreferrer" className="ios-btn-primary" style={{backgroundColor: '#1f2937'}}>GitHub</a>
              <a href={ME.website} target="_blank" rel="noreferrer" className="ios-btn-primary" style={{backgroundColor: '#8b5cf6'}}>Portfolio Web</a>
            </div>
          </div>
        );
      default:
        const project = PROJECTS.find(p => p.id === appId);
        if (project) {
          return (
            <div className="ios-app-content">
              <h1>{project.name}</h1>
              <span className="ios-tag" style={{ backgroundColor: project.langColor }}>
                {project.lang}
              </span>
              <p>{project.desc}</p>
              <a href={project.url} target="_blank" rel="noreferrer" className="ios-btn-primary">
                Voir le projet
              </a>
            </div>
          );
        }
        return <div className="ios-app-content">Contenu introuvable...</div>;
    }
  };

  return (
    <div className="ios-app-view">
      <div className="ios-app-navbar">
        <button onClick={onClose} className="ios-btn-back">
          <span style={{ fontSize: '1.5rem', lineHeight: 0 }}>‹</span> Retour
        </button>
        <span className="ios-navbar-title">{appId}</span>
        <div className="ios-spacer"></div>
      </div>

      {renderContent()}

      <div className="ios-home-indicator-container" onClick={onClose}>
        <div className="ios-home-indicator"></div>
      </div>
    </div>
  );
}