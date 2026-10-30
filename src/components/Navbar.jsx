/**
 * SikshaPath - Navigation Header
 * Clean, responsive header with role toggling, student persona switching,
 * bilingual language selector, and reset data actions.
 */

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar({ onToggleSidebar }) {
  const {
    role,
    setRole,
    language,
    setLanguage,
    students,
    currentStudentId,
    setCurrentStudentId,
    currentStudent,
    theme,
    toggleTheme,
    setIsResetModalOpen,
    setIsLoginModalOpen,
    t
  } = useApp();

  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleRoleToggle = (newRole) => {
    setRole(newRole);
    if (newRole === 'teacher') {
      navigate('/teacher');
    } else {
      navigate('/student/dashboard');
    }
  };

  return (
    <header className="site-navbar">
      <div className="navbar-container">
        {/* Left: Hamburger & Logo */}
        <div className="navbar-left">
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>

          <NavLink to="/" className="brand-logo-link">
            <div className="brand-logo-icon">📐</div>
            <div className="brand-text-group">
              <span className="brand-name">
                {language === 'hi' ? 'शिक्षापथ' : 'SikshaPath'}
              </span>
              <span className="brand-tagline">
                {language === 'hi' ? 'अपनी गति से सीखें' : 'Learn at Your Pace'}
              </span>
            </div>
          </NavLink>
        </div>

        {/* Center: Quick navigation links */}
        <nav className="navbar-center-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {t('navHome')}
          </NavLink>
          {role === 'student' ? (
            <>
              <NavLink
                to="/student/dashboard"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {t('navDashboard')}
              </NavLink>
              <NavLink
                to="/student/learn"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {t('navJourney')}
              </NavLink>
              <NavLink
                to="/student/concept-map"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {t('navConceptMap')}
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/teacher"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {t('navTeacherDashboard')}
            </NavLink>
          )}
        </nav>

        {/* Right: Controls & Selectors */}
        <div className="navbar-right">
          {/* Language Switcher */}
          <div className="lang-switcher">
            <button
              type="button"
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              title="English"
            >
              EN
            </button>
            <span className="lang-divider">|</span>
            <button
              type="button"
              className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
              onClick={() => setLanguage('hi')}
              title="हिन्दी"
            >
              हिन्दी
            </button>
          </div>

          {/* Student Persona Dropdown (if in Student Mode - Desktop) */}
          {role === 'student' && currentStudent && (
            <div className="student-persona-wrapper desktop-only">
              <button
                type="button"
                className="student-pill-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <span className="student-avatar">{currentStudent.avatar || '👤'}</span>
                <span className="student-name-text">{currentStudent.name}</span>
                <span className="persona-type-tag">
                  {currentStudent.learningPersona === 'struggling'
                    ? language === 'hi' ? 'बुनियाद' : 'Needs Support'
                    : currentStudent.learningPersona === 'on-track'
                    ? language === 'hi' ? 'अभ्यास' : 'On-Track'
                    : language === 'hi' ? 'उन्नत' : 'Advanced'}
                </span>
                <span className="dropdown-caret">▾</span>
              </button>

              {profileDropdownOpen && (
                <div
                  className="dropdown-menu student-menu"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="dropdown-header">
                    <small>{language === 'hi' ? 'छात्र खाता चुनें (व्यक्तिगत डेटा):' : 'Saved Student Accounts:'}</small>
                  </div>
                  {students.map((stu) => {
                    const streak = stu.learningStreak || 0;
                    return (
                      <button
                        key={stu.id}
                        type="button"
                        className={`dropdown-item ${stu.id === currentStudentId ? 'selected' : ''}`}
                        onClick={() => {
                          setCurrentStudentId(stu.id);
                          setProfileDropdownOpen(false);
                        }}
                      >
                        <span className="item-avatar">{stu.avatar}</span>
                        <div className="item-info">
                          <strong>{stu.name}</strong>
                          <span className="item-desc">
                            Class {stu.class} &middot; 🔥 {streak} {language === 'hi' ? 'दिन स्ट्रीक' : 'days streak'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.4rem', marginTop: '0.4rem' }}>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      style={{ color: 'var(--primary)', fontWeight: 600 }}
                    >
                      <span className="item-avatar">➕</span>
                      <div className="item-info">
                        <strong>{language === 'hi' ? 'नया छात्र लॉगिन / खाता जोड़ें' : 'Login / Register New Student'}</strong>
                        <span className="item-desc">{language === 'hi' ? '0% प्रगति और 0 स्ट्रीक से शुरुआत' : 'Start fresh with 0% progress'}</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/select-profile');
                      }}
                    >
                      <span className="item-avatar">⚙️</span>
                      <div className="item-info">
                        <strong>{language === 'hi' ? 'प्रोफ़ाइल प्रबंधन व सेटिंग्स' : 'Profile & Role Settings'}</strong>
                        <span className="item-desc">{language === 'hi' ? 'कक्षा, विषय व भाषा चुनें' : 'Configure grade & language'}</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Role Switcher Pill (Desktop) */}
          <div className="role-switch-group desktop-only">
            <button
              type="button"
              className={`role-tab ${role === 'student' ? 'active' : ''}`}
              onClick={() => handleRoleToggle('student')}
            >
              <span className="role-tab-icon">🎓</span>
              <span className="role-tab-text">{language === 'hi' ? 'छात्र' : 'Student'}</span>
            </button>
            <button
              type="button"
              className={`role-tab ${role === 'teacher' ? 'active' : ''}`}
              onClick={() => handleRoleToggle('teacher')}
            >
              <span className="role-tab-icon">👩‍🏫</span>
              <span className="role-tab-text">{language === 'hi' ? 'शिक्षक' : 'Teacher'}</span>
            </button>
          </div>

          {/* Theme Toggle (Dark Neon / Light) */}
          <button
            type="button"
            className="btn-icon-theme"
            onClick={toggleTheme}
            title={
              theme === 'dark'
                ? (language === 'hi' ? 'लाइट मोड में बदलें' : 'Switch to Light Mode')
                : (language === 'hi' ? 'डार्क मोड में बदलें' : 'Switch to Dark Mode')
            }
            aria-label="Toggle theme"
          >
            <span className="theme-toggle-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
            <span className="theme-toggle-label desktop-only">
              {theme === 'dark'
                ? (language === 'hi' ? 'डार्क' : 'Dark')
                : (language === 'hi' ? 'लाइट' : 'Light')}
            </span>
          </button>

          {/* Reset Demo Data button (Desktop) */}
          <button
            type="button"
            className="btn-icon-reset desktop-only"
            onClick={() => setIsResetModalOpen(true)}
            title={t('resetData')}
          >
            🔄
          </button>
        </div>
      </div>
    </header>
  );
}

