/**
 * SikshaPath - Interactive Study Notes & Chapter Quiz Bridge
 *
 * Provides:
 * 1. Syllabus topics & explained notes for Classes 6, 7, 8, 9, 10.
 * 2. Bilingual English/Hindi toggle for concept intro, key points, and examples.
 * 3. Direct transition: "After reading chapter notes, students can immediately take quiz / test".
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import curriculumData from '../data/curriculum_with_notes.json';

export default function StudyNotesViewer({ initialClass, onStartQuiz }) {
  const { language, currentStudent } = useApp();
  const navigate = useNavigate();

  // Class Selection: 6, 7, 8, 9, 10 (defaults to student's class or 6)
  const defaultClass = initialClass || currentStudent?.class || 6;
  const [selectedClass, setSelectedClass] = useState(defaultClass);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  // Available classes in curriculum
  const availableClasses = curriculumData.map((c) => c.class);

  // Current class data and chapters
  const currentClassData =
    curriculumData.find((c) => c.class === selectedClass) || curriculumData[0];
  const chapters = currentClassData?.chapters || [];
  const safeChapterIndex = Math.min(selectedChapterIndex, Math.max(0, chapters.length - 1));
  const chapter = chapters[safeChapterIndex] || chapters[0];

  const handleClassChange = (cls) => {
    setSelectedClass(cls);
    setSelectedChapterIndex(0);
  };

  const handleStartChapterQuiz = (stage = 'quick-check') => {
    if (onStartQuiz) {
      onStartQuiz(chapter?.chapter_id || 'fractions', stage);
      return;
    }
    const topicId = chapter?.chapter_id || 'fractions';
    navigate(`/student/learn?topic=${topicId}`);
  };

  if (!chapter) {
    return (
      <div className="study-notes-container" style={{ padding: '2rem', textAlign: 'center' }}>
        <p>{language === 'hi' ? 'कोई पाठ्यक्रम डेटा उपलब्ध नहीं है।' : 'No curriculum data available.'}</p>
      </div>
    );
  }

  return (
    <div className="study-notes-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Header & Class Switcher Strip */}
      <div className="notes-header-strip" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            background: 'rgba(59, 130, 246, 0.12)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#38bdf8',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '0.75rem'
          }}
        >
          <span>📚 {language === 'hi' ? 'एनसीईआरटी पाठ्यक्रम एवं विस्तृत नोट्स' : 'NCERT Syllabus Topics & Study Notes'}</span>
        </div>

        <h1 style={{ fontSize: '2.1rem', margin: '0 0 0.5rem 0' }}>
          {language === 'hi' ? 'गणित अध्ययन नोट्स एवं क्विज़' : 'Mathematics Study Notes & Chapter Quiz'}
        </h1>
        <p style={{ color: 'var(--text-muted, #94a3b8)', maxWidth: '640px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
          {language === 'hi'
            ? 'कक्षा 6 से 10 तक के सभी अध्यायों के विस्तृत नोट्स पढ़ें। नोट्स पूरे होने पर तुरंत अध्याय क्विज़ देकर अपनी समझ परखें।'
            : 'Explore syllabus topics and explained notes for Classes 6 to 10. Complete the notes and jump directly into the chapter quiz!'}
        </p>

        {/* Class Selector Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {availableClasses.map((cls) => (
            <button
              key={cls}
              type="button"
              onClick={() => handleClassChange(cls)}
              style={{
                padding: '0.55rem 1.2rem',
                borderRadius: '12px',
                border: selectedClass === cls ? '2px solid #00F0FF' : '1px solid var(--border, rgba(255,255,255,0.1))',
                background: selectedClass === cls ? 'rgba(0, 240, 255, 0.15)' : 'var(--bg-card, rgba(255,255,255,0.03))',
                color: selectedClass === cls ? '#00F0FF' : 'var(--text-main, #e2e8f0)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Class {cls} {selectedClass === cls && '✓'}
            </button>
          ))}
        </div>

        {/* Chapter Selector Strip */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {chapters.map((chap, idx) => (
            <button
              key={chap.chapter_id || idx}
              type="button"
              onClick={() => setSelectedChapterIndex(idx)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                border: safeChapterIndex === idx ? '1px solid #FF2E93' : '1px solid var(--border, rgba(255,255,255,0.1))',
                background: safeChapterIndex === idx ? 'rgba(255, 46, 147, 0.15)' : 'transparent',
                color: safeChapterIndex === idx ? '#FF2E93' : 'var(--text-muted, #94a3b8)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              📖 {language === 'hi' ? chap.chapter_nameHi : chap.chapter_name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Study Notes Card */}
      <div
        className="clay-card study-notes-card"
        style={{
          background: 'var(--bg-card, #131A2E)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid var(--border, rgba(255,255,255,0.1))',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border, rgba(255,255,255,0.1))', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#38bdf8', fontWeight: 700 }}>
              Class {selectedClass} Mathematics &middot; Chapter {chapter.chapter_number || safeChapterIndex + 1}
            </span>
            <h2 style={{ fontSize: '1.8rem', margin: '0.3rem 0 0 0', color: 'var(--text-main, #f8fafc)' }}>
              {language === 'hi' ? chapter.chapter_nameHi : chapter.chapter_name}
            </h2>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleStartChapterQuiz('quick-check')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.65rem 1.2rem' }}
          >
            <span>📝</span>
            <span>{language === 'hi' ? 'अध्याय क्विज़ दें' : 'Take Chapter Quiz'} &rarr;</span>
          </button>
        </div>

        {/* --- LEARNING BLOCK (STUDY NOTES) --- */}
        <div className="study-notes-block" style={{ marginBottom: '2rem' }}>
          <h3
            style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#38bdf8',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            📚 {language === 'hi' ? 'अध्ययन नोट्स (Study Notes)' : 'Study Notes'}
          </h3>

          {(chapter.syllabus_topics || []).map((topic, index) => {
            const topicTitle = language === 'hi' && topic.topic_nameHi ? topic.topic_nameHi : topic.topic_name;
            const conceptIntro = language === 'hi' && topic.notes.concept_introHi ? topic.notes.concept_introHi : topic.notes.concept_intro;
            const keyPoints = language === 'hi' && topic.notes.key_pointsHi ? topic.notes.key_pointsHi : topic.notes.key_points;
            const exampleText = language === 'hi' && topic.notes.exampleHi ? topic.notes.exampleHi : topic.notes.example;

            return (
              <div
                key={topic.topic_id || index}
                style={{
                  borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))',
                  paddingBottom: '1.5rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.45rem' }}>
                  <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                    {index + 1}
                  </span>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-main, #f1f5f9)' }}>
                    {topicTitle}
                  </h4>
                </div>

                <p style={{ color: 'var(--text-muted, #94a3b8)', fontStyle: 'italic', margin: '0.4rem 0 0.85rem 0', lineHeight: '1.55', fontSize: '0.95rem' }}>
                  {conceptIntro}
                </p>

                <ul style={{ paddingLeft: '1.4rem', margin: '0 0 1rem 0', color: 'var(--text-main, #cbd5e1)', fontSize: '0.92rem', lineHeight: '1.65' }}>
                  {(keyPoints || []).map((pt, i) => (
                    <li key={i} style={{ marginBottom: '0.35rem' }}>{pt}</li>
                  ))}
                </ul>

                {exampleText && (
                  <div
                    style={{
                      marginTop: '0.75rem',
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      color: '#34d399',
                      lineHeight: '1.5'
                    }}
                  >
                    <strong style={{ color: '#10b981' }}>
                      {language === 'hi' ? '💡 उदाहरण (Example):' : '💡 Example:'}
                    </strong>{' '}
                    <span style={{ color: 'var(--text-main, #e2e8f0)' }}>{exampleText}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* --- COMPLETION & CHAPTER QUIZ BRIDGE BANNER --- */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            borderRadius: '16px',
            padding: '1.75rem',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</div>
          <h3 style={{ fontSize: '1.35rem', margin: '0 0 0.5rem 0', color: '#a5b4fc' }}>
            {language === 'hi'
              ? 'अध्याय नोट्स पूरे हो गए! अब अपनी समझ परखें'
              : 'Chapter Notes Complete! Ready to Test Your Understanding?'}
          </h3>
          <p style={{ color: 'var(--text-muted, #94a3b8)', maxWidth: '580px', margin: '0 auto 1.25rem auto', fontSize: '0.92rem' }}>
            {language === 'hi'
              ? 'आपने सभी अवधारणाएँ और उदाहरण पढ़ लिए हैं। अब क्विज़ देकर वास्तविक समझ की जाँच करें और अपनी दैनिक स्ट्रीक (Streak) बढ़ाएँ!'
              : 'You have reviewed the key concepts and worked examples. Jump into the quiz now to record your actual progress and build your streak!'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => handleStartChapterQuiz('quick-check')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>📝</span>
              <span>{language === 'hi' ? 'अध्याय क्विज़ शुरू करें' : 'Start Chapter Quiz'} &rarr;</span>
            </button>

            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={() => handleStartChapterQuiz('practice')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>✏️</span>
              <span>{language === 'hi' ? 'अभ्यास प्रश्न हल करें' : 'Practice Problems'}</span>
            </button>

            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={() => navigate('/student/concept-map')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>🗺️</span>
              <span>{language === 'hi' ? 'कॉन्सेप्ट मैप देखें' : 'View Concept Map'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
