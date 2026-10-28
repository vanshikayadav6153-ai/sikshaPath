/**
 * SikshaPath - Concept-Gap Map Page
 * Full visual topic map showing 3 clear states: Not Checked, Practising, Understood
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ConceptMap from '../components/ConceptMap';

export default function ConceptGapMapPage() {
  const { currentStudent, language, t } = useApp();
  const navigate = useNavigate();

  const topicProgress = currentStudent?.topicProgress?.fractions || {};
  const hasDiag = topicProgress.diagnosticScore != null;

  return (
    <div className="concept-gap-page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">
            {language === 'hi' ? 'कक्षा 6 गणित' : 'Class 6 Mathematics'} &middot;{' '}
            {language === 'hi' ? 'अध्याय 7: भिन्न' : 'Chapter 7: Fractions'}
          </span>
          <h1 className="page-title">
            🗺️ {language === 'hi' ? 'अवधारणा मानचित्र (Concept-Gap Map)' : 'Concept-Gap Mastery Map'}
          </h1>
          <p className="page-desc">
            {language === 'hi'
              ? 'तीन स्पष्ट स्थितियाँ: जाँच नहीं हुई (Not Checked), अभ्यास जारी (Practising), और समझ गया (Understood)।'
              : 'Visual map tracking student understanding across six fraction sub-concepts. Colors update from actual quiz results.'}
          </p>
        </div>

        {currentStudent && (
          <div className="current-student-badge">
            <span className="badge-avatar">{currentStudent.avatar}</span>
            <div>
              <strong>{currentStudent.name}</strong>
              <small>
                {language === 'hi' ? currentStudent.personaLabelHi : currentStudent.personaLabel}
              </small>
            </div>
          </div>
        )}
      </div>

      {/* Prerequisite Node Banner */}
      <div className="prereq-banner">
        <div className="prereq-item done">
          <span className="prereq-icon">✅</span>
          <div>
            <strong>{language === 'hi' ? 'पूर्व-शर्त: पूर्ण संख्याएँ' : 'Prerequisite: Whole Numbers'}</strong>
            <small>{language === 'hi' ? 'प्रमाणित दक्षता (80%+)' : 'Mastered (80%+)'}</small>
          </div>
        </div>
        <div className="prereq-arrow">&rarr;</div>
        <div className="prereq-item active">
          <span className="prereq-icon">📍</span>
          <div>
            <strong>{language === 'hi' ? 'वर्तमान: भिन्न' : 'Current: Fractions'}</strong>
            <small>
              {topicProgress.status === 'understood'
                ? language === 'hi' ? 'समझ गया' : 'Understood'
                : topicProgress.status === 'practising'
                ? language === 'hi' ? 'अभ्यास जारी' : 'Practising'
                : language === 'hi' ? 'जाँच नहीं हुई' : 'Not Checked'}
            </small>
          </div>
        </div>
        <div className="prereq-arrow">&rarr;</div>
        <div className="prereq-item upcoming">
          <span className="prereq-icon">🔒</span>
          <div>
            <strong>{language === 'hi' ? 'अगला: दशमलव' : 'Next: Decimals'}</strong>
            <small>{language === 'hi' ? 'भिन्न पूर्ण होने पर' : 'Unlocked after Fractions'}</small>
          </div>
        </div>
      </div>

      {/* Visual Concept Map */}
      <ConceptMap
        topicId="fractions"
        topicProgress={topicProgress}
        language={language}
        onSelectConcept={(conceptKey) => {}}
      />

      {/* Bottom Action Footer */}
      <div className="map-bottom-bar">
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
          onClick={() => navigate('/student/learn')}
        >
          {language === 'hi' ? 'सीखने की यात्रा जारी रखें' : 'Continue Learning Journey'} &rarr;
        </button>
      </div>
    </div>
  );
}

