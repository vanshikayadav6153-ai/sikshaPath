/**
 * SikshaPath - Concept Map Component
 * Displays interactive visual concept-gap map with 3 explicit states:
 * - Not Checked
 * - Practising
 * - Understood
 * Highlights weak concepts, prerequisite links, and guides next steps.
 * Multi-chapter support for NCERT Class 6 Mathematics:
 * - Fractions (Chapter 7)
 * - Whole Numbers (Chapter 2)
 * - Playing with Numbers (Chapter 3)
 * - Integers (Chapter 6)
 * - Decimals (Chapter 8)
 * - Basic Geometrical Ideas (Chapter 4)
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CONCEPTS_BY_TOPIC = {
  fractions: {
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
  },
  'whole-numbers': {
    'natural-vs-whole': {
      name: 'Natural vs Whole Numbers',
      nameHi: 'प्राकृतिक बनाम पूर्ण संख्याएँ',
      prereq: 'Counting Numbers',
      prereqHi: 'गिनती की संख्याएँ',
      desc: 'Understanding counting numbers {1,2,3...} vs whole numbers with zero {0,1,2,3...}.',
      descHi: 'प्राकृतिक संख्याओं और शून्य को मिलाकर पूर्ण संख्याओं की समझ।'
    },
    'predecessor-successor': {
      name: 'Predecessor & Successor',
      nameHi: 'पूर्ववर्ती और परवर्ती',
      prereq: 'Natural vs Whole Numbers',
      prereqHi: 'प्राकृतिक व पूर्ण संख्याएँ',
      desc: 'Finding previous number (-1) and next number (+1). 0 has no whole predecessor.',
      descHi: 'पूर्ववर्ती (-1) और परवर्ती (+1) निकालना। 0 का कोई पूर्ववर्ती नहीं होता।'
    },
    'number-line-whole': {
      name: 'Number Line Operations',
      nameHi: 'संख्या रेखा पर संक्रियाएँ',
      prereq: 'Predecessor & Successor',
      prereqHi: 'पूर्ववर्ती और परवर्ती',
      desc: 'Visualizing addition (moving right) and subtraction (moving left) on number line.',
      descHi: 'संख्या रेखा पर जोड़ (दाएँ जाना) और घटाव (बाएँ जाना) का चित्रण।'
    },
    'properties-whole-numbers': {
      name: 'Properties of Whole Numbers',
      nameHi: 'पूर्ण संख्याओं के गुणधर्म',
      prereq: 'Basic Arithmetic Operations',
      prereqHi: 'बुनियादी अंकगणित',
      desc: 'Closure, Commutative, Associative, and Distributive properties.',
      descHi: 'संवृत, क्रमविनिमेय, साहचर्य और वितरण गुणधर्म।'
    },
    'patterns-in-whole-numbers': {
      name: 'Patterns in Whole Numbers',
      nameHi: 'पूर्ण संख्याओं में प्रतिरूप',
      prereq: 'Multiplication & Properties',
      prereqHi: 'गुणा और गुणधर्म',
      desc: 'Recognizing geometric shapes and mental arithmetic patterns.',
      descHi: 'संख्याओं के ज्यामितीय प्रतिरूप और आसान गणना के नियम।'
    }
  },
  'playing-with-numbers': {
    'factors-and-multiples': {
      name: 'Factors and Multiples',
      nameHi: 'गुणनखंड और गुणज',
      prereq: 'Multiplication & Division',
      prereqHi: 'गुणा और भाग',
      desc: 'Exact divisors (factors) and product multiples of numbers.',
      descHi: 'दी गई संख्या के पूरे विभाजक (गुणनखंड) और गुणज।'
    },
    'prime-composite': {
      name: 'Prime and Composite Numbers',
      nameHi: 'अभाज्य और भाज्य संख्याएँ',
      prereq: 'Factors and Multiples',
      prereqHi: 'गुणनखंड और गुणज',
      desc: 'Numbers with only 2 factors (primes) vs more than 2 factors (composite). 1 is neither.',
      descHi: 'केवल 2 गुणनखंड (अभाज्य) और 2 से अधिक गुणनखंड (भाज्य)। 1 न तो अभाज्य है न भाज्य।'
    },
    'divisibility-rules': {
      name: 'Divisibility Rules',
      nameHi: 'विभाज्यता की जाँच',
      prereq: 'Factors & Multiples',
      prereqHi: 'गुणनखंड और गुणज',
      desc: 'Quick mental divisibility tests for 2, 3, 4, 5, 6, 8, 9, 10, 11.',
      descHi: '2, 3, 4, 5, 6, 8, 9, 10, 11 से बिना भाग दिए विभाज्यता की त्वरित जाँच।'
    },
    'prime-factorisation': {
      name: 'Prime Factorisation',
      nameHi: 'अभाज्य गुणनखंडन',
      prereq: 'Prime Numbers & Divisibility',
      prereqHi: 'अभाज्य संख्याएँ और विभाज्यता',
      desc: 'Factor tree and continuous division into prime components.',
      descHi: 'गुणनखंड वृक्ष और अभाज्य संख्याओं के गुणनफल के रूप में व्यक्त करना।'
    },
    'hcf-highest-common-factor': {
      name: 'Highest Common Factor (HCF)',
      nameHi: 'महत्तम समापवर्तक (म.स.प.)',
      prereq: 'Prime Factorisation',
      prereqHi: 'अभाज्य गुणनखंडन',
      desc: 'Greatest common divisor among numbers using prime factorization.',
      descHi: 'दो या अधिक संख्याओं का सबसे बड़ा उभयनिष्ठ गुणनखंड।'
    },
    'lcm-lowest-common-multiple': {
      name: 'Lowest Common Multiple (LCM)',
      nameHi: 'लघुत्तम समापवर्त्य (ल.स.प.)',
      prereq: 'Prime Factorisation & Multiples',
      prereqHi: 'अभाज्य गुणनखंडन और गुणज',
      desc: 'Smallest common multiple using continuous prime division.',
      descHi: 'दो या अधिक संख्याओं का सबसे छोटा उभयनिष्ठ गुणज।'
    }
  },
  'integers': {
    'intro-integers': {
      name: 'Introduction to Integers',
      nameHi: 'पूर्णांकों का परिचय',
      prereq: 'Whole Numbers',
      prereqHi: 'पूर्ण संख्याएँ',
      desc: 'Need for negative numbers (temperatures below zero, depths, debt).',
      descHi: 'ऋणात्मक संख्याओं की आवश्यकता (शून्य से नीचे तापमान, गहराई, हानि)।'
    },
    'integers-on-number-line': {
      name: 'Integers on Number Line',
      nameHi: 'संख्या रेखा पर पूर्णांक',
      prereq: 'Introduction to Integers',
      prereqHi: 'पूर्णांकों का परिचय',
      desc: 'Zero at centre, positive integers right, negative integers left.',
      descHi: 'शून्य केंद्र में, धनात्मक दाएँ और ऋणात्मक बाएँ।'
    },
    'ordering-integers': {
      name: 'Ordering & Comparison',
      nameHi: 'पूर्णांकों की तुलना और क्रम',
      prereq: 'Number Line Representation',
      prereqHi: 'संख्या रेखा निरूपण',
      desc: 'Any number to the right is greater: -2 > -5, 0 > -1.',
      descHi: 'संख्या रेखा पर जो दाएँ है वह बड़ा है: -2 > -5, 0 > -1।'
    },
    'addition-integers': {
      name: 'Addition of Integers',
      nameHi: 'पूर्णांकों का जोड़',
      prereq: 'Ordering Integers',
      prereqHi: 'पूर्णांकों की तुलना',
      desc: 'Adding with same signs and opposite signs using counters/number line.',
      descHi: 'समान और विपरीत चिन्ह वाले पूर्णांकों को जोड़ना।'
    },
    'subtraction-integers': {
      name: 'Subtraction of Integers',
      nameHi: 'पूर्णांकों का घटाव',
      prereq: 'Addition of Integers & Additive Inverse',
      prereqHi: 'पूर्णांकों का जोड़ और योज्य प्रतिलोम',
      desc: 'Subtracting an integer is the same as adding its additive inverse: a - b = a + (-b).',
      descHi: 'पूर्णांक घटाना मतलब उसका योज्य प्रतिलोम जोड़ना: a - b = a + (-b)।'
    }
  },
  'decimals': {
    'tenths-and-hundredths': {
      name: 'Tenths and Hundredths',
      nameHi: 'दशांश और शतांश',
      prereq: 'Fractions & Place Value',
      prereqHi: 'भिन्न और स्थानीय मान',
      desc: 'Decimal notation for 1/10 (0.1) and 1/100 (0.01).',
      descHi: '1/10 (0.1) और 1/100 (0.01) का दशमलव रूप में निरूपण।'
    },
    'comparing-decimals': {
      name: 'Comparing Decimals',
      nameHi: 'दशमलवों की तुलना',
      prereq: 'Tenths & Hundredths',
      prereqHi: 'दशांश और शतांश',
      desc: 'Comparing whole parts first, then tenths, then hundredths place.',
      descHi: 'पहले पूर्ण भाग, फिर दशांश और फिर शतांश स्थान की तुलना।'
    },
    'using-decimals-money-length': {
      name: 'Decimals in Money & Measurement',
      nameHi: 'मुद्रा और मापन में दशमलव',
      prereq: 'Place Value & Fractions',
      prereqHi: 'स्थानीय मान और भिन्न',
      desc: 'Converting paise to rupees (50 paise = ₹0.50), cm to m, grams to kg.',
      descHi: 'पैसे से रुपये (50 पैसे = ₹0.50), सेमी से मीटर, ग्राम से किग्रा में रूपांतरण।'
    },
    'addition-decimals': {
      name: 'Addition & Subtraction of Decimals',
      nameHi: 'दशमलवों का जोड़ व घटाव',
      prereq: 'Comparing Decimals',
      prereqHi: 'दशमलवों की तुलना',
      desc: 'Aligning decimal points before vertical addition and subtraction.',
      descHi: 'जोड़ते या घटाते समय दशमलव बिंदु को ठीक एक सीध में रखना।'
    }
  },
  'basic-geometry': {
    'points-lines-rays': {
      name: 'Points, Lines & Rays',
      nameHi: 'बिंदु, रेखाखंड और किरण',
      prereq: 'Spatial Awareness',
      prereqHi: 'आकृतियों की समझ',
      desc: 'Point (exact position), line segment (definite length), ray (one fixed end).',
      descHi: 'बिंदु (स्थान), रेखाखंड (निश्चित लंबाई के 2 अंत बिंदु), किरण (1 प्रारंभिक बिंदु)।'
    },
    'curves-polygons': {
      name: 'Curves & Polygons',
      nameHi: 'वक्र और बहुभुज',
      prereq: 'Points & Lines',
      prereqHi: 'बिंदु और रेखा',
      desc: 'Simple closed curves, open curves, interior/exterior, and polygons made of segments.',
      descHi: 'सरल बंद वक्र, खुला वक्र, अभ्यंतर, बहिर्भाग और केवल रेखाखंडों से बने बहुभुज।'
    },
    'angles-triangles': {
      name: 'Angles & Triangles',
      nameHi: 'कोण और त्रिभुज',
      prereq: 'Rays and Polygons',
      prereqHi: 'किरण और बहुभुज',
      desc: 'Two rays with a common vertex form an angle; three-sided polygon is a triangle.',
      descHi: 'उभयनिष्ठ प्रारंभिक बिंदु वाली दो किरणें कोण बनाती हैं; तीन भुजाओं वाला बहुभुज त्रिभुज है।'
    },
    'quadrilaterals-circles': {
      name: 'Quadrilaterals & Circles',
      nameHi: 'चतुर्भुज और वृत्त',
      prereq: 'Angles and Triangles',
      prereqHi: 'कोण और त्रिभुज',
      desc: '4-sided polygon (quadrilateral); round curve with center, radius, diameter, chord.',
      descHi: '4 भुजाओं वाला बहुभुज (चतुर्भुज); वृत्त का केंद्र, त्रिज्या, व्यास और जीवा।'
    }
  }
};

export default function ConceptMap({
  topicId = 'fractions',
  topicProgress = {},
  language = 'en',
  onSelectConcept = null
}) {
  const navigate = useNavigate();
  const currentConcepts = CONCEPTS_BY_TOPIC[topicId] || CONCEPTS_BY_TOPIC.fractions;
  const conceptKeys = Object.keys(currentConcepts);

  const [activeConceptKey, setActiveConceptKey] = useState(conceptKeys[0] || 'numerator-denominator');

  useEffect(() => {
    if (!currentConcepts[activeConceptKey]) {
      setActiveConceptKey(conceptKeys[0] || 'numerator-denominator');
    }
  }, [topicId, currentConcepts, activeConceptKey, conceptKeys]);

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

  const activeMeta = currentConcepts[activeConceptKey] || {};
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
        {Object.entries(currentConcepts).map(([key, meta], index) => {
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
                  onClick={() => navigate(`/student/learn?stage=learn&topic=${topicId}`)}
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
                  onClick={() => navigate(`/student/learn?stage=test&topic=${topicId}`)}
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
                  onClick={() => navigate(`/student/learn?stage=solve&topic=${topicId}`)}
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
