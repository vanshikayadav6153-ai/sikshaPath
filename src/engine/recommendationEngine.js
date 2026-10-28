/**
 * SikshaPath - Transparent Rule-Based Recommendation Engine
 *
 * Rules:
 * 1. Teacher override takes precedence if present.
 * 2. If no diagnostic quiz has been taken -> Recommend Quick Check (diagnostic).
 * 3. Diagnostic score < 50% -> Recommend Foundation Recap & Guided Practice.
 * 4. Score 50% - 79% -> Recommend Targeted Practice on identified weak concepts.
 * 5. Score >= 80% -> Recommend Mini-Test or Advanced Challenge / Next Topic.
 * 6. Concept-specific rule: If any specific concept has repeated errors (< 50% mastery),
 *    trigger revision/practice for that specific concept, even if the overall score is >= 70%.
 */

export const THRESHOLDS = {
  STRUGGLING: 50, // Below 50%
  MASTERY: 80,    // 80% and above
  CONCEPT_WEAK: 50 // Concept score below 50% marks it as weak
};

/**
 * Calculates concept-wise accuracy and returns weak concepts (accuracy < THRESHOLDS.CONCEPT_WEAK).
 * @param {Object} conceptMastery - Map of conceptId -> percentage (0-100)
 */
export function identifyWeakConcepts(conceptMastery = {}) {
  const weak = [];
  for (const [concept, score] of Object.entries(conceptMastery)) {
    if (typeof score === 'number' && score < THRESHOLDS.CONCEPT_WEAK) {
      weak.push({ concept, score });
    }
  }
  // Sort from lowest score first
  return weak.sort((a, b) => a.score - b.score);
}

/**
 * Generates an adaptive recommendation for a student on a specific topic.
 *
 * @param {Object} student - Student profile object
 * @param {string} subjectKey - e.g. 'mathematics'
 * @param {string} topicId - e.g. 'fractions'
 * @returns {Object} recommendation details
 */
export function getRecommendation(student, subjectKey = 'mathematics', topicId = 'fractions') {
  if (!student) {
    return {
      action: 'diagnostic',
      topic: topicId,
      reason: 'No student selected. Start with a diagnostic quiz.',
      reasonHi: 'कोई छात्र नहीं चुना गया। डायग्नोस्टिक क्विज़ से शुरुआत करें।',
      difficulty: 1,
      isTeacherAssigned: false
    };
  }

  // 1. Check for Teacher Override first
  const overrides = student.teacherOverride;
  if (overrides && overrides[topicId]) {
    const override = overrides[topicId];
    return {
      action: override.action, // 'revision' | 'guided-practice' | 'continue' | 'challenge'
      topic: topicId,
      concept: override.concept || null,
      difficulty: override.difficulty || 2,
      reason: override.notes || `Assigned directly by teacher (${override.action.toUpperCase()}).`,
      reasonHi: override.notesHi || `शिक्षक द्वारा सीधे निर्धारित (${override.action}).`,
      teacherOverride: true,
      isTeacherAssigned: true,
      assignedAt: override.date || new Date().toISOString()
    };
  }

  const topicProgress = student.topicProgress?.[topicId] || {};
  const { diagnosticScore, testScore, conceptMastery = {}, practiceAttempts = 0 } = topicProgress;

  // 2. Rule: If diagnostic quiz not taken yet
  if (diagnosticScore == null) {
    return {
      action: 'diagnostic',
      topic: topicId,
      concept: null,
      difficulty: 1,
      reason: 'Diagnostic Quick Check has not been taken yet. Begin with a 10-question diagnostic to identify your knowledge baseline.',
      reasonHi: 'डायग्नोस्टिक Quick Check अभी नहीं दिया गया है। अपने ज्ञान के स्तर को जानने के लिए 10-प्रश्नों की जाँच से शुरुआत करें।',
      teacherOverride: false,
      isTeacherAssigned: false
    };
  }

  // Find weak concepts
  const weakConcepts = identifyWeakConcepts(conceptMastery);
  const weakest = weakConcepts[0] || null;

  // 3. Rule: Repeated error on a specific concept even if overall score is fair
  if (weakest && weakest.score < 40 && diagnosticScore >= 50) {
    const conceptFriendlyName = weakest.concept.replace(/-/g, ' ');
    return {
      action: 'practice',
      topic: topicId,
      concept: weakest.concept,
      difficulty: 1,
      reason: `Specific concept gap detected: Mastery in "${conceptFriendlyName}" is currently low (${weakest.score}%). Targeted practice is recommended to eliminate this blocker.`,
      reasonHi: `विशेष अवधारणा में कठिनाई: "${conceptFriendlyName}" में दक्षता अभी कम (${weakest.score}%) है। इस कमजोरी को दूर करने के लिए लक्षित अभ्यास की अनुशंसा है।`,
      teacherOverride: false,
      isTeacherAssigned: false
    };
  }

  // 4. Rule: Diagnostic score < 50% -> Struggling learner
  if (diagnosticScore < THRESHOLDS.STRUGGLING) {
    const focusConcept = weakest ? weakest.concept : 'numerator-denominator';
    return {
      action: 'learn',
      stage: 'foundation-recap',
      topic: topicId,
      concept: focusConcept,
      difficulty: 1,
      reason: `Diagnostic score is ${diagnosticScore}% (below 50% threshold). A prerequisite foundation recap and step-by-step visual lessons are recommended before practicing further.`,
      reasonHi: `डायग्नोस्टिक स्कोर ${diagnosticScore}% है (50% से कम)। आगे अभ्यास से पहले बुनियादी पुनरावलोकन और सचित्र पाठों को दोहराने की अनुशंसा की जाती है।`,
      teacherOverride: false,
      isTeacherAssigned: false
    };
  }

  // 5. Rule: Diagnostic score 50% - 79% -> On-track learner
  if (diagnosticScore < THRESHOLDS.MASTERY) {
    // If student has done practice >= 2 times with good progress, recommend mini-test
    if (practiceAttempts >= 2 && (!weakest || weakest.score >= 60)) {
      return {
        action: 'test',
        topic: topicId,
        concept: null,
        difficulty: 2,
        reason: `Consistent practice completed (${practiceAttempts} sessions). Ready to test comprehensive understanding with a 10-question Mini-Test.`,
        reasonHi: `नियमित अभ्यास पूरा हुआ (${practiceAttempts} सत्र)। अब 10 प्रश्नों वाले मिनी-टेस्ट के साथ अपनी पूरी तैयारी की पुष्टि करें।`,
        teacherOverride: false,
        isTeacherAssigned: false
      };
    }

    const targetConcept = weakest ? weakest.concept : 'types-of-fractions';
    return {
      action: 'practice',
      topic: topicId,
      concept: targetConcept,
      difficulty: 2,
      reason: `Diagnostic score is ${diagnosticScore}% (solid progress). Targeted practice on ${targetConcept.replace(/-/g, ' ')} is recommended to reach full mastery.`,
      reasonHi: `डायग्नोस्टिक स्कोर ${diagnosticScore}% है (अच्छी प्रगति)। पूर्ण दक्षता प्राप्त करने के लिए ${targetConcept.replace(/-/g, ' ')} पर लक्षित अभ्यास की अनुशंसा है।`,
      teacherOverride: false,
      isTeacherAssigned: false
    };
  }

  // 6. Rule: Score >= 80% -> Advanced learner
  // If mini-test already passed with >= 80%
  if (testScore != null && testScore >= THRESHOLDS.MASTERY) {
    return {
      action: 'challenge',
      topic: topicId,
      concept: 'fraction-word-problems',
      difficulty: 3,
      reason: `Outstanding performance! Test score is ${testScore}%. Recommended next step: multi-step challenge problems and preview of Decimals.`,
      reasonHi: `शानदार प्रदर्शन! टेस्ट स्कोर ${testScore}% है। अनुशंसित अगला कदम: कठिन बहु-चरणीय चुनौती प्रश्न और दशमलव का पूर्वावलोकन।`,
      teacherOverride: false,
      isTeacherAssigned: false
    };
  }

  // High diagnostic score, ready for mini-test
  return {
    action: 'test',
    topic: topicId,
    concept: null,
    difficulty: 2,
    reason: `Strong baseline diagnostic score of ${diagnosticScore}%. Recommended next step: take the Mini-Test to certify mastery.`,
    reasonHi: `डायग्नोस्टिक में ${diagnosticScore}% का उत्कृष्ट प्रदर्शन। समझ प्रमाणित करने के लिए मिनी-टेस्ट देने की अनुशंसा है।`,
    teacherOverride: false,
    isTeacherAssigned: false
  };
}

/**
 * Updates a student's concept mastery map after a quiz attempt.
 *
 * @param {Object} currentMastery - existing concept mastery object
 * @param {Array} questionResponses - array of { concept, isCorrect }
 * @returns {Object} updated concept mastery object
 */
export function calculateUpdatedMastery(currentMastery = {}, questionResponses = []) {
  const updated = { ...currentMastery };
  const conceptTallies = {};

  questionResponses.forEach(({ concept, isCorrect }) => {
    if (!concept) return;
    if (!conceptTallies[concept]) {
      conceptTallies[concept] = { total: 0, correct: 0 };
    }
    conceptTallies[concept].total += 1;
    if (isCorrect) conceptTallies[concept].correct += 1;
  });

  for (const [concept, tally] of Object.entries(conceptTallies)) {
    const attemptScore = Math.round((tally.correct / tally.total) * 100);
    const existing = updated[concept];
    if (existing != null) {
      // Exponential moving average: 60% new attempt, 40% historical
      updated[concept] = Math.round(existing * 0.4 + attemptScore * 0.6);
    } else {
      updated[concept] = attemptScore;
    }
  }

  return updated;
}

