/**
 * SikshaPath - Teacher Dashboard
 * Comprehensive educator console for monitoring class-wide concept mastery,
 * identifying struggling vs advanced students, inspecting individual learner profiles,
 * and applying pedagogical recommendation overrides.
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getRecommendation } from '../engine/recommendationEngine';
import TeacherOverrideModal from '../components/TeacherOverrideModal';
import ConceptMap from '../components/ConceptMap';

export default function TeacherDashboard() {
  const { students, language, setCurrentStudentId, setRole, t } = useApp();

  // Selected student for inspection in detail modal/drawer
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || 'student-1');
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [filterPersona, setFilterPersona] = useState('all'); // 'all' | 'struggling' | 'on-track' | 'advanced'

  const selectedStudent = useMemo(() => {
    return students.find((s) => s.id === selectedStudentId) || students[0];
  }, [students, selectedStudentId]);

  // Filtered student list
  const filteredStudents = useMemo(() => {
    if (filterPersona === 'all') return students;
    return students.filter((s) => s.learningPersona === filterPersona);
  }, [students, filterPersona]);

  // Class analytics
  const classStats = useMemo(() => {
    const total = students.length;
    let sumScore = 0;
    let scoreCount = 0;
    let strugglingCount = 0;
    let advancedCount = 0;

    students.forEach((stu) => {
      const diag = stu.topicProgress?.fractions?.diagnosticScore;
      if (diag != null) {
        sumScore += diag;
        scoreCount++;
      }
      if (stu.learningPersona === 'struggling' || (diag != null && diag < 50)) {
        strugglingCount++;
      }
      if (stu.learningPersona === 'advanced' || (diag != null && diag >= 80)) {
        advancedCount++;
      }
    });

    const average = scoreCount > 0 ? Math.round(sumScore / scoreCount) : 0;
    return { total, average, strugglingCount, advancedCount };
  }, [students]);

  // Concept performance across the class
  const classConceptMastery = useMemo(() => {
    const conceptKeys = [
      { key: 'numerator-denominator', name: 'Numerator & Denominator', nameHi: 'अंश और हर' },
      { key: 'types-of-fractions', name: 'Types of Fractions', nameHi: 'भिन्नों के प्रकार' },
      { key: 'equivalent-fractions', name: 'Equivalent Fractions', nameHi: 'तुल्य भिन्न' },
      { key: 'comparing-fractions', name: 'Comparing Fractions', nameHi: 'भिन्नों की तुलना' },
      { key: 'addition-subtraction-fractions', name: 'Addition & Subtraction', nameHi: 'भिन्न जोड़ व घटाव' },
      { key: 'fraction-word-problems', name: 'Word Problems', nameHi: 'इबारती प्रश्न' }
    ];

    return conceptKeys.map((c) => {
      let sum = 0;
      let count = 0;
      students.forEach((s) => {
        const mastery = s.topicProgress?.fractions?.conceptMastery?.[c.key];
        if (mastery != null) {
          sum += mastery;
          count++;
        }
      });
      const avg = count > 0 ? Math.round(sum / count) : 0;
      return { ...c, average: avg };
    });
  }, [students]);

  // Common misconceptions across the class
  const commonMisconceptions = [
    {
      title: 'Adding Denominators Directly',
      titleHi: 'हरों को सीधे जोड़ देना',
      desc: 'Students often add both numerators and denominators (e.g. 1/3 + 1/3 = 2/6 instead of 2/3).',
      descHi: 'छात्र अक्सर अंश और हर दोनों को जोड़ देते हैं (जैसे 1/3 + 1/3 = 2/6 लिखना बजाय 2/3 के)।',
      affected: 'Aarav Sharma & 1 other student'
    },
    {
      title: 'Ignoring LCM for Unlike Fractions',
      titleHi: 'असमान हरों में ल.स.प. (LCM) भूल जाना',
      desc: 'Students struggle to find equivalent fractions before adding fractions with different denominators.',
      descHi: 'विभिन्न हर होने पर पहले तुल्य भिन्न बनाना और ल.स.प. निकालना भूल जाते हैं।',
      affected: 'Aarav Sharma'
    },
    {
      title: 'Equivalent Fractions Cross-Multiplying Confusion',
      titleHi: 'तुल्य भिन्न में अंश/हर के समान गुणन की समझ',
      desc: 'Multiplying numerator without multiplying denominator by the same scalar.',
      descHi: 'अंश को किसी संख्या से गुणा करते समय हर को उसी संख्या से गुणा न करना।',
      affected: 'Aarav Sharma'
    }
  ];

  // Inspect student recommendation
  const inspectRecommendation = useMemo(() => {
    if (!selectedStudent) return null;
    return getRecommendation(selectedStudent, 'mathematics', 'fractions');
  }, [selectedStudent]);

  return (
    <div className="teacher-dashboard">
      {/* Header */}
      <header className="teacher-header">
        <div>
          <span className="teacher-badge">👩‍🏫 {t('roleTeacher')}</span>
          <h1>{language === 'hi' ? 'कक्षा 6 गणित — शिक्षक डैशबोर्ड' : 'Class 6 Mathematics — Teacher Dashboard'}</h1>
          <p className="teacher-sub">
            {language === 'hi'
              ? 'कक्षा के प्रत्येक छात्र की प्रगति देखें, कमजोर संकल्पनाओं की निगरानी करें और आवश्यकतानुसार सिफारिशें बदलें।'
              : 'Monitor class concept mastery, detect learning bottlenecks, and guide student paths with teacher overrides.'}
          </p>
        </div>
      </header>

      {/* KPI Cards Row */}
      <section className="teacher-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon">👥</div>
          <div className="kpi-content">
            <span className="kpi-value">{classStats.total}</span>
            <span className="kpi-label">{t('totalStudents')}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">📊</div>
          <div className="kpi-content">
            <span className="kpi-value">{classStats.average}%</span>
            <span className="kpi-label">{t('classAverage')}</span>
          </div>
        </div>

        <div className="kpi-card alert-card">
          <div className="kpi-icon">⚠️</div>
          <div className="kpi-content">
            <span className="kpi-value">{classStats.strugglingCount}</span>
            <span className="kpi-label">{t('needSupport')}</span>
          </div>
        </div>

        <div className="kpi-card success-card">
          <div className="kpi-icon">🚀</div>
          <div className="kpi-content">
            <span className="kpi-value">{classStats.advancedCount}</span>
            <span className="kpi-label">{t('readyForChallenge')}</span>
          </div>
        </div>
      </section>

      {/* Concept Performance & Common Misconceptions Row */}
      <section className="analytics-two-col">
        {/* Concept Mastery Bars */}
        <div className="analytics-box">
          <div className="box-header">
            <h3>{t('weakConcepts')}</h3>
            <span className="box-tag">Fractions (भिन्न)</span>
          </div>
          <p className="box-sub">
            {language === 'hi'
              ? 'पूरी कक्षा की प्रत्येक अवधारणा में औसत सटीकता:'
              : 'Average accuracy achieved across all demo students in Class 6:'}
          </p>

          <div className="concept-bars-list">
            {classConceptMastery.map((c) => {
              const isLow = c.average < 50;
              return (
                <div key={c.key} className="concept-bar-item">
                  <div className="bar-labels">
                    <span className="bar-title">
                      {isLow && '⚠️ '}
                      {language === 'hi' ? c.nameHi : c.name}
                    </span>
                    <strong className={`bar-pct ${isLow ? 'text-danger' : ''}`}>{c.average}%</strong>
                  </div>
                  <div className="bar-track">
                    <div
                      className={`bar-fill ${c.average >= 80 ? 'high' : c.average >= 50 ? 'mid' : 'low'}`}
                      style={{ width: `${c.average}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Common Misconceptions */}
        <div className="analytics-box">
          <div className="box-header">
            <h3>{t('commonMistakes')}</h3>
            <span className="box-tag">NCERT Class 6</span>
          </div>
          <p className="box-sub">
            {language === 'hi'
              ? 'प्रश्नों में छात्रों द्वारा बार-बार दोहराई गई भ्रांतियाँ:'
              : 'Repeated diagnostic and practice error patterns:'}
          </p>

          <div className="misconceptions-list">
            {commonMisconceptions.map((m, idx) => (
              <div key={idx} className="misconception-card">
                <div className="m-title">
                  <span>📌</span>
                  <strong>{language === 'hi' ? m.titleHi : m.title}</strong>
                </div>
                <p className="m-desc">{language === 'hi' ? m.descHi : m.desc}</p>
                <div className="m-affected">
                  <small>
                    {language === 'hi' ? 'प्रभावित छात्र:' : 'Affected student:'} {m.affected}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Student Roster Table with Filter */}
      <section className="roster-section">
        <div className="roster-header">
          <div>
            <h2>{t('studentRoster')}</h2>
            <p className="roster-sub">
              {language === 'hi'
                ? 'छात्र पर क्लिक करके उसकी विस्तृत रिपोर्ट देखें या सिफारिश ओवरराइड करें।'
                : 'Click any student row to inspect their concept-gap map, quiz attempts, and override recommendations.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="filter-pills-group">
            <button
              type="button"
              className={`filter-pill ${filterPersona === 'all' ? 'active' : ''}`}
              onClick={() => setFilterPersona('all')}
            >
              {language === 'hi' ? 'सभी छात्र' : 'All Students'} ({students.length})
            </button>
            <button
              type="button"
              className={`filter-pill ${filterPersona === 'struggling' ? 'active' : ''}`}
              onClick={() => setFilterPersona('struggling')}
            >
              ⚠️ {language === 'hi' ? 'बुनियादी सहायता' : 'Needs Support'}
            </button>
            <button
              type="button"
              className={`filter-pill ${filterPersona === 'on-track' ? 'active' : ''}`}
              onClick={() => setFilterPersona('on-track')}
            >
              👍 {language === 'hi' ? 'सही दिशा में' : 'On-Track'}
            </button>
            <button
              type="button"
              className={`filter-pill ${filterPersona === 'advanced' ? 'active' : ''}`}
              onClick={() => setFilterPersona('advanced')}
            >
              🚀 {language === 'hi' ? 'उन्नत छात्र' : 'Advanced'}
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="roster-table">
            <thead>
              <tr>
                <th>{language === 'hi' ? 'छात्र' : 'Student'}</th>
                <th>{language === 'hi' ? 'प्रोफ़ाइल' : 'Persona'}</th>
                <th>{language === 'hi' ? 'डायग्नोस्टिक' : 'Diagnostic'}</th>
                <th>{language === 'hi' ? 'अभ्यास' : 'Practice'}</th>
                <th>{language === 'hi' ? 'स्थिति' : 'Topic Status'}</th>
                <th>{language === 'hi' ? 'वर्तमान अनुशंसा' : 'Active Recommendation'}</th>
                <th>{language === 'hi' ? 'कार्रवाई' : 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((stu) => {
                const diag = stu.topicProgress?.fractions?.diagnosticScore;
                const practiceCount = stu.topicProgress?.fractions?.practiceAttempts || 0;
                const status = stu.topicProgress?.fractions?.status || 'not-checked';
                const hasOverride = !!stu.teacherOverride?.fractions;
                const isSelected = stu.id === selectedStudentId;

                return (
                  <tr
                    key={stu.id}
                    className={`roster-row ${isSelected ? 'row-selected' : ''}`}
                    onClick={() => setSelectedStudentId(stu.id)}
                  >
                    <td>
                      <div className="student-cell">
                        <span className="stu-avatar">{stu.avatar}</span>
                        <div>
                          <strong>{stu.name}</strong>
                          <span className="stu-class">Class {stu.class}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`persona-tag ${stu.learningPersona}`}>
                        {language === 'hi' ? stu.personaLabelHi : stu.personaLabel}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`score-pill ${
                          diag >= 80 ? 'score-high' : diag >= 50 ? 'score-mid' : 'score-low'
                        }`}
                      >
                        {diag != null ? `${diag}%` : '—'}
                      </span>
                    </td>
                    <td>{practiceCount} sessions</td>
                    <td>
                      <span
                        className={`status-pill ${
                          status === 'understood'
                            ? 'pill-success'
                            : status === 'practising'
                            ? 'pill-warning'
                            : 'pill-neutral'
                        }`}
                      >
                        {status === 'understood'
                          ? language === 'hi' ? 'समझ गया' : 'Understood'
                          : status === 'practising'
                          ? language === 'hi' ? 'अभ्यास जारी' : 'Practising'
                          : language === 'hi' ? 'जाँच नहीं हुई' : 'Not Checked'}
                      </span>
                    </td>
                    <td>
                      {hasOverride ? (
                        <span className="override-active-pill">
                          👩‍🏫 {stu.teacherOverride.fractions.action.toUpperCase()}
                        </span>
                      ) : (
                        <span className="auto-rec-pill">
                          🤖 {stu.learningPersona === 'struggling'
                            ? 'REVISION'
                            : stu.learningPersona === 'on-track'
                            ? 'PRACTICE'
                            : 'CHALLENGE'}
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudentId(stu.id);
                          setIsOverrideModalOpen(true);
                        }}
                      >
                        ✏️ {t('overrideRecommendation')}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Selected Student Detail Inspector Panel */}
      {selectedStudent && (
        <section className="student-detail-panel">
          <div className="detail-panel-header">
            <div className="detail-header-left">
              <span className="detail-avatar">{selectedStudent.avatar}</span>
              <div>
                <h2>{selectedStudent.name}</h2>
                <p>
                  Class {selectedStudent.class} &middot;{' '}
                  {language === 'hi' ? selectedStudent.personaLabelHi : selectedStudent.personaLabel}
                </p>
              </div>
            </div>

            <div className="detail-header-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsOverrideModalOpen(true)}
              >
                👩‍🏫 {t('overrideRecommendation')}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setCurrentStudentId(selectedStudent.id);
                  setRole('student');
                }}
              >
                👀 {language === 'hi' ? 'छात्र की तरह देखें' : 'View as Student'}
              </button>
            </div>
          </div>

          {/* Current Recommendation Box */}
          <div className="current-rec-box">
            <div className="rec-box-title">
              {inspectRecommendation?.teacherOverride ? (
                <span className="tag-teacher-assigned">👩‍🏫 Teacher Override Active</span>
              ) : (
                <span className="tag-auto">🤖 Automated Engine Recommendation</span>
              )}
            </div>
            <div className="rec-box-body">
              <strong>
                {language === 'hi' ? 'अगला कदम:' : 'Next Assigned Step:'}{' '}
                {inspectRecommendation?.action?.toUpperCase()}
              </strong>
              <p>{language === 'hi' ? inspectRecommendation?.reasonHi : inspectRecommendation?.reason}</p>
            </div>
          </div>

          {/* Student's Concept Map */}
          <div className="detail-concept-map-wrap">
            <h3>{language === 'hi' ? 'अवधारणा मानचित्र (Concept Mastery):' : 'Concept Mastery Map:'}</h3>
            <ConceptMap
              topicId="fractions"
              topicProgress={selectedStudent.topicProgress?.fractions || {}}
              language={language}
            />
          </div>

          {/* Student Quiz History */}
          <div className="detail-history-wrap">
            <h3>{language === 'hi' ? 'हाल का मूल्यांकन इतिहास:' : 'Recent Assessment Attempts:'}</h3>
            {selectedStudent.quizHistory?.length === 0 ? (
              <p>No assessment attempts recorded.</p>
            ) : (
              <div className="history-table-box">
                <table className="roster-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Score</th>
                      <th>Identified Gaps</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudent.quizHistory.map((qh, i) => (
                      <tr key={i}>
                        <td>{new Date(qh.date).toLocaleDateString()}</td>
                        <td>{qh.type.toUpperCase()}</td>
                        <td>
                          <strong>{qh.score}%</strong>
                        </td>
                        <td>
                          {qh.weakConcepts?.length > 0
                            ? qh.weakConcepts.map((c) => c.replace(/-/g, ' ')).join(', ')
                            : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Teacher Override Modal */}
      {selectedStudent && (
        <TeacherOverrideModal
          student={selectedStudent}
          isOpen={isOverrideModalOpen}
          onClose={() => setIsOverrideModalOpen(false)}
        />
      )}
    </div>
  );
}

