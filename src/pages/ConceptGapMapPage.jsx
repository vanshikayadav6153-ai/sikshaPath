/**
 * SikshaPath - Concept-Gap Map Page
 * Full visual topic map showing 3 clear states: Not Checked, Practising, Understood
 * Multi-chapter support for NCERT Class 6 Mathematics.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ConceptMap from '../components/ConceptMap';
import subjects from '../data/subjects';

export default function ConceptGapMapPage() {
  const { currentStudent, language } = useApp();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const class6Topics = subjects.mathematics?.classes?.[6]?.topics || [];
  const initialTopic = searchParams.get('topic') || currentStudent?.currentTopic || 'fractions';
  const [selectedTopicId, setSelectedTopicId] = useState(initialTopic);

  useEffect(() => {
    const qTopic = searchParams.get('topic');
    if (qTopic && qTopic !== selectedTopicId) {
      setSelectedTopicId(qTopic);
    }
  }, [searchParams, selectedTopicId]);

  const currentTopic = class6Topics.find((t) => t.id === selectedTopicId) || class6Topics[0] || {
    id: 'fractions',
    name: 'Fractions',
    nameHi: 'भिन्न',
    chapterNumber: 7
  };

  const topicProgress = currentStudent?.topicProgress?.[selectedTopicId] || {};

  return (
    <div className="concept-gap-page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">
            {language === 'hi' ? 'कक्षा 6 गणित' : 'Class 6 Mathematics'} &middot;{' '}
            {language === 'hi'
              ? `अध्याय ${currentTopic.chapterNumber || 7}: ${currentTopic.nameHi}`
              : `Chapter ${currentTopic.chapterNumber || 7}: ${currentTopic.name}`}
          </span>
          <h1 className="page-title">
            🗺️ {language === 'hi' ? 'अवधारणा मानचित्र (Concept-Gap Map)' : 'Concept-Gap Mastery Map'}
          </h1>
          <p className="page-desc">
            {language === 'hi'
              ? 'तीन स्पष्ट स्थितियाँ: जाँच नहीं हुई (Not Checked), अभ्यास जारी (Practising), और समझ गया (Understood)।'
              : 'Visual map tracking student understanding across NCERT sub-concepts. Colors update from actual quiz results.'}
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

      {/* NCERT Class 6 Chapter Switcher Strip */}
      <div className="journey-topic-strip" style={{ marginBottom: '1.5rem' }}>
        <div className="topic-strip-header">
          <span className="topic-strip-label">
            📚 {language === 'hi' ? 'NCERT कक्षा 6 गणित अध्याय चुनें:' : 'Select NCERT Class 6 Mathematics Chapter:'}
          </span>
          <span className="topic-strip-hint">
            {language === 'hi' ? 'अवधारणाओं का मैप देखने के लिए क्लिक करें' : 'Click to inspect concept tree'}
          </span>
        </div>
        <div className="topic-strip-pills">
          {class6Topics.map((top) => (
            <button
              key={top.id}
              type="button"
              className={`topic-pill ${selectedTopicId === top.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedTopicId(top.id);
                setSearchParams({ topic: top.id }, { replace: true });
              }}
            >
              <span className="top-icon">{top.icon || '📖'}</span>
              <span className="top-name">{language === 'hi' ? top.nameHi : top.name}</span>
              {top.chapterNumber && (
                <span className="top-ch-tag">Ch {top.chapterNumber}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Prerequisite Node Banner */}
      <div className="prereq-banner">
        <div className="prereq-item done">
          <span className="prereq-icon">✅</span>
          <div>
            <strong>
              {language === 'hi'
                ? `पूर्व-शर्त: ${currentTopic.prerequisites?.[0] || 'बुनियादी अंकगणित'}`
                : `Prerequisite: ${currentTopic.prerequisites?.[0] || 'Basic Arithmetic'}`}
            </strong>
            <small>{language === 'hi' ? 'प्रमाणित दक्षता (80%+)' : 'Mastered (80%+)'}</small>
          </div>
        </div>
        <div className="prereq-arrow">&rarr;</div>
        <div className="prereq-item active">
          <span className="prereq-icon">{currentTopic.icon || '📍'}</span>
          <div>
            <strong>
              {language === 'hi'
                ? `वर्तमान: ${currentTopic.nameHi}`
                : `Current: ${currentTopic.name}`}
            </strong>
            <small>
              {topicProgress.status === 'understood'
                ? language === 'hi' ? 'समझ गया (Understood)' : 'Understood'
                : topicProgress.status === 'practising'
                ? language === 'hi' ? 'अभ्यास जारी (Practising)' : 'Practising'
                : language === 'hi' ? 'जाँच नहीं हुई (Not Checked)' : 'Not Checked'}
            </small>
          </div>
        </div>
        <div className="prereq-arrow">&rarr;</div>
        <div className="prereq-item upcoming">
          <span className="prereq-icon">🔒</span>
          <div>
            <strong>
              {language === 'hi' ? 'अगला: अगला NCERT अध्याय' : 'Next: Next NCERT Chapter'}
            </strong>
            <small>{language === 'hi' ? 'वर्तमान पूर्ण होने पर' : 'Unlocked after current'}</small>
          </div>
        </div>
      </div>

      {/* Visual Concept Map */}
      <ConceptMap
        topicId={selectedTopicId}
        topicProgress={topicProgress}
        language={language}
        onSelectConcept={() => {}}
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
          onClick={() => navigate(`/student/learn?topic=${selectedTopicId}`)}
        >
          {language === 'hi'
            ? `इस अध्याय की शिक्षण यात्रा शुरू करें (${currentTopic.nameHi})`
            : `Start Learning Journey (${currentTopic.name})`} &rarr;
        </button>
      </div>
    </div>
  );
}
