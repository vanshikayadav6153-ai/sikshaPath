/**
 * SikshaPath - Concept Map Component
 * Displays interactive visual concept-gap map with 3 explicit states:
 * - Not Checked
 * - Practising
 * - Understood
 * Highlights weak concepts, prerequisite links, and guides next steps.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CONCEPT_METADATA = {
  'numerator-denominator': {
    name: 'Numerator & Denominator',
    nameHi: 'अंश और हर',
    prereq: 'Whole Numbers & Division',
    prereqHi: 'पूर्ण संख्याएँ और भाग',
    desc: 'Identifying top and bottom numbers, representing parts of a whole.',
    descHi: 'ऊपर और नीचे की संख्या की पहचान, पूर्ण वस्तु के भागों का निरूपण।'
  },
  'types-of-fractions': {
    name: 'Types of Fractions',
    nameHi: 'भिन्नों के प्रकार',
    prereq: 'Numerator & Denominator',
    prereqHi: 'अंश और हर',
    desc: 'Proper, improper fractions, and converting to mixed numbers.',
    descHi: 'उचित भिन्न, विषम भिन्न और मिश्र भिन्न में रूपांतरण।'
  },
  'equivalent-fractions': {
    name: 'Equivalent Fractions',
    nameHi: 'तुल्य भिन्न',
    prereq: 'Multiplication & Types of Fractions',
    prereqHi: 'गुणा और भिन्नों के प्रकार',
    desc: 'Fractions with identical value, simplifying to lowest terms.',
    descHi: 'समान मान वाली भिन्न, न्यूनतम रूप में सरल करना।'
  },
  'comparing-fractions': {
    name: 'Comparing Fractions',
    nameHi: 'भिन्नों की तुलना',
    prereq: 'Equivalent Fractions & LCM',
    prereqHi: 'तुल्य भिन्न और ल.स.प.',
    desc: 'Comparing like and unlike fractions using common denominators.',
    descHi: 'समान और असमान हरों वाली भिन्नों में छोटे-बड़े की तुलना।'
  },
  'addition-subtraction-fractions': {
    name: 'Addition & Subtraction',
    nameHi: 'भिन्नों का जोड़ व घटाव',
    prereq: 'Comparing & Equivalent Fractions',
    prereqHi: 'तुलना और तुल्य भिन्न',
    desc: 'Adding and subtracting fractions with like and unlike denominators.',
    descHi: 'समान और असमान हर वाली भिन्नों को जोड़ना और घटाना।'
  },
  'fraction-word-problems': {
    name: 'Fraction Word Problems',
    nameHi: 'इबारती प्रश्न (Word Problems)',
    prereq: 'Addition & Subtraction Operations',
    prereqHi: 'जोड़ और घटाव की संक्रियाएँ',
    desc: 'Real-world practical scenarios involving fractional sharing and measurements.',
    descHi: 'दैनिक जीवन की परिस्थितियाँ, बँटवारा और मापन से जुड़े सवाल।'
  }
};

export default function ConceptMap({
  topicId = 'fractions',
  topicProgress = {},
  language = 'en',
  onSelectConcept = null
}) {
  const navigate = useNavigate();
  const [activeConceptKey, setActiveConceptKey] = useState('equivalent-fractions');

  const conceptMastery = topicProgress.conceptMastery || {};
  const hasDiag = topicProgress.diagnosticScore != null;

  // Determine state of each concept
  const getConceptState = (key) => {
    if (!hasDiag && conceptMastery[key] == null) {
      return { state: 'not-checked', score: 0 };
    }
    const score = conceptMastery[key] ?? 50;
    if (score >= 80) return { state: 'understood', score };
    return { state: 'practising', score };
  };

  const activeMeta = CONCEPT_METADATA[activeConceptKey] || {};
  const activeState = getConceptState(activeConceptKey);

  return (
    <div className="concept-map-card">
      {/* Legend */}
      <div className="concept-map-legend">
        <div className="legend-item">
          <span className="legend-dot status-understood" />
          <span>{language === 'hi' ? 'समझ गया (Understood ≥ 80%)' : 'Understood (≥ 80%)'}</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot status-practising" />
          <span>{language === 'hi' ? 'अभ्यास जारी (Practising < 80%)' : 'Practising (< 80%)'}</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot status-not-checked" />
          <span>{language === 'hi' ? 'जाँच नहीं हुई (Not Checked)' : 'Not Checked'}</span>
        </div>
      </div>

      {/* Concept Tree Grid */}
      <div className="concept-tree-container">
        {Object.entries(CONCEPT_METADATA).map(([key, meta], index) => {
          const { state, score } = getConceptState(key);
          const isSelected = activeConceptKey === key;
          const isWeak = state === 'practising' && score < 50;

          return (
            <div
              key={key}
              className={`concept-node-card state-${state} ${isSelected ? 'selected-node' : ''} ${
                isWeak ? 'weak-alert-node' : ''
              }`}
              onClick={() => {
                setActiveConceptKey(key);
                if (onSelectConcept) onSelectConcept(key);
              }}
            >
              <div className="node-step-badge">Step {index + 1}</div>
              <div className="node-header">
                <h4 className="node-title">{language === 'hi' ? meta.nameHi : meta.name}</h4>
                <span className={`node-status-pill status-${state}`}>
                  {state === 'understood'
                    ? language === 'hi' ? '✓ समझ गया' : '✓ Understood'
                    : state === 'practising'
                    ? language === 'hi' ? '⏳ अभ्यास' : '⏳ Practising'
                    : language === 'hi' ? '⚪ जाँच नहीं' : '⚪ Not Checked'}
                </span>
              </div>

              <div className="node-meter">
                <div className="meter-track">
                  <div className={`meter-fill status-${state}`} style={{ width: `${score}%` }} />
                </div>
                <span className="meter-label">{score}%</span>
              </div>

              {isWeak && (
                <div className="weak-callout">
                  ⚠️ {language === 'hi' ? 'सुधार की आवश्यकता' : 'Concept Gap Detected'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Concept Deep-Dive Pane */}
      {activeMeta && (
        <div className="concept-inspector-pane">
          <div className="inspector-header">
            <div>
              <span className="inspector-tag">
                {language === 'hi' ? 'अवधारणा का विवरण' : 'Concept Focus'}
              </span>
              <h3>{language === 'hi' ? activeMeta.nameHi : activeMeta.name}</h3>
            </div>
            <div className="inspector-score">
              <span className="score-num">{activeState.score}%</span>
              <span className="score-label">{language === 'hi' ? 'दक्षता' : 'Mastery'}</span>
            </div>
          </div>

          <p className="inspector-desc">{language === 'hi' ? activeMeta.descHi : activeMeta.desc}</p>

          <div className="inspector-prereq">
            <strong>{language === 'hi' ? 'पूर्व-शर्त (Prerequisite):' : 'Prerequisite:'}</strong>{' '}
            {language === 'hi' ? activeMeta.prereqHi : activeMeta.prereq}
          </div>

          <div className="inspector-actions">
            {activeState.score < 50 ? (
              <div className="recommendation-notice warning">
                <span>
                  💡{' '}
                  {language === 'hi'
                    ? 'सलाह: इस अवधारणा में स्कोर 50% से कम है। सचित्र पाठ और आसान उदाहरणों से दोहराएँ।'
                    : 'Recommendation: Score is below 50%. Review visual lesson and foundation recap first.'}
                </span>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate('/student/learn?stage=learn')}
                >
                  {language === 'hi' ? 'पाठ दोहराएँ' : 'Review Lesson'}
                </button>
              </div>
            ) : activeState.score >= 80 ? (
              <div className="recommendation-notice success">
                <span>
                  🌟{' '}
                  {language === 'hi'
                    ? 'शानदार! यह अवधारणा पूरी तरह समझ आ चुकी है। चुनौती प्रश्न हल करें या अगला विषय देखें।'
                    : 'Mastered! You have strong understanding. Try high difficulty challenge problems.'}
                </span>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => navigate('/student/learn?stage=test')}
                >
                  {language === 'hi' ? 'मिनी-टेस्ट लें' : 'Take Mini-Test'}
                </button>
              </div>
            ) : (
              <div className="recommendation-notice info">
                <span>
                  🎯{' '}
                  {language === 'hi'
                    ? 'प्रगति अच्छी है। 80% दक्षता तक पहुँचने के लिए कुछ और अभ्यास प्रश्न हल करें।'
                    : 'Good progress. Solve a few more practice questions to reach 80% mastery.'}
                </span>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate('/student/learn?stage=solve')}
                >
                  {language === 'hi' ? 'अभ्यास करें' : 'Practice Now'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

