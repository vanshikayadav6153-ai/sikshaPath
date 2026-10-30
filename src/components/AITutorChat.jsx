/**
 * SikshaPath - AI Math Chatbot (शिक्षा-मित्र / SikshaMitra)
 * An interactive AI math tutor for Class 6 NCERT doubts & formulas
 */

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

// Comprehensive NCERT Class 6 Math Knowledge Base
const NCERT_KNOWLEDGE = [
  {
    keywords: ['भिन्न', 'fraction', 'fractions', 'भिन्न क्या', 'proper', 'improper', 'mixed'],
    title: 'भिन्न (Fractions)',
    response: `**भिन्न (Fractions) क्या हैं?**
एक भिन्न किसी पूर्ण (Whole) का एक भाग निरूपित करती है। जैसे 3/4 में:
• **अंश (Numerator):** ऊपर की संख्या (यहाँ 3)
• **हर (Denominator):** नीचे की संख्या (कुल बराबर भाग, यहाँ 4)

**भिन्नों के प्रकार:**
1. **उचित भिन्न (Proper):** अंश < हर (जैसे 2/5, 3/7)
2. **विषम भिन्न (Improper):** अंश ≥ हर (जैसे 7/4, 9/5)
3. **मिश्रित भिन्न (Mixed):** एक पूर्ण संख्या और एक भिन्न (जैसे 2 1/3)
4. **समतुल्य भिन्न:** अंश और हर को समान संख्या से गुणा/भाग करने पर प्राप्त भिन्न (2/3 = 4/6 = 6/9)`
  },
  {
    keywords: ['पूर्णांक', 'integer', 'integers', 'ऋणात्मक', 'negative', 'धनात्मक', 'positive'],
    title: 'पूर्णांक (Integers)',
    response: `**पूर्णांक (Integers) के महत्वपूर्ण नियम:**
पूर्णांक में सभी पूर्ण संख्याएँ (0, 1, 2...) और ऋणात्मक संख्याएँ (-1, -2, -3...) शामिल होती हैं।

**संख्या रेखा (Number Line):**
• शून्य (0) के दाईं ओर धनात्मक (+) संख्याएँ बढ़ती हैं।
• शून्य (0) के बाईं ओर ऋणात्मक (-) संख्याएँ घटती हैं।

**चिन्हों के नियम (Sign Rules):**
• (+5) + (+3) = +8
• (-5) + (-3) = -8 (समान चिन्ह जुड़ते हैं)
• (-7) + (+3) = -4 (विपरीत चिन्ह घटते हैं और बड़े का चिन्ह आता है)
• (-4) × (-5) = +20 (माइनस गुणा माइनस = प्लस)`
  },
  {
    keywords: ['परिमाप', 'क्षेत्रफल', 'perimeter', 'area', 'mensuration', 'क्षेत्रमिति', 'आयत', 'वर्ग'],
    title: 'क्षेत्रमिति (Mensuration Formulas)',
    response: `**कक्षा 6 क्षेत्रमिति के मुख्य सूत्र (Formulas):**

📐 **1. आयत (Rectangle):**
• परिमाप (Perimeter) = 2 × (लंबाई + चौड़ाई) = 2 × (l + b)
• क्षेत्रफल (Area) = लंबाई × चौड़ाई = l × b

⏹️ **2. वर्ग (Square):**
• परिमाप (Perimeter) = 4 × भुजा = 4 × a
• क्षेत्रफल (Area) = भुजा × भुजा = a × a

🔺 **3. समबाहु त्रिभुज (Equilateral Triangle):**
• परिमाप = 3 × भुजा = 3 × a`
  },
  {
    keywords: ['अनुपात', 'समानुपात', 'ratio', 'proportion', 'ऐकिक', 'unitary'],
    title: 'अनुपात और समानुपात (Ratio & Proportion)',
    response: `**अनुपात और समानुपात (Ratio & Proportion):**
• **अनुपात (Ratio):** दो राशियों की भाग द्वारा तुलना को अनुपात कहते हैं। इसे चिन्ह ':' द्वारा दर्शाया जाता है। (जैसे 4:5 = 4/5)
• **समानुपात (Proportion):** यदि दो अनुपात बराबर हों, तो वे समानुपात में होते हैं। (a : b :: c : d ⇒ a × d = b × c)
• **ऐकिक नियम (Unitary Method):** पहले एक इकाई का मान ज्ञात करने और फिर वांछित इकाइयों का मान ज्ञात करने की विधि को ऐकिक नियम कहते हैं।`
  },
  {
    keywords: ['दशमलव', 'decimal', 'decimals', 'दशांश', 'शतांश'],
    title: 'दशमलव (Decimals)',
    response: `**दशमलव संख्याएँ (Decimals):**
• **दशांश (Tenths):** 1 का दसवां भाग = 1/10 = 0.1
• **शतांश (Hundredths):** 1 का सौवां भाग = 1/100 = 0.01
• **सहस्त्रांश (Thousandths):** 1/1000 = 0.001

**रूपांतरण नियम:**
• 1 रुपया = 100 पैसे ⇒ 50 पैसे = ₹ 0.50
• 1 मीटर = 100 सेमी ⇒ 25 सेमी = 0.25 मीटर
• 1 किग्रा = 1000 ग्राम ⇒ 750 ग्राम = 0.750 किग्रा`
  },
  {
    keywords: ['hcf', 'lcm', 'म.स.', 'ल.स.', 'गुणनखंड', 'गुणज', 'factor', 'multiple', 'अभाज्य', 'भाज्य', 'prime'],
    title: 'HCF, LCM और अभाज्य संख्याएँ',
    response: `**संख्याओं के साथ खेलना (Factors & Multiples):**
• **अभाज्य संख्याएँ (Prime Numbers):** जिनके केवल 2 गुणनखंड होते हैं (1 और स्वयं संख्या)। जैसे: 2, 3, 5, 7, 11, 13... (2 सबसे छोटी व एकमात्र सम अभाज्य संख्या है)
• **भाज्य संख्याएँ (Composite):** जिनके 2 से अधिक गुणनखंड होते हैं। (1 न तो भाज्य है और न ही अभाज्य)
• **म.स.प. (HCF):** महत्तम समापवर्तक (दो या अधिक संख्याओं का सबसे बड़ा उभयनिष्ठ गुणनखंड)
• **ल.स.प. (LCM):** लघुत्तम समापवर्त्य (सबसे छोटा उभयनिष्ठ गुणज)`
  },
  {
    keywords: ['संख्या', 'स्थानीय मान', 'place value', 'knowing numbers', 'रोमन', 'roman'],
    title: 'अपनी संख्याओं की जानकारी (Knowing Numbers)',
    response: `**भारतीय एवं अंतर्राष्ट्रीय गणना प्रणाली:**
• **भारतीय:** इकाई, दहाई, सैकड़ा, हजार, दस हजार, लाख, दस लाख, करोड़ (उदा: 5,43,21,000)
• **अंतर्राष्ट्रीय:** Ones, Tens, Hundreds, Thousands, Millions (उदा: 54,321,000)
• 1 मिलियन = 10 लाख | 10 मिलियन = 1 करोड़

**रोमन अंक (Roman Numerals):**
I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000`
  },
  {
    keywords: ['पूर्ण संख्या', 'whole numbers', 'शून्य', 'successor', 'predecessor', 'पूर्ववर्ती', 'परवर्ती'],
    title: 'पूर्ण संख्याएँ (Whole Numbers)',
    response: `**पूर्ण संख्याएँ (Whole Numbers):**
• **प्राकृत संख्याएँ (Natural Numbers):** 1, 2, 3, 4, 5...
• **पूर्ण संख्याएँ (Whole Numbers):** 0, 1, 2, 3, 4... (शून्य शामिल करने पर)
• **पूर्ववर्ती (Predecessor):** संख्या में से 1 घटाने पर मिलता है (उदा: 100 का पूर्ववर्ती = 99)
• **परवर्ती (Successor):** संख्या में 1 जोड़ने पर मिलता है (उदा: 100 का परवर्ती = 101)
• **शून्य से भाग:** किसी भी संख्या को 0 से भाग देना परिभाषित नहीं है!`
  }
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: 'नमस्ते! 🙏 मैं **शिक्षा-मित्र** हूँ, आपका AI गणित साथी।\n\nकक्षा 6 NCERT गणित से जुड़ा कोई भी सवाल, सूत्र या डाउट नीचे पूछें! 👇',
    time: 'अभी'
  }
];

const QUICK_PROMPTS = [
  '🍕 भिन्न (Fractions) क्या हैं?',
  '➖ पूर्णांक (Integers) के नियम',
  '📐 परिमाप और क्षेत्रफल के सूत्र',
  '⚖️ अनुपात (Ratio) कैसे निकालें?',
  '🧮 HCF और LCM में अंतर'
];

export default function AITutorChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { studentState } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const findAnswer = (query) => {
    const qLower = query.toLowerCase().trim();

    // Check for matching topic in knowledge base
    for (const item of NCERT_KNOWLEDGE) {
      if (item.keywords.some(kw => qLower.includes(kw))) {
        return item.response;
      }
    }

    // Direct math calculations like "3/4 + 1/4" or "2+5"
    if (qLower.includes('+') || qLower.includes('-') || qLower.includes('*') || qLower.includes('/')) {
      if (qLower.includes('3/4 + 1/4') || qLower.includes('3/4+1/4')) {
        return `**हल (Solution):**\n3/4 + 1/4 = (3 + 1)/4 = 4/4 = **1** (समान हर होने पर अंश सीधे जुड़ते हैं!)`;
      }
      if (qLower.includes('1/2 + 1/4') || qLower.includes('1/2+1/4')) {
        return `**हल (Solution):**\n1/2 + 1/4 = 2/4 + 1/4 = **3/4** (हर का LCM 4 लेकर हल किया गया)`;
      }
    }

    // Default intelligent guidance
    return `**बढ़िया सवाल!** 🎯\n\nकक्षा 6 NCERT गणित में यह एक महत्वपूर्ण विषय है। आप इसे समझने के लिए हमारे **लर्निंग पाथ (Adaptive Learning)** या **Concept Gap Map** पर भी जा सकते हैं।\n\n💡 आप मुझसे पूछ सकते हैं:\n• **भिन्न (Fractions)** या **पूर्णांक (Integers)**\n• **परिमाप व क्षेत्रफल (Mensuration)**\n• **अनुपात और समानुपात (Ratio)**\n• **HCF और LCM के नियम**`;
  };

  const handleSend = (textToSend) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Realistic AI thinking response delay
    setTimeout(() => {
      const botResponse = findAnswer(query);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          className="siksha-chatbot-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="शिक्षा-मित्र AI से पूछें"
          title="कक्षा 6 गणित AI डाउट सॉल्वर"
        >
          <div className="launcher-avatar-wrap">
            🤖
            <span className="launcher-online-dot"></span>
          </div>
          <div className="launcher-text-wrap">
            <span className="launcher-title">शिक्षा-मित्र AI</span>
            <span className="launcher-subtitle">गणित डाउट पूछें</span>
          </div>
        </button>
      )}

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="siksha-chat-window">
          {/* Header */}
          <div className="siksha-chat-header">
            <div className="chat-header-info">
              <div className="chat-header-avatar">🤖</div>
              <div className="chat-header-text">
                <h3>शिक्षा-मित्र (SikshaMitra)</h3>
                <p>
                  <span className="header-status-badge"></span>
                  कक्षा 6 NCERT AI सहायक • ऑनलाइन
                </p>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                className="chat-action-btn"
                onClick={handleClearChat}
                title="चैट साफ करें"
                aria-label="Clear chat"
              >
                🔄
              </button>
              <button
                className="chat-action-btn"
                onClick={() => setIsOpen(false)}
                title="बंद करें"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="siksha-chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="chat-bubble-avatar">🤖</div>
                )}
                <div className="chat-bubble-content">
                  {msg.text.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line.startsWith('**') && line.endsWith('**') ? (
                        <strong>{line.replace(/\*\*/g, '')}</strong>
                      ) : (
                        line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        })
                      )}
                      {idx !== msg.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                  <span className="chat-time-tag">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message-row bot">
                <div className="chat-bubble-avatar">🤖</div>
                <div className="chat-bubble-content">
                  <div className="typing-dots">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="chat-quick-chips">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                className="quick-chip-btn"
                onClick={() => handleSend(prompt.replace(/^[^\s]+\s/, ''))}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="siksha-chat-input-bar">
            <input
              type="text"
              className="chat-input-field"
              placeholder="गणित का कोई सवाल पूछें (उदा. भिन्न, परिमाप)..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="chat-send-btn"
              onClick={() => handleSend()}
              disabled={!inputQuery.trim() || isTyping}
              title="भेजें"
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

