/**
 * SikshaPath - Subject and Topic Hierarchy
 * Comprehensive curriculum structure for Classes 6-10
 * Aligned with Indian school curriculum (NCERT)
 */

const subjects = {
  mathematics: {
    name: 'Mathematics',
    nameHi: 'गणित',
    classes: {
      6: {
        topics: [
          {
            id: 'whole-numbers',
            name: 'Whole Numbers',
            nameHi: 'पूर्ण संख्याएँ',
            icon: '🔢',
            chapterNumber: 2,
            prerequisites: [],
            concepts: [
              'natural-vs-whole',
              'predecessor-successor',
              'number-line-operations',
              'properties-closure-commutative',
              'distributive-property',
              'whole-number-patterns'
            ],
            order: 0,
            fullyImplemented: true
          },
          {
            id: 'playing-with-numbers',
            name: 'Playing with Numbers',
            nameHi: 'संख्याओं के साथ खेलना',
            icon: '🧩',
            chapterNumber: 3,
            prerequisites: ['whole-numbers'],
            concepts: [
              'factors-and-multiples',
              'prime-and-composite',
              'divisibility-rules',
              'prime-factorisation',
              'hcf-gcd',
              'lcm-word-problems'
            ],
            order: 1,
            fullyImplemented: true
          },
          {
            id: 'integers',
            name: 'Integers',
            nameHi: 'पूर्णांक',
            icon: '➖➕',
            chapterNumber: 6,
            prerequisites: ['whole-numbers'],
            concepts: [
              'need-for-integers',
              'integers-on-number-line',
              'ordering-comparing-integers',
              'addition-of-integers',
              'subtraction-of-integers',
              'integer-word-problems'
            ],
            order: 2,
            fullyImplemented: true
          },
          {
            id: 'fractions',
            name: 'Fractions',
            nameHi: 'भिन्न',
            icon: '🍕',
            chapterNumber: 7,
            prerequisites: ['whole-numbers'],
            concepts: [
              'numerator-denominator',
              'types-of-fractions',
              'equivalent-fractions',
              'comparing-fractions',
              'addition-subtraction-fractions',
              'fraction-word-problems'
            ],
            order: 3,
            fullyImplemented: true
          },
          {
            id: 'decimals',
            name: 'Decimals',
            nameHi: 'दशमलव',
            icon: '🎯',
            chapterNumber: 8,
            prerequisites: ['fractions'],
            concepts: [
              'tenths-and-hundredths',
              'decimals-on-number-line',
              'decimals-money-measurement',
              'comparing-decimals',
              'addition-subtraction-decimals'
            ],
            order: 4,
            fullyImplemented: true
          },
          {
            id: 'basic-geometry',
            name: 'Basic Geometrical Ideas',
            nameHi: 'आधारभूत ज्यामितीय अवधारणाएँ',
            icon: '📐',
            chapterNumber: 4,
            prerequisites: [],
            concepts: [
              'points-lines-rays',
              'intersecting-parallel-lines',
              'angles-and-types',
              'triangles-quadrilaterals',
              'circles-radius-diameter'
            ],
            order: 5,
            fullyImplemented: true
          }
        ]
      },
      7: {
        topics: [
          {
            id: 'rational-numbers',
            name: 'Rational Numbers',
            nameHi: 'परिमेय संख्याएँ',
            prerequisites: ['fractions', 'integers'],
            concepts: [],
            order: 0,
            fullyImplemented: false
          },
          {
            id: 'exponents',
            name: 'Exponents and Powers',
            nameHi: 'घातांक और घात',
            prerequisites: ['whole-numbers'],
            concepts: [],
            order: 1,
            fullyImplemented: false
          }
        ]
      },
      8: {
        topics: [
          {
            id: 'linear-equations',
            name: 'Linear Equations',
            nameHi: 'रैखिक समीकरण',
            prerequisites: ['algebra-intro'],
            concepts: [],
            order: 0,
            fullyImplemented: false
          },
          {
            id: 'quadrilaterals',
            name: 'Quadrilaterals',
            nameHi: 'चतुर्भुज',
            prerequisites: ['geometry-basics'],
            concepts: [],
            order: 1,
            fullyImplemented: false
          }
        ]
      },
      9: {
        topics: [
          {
            id: 'polynomials',
            name: 'Polynomials',
            nameHi: 'बहुपद',
            prerequisites: ['linear-equations'],
            concepts: [],
            order: 0,
            fullyImplemented: false
          }
        ]
      },
      10: {
        topics: [
          {
            id: 'real-numbers',
            name: 'Real Numbers',
            nameHi: 'वास्तविक संख्याएँ',
            prerequisites: ['rational-numbers'],
            concepts: [],
            order: 0,
            fullyImplemented: false
          }
        ]
      }
    }
  },
  science: {
    name: 'Science',
    nameHi: 'विज्ञान',
    classes: {
      6: {
        topics: [
          {
            id: 'food-components',
            name: 'Components of Food',
            nameHi: 'भोजन के घटक',
            prerequisites: [],
            concepts: ['nutrients', 'balanced-diet'],
            order: 0,
            fullyImplemented: false
          },
          {
            id: 'sorting-materials',
            name: 'Sorting Materials',
            nameHi: 'पदार्थों का वर्गीकरण',
            prerequisites: [],
            concepts: [],
            order: 1,
            fullyImplemented: false
          }
        ]
      },
      7: {
        topics: [
          {
            id: 'nutrition-plants',
            name: 'Nutrition in Plants',
            nameHi: 'पौधों में पोषण',
            prerequisites: ['food-components'],
            concepts: [],
            order: 0,
            fullyImplemented: false
          }
        ]
      },
      8: {
        topics: [
          {
            id: 'cell-structure',
            name: 'Cell Structure',
            nameHi: 'कोशिका संरचना',
            prerequisites: [],
            concepts: [],
            order: 0,
            fullyImplemented: false
          }
        ]
      },
      9: {
        topics: [
          {
            id: 'motion',
            name: 'Motion',
            nameHi: 'गति',
            prerequisites: [],
            concepts: [],
            order: 0,
            fullyImplemented: false
          }
        ]
      },
      10: {
        topics: [
          {
            id: 'chemical-reactions',
            name: 'Chemical Reactions',
            nameHi: 'रासायनिक अभिक्रियाएँ',
            prerequisites: [],
            concepts: [],
            order: 0,
            fullyImplemented: false
          }
        ]
      }
    }
  }
};

export default subjects;
