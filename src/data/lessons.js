/**
 * SikshaPath - Lessons Content
 * Comprehensive NCERT Curriculum Aligned Lessons for Class 6 Mathematics
 * Topics Covered:
 * 1. Fractions (भिन्न) - NCERT Chapter 7
 * 2. Whole Numbers (पूर्ण संख्याएँ) - NCERT Chapter 2
 * 3. Playing with Numbers (संख्याओं के साथ खेलना) - NCERT Chapter 3
 * 4. Integers (पूर्णांक) - NCERT Chapter 6
 * 5. Decimals (दशमलव) - NCERT Chapter 8
 * 6. Basic Geometrical Ideas (आधारभूत ज्यामितीय अवधारणाएँ) - NCERT Chapter 4
 *
 * Bilingual (English & authentic Hindi NCERT terminology)
 * Includes foundation recaps, worked examples, visual configs, and rule explanations.
 */

// ============================================================
// 1. FRACTIONS (Chapter 7)
// ============================================================
export const fractionsLesson = {
  topicId: 'fractions',
  title: 'Understanding Fractions',
  titleHi: 'भिन्न को समझें',
  subtitle: 'A fraction represents a part of a whole or a collection.',
  subtitleHi: 'भिन्न किसी पूर्ण वस्तु या समूह के एक भाग को दर्शाती है।',
  icon: '🍕',
  chapterNumber: 7,

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
    },
    {
      id: 'fraction-word-problems',
      concept: 'fraction-word-problems',
      title: '6. Real-World Word Problems',
      titleHi: '6. इबारती प्रश्न (Word Problems)',
      summary: 'Applying fractions to recipes, travel distances, and study time.',
      summaryHi: 'दैनिक जीवन में भिन्न का अनुप्रयोग: भोजन, दूरी और अध्ययन का समय।',
      content: {
        en: [
          'Read carefully: identify the whole and what fraction is being questioned.',
          'Subtracting from a whole: 1 whole = 1 = 5/5, 8/8, 12/12.',
          'If Ramesh read 2/5 of a book on Saturday, the remaining unread fraction is 1 - 2/5 = 5/5 - 2/5 = 3/5.'
        ],
        hi: [
          'प्रश्न को ध्यान से पढ़ें: कुल पूर्ण वस्तु को पहचानें और किस हिस्से के बारे में पूछा गया है।',
          '1 पूर्ण वस्तु में से घटाना: 1 = 5/5, 8/8, 12/12 आदि।',
          'यदि रमेश ने शनिवार को किसी पुस्तक का 2/5 भाग पढ़ा, तो शेष बचा भाग 1 - 2/5 = 5/5 - 2/5 = 3/5 होगा।'
        ]
      },
      workedExample: {
        problem: 'Sarita bought 2/5 metre of ribbon and Lalita 3/4 metre. What is the total length of the ribbon bought?',
        problemHi: 'सरिता ने 2/5 मीटर रिबन खरीदा और ललिता ने 3/4 मीटर। दोनों ने कुल कितना रिबन खरीदा?',
        solution: 'Total = 2/5 + 3/4. LCM of 5 and 4 is 20. 2/5 = 8/20, 3/4 = 15/20. Total = 8/20 + 15/20 = 23/20 = 1 3/20 metres.',
        solutionHi: 'कुल रिबन = 2/5 + 3/4। 5 और 4 का ल.स.प. 20 है। 2/5 = 8/20, 3/4 = 15/20। कुल = 8/20 + 15/20 = 23/20 = 1 3/20 मीटर।'
      },
      visual: {
        numerator: 7,
        denominator: 10
      }
    }
  ]
};

// ============================================================
// 2. WHOLE NUMBERS (Chapter 2)
// ============================================================
export const wholeNumbersLesson = {
  topicId: 'whole-numbers',
  title: 'Whole Numbers',
  titleHi: 'पूर्ण संख्याएँ (Whole Numbers)',
  subtitle: 'Understanding natural numbers, zero, properties, and the number line.',
  subtitleHi: 'प्राकृतिक संख्याएँ, शून्य, संक्रियाएँ और संख्या रेखा की विस्तृत समझ।',
  icon: '🔢',
  chapterNumber: 2,

  foundationRecap: {
    title: 'Foundation Recap: Counting & The Origin of Zero',
    titleHi: 'बुनियादी पुनरावलोकन: गणना और शून्य का आगमन',
    description:
      'We naturally count objects starting with 1, 2, 3... When nothing remains in a basket, how do we write it? We use the number 0!',
    descriptionHi:
      'वस्तुओं को गिनने के लिए हम 1, 2, 3... से शुरू करते हैं। जब टोकरी में कुछ भी नहीं बचता, तो उसे कैसे लिखते हैं? हम शून्य (0) का उपयोग करते हैं!',
    keyPoints: [
      {
        en: '**Natural Numbers:** The counting numbers 1, 2, 3, 4, 5... (Smallest natural number is 1).',
        hi: '**प्राकृतिक संख्याएँ:** गिनती की संख्याएँ 1, 2, 3, 4, 5... (सबसे छोटी प्राकृतिक संख्या 1 है)।'
      },
      {
        en: '**Whole Numbers:** Natural numbers together with 0 form the collection of Whole numbers: 0, 1, 2, 3... (Smallest whole number is 0).',
        hi: '**पूर्ण संख्याएँ:** प्राकृतिक संख्याओं में 0 को मिलाने पर पूर्ण संख्याएँ बनती हैं: 0, 1, 2, 3... (सबसे छोटी पूर्ण संख्या 0 है)।'
      },
      {
        en: '**Golden Fact:** Every natural number is a whole number, but 0 is a whole number that is NOT a natural number!',
        hi: '**महत्वपूर्ण तथ्य:** प्रत्येक प्राकृतिक संख्या एक पूर्ण संख्या भी है, परंतु 0 एक ऐसी पूर्ण संख्या है जो प्राकृतिक संख्या नहीं है!'
      }
    ],
    visualExample: {
      totalParts: 5,
      shadedParts: 0,
      caption: 'An empty basket contains 0 apples. 0 + 5 apples = 5 apples.',
      captionHi: 'एक खाली टोकरी में 0 सेब हैं। 0 + 5 सेब = 5 सेब।'
    }
  },

  modules: [
    {
      id: 'natural-vs-whole',
      concept: 'natural-vs-whole',
      title: '1. Natural vs Whole Numbers',
      titleHi: '1. प्राकृतिक संख्याएँ बनाम पूर्ण संख्याएँ',
      summary: 'Distinguishing counting numbers from the complete whole number system.',
      summaryHi: 'गणना की संख्याओं और पूर्ण संख्या प्रणाली में स्पष्ट अंतर।',
      content: {
        en: [
          'Natural numbers = {1, 2, 3, 4, 5, ...}',
          'Whole numbers = {0, 1, 2, 3, 4, 5, ...}',
          'There is NO greatest whole number because numbers go on infinitely.'
        ],
        hi: [
          'प्राकृतिक संख्याएँ = {1, 2, 3, 4, 5, ...}',
          'पूर्ण संख्याएँ = {0, 1, 2, 3, 4, 5, ...}',
          'कोई भी सबसे बड़ी पूर्ण संख्या नहीं होती क्योंकि संख्याएँ अनंत तक जाती हैं।'
        ]
      },
      workedExample: {
        problem: 'How many whole numbers are there between 32 and 53?',
        problemHi: '32 और 53 के बीच कितनी पूर्ण संख्याएँ हैं?',
        solution: 'Subtract and deduct 1 for exclusive count: (53 - 32) - 1 = 21 - 1 = 20 whole numbers (from 33 to 52).',
        solutionHi: 'दोनों के अंतर में से 1 घटाएँ: (53 - 32) - 1 = 21 - 1 = 20 पूर्ण संख्याएँ (33 से 52 तक)।'
      }
    },
    {
      id: 'predecessor-successor',
      concept: 'predecessor-successor',
      title: '2. Predecessor & Successor',
      titleHi: '2. पूर्ववर्ती और परवर्ती (Predecessor & Successor)',
      summary: 'Stepping one backward (n - 1) and one forward (n + 1).',
      summaryHi: 'एक कदम पीछे (पूर्ववर्ती) और एक कदम आगे (परवर्ती)।',
      content: {
        en: [
          '**Successor (परवर्ती):** The number obtained by adding 1: Successor of n = n + 1.',
          '**Predecessor (पूर्ववर्ती):** The number obtained by subtracting 1: Predecessor of n = n - 1.',
          '**Special Case:** The whole number 0 has NO predecessor in whole numbers!'
        ],
        hi: [
          '**परवर्ती (Successor):** किसी संख्या में 1 जोड़ने पर प्राप्त अगली संख्या: n + 1।',
          '**पूर्ववर्ती (Predecessor):** किसी संख्या में से 1 घटाने पर प्राप्त पिछली संख्या: n - 1।',
          '**विशेष नियम:** पूर्ण संख्याओं के संग्रह में 0 का कोई पूर्ववर्ती नहीं होता!'
        ]
      },
      workedExample: {
        problem: 'Find the predecessor of 10,000 and the successor of 2440701.',
        problemHi: '10,000 का पूर्ववर्ती और 2440701 का परवर्ती ज्ञात कीजिए।',
        solution: 'Predecessor of 10,000 = 10,000 - 1 = 9,999. Successor of 2,440,701 = 2,440,701 + 1 = 2,440,702.',
        solutionHi: '10,000 का पूर्ववर्ती = 10,000 - 1 = 9,999। 2440701 का परवर्ती = 2440701 + 1 = 2440702।'
      }
    },
    {
      id: 'number-line-operations',
      concept: 'number-line-operations',
      title: '3. Operations on the Number Line',
      titleHi: '3. संख्या रेखा पर संक्रियाएँ (जोड़, घटाव, गुणा)',
      summary: 'Visualizing basic arithmetic as movement along the number line.',
      summaryHi: 'संख्या रेखा पर दाईं और बाईं ओर गति द्वारा जोड़, घटाव और गुणा को देखना।',
      content: {
        en: [
          '**Addition on Number Line:** Moving to the RIGHT. For 3 + 4, start at 3 and make 4 jumps right to reach 7.',
          '**Subtraction on Number Line:** Moving to the LEFT. For 7 - 5, start at 7 and make 5 jumps left to reach 2.',
          '**Multiplication on Number Line:** Repeated jumps of equal units. For 3 × 2, start at 0 and make 3 jumps of 2 units each to land on 6.'
        ],
        hi: [
          '**संख्या रेखा पर जोड़:** दाईं ओर चलना। 3 + 4 के लिए 3 से शुरू करके 4 कदम दाईं ओर चलें = 7।',
          '**संख्या रेखा पर घटाव:** बाईं ओर चलना। 7 - 5 के लिए 7 से शुरू करके 5 कदम बाईं ओर चलें = 2।',
          '**संख्या रेखा पर गुणा:** समान दूरी के बार-बार कदम। 3 × 2 के लिए 0 से शुरू करके 2-2 इकाइयों के 3 कदम चलें = 6।'
        ]
      },
      workedExample: {
        problem: 'Show 4 × 3 on the number line.',
        problemHi: 'संख्या रेखा पर 4 × 3 को दर्शाइए।',
        solution: 'Start at 0. Take 4 successive jumps of 3 units each: 0 -> 3 -> 6 -> 9 -> 12. Result = 12.',
        solutionHi: '0 से प्रारंभ करें। 3-3 इकाइयों के 4 क्रमिक कदम लें: 0 -> 3 -> 6 -> 9 -> 12। परिणाम = 12।'
      }
    },
    {
      id: 'properties-closure-commutative',
      concept: 'properties-closure-commutative',
      title: '4. Closure & Commutative Properties',
      titleHi: '4. संवृत और क्रमविनिमेय गुणधर्म',
      summary: 'Fundamental properties that govern addition and multiplication.',
      summaryHi: 'जोड़ और गुणा को नियंत्रित करने वाले मूलभूत नियम।',
      content: {
        en: [
          '**Closure Property:** Sum or product of two whole numbers is always a whole number (a + b ∈ W, a × b ∈ W). Subtraction is NOT closed (3 - 5 is not whole).',
          '**Commutative Property (क्रमविनिमेयता):** Order of numbers does not change the result: a + b = b + a and a × b = b × a.',
          '**Associative Property (साहचर्यता):** Grouping does not matter: (a + b) + c = a + (b + c) and (a × b) × c = a × (b × c).'
        ],
        hi: [
          '**संवृत गुणधर्म (Closure):** दो पूर्ण संख्याओं का जोड़ या गुणा हमेशा एक पूर्ण संख्या होता है। घटाव संवृत नहीं है (3 - 5 पूर्ण संख्या नहीं है)।',
          '**क्रमविनिमेय गुणधर्म (Commutative):** क्रम बदलने पर भी परिणाम नहीं बदलता: a + b = b + a तथा a × b = b × a।',
          '**साहचर्य गुणधर्म (Associative):** समूह बदलने पर परिणाम समान रहता है: (a + b) + c = a + (b + c) तथा (a × b) × c = a × (b × c)।'
        ]
      },
      workedExample: {
        problem: 'Find the sum by suitable rearrangement: 837 + 208 + 363',
        problemHi: 'उचित क्रम में रखकर योग ज्ञात कीजिए: 837 + 208 + 363',
        solution: 'Notice that 837 + 363 ends in 0: (837 + 363) + 208 = 1200 + 208 = 1408.',
        solutionHi: 'ध्यान दें कि 837 और 363 को जोड़ने पर अंत में 0 आता है: (837 + 363) + 208 = 1200 + 208 = 1408।'
      }
    },
    {
      id: 'distributive-property',
      concept: 'distributive-property',
      title: '5. Distributive Property of Multiplication',
      titleHi: '5. गुणन का योग पर वितरण गुणधर्म',
      summary: 'Breaking difficult multiplications into quick mental math: a × (b + c) = a×b + a×c.',
      summaryHi: 'कठिन गुणन को आसान बनाना: a × (b + c) = a×b + a×c।',
      content: {
        en: [
          'Distributivity: a × (b + c) = (a × b) + (a × c)',
          'Distributivity over subtraction: a × (b - c) = (a × b) - (a × c)',
          'This property saves massive time in daily Indian market and business arithmetic!'
        ],
        hi: [
          'वितरण नियम: a × (b + c) = (a × b) + (a × c)',
          'घटाव पर वितरण: a × (b - c) = (a × b) - (a × c)',
          'यह नियम दैनिक गणनाओं और बाज़ार के हिसाब-किताब में बहुत समय बचाता है!'
        ]
      },
      workedExample: {
        problem: 'Find the product using distributive property: 738 × 103',
        problemHi: 'वितरण गुणधर्म का प्रयोग करके गुणनफल ज्ञात कीजिए: 738 × 103',
        solution: 'Write 103 as (100 + 3): 738 × (100 + 3) = (738 × 100) + (738 × 3) = 73,800 + 2,214 = 76,014.',
        solutionHi: '103 को (100 + 3) लिखें: 738 × (100 + 3) = (738 × 100) + (738 × 3) = 73,800 + 2,214 = 76,014।'
      }
    }
  ]
};

// ============================================================
// 3. PLAYING WITH NUMBERS (Chapter 3)
// ============================================================
export const playingWithNumbersLesson = {
  topicId: 'playing-with-numbers',
  title: 'Playing with Numbers',
  titleHi: 'संख्याओं के साथ खेलना (Playing with Numbers)',
  subtitle: 'Factors, Multiples, Prime & Composite, Divisibility Rules, HCF and LCM.',
  subtitleHi: 'गुणनखंड, गुणज, अभाज्य संख्याएँ, विभाज्यता के नियम, म.स.प. और ल.स.प.।',
  icon: '🧩',
  chapterNumber: 3,

  foundationRecap: {
    title: 'Foundation Recap: Splitting into Exact Groups',
    titleHi: 'बुनियादी पुनरावलोकन: सटीक समूहों में बाँटना',
    description:
      'If you have 12 marbles, can you arrange them in equal rows? You can make 1 row of 12, 2 rows of 6, 3 rows of 4, 4 rows of 3, or 6 rows of 2. These numbers are called Factors!',
    descriptionHi:
      'यदि आपके पास 12 कंचे हैं, तो क्या आप उन्हें बराबर पंक्तियों में सजा सकते हैं? आप 1 पंक्ति 12 की, 2 पंक्तियाँ 6 की, 3 पंक्तियाँ 4 की बना सकते हैं। ये सभी 12 के गुणनखंड हैं!',
    keyPoints: [
      {
        en: '**1** is a factor of every number, and every number is a factor of itself.',
        hi: '**1** प्रत्येक संख्या का गुणनखंड होता है, और प्रत्येक संख्या स्वयं का एक गुणनखंड होती है।'
      },
      {
        en: 'A factor of a number is an **exact divisor** of that number (remainder is 0).',
        hi: 'किसी संख्या का गुणनखंड उसका एक **सटीक विभाजक** होता है (शेषफल शून्य रहता है)।'
      },
      {
        en: 'The number of factors of a given number is **finite**, but multiples are **infinite**.',
        hi: 'किसी संख्या के गुणनखंडों की संख्या **सीमित (finite)** होती है, परंतु उसके गुणज **असीमित (infinite)** होते हैं।'
      }
    ],
    visualExample: {
      totalParts: 6,
      shadedParts: 6,
      caption: '12 = 1×12 = 2×6 = 3×4. Factors of 12 are: 1, 2, 3, 4, 6, 12.',
      captionHi: '12 = 1×12 = 2×6 = 3×4। 12 के गुणनखंड हैं: 1, 2, 3, 4, 6, 12।'
    }
  },

  modules: [
    {
      id: 'factors-and-multiples',
      concept: 'factors-and-multiples',
      title: '1. Factors and Multiples',
      titleHi: '1. गुणनखंड और गुणज',
      summary: 'Understanding exact divisors versus counting multiples.',
      summaryHi: 'सटीक विभाजकों (गुणनखंड) और पहाड़ों (गुणज) में स्पष्ट अंतर।',
      content: {
        en: [
          '**Factor (गुणनखंड):** Exact divisor of a number. Factors of 24 = 1, 2, 3, 4, 6, 8, 12, 24.',
          '**Multiple (गुणज):** Numbers obtained by multiplying by 1, 2, 3, 4... Multiples of 6 = 6, 12, 18, 24, 30...',
          'Every factor is less than or equal to the number. Every multiple is greater than or equal to the number.'
        ],
        hi: [
          '**गुणनखंड (Factor):** जो संख्या को पूर्णतः विभाजित करे। 24 के गुणनखंड = 1, 2, 3, 4, 6, 8, 12, 24।',
          '**गुणज (Multiple):** किसी संख्या का पहाड़ा (1, 2, 3... से गुणा करने पर प्राप्त)। 6 के गुणज = 6, 12, 18, 24, 30...',
          'प्रत्येक गुणनखंड संख्या से छोटा या उसके बराबर होता है। प्रत्येक गुणज संख्या से बड़ा या उसके बराबर होता है।'
        ]
      },
      workedExample: {
        problem: 'Write all the factors of 68.',
        problemHi: '68 के सभी गुणनखंड लिखिए।',
        solution: '68 = 1 × 68 = 2 × 34 = 4 × 17. The factors of 68 are 1, 2, 4, 17, 34, 68.',
        solutionHi: '68 = 1 × 68 = 2 × 34 = 4 × 17। अतः 68 के सभी गुणनखंड हैं: 1, 2, 4, 17, 34, 68।'
      }
    },
    {
      id: 'prime-and-composite',
      concept: 'prime-and-composite',
      title: '2. Prime and Composite Numbers',
      titleHi: '2. अभाज्य और भाज्य संख्याएँ',
      summary: 'Numbers with only 2 factors versus numbers with 3 or more factors.',
      summaryHi: 'केवल 2 गुणनखंड वाली संख्याएँ बनाम 2 से अधिक गुणनखंड वाली संख्याएँ।',
      content: {
        en: [
          '**Prime Number (अभाज्य संख्या):** Has exactly TWO distinct factors: 1 and the number itself. Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23...',
          '**Composite Number (भाज्य संख्या):** Has more than two factors. Examples: 4, 6, 8, 9, 10, 12...',
          '**Special Rule 1:** The number **1** is NEITHER prime NOR composite!',
          '**Special Rule 2:** The number **2** is the smallest prime number AND the ONLY even prime number!'
        ],
        hi: [
          '**अभाज्य संख्या (Prime Number):** जिसके केवल दो भिन्न गुणनखंड हों: 1 और स्वयं वह संख्या। उदाहरण: 2, 3, 5, 7, 11, 13, 17...',
          '**भाज्य संख्या (Composite Number):** जिसके दो से अधिक गुणनखंड हों। उदाहरण: 4, 6, 8, 9, 10, 12...',
          '**विशेष नियम 1:** संख्या **1** न तो अभाज्य है और न ही भाज्य!',
          '**विशेष नियम 2:** संख्या **2** सबसे छोटी अभाज्य संख्या है और एकमात्र सम (even) अभाज्य संख्या है!'
        ]
      },
      workedExample: {
        problem: 'Express 44 as the sum of two odd primes.',
        problemHi: '44 को दो विषम अभाज्य संख्याओं के योग के रूप में व्यक्त कीजिए।',
        solution: 'Look at prime numbers below 44: 3 + 41 = 44, or 7 + 37 = 44, or 13 + 31 = 44.',
        solutionHi: '44 से छोटी अभाज्य संख्याएँ देखें: 3 + 41 = 44, अथवा 7 + 37 = 44, अथवा 13 + 31 = 44।'
      }
    },
    {
      id: 'divisibility-rules',
      concept: 'divisibility-rules',
      title: '3. Tests of Divisibility',
      titleHi: '3. विभाज्यता के नियम (Divisibility Rules)',
      summary: 'Lightning-fast tests to check divisibility without performing long division.',
      summaryHi: 'बिना लंबा भाग दिए तुरंत पता लगाने की अचूक तकनीकें।',
      content: {
        en: [
          '**By 2:** Last digit is 0, 2, 4, 6, or 8.',
          '**By 3:** The SUM of its digits is divisible by 3 (e.g. 729: 7+2+9=18, 18÷3=6 -> divisible!).',
          '**By 5:** Last digit is 0 or 5.',
          '**By 6:** Divisible by BOTH 2 and 3.',
          '**By 9:** The SUM of its digits is divisible by 9.',
          '**By 10:** Last digit is 0.',
          '**By 11:** Difference between sum of odd-placed digits and even-placed digits is either 0 or a multiple of 11.'
        ],
        hi: [
          '**2 से विभाज्यता:** इकाई का अंक 0, 2, 4, 6 या 8 हो।',
          '**3 से विभाज्यता:** अंकों का योग 3 से विभाज्य हो (जैसे 729: 7+2+9=18, 18÷3=6 -> विभाज्य है!)।',
          '**5 से विभाज्यता:** इकाई का अंक 0 या 5 हो।',
          '**6 से विभाज्यता:** संख्या 2 और 3 दोनों से विभाज्य हो।',
          '**9 से विभाज्यता:** अंकों का योग 9 से विभाज्य हो।',
          '**10 से विभाज्यता:** इकाई का अंक 0 हो।',
          '**11 से विभाज्यता:** विषम स्थानों के अंकों के योग और सम स्थानों के अंकों के योग का अंतर 0 या 11 का गुणज हो।'
        ]
      },
      workedExample: {
        problem: 'Test whether 10824 is divisible by 11.',
        problemHi: 'जाँच कीजिए कि क्या 10824 संख्या 11 से विभाज्य है।',
        solution: 'Sum of digits at odd places (from right): 4 + 8 + 1 = 13. Sum of digits at even places: 2 + 0 = 2. Difference = 13 - 2 = 11. Since 11 is divisible by 11, 10824 is divisible by 11!',
        solutionHi: 'विषम स्थानों (दाईं ओर से) के अंकों का योग: 4 + 8 + 1 = 13। सम स्थानों के अंकों का योग: 2 + 0 = 2। अंतर = 13 - 2 = 11। चूँकि अंतर 11 है, अतः 10824 संख्या 11 से विभाज्य है!'
      }
    },
    {
      id: 'hcf-gcd',
      concept: 'hcf-gcd',
      title: '4. Highest Common Factor (HCF / म.स.प.)',
      titleHi: '4. महत्तम समापवर्तक (HCF / म.स.प.)',
      summary: 'The largest factor that divides two or more numbers completely.',
      summaryHi: 'वह सबसे बड़ा सार्व गुणनखंड जो दो या अधिक संख्याओं को पूर्णतः विभाजित करे।',
      content: {
        en: [
          'HCF is also known as GCD (Greatest Common Divisor).',
          'Method: Prime factorise each number and take the product of the lowest powers of common prime factors.',
          'Example: 12 = 2² × 3, 18 = 2 × 3². Common factors: 2¹ and 3¹. HCF = 2 × 3 = 6.'
        ],
        hi: [
          'म.स.प. को GCD भी कहा जाता है।',
          'विधि: प्रत्येक संख्या का अभाज्य गुणनखंडन करें और उभयनिष्ठ अभाज्य गुणनखंडों की न्यूनतम घातों का गुणनफल लें।',
          'उदाहरण: 12 = 2² × 3, 18 = 2 × 3²। उभयनिष्ठ गुणनखंड = 2 और 3। म.स.प. = 2 × 3 = 6।'
        ]
      },
      workedExample: {
        problem: 'Find the HCF of 20, 28, and 36.',
        problemHi: '20, 28 और 36 का म.स.प. (HCF) ज्ञात कीजिए।',
        solution: '20 = 2 × 2 × 5. 28 = 2 × 2 × 7. 36 = 2 × 2 × 3 × 3. Common prime factors in all three: 2 × 2 = 4. HCF = 4.',
        solutionHi: '20 = 2 × 2 × 5। 28 = 2 × 2 × 7। 36 = 2 × 2 × 3 × 3। तीनों में उभयनिष्ठ अभाज्य गुणनखंड: 2 × 2 = 4। म.स.प. = 4।'
      }
    },
    {
      id: 'lcm-word-problems',
      concept: 'lcm-word-problems',
      title: '5. Lowest Common Multiple (LCM / ल.स.प.)',
      titleHi: '5. लघुत्तम समापवर्त्य (LCM / ल.स.प.)',
      summary: 'The smallest non-zero common multiple of two or more numbers.',
      summaryHi: 'दो या अधिक संख्याओं का सबसे छोटा उभयनिष्ठ गुणज।',
      content: {
        en: [
          'LCM is the lowest common multiple.',
          'Used to solve problems about events happening together (traffic lights, bells ringing, circular race tracks).',
          '**Golden Formula:** Product of two numbers = HCF × LCM (for any two positive numbers a and b: a × b = HCF(a,b) × LCM(a,b)).'
        ],
        hi: [
          'ल.स.प. सबसे छोटा उभयनिष्ठ गुणज होता है।',
          'इसका उपयोग एक साथ होने वाली घटनाओं के सवालों में होता है (ट्रैफ़िक बत्तियाँ, घंटियों का एक साथ बजना आदि)।',
          '**महत्वपूर्ण सूत्र:** दो संख्याओं का गुणनफल = म.स.प. × ल.स.प. (a × b = HCF × LCM)।'
        ]
      },
      workedExample: {
        problem: 'Three bells toll together at intervals of 9, 12, and 15 minutes. After how long will they toll together again?',
        problemHi: 'तीन घंटियाँ क्रमशः 9, 12 और 15 मिनट के अंतराल पर बजती हैं। वे पुनः कितने समय बाद एक साथ बजेंगी?',
        solution: 'Find the LCM of 9, 12, 15: 9 = 3², 12 = 2² × 3, 15 = 3 × 5. LCM = 2² × 3² × 5 = 4 × 9 × 5 = 180 minutes (= 3 hours).',
        solutionHi: '9, 12, 15 का ल.स.प. निकालें: 9 = 3², 12 = 2² × 3, 15 = 3 × 5। ल.स.प. = 4 × 9 × 5 = 180 मिनट (= 3 घंटे)।'
      }
    }
  ]
};

// ============================================================
// 4. INTEGERS (Chapter 6)
// ============================================================
export const integersLesson = {
  topicId: 'integers',
  title: 'Integers',
  titleHi: 'पूर्णांक (Integers)',
  subtitle: 'Positive numbers, zero, negative numbers, and arithmetic rules.',
  subtitleHi: 'धनात्मक संख्याएँ, शून्य, ऋणात्मक संख्याएँ और संख्या रेखा पर संक्रियाएँ।',
  icon: '➖➕',
  chapterNumber: 6,

  foundationRecap: {
    title: 'Foundation Recap: Why Do We Need Negative Numbers?',
    titleHi: 'बुनियादी पुनरावलोकन: ऋणात्मक संख्याओं की आवश्यकता क्यों पड़ी?',
    description:
      'In everyday life, quantities can go below zero: winter temperatures in Ladakh (-10°C), depths below sea level, or financial debt and losses.',
    descriptionHi:
      'दैनिक जीवन में कई स्थितियाँ शून्य से नीचे जाती हैं: लद्दाख में सर्दियों का तापमान (-10°C), समुद्र तल से गहराई, या बैंक में बकाया/हानि।',
    keyPoints: [
      {
        en: '**Positive Integers:** +1, +2, +3... (represent gain, above sea level, temperature above 0°C).',
        hi: '**धनात्मक पूर्णांक:** +1, +2, +3... (लाभ, समुद्र तल से ऊँचाई, 0°C से ऊपर का तापमान)।'
      },
      {
        en: '**Negative Integers:** -1, -2, -3... (represent loss, depth below sea level, temperature below 0°C).',
        hi: '**ऋणात्मक पूर्णांक:** -1, -2, -3... (हानि, समुद्र तल से गहराई, शून्य से नीचे का तापमान)।'
      },
      {
        en: '**Zero (0)** is an integer that is NEITHER positive NOR negative!',
        hi: '**शून्य (0)** एक ऐसा पूर्णांक है जो न तो धनात्मक है और न ही ऋणात्मक!'
      }
    ],
    visualExample: {
      totalParts: 6,
      shadedParts: 3,
      caption: 'Left of 0: Negative integers (-3, -2, -1). Right of 0: Positive integers (+1, +2, +3).',
      captionHi: '0 के बाईं ओर: ऋणात्मक पूर्णांक (-3, -2, -1)। 0 के दाईं ओर: धनात्मक पूर्णांक (+1, +2, +3)।'
    }
  },

  modules: [
    {
      id: 'need-for-integers',
      concept: 'need-for-integers',
      title: '1. The Collection of Integers',
      titleHi: '1. पूर्णांकों का संग्रह',
      summary: 'Combining whole numbers with negative numbers: {... -3, -2, -1, 0, 1, 2, 3 ...}.',
      summaryHi: 'पूर्ण संख्याओं और ऋणात्मक संख्याओं का संयुक्त संग्रह।',
      content: {
        en: [
          'The set of integers = {..., -4, -3, -2, -1, 0, 1, 2, 3, 4, ...}',
          'Opposites cancel out: +5 and -5 are opposite integers. Their sum is 0 (Additive Inverse).',
          'Every natural number is a positive integer.'
        ],
        hi: [
          'पूर्णांकों का समूह = {..., -4, -3, -2, -1, 0, 1, 2, 3, 4, ...}',
          'विपरीत संख्याएँ एक-दूसरे को शून्य बनाती हैं: +5 और -5 परस्पर विपरीत हैं। इनका योग 0 होता है (योज्य प्रतिलोम)।',
          'प्रत्येक प्राकृतिक संख्या एक धनात्मक पूर्णांक है।'
        ]
      },
      workedExample: {
        problem: 'Write the integer representation for: (a) A deposit of ₹2000, (b) 5°C below 0°C.',
        problemHi: 'पूर्णांक के रूप में लिखिए: (क) ₹2000 जमा करना, (ख) 0°C से 5°C नीचे का तापमान।',
        solution: '(a) Deposit means gain = +₹2000. (b) Below 0°C means negative = -5°C.',
        solutionHi: '(क) जमा करना मतलब वृद्धि = +2000। (ख) 0°C से नीचे मतलब ऋणात्मक = -5°C।'
      }
    },
    {
      id: 'ordering-comparing-integers',
      concept: 'ordering-comparing-integers',
      title: '2. Ordering and Comparing Integers',
      titleHi: '2. पूर्णांकों की तुलना और क्रम',
      summary: 'On a number line, every number to the right is greater than the number to its left.',
      summaryHi: 'संख्या रेखा पर दाईं ओर स्थित प्रत्येक संख्या बाईं ओर की संख्या से बड़ी होती है।',
      content: {
        en: [
          '0 is greater than every negative integer: 0 > -1, 0 > -100.',
          '0 is smaller than every positive integer: 0 < 1, 0 < 5.',
          'Between two negative integers: the one with smaller numerical value is GREATER! Example: -2 > -8.',
          'Memory Trick: Imagine owing money! Owing ₹2 (-2) is better than owing ₹8 (-8)!'
        ],
        hi: [
          '0 प्रत्येक ऋणात्मक पूर्णांक से बड़ा होता है: 0 > -1, 0 > -100।',
          '0 प्रत्येक धनात्मक पूर्णांक से छोटा होता है: 0 < 1, 0 < 5।',
          'दो ऋणात्मक पूर्णांकों में: जिसका संख्यात्मक मान छोटा होता है, वह बड़ा होता है! उदाहरण: -2 > -8।',
          'याद रखने की युक्ति: कर्ज के बारे में सोचें! ₹2 का कर्ज होना (-2), ₹8 के कर्ज (-8) से बेहतर स्थिति है!'
        ]
      },
      workedExample: {
        problem: 'Arrange in ascending order: -7, 4, -2, 0, -11, 8',
        problemHi: 'आरोही (बढ़ते) क्रम में लिखिए: -7, 4, -2, 0, -11, 8',
        solution: 'From most negative to most positive: -11 < -7 < -2 < 0 < 4 < 8.',
        solutionHi: 'सबसे छोटे से सबसे बड़े की ओर: -11 < -7 < -2 < 0 < 4 < 8।'
      }
    },
    {
      id: 'addition-of-integers',
      concept: 'addition-of-integers',
      title: '3. Addition of Integers',
      titleHi: '3. पूर्णांकों का जोड़',
      summary: 'Rules for adding integers with like signs and unlike signs.',
      summaryHi: 'समान चिह्न और असमान चिह्न वाले पूर्णांकों को जोड़ने के नियम।',
      content: {
        en: [
          '**Same Signs:** Add the values and attach the common sign: (+3) + (+5) = +8, (-3) + (-5) = -8.',
          '**Different Signs:** Subtract the smaller numerical value from the larger one and attach the sign of the larger value: (-8) + (+5) = -3, (+10) + (-4) = +6.',
          '**Additive Inverse:** The sum of a number and its opposite is always zero: a + (-a) = 0.'
        ],
        hi: [
          '**समान चिह्न होने पर:** मानों को जोड़ें और वही चिह्न लगाएँ: (+3) + (+5) = +8, (-3) + (-5) = -8।',
          '**असमान चिह्न होने पर:** बड़े मान में से छोटा मान घटाएँ और बड़े मान का चिह्न लगाएँ: (-8) + (+5) = -3, (+10) + (-4) = +6।',
          '**योज्य प्रतिलोम (Additive Inverse):** किसी संख्या और उसके विपरीत का जोड़ हमेशा शून्य होता है: a + (-a) = 0।'
        ]
      },
      workedExample: {
        problem: 'Find the sum of: (-13) + (+18) + (-7)',
        problemHi: 'योग ज्ञात कीजिए: (-13) + (+18) + (-7)',
        solution: 'Group same signs: [(-13) + (-7)] + 18 = (-20) + 18. Subtract: 20 - 18 = 2, sign of -20 is negative -> Answer = -2.',
        solutionHi: 'समान चिह्न वालों को पहले जोड़ें: [(-13) + (-7)] + 18 = (-20) + 18। घटाएँ: 20 - 18 = 2, बड़ा मान -20 है -> उत्तर = -2।'
      }
    },
    {
      id: 'subtraction-of-integers',
      concept: 'subtraction-of-integers',
      title: '4. Subtraction of Integers',
      titleHi: '4. पूर्णांकों का घटाव',
      summary: 'Subtracting an integer is the same as adding its additive inverse.',
      summaryHi: 'किसी पूर्णांक को घटाना उसके योज्य प्रतिलोम को जोड़ने के समान है।',
      content: {
        en: [
          '**Universal Subtraction Rule:** a - b = a + (-b)',
          'Minus of minus becomes plus: a - (-b) = a + b.',
          'Example: 5 - (-3) = 5 + 3 = 8.'
        ],
        hi: [
          '**घटाव का सार्वभौमिक नियम:** a - b = a + (-b)',
          'ऋण का ऋण धन बन जाता है: a - (-b) = a + b।',
          'उदाहरण: 5 - (-3) = 5 + 3 = 8।'
        ]
      },
      workedExample: {
        problem: 'Subtract (-4) from (-10).',
        problemHi: '(-10) में से (-4) घटाइए।',
        solution: '(-10) - (-4) = (-10) + 4 = -6.',
        solutionHi: '(-10) - (-4) = (-10) + 4 = -6।'
      }
    }
  ]
};

// ============================================================
// 5. DECIMALS (Chapter 8)
// ============================================================
export const decimalsLesson = {
  topicId: 'decimals',
  title: 'Decimals',
  titleHi: 'दशमलव (Decimals)',
  subtitle: 'Tenths, hundredths, place value chart, money, and operations.',
  subtitleHi: 'दशांश, शतांश, स्थानीय मान सारणी, रुपया-पैसा मापन और संक्रियाएँ।',
  icon: '🎯',
  chapterNumber: 8,

  foundationRecap: {
    title: 'Foundation Recap: Between Whole Numbers',
    titleHi: 'बुनियादी पुनरावलोकन: पूर्ण संख्याओं के बीच का मान',
    description:
      'Look at a normal 15 cm school ruler! Between 4 cm and 5 cm, there are 10 tiny millimeter markings. If a pencil length is 4 cm and 6 mm, we write it as 4.6 cm! That dot is the Decimal Point.',
    descriptionHi:
      'अपने 15 सेमी वाले ज्यामिति स्केल को देखिए! 4 सेमी और 5 सेमी के बीच 10 छोटे मिलीमीटर के निशान होते हैं। यदि पेंसिल की लंबाई 4 सेमी और 6 मिमी है, तो हम इसे 4.6 सेमी लिखते हैं! यह बिंदु दशमलव बिंदु (Decimal Point) कहलाता है।',
    keyPoints: [
      {
        en: '**Tenth (दशांश):** One part out of 10 equal parts = 1/10 = 0.1.',
        hi: '**दशांश (Tenth):** 10 बराबर भागों में से 1 भाग = 1/10 = 0.1।'
      },
      {
        en: '**Hundredth (शतांश):** One part out of 100 equal parts = 1/100 = 0.01.',
        hi: '**शतांश (Hundredth):** 100 बराबर भागों में से 1 भाग = 1/100 = 0.01।'
      },
      {
        en: 'The dot separates the whole number part (on the left) from the fractional part (on the right).',
        hi: 'दशमलव बिंदु पूर्ण संख्या भाग (बाईं ओर) को भिन्न वाले भाग (दाईं ओर) से अलग करता है।'
      }
    ],
    visualExample: {
      totalParts: 10,
      shadedParts: 4,
      caption: '4 out of 10 equal parts shaded = 4/10 = 0.4',
      captionHi: '10 बराबर भागों में से 4 भाग रंगे हैं = 4/10 = 0.4'
    }
  },

  modules: [
    {
      id: 'tenths-and-hundredths',
      concept: 'tenths-and-hundredths',
      title: '1. Tenths and Hundredths',
      titleHi: '1. दशांश और शतांश (Tenths & Hundredths)',
      summary: 'Understanding place values smaller than 1: 1/10 and 1/100.',
      summaryHi: '1 से छोटे स्थानीय मानों की समझ: दशांश (1/10) और शतांश (1/100)।',
      content: {
        en: [
          'In 25.37: 2 is Tens (20), 5 is Ones (5), 3 is Tenths (3/10), 7 is Hundredths (7/100).',
          'Fraction to Decimal: 5/10 = 0.5, 7/100 = 0.07, 23/100 = 0.23.',
          'Trailing zeros after the last decimal digit do not change the value: 0.5 = 0.50 = 0.500.'
        ],
        hi: [
          '25.37 में: 2 दहाई (20) है, 5 इकाई (5) है, 3 दशांश (3/10) है, 7 शतांश (7/100) है।',
          'भिन्न से दशमलव: 5/10 = 0.5, 7/100 = 0.07, 23/100 = 0.23।',
          'दशमलव के अंतिम अंक के बाद शून्य लगाने से मान नहीं बदलता: 0.5 = 0.50 = 0.500।'
        ]
      },
      workedExample: {
        problem: 'Write as decimals: (a) 7 tenths, (b) 2 tens and 9 tenths, (c) 14.6',
        problemHi: 'दशमलव रूप में लिखिए: (क) 7 दशांश, (ख) 2 दहाई 9 दशांश।',
        solution: '(a) 7 tenths = 7/10 = 0.7. (b) 2 tens + 9 tenths = 20 + 0.9 = 20.9.',
        solutionHi: '(क) 7 दशांश = 7/10 = 0.7। (ख) 2 दहाई + 9 दशांश = 20 + 0.9 = 20.9।'
      }
    },
    {
      id: 'decimals-money-measurement',
      concept: 'decimals-money-measurement',
      title: '2. Money, Length & Weight Applications',
      titleHi: '2. रुपया-पैसा, लंबाई और भार मापन में दशमलव',
      summary: 'Practical conversion of paise to rupees, mm/cm to metres, and grams to kg.',
      summaryHi: 'पैसे को रुपये में, सेमी को मीटर में और ग्राम को किग्रा में बदलना।',
      content: {
        en: [
          '**Money:** 100 paise = ₹1. So 1 paisa = ₹1/100 = ₹0.01. 75 paise = ₹0.75.',
          '**Length:** 100 cm = 1 m. So 1 cm = 1/100 m = 0.01 m. 1000 m = 1 km -> 1 m = 0.001 km.',
          '**Weight:** 1000 g = 1 kg. So 1 g = 1/1000 kg = 0.001 kg. 375 g = 0.375 kg.'
        ],
        hi: [
          '**मुद्रा (रुपया-पैसा):** 100 पैसे = ₹1। अतः 1 पैसा = ₹0.01। 75 पैसे = ₹0.75।',
          '**लंबाई:** 100 सेमी = 1 मीटर। अतः 1 सेमी = 0.01 मीटर। 1000 मीटर = 1 किमी -> 1 मीटर = 0.001 किमी।',
          '**भार (वजन):** 1000 ग्राम = 1 किलोग्राम। अतः 1 ग्राम = 0.001 किग्रा। 375 ग्राम = 0.375 किग्रा।'
        ]
      },
      workedExample: {
        problem: 'Express 2 m 45 cm as metres using decimals.',
        problemHi: '2 मीटर 45 सेमी को दशमलव का प्रयोग कर मीटर में बदलिए।',
        solution: '45 cm = 45/100 m = 0.45 m. Total = 2 m + 0.45 m = 2.45 metres.',
        solutionHi: '45 सेमी = 45/100 मीटर = 0.45 मीटर। कुल = 2 + 0.45 = 2.45 मीटर।'
      }
    },
    {
      id: 'comparing-decimals',
      concept: 'comparing-decimals',
      title: '3. Comparing Decimals',
      titleHi: '3. दशमलव संख्याओं की तुलना',
      summary: 'How to compare decimal numbers place by place.',
      summaryHi: 'दशमलव संख्याओं में छोटे-बड़े की पहचान करना।',
      content: {
        en: [
          'Step 1: Compare the whole number part first. The one with greater whole number is larger: 5.2 > 4.9.',
          'Step 2: If whole number parts are equal, compare the tenths digit: 0.5 > 0.38 (since 5 tenths > 3 tenths).',
          'Common Mistake: Thinking 0.38 is bigger than 0.5 because 38 > 5. Make places equal: 0.50 vs 0.38! 50 hundredths is bigger than 38 hundredths!'
        ],
        hi: [
          'चरण 1: पहले पूर्ण संख्या भाग की तुलना करें। बड़ा पूर्ण भाग = बड़ी संख्या: 5.2 > 4.9।',
          'चरण 2: यदि पूर्ण भाग समान है, तो दशांश अंक की तुलना करें: 0.5 > 0.38 (क्योंकि 5 दशांश > 3 दशांश)।',
          'सामान्य भ्रम: सोचना कि 0.38 बड़ा है क्योंकि 38 > 5। स्थानों को बराबर करें: 0.50 बनाम 0.38! 50 शतांश 38 शतांश से बड़ा है!'
        ]
      },
      workedExample: {
        problem: 'Which is greater: 1.431 or 1.490?',
        problemHi: 'कौन बड़ा है: 1.431 या 1.490?',
        solution: 'Whole parts equal (1 = 1). Tenths equal (4 = 4). Compare hundredths: 9 > 3. Therefore, 1.490 is greater than 1.431.',
        solutionHi: 'पूर्ण भाग बराबर हैं (1 = 1)। दशांश बराबर हैं (4 = 4)। शतांश की तुलना करें: 9 > 3। अतः 1.490 बड़ा है 1.431 से।'
      }
    },
    {
      id: 'addition-subtraction-decimals',
      concept: 'addition-subtraction-decimals',
      title: '4. Addition and Subtraction of Decimals',
      titleHi: '4. दशमलव का जोड़ और घटाव',
      summary: 'Aligning the decimal points vertically before adding or subtracting.',
      summaryHi: 'जोड़ने या घटाने से पहले दशमलव बिंदुओं को एक सीध में रखना।',
      content: {
        en: [
          'Golden Rule: Always align the decimal points directly under each other.',
          'Fill in missing trailing places with zeros to make like decimals.',
          'Bring the decimal point straight down into the answer.'
        ],
        hi: [
          'मूल नियम: दशमलव बिंदुओं को हमेशा एक-दूसरे के ठीक नीचे एक सीध में रखें।',
          'खाली स्थानों पर शून्य लगाकर समान दशमलव स्थान बनाएँ।',
          'उत्तर में दशमलव बिंदु को ठीक उसी सीध में नीचे उतारें।'
        ]
      },
      workedExample: {
        problem: 'Calculate: 18.5 - 6.79',
        problemHi: 'हल कीजिए: 18.5 - 6.79',
        solution: 'Align: 18.50 - 06.79. Subtract: 18.50 - 6.79 = 11.71.',
        solutionHi: 'सीध में रखें: 18.50 - 06.79। घटाने पर: 18.50 - 6.79 = 11.71।'
      }
    }
  ]
};

// ============================================================
// 6. BASIC GEOMETRICAL IDEAS (Chapter 4)
// ============================================================
export const basicGeometryLesson = {
  topicId: 'basic-geometry',
  title: 'Basic Geometrical Ideas',
  titleHi: 'आधारभूत ज्यामितीय अवधारणाएँ (Geometry)',
  subtitle: 'Points, line segments, rays, angles, polygons, and circles.',
  subtitleHi: 'बिंदु, रेखाखंड, किरण, कोण, बहुभुज, त्रिभुज और वृत्त।',
  icon: '📐',
  chapterNumber: 4,

  foundationRecap: {
    title: 'Foundation Recap: Shapes All Around Us',
    titleHi: 'बुनियादी पुनरावलोकन: हमारे चारों ओर आकृतियाँ',
    description:
      'From the tip of a sharpened pencil to edges of a notebook, mathematics studies shapes, locations, and boundaries through Geometry.',
    descriptionHi:
      'पेंसिल की बारीक नोक से लेकर कॉपी के किनारों तक, गणित ज्यामिति के माध्यम से आकृतियों, स्थितियों और सीमाओं का अध्ययन करता है।',
    keyPoints: [
      {
        en: '**Point:** A tiny dot that marks an exact location. It has no length, width, or thickness (denoted by a capital letter like A, P).',
        hi: '**बिंदु (Point):** एक बारीक बिंदु जो सटीक स्थिति को दर्शाता है। इसकी कोई लंबाई, चौड़ाई या मोटाई नहीं होती (जैसे बिंदु A, P)।'
      },
      {
        en: '**Line Segment (रेखाखंड):** Shortest distance between two points A and B. It has TWO fixed endpoints.',
        hi: '**रेखाखंड (Line Segment):** दो बिंदुओं A और B के बीच की सीधी दूरी। इसके दो निश्चित अंत बिंदु होते हैं।'
      },
      {
        en: '**Line (रेखा):** Extends indefinitely in both directions without any endpoints.',
        hi: '**रेखा (Line):** जो दोनों दिशाओं में बिना किसी अंत के अनिश्चित रूप से बढ़ती जाती है।'
      }
    ],
    visualExample: {
      totalParts: 4,
      shadedParts: 2,
      caption: 'Point A -> Line Segment AB -> Ray AB -> Line AB',
      captionHi: 'बिंदु A -> रेखाखंड AB -> किरण AB -> रेखा AB'
    }
  },

  modules: [
    {
      id: 'points-lines-rays',
      concept: 'points-lines-rays',
      title: '1. Points, Segments, Lines & Rays',
      titleHi: '1. बिंदु, रेखाखंड, रेखा और किरण',
      summary: 'The building blocks of all geometry.',
      summaryHi: 'ज्यामिति के मूलभूत आधार स्तंभ।',
      content: {
        en: [
          '**Ray (किरण):** Part of a line with ONE endpoint (starting point) that goes on endlessly in one direction (like a sunbeam or torch light).',
          'Notation: Line Segment is written as AB with a bar; Ray is written as AB with an arrow.',
          'Collinear points: Three or more points lying on the exact same straight line.'
        ],
        hi: [
          '**किरण (Ray):** रेखा का वह भाग जिसका केवल एक प्रारंभिक बिंदु होता है और दूसरी दिशा में वह असीमित बढ़ती है (जैसे सूर्य की किरण या टॉर्च का प्रकाश)।',
          'चिह्न: रेखाखंड को AB के ऊपर रेखा से, किरण को तीर से दर्शाते हैं।',
          'संरेख बिंदु (Collinear): तीन या अधिक बिंदु जो बिल्कुल एक ही सीधी रेखा पर स्थित हों।'
        ]
      },
      workedExample: {
        problem: 'How many lines can pass through: (a) one given point, (b) two given points?',
        problemHi: 'इनमें से कितनी रेखाएँ गुजर सकती हैं: (क) एक दिए गए बिंदु से, (ख) दो दिए गए बिंदुओं से?',
        solution: '(a) Infinitely many lines can pass through one single point. (b) Only ONE unique line can pass through two given points.',
        solutionHi: '(क) एक अकेले बिंदु से अनंत (असंख्य) रेखाएँ गुजर सकती हैं। (ख) दो दिए गए बिंदुओं से केवल और केवल एक अद्वितीय रेखा गुजर सकती है।'
      }
    },
    {
      id: 'intersecting-parallel-lines',
      concept: 'intersecting-parallel-lines',
      title: '2. Intersecting vs Parallel Lines',
      titleHi: '2. प्रतिच्छेदी रेखाएँ और समांतर रेखाएँ',
      summary: 'Lines that cross versus lines that never meet.',
      summaryHi: 'आपस में काटने वाली रेखाएँ बनाम कभी न मिलने वाली रेखाएँ।',
      content: {
        en: [
          '**Intersecting Lines:** Two lines having one common point of meeting (e.g. letter X, crossroads).',
          '**Parallel Lines:** Lines in a plane that NEVER intersect, no matter how far they extend (e.g. railway tracks, opposite edges of a ruler). Distance between them remains constant.'
        ],
        hi: [
          '**प्रतिच्छेदी रेखाएँ (Intersecting):** दो रेखाएँ जिनका एक उभयनिष्ठ बिंदु होता है जहाँ वे कटती हैं (जैसे अंग्रेज़ी अक्षर X, चौराहा)।',
          '**समांतर रेखाएँ (Parallel):** एक ही तल में स्थित ऐसी रेखाएँ जो दोनों ओर कितना भी बढ़ाने पर कभी नहीं मिलतीं (जैसे रेल की पटरियाँ, स्केल के आमने-सामने के किनारे)।'
        ]
      },
      workedExample: {
        problem: 'Give two real-life examples of parallel lines and intersecting lines.',
        problemHi: 'दैनिक जीवन से समांतर रेखाओं और प्रतिच्छेदी रेखाओं के दो-दो उदाहरण दीजिए।',
        solution: 'Parallel: Opposite edges of a blackboard, railway tracks. Intersecting: Scissor blades crossing, hands of a clock.',
        solutionHi: 'समांतर: ब्लैकबोर्ड के आमने-सामने के किनारे, रेल की पटरियाँ। प्रतिच्छेदी: कैंची के ब्लेड, घड़ी की दोनों सुइयाँ।'
      }
    },
    {
      id: 'angles-and-types',
      concept: 'angles-and-types',
      title: '3. Angles, Triangles & Quadrilaterals',
      titleHi: '3. कोण, त्रिभुज और चतुर्भुज',
      summary: 'Vertices, arms, sides, diagonals, interior and exterior.',
      summaryHi: 'शीर्ष, भुजाएँ, विकर्ण, अभ्यंतर और बहिर्भाग।',
      content: {
        en: [
          '**Angle:** Formed by two rays originating from the same starting point (called Vertex). The two rays are called Arms.',
          '**Triangle:** A 3-sided closed polygon (3 sides, 3 angles, 3 vertices).',
          '**Quadrilateral:** A 4-sided closed polygon (4 sides, 4 angles, 4 vertices, 2 diagonals).'
        ],
        hi: [
          '**कोण (Angle):** एक ही उभयनिष्ठ प्रारंभिक बिंदु (शीर्ष) से निकलने वाली दो किरणों से बनता है। किरणों को कोण की भुजाएँ (Arms) कहते हैं।',
          '**त्रिभुज (Triangle):** तीन भुजाओं वाला बंद बहुभुज (3 भुजाएँ, 3 कोण, 3 शीर्ष)।',
          '**चतुर्भुज (Quadrilateral):** चार भुजाओं वाला बंद बहुभुज (4 भुजाएँ, 4 कोण, 4 शीर्ष, 2 विकर्ण)।'
        ]
      },
      workedExample: {
        problem: 'In quadrilateral ABCD, name: (a) two pairs of opposite sides, (b) two pairs of opposite angles.',
        problemHi: 'चतुर्भुज ABCD में नाम बताइए: (क) सम्मुख भुजाओं के दो युग्म, (ख) सम्मुख कोणों के दो युग्म।',
        solution: '(a) Opposite sides: (AB, DC) and (AD, BC). (b) Opposite angles: (∠A, ∠C) and (∠B, ∠D).',
        solutionHi: '(क) सम्मुख भुजाएँ: (AB, DC) तथा (AD, BC)। (ख) सम्मुख कोण: (∠A, ∠C) तथा (∠B, ∠D)।'
      }
    },
    {
      id: 'circles-radius-diameter',
      concept: 'circles-radius-diameter',
      title: '4. The Circle: Radius, Diameter & Chord',
      titleHi: '4. वृत्त: त्रिज्या, व्यास और जीवा',
      summary: 'A simple closed curve where every boundary point is equidistant from the centre.',
      summaryHi: 'एक साधारण बंद वक्र जिसका प्रत्येक बिंदु केंद्र से समान दूरी पर होता है।',
      content: {
        en: [
          '**Centre:** The fixed middle point of the circle.',
          '**Radius (r):** Line segment connecting centre to any point on boundary.',
          '**Diameter (d):** Chord passing through the centre. It is the longest chord. Relationship: **Diameter = 2 × Radius** (d = 2r).',
          '**Chord (जीवा):** Segment joining any two points on the circle.',
          '**Circumference (परिधि):** The total distance around the circle.'
        ],
        hi: [
          '**केंद्र:** वृत्त का निश्चित मध्य बिंदु।',
          '**त्रिज्या (Radius):** केंद्र से वृत्त की सीमा तक की दूरी।',
          '**व्यास (Diameter):** केंद्र से होकर जाने वाली सबसे लंबी जीवा। संबंध: **व्यास = 2 × त्रिज्या** (d = 2r)।',
          '**जीवा (Chord):** वृत्त पर स्थित किन्हीं दो बिंदुओं को मिलाने वाला रेखाखंड।',
          '**परिधि (Circumference):** वृत्त के चारों ओर की कुल लंबाई या घेरा।'
        ]
      },
      workedExample: {
        problem: 'If the radius of a bicycle wheel is 28 cm, find its diameter.',
        problemHi: 'यदि साइकिल के पहिए की त्रिज्या 28 सेमी है, तो उसका व्यास ज्ञात कीजिए।',
        solution: 'Diameter = 2 × Radius = 2 × 28 cm = 56 cm.',
        solutionHi: 'व्यास = 2 × त्रिज्या = 2 × 28 सेमी = 56 सेमी।'
      }
    }
  ]
};

// ============================================================
// LESSONS MAP DICTIONARY
// ============================================================
export const lessonsByTopic = {
  fractions: fractionsLesson,
  'whole-numbers': wholeNumbersLesson,
  'playing-with-numbers': playingWithNumbersLesson,
  integers: integersLesson,
  decimals: decimalsLesson,
  'basic-geometry': basicGeometryLesson,
  mensuration: basicGeometryLesson
};

export default fractionsLesson;
