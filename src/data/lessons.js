/**
 * SikshaPath - Lessons Content
 * Comprehensive student-friendly lessons for Class 6 Mathematics - Fractions
 * Bilingual (English & Hindi) with visual guides, worked examples, and foundation recap.
 */

export const fractionsLesson = {
  topicId: 'fractions',
  title: 'Understanding Fractions',
  titleHi: 'भिन्न को समझें',
  subtitle: 'A fraction represents a part of a whole or a collection.',
  subtitleHi: 'भिन्न किसी पूर्ण वस्तु या समूह के एक भाग को दर्शाती है।',

  // Foundation Recap (especially for struggling learners scoring < 50%)
  foundationRecap: {
    title: 'Foundation Recap: What is a Whole and Equal Parts?',
    titleHi: 'बुनियादी पुनरावलोकन: पूर्ण (Whole) और बराबर भाग क्या हैं?',
    description:
      'Before learning fractions, let’s remember how sharing works fairly. Imagine sharing 1 whole chapati or chocolate among friends.',
    descriptionHi:
      'भिन्न सीखने से पहले, आइए याद करें कि बराबर बँटवारा कैसे होता है। सोचिए एक पूरी रोटी या चॉकलेट को दोस्तों में बराबर बाँटना है।',
    keyPoints: [
      {
        en: 'A **Whole** is one complete item (1 whole pizza, 1 sheet of paper, 1 glass of milk).',
        hi: 'एक **पूर्ण (Whole)** का अर्थ है कोई एक पूरी वस्तु (जैसे 1 पूरी रोटी, 1 कागज़, 1 गिलास दूध)।'
      },
      {
        en: 'Parts MUST be **equal in size** to form a fraction. If pieces are uneven, it is NOT a mathematical fraction!',
        hi: 'भिन्न बनने के लिए सभी टुकड़ों का **आकार में बराबर** होना आवश्यक है। यदि टुकड़े छोटे-बड़े हैं, तो वह सही भिन्न नहीं है!'
      },
      {
        en: 'Division is just splitting into equal groups: 4 ÷ 2 = 2. A fraction is another way of writing division: 1/2 means 1 divided by 2.',
        hi: 'भाग का मतलब बराबर भागों में बाँटना है: 4 ÷ 2 = 2। भिन्न भी भाग लिखने का एक रूप है: 1/2 का अर्थ है 1 को 2 से भाग देना।'
      }
    ],
    visualExample: {
      totalParts: 4,
      shadedParts: 1,
      caption: '1 whole square cut into 4 equal parts. 1 part is colored = 1/4 (one-fourth)',
      captionHi: '1 पूरा वर्ग 4 बराबर भागों में कटा है। 1 भाग रंगा है = 1/4 (एक चौथाई)'
    }
  },

  // Modules / Concepts
  modules: [
    {
      id: 'numerator-denominator',
      concept: 'numerator-denominator',
      title: '1. Numerator & Denominator',
      titleHi: '1. अंश और हर (Numerator & Denominator)',
      summary: 'Every fraction has two numbers separated by a horizontal fraction bar.',
      summaryHi: 'प्रत्येक भिन्न में दो संख्याएँ होती हैं जो एक क्षैतिज रेखा द्वारा अलग होती हैं।',
      content: {
        en: [
          '**Numerator (Top Number):** Tells us HOW MANY parts are being considered or taken.',
          '**Denominator (Bottom Number):** Tells us the TOTAL number of equal parts the whole is divided into.',
          'Memory Trick: **N**umerator is **N**orth (Up); **D**enominator is **D**own (Down below).'
        ],
        hi: [
          '**अंश (ऊपर की संख्या):** बताता है कि हमने कितने बराबर भाग लिए हैं या चुन रहे हैं।',
          '**हर (नीचे की संख्या):** बताता है कि पूरी वस्तु को कुल कितने बराबर भागों में बाँटा गया है।',
          'याद रखने की युक्ति: अंश हमेशा ऊपर रहता है और हर हमेशा नीचे आधार बनता है।'
        ]
      },
      workedExample: {
        problem: 'In a pizza cut into 8 equal slices, Simran ate 3 slices. Write the fraction.',
        problemHi: '8 बराबर स्लाइस वाले पिज़्ज़ा में से सिमरन ने 3 स्लाइस खाए। भिन्न लिखिए।',
        solution: 'Total equal parts (Denominator) = 8. Parts eaten (Numerator) = 3. Fraction = 3/8.',
        solutionHi: 'कुल बराबर भाग (हर) = 8। खाए गए भाग (अंश) = 3। भिन्न = 3/8।'
      },
      visual: {
        numerator: 3,
        denominator: 8
      }
    },

    {
      id: 'types-of-fractions',
      concept: 'types-of-fractions',
      title: '2. Types of Fractions',
      titleHi: '2. भिन्नों के प्रकार (Types of Fractions)',
      summary: 'Proper fractions, Improper fractions, and Mixed numbers.',
      summaryHi: 'उचित भिन्न, विषम भिन्न और मिश्र भिन्न।',
      content: {
        en: [
          '**Proper Fraction:** Numerator < Denominator (e.g., 2/3, 5/8). Its value is always LESS than 1 whole.',
          '**Improper Fraction:** Numerator ≥ Denominator (e.g., 7/4, 9/5). Its value is equal to or GREATER than 1 whole.',
          '**Mixed Number:** A combination of a whole number and a proper fraction (e.g., 1 3/4). 7/4 = 1 3/4.'
        ],
        hi: [
          '**उचित भिन्न (Proper Fraction):** अंश < हर (जैसे 2/3, 5/8)। इसका मान हमेशा 1 से कम होता है।',
          '**विषम भिन्न (Improper Fraction):** अंश ≥ हर (जैसे 7/4, 9/5)। इसका मान 1 या 1 से अधिक होता है।',
          '**मिश्र भिन्न (Mixed Number):** एक पूर्ण संख्या और एक उचित भिन्न का जोड़ (जैसे 1 3/4)। 7/4 = 1 3/4।'
        ]
      },
      workedExample: {
        problem: 'Convert 11/4 into a mixed number.',
        problemHi: '11/4 को मिश्र भिन्न में बदलिए।',
        solution: 'Divide 11 by 4: 11 ÷ 4 = 2 with remainder 3. Whole number = 2, Numerator = 3, Denominator = 4. Answer: 2 3/4.',
        solutionHi: '11 को 4 से भाग दें: 11 ÷ 4 = 2 (भागफल) और 3 (शेषफल)। पूर्ण संख्या = 2, अंश = 3, हर = 4। उत्तर: 2 3/4।'
      },
      visual: {
        numerator: 7,
        denominator: 4
      }
    },

    {
      id: 'equivalent-fractions',
      concept: 'equivalent-fractions',
      title: '3. Equivalent Fractions',
      titleHi: '3. तुल्य भिन्न (Equivalent Fractions)',
      summary: 'Fractions that look different but have the exact same value.',
      summaryHi: 'ऐसी भिन्न जो दिखने में भिन्न हों पर उनका मान बिल्कुल बराबर हो।',
      content: {
        en: [
          'Equivalent fractions represent the same portion of the whole.',
          '**Rule:** Multiply or divide BOTH the numerator and denominator by the SAME non-zero number.',
          'Example: 1/2 = (1×2)/(2×2) = 2/4 = (1×3)/(2×3) = 3/6 = 4/8.'
        ],
        hi: [
          'तुल्य भिन्न एक ही पूर्ण वस्तु के समान हिस्से को दर्शाती हैं।',
          '**नियम:** अंश और हर दोनों को एक ही शून्यतर संख्या से गुणा या भाग करें।',
          'उदाहरण: 1/2 = (1×2)/(2×2) = 2/4 = (1×3)/(2×3) = 3/6 = 4/8।'
        ]
      },
      workedExample: {
        problem: 'Find the missing numerator: 2/5 = ? / 15',
        problemHi: 'लुप्त अंश ज्ञात कीजिए: 2/5 = ? / 15',
        solution: 'Look at the denominators: 5 × 3 = 15. So multiply the numerator by 3 as well: 2 × 3 = 6. Thus, 2/5 = 6/15.',
        solutionHi: 'हरों को देखिए: 5 × 3 = 15। इसलिए अंश को भी 3 से गुणा करें: 2 × 3 = 6। अतः 2/5 = 6/15।'
      },
      visual: {
        numerator: 2,
        denominator: 4
      }
    },

    {
      id: 'comparing-fractions',
      concept: 'comparing-fractions',
      title: '4. Comparing Fractions',
      titleHi: '4. भिन्नों की तुलना (Comparing Fractions)',
      summary: 'How to tell which fraction is larger, smaller, or if they are equal.',
      summaryHi: 'यह जानना कि कौन-सी भिन्न बड़ी है, छोटी है या बराबर है।',
      content: {
        en: [
          '**Like Denominators:** When denominators are equal, compare the numerators directly. Larger numerator = larger fraction! Example: 5/7 > 3/7.',
          '**Like Numerators:** When numerators are equal, SMALLER denominator means LARGER fraction (fewer, bigger pieces!). Example: 1/3 > 1/5.',
          '**Unlike Fractions:** Find the LCM of denominators to convert them to like fractions, then compare.'
        ],
        hi: [
          '**समान हर होने पर:** जब हर बराबर हों, तो सीधे अंशों की तुलना करें। बड़ा अंश = बड़ी भिन्न! उदाहरण: 5/7 > 3/7।',
          '**समान अंश होने पर:** जब अंश बराबर हों, तो छोटा हर = बड़ी भिन्न (क्योंकि टुकड़े बड़े होते हैं!)। उदाहरण: 1/3 > 1/5।',
          '**असमान भिन्न होने पर:** हरों का ल.स.प. (LCM) लेकर उन्हें समान हर वाली भिन्न में बदलें और तुलना करें।'
        ]
      },
      workedExample: {
        problem: 'Which is greater: 2/3 or 3/4?',
        problemHi: 'कौन बड़ा है: 2/3 या 3/4?',
        solution: 'LCM of 3 and 4 is 12. 2/3 = 8/12, and 3/4 = 9/12. Since 9/12 > 8/12, 3/4 is greater than 2/3.',
        solutionHi: '3 और 4 का ल.स.प. (LCM) 12 है। 2/3 = 8/12 और 3/4 = 9/12। चूँकि 9/12 > 8/12, इसलिए 3/4 बड़ा है 2/3 से।'
      },
      visual: {
        numerator: 3,
        denominator: 4
      }
    },

    {
      id: 'addition-subtraction-fractions',
      concept: 'addition-subtraction-fractions',
      title: '5. Adding & Subtracting Fractions',
      titleHi: '5. भिन्नों का जोड़ और घटाव (Addition & Subtraction)',
      summary: 'Mastering addition and subtraction with like and unlike denominators.',
      summaryHi: 'समान और असमान हर वाली भिन्नों को जोड़ना और घटाना।',
      content: {
        en: [
          '**Like Denominators:** Keep the denominator unchanged; add or subtract the numerators. Example: 2/7 + 3/7 = (2+3)/7 = 5/7.',
          '**CAUTION:** Never add the denominators! 1/2 + 1/2 is NOT 2/4, it is 2/2 = 1 whole!',
          '**Unlike Denominators:** Convert to equivalent fractions with a common denominator first, then add/subtract.'
        ],
        hi: [
          '**समान हर होने पर:** हर को वैसा ही रखें; केवल अंशों को जोड़ें या घटाएँ। उदाहरण: 2/7 + 3/7 = (2+3)/7 = 5/7।',
          '**सावधानी:** हरों को कभी मत जोड़िए! 1/2 + 1/2 = 2/4 नहीं होता, बल्कि 2/2 = 1 होता है!',
          '**असमान हर होने पर:** पहले ल.स.प. (LCM) द्वारा समान हर बनाएँ, फिर अंशों को जोड़ें या घटाएँ।'
        ]
      },
      workedExample: {
        problem: 'Calculate: 1/3 + 1/6',
        problemHi: 'हल कीजिए: 1/3 + 1/6',
        solution: 'LCM of 3 and 6 is 6. Convert 1/3: 1/3 = 2/6. Now add: 2/6 + 1/6 = 3/6. Simplify: 3/6 = 1/2.',
        solutionHi: '3 और 6 का ल.स.प. 6 है। 1/3 = 2/6। अब जोड़ें: 2/6 + 1/6 = 3/6। सरल करने पर: 3/6 = 1/2।'
      },
      visual: {
        numerator: 3,
        denominator: 6
      }
    }
  ]
};

export default fractionsLesson;

