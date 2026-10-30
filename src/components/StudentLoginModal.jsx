/**
 * SikshaPath - Student Login & Switch Account Modal
 *
 * Allows any student to:
 * 1. Log in with their name (or register if new)
 * 2. New logins start strictly with 0% progress, 0 streak, and 0 activities
 * 3. Individual student data is separated and saved in localStorage
 * 4. Switch between multiple student profiles on the same device
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function StudentLoginModal() {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    students,
    currentStudentId,
    setCurrentStudentId,
    loginOrRegisterStudent,
    deleteStudent,
    language,
    t
  } = useApp();

  const navigate = useNavigate();

  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState(6);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  if (!isLoginModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    const res = loginOrRegisterStudent({
      name: studentName.trim(),
      classGrade: studentClass,
      language
    });

    if (res) {
      if (res.isNew) {
        setFeedbackMsg({
          type: 'success',
          text: language === 'hi'
            ? `✨ नया खाता बनाया गया! ${res.student.name} की शुरुआत 0% प्रगति और 0 स्ट्रीक से हुई है।`
            : `✨ New Student Account created! Starting ${res.student.name} with 0% progress and 0 streak.`
        });
      } else {
        setFeedbackMsg({
          type: 'info',
          text: language === 'hi'
            ? `👋 पुनः स्वागत है, ${res.student.name}! आपका सहेजा गया डेटा लोड हो गया।`
            : `👋 Welcome back, ${res.student.name}! Loading your saved progress.`
        });
      }

      setTimeout(() => {
        setIsLoginModalOpen(false);
        setFeedbackMsg(null);
        setStudentName('');
        navigate('/student/dashboard');
      }, 700);
    }
  };

  const handleSelectStudent = (id) => {
    setCurrentStudentId(id);
    setIsLoginModalOpen(false);
    navigate('/student/dashboard');
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsLoginModalOpen(false)}>
      <div
        className="modal-content student-login-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '540px' }}
      >
        <div className="modal-header">
          <div className="modal-icon-badge">🎓</div>
          <div>
            <h3>
              {language === 'hi' ? 'छात्र लॉगिन / नया प्रोफाइल' : 'Student Login / Switch Profile'}
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {language === 'hi'
                ? 'प्रत्येक छात्र का व्यक्तिगत डेटा, प्रगति और स्ट्रीक अलग-अलग सहेजी जाती है।'
                : 'Each student has isolated progress, quiz history, and daily consistency streak.'}
            </p>
          </div>
        </div>

        <div className="modal-body">
          {/* First Time / Zero Progress Guarantee Note */}
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              marginBottom: '1rem',
              fontSize: '0.85rem',
              lineHeight: 1.45
            }}
          >
            🔒 <strong>{language === 'hi' ? 'शून्य शुरुआत गारंटी:' : 'Zero-Start Rule:'}</strong>{' '}
            {language === 'hi'
              ? 'पहली बार लॉगिन करने पर ग्राफ़ 0% और स्ट्रीक 0 रहेगी। जब छात्र वास्तव में टेस्ट व अभ्यास करेगा, तभी प्रगति बढ़ेगी।'
              : 'New logins start at strictly 0% progress and 0 streak. Graph and streaks grow only when the student actually practices.'}
          </div>

          {feedbackMsg && (
            <div
              style={{
                padding: '0.65rem 0.9rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                background:
                  feedbackMsg.type === 'success'
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(59, 130, 246, 0.15)',
                color: feedbackMsg.type === 'success' ? '#10b981' : '#3b82f6',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              {feedbackMsg.text}
            </div>
          )}

          {/* Quick Login Form */}
          <form onSubmit={handleLoginSubmit} style={{ marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '0.85rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  marginBottom: '0.35rem'
                }}
              >
                {language === 'hi' ? 'छात्र का नाम दर्ज करें:' : 'Enter Student Full Name:'}
              </label>
              <input
                type="text"
                required
                className="form-input"
                placeholder={language === 'hi' ? 'उदा. राहुल सिंह' : 'e.g. Rahul Singh'}
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '0.35rem'
                  }}
                >
                  {language === 'hi' ? 'कक्षा (Class 6–10):' : 'Grade Level:'}
                </label>
                <select
                  className="form-select"
                  value={studentClass}
                  onChange={(e) => setStudentClass(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.65rem 0.85rem' }}
                >
                  <option value={6}>Class 6 (कक्षा 6)</option>
                  <option value={7}>Class 7 (कक्षा 7)</option>
                  <option value={8}>Class 8 (कक्षा 8)</option>
                  <option value={9}>Class 9 (कक्षा 9)</option>
                  <option value={10}>Class 10 (कक्षा 10)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem', justifyContent: 'center' }}
            >
              🚀 {language === 'hi' ? 'लॉगिन करें / सीखना शुरू करें' : 'Login / Start Learning'}
            </button>
          </form>

          {/* List of Saved Students on this Device */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <h4
              style={{
                fontSize: '0.9rem',
                margin: '0 0 0.75rem 0',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              👥 {language === 'hi' ? 'इस डिवाइस पर सहेजे गए छात्र:' : 'Saved Students on this Device:'}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto' }}>
              {students.map((stu) => {
                const isCurrent = stu.id === currentStudentId;
                const tpKeys = Object.keys(stu.topicProgress || {});
                const hasWork = tpKeys.length > 0;
                const streak = stu.learningStreak || 0;

                return (
                  <div
                    key={stu.id}
                    onClick={() => handleSelectStudent(stu.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      background: isCurrent ? 'rgba(79, 70, 229, 0.12)' : 'var(--bg-input, rgba(255,255,255,0.03))',
                      border: isCurrent ? '1px solid var(--primary)' : '1px solid var(--border)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>{stu.avatar || '👤'}</span>
                      <div>
                        <strong style={{ fontSize: '0.92rem', display: 'block' }}>
                          {stu.name} {isCurrent && <span style={{ color: 'var(--primary)', fontSize: '0.75rem' }}>(Active)</span>}
                        </strong>
                        <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                          Class {stu.class} &middot; 🔥 {streak} {language === 'hi' ? 'दिन स्ट्रीक' : 'days streak'} &middot;{' '}
                          {hasWork ? (language === 'hi' ? 'प्रगति दर्ज है' : 'Progress active') : (language === 'hi' ? '0% नई शुरुआत' : '0% fresh start')}
                        </small>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectStudent(stu.id);
                        }}
                      >
                        {isCurrent ? (language === 'hi' ? 'सक्रिय' : 'Active') : (language === 'hi' ? 'चुनें' : 'Select')}
                      </button>

                      {students.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-sm"
                          style={{
                            padding: '0.2rem 0.45rem',
                            fontSize: '0.75rem',
                            background: 'transparent',
                            color: 'var(--text-muted)'
                          }}
                          title="Remove profile"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Delete profile for ${stu.name}?`)) {
                              deleteStudent(stu.id);
                            }
                          }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="modal-actions" style={{ justifyContent: 'flex-end', paddingTop: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setIsLoginModalOpen(false)}
          >
            {t('close') || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
