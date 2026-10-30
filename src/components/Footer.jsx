/**
 * SikshaPath - Footer Component
 * Enhanced with comprehensive page links, NCERT chapter shortcuts, and detailed pedagogical disclaimer
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { language, t, setRole } = useApp();

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Main Footer Multi-Column Grid */}
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Educational Mission */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="brand-logo-icon">📐</div>
              <div>
                <h3>SikshaPath — शिक्षापथ</h3>
                <p className="footer-brand-tagline">
                  {language === 'hi'
                    ? 'अपनी गति से सीखें। मार्गदर्शन के साथ बढ़ें।'
                    : 'Learn at Your Pace. Grow with Guidance.'}
                </p>
              </div>
            </div>

            <p className="footer-mission-text">
              {language === 'hi'
                ? 'कक्षा 6 से 10 के भारतीय स्कूली छात्रों के लिए समर्पित अनुकूलित अधिगम प्लेटफॉर्म। दृश्य सैंडबॉक्स और पारदर्शी डायग्नोस्टिक नियमों द्वारा हर छात्र की सीखने की गति का सम्मान।'
                : 'Adaptive learning platform for Classes 6–10 Indian school students. Bridges foundational concept gaps using interactive visual sandboxes and rule-based diagnostic assessment.'}
            </p>

            <div className="footer-badges-list">
              <span className="footer-badge">🇮🇳 NCERT &amp; NEP 2020 Aligned</span>
              <span className="footer-badge">⚡ 100% Offline Capable</span>
              <span className="footer-badge">🔒 Zero PII Transmission</span>
            </div>
          </div>

          {/* Column 2: Quick Platform Navigation Links */}
          <div className="footer-col links-col">
            <h4 className="footer-heading">
              {language === 'hi' ? 'मुख्य पृष्ठ (Navigation)' : 'Platform Navigation'}
            </h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/" onClick={handleNavClick}>
                  🏠 {language === 'hi' ? 'होम (Landing Page)' : 'Home (Landing Page)'}
                </Link>
              </li>
              <li>
                <Link
                  to="/student/dashboard"
                  onClick={() => {
                    setRole('student');
                    handleNavClick();
                  }}
                >
                  📊 {language === 'hi' ? 'छात्र डैशबोर्ड (Dashboard)' : 'Student Dashboard'}
                </Link>
              </li>
              <li>
                <Link
                  to="/student/learn?topic=fractions"
                  onClick={() => {
                    setRole('student');
                    handleNavClick();
                  }}
                >
                  🚀 {language === 'hi' ? 'अधिगम यात्रा (Learning Journey)' : 'Adaptive Journey'}
                </Link>
              </li>
              <li>
                <Link
                  to="/student/concept-map"
                  onClick={() => {
                    setRole('student');
                    handleNavClick();
                  }}
                >
                  🗺️ {language === 'hi' ? 'अवधारणा मानचित्र (Concept Map)' : 'Concept Gap Map'}
                </Link>
              </li>
              <li>
                <Link
                  to="/student/report"
                  onClick={() => {
                    setRole('student');
                    handleNavClick();
                  }}
                >
                  📈 {language === 'hi' ? 'प्रगति रिपोर्ट (Progress Report)' : 'Progress Report'}
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher"
                  onClick={() => {
                    setRole('teacher');
                    handleNavClick();
                  }}
                >
                  👨‍🏫 {language === 'hi' ? 'शिक्षक नियंत्रण (Teacher Dashboard)' : 'Teacher Dashboard'}
                </Link>
              </li>
              <li>
                <Link to="/select-profile" onClick={handleNavClick}>
                  👤 {language === 'hi' ? 'प्रोफाइल व रोल चयन (Profile Switcher)' : 'Switch Role / Profile'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: NCERT Class 6 Math Chapters */}
          <div className="footer-col links-col">
            <h4 className="footer-heading">
              {language === 'hi' ? 'NCERT गणित अध्याय' : 'NCERT Class 6 Math'}
            </h4>
            <ul className="footer-nav-list">
              <li>
                <Link
                  to="/student/learn?topic=fractions"
                  onClick={() => {
                    setRole('student');
                    handleNavClick();
                  }}
                >
                  🍕 {language === 'hi' ? 'अध्याय 7: भिन्न (Fractions)' : 'Ch 7: Fractions & Sandbox'}
                </Link>
              </li>
              <li>
                <Link
                  to="/student/learn?topic=whole-numbers"
                  onClick={() => {
                    setRole('student');
                    handleNavClick();
                  }}
                >
                  🔢 {language === 'hi' ? 'अध्याय 2: पूर्ण संख्याएँ (Whole Numbers)' : 'Ch 2: Whole Numbers & Line'}
                </Link>
              </li>
              <li>
                <Link
                  to="/student/learn?topic=playing-with-numbers"
                  onClick={() => {
                    setRole('student');
                    handleNavClick();
                  }}
                >
                  🎲 {language === 'hi' ? 'अध्याय 3: HCF एवं LCM (Numbers)' : 'Ch 3: Playing with Numbers'}
                </Link>
              </li>
              <li>
                <Link
                  to="/student/learn?topic=integers"
                  onClick={() => {
                    setRole('student');
                    handleNavClick();
                  }}
                >
                  ➖ {language === 'hi' ? 'अध्याय 6: पूर्णांक (Integers)' : 'Ch 6: Integers & Negatives'}
                </Link>
              </li>
              <li>
                <Link
                  to="/student/learn?topic=decimals"
                  onClick={() => {
                    setRole('student');
                    handleNavClick();
                  }}
                >
                  📏 {language === 'hi' ? 'अध्याय 8: दशमलव (Decimals)' : 'Ch 8: Decimals in Daily Life'}
                </Link>
              </li>
              <li>
                <Link
                  to="/student/learn?topic=mensuration"
                  onClick={() => {
                    setRole('student');
                    handleNavClick();
                  }}
                >
                  📐 {language === 'hi' ? 'अध्याय 10: क्षेत्रमिति (Mensuration)' : 'Ch 10: Perimeter & Area'}
                </Link>
              </li>
              <li>
                <Link
                  to="/student/concept-map"
                  onClick={() => {
                    setRole('student');
                    handleNavClick();
                  }}
                >
                  🧠 {language === 'hi' ? 'सभी 6 अध्यायों का गैप मैप' : 'Full 6-Chapter Gap Analysis'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Extended Pedagogical & AI Disclaimer */}
          <div className="footer-col disclaimer-col">
            <h4 className="footer-heading">
              {language === 'hi' ? 'अस्वीकरण एवं पारदर्शिता (Disclaimer)' : 'Pedagogical & AI Disclaimer'}
            </h4>
            <div className="footer-disclaimer-box">
              <p>
                <strong>{language === 'hi' ? 'शैक्षणिक मार्गदर्शन:' : 'Educational Purpose:'}</strong>{' '}
                {language === 'hi'
                  ? 'शिक्षापथ छात्रों के व्यक्तिगत अध्ययन व अभ्यास के लिए एक सहायक डायग्नोस्टिक टूल है। यह कक्षा शिक्षण, प्रमाणित पाठ्यपुस्तकों या शिक्षक के औपचारिक मूल्यांकन का विकल्प नहीं है।'
                  : 'SikshaPath is designed as an assistive formative practice & concept-gap detection platform. It complements classroom pedagogy and does not replace certified educator evaluations.'}
              </p>
              <p>
                <strong>{language === 'hi' ? 'पारदर्शी अनुकूली नियम:' : 'Transparent Heuristics:'}</strong>{' '}
                {language === 'hi'
                  ? 'सभी अनुशंसाएं पारदर्शी नियमों (Rule Engine) पर आधारित हैं। कोई भी अपारदर्शी ब्लैक-बॉक्स AI या गलत मूल्यांकन शामिल नहीं है; शिक्षक किसी भी समय निर्णय बदल सकते हैं।'
                  : 'Student recommendations are driven by deterministic, inspectable heuristic rules (threshold scoring). Teachers retain full override authority at all times.'}
              </p>
              <p>
                <strong>{language === 'hi' ? 'गोपनीयता और डेटा सुरक्षा:' : 'Privacy & Local Storage:'}</strong>{' '}
                {language === 'hi'
                  ? '100% स्थानीय ब्राउज़र आधारित। छात्र का कोई भी व्यक्तिगत डेटा (PII) बाहरी सर्वर या क्लाउड पर नहीं भेजा जाता है।'
                  : 'Zero external telemetry. All diagnostic scores, XP, and progress logs reside securely within the client browser’s localStorage.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              &copy; {new Date().getFullYear()} <strong>SikshaPath (शिक्षापथ)</strong>. Built with pride for Indian School Education (Classes 6–10).
            </p>
            <p className="footer-sub-copyright">
              Designed to empower teachers, demystify mathematics, and ensure every learner masters core concepts at their own pace.
            </p>
          </div>

          <div className="footer-meta-tags">
            <span className="footer-lang-pill">
              🌐 {language === 'hi' ? 'सक्रिय भाषा: हिन्दी (NCERT शब्दावली)' : 'Active Language: English (NCERT Aligned)'}
            </span>
            <span className="footer-status-pill">
              ● v1.0.4 Offline Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
