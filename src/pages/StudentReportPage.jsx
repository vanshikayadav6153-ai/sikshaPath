/**
 * SikshaPath - Printable Student Progress Report
 * Clean, printable report with concept mastery breakdown,
 * quiz attempts history, recommendations, and print button.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getRecommendation } from '../engine/recommendationEngine';

export default function StudentReportPage() {
  const { currentStudent, language, t } = useApp();
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  if (!currentStudent) {
    return (
      <div className="report-container">
        <p>No student selected.</p>
      </div>
    );
  }

  const topicProgress = currentStudent.topicProgress?.fractions || {};
  const conceptMastery = topicProgress.conceptMastery || {};
  const quizHistory = currentStudent.quizHistory || [];
  const recommendation = getRecommendation(currentStudent, 'mathematics', 'fractions');

  const conceptsList = [
    { id: 'numerator-denominator', name: 'Numerator & Denominator', nameHi: 'अंश और हर' },
    { id: 'types-of-fractions', name: 'Types of Fractions', nameHi: 'भिन्नों के प्रकार' },
    { id: 'equivalent-fractions', name: 'Equivalent Fractions', nameHi: 'तुल्य भिन्न' },
    { id: 'comparing-fractions', name: 'Comparing Fractions', nameHi: 'भिन्नों की तुलना' },
    { id: 'addition-subtraction-fractions', name: 'Addition & Subtraction', nameHi: 'भिन्नों का जोड़ व घटाव' },
    { id: 'fraction-word-problems', name: 'Fraction Word Problems', nameHi: 'इबारती प्रश्न' }
  ];

  return (
    <div className="student-report-page">
      {/* Top action bar (hidden on print) */}
      <div className="report-action-bar no-print">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => navigate('/student/dashboard')}
        >
          &larr; {language === 'hi' ? 'डैशबोर्ड पर वापस' : 'Back to Dashboard'}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handlePrint}
        >
          🖨️ {t('printReport')}
        </button>
      </div>

      {/* Printable Sheet */}
      <div className="printable-report-sheet">
        {/* Document Header */}
        <div className="report-doc-header">
          <div className="header-brand">
            <span className="brand-icon">📐</span>
            <div>
              <h2>SikshaPath — शिक्षापथ</h2>
              <p className="brand-tagline">Learn at Your Pace. Grow with Guidance.</p>
            </div>
          </div>
          <div className="report-meta-box">
            <div>
              <strong>{language === 'hi' ? 'रिपोर्ट तिथि:' : 'Report Date:'}</strong>{' '}
              {new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <div>
              <strong>{language === 'hi' ? 'पाठ्यक्रम:' : 'Curriculum:'}</strong> CBSE / NCERT Class 6
            </div>
          </div>
        </div>

        <hr className="report-divider" />

        {/* Student Profile Card */}
        <div className="report-student-card">
          <div className="student-info-grid">
            <div>
              <span className="label">{language === 'hi' ? 'छात्र का नाम' : 'Student Name'}:</span>
              <strong className="val">{currentStudent.name}</strong>
            </div>
            <div>
              <span className="label">{language === 'hi' ? 'कक्षा' : 'Class'}:</span>
              <strong className="val">Class {currentStudent.class}</strong>
            </div>
            <div>
              <span className="label">{language === 'hi' ? 'विषय' : 'Subject'}:</span>
              <strong className="val">Mathematics (गणित)</strong>
            </div>
            <div>
              <span className="label">{language === 'hi' ? 'शिक्षण प्रोफाइल' : 'Learner Archetype'}:</span>
              <strong className="val">
                {language === 'hi' ? currentStudent.personaLabelHi : currentStudent.personaLabel}
              </strong>
            </div>
          </div>
        </div>

        {/* Topic Mastery Summary */}
        <div className="report-section">
          <h3 className="section-title">
            {language === 'hi' ? 'विषय: भिन्न (Fractions) — समझ का स्तर' : 'Topic: Fractions — Mastery Summary'}
          </h3>

          <div className="summary-boxes-row">
            <div className="summary-box">
              <span className="box-title">{language === 'hi' ? 'डायग्नोस्टिक स्कोर' : 'Diagnostic Score'}</span>
              <strong className="box-val">{topicProgress.diagnosticScore ?? '—'}%</strong>
            </div>
            <div className="summary-box">
              <span className="box-title">{language === 'hi' ? 'अभ्यास सत्र' : 'Practice Sessions'}</span>
              <strong className="box-val">{topicProgress.practiceAttempts || 0}</strong>
            </div>
            <div className="summary-box">
              <span className="box-title">{language === 'hi' ? 'मिनी-टेस्ट स्कोर' : 'Mini-Test Score'}</span>
              <strong className="box-val">{topicProgress.testScore ?? '—'}%</strong>
            </div>
            <div className="summary-box">
              <span className="box-title">{language === 'hi' ? 'स्थिति' : 'Topic Status'}</span>
              <strong className="box-val">
                {topicProgress.status === 'understood'
                  ? language === 'hi' ? 'समझ गया' : 'Understood'
                  : topicProgress.status === 'practising'
                  ? language === 'hi' ? 'अभ्यास जारी' : 'Practising'
                  : language === 'hi' ? 'जाँच नहीं हुई' : 'Not Checked'}
              </strong>
            </div>
          </div>
        </div>

        {/* Concept-by-Concept Table */}
        <div className="report-section">
          <h3 className="section-title">
            {language === 'hi' ? 'अवधारणा-वार दक्षता (Concept Mastery)' : 'Concept-Wise Mastery'}
          </h3>

          <table className="report-table">
            <thead>
              <tr>
                <th>{language === 'hi' ? 'अवधारणा' : 'Concept'}</th>
                <th>{language === 'hi' ? 'दक्षता स्तर' : 'Mastery Level'}</th>
                <th>{language === 'hi' ? 'स्थिति' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {conceptsList.map((c) => {
                const score = conceptMastery[c.id] ?? (topicProgress.diagnosticScore || 0);
                const status =
                  score >= 80 ? 'Understood' : score >= 50 ? 'Practising' : 'Needs Support';

                return (
                  <tr key={c.id}>
                    <td>
                      <strong>{language === 'hi' ? c.nameHi : c.name}</strong>
                    </td>
                    <td>
                      <div className="table-progress-wrap">
                        <div className="table-bar">
                          <div
                            className={`table-fill ${
                              score >= 80 ? 'high' : score >= 50 ? 'mid' : 'low'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="score-text">{score}%</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-chip ${
                          score >= 80 ? 'chip-success' : score >= 50 ? 'chip-warning' : 'chip-danger'
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Recommendation & Teacher Guidance */}
        <div className="report-section">
          <h3 className="section-title">
            {language === 'hi' ? 'अनुकूलित अनुशंसा एवं शिक्षक निर्देश' : 'Adaptive Recommendation & Guidance'}
          </h3>
          <div className="report-guidance-card">
            {recommendation.teacherOverride && (
              <div className="guidance-teacher-tag">
                👩‍🏫 {language === 'hi' ? 'शिक्षक द्वारा प्रत्यक्ष निर्धारित' : 'Teacher Override Active'}
              </div>
            )}
            <p className="guidance-action">
              <strong>{language === 'hi' ? 'अगला कदम:' : 'Next Step:'}</strong>{' '}
              {recommendation.action.toUpperCase()}
            </p>
            <p className="guidance-reason">
              <strong>{language === 'hi' ? 'कारण:' : 'Reason:'}</strong>{' '}
              {language === 'hi' ? recommendation.reasonHi : recommendation.reason}
            </p>
          </div>
        </div>

        {/* Assessment History */}
        <div className="report-section">
          <h3 className="section-title">
            {language === 'hi' ? 'मूल्यांकन इतिहास' : 'Assessment History'}
          </h3>
          {quizHistory.length === 0 ? (
            <p>{language === 'hi' ? 'कोई इतिहास उपलब्ध नहीं है।' : 'No quiz attempts recorded.'}</p>
          ) : (
            <table className="report-table">
              <thead>
                <tr>
                  <th>{language === 'hi' ? 'दिनांक' : 'Date'}</th>
                  <th>{language === 'hi' ? 'प्रकार' : 'Type'}</th>
                  <th>{language === 'hi' ? 'स्कोर' : 'Score'}</th>
                  <th>{language === 'hi' ? 'पहचाने गए कमजोर विषय' : 'Identified Gaps'}</th>
                </tr>
              </thead>
              <tbody>
                {quizHistory.map((q, idx) => (
                  <tr key={idx}>
                    <td>{new Date(q.date).toLocaleDateString()}</td>
                    <td>{q.type.toUpperCase()}</td>
                    <td>
                      <strong>{q.score}%</strong>
                    </td>
                    <td>
                      {q.weakConcepts?.length > 0
                        ? q.weakConcepts.map((c) => c.replace(/-/g, ' ')).join(', ')
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Report Footer */}
        <div className="report-doc-footer">
          <p>
            SikshaPath Learning Analytics &middot; Aligned with Indian School Standards &middot; Generated Locally
          </p>
        </div>
      </div>
    </div>
  );
}

