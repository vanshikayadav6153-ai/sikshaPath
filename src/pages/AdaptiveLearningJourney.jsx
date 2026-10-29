/**
 * SikshaPath - Adaptive Learning Journey Page
 * Implements the full 5-stage learning cycle:
 * Stage 1: Quick Check (Diagnostic)
 * Stage 2: Learn (Visual explanations, Fraction Visualizer, Foundation recap)
 * Stage 3: Solve (Interactive practice with hints & step-by-step solutions)
 * Stage 4: Test (Mini-Test assessment)
 * Stage 5: Adapt Next Step (Transparent rule-based path display)
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import questions from '../data/questions';
import fractionsLesson, { lessonsByTopic } from '../data/lessons';
import FractionVisualizer from '../components/FractionVisualizer';
import { getRecommendation } from '../engine/recommendationEngine';
import subjects from '../data/subjects';

export default function AdaptiveLearningJourney() {
  const { currentStudent, language, recordQuizResult, t } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Class 6 NCERT Mathematics Topics
  const class6Topics = useMemo(() => {
    return subjects.mathematics?.classes?.[6]?.topics || [];
  }, []);

  // Active topic in the journey
  const topicParam = searchParams.get('topic') || currentStudent?.currentTopic || 'fractions';
  const [activeTopicId, setActiveTopicId] = useState(topicParam);

  useEffect(() => {
    if (topicParam && topicParam !== activeTopicId) {
      setActiveTopicId(topicParam);
    }
  }, [topicParam]);

  const currentLesson = useMemo(() => {
    return lessonsByTopic[activeTopicId] || fractionsLesson;
  }, [activeTopicId]);

  const handleSelectTopic = (newTopicId) => {
    setActiveTopicId(newTopicId);
    setSearchParams({ stage: currentStage, topic: newTopicId });
    setDiagAnswers({});
    setDiagSubmitted(false);
    setDiagResult(null);
    setTestAnswers({});
    setTestSubmitted(false);
    setTestResult(null);
    setPracticeIndex(0);
    setPracticeAnswer(null);
    setCheckedAnswer(false);
    setShowHint(false);
    setActiveLessonTab('recap');
  };

  // Active stage in the journey
  const stageParam = searchParams.get('stage') || 'quick-check';
  const [currentStage, setCurrentStage] = useState(stageParam);

  useEffect(() => {
    if (stageParam !== currentStage) {
      setCurrentStage(stageParam);
    }
  }, [stageParam]);

  const setStage = (stg) => {
    setCurrentStage(stg);
    setSearchParams({ stage: stg, topic: activeTopicId });
  };

  // -------------------------------------------------------------
  // Filter questions for active topic
  // -------------------------------------------------------------
  const topicQuestions = useMemo(() => {
    const list = questions.filter((q) => q.topic === activeTopicId);
    return list.length > 0 ? list : questions.filter((q) => q.topic === 'fractions');
  }, [activeTopicId]);

  // STAGE 1: QUICK CHECK (Diagnostic) State
  const diagnosticQuestions = useMemo(() => {
    return topicQuestions.filter((q) => q.type === 'diagnostic');
  }, [topicQuestions]);

  const [diagAnswers, setDiagAnswers] = useState({});
  const [diagSubmitted, setDiagSubmitted] = useState(false);
  const [diagResult, setDiagResult] = useState(null);

  const handleSelectDiag = (qId, optionIdx) => {
    if (diagSubmitted) return;
    setDiagAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitDiag = () => {
    let correct = 0;
    const responses = [];
    const weakConceptsList = new Set();

    diagnosticQuestions.forEach((q) => {
      const selected = diagAnswers[q.id];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) {
        correct++;
      } else if (q.concept) {
        weakConceptsList.add(q.concept);
      }
      responses.push({
        questionId: q.id,
        concept: q.concept,
        isCorrect
      });
    });

    const score = Math.round((correct / diagnosticQuestions.length) * 100);
    const resultObj = {
      score,
      correctCount: correct,
      totalQuestions: diagnosticQuestions.length,
      weakConcepts: Array.from(weakConceptsList),
      responses
    };

    setDiagResult(resultObj);
    setDiagSubmitted(true);

    // Save to persistence
    recordQuizResult({
      type: 'diagnostic',
      topic: activeTopicId,
      score,
      totalQuestions: diagnosticQuestions.length,
      correctCount: correct,
      questionResponses: responses,
      weakConcepts: Array.from(weakConceptsList)
    });
  };

  const handleResetDiag = () => {
    setDiagAnswers({});
    setDiagSubmitted(false);
    setDiagResult(null);
  };

  // -------------------------------------------------------------
  // STAGE 2: LEARN State
  // -------------------------------------------------------------
  const [activeLessonTab, setActiveLessonTab] = useState('recap');

  // Check if diagnostic was below 50% to auto-open foundation recap
  const diagScore = currentStudent?.topicProgress?.[activeTopicId]?.diagnosticScore;
  const isStrugglingScore = diagScore != null && diagScore < 50;

  useEffect(() => {
    if (isStrugglingScore) {
      setActiveLessonTab('recap');
    }
  }, [isStrugglingScore]);

  // -------------------------------------------------------------
  // STAGE 3: SOLVE (Practice Questions) State
  // -------------------------------------------------------------
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [checkedAnswer, setCheckedAnswer] = useState(false);
  const [practiceStats, setPracticeStats] = useState({ correct: 0, total: 0 });

  const currentPracticeQ = practiceQuestions[practiceIndex] || practiceQuestions[0];

  const handleCheckPractice = () => {
    if (practiceAnswer == null) return;
    setCheckedAnswer(true);
    const isCorrect = practiceAnswer === currentPracticeQ.correctAnswer;
    setPracticeStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const handleNextPractice = () => {
    setPracticeAnswer(null);
    setCheckedAnswer(false);
    setShowHint(false);
    setPracticeIndex((prev) => (prev + 1) % practiceQuestions.length);
  };

  // -------------------------------------------------------------
  // STAGE 4: TEST (Mini-Test) State
  // -------------------------------------------------------------
  const [testAnswers, setTestAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleSelectTest = (qId, optionIdx) => {
    if (testSubmitted) return;
    setTestAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitTest = () => {
    let correct = 0;
    const responses = [];
    const weakList = new Set();

    testQuestions.forEach((q) => {
      const selected = testAnswers[q.id];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) {
        correct++;
      } else if (q.concept) {
        weakList.add(q.concept);
      }
      responses.push({
        questionId: q.id,
        concept: q.concept,
        isCorrect
      });
    });

    const score = Math.round((correct / testQuestions.length) * 100);
    const res = {
      score,
      correctCount: correct,
      totalQuestions: testQuestions.length,
      weakConcepts: Array.from(weakList),
      responses
    };

    setTestResult(res);
    setTestSubmitted(true);

    // Save to persistence
    recordQuizResult({
      type: 'test',
      topic: activeTopicId,
      score,
      totalQuestions: testQuestions.length,
      correctCount: correct,
      questionResponses: responses,
      weakConcepts: Array.from(weakList)
    });
  };

  const handleResetTest = () => {
    setTestAnswers({});
    setTestSubmitted(false);
    setTestResult(null);
  };

  // -------------------------------------------------------------
  // STAGE 5: ADAPT NEXT STEP
  // -------------------------------------------------------------
  const recommendation = useMemo(() => {
    return getRecommendation(currentStudent, 'mathematics', activeTopicId);
  }, [currentStudent, activeTopicId]);

  return (
    <div className="journey-page">
      {/* Journey Header with 5-Stage Stepper */}
      <header className="journey-header">
        <div className="journey-title-row">
          <div>
            <span className="journey-eyebrow">
              {language === 'hi' ? 'कक्षा 6 गणित (NCERT)' : 'Class 6 Mathematics (NCERT)'} &middot;{' '}
              {language === 'hi' ? currentLesson.titleHi : currentLesson.title}
            </span>
            <h1 className="journey-title">
              {language === 'hi' ? 'अनुकूलित शिक्षण यात्रा' : 'Adaptive Learning Journey'}
            </h1>
          </div>
          {currentStudent && (
            <div className="journey-student-tag">
              <span>{currentStudent.avatar}</span>
              <span>{currentStudent.name}</span>
              <small>({currentStudent.learningPersona})</small>
            </div>
          )}
        </div>

        {/* NCERT Class 6 Chapter Switcher Strip */}
        <div className="journey-topic-strip">
          <div className="topic-strip-header">
            <span className="topic-strip-label">
              📚 {language === 'hi' ? 'NCERT कक्षा 6 गणित अध्याय:' : 'NCERT Class 6 Mathematics Chapters:'}
            </span>
            <span className="topic-strip-hint">
              {language === 'hi' ? 'अध्याय बदलने के लिए क्लिक करें' : 'Click to switch chapter'}
            </span>
          </div>
          <div className="topic-strip-pills">
            {class6Topics.map((top) => (
              <button
                key={top.id}
                type="button"
                className={`topic-pill ${activeTopicId === top.id ? 'active' : ''}`}
                onClick={() => handleSelectTopic(top.id)}
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

        {/* 5-Step Stepper Navigation */}
        <nav className="journey-stepper" aria-label="Learning stages">
          {[
            { id: 'quick-check', num: 1, label: t('stageQuickCheck'), icon: '🔍' },
            { id: 'learn', num: 2, label: t('stageLearn'), icon: '📘' },
            { id: 'solve', num: 3, label: t('stageSolve'), icon: '✏️' },
            { id: 'test', num: 4, label: t('stageTest'), icon: '📝' },
            { id: 'adapt', num: 5, label: t('stageAdapt'), icon: '🎯' }
          ].map((stg) => {
            const isActive = currentStage === stg.id;
            return (
              <button
                key={stg.id}
                type="button"
                className={`step-btn ${isActive ? 'active' : ''}`}
                onClick={() => setStage(stg.id)}
              >
                <div className="step-circle">{stg.icon}</div>
                <div className="step-text">
                  <span className="step-name">{stg.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Stage Content */}
      <main className="journey-content-area">
        {/* ============================================================ */}
        {/* 1. QUICK CHECK (Diagnostic) */}
        {/* ============================================================ */}
        {currentStage === 'quick-check' && (
          <section className="stage-panel quick-check-panel">
            <div className="stage-intro-banner">
              <div className="intro-icon">🔍</div>
              <div>
                <h2>{t('stageQuickCheck')}</h2>
                <p>
                  {language === 'hi'
                    ? `${diagnosticQuestions.length} प्रश्नों का त्वरित डायग्नोस्टिक टेस्ट। यह आपके ज्ञान का आधार निर्धारित करता है और कमजोर अवधारणाओं को पहचानता है।`
                    : `${diagnosticQuestions.length} diagnostic multiple-choice questions assessing core NCERT concepts and prerequisites.`}
                </p>
              </div>
            </div>

            {!diagSubmitted ? (
              <div className="quiz-questions-list">
                {diagnosticQuestions.map((q, idx) => {
                  const selectedOpt = diagAnswers[q.id];
                  const qText = language === 'hi' ? q.questionHi : q.question;
                  const opts = language === 'hi' ? q.optionsHi : q.options;

                  return (
                    <div key={q.id} className="question-card">
                      <div className="question-header">
                        <span className="q-badge">Q{idx + 1}</span>
                        <span className="concept-badge">{q.concept.replace(/-/g, ' ')}</span>
                      </div>
                      <p className="q-prompt">{qText}</p>

                      <div className="options-grid">
                        {opts.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            type="button"
                            className={`option-btn ${selectedOpt === optIdx ? 'selected' : ''}`}
                            onClick={() => handleSelectDiag(q.id, optIdx)}
                          >
                            <span className="option-letter">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="option-text">{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="quiz-submit-bar">
                  <span className="answered-count">
                    {Object.keys(diagAnswers).length} / {diagnosticQuestions.length}{' '}
                    {language === 'hi' ? 'उत्तर दिए गए' : 'questions answered'}
                  </span>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    disabled={Object.keys(diagAnswers).length === 0}
                    onClick={handleSubmitDiag}
                  >
                    {t('submit')} &rarr;
                  </button>
                </div>
              </div>
            ) : (
              /* Diagnostic Result Breakdown */
              <div className="quiz-result-card">
                <div className="result-header">
                  <div className="result-score-circle">
                    <span className="score-big">{diagResult?.score}%</span>
                    <span className="score-sub">
                      {diagResult?.correctCount} / {diagResult?.totalQuestions}{' '}
                      {language === 'hi' ? 'सही' : 'Correct'}
                    </span>
                  </div>

                  <div className="result-analysis">
                    <h3>
                      {diagResult?.score >= 80
                        ? language === 'hi'
                          ? '🌟 उत्कृष्ट समझ!'
                          : '🌟 Strong Baseline Mastery!'
                        : diagResult?.score >= 50
                        ? language === 'hi'
                          ? '👍 अच्छी शुरुआत!'
                          : '👍 Good Starting Foundation!'
                        : language === 'hi'
                        ? '💡 बुनियादी पुनरावलोकन की आवश्यकता'
                        : '💡 Foundation Revision Needed'}
                    </h3>
                    <p>
                      {diagResult?.score < 50
                        ? language === 'hi'
                          ? 'आपका डायग्नोस्टिक स्कोर 50% से कम है। शिक्षापथ अनुशंसा करता है कि पहले सचित्र व्याख्या और फाउंडेशन रीकैप देखें।'
                          : 'Diagnostic score is under 50%. SikshaPath recommends foundation recap and guided visual explanations.'
                        : diagResult?.score < 80
                        ? language === 'hi'
                          ? 'आप बुनियादी बातें जानते हैं! कमजोर विषयों पर कुछ और लक्षित अभ्यास से आप 80%+ तक पहुँच सकते हैं।'
                          : 'Good progress. Targeted practice on weak concepts is recommended next.'
                        : language === 'hi'
                        ? 'बहुत बढ़िया! आप सीधे मिनी-टेस्ट या उन्नत चुनौतियों के लिए तैयार हैं।'
                        : 'Outstanding! You are ready for the mini-test or high-difficulty challenge problems.'}
                    </p>

                    {diagResult?.weakConcepts?.length > 0 && (
                      <div className="weak-concepts-tag-list">
                        <strong>{language === 'hi' ? 'कमजोर विषय:' : 'Identified Concept Gaps:'}</strong>
                        {diagResult.weakConcepts.map((c) => (
                          <span key={c} className="weak-tag">
                            ⚠️ {c.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="result-actions">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleResetDiag}
                  >
                    🔄 {language === 'hi' ? 'पुनः प्रयास करें' : 'Retake Diagnostic'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setStage('learn')}
                  >
                    {language === 'hi' ? 'अगला कदम: सीखें (Learn)' : 'Next Step: Learn'} &rarr;
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ============================================================ */}
        {/* 2. LEARN (Visual Explanations & Modules) */}
        {/* ============================================================ */}
        {currentStage === 'learn' && (
          <section className="stage-panel learn-panel">
            <div className="stage-intro-banner">
              <div className="intro-icon">📘</div>
              <div>
                <h2>{language === 'hi' ? currentLesson.titleHi : currentLesson.title}</h2>
                <p>
                  {language === 'hi'
                    ? (currentLesson.subtitleHi || 'एनसीईआरटी सचित्र व्याख्याएँ, इंटरएक्टिव विज़ुअलाइज़र और कक्षा 6 के लिए सरल भाषा में उदाहरण।')
                    : (currentLesson.subtitle || 'Interactive lesson with visual diagrams, worked examples, and foundation recap.')}
                </p>
              </div>
            </div>

            {/* Lesson Navigation Tabs */}
            <div className="lesson-nav-tabs">
              <button
                type="button"
                className={`lesson-tab ${activeLessonTab === 'recap' ? 'active' : ''}`}
                onClick={() => setActiveLessonTab('recap')}
              >
                🌱 {language === 'hi' ? 'फाउंडेशन रीकैप' : 'Foundation Recap'}
                {isStrugglingScore && <span className="tab-pill">Recommended</span>}
              </button>

              {activeTopicId === 'fractions' && (
                <button
                  type="button"
                  className={`lesson-tab ${activeLessonTab === 'sandbox' ? 'active' : ''}`}
                  onClick={() => setActiveLessonTab('sandbox')}
                >
                  🎨 {language === 'hi' ? 'सचित्र भिन्न लैब' : 'Interactive Visualizer'}
                </button>
              )}

              {currentLesson.modules.map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  className={`lesson-tab ${activeLessonTab === mod.id ? 'active' : ''}`}
                  onClick={() => setActiveLessonTab(mod.id)}
                >
                  {language === 'hi' ? mod.titleHi : mod.title}
                </button>
              ))}
            </div>

            {/* Lesson Tab Content */}
            <div className="lesson-content-card">
              {/* Foundation Recap */}
              {activeLessonTab === 'recap' && currentLesson.foundationRecap && (
                <div className="recap-content">
                  <div className="callout-box info">
                    <h3>{language === 'hi' ? currentLesson.foundationRecap.titleHi : currentLesson.foundationRecap.title}</h3>
                    <p>{language === 'hi' ? currentLesson.foundationRecap.descriptionHi : currentLesson.foundationRecap.description}</p>
                  </div>

                  <div className="recap-points-list">
                    {currentLesson.foundationRecap.keyPoints?.map((pt, i) => (
                      <div key={i} className="recap-point-item">
                        <span className="point-icon">📌</span>
                        <p>{language === 'hi' ? pt.hi : pt.en}</p>
                      </div>
                    ))}
                  </div>

                  {activeTopicId === 'fractions' ? (
                    <div className="recap-visual-box">
                      <FractionVisualizer
                        initialNumerator={1}
                        initialDenominator={4}
                        interactive={true}
                        showControls={false}
                        language={language}
                      />
                      <p className="recap-caption">
                        {language === 'hi'
                          ? currentLesson.foundationRecap.visualExample?.captionHi
                          : currentLesson.foundationRecap.visualExample?.caption}
                      </p>
                    </div>
                  ) : currentLesson.foundationRecap.visualExample ? (
                    <div className="callout-box success recap-extra-box">
                      <strong>💡 {language === 'hi' ? 'स्मरण रखने योग्य बिंदु (Key Rule):' : 'Key Rule to Remember:'}</strong>
                      <p>{language === 'hi' ? currentLesson.foundationRecap.visualExample.captionHi : currentLesson.foundationRecap.visualExample.caption}</p>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Interactive Visualizer Sandbox (Fractions Only) */}
              {activeTopicId === 'fractions' && activeLessonTab === 'sandbox' && (
                <div className="sandbox-tab-content">
                  <p className="sandbox-help-text">
                    {language === 'hi'
                      ? 'स्लाइडर का उपयोग करके अंश (Numerator) और हर (Denominator) बदलें, या सीधे वृत्त/बार के हिस्सों पर क्लिक करें!'
                      : 'Use sliders or click slices to see how changing numerator and denominator alters the fraction in real-time.'}
                  </p>
                  <FractionVisualizer
                    initialNumerator={3}
                    initialDenominator={8}
                    interactive={true}
                    showControls={true}
                    language={language}
                  />
                </div>
              )}

              {/* Individual Concept Modules */}
              {currentLesson.modules.map((mod) => {
                if (activeLessonTab !== mod.id) return null;
                const bulletList = language === 'hi' ? (mod.content?.hi || []) : (mod.content?.en || []);

                return (
                  <div key={mod.id} className="module-content">
                    <h2>{language === 'hi' ? mod.titleHi : mod.title}</h2>
                    <p className="module-summary">{language === 'hi' ? mod.summaryHi : mod.summary}</p>

                    <div className="module-bullets">
                      {bulletList.map((item, idx) => (
                        <div key={idx} className="bullet-item">
                          <span className="bullet-dot">•</span>
                          <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>
                      ))}
                    </div>

                    {/* Worked Example */}
                    {mod.workedExample && (
                      <div className="worked-example-card">
                        <div className="worked-header">
                          <span>📝 {language === 'hi' ? 'हल किया गया उदाहरण (NCERT Worked Example)' : 'NCERT Worked Example'}</span>
                        </div>
                        <p className="worked-problem">
                          <strong>{language === 'hi' ? 'प्रश्न:' : 'Problem:'}</strong>{' '}
                          {language === 'hi' ? mod.workedExample.problemHi : mod.workedExample.problem}
                        </p>
                        <p className="worked-solution">
                          <strong>{language === 'hi' ? 'हल:' : 'Step-by-step Solution:'}</strong>{' '}
                          {language === 'hi' ? mod.workedExample.solutionHi : mod.workedExample.solution}
                        </p>
                      </div>
                    )}

                    {/* Interactive diagram for fractions */}
                    {activeTopicId === 'fractions' && mod.visual && (
                      <div className="module-visual-wrap">
                        <FractionVisualizer
                          initialNumerator={mod.visual.numerator}
                          initialDenominator={mod.visual.denominator}
                          interactive={true}
                          showControls={false}
                          language={language}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="stage-footer-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setStage('quick-check')}
              >
                &larr; {language === 'hi' ? 'Quick Check पर वापस' : 'Back to Quick Check'}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setStage('solve')}
              >
                {language === 'hi' ? 'अगला कदम: अभ्यास करें (Solve)' : 'Next Step: Solve Practice'} &rarr;
              </button>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* 3. SOLVE (Interactive Practice Questions with Hints) */}
        {/* ============================================================ */}
        {currentStage === 'solve' && (
          <section className="stage-panel solve-panel">
            <div className="stage-intro-banner">
              <div className="intro-icon">✏️</div>
              <div>
                <h2>{t('stageSolve')}</h2>
                <p>
                  {language === 'hi'
                    ? 'मार्गदर्शित अभ्यास प्रश्न। यदि आप अटक जाते हैं तो संकेत (Hint) का उपयोग करें और तुरंत चरणबद्ध व्याख्या देखें।'
                    : 'Practice questions with hints, step-by-step solutions, and constructive feedback after each answer.'}
                </p>
              </div>
            </div>

            <div className="practice-tracker-bar">
              <span className="tracker-text">
                {language === 'hi' ? 'प्रश्न' : 'Question'} {practiceIndex + 1} of {practiceQuestions.length}
              </span>
              <span className="practice-score-badge">
                {language === 'hi' ? 'सत्र स्कोर:' : 'Session:'} {practiceStats.correct} / {practiceStats.total}
              </span>
            </div>

            <div className="practice-card">
              <div className="practice-header">
                <span className="concept-pill">{currentPracticeQ.concept.replace(/-/g, ' ')}</span>
                <span className="difficulty-pill">
                  {language === 'hi' ? 'कठिनाई:' : 'Difficulty:'} {currentPracticeQ.difficulty}/3
                </span>
              </div>

              <h3 className="practice-prompt">
                {language === 'hi' ? currentPracticeQ.questionHi : currentPracticeQ.question}
              </h3>

              <div className="options-grid">
                {(language === 'hi' ? currentPracticeQ.optionsHi : currentPracticeQ.options).map(
                  (opt, optIdx) => {
                    const isSelected = practiceAnswer === optIdx;
                    let stateClass = '';
                    if (checkedAnswer) {
                      if (optIdx === currentPracticeQ.correctAnswer) stateClass = 'correct';
                      else if (isSelected) stateClass = 'incorrect';
                    } else if (isSelected) {
                      stateClass = 'selected';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        className={`option-btn ${stateClass}`}
                        onClick={() => {
                          if (!checkedAnswer) setPracticeAnswer(optIdx);
                        }}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + optIdx)}</span>
                        <span className="option-text">{opt}</span>
                      </button>
                    );
                  }
                )}
              </div>

              {/* Hint Accordion */}
              {!checkedAnswer && (
                <div className="hint-section">
                  <button
                    type="button"
                    className="btn-toggle-hint"
                    onClick={() => setShowHint(!showHint)}
                  >
                    💡 {showHint ? t('hideHint') : t('showHint')}
                  </button>
                  {showHint && (
                    <div className="hint-box">
                      <p>{language === 'hi' ? currentPracticeQ.hintHi : currentPracticeQ.hint}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Feedback and Explanation */}
              {checkedAnswer && (
                <div
                  className={`feedback-box ${
                    practiceAnswer === currentPracticeQ.correctAnswer ? 'success' : 'error'
                  }`}
                >
                  <div className="feedback-title">
                    {practiceAnswer === currentPracticeQ.correctAnswer
                      ? language === 'hi'
                        ? '🎉 बिल्कुल सही उत्तर!'
                        : '🎉 Well Done! Correct Answer!'
                      : language === 'hi'
                      ? '❌ उत्तर सही नहीं है — व्याख्या देखें:'
                      : '❌ Not quite right — Learn from this explanation:'}
                  </div>
                  <p className="feedback-explanation">
                    {language === 'hi'
                      ? currentPracticeQ.explanationHi
                      : currentPracticeQ.explanation}
                  </p>
                </div>
              )}

              <div className="practice-action-bar">
                {!checkedAnswer ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={practiceAnswer == null}
                    onClick={handleCheckPractice}
                  >
                    {t('checkAnswer')}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNextPractice}
                  >
                    {practiceIndex + 1 < practiceQuestions.length
                      ? language === 'hi' ? 'अगला प्रश्न' : 'Next Question'
                      : language === 'hi' ? 'अभ्यास पूरा करें' : 'Finish Practice'} &rarr;
                  </button>
                )}
              </div>
            </div>

            <div className="stage-footer-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setStage('learn')}
              >
                &larr; {language === 'hi' ? 'पाठ पर वापस' : 'Back to Lesson'}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setStage('test')}
              >
                {language === 'hi' ? 'मिनी-टेस्ट दें' : 'Take Mini-Test'} &rarr;
              </button>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* 4. TEST (Mini-Test) */}
        {/* ============================================================ */}
        {currentStage === 'test' && (
          <section className="stage-panel test-panel">
            <div className="stage-intro-banner">
              <div className="intro-icon">📝</div>
              <div>
                <h2>{t('stageTest')}</h2>
                <p>
                  {language === 'hi'
                    ? `${testQuestions.length} प्रश्नों की लघु परीक्षा। इसमें इस अध्याय की सभी मुख्य अवधारणाओं के प्रश्न शामिल हैं। अपना स्कोर जाँचें!`
                    : `${testQuestions.length}-question mini-test to measure topic understanding and adapt your next step.`}
                </p>
              </div>
            </div>

            {!testSubmitted ? (
              <div className="quiz-questions-list">
                {testQuestions.map((q, idx) => {
                  const selectedOpt = testAnswers[q.id];
                  return (
                    <div key={q.id} className="question-card">
                      <div className="question-header">
                        <span className="q-badge">Q{idx + 1}</span>
                        <span className="concept-badge">{q.concept.replace(/-/g, ' ')}</span>
                      </div>
                      <p className="q-prompt">{language === 'hi' ? q.questionHi : q.question}</p>

                      <div className="options-grid">
                        {(language === 'hi' ? q.optionsHi : q.options).map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            type="button"
                            className={`option-btn ${selectedOpt === optIdx ? 'selected' : ''}`}
                            onClick={() => handleSelectTest(q.id, optIdx)}
                          >
                            <span className="option-letter">{String.fromCharCode(65 + optIdx)}</span>
                            <span className="option-text">{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="quiz-submit-bar">
                  <span className="answered-count">
                    {Object.keys(testAnswers).length} / {testQuestions.length}{' '}
                    {language === 'hi' ? 'उत्तर दिए गए' : 'questions answered'}
                  </span>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    disabled={Object.keys(testAnswers).length === 0}
                    onClick={handleSubmitTest}
                  >
                    {language === 'hi' ? 'परीक्षा सबमिट करें' : 'Submit Test'} &rarr;
                  </button>
                </div>
              </div>
            ) : (
              /* Mini-Test Result Breakdown */
              <div className="quiz-result-card">
                <div className="result-header">
                  <div className="result-score-circle">
                    <span className="score-big">{testResult?.score}%</span>
                    <span className="score-sub">
                      {testResult?.correctCount} / {testResult?.totalQuestions}{' '}
                      {language === 'hi' ? 'अंक' : 'Score'}
                    </span>
                  </div>

                  <div className="result-analysis">
                    <h3>
                      {testResult?.score >= 80
                        ? language === 'hi'
                          ? '🏆 उत्कृष्ट! विषय पर पूर्ण महारत'
                          : '🏆 Topic Mastered!'
                        : testResult?.score >= 50
                        ? language === 'hi'
                          ? '👍 आंशिक समझ'
                          : '👍 Partial Understanding'
                        : language === 'hi'
                        ? '⚠️ पुनरावलोकन की आवश्यकता'
                        : '⚠️ Needs Targeted Revision'}
                    </h3>
                    <p>
                      {testResult?.score >= 80
                        ? language === 'hi'
                          ? 'बधाई! आपने 80% से अधिक अंक प्राप्त किए। अब आप अगले अध्याय (दशमलव) या उच्च-स्तरीय चुनौती प्रश्नों के लिए तैयार हैं।'
                          : 'Congratulations! You scored ≥ 80%. You have earned the "Understood" status for Fractions.'
                        : language === 'hi'
                        ? 'शिक्षापथ इंजन ने उन विशिष्ट अवधारणाओं की पहचान की है जहाँ गलतियाँ हुईं। नीचे अनुशंसित अगला कदम देखें।'
                        : 'The recommendation engine has evaluated your score. Check the Adapt Next Step tab to see your tailored plan.'}
                    </p>
                  </div>
                </div>

                {/* Question-by-Question Review with Explanations */}
                <div className="test-review-block">
                  <h4>{language === 'hi' ? 'प्रश्नों की समीक्षा एवं व्याख्याएँ:' : 'Question Review & Explanations:'}</h4>
                  {testQuestions.map((q, idx) => {
                    const sel = testAnswers[q.id];
                    const isRight = sel === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`review-item ${isRight ? 'correct-item' : 'incorrect-item'}`}
                      >
                        <div className="review-meta">
                          <span>
                            {isRight ? '✅' : '❌'} Q{idx + 1}:{' '}
                            {language === 'hi' ? q.questionHi : q.question}
                          </span>
                        </div>
                        <div className="review-answer-line">
                          <span>
                            {language === 'hi' ? 'आपका उत्तर:' : 'Your Answer:'}{' '}
                            <strong>
                              {sel != null
                                ? (language === 'hi' ? q.optionsHi : q.options)[sel]
                                : language === 'hi' ? 'उत्तर नहीं दिया' : 'Not answered'}
                            </strong>
                          </span>
                          {!isRight && (
                            <span>
                              &nbsp;&middot; {language === 'hi' ? 'सही उत्तर:' : 'Correct:'}{' '}
                              <strong className="text-success">
                                {(language === 'hi' ? q.optionsHi : q.options)[q.correctAnswer]}
                              </strong>
                            </span>
                          )}
                        </div>
                        <p className="review-expl">
                          💡 {language === 'hi' ? q.explanationHi : q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="result-actions">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleResetTest}
                  >
                    🔄 {language === 'hi' ? 'पुनः परीक्षा दें' : 'Retake Test'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setStage('adapt')}
                  >
                    {language === 'hi' ? 'अगला अनुकूलित कदम देखें' : 'View Adapt Next Step'} &rarr;
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ============================================================ */}
        {/* 5. ADAPT NEXT STEP */}
        {/* ============================================================ */}
        {currentStage === 'adapt' && (
          <section className="stage-panel adapt-panel">
            <div className="stage-intro-banner">
              <div className="intro-icon">🎯</div>
              <div>
                <h2>{t('stageAdapt')}</h2>
                <p>
                  {language === 'hi'
                    ? 'पारदर्शी नियम-आधारित सिफारिश। यह छात्र के वास्तविक उत्तरों और शिक्षक के निर्देशों पर निर्भर करती है।'
                    : 'Transparent rule-based learning path tailored to your demonstrated understanding.'}
                </p>
              </div>
            </div>

            <div className="adapt-recommendation-card">
              {recommendation?.teacherOverride && (
                <div className="teacher-override-banner">
                  👩‍🏫{' '}
                  <strong>
                    {language === 'hi'
                      ? 'शिक्षक द्वारा निर्धारित निर्देश (Teacher Override)'
                      : 'Teacher-Assigned Recommendation'}
                  </strong>
                  <p>
                    {language === 'hi'
                      ? 'इस छात्र के लिए शिक्षक ने स्वचालित नियम को मैन्युअल रूप से अपडेट किया है।'
                      : 'The teacher has pedagogical control and assigned this customized step.'}
                  </p>
                </div>
              )}

              <div className="adapt-action-box">
                <span className="action-large-icon">
                  {recommendation?.action === 'diagnostic'
                    ? '🔍'
                    : recommendation?.action === 'learn' || recommendation?.action === 'revision'
                    ? '📘'
                    : recommendation?.action === 'practice' || recommendation?.action === 'guided-practice'
                    ? '✏️'
                    : recommendation?.action === 'test'
                    ? '📝'
                    : '🚀'}
                </span>

                <div className="action-details">
                  <span className="action-type-pill">
                    {recommendation?.action?.toUpperCase()}
                  </span>
                  <h3>
                    {recommendation?.action === 'diagnostic'
                      ? language === 'hi' ? 'Quick Check लें' : 'Take a Diagnostic Quick Check'
                      : recommendation?.action === 'learn' || recommendation?.action === 'revision'
                      ? language === 'hi' ? 'बुनियादी पुनरावलोकन और सचित्र पाठ' : 'Foundation Recap & Visual Lesson'
                      : recommendation?.action === 'practice' || recommendation?.action === 'guided-practice'
                      ? language === 'hi' ? 'लक्षित अभ्यास प्रश्न' : 'Targeted Practice on Weak Concepts'
                      : recommendation?.action === 'test'
                      ? language === 'hi' ? 'मिनी-टेस्ट देकर समझ प्रमाणित करें' : 'Take Mini-Test Assessment'
                      : language === 'hi' ? 'उन्नत चुनौती और बहु-चरणीय समस्याएँ' : 'Advanced Challenge Problems'}
                  </h3>

                  <div className="rule-explanation-box">
                    <strong>{language === 'hi' ? 'यह अनुशंसा क्यों दी गई?' : 'Why was this recommended?'}:</strong>
                    <p>{language === 'hi' ? recommendation?.reasonHi : recommendation?.reason}</p>
                  </div>

                  {recommendation?.concept && (
                    <div className="concept-focus-line">
                      <strong>{language === 'hi' ? 'लक्षित अवधारणा:' : 'Concept Focus:'}</strong>{' '}
                      <span className="concept-highlight">{recommendation.concept.replace(/-/g, ' ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons based on recommendation */}
              <div className="adapt-buttons-row">
                {recommendation?.action === 'diagnostic' && (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => setStage('quick-check')}
                  >
                    🔍 {language === 'hi' ? 'Quick Check शुरू करें' : 'Start Quick Check'}
                  </button>
                )}

                {(recommendation?.action === 'learn' || recommendation?.action === 'revision') && (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => setStage('learn')}
                  >
                    📘 {language === 'hi' ? 'सचित्र पाठ देखें' : 'Go to Visual Lesson'}
                  </button>
                )}

                {(recommendation?.action === 'practice' || recommendation?.action === 'guided-practice') && (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => setStage('solve')}
                  >
                    ✏️ {language === 'hi' ? 'अभ्यास शुरू करें' : 'Start Practice'}
                  </button>
                )}

                {recommendation?.action === 'test' && (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => setStage('test')}
                  >
                    📝 {language === 'hi' ? 'मिनी-टेस्ट दें' : 'Take Mini-Test'}
                  </button>
                )}

                {recommendation?.action === 'challenge' && (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => setStage('solve')}
                  >
                    🚀 {language === 'hi' ? 'चुनौती प्रश्न हल करें' : 'Start Advanced Challenges'}
                  </button>
                )}

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => navigate('/student/concept-map')}
                >
                  🗺️ {language === 'hi' ? 'कॉन्सेप्ट मैप देखें' : 'View Concept Map'}
                </button>
              </div>
            </div>

            {/* Rule-Engine Transparency Details Box */}
            <div className="engine-rules-info-card">
              <h4>⚙️ {language === 'hi' ? 'इंजन के पारदर्शी नियम (Configured Defaults):' : 'Transparent Rule Thresholds:'}</h4>
              <ul className="engine-rules-list">
                <li>
                  <strong>&lt; 50% Diagnostic Score:</strong>{' '}
                  {language === 'hi'
                    ? 'कमजोर समझ; बुनियादी संकल्पनाओं और सचित्र पाठ की अनुशंसा।'
                    : 'Triggers prerequisite recap, visual models, and guided worked examples.'}
                </li>
                <li>
                  <strong>50% – 79% Diagnostic Score:</strong>{' '}
                  {language === 'hi'
                    ? 'सही दिशा में; विशिष्ट कमजोर अवधारणा पर लक्षित अभ्यास।'
                    : 'Triggers targeted practice specifically on identified concept gaps.'}
                </li>
                <li>
                  <strong>&ge; 80% Diagnostic / Test Score:</strong>{' '}
                  {language === 'hi'
                    ? 'विषय पर महारत; मिनी-टेस्ट या उन्नत चुनौती प्रश्न।'
                    : 'Triggers progression to certification mini-test or high-difficulty challenge problems.'}
                </li>
                <li>
                  <strong>Concept-specific Gap Exception:</strong>{' '}
                  {language === 'hi'
                    ? 'यदि किसी विशिष्ट अवधारणा (जैसे तुल्य भिन्न) में दक्षता 50% से कम हो, तो कुल स्कोर अच्छा होने पर भी उस अवधारणा का रिवीजन ट्रिगर होता है।'
                    : 'If an individual concept is < 50%, specific revision is triggered even if the overall score is satisfactory.'}
                </li>
              </ul>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

