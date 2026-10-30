/**
 * SikshaPath - Initial Students State & Demo Profiles
 *
 * All fresh student profiles start with:
 * - 0% Overall Progress
 * - 0 Day Streak (streak only increments when consistency is maintained)
 * - 0 Activities Completed
 * - Empty topicProgress and quizHistory
 *
 * Real progress is only recorded when the student takes quizzes, practices, and tests.
 */

export const initialStudents = [
  {
    id: 'student-1',
    name: 'Aarav Sharma',
    avatar: '👦',
    class: 6,
    preferredLanguage: 'en',
    subject: 'mathematics',
    currentTopic: 'fractions',
    learningPersona: 'on-track',
    personaLabel: 'Student Learner',
    personaLabelHi: 'छात्र शिक्षार्थी',
    personaDescription: 'Class 6 student. Starts at 0% progress and 0 streak. Progress records as learning begins.',
    personaDescriptionHi: 'कक्षा 6 का छात्र। शुरुआत 0% प्रगति और 0 स्ट्रीक से। अध्ययन शुरू होने पर वास्तविक प्रगति दर्ज होती है।',
    learningStreak: 0,
    lastActiveDate: null,
    topicProgress: {},
    quizHistory: [],
    teacherOverride: null
  },
  {
    id: 'student-2',
    name: 'Priya Patel',
    avatar: '👧',
    class: 6,
    preferredLanguage: 'en',
    subject: 'mathematics',
    currentTopic: 'fractions',
    learningPersona: 'on-track',
    personaLabel: 'Student Learner',
    personaLabelHi: 'छात्रा शिक्षार्थी',
    personaDescription: 'Class 6 student. Separate profile with isolated progress tracking and consistency streak.',
    personaDescriptionHi: 'कक्षा 6 की छात्रा। अलग प्रोफाइल, स्वतंत्र प्रगति ट्रैकिंग और निरंतरता स्ट्रीक।',
    learningStreak: 0,
    lastActiveDate: null,
    topicProgress: {},
    quizHistory: [],
    teacherOverride: null
  },
  {
    id: 'student-3',
    name: 'Rohan Verma',
    avatar: '🧑‍🎓',
    class: 6,
    preferredLanguage: 'en',
    subject: 'mathematics',
    currentTopic: 'fractions',
    learningPersona: 'on-track',
    personaLabel: 'Student Learner',
    personaLabelHi: 'छात्र शिक्षार्थी',
    personaDescription: 'Class 6 student. Individual progress and diagnostic data stored independently.',
    personaDescriptionHi: 'कक्षा 6 का छात्र। व्यक्तिगत प्रगति और डायग्नोस्टिक डेटा अलग से सुरक्षित।',
    learningStreak: 0,
    lastActiveDate: null,
    topicProgress: {},
    quizHistory: [],
    teacherOverride: null
  }
];

/**
 * Pre-filled sample profiles specifically for Evaluators & Hackathon Judges
 * to preview how struggling, on-track, and advanced personas look with filled graphs.
 */
export const mockEvaluatorStudents = [
  {
    id: 'student-1',
    name: 'Aarav Sharma',
    avatar: '👦',
    class: 6,
    preferredLanguage: 'en',
    subject: 'mathematics',
    currentTopic: 'fractions',
    learningPersona: 'struggling',
    personaLabel: 'Struggling Learner',
    personaLabelHi: 'बुनियादी सहयोग की आवश्यकता',
    personaDescription: 'Struggles with equivalent fractions and addition of fractions. Needs foundation revision and visual representations.',
    personaDescriptionHi: 'तुल्य भिन्न और भिन्न जोड़ में कठिनाई। बुनियादी अवधारणाओं और सचित्र व्याख्या की आवश्यकता।',
    learningStreak: 2,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    topicProgress: {
      'whole-numbers': {
        status: 'understood',
        diagnosticScore: 80,
        practiceAttempts: 4,
        lastUpdated: '2026-10-22'
      },
      'fractions': {
        status: 'practising',
        diagnosticScore: 40,
        practiceAttempts: 3,
        lastUpdated: '2026-10-27',
        conceptMastery: {
          'numerator-denominator': 60,
          'types-of-fractions': 50,
          'equivalent-fractions': 30,
          'comparing-fractions': 35,
          'addition-subtraction-fractions': 25,
          'fraction-word-problems': 20
        }
      }
    },
    quizHistory: [
      {
        id: 'qh-1',
        type: 'diagnostic',
        topic: 'fractions',
        score: 40,
        totalQuestions: 10,
        correctCount: 4,
        date: '2026-10-26T10:30:00.000Z',
        weakConcepts: ['equivalent-fractions', 'addition-subtraction-fractions', 'fraction-word-problems']
      },
      {
        id: 'qh-2',
        type: 'practice',
        topic: 'fractions',
        score: 45,
        totalQuestions: 6,
        correctCount: 3,
        date: '2026-10-27T11:15:00.000Z',
        weakConcepts: ['equivalent-fractions', 'addition-subtraction-fractions']
      }
    ],
    teacherOverride: null
  },
  {
    id: 'student-2',
    name: 'Priya Patel',
    avatar: '👧',
    class: 6,
    preferredLanguage: 'en',
    subject: 'mathematics',
    currentTopic: 'fractions',
    learningPersona: 'on-track',
    personaLabel: 'On-Track Learner',
    personaLabelHi: 'सही दिशा में (On-Track)',
    personaDescription: 'Solid grasp of basic fractions. Practicing word problems and unlike denominator additions.',
    personaDescriptionHi: 'मूल भिन्न अवधारणाओं की अच्छी समझ। इबारती प्रश्नों और असमान हर वाले जोड़ का नियमित अभ्यास जारी।',
    learningStreak: 5,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    topicProgress: {
      'whole-numbers': {
        status: 'understood',
        diagnosticScore: 90,
        practiceAttempts: 4,
        lastUpdated: '2026-10-18'
      },
      'fractions': {
        status: 'practising',
        diagnosticScore: 70,
        practiceAttempts: 2,
        lastUpdated: '2026-10-28',
        conceptMastery: {
          'numerator-denominator': 85,
          'types-of-fractions': 80,
          'equivalent-fractions': 75,
          'comparing-fractions': 70,
          'addition-subtraction-fractions': 65,
          'fraction-word-problems': 60
        }
      }
    },
    quizHistory: [
      {
        id: 'qh-3',
        type: 'diagnostic',
        topic: 'fractions',
        score: 70,
        totalQuestions: 10,
        correctCount: 7,
        date: '2026-10-25T09:00:00.000Z',
        weakConcepts: ['addition-subtraction-fractions', 'fraction-word-problems']
      },
      {
        id: 'qh-4',
        type: 'practice',
        topic: 'fractions',
        score: 75,
        totalQuestions: 6,
        correctCount: 5,
        date: '2026-10-28T09:30:00.000Z',
        weakConcepts: ['addition-subtraction-fractions']
      }
    ],
    teacherOverride: null
  },
  {
    id: 'student-3',
    name: 'Rohan Verma',
    avatar: '🧑‍🎓',
    class: 6,
    preferredLanguage: 'en',
    subject: 'mathematics',
    currentTopic: 'fractions',
    learningPersona: 'advanced',
    personaLabel: 'Advanced Learner',
    personaLabelHi: 'उन्नत छात्र (Advanced)',
    personaDescription: 'High accuracy and quick concept mastery. Ready for competitive and multi-step challenge problems.',
    personaDescriptionHi: 'उच्च सटीकता और तीव्र समझ। बहु-चरणीय और कठिन चुनौती प्रश्नों के लिए पूरी तरह तैयार।',
    learningStreak: 9,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    topicProgress: {
      'whole-numbers': {
        status: 'understood',
        diagnosticScore: 95,
        practiceAttempts: 6,
        lastUpdated: '2026-10-15'
      },
      'fractions': {
        status: 'understood',
        diagnosticScore: 90,
        testScore: 92,
        practiceAttempts: 4,
        lastUpdated: '2026-10-28',
        conceptMastery: {
          'numerator-denominator': 100,
          'types-of-fractions': 95,
          'equivalent-fractions': 90,
          'comparing-fractions': 95,
          'addition-subtraction-fractions': 90,
          'fraction-word-problems': 90
        }
      }
    },
    quizHistory: [
      {
        id: 'qh-5',
        type: 'diagnostic',
        topic: 'fractions',
        score: 90,
        totalQuestions: 10,
        correctCount: 9,
        date: '2026-10-24T14:00:00.000Z',
        weakConcepts: []
      },
      {
        id: 'qh-6',
        type: 'test',
        topic: 'fractions',
        score: 92,
        totalQuestions: 10,
        correctCount: 9,
        date: '2026-10-28T10:00:00.000Z',
        weakConcepts: []
      }
    ],
    teacherOverride: null
  }
];

export default initialStudents;
