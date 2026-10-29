/**
 * SikshaPath - Playful Educational Landing Page
 * Features:
 * - Neon colors on dark background
 * - Claymorphism 3D cards with tactile depth & glowing bevels
 * - Interactive Progress Tracking Live Demo Widget
 * - Rich Course Catalog Preview with filters (Classes 6-10, Maths & Science)
 * - Playful Student & Teacher Testimonials
 * - High-conversion Enrollment CTA
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import subjects from '../data/subjects';

export default function LandingPage() {
  const {
    language,
    setLanguage,
    setRole,
    setCurrentStudentId,
    students,
    updateStudentData,
    theme,
    t
  } = useApp();

  const navigate = useNavigate();

  // -------------------------------------------------------------
  // Course Catalog Preview State
  // -------------------------------------------------------------
  const [selectedClassFilter, setSelectedClassFilter] = useState('all'); // 'all' | '6' | '7' | '8' | '9' | '10'
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all'); // 'all' | 'mathematics' | 'science'
  const [catalogPreviewModal, setCatalogPreviewModal] = useState(null);

  const coursesList = [
    {
      id: 'course-fractions',
      topicId: 'fractions',
      title: 'Fractions & Visual Sharing (NCERT Ch 7)',
      titleHi: 'भिन्न और सचित्र बँटवारा (अध्याय 7)',
      class: 6,
      subject: 'mathematics',
      subjectLabel: 'Mathematics',
      subjectLabelHi: 'गणित',
      difficulty: 'Beginner to Intermediate',
      difficultyHi: 'सरल से मध्यम',
      levelBadge: '🟢 Active & Ready',
      lessonsCount: 6,
      questionsCount: 40,
      icon: '🍕',
      color: 'cyan',
      isLive: true,
      summary: 'Master numerators, denominators, equivalent fractions, comparing, and addition with our visual sandbox.',
      summaryHi: 'सचित्र भिन्न प्रदर्शक द्वारा अंश, हर, तुल्य भिन्न और जोड़-घटाव पर पूर्ण महारत प्राप्त करें।'
    },
    {
      id: 'course-whole-numbers',
      topicId: 'whole-numbers',
      title: 'Whole Numbers & Number Line (NCERT Ch 2)',
      titleHi: 'पूर्ण संख्याएँ और संख्या रेखा (अध्याय 2)',
      class: 6,
      subject: 'mathematics',
      subjectLabel: 'Mathematics',
      subjectLabelHi: 'गणित',
      difficulty: 'Foundation',
      difficultyHi: 'बुनियादी',
      levelBadge: '🌱 Core Foundation',
      lessonsCount: 5,
      questionsCount: 15,
      icon: '🔢',
      color: 'lime',
      isLive: true,
      summary: 'Natural vs whole numbers, predecessor/successor, number line operations, and closure/commutative properties.',
      summaryHi: 'प्राकृतिक व पूर्ण संख्याएँ, पूर्ववर्ती/परवर्ती, संख्या रेखा पर संक्रियाएँ और गुणधर्म।'
    },
    {
      id: 'course-playing-numbers',
      topicId: 'playing-with-numbers',
      title: 'Playing with Numbers (NCERT Ch 3)',
      titleHi: 'संख्याओं के साथ खेलना - HCF व LCM (अध्याय 3)',
      class: 6,
      subject: 'mathematics',
      subjectLabel: 'Mathematics',
      subjectLabelHi: 'गणित',
      difficulty: 'Core & Essential',
      difficultyHi: 'महत्वपूर्ण बुनियादी',
      levelBadge: '⚡ High Yield',
      lessonsCount: 6,
      questionsCount: 13,
      icon: '🎲',
      color: 'purple',
      isLive: true,
      summary: 'Factors, multiples, prime & composite numbers, divisibility tests (2-11), prime factorisation, HCF and LCM.',
      summaryHi: 'गुणनखंड, गुणज, अभाज्य व भाज्य संख्याएँ, विभाज्यता नियम, म.स.प. (HCF) और ल.स.प. (LCM)।'
    },
    {
      id: 'course-integers',
      topicId: 'integers',
      title: 'Integers & Negative Numbers (NCERT Ch 6)',
      titleHi: 'पूर्णांक और ऋणात्मक संख्याएँ (अध्याय 6)',
      class: 6,
      subject: 'mathematics',
      subjectLabel: 'Mathematics',
      subjectLabelHi: 'गणित',
      difficulty: 'Intermediate',
      difficultyHi: 'मध्यम',
      levelBadge: '⚡ Core Concept',
      lessonsCount: 5,
      questionsCount: 10,
      icon: '➖➕',
      color: 'magenta',
      isLive: true,
      summary: 'Need for negative numbers, number line representation, ordering, absolute value, and integer addition/subtraction rules.',
      summaryHi: 'ऋणात्मक संख्याएँ, संख्या रेखा पर निरूपण, तुलना, योज्य प्रतिलोम और पूर्णांकों का जोड़-घटाव।'
    },
    {
      id: 'course-decimals',
      topicId: 'decimals',
      title: 'Decimals in Daily Life (NCERT Ch 8)',
      titleHi: 'दशमलव और व्यावहारिक उपयोग (अध्याय 8)',
      class: 6,
      subject: 'mathematics',
      subjectLabel: 'Mathematics',
      subjectLabelHi: 'गणित',
      difficulty: 'Intermediate',
      difficultyHi: 'मध्यम',
      levelBadge: '💎 Practical Math',
      lessonsCount: 4,
      questionsCount: 7,
      icon: '🪙',
      color: 'amber',
      isLive: true,
      summary: 'Tenths and hundredths, place value grid, comparing decimals, money & measurement conversion, and decimal addition.',
      summaryHi: 'दशांश व शतांश, स्थानीय मान तालिका, दशमलवों की तुलना, रुपये-पैसे और लंबाई में उपयोग।'
    },
    {
      id: 'course-basic-geometry',
      topicId: 'basic-geometry',
      title: 'Basic Geometrical Ideas (NCERT Ch 4)',
      titleHi: 'आधारभूत ज्यामितीय अवधारणाएँ (अध्याय 4)',
      class: 6,
      subject: 'mathematics',
      subjectLabel: 'Mathematics',
      subjectLabelHi: 'गणित',
      difficulty: 'Visual & Spatial',
      difficultyHi: 'सचित्र ज्यामिति',
      levelBadge: '📐 Visual Geometry',
      lessonsCount: 4,
      questionsCount: 7,
      icon: '📐',
      color: 'cyan',
      isLive: true,
      summary: 'Points, line segments, rays, curves, polygons, angles, triangles, quadrilaterals, and circle parts.',
      summaryHi: 'बिंदु, रेखाखंड, किरण, सरल व बंद वक्र, बहुभुज, कोण, त्रिभुज, चतुर्भुज और वृत्त।'
    },
    {
      id: 'course-food-components',
      title: 'Components of Food & Nutrients',
      titleHi: 'भोजन के घटक और पोषण',
      class: 6,
      subject: 'science',
      subjectLabel: 'Science',
      subjectLabelHi: 'विज्ञान',
      difficulty: 'Foundation',
      difficultyHi: 'बुनियादी',
      levelBadge: '🧪 Concept Lab',
      lessonsCount: 4,
      questionsCount: 20,
      icon: '🥗',
      color: 'amber',
      isLive: false,
      summary: 'Carbohydrates, proteins, fats, vitamins, balanced diet, and deficiency disease prevention.',
      summaryHi: 'कार्बोहाइड्रेट, प्रोटीन, वसा, विटामिन और संतुलित आहार की व्यावहारिक समझ।'
    },
    {
      id: 'course-linear-equations',
      title: 'Linear Equations in One Variable',
      titleHi: 'एक चर वाले रैखिक समीकरण',
      class: 8,
      subject: 'mathematics',
      subjectLabel: 'Mathematics',
      subjectLabelHi: 'गणित',
      difficulty: 'Intermediate to Advanced',
      difficultyHi: 'मध्यम से उच्च',
      levelBadge: '🎯 High Yield',
      lessonsCount: 7,
      questionsCount: 35,
      icon: '📐',
      color: 'purple',
      isLive: false,
      summary: 'Balancing algebraic equations, word problems on ages and numbers, and transposition methods.',
      summaryHi: 'बीजीय समीकरणों को संतुलित करना, आयु व संख्याओं पर आधारित इबारती प्रश्न।'
    },
    {
      id: 'course-motion-physics',
      title: 'Laws of Motion & Gravitation',
      titleHi: 'गति के नियम और गुरुत्वाकर्षण',
      class: 9,
      subject: 'science',
      subjectLabel: 'Science (Physics)',
      subjectLabelHi: 'विज्ञान (भौतिकी)',
      difficulty: 'Advanced',
      difficultyHi: 'उच्च स्तर',
      levelBadge: '🚀 Olympiad & Board',
      lessonsCount: 8,
      questionsCount: 40,
      icon: '🌌',
      color: 'cyan',
      isLive: false,
      summary: 'Newton’s three laws, velocity-time graphs, momentum conservation, and gravitational acceleration.',
      summaryHi: 'न्यूटन के गति नियम, वेग-समय ग्राफ, संवेग संरक्षण और गुरुत्वीय त्वरण।'
    },
    {
      id: 'course-chemical-reactions',
      title: 'Chemical Reactions & Electricity',
      titleHi: 'रासायनिक अभिक्रियाएँ और विद्युत',
      class: 10,
      subject: 'science',
      subjectLabel: 'Science (Chemistry/Physics)',
      subjectLabelHi: 'विज्ञान (रसायन/भौतिकी)',
      difficulty: 'Board Mastery',
      difficultyHi: 'बोर्ड स्तर',
      levelBadge: '🏆 Board Special',
      lessonsCount: 9,
      questionsCount: 45,
      icon: '⚡',
      color: 'lime',
      isLive: false,
      summary: 'Balancing redox reactions, Ohm’s law, series/parallel resistance, and magnetic field effects.',
      summaryHi: 'समीकरण संतुलन, ओम का नियम, श्रेणी/समानांतर प्रतिरोध और विद्युत धारा के प्रभाव।'
    }
  ];

  const filteredCourses = useMemo(() => {
    return coursesList.filter((c) => {
      const matchClass =
        selectedClassFilter === 'all' || c.class === Number(selectedClassFilter);
      const matchSubject =
        selectedSubjectFilter === 'all' || c.subject === selectedSubjectFilter;
      return matchClass && matchSubject;
    });
  }, [selectedClassFilter, selectedSubjectFilter]);

  // -------------------------------------------------------------
  // Interactive Progress Tracking Demo Widget State
  // -------------------------------------------------------------
  const [demoStudentType, setDemoStudentType] = useState('struggling'); // 'struggling' | 'on-track' | 'advanced'
  const [demoXp, setDemoXp] = useState(380);
  const [demoStreak, setDemoStreak] = useState(4);
  const [demoConceptMastery, setDemoConceptMastery] = useState({
    numerator: 70,
    types: 55,
    equivalent: 35,
    addition: 25
  });
  const [demoLastActionMessage, setDemoLastActionMessage] = useState(
    'Simulated Diagnostic: Score 40% (<50% threshold) → Recommends Foundation Recap!'
  );

  const handleSwitchDemoPersona = (type) => {
    setDemoStudentType(type);
    if (type === 'struggling') {
      setDemoXp(380);
      setDemoStreak(3);
      setDemoConceptMastery({ numerator: 70, types: 55, equivalent: 35, addition: 25 });
      setDemoLastActionMessage(
        'Diagnostic: 40% (< 50%) → Rule triggers Foundation Recap & Visual Lesson!'
      );
    } else if (type === 'on-track') {
      setDemoXp(920);
      setDemoStreak(6);
      setDemoConceptMastery({ numerator: 90, types: 85, equivalent: 75, addition: 60 });
      setDemoLastActionMessage(
        'Diagnostic: 72% (50–79%) → Rule triggers Targeted Practice on Weakest Concept (Addition)!'
      );
    } else {
      setDemoXp(1850);
      setDemoStreak(12);
      setDemoConceptMastery({ numerator: 100, types: 95, equivalent: 92, addition: 90 });
      setDemoLastActionMessage(
        'Test Score: 92% (≥ 80%) → Rule triggers Advanced Multi-Step Challenge Problems!'
      );
    }
  };

  const handleSimulatePractice = () => {
    setDemoXp((prev) => prev + 60);
    setDemoStreak((prev) => prev + 1);
    setDemoConceptMastery((prev) => ({
      numerator: Math.min(100, prev.numerator + 5),
      types: Math.min(100, prev.types + 8),
      equivalent: Math.min(100, prev.equivalent + 15),
      addition: Math.min(100, prev.addition + 12)
    }));
    setDemoLastActionMessage(
      '🎉 Practice Question Solved! +60 XP earned! Concept gap in Equivalent Fractions shrinking!'
    );
  };

  // -------------------------------------------------------------
  // Interactive Enrollment CTA Form State
  // -------------------------------------------------------------
  const [enrollName, setEnrollName] = useState('');
  const [enrollClass, setEnrollClass] = useState(6);
  const [enrollLang, setEnrollLang] = useState('en');
  const [enrollSubject, setEnrollSubject] = useState('mathematics');

  const handleQuickEnroll = (e) => {
    e.preventDefault();
    const finalName = enrollName.trim() || 'Hero Learner';
    setLanguage(enrollLang);
    setRole('student');
    setCurrentStudentId('student-1');
    updateStudentData({
      name: finalName,
      class: Number(enrollClass),
      preferredLanguage: enrollLang,
      subject: enrollSubject,
      currentTopic: 'fractions'
    });
    navigate('/student/dashboard');
  };

  const handleStartStudent = (studentId = 'student-1') => {
    setRole('student');
    setCurrentStudentId(studentId);
    navigate('/student/dashboard');
  };

  const handleStartTeacher = () => {
    setRole('teacher');
    navigate('/teacher');
  };

  return (
    <div className={`landing-page ${theme === 'light' ? 'clay-light-theme' : 'clay-dark-theme'}`}>
      {/* Ambient background glowing orbs */}
      <div className="ambient-glow glow-cyan" />
      <div className="ambient-glow glow-magenta" />
      <div className="ambient-glow glow-lime" />

      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="clay-pill-badge neon-pulse">
            <span className="badge-sparkle">🚀</span>
            <span>
              {language === 'hi'
                ? 'अनुकूलित शिक्षा 2.0 • कक्षा 6 से 10 (NCERT Aligned)'
                : 'Playful Adaptive Learning • Classes 6–10 (NCERT Aligned)'}
            </span>
          </div>

          <h1 className="hero-title neon-glow-text">
            {language === 'hi' ? (
              <>
                अपनी गति से सीखें। <br />
                <span className="neon-gradient-text">मार्गदर्शन के साथ बढ़ें।</span>
              </>
            ) : (
              <>
                Learn at Your Pace. <br />
                <span className="neon-gradient-text">Level Up with Guidance.</span>
              </>
            )}
          </h1>

          <p className="hero-subtitle">
            {language === 'hi'
              ? 'शिक्षापथ प्रत्येक छात्र की वास्तविक समझ को पहचानता है और खेल-खेल में व्याख्या, अभ्यास और मिनी-टेस्ट को अनुकूलित करता है। शिक्षक सदैव नियंत्रण में रहते हैं।'
              : 'SikshaPath gamifies concept-gap detection for Indian school students. It adapts practice, visualizes fractions with live sandboxes, and gives teachers full pedal-to-the-metal guidance control.'}
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="clay-btn clay-btn-cyan btn-xl"
              onClick={() => handleStartStudent('student-1')}
            >
              ⚡ {t('startLearning')} &rarr;
            </button>
            <a href="#courses" className="clay-btn clay-btn-magenta btn-xl">
              📚 {language === 'hi' ? 'कोर्स देखें' : 'Explore Courses'}
            </a>
            <button
              type="button"
              className="clay-btn clay-btn-dark btn-xl"
              onClick={handleStartTeacher}
            >
              👩‍🏫 {t('teacherDashboard')}
            </button>
          </div>

          {/* Floating Claymorphic Stat Chips */}
          <div className="hero-floating-chips">
            <div className="clay-stat-chip chip-cyan">
              <span className="chip-icon">🍕</span>
              <div>
                <strong>Visual Sandbox</strong>
                <small>Interactive Fractions</small>
              </div>
            </div>

            <div className="clay-stat-chip chip-magenta">
              <span className="chip-icon">🎯</span>
              <div>
                <strong>Zero Guesswork</strong>
                <small>Transparent Rules</small>
              </div>
            </div>

            <div className="clay-stat-chip chip-lime">
              <span className="chip-icon">🔥</span>
              <div>
                <strong>100% Offline</strong>
                <small>No Cloud API Bills</small>
              </div>
            </div>

            <div className="clay-stat-chip chip-amber">
              <span className="chip-icon">👩‍🏫</span>
              <div>
                <strong>Teacher Override</strong>
                <small>Educator in Control</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. INTERACTIVE PROGRESS TRACKING DEMO (Playground) */}
      {/* ============================================================ */}
      <section className="section-block demo-section" id="tracking-demo">
        <div className="section-header text-center">
          <span className="clay-eyebrow neon-cyan-text">
            🎮 {language === 'hi' ? 'लाइव प्रगति सिमुलेटर' : 'Live Interactive Demo'}
          </span>
          <h2 className="section-heading">
            {language === 'hi'
              ? 'देखें कैसे वास्तविक समय में बदलती है सीखने की यात्रा'
              : 'Interactive Progress Tracking & Adaptive Engine Demo'}
          </h2>
          <p className="section-subtext">
            {language === 'hi'
              ? 'नीचे दिए गए तीनों छात्र प्रोफाइल में बदलें या बटन दबाकर देखें कि कैसे XP, स्ट्रीक और सिफारिशें लाइव बदलती हैं!'
              : 'Click below to switch between struggling, on-track, and advanced archetypes. Watch XP, streaks, and transparent recommendation rules adapt in real-time!'}
          </p>
        </div>

        {/* Live Interactive Claymorphic Widget */}
        <div className="clay-card clay-demo-widget">
          {/* Persona Picker Bar */}
          <div className="demo-widget-topbar">
            <span className="demo-label">
              {language === 'hi' ? 'छात्र प्रोफाइल चुनें:' : 'Select Persona Simulation:'}
            </span>
            <div className="demo-persona-tabs">
              <button
                type="button"
                className={`clay-tab ${demoStudentType === 'struggling' ? 'active tab-cyan' : ''}`}
                onClick={() => handleSwitchDemoPersona('struggling')}
              >
                👦 Aarav (Struggling &middot; 40%)
              </button>
              <button
                type="button"
                className={`clay-tab ${demoStudentType === 'on-track' ? 'active tab-amber' : ''}`}
                onClick={() => handleSwitchDemoPersona('on-track')}
              >
                👧 Priya (On-Track &middot; 72%)
              </button>
              <button
                type="button"
                className={`clay-tab ${demoStudentType === 'advanced' ? 'active tab-lime' : ''}`}
                onClick={() => handleSwitchDemoPersona('advanced')}
              >
                🧑‍🎓 Rohan (Advanced &middot; 92%)
              </button>
            </div>
          </div>

          {/* Widget Main Grid */}
          <div className="demo-widget-grid">
            {/* Left: Gamified Student Card */}
            <div className="clay-subcard student-status-card">
              <div className="student-card-header">
                <div className="clay-avatar-glow">
                  {demoStudentType === 'struggling'
                    ? '👦'
                    : demoStudentType === 'on-track'
                    ? '👧'
                    : '🧑‍🎓'}
                </div>
                <div>
                  <h3 className="student-name">
                    {demoStudentType === 'struggling'
                      ? 'Aarav Sharma'
                      : demoStudentType === 'on-track'
                      ? 'Priya Patel'
                      : 'Rohan Verma'}
                  </h3>
                  <span className="student-badge">
                    Class 6 Mathematics &middot; Fractions
                  </span>
                </div>
              </div>

              {/* XP and Streak Badges */}
              <div className="clay-metrics-row">
                <div className="clay-metric-box box-xp">
                  <span className="metric-icon">⭐</span>
                  <div>
                    <span className="metric-val">{demoXp} XP</span>
                    <span className="metric-sub">Total Experience</span>
                  </div>
                </div>

                <div className="clay-metric-box box-streak">
                  <span className="metric-icon">🔥</span>
                  <div>
                    <span className="metric-val">{demoStreak} Days</span>
                    <span className="metric-sub">Learning Streak</span>
                  </div>
                </div>
              </div>

              {/* Action Simulation Trigger */}
              <div className="demo-action-buttons">
                <button
                  type="button"
                  className="clay-btn clay-btn-lime btn-block"
                  onClick={handleSimulatePractice}
                >
                  ⚡ Simulate Solving a Practice Problem (+60 XP)
                </button>
              </div>

              <div className="demo-log-bubble">
                <span className="log-icon">🤖</span>
                <span className="log-text">{demoLastActionMessage}</span>
              </div>
            </div>

            {/* Right: Concept Mastery Radar & Progress Bars */}
            <div className="clay-subcard concept-meter-card">
              <div className="meter-card-header">
                <h4>🎯 Concept Mastery Matrix (Class 6 Fractions)</h4>
                <span className="live-pulse-badge">● LIVE SYNC</span>
              </div>

              <div className="concept-bars-group">
                <div className="concept-meter-row">
                  <div className="meter-info">
                    <span>Numerator & Denominator (अंश व हर)</span>
                    <strong className="neon-cyan-text">{demoConceptMastery.numerator}%</strong>
                  </div>
                  <div className="clay-progress-track">
                    <div
                      className="clay-progress-fill fill-cyan"
                      style={{ width: `${demoConceptMastery.numerator}%` }}
                    />
                  </div>
                </div>

                <div className="concept-meter-row">
                  <div className="meter-info">
                    <span>Types of Fractions (उचित/विषम भिन्न)</span>
                    <strong className="neon-magenta-text">{demoConceptMastery.types}%</strong>
                  </div>
                  <div className="clay-progress-track">
                    <div
                      className="clay-progress-fill fill-magenta"
                      style={{ width: `${demoConceptMastery.types}%` }}
                    />
                  </div>
                </div>

                <div className="concept-meter-row">
                  <div className="meter-info">
                    <span>
                      Equivalent Fractions (तुल्य भिन्न){' '}
                      {demoConceptMastery.equivalent < 50 && (
                        <span className="gap-alert-tag">⚠️ CONCEPT GAP</span>
                      )}
                    </span>
                    <strong
                      className={
                        demoConceptMastery.equivalent < 50 ? 'neon-rose-text' : 'neon-amber-text'
                      }
                    >
                      {demoConceptMastery.equivalent}%
                    </strong>
                  </div>
                  <div className="clay-progress-track">
                    <div
                      className={`clay-progress-fill ${
                        demoConceptMastery.equivalent < 50 ? 'fill-rose' : 'fill-amber'
                      }`}
                      style={{ width: `${demoConceptMastery.equivalent}%` }}
                    />
                  </div>
                </div>

                <div className="concept-meter-row">
                  <div className="meter-info">
                    <span>
                      Addition & Subtraction (भिन्न जोड़/घटाव){' '}
                      {demoConceptMastery.addition < 50 && (
                        <span className="gap-alert-tag">⚠️ CONCEPT GAP</span>
                      )}
                    </span>
                    <strong
                      className={
                        demoConceptMastery.addition < 50 ? 'neon-rose-text' : 'neon-lime-text'
                      }
                    >
                      {demoConceptMastery.addition}%
                    </strong>
                  </div>
                  <div className="clay-progress-track">
                    <div
                      className={`clay-progress-fill ${
                        demoConceptMastery.addition < 50 ? 'fill-rose' : 'fill-lime'
                      }`}
                      style={{ width: `${demoConceptMastery.addition}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Recommendation Rule Output */}
              <div className="clay-recommendation-banner">
                <span className="rec-flag">ADAPTIVE NEXT STEP:</span>
                <p>
                  {demoStudentType === 'struggling'
                    ? '📘 Foundation Recap & Visual Lesson: Equivalent fractions is below 50%. Visual models and sharing analogies recommended.'
                    : demoStudentType === 'on-track'
                    ? '✏️ Targeted Practice: Overall baseline solid. Recommended next step is targeted practice on unlike denominator additions.'
                    : '🚀 Advanced Challenge: 92% mastery verified. Ready for multi-step Olympiad word problems!'}
                </p>
                <button
                  type="button"
                  className="clay-btn clay-btn-cyan btn-sm"
                  onClick={() => handleStartStudent(
                    demoStudentType === 'struggling'
                      ? 'student-1'
                      : demoStudentType === 'on-track'
                      ? 'student-2'
                      : 'student-3'
                  )}
                >
                  Experience This Path Now &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. COURSE CATALOG PREVIEW */}
      {/* ============================================================ */}
      <section className="section-block catalog-section" id="courses">
        <div className="section-header text-center">
          <span className="clay-eyebrow neon-magenta-text">
            📚 {language === 'hi' ? 'पाठ्यक्रम सूची' : 'Course Catalog Preview'}
          </span>
          <h2 className="section-heading">
            {language === 'hi'
              ? 'कक्षा 6–10 गणित और विज्ञान पाठ्यक्रम'
              : 'Interactive Curriculum & Course Catalog'}
          </h2>
          <p className="section-subtext">
            {language === 'hi'
              ? 'प्रत्येक अध्याय के लिए डायग्नोस्टिक क्विज़, विज़ुअल पाठ, चरणबद्ध अभ्यास और मिनी-टेस्ट।'
              : 'Explore NCERT-aligned interactive courses designed to identify gaps and build rock-solid foundation.'}
          </p>
        </div>

        {/* Catalog Filters Bar */}
        <div className="catalog-filter-bar">
          <div className="filter-group">
            <span className="filter-title">{language === 'hi' ? 'कक्षा:' : 'Grade Level:'}</span>
            <div className="filter-pills">
              {['all', '6', '7', '8', '9', '10'].map((cls) => (
                <button
                  key={cls}
                  type="button"
                  className={`clay-filter-pill ${selectedClassFilter === cls ? 'active' : ''}`}
                  onClick={() => setSelectedClassFilter(cls)}
                >
                  {cls === 'all' ? (language === 'hi' ? 'सभी कक्षाएँ' : 'All Grades') : `Class ${cls}`}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-title">{language === 'hi' ? 'विषय:' : 'Subject:'}</span>
            <div className="filter-pills">
              <button
                type="button"
                className={`clay-filter-pill ${selectedSubjectFilter === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedSubjectFilter('all')}
              >
                {language === 'hi' ? 'सभी विषय' : 'All Subjects'}
              </button>
              <button
                type="button"
                className={`clay-filter-pill ${selectedSubjectFilter === 'mathematics' ? 'active' : ''}`}
                onClick={() => setSelectedSubjectFilter('mathematics')}
              >
                📐 Mathematics
              </button>
              <button
                type="button"
                className={`clay-filter-pill ${selectedSubjectFilter === 'science' ? 'active' : ''}`}
                onClick={() => setSelectedSubjectFilter('science')}
              >
                🔬 Science & Physics
              </button>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="catalog-cards-grid">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`clay-card course-card border-glow-${course.color}`}
            >
              <div className="course-card-top">
                <span className="course-icon-bubble">{course.icon}</span>
                <span className={`course-badge badge-${course.color}`}>
                  {course.levelBadge}
                </span>
              </div>

              <div className="course-card-meta">
                <span className="meta-tag">Class {course.class}</span>
                <span className="meta-dot">&bull;</span>
                <span className="meta-tag">
                  {language === 'hi' ? course.subjectLabelHi : course.subjectLabel}
                </span>
              </div>

              <h3 className="course-card-title">
                {language === 'hi' ? course.titleHi : course.title}
              </h3>

              <p className="course-card-desc">
                {language === 'hi' ? course.summaryHi : course.summary}
              </p>

              <div className="course-stats-bar">
                <span>📖 {course.lessonsCount} Modules</span>
                <span>✏️ {course.questionsCount} Practice Items</span>
                <span>⭐ {language === 'hi' ? course.difficultyHi : course.difficulty}</span>
              </div>

              <div className="course-card-footer">
                {course.isLive ? (
                  <button
                    type="button"
                    className="clay-btn clay-btn-cyan btn-block"
                    onClick={() => {
                      setRole('student');
                      setCurrentStudentId('student-1');
                      if (course.topicId) {
                        navigate('/student/learn?topic=' + course.topicId);
                      } else {
                        navigate('/student/dashboard');
                      }
                    }}
                  >
                    🚀 {language === 'hi' ? 'अध्याय शुरू करें' : 'Launch Adaptive Course'} &rarr;
                  </button>
                ) : (
                  <button
                    type="button"
                    className="clay-btn clay-btn-dark btn-block"
                    onClick={() => setCatalogPreviewModal(course)}
                  >
                    🔍 {language === 'hi' ? 'पाठ्यक्रम विवरण देखें' : 'Preview Syllabus'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Course Preview Modal */}
      {catalogPreviewModal && (
        <div className="modal-backdrop" onClick={() => setCatalogPreviewModal(null)}>
          <div className="clay-card modal-clay-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-clay-header">
              <span className="modal-icon">{catalogPreviewModal.icon}</span>
              <div>
                <h3>{language === 'hi' ? catalogPreviewModal.titleHi : catalogPreviewModal.title}</h3>
                <p>
                  Class {catalogPreviewModal.class} &middot;{' '}
                  {catalogPreviewModal.subjectLabel} &middot; {catalogPreviewModal.difficulty}
                </p>
              </div>
            </div>
            <div className="modal-clay-body">
              <p>{language === 'hi' ? catalogPreviewModal.summaryHi : catalogPreviewModal.summary}</p>
              <div className="modal-modules-preview">
                <strong>Included Modules:</strong>
                <ul>
                  <li>Diagnostic Quick Check (10 Baseline Questions)</li>
                  <li>Visual Interactive Concepts & Sandbox Models</li>
                  <li>Guided Practice with Progressive Hints</li>
                  <li>Assessment Mini-Test with Explanations</li>
                  <li>Adaptive Next Step Engine integration</li>
                </ul>
              </div>
              <div className="live-demo-notice">
                💡 <em>Class 6 Mathematics: Fractions is fully functional with 40 questions and interactive visualizer. Other classes are mapped to NCERT and ready for expansion.</em>
              </div>
            </div>
            <div className="modal-clay-footer">
              <button
                type="button"
                className="clay-btn clay-btn-dark"
                onClick={() => setCatalogPreviewModal(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="clay-btn clay-btn-cyan"
                onClick={() => {
                  setCatalogPreviewModal(null);
                  handleStartStudent('student-1');
                }}
              >
                Try Fractions Demo &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. STUDENT & TEACHER TESTIMONIALS */}
      {/* ============================================================ */}
      <section className="section-block testimonials-section">
        <div className="section-header text-center">
          <span className="clay-eyebrow neon-lime-text">
            💬 {language === 'hi' ? 'छात्र और शिक्षक समीक्षाएँ' : 'Student & Educator Testimonials'}
          </span>
          <h2 className="section-heading">
            {language === 'hi'
              ? 'छात्रों और शिक्षकों का अनुभव'
              : 'Loved by Students, Trusted by Teachers'}
          </h2>
          <p className="section-subtext">
            {language === 'hi'
              ? 'जानिए कैसे शिक्षापथ ने छात्रों के गणित का डर दूर किया और शिक्षकों को कक्षा का पूर्ण नियंत्रण दिया।'
              : 'Real stories from Indian learners and educators mastering concepts at their own pace.'}
          </p>
        </div>

        <div className="testimonials-cards-grid">
          <div className="clay-card testimonial-card border-glow-cyan">
            <div className="testi-header">
              <div className="testi-avatar">👧</div>
              <div>
                <h4 className="testi-name">Ananya Sen</h4>
                <span className="testi-sub">Class 6 CBSE &middot; New Delhi</span>
              </div>
            </div>
            <div className="testi-stars">⭐⭐⭐⭐⭐</div>
            <p className="testi-quote">
              &ldquo;I used to cry during fraction homework. SikshaPath’s interactive pie visualizer and Quick Check showed me I only had a small gap in equivalent fractions. Within 2 days, I scored 95% on my school test!&rdquo;
            </p>
            <div className="testi-badge badge-cyan">🏆 From 40% to 95% in Fractions</div>
          </div>

          <div className="clay-card testimonial-card border-glow-magenta">
            <div className="testi-header">
              <div className="testi-avatar">👩‍🏫</div>
              <div>
                <h4 className="testi-name">Mrs. Sunita Rao</h4>
                <span className="testi-sub">Senior Mathematics Teacher &middot; KV Bengaluru</span>
              </div>
            </div>
            <div className="testi-stars">⭐⭐⭐⭐⭐</div>
            <p className="testi-quote">
              &ldquo;Most AI apps try to replace the teacher with a black-box bot. SikshaPath does the opposite: it gives me a clear concept-gap map of my 40 students and lets me override any recommendation with one click.&rdquo;
            </p>
            <div className="testi-badge badge-magenta">👩‍🏫 Teacher-in-Control Verified</div>
          </div>

          <div className="clay-card testimonial-card border-glow-lime">
            <div className="testi-header">
              <div className="testi-avatar">👦</div>
              <div>
                <h4 className="testi-name">Kabir Mehta</h4>
                <span className="testi-sub">Class 7 ICSE &middot; Pune</span>
              </div>
            </div>
            <div className="testi-stars">⭐⭐⭐⭐⭐</div>
            <p className="testi-quote">
              &ldquo;The dark neon theme feels like a fun video game rather than a dry textbook. The hint button explains WHY an answer is wrong without giving away the solution right away.&rdquo;
            </p>
            <div className="testi-badge badge-lime">⚡ 14-Day Practice Streak</div>
          </div>

          <div className="clay-card testimonial-card border-glow-amber">
            <div className="testi-header">
              <div className="testi-avatar">🧑‍🎓</div>
              <div>
                <h4 className="testi-name">Rohan Verma</h4>
                <span className="testi-sub">Class 8 Olympiad Aspirant &middot; Hyderabad</span>
              </div>
            </div>
            <div className="testi-stars">⭐⭐⭐⭐⭐</div>
            <p className="testi-quote">
              &ldquo;I love that SikshaPath doesn’t hold advanced students back. Once I proved mastery on basic fractions, it immediately pushed me into multi-step high-order challenge problems!&rdquo;
            </p>
            <div className="testi-badge badge-amber">🚀 Advanced Explorer</div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. PLAYFUL ENROLLMENT CTA */}
      {/* ============================================================ */}
      <section className="section-block enrollment-section" id="enroll">
        <div className="clay-card enrollment-card">
          <div className="enrollment-header text-center">
            <span className="clay-eyebrow neon-cyan-text">
              ✨ {language === 'hi' ? 'नि:शुल्क शुरुआत' : 'Start Free in 10 Seconds'}
            </span>
            <h2 className="enrollment-title neon-glow-text">
              {language === 'hi'
                ? 'अपनी सीखने की यात्रा अभी शुरू करें'
                : 'Ready to Level Up Your Brain?'}
            </h2>
            <p className="enrollment-sub">
              {language === 'hi'
                ? 'कोई क्रेडिट कार्ड नहीं, कोई पासवर्ड नहीं। बस अपना नाम और कक्षा चुनें और तुरंत सीखना शुरू करें।'
                : 'No credit card required. No passwords. Pick your class, enter your name, and experience personalized learning today.'}
            </p>
          </div>

          <form onSubmit={handleQuickEnroll} className="clay-enrollment-form">
            <div className="enrollment-inputs-grid">
              <div className="form-field">
                <label className="field-label">Student Name (छात्र का नाम):</label>
                <input
                  type="text"
                  className="clay-input"
                  placeholder="e.g. Aarav or Priya"
                  value={enrollName}
                  onChange={(e) => setEnrollName(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="field-label">Class (कक्षा 6–10):</label>
                <select
                  className="clay-select"
                  value={enrollClass}
                  onChange={(e) => setEnrollClass(e.target.value)}
                >
                  <option value={6}>Class 6 (कक्षा 6)</option>
                  <option value={7}>Class 7 (कक्षा 7)</option>
                  <option value={8}>Class 8 (कक्षा 8)</option>
                  <option value={9}>Class 9 (कक्षा 9)</option>
                  <option value={10}>Class 10 (कक्षा 10)</option>
                </select>
              </div>

              <div className="form-field">
                <label className="field-label">Language (भाषा):</label>
                <select
                  className="clay-select"
                  value={enrollLang}
                  onChange={(e) => setEnrollLang(e.target.value)}
                >
                  <option value="en">English (NCERT)</option>
                  <option value="hi">हिन्दी (NCERT शब्दावली)</option>
                </select>
              </div>
            </div>

            <div className="enrollment-submit-row">
              <button type="submit" className="clay-btn clay-btn-cyan btn-xl btn-block">
                🚀 {language === 'hi' ? 'तुरंत नि:शुल्क सीखना शुरू करें' : 'Start Learning Free Now'} &rarr;
              </button>
            </div>

            <div className="enrollment-perks-row">
              <span>✓ 100% Free Forever</span>
              <span>✓ Works Without Internet</span>
              <span>✓ Privacy Safe (No Personal Data Sold)</span>
              <span>✓ NCERT Aligned</span>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
