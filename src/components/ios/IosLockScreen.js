import React from 'react';
import { useLang } from '../../context/LangContext';

export default function IosLockScreen() {
  const { setLang } = useLang();

  return (
    <div className="ios-lockscreen">
      <div className="ios-clock">
        <p className="ios-clock-text">Mardi 9 Janvier</p>
        <h1 className="ios-clock-time">12:44</h1>
      </div>

      <div className="ios-lang-container">
        <p>Choisissez votre langue</p>
        <div className="ios-btn-group">
          <button className="ios-btn" onClick={() => setLang('fr')}>
            Français
          </button>
          <button className="ios-btn" onClick={() => setLang('en')}>
            English
          </button>
        </div>
      </div>
    </div>
  );
}