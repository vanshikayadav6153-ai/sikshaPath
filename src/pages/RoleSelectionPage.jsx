/**
 * SikshaPath - Role Selection & Student Profile Page
 * Enables 1-click demo login as Struggling, On-Track, or Advanced learner,
 * switching to Teacher Mode, or customizing/creating a student profile.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import subjects from '../data/subjects';

export default function RoleSelectionPage() {
  const {
    students,
    currentStudent,
    currentStudentId,
    setCurrentStudentId,
    setRole,
    language,
    setLanguage,
    updateStudentData,
    t
  } = useApp();

  const navigate = useNavigate();

  // Custom profile form state
  const [activeTab, setActiveTab] = useState('demo'); // 'demo' | 'customize'
  const [customName, setCustomName] = useState(currentStudent?.name || '');
  const [customClass, setCustomClass] = useState(currentStudent?.class || 6);
  const [customLang, setCustomLang] = useState(currentStudent?.preferredLanguage || language);
  const [customSubject, setCustomSubject] = useState(currentStudent?.subject || 'mathematics');
  const [customTopic, setCustomTopic] = useState(currentStudent?.currentTopic || 'fractions');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Available topics for selected subject & class
  const classTopics =
    subjects[customSubject]?.classes?.[customClass]?.topics || [];

  const handleSelectDemoStudent = (studentId) => {
    setRole('student');
    setCurrentStudentId(studentId);
    navigate('/student/dashboard');
  };

  const handleSelectTeacher = () => {
    setRole('teacher');
    navigate('/teacher');
  };

  const handleSaveCustomProfile = (e) => {
    e.preventDefault();
    if (!customName.trim()) return;

    setLanguage(customLang);

    updateStudentData({
      name: customName.trim(),
      class: Number(customClass),
      preferredLanguage: customLang,
      subject: customSubject,
      currentTopic: customTopic
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setRole('student');
      navigate('/student/dashboard');
    }, 600);
  };

  return (
    <div className="role-selection-page">
      <div className="role-page-header text-center">
        <div className="role-brand-badge">
          <span>📐 SikshaPath — शिक्षापथ</span>
        </div>
        <h1 className="role-page-title">
          {language === 'hi'
            ? 'भूमिका एवं प्रोफ़ाइल चयन'
            : 'Select Your Learning Role & Profile'}
        </h1>
        <p className="role-page-desc">
          {language === 'hi'
            ? 'डेमो खातों में से एक चुनें या अपनी पसंद के अनुसार छात्र प्रोफ़ाइल बनाएँ।'
            : 'Experience the adaptive platform as a student (Struggling, On-Track, Advanced) or enter the Teacher Console.'}
        </p>

        <div className="demo-notice-pill">
          🔒 <strong>{t('demoDataNotice')}</strong>
        </div>
      </div>

      {/* Tabs */}
      <div className="role-nav-tabs">
        <button
          type="button"
          className={`role-nav-tab ${activeTab === 'demo' ? 'active' : ''}`}
          onClick={() => setActiveTab('demo')}
        >
          🎓 {language === 'hi' ? 'डेमो प्रोफाइल (त्वरित चयन)' : 'Demo Personas (1-Click Login)'}
        </button>
        <button
          type="button"
          className={`role-nav-tab ${activeTab === 'customize' ? 'active' : ''}`}
          onClick={() => setActiveTab('customize')}
        >
          ✏️ {language === 'hi' ? 'प्रोफ़ाइल कस्टमाइज़ करें' : 'Customize Student Profile'}
        </button>
      </div>

      {/* Tab 1: Demo Personas */}
      {activeTab === 'demo' && (
        <div className="demo-personas-section">
          <div className="persona-selection-grid">
            {students.map((stu) => {
              const isSelected = stu.id === currentStudentId;
              const isStruggling = stu.learningPersona === 'struggling';
              const isOnTrack = stu.learningPersona === 'on-track';

              return (
                <div
                  key={stu.id}
                  className={`persona-select-card ${isSelected ? 'active-selection' : ''} ${
                    stu.learningPersona
                  }`}
                  onClick={() => handleSelectDemoStudent(stu.id)}
                >
                  <div className="select-card-top">
                    <span className="card-avatar">{stu.avatar}</span>
                    <span className={`persona-type-badge ${stu.learningPersona}`}>
                      {language === 'hi' ? stu.personaLabelHi : stu.personaLabel}
                    </span>
                  </div>

                  <h3 className="card-name">{stu.name}</h3>
                  <p className="card-meta">
                    {language === 'hi' ? 'कक्षा' : 'Class'} {stu.class} &middot;{' '}
                    {stu.subject === 'mathematics'
                      ? language === 'hi' ? 'गणित' : 'Mathematics'
                      : 'Science'}{' '}
                    &middot; {stu.currentTopic}
                  </p>

                  <p className="card-desc">
                    {language === 'hi' ? stu.personaDescriptionHi : stu.personaDescription}
                  </p>

                  <div className="card-kpi-bar">
                    <div className="kpi-item">
                      <span className="kpi-sub">
                        {language === 'hi' ? 'डायग्नोस्टिक' : 'Diagnostic'}:
                      </span>
                      <strong
                        className={`kpi-score ${
                          isStruggling ? 'low' : isOnTrack ? 'mid' : 'high'
                        }`}
                      >
                        {stu.topicProgress?.fractions?.diagnosticScore || 0}%
                      </strong>
                    </div>

                    <div className="kpi-item">
                      <span className="kpi-sub">
                        {language === 'hi' ? 'स्ट्रीक' : 'Streak'}:
                      </span>
                      <strong>{stu.learningStreak} days</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectDemoStudent(stu.id);
                    }}
                  >
                    {language === 'hi'
                      ? `${stu.name} के रूप में प्रवेश करें`
                      : `Enter as ${stu.name}`} &rarr;
                  </button>
                </div>
              );
            })}
          </div>

          {/* Teacher Console Entry Card */}
          <div className="teacher-entry-card" onClick={handleSelectTeacher}>
            <div className="teacher-entry-content">
              <span className="teacher-entry-icon">👩‍🏫</span>
              <div>
                <h3>{language === 'hi' ? 'शिक्षक पोर्टल में प्रवेश करें' : 'Enter as Teacher (Educator Console)'}</h3>
                <p>
                  {language === 'hi'
                    ? 'पूरी कक्षा की प्रगति देखें, कमजोर संकल्पनाओं की पहचान करें और सिफारिशों को ओवरराइड करें।'
                    : 'Inspect whole-class analytics, view concept mastery matrices, and exercise pedagogical control.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectTeacher();
              }}
            >
              👩‍🏫 {t('teacherDashboard')} &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Customize / Edit Student Profile */}
      {activeTab === 'customize' && (
        <div className="customize-profile-card">
          <div className="card-header-simple">
            <h2>{language === 'hi' ? 'छात्र प्रोफ़ाइल विवरण' : 'Student Profile Configuration'}</h2>
            <p>
              {language === 'hi'
                ? 'कक्षा 6 से 10, पसंदीदा भाषा और विषय को आवश्यकतानुसार सेट करें।'
                : 'Configure student grade level (Classes 6–10), preferred language, subject, and topic.'}
            </p>
          </div>

          <form onSubmit={handleSaveCustomProfile} className="profile-form">
            <div className="form-group">
              <label className="form-label">
                {language === 'hi' ? 'छात्र का नाम (Student Name):' : 'Student Full Name:'}
              </label>
              <input
                type="text"
                required
                className="form-input"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Ananya Sen"
              />
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label">
                  {language === 'hi' ? 'कक्षा (Class 6–10):' : 'Class Grade Level:'}
                </label>
                <select
                  className="form-select"
                  value={customClass}
                  onChange={(e) => {
                    const cls = Number(e.target.value);
                    setCustomClass(cls);
                    const newTopics = subjects[customSubject]?.classes?.[cls]?.topics || [];
                    if (newTopics.length > 0) {
                      setCustomTopic(newTopics[0].id);
                    }
                  }}
                >
                  <option value={6}>Class 6 (कक्षा 6)</option>
                  <option value={7}>Class 7 (कक्षा 7)</option>
                  <option value={8}>Class 8 (कक्षा 8)</option>
                  <option value={9}>Class 9 (कक्षा 9)</option>
                  <option value={10}>Class 10 (कक्षा 10)</option>
                </select>
              </div>

              <div className="form-group flex-1">
                <label className="form-label">
                  {language === 'hi' ? 'पसंदीदा भाषा (Preferred Language):' : 'Preferred Language:'}
                </label>
                <select
                  className="form-select"
                  value={customLang}
                  onChange={(e) => setCustomLang(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label">
                  {language === 'hi' ? 'विषय (Subject):' : 'Subject:'}
                </label>
                <select
                  className="form-select"
                  value={customSubject}
                  onChange={(e) => {
                    const sub = e.target.value;
                    setCustomSubject(sub);
                    const newTopics = subjects[sub]?.classes?.[customClass]?.topics || [];
                    if (newTopics.length > 0) {
                      setCustomTopic(newTopics[0].id);
                    }
                  }}
                >
                  <option value="mathematics">
                    {language === 'hi' ? 'गणित (Mathematics)' : 'Mathematics'}
                  </option>
                  <option value="science">
                    {language === 'hi' ? 'विज्ञान (Science)' : 'Science'}
                  </option>
                </select>
              </div>

              <div className="form-group flex-1">
                <label className="form-label">
                  {language === 'hi' ? 'वर्तमान विषय (Current Topic):' : 'Current Topic:'}
                </label>
                <select
                  className="form-select"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                >
                  {classTopics.map((top) => (
                    <option key={top.id} value={top.id}>
                      {language === 'hi' ? top.nameHi : top.name}{' '}
                      {top.fullyImplemented ? '✓ (Active)' : '(Coming Soon)'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {saveSuccess && (
              <div className="alert-success-banner">
                ✓ {language === 'hi' ? 'प्रोफ़ाइल सुरक्षित हो गई! डैशबोर्ड लोड हो रहा है...' : 'Profile updated successfully! Redirecting...'}
              </div>
            )}

            <div className="profile-form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setActiveTab('demo')}
              >
                {t('cancel')}
              </button>
              <button type="submit" className="btn btn-primary btn-lg">
                💾 {language === 'hi' ? 'प्रोफ़ाइल सहेजें एवं आगे बढ़ें' : 'Save Profile & Start Learning'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

