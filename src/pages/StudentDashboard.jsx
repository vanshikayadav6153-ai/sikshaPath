/**
 * SikshaPath - Student Dashboard
 * Main dashboard showing student progress, stats, recommendations, and quiz history.
 */
import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { getRecommendation } from '../engine/recommendationEngine';
import subjects from '../data/subjects';
import '../styles/dashboard.css';

/** Translate helper: returns Hindi name if available and language is 'hi' */
const tx = (obj, language) => {
  if (!obj) return '';
  if (language === 'hi' && obj.nameHi) return obj.nameHi;
  return obj.name || '';
};

export default function StudentDashboard() {
  const { currentStudent, t, language, updateStudentData } = useApp();
  const navigate = useNavigate();

  // --------------- derived data ---------------
  const classNum = currentStudent?.class || 6;
  const subjectKey = currentStudent?.subject || 'mathematics';
  const subjectData = subjects[subjectKey];
  const classData = subjectData?.classes?.[classNum];
  const topics = classData?.topics || [];

  const topicProgress = currentStudent?.topicProgress || {};
  const quizHistory = currentStudent?.quizHistory || [];

  // --------------- stats ---------------
  const stats = useMemo(() => {
    if (!currentStudent) return { progress: 0, streak: 0, activities: 0, currentTopic: '' };

    // Overall progress: average mastery across topics
    let totalMastery = 0;
    let topicCount = 0;
    topics.forEach((topic) => {
      const tp = topicProgress[topic.id];
      if (tp) {
        // Use diagnostic score or average concept mastery
        const conceptMastery = tp.conceptMastery || {};
        const concepts = topic.concepts || [];
        if (concepts.length > 0) {
          const conceptAvg =
            concepts.reduce((sum, c) => sum + (conceptMastery[c] || 0), 0) / concepts.length;
          totalMastery += conceptAvg;
        } else if (tp.diagnosticScore != null) {
          totalMastery += tp.diagnosticScore;
        }
        topicCount++;
      }
    });
    const progress = topicCount > 0 ? Math.round(totalMastery / topics.length) : 0;

    // Learning streak
    const streak = currentStudent.learningStreak || 0;

    // Activities completed = total quiz attempts
    const activities = quizHistory.length;

    // Current topic: the one with status 'practising', or the first un-started
    let currentTopic = '';
    const practisingTopic = topics.find((t) => topicProgress[t.id]?.status === 'practising');
    if (practisingTopic) {
      currentTopic = language === 'hi' ? practisingTopic.nameHi : practisingTopic.name;
    } else {
      const nextTopic = topics.find((t) => !topicProgress[t.id]);
      if (nextTopic) {
        currentTopic = language === 'hi' ? nextTopic.nameHi : nextTopic.name;
      }
    }

    return { progress, streak, activities, currentTopic };
  }, [currentStudent, topics, topicProgress, quizHistory, language]);

  // --------------- recommendation ---------------
  const recommendation = useMemo(() => {
    if (!currentStudent) return null;
    try {
      return getRecommendation(currentStudent, subjectKey);
    } catch {
      return null;
    }
  }, [currentStudent, subjectKey]);

  // --------------- recent quizzes (last 5) ---------------
  const recentQuizzes = useMemo(() => {
    return [...quizHistory]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [quizHistory]);

  // --------------- helpers ---------------
  const getTopicStatusLabel = (status) => {
    const labels = {
      'not-checked': language === 'hi' ? 'जाँच नहीं हुई' : 'Not Checked',
      practising: language === 'hi' ? 'अभ्यास जारी' : 'Practising',
      understood: language === 'hi' ? 'समझ गया' : 'Understood',
    };
    return labels[status] || labels['not-checked'];
  };

  const getStatusBadgeClass = (status) => {
    if (status === 'understood') return 'status-badge status-understood';
    if (status === 'practising') return 'status-badge status-practising';
    return 'status-badge status-not-checked';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
      day: 'numeric',
      month: 'short',
    });
  };

  const getQuizTypeLabel = (type) => {
    const labels = {
      diagnostic: language === 'hi' ? 'डायग्नोस्टिक' : 'Diagnostic',
      practice: language === 'hi' ? 'अभ्यास' : 'Practice',
      test: language === 'hi' ? 'परीक्षा' : 'Test',
    };
    return labels[type] || type;
  };

  const getTopicName = (topicId) => {
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) return topicId;
    return language === 'hi' ? topic.nameHi : topic.name;
  };

  // --------------- no student guard ---------------
  if (!currentStudent) {
    return (
      <div className="dashboard-container">
        <div className="empty-state">
          <span className="empty-state-icon">📚</span>
          <h2>{language === 'hi' ? 'कोई छात्र नहीं चुना गया' : 'No Student Selected'}</h2>
          <p>{language === 'hi' ? 'कृपया पहले एक छात्र प्रोफ़ाइल चुनें।' : 'Please select a student profile first.'}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            {language === 'hi' ? 'होम पेज पर जाएँ' : 'Go to Home'}
          </button>
        </div>
      </div>
    );
  }

  const hasAnyProgress = Object.keys(topicProgress).length > 0;

  return (
    <div className="dashboard-container">
      {/* ======= Welcome Header ======= */}
      <header className="dashboard-header">
        <div className="welcome-text">
          <h1>
            {language === 'hi' ? 'नमस्ते' : 'Hello'}, {currentStudent.name}! 👋
          </h1>
          <p className="student-meta">
            {language === 'hi' ? 'कक्षा' : 'Class'} {classNum} &middot;{' '}
            {tx(subjectData, language)}
          </p>
        </div>
      </header>

      {/* ======= Stats Row ======= */}
      <section className="stats-row">
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <div className="stat-info">
            <span className="stat-value">{stats.progress}%</span>
            <span className="stat-label">
              {language === 'hi' ? 'कुल प्रगति' : 'Overall Progress'}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <div className="stat-info">
            <span className="stat-value">{stats.streak}</span>
            <span className="stat-label">
              {language === 'hi' ? 'दिन लगातार' : 'Day Streak'}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div className="stat-info">
            <span className="stat-value">{stats.activities}</span>
            <span className="stat-label">
              {language === 'hi' ? 'गतिविधियाँ पूरी' : 'Activities Done'}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📖</span>
          <div className="stat-info">
            <span className="stat-value stat-value-topic">{stats.currentTopic || '—'}</span>
            <span className="stat-label">
              {language === 'hi' ? 'वर्तमान विषय' : 'Current Topic'}
            </span>
          </div>
        </div>
      </section>

      {/* ======= Get-started CTA (no progress yet) ======= */}
      {!hasAnyProgress && (
        <section className="get-started-card">
          <div className="get-started-content">
            <span className="get-started-icon">🚀</span>
            <div>
              <h2>{language === 'hi' ? 'चलो शुरू करते हैं!' : "Let's Get Started!"}</h2>
              <p>
                {language === 'hi'
                  ? 'अपनी पहली Quick Check के साथ यात्रा शुरू करें और जानें आप कहाँ खड़े हैं।'
                  : 'Begin your journey with a Quick Check and discover where you stand.'}
              </p>
            </div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/student/learn')}>
            {language === 'hi' ? 'यात्रा शुरू करें' : 'Start Journey'} →
          </button>
        </section>
      )}

      {/* ======= Topic Progress ======= */}
      <section className="section-block">
        <h2 className="section-title">
          {language === 'hi' ? 'विषय प्रगति' : 'Topic Progress'}
        </h2>
        <div className="topic-cards-grid">
          {topics.map((topic) => {
            const tp = topicProgress[topic.id] || {};
            const status = tp.status || 'not-checked';
            const diagScore = tp.diagnosticScore;
            const practiceAttempts = tp.practiceAttempts || 0;
            const conceptMastery = tp.conceptMastery || {};
            const concepts = topic.concepts || [];
            const masteryAvg =
              concepts.length > 0
                ? Math.round(
                    concepts.reduce((s, c) => s + (conceptMastery[c] || 0), 0) / concepts.length
                  )
                : diagScore != null
                ? diagScore
                : 0;

            return (
              <div key={topic.id} className="topic-card" onClick={() => navigate('/student/learn')}>
                <div className="topic-card-header">
                  <h3 className="topic-card-name">
                    {language === 'hi' ? topic.nameHi : topic.name}
                  </h3>
                  <span className={getStatusBadgeClass(status)}>
                    {getTopicStatusLabel(status)}
                  </span>
                </div>
                <div className="topic-card-body">
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${masteryAvg}%` }}
                    />
                  </div>
                  <span className="progress-bar-label">{masteryAvg}%</span>
                </div>
                <div className="topic-card-footer">
                  {diagScore != null && (
                    <span className="topic-meta">
                      {language === 'hi' ? 'डायग्नोस्टिक' : 'Diagnostic'}: {diagScore}%
                    </span>
                  )}
                  {practiceAttempts > 0 && (
                    <span className="topic-meta">
                      {language === 'hi' ? 'अभ्यास' : 'Practice'}: {practiceAttempts}×
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======= Recommended Next Activity ======= */}
      {recommendation && (
        <section className="section-block recommendation-card">
          <h2 className="section-title">
            {language === 'hi' ? 'अगली गतिविधि' : 'Recommended Next Activity'}
          </h2>
          <div className="recommendation-body">
            {recommendation.teacherOverride && (
              <span className="teacher-override-badge">
                👩‍🏫 {language === 'hi' ? 'शिक्षक द्वारा निर्धारित' : 'Teacher Assigned'}
              </span>
            )}
            <div className="recommendation-action">
              <span className="recommendation-icon">
                {recommendation.action === 'diagnostic'
                  ? '🔍'
                  : recommendation.action === 'learn'
                  ? '📘'
                  : recommendation.action === 'practice'
                  ? '✏️'
                  : recommendation.action === 'test'
                  ? '📝'
                  : '🎯'}
              </span>
              <div>
                <h3 className="recommendation-title">
                  {recommendation.action === 'diagnostic'
                    ? language === 'hi'
                      ? 'Quick Check लें'
                      : 'Take a Quick Check'
                    : recommendation.action === 'learn'
                    ? language === 'hi'
                      ? 'अवधारणा सीखें'
                      : 'Learn Concepts'
                    : recommendation.action === 'practice'
                    ? language === 'hi'
                      ? 'अभ्यास करें'
                      : 'Practice Problems'
                    : recommendation.action === 'test'
                    ? language === 'hi'
                      ? 'परीक्षा दें'
                      : 'Take a Test'
                    : language === 'hi'
                    ? 'आगे बढ़ें'
                    : 'Move Forward'}
                </h3>
                <p className="recommendation-reason">
                  {recommendation.reason || ''}
                </p>
                {recommendation.topic && (
                  <p className="recommendation-topic">
                    {language === 'hi' ? 'विषय' : 'Topic'}: {getTopicName(recommendation.topic)}
                  </p>
                )}
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/student/learn')}>
              {language === 'hi' ? 'सीखना जारी रखें' : 'Continue Learning'} →
            </button>
          </div>
        </section>
      )}

      {/* ======= Recent Quiz History ======= */}
      <section className="section-block">
        <h2 className="section-title">
          {language === 'hi' ? 'हाल की क्विज़' : 'Recent Quiz History'}
        </h2>
        {recentQuizzes.length === 0 ? (
          <p className="empty-text">
            {language === 'hi'
              ? 'अभी तक कोई क्विज़ नहीं दी। अपनी पहली क्विज़ शुरू करें!'
              : 'No quizzes taken yet. Start your first quiz!'}
          </p>
        ) : (
          <div className="quiz-history-table-wrapper">
            <table className="quiz-history-table">
              <thead>
                <tr>
                  <th>{language === 'hi' ? 'तारीख' : 'Date'}</th>
                  <th>{language === 'hi' ? 'प्रकार' : 'Type'}</th>
                  <th>{language === 'hi' ? 'विषय' : 'Topic'}</th>
                  <th>{language === 'hi' ? 'अंक' : 'Score'}</th>
                </tr>
              </thead>
              <tbody>
                {recentQuizzes.map((quiz, idx) => (
                  <tr key={idx}>
                    <td>{formatDate(quiz.date)}</td>
                    <td>{getQuizTypeLabel(quiz.type)}</td>
                    <td>{getTopicName(quiz.topic)}</td>
                    <td>
                      <span
                        className={`score-pill ${
                          quiz.score >= 80
                            ? 'score-high'
                            : quiz.score >= 50
                            ? 'score-mid'
                            : 'score-low'
                        }`}
                      >
                        {quiz.score}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ======= Quick Links ======= */}
      <section className="quick-links">
        <button className="btn btn-outline" onClick={() => navigate('/student/progress')}>
          📈 {language === 'hi' ? 'पूरी रिपोर्ट देखें' : 'View Full Report'}
        </button>
        <button className="btn btn-outline" onClick={() => navigate('/student/concept-map')}>
          🗺️ {language === 'hi' ? 'कॉन्सेप्ट मैप' : 'Concept Map'}
        </button>
      </section>
    </div>
  );
}
