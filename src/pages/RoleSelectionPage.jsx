/**
 * SikshaPath - Role Selection & Student Profile Login Page
 *
 * Ensures:
 * 1. First-time student login starts at 0% progress, 0 streak, and 0 activities.
 * 2. Individual student data is stored separately and persists in localStorage.
 * 3. Daily consistency streak increments only on consecutive active days.
 * 4. Easy switching between students or entering Teacher Console.
 * 5. Optional Evaluator Demo Profiles tab for judges to inspect edge-case mock records.
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
    loginOrRegisterStudent,
    deleteStudent,
    handleLoadEvaluatorData,
    handleResetData,
    setRole,
    language,
    setLanguage,
    t
  } = useApp();

  const navigate = useNavigate();

  // Active view tab: 'login' | 'teacher' | 'evaluator'
  const [activeTab, setActiveTab] = useState('login');

  // Login form state
  const [loginName, setLoginName] = useState('');
  const [loginClass, setLoginClass] = useState(6);
  const [loginLang, setLoginLang] = useState(language);
  const [loginSubject, setLoginSubject] = useState('mathematics');
  const [loginSuccessMsg, setLoginSuccessMsg] = useState(null);

  const handleQuickLogin = (e) => {
    e.preventDefault();
    if (!loginName.trim()) return;

    const res = loginOrRegisterStudent({
      name: loginName.trim(),
      classGrade: loginClass,
      language: loginLang,
      subject: loginSubject
    });

    if (res) {
      if (res.isNew) {
        setLoginSuccessMsg(
          language === 'hi'
            ? `✨ नया छात्र खाता निर्मित! ${res.student.name} की शुरुआत 0% प्रगति और 0 स्ट्रीक से हुई है।`
            : `✨ New Student Account created! ${res.student.name} starts with 0% progress and 0 streak.`
        );
      } else {
        setLoginSuccessMsg(
          language === 'hi'
            ? `👋 स्वागत है, ${res.student.name}! आपका सहेजा गया डेटा लोड हो गया।`
            : `👋 Welcome back, ${res.student.name}! Loading your saved progress.`
        );
      }

      setTimeout(() => {
        navigate('/student/dashboard');
      }, 700);
    }
  };

  const handleSelectExistingStudent = (studentId) => {
    setRole('student');
    setCurrentStudentId(studentId);
    navigate('/student/dashboard');
  };

  const handleSelectTeacher = () => {
    setRole('teacher');
    navigate('/teacher');
  };

  return (
    <div className="role-selection-page">
      <div className="role-page-header text-center">
        <div className="role-brand-badge">
          <span>📐 {language === 'hi' ? 'शिक्षापथ' : 'SikshaPath'}</span>
        </div>
        <h1 className="role-page-title">
          {language === 'hi'
            ? 'छात्र लॉगिन एवं भूमिका चयन'
            : 'Student Login & Learning Role Selection'}
        </h1>
        <p className="role-page-desc">
          {language === 'hi'
            ? 'अपने नाम से लॉगिन करें, पूर्व-सहेजा गया प्रोफाइल चुनें, या शिक्षक पोर्टल में प्रवेश करें।'
            : 'Login with your individual student profile, pick a saved account, or enter the Teacher Console.'}
        </p>

        {/* Zero Progress Guarantee Pill */}
        <div className="demo-notice-pill" style={{ background: 'rgba(59, 130, 246, 0.15)', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
          🔒 <strong>
            {language === 'hi'
              ? 'शून्य शुरुआत नियम: पहली बार लॉगिन करने पर ग्राफ़ 0% रहेगा। केवल वास्तविक अध्ययन व निरंतरता से प्रगति और स्ट्रीक बढ़ेगी।'
              : 'Zero-Start Rule: First-time login starts at strictly 0% progress and 0 streak. Graph grows only through actual learning.'}
          </strong>
        </div>
      </div>

      {/* Tabs */}
      <div className="role-nav-tabs">
        <button
          type="button"
          className={`role-nav-tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          🎓 {language === 'hi' ? 'छात्र लॉगिन / प्रोफाइल' : 'Student Login & Profiles'}
        </button>
        <button
          type="button"
          className={`role-nav-tab ${activeTab === 'teacher' ? 'active' : ''}`}
          onClick={() => setActiveTab('teacher')}
        >
          👩‍🏫 {language === 'hi' ? 'शिक्षक पोर्टल' : 'Teacher Console'}
        </button>
        <button
          type="button"
          className={`role-nav-tab ${activeTab === 'evaluator' ? 'active' : ''}`}
          onClick={() => setActiveTab('evaluator')}
        >
          🧪 {language === 'hi' ? 'मूल्यांकनकर्ता डेमो (Judges)' : 'Evaluator Demo Data'}
        </button>
      </div>

      {/* Tab 1: Student Login & Saved Profiles */}
      {activeTab === 'login' && (
        <div className="student-login-section">
          {/* Quick Login / Create Account Box */}
          <div className="customize-profile-card" style={{ marginBottom: '2.5rem' }}>
            <div className="card-header-simple">
              <h2>
                {language === 'hi'
                  ? '👤 नया छात्र लॉगिन / खाता बनाएँ'
                  : '👤 Student Login / Create Profile'}
              </h2>
              <p>
                {language === 'hi'
                  ? 'अपना नाम और कक्षा दर्ज करें। यदि यह आपका पहला लॉगिन है, तो ग्राफ़ 0% से शुरू होगा।'
                  : 'Enter your name and class. If logging in for the first time, your graph and streak will start at 0%.'}
              </p>
            </div>

            {loginSuccessMsg && (
              <div className="alert-success-banner" style={{ marginBottom: '1.25rem' }}>
                {loginSuccessMsg}
              </div>
            )}

            <form onSubmit={handleQuickLogin} className="profile-form">
              <div className="form-group">
                <label className="form-label">
                  {language === 'hi' ? 'छात्र का पूरा नाम (Full Name):' : 'Student Full Name:'}
                </label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder={language === 'hi' ? 'उदा. राहुल सिंह / Aarav' : 'e.g. Rahul Singh / Aarav'}
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label">
                    {language === 'hi' ? 'कक्षा (Class 6–10):' : 'Class Grade Level:'}
                  </label>
                  <select
                    className="form-select"
                    value={loginClass}
                    onChange={(e) => setLoginClass(Number(e.target.value))}
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
                    {language === 'hi' ? 'पसंदीदा भाषा (Language):' : 'Preferred Language:'}
                  </label>
                  <select
                    className="form-select"
                    value={loginLang}
                    onChange={(e) => {
                      setLoginLang(e.target.value);
                      setLanguage(e.target.value);
                    }}
                  >
                    <option value="en">English (अंग्रेज़ी)</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                  </select>
                </div>
              </div>

              <div className="profile-form-actions">
                <button type="submit" className="btn btn-primary btn-lg">
                  🚀 {language === 'hi' ? 'लॉगिन करें एवं सीखना शुरू करें' : 'Login & Start Learning'} &rarr;
                </button>
              </div>
            </form>
          </div>

          {/* Section: Saved Profiles on this Device */}
          <div className="section-block">
            <h2 className="section-title">
              👥 {language === 'hi' ? 'इस डिवाइस पर सहेजे गए छात्र प्रोफाइल:' : 'Saved Student Profiles on this Device:'}
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              {language === 'hi'
                ? 'प्रत्येक छात्र का व्यक्तिगत डेटा, क्विज़ अंक और स्ट्रीक अलग-अलग सुरक्षित है।'
                : 'Each student has isolated progress data, quiz scores, and consistency streaks.'}
            </p>

            <div className="persona-selection-grid">
              {students.map((stu) => {
                const isSelected = stu.id === currentStudentId;
                const diagScore = stu.topicProgress?.fractions?.diagnosticScore;
                const streak = stu.learningStreak || 0;
                const quizCount = (stu.quizHistory || []).length;

                return (
                  <div
                    key={stu.id}
                    className={`persona-select-card ${isSelected ? 'active-selection' : ''}`}
                    onClick={() => handleSelectExistingStudent(stu.id)}
                  >
                    <div className="select-card-top">
                      <span className="card-avatar">{stu.avatar || '👤'}</span>
                      <span className="persona-type-badge on-track">
                        Class {stu.class}
                      </span>
                    </div>

                    <h3 className="card-name">{stu.name}</h3>
                    <p className="card-meta">
                      {stu.subject === 'mathematics'
                        ? language === 'hi' ? 'गणित' : 'Mathematics'
                        : 'Science'}{' '}
                      &middot; NCERT Class {stu.class}
                    </p>

                    <p className="card-desc">
                      {language === 'hi' ? stu.personaDescriptionHi : stu.personaDescription}
                    </p>

                    <div className="card-kpi-bar">
                      <div className="kpi-item">
                        <span className="kpi-sub">
                          {language === 'hi' ? 'डायग्नोस्टिक' : 'Diagnostic'}:
                        </span>
                        <strong className="kpi-score mid">
                          {diagScore != null ? `${diagScore}%` : '0%'}
                        </strong>
                      </div>

                      <div className="kpi-item">
                        <span className="kpi-sub">
                          {language === 'hi' ? 'स्ट्रीक' : 'Streak'}:
                        </span>
                        <strong>🔥 {streak} {language === 'hi' ? 'दिन' : 'days'}</strong>
                      </div>

                      <div className="kpi-item">
                        <span className="kpi-sub">
                          {language === 'hi' ? 'क्विज़' : 'Quizzes'}:
                        </span>
                        <strong>{quizCount}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectExistingStudent(stu.id);
                        }}
                      >
                        {isSelected
                          ? language === 'hi' ? '✓ सक्रिय प्रोफ़ाइल' : '✓ Active Profile'
                          : language === 'hi' ? 'प्रवेश करें &rarr;' : 'Enter &rarr;'}
                      </button>

                      {students.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-outline"
                          style={{ padding: '0.4rem 0.6rem' }}
                          title="Delete profile"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Delete profile for ${stu.name}?`)) {
                              deleteStudent(stu.id);
                            }
                          }}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Teacher Portal Entry */}
      {activeTab === 'teacher' && (
        <div className="teacher-section-wrapper">
          <div className="teacher-entry-card" onClick={handleSelectTeacher} style={{ cursor: 'pointer' }}>
            <div className="teacher-entry-content">
              <span className="teacher-entry-icon">👩‍🏫</span>
              <div>
                <h3>
                  {language === 'hi'
                    ? 'शिक्षक पोर्टल में प्रवेश करें (Educator Console)'
                    : 'Enter as Teacher (Educator Console)'}
                </h3>
                <p>
                  {language === 'hi'
                    ? 'पूरी कक्षा की प्रगति देखें, कमजोर संकल्पनाओं की पहचान करें और सिफारिशों को ओवरराइड करें।'
                    : 'Inspect whole-class analytics, view concept mastery matrices, and exercise pedagogical control over AI recommendations.'}
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

      {/* Tab 3: Evaluator Demo Data for Hackathon Judges */}
      {activeTab === 'evaluator' && (
        <div className="customize-profile-card">
          <div className="card-header-simple">
            <h2>
              🧪 {language === 'hi' ? 'मूल्यांकनकर्ता / निर्णायक डेमो डेटा' : 'Evaluator Demo Data for Judges'}
            </h2>
            <p>
              {language === 'hi'
                ? 'यदि निर्णायक बिना परीक्षा दिए विभिन्न शिक्षार्थी श्रेणियों (Struggling, On-Track, Advanced) का परीक्षण करना चाहते हैं:'
                : 'For hackathon judges and reviewers who want to immediately test edge-case personas (Struggling, On-Track, Advanced) without taking live tests.'}
            </p>
          </div>

          <div
            style={{
              padding: '1rem',
              borderRadius: '8px',
              background: 'rgba(234, 179, 8, 0.1)',
              border: '1px solid rgba(234, 179, 8, 0.25)',
              marginBottom: '1.5rem',
              fontSize: '0.9rem'
            }}
          >
            ⚠️ <strong>{language === 'hi' ? 'ध्यान दें:' : 'Notice:'}</strong>{' '}
            {language === 'hi'
              ? 'यह विकल्प नमूना ऐतिहासिक डेटा लोड करता है। वास्तविक छात्रों के लिए डिफ़ॉल्ट रूप से 0% से शुरुआत होती है।'
              : 'This option loads pre-populated historical test records for evaluator preview. By default, real student logins strictly start at 0%.'}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => {
                handleLoadEvaluatorData();
                alert(
                  language === 'hi'
                    ? 'मूल्यांकन नमूना डेटा सफलतापूर्वक लोड हो गया!'
                    : 'Evaluator sample profiles loaded successfully!'
                );
                navigate('/student/dashboard');
              }}
            >
              📥 {language === 'hi' ? 'मूल्यांकन नमूना डेटा लोड करें' : 'Load Sample Evaluator Profiles'}
            </button>

            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={() => {
                handleResetData();
                alert(
                  language === 'hi'
                    ? 'सभी डेटा साफ़! छात्र 0% प्रगति से शुरू होंगे।'
                    : 'All data reset! Students now start fresh with 0% progress.'
                );
                navigate('/student/dashboard');
              }}
            >
              🔄 {language === 'hi' ? 'शून्य स्थिति में रीसेट करें (0%)' : 'Reset to Clean Zero State (0%)'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
