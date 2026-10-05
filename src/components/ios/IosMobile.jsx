// src/components/ios/IosMobile.js
import React, { useState } from 'react';
import { useLang } from '../../context/LangContext';
import IosLockScreen from './IosLockScreen';
import IosHomeScreen from './IosHomeScreen';
import IosAppView from './IosAppView'; // Le nouveau composant
import './IosMobile.css';

export default function IosMobile() {
  const { lang } = useLang();
  // State pour gérer l'application ouverte (null = écran d'accueil)
  const [activeApp, setActiveApp] = useState(null);

  return (
    <div className="ios-container" style={{ backgroundImage: "url('/wallpaper.jpg')" }}>
      {!lang ? (
        <IosLockScreen />
      ) : (
        <>
          <IosHomeScreen onOpenApp={setActiveApp} />
          
          {/* Si une app est cliquée, on affiche la vue plein écran par-dessus */}
          {activeApp && (
            <IosAppView appId={activeApp} onClose={() => setActiveApp(null)} />
          )}
        </>
      )}
    </div>
  );
}