/**
 * SikshaPath - Responsive Sidebar Navigation (Drawer)
 * Mobile-friendly navigation with touch-accessible role toggle,
 * persona switcher, theme toggle, and curriculum badge.
 */

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Sidebar({ isOpen, onClose }) {
  const {
    role,
    setRole,
    currentStudent,
    currentStudentId,
    setCurrentStudentId,
    students,
    language,
    setLanguage,
    theme,
    toggleTheme,
    setIsResetModalOpen,
    t
  } = useApp();

  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'teacher') {
      navigate('/teacher');
    } else {
      navigate('/student/dashboard');
    }
    onClose();
  };

  const handleSelectStudent = (id) => {
    setCurrentStudentId(id);
    onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`site-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="brand-icon">📐</span>
            <span className="brand-title">SikshaPath <span className="brand-hindi">शिक्षापथ</span></span>
          </div>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Mobile Quick Role Toggle */}
        <div className="sidebar-role-toggle">
          <button
            type="button"
            className={`drawer-role-btn ${role === 'student' ? 'active' : ''}`}
            onClick={() => handleRoleChange('student')}
          >
            <span className="role-tab-icon">🎓</span>
            <span className="role-tab-text">{language === 'hi' ? 'छात्र मोड' : 'Student Mode'}</span>
          </button>
          <button
            type="button"
            className={`drawer-role-btn ${role === 'teacher' ? 'active' : ''}`}
            onClick={() => handleRoleChange('teacher')}
          >
            <span className="role-tab-icon">👩‍🏫</span>
            <span className="role-tab-text">{language === 'hi' ? 'शिक्षक पोर्टल' : 'Teacher Portal'}</span>
          </button>
        </div>

        {/* Current Student summary in sidebar */}
        {role === 'student' && currentStudent && (
          <div className="sidebar-profile-card">
            <div className="profile-avatar">{currentStudent.avatar}</div>
            <div className="profile-details">
              <h4>{currentStudent.name}</h4>
              <p>
                {language === 'hi' ? 'कक्षा' : 'Class'} {currentStudent.class} &middot;{' '}
                {language === 'hi' ? 'गणित' : 'Maths'}
              </p>
              <span className="profile-tag">
                {language === 'hi'
                  ? currentStudent.personaLabelHi
                  : currentStudent.personaLabel}
              </span>
            </div>
          </div>
        )}

        {/* Quick Persona Switcher in Drawer for Phones */}
        {role === 'student' && (
          <div className="drawer-persona-switcher">
            <small className="drawer-sublabel">
              {language === 'hi' ? 'छात्र प्रोफाइल बदलें:' : 'Switch Demo Student:'}
            </small>
            <div className="drawer-persona-chips">
              {students.map((stu) => (
                <button
                  key={stu.id}
                  type="button"
                  className={`drawer-stu-chip ${stu.id === currentStudentId ? 'selected' : ''}`}
                  onClick={() => handleSelectStudent(stu.id)}
                >
                  <span>{stu.avatar}</span>
                  <span>{stu.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Navigation Links */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">
            {role === 'student'
              ? language === 'hi' ? 'नेविगेशन' : 'Navigation'
              : language === 'hi' ? 'शिक्षक नेविगेशन' : 'Teacher Navigation'}
          </div>

          <NavLink
            to="/"
            end
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span className="link-icon">🏠</span>
            <span>{t('navHome')}</span>
          </NavLink>

          {role === 'student' ? (
            <>
              <NavLink
                to="/student/dashboard"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="link-icon">📊</span>
                <span>{t('navDashboard')}</span>
              </NavLink>
              <NavLink
                to="/student/learn"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="link-icon">🚀</span>
                <span>{t('navJourney')}</span>
              </NavLink>
              <NavLink
                to="/student/concept-map"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="link-icon">🗺️</span>
                <span>{t('navConceptMap')}</span>
              </NavLink>
              <NavLink
                to="/student/report"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="link-icon">📄</span>
                <span>{t('navReport')}</span>
              </NavLink>
              <NavLink
                to="/select-profile"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="link-icon">⚙️</span>
                <span>{language === 'hi' ? 'भूमिका व प्रोफ़ाइल' : 'Role & Profile'}</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/teacher"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="link-icon">👩‍🏫</span>
                <span>{t('navTeacherDashboard')}</span>
              </NavLink>
              <NavLink
                to="/student/dashboard"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="link-icon">👀</span>
                <span>{language === 'hi' ? 'छात्र व्यू देखें' : 'View Student View'}</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* Drawer Footer Actions */}
        <div className="sidebar-drawer-actions">
          {/* Language Switch */}
          <div className="drawer-lang-row">
            <span className="drawer-sublabel">{language === 'hi' ? 'भाषा:' : 'Language:'}</span>
            <div className="drawer-lang-btns">
              <button
                type="button"
                className={`drawer-mini-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                English
              </button>
              <button
                type="button"
                className={`drawer-mini-btn ${language === 'hi' ? 'active' : ''}`}
                onClick={() => setLanguage('hi')}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div className="drawer-action-buttons">
            <button
              type="button"
              className="drawer-mini-btn btn-outline"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Neon Dark Mode'}
            </button>
            <button
              type="button"
              className="drawer-mini-btn btn-outline"
              onClick={() => {
                onClose();
                setIsResetModalOpen(true);
              }}
            >
              🔄 {t('resetData')}
            </button>
          </div>

          <div className="curriculum-badge">
            <span>🇮🇳 NCERT Aligned</span>
            <small>Classes 6–10 Mathematics & Science</small>
          </div>
        </div>
      </aside>
    </>
  );
}
