/**
 * SikshaPath - Footer Component
 */

import React from 'react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { language, t } = useApp();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-logo-icon">📐</div>
            <div>
              <h3>SikshaPath — शिक्षापथ</h3>
              <p>{t('tagline')}</p>
            </div>
          </div>

          <div className="footer-notes">
            <span className="footer-badge">🇮🇳 Indian School Curriculum</span>
            <span className="footer-badge">⚡ 100% Offline Capable</span>
            <span className="footer-badge">🔒 Privacy Preserved (Local Storage)</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} SikshaPath. Built for Classes 6–10 Indian school students.
            Designed to empower teachers and personalize learning without replacing educator oversight.
          </p>
          <div className="footer-lang-status">
            {language === 'hi' ? 'सक्रिय भाषा: हिन्दी (NCERT शब्दावली)' : 'Active Language: English (NCERT Aligned)'}
          </div>
        </div>
      </div>
    </footer>
  );
}

