# 🎓 SikshaPath (शिक्षापथ)
### *Bridging Foundational Concept Gaps Through Transparent, Multilingual Adaptive Learning*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x%20%2F%208.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![NCERT Aligned](https://img.shields.io/badge/NCERT-Class%206%20Math-orange?style=for-the-badge)](https://ncert.nic.in/)
[![NEP 2020 Compliant](https://img.shields.io/badge/NEP%202020-FLN%20Aligned-22c55e?style=for-the-badge)](https://www.education.gov.in/nep-2020)
[![Offline Capable](https://img.shields.io/badge/Offline-100%25%20Local-8b5cf6?style=for-the-badge)](https://github.com/vanshikayadav6153-ai/sikshaPath)
[![Bilingual](https://img.shields.io/badge/Language-English%20%7C%20%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80-00F0FF?style=for-the-badge)](#-bilingual-scaffolding-engine)

---

## 📑 Table of Contents
1. [Executive Summary](#-executive-summary)
2. [The Core Problem](#-the-core-problem)
3. [The SikshaPath Innovation](#-the-sikshapath-innovation)
4. [System Architecture & Data Flow](#-system-architecture--data-flow)
5. [5-Stage Cyclical Mastery Loop](#-5-stage-cyclical-mastery-loop)
6. [Key Technical Features](#-key-technical-features)
   - [Deterministic Pedagogical Rule Engine](#1--explainable-pedagogical-rule-engine-zero-black-box)
   - [Interactive Concept-Gap Dependency Map (DAG)](#2--interactive-concept-gap-dependency-map-dag)
   - [Dynamic Visual Manipulatives Sandbox](#3--dynamic-visual-manipulatives-sandbox)
   - [Bilingual Scaffolding (English & Hindi)](#4--bilingual-scaffolding-engine)
   - [Dual Role Portals & Teacher Override Control](#5--dual-role-portals--educator-override-control)
   - [SikshaMitra AI Math Doubts Assistant](#6--शिक्षा-मित्र-sikshamitra-ai-math-assistant)
   - [100% Offline-First Architecture](#7--100-offline-first--privacy-preserving-design)
7. [NCERT Class 6 Curriculum Coverage](#-ncert-class-6-mathematics-coverage)
8. [Technology Stack](#-technology-stack)
9. [Project Directory Tree](#-project-directory-tree)
10. [Local Installation & Setup](#-local-installation--setup)
11. [Hackathon Evaluation & Judge Matrix](#-hackathon-evaluation-matrix)
12. [Future Roadmap](#-future-roadmap)
13. [Contributing & License](#-contributing--license)

---

## 📌 Executive Summary

**SikshaPath (शिक्षापथ)** is a high-performance, open-source adaptive learning platform engineered specifically for Indian middle-school education (NCERT Classes 6–10). Built in direct alignment with India’s **National Education Policy (NEP 2020)** and the **NIPUN Bharat Foundational Literacy and Numeracy (FLN)** mission, SikshaPath re-imagines how digital learning addresses foundational concept deficits.

Unlike commercial EdTech platforms that rely on opaque, hallucination-prone generative AI models to assess students, SikshaPath leverages an **inspectable, deterministic pedagogical rule engine** paired with **visual mathematical manipulatives**, a **micro-concept dependency graph (DAG)**, and **dual-language scaffolding** (English & authentic Hindi NCERT terminology).

```
                      🎓 SIKSHAPATH ECOSYSTEM
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │   [ Student Portal ]   ◄──►   [ Pedagogical Rule Engine ]        │
 │    • 5-Stage Journey           • Deterministic Thresholds        │
 │    • Visual Sandboxes          • Prerequisite Gap Detection      │
 │    • Gamified XP Streak        • Explainable Reasoning           │
 │                                        ▲                         │
 │                                        ▼                         │
 │   [ Teacher Dashboard ] ◄──►  [ NCERT Knowledge Graph ]          │
 │    • Cohort Gap Heatmap        • 6 Class 6 Math Chapters         │
 │    • 1-Click Pedagogical       • 92+ Bilingual Questions         │
 │      Override Authority        • Visual Manipulatives            │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

---

## 🛑 The Core Problem

Extensive nationwide surveys (such as the Annual Status of Education Report - ASER) reveal that over **52% of students entering Class 6 cannot solve basic arithmetic or foundational fraction operations**. This manifests as three catastrophic failure points in the school education pipeline:

```
                      THE ACCUMULATING DEFICIT TRAP
┌───────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
│   Calender-Driven     │      │   Compounding Deficit  │      │  Total Disengagement   │
│   Classroom Moves On  │ ───> │ Prerequisite Gap Unmet │ ───> │  Student Labels Self   │
│ (e.g. Teaches Ratios) │      │  (e.g. Weak Fractions) │      │  "Bad at Mathematics"  │
└───────────────────────┘      └────────────────────────┘      └────────────────────────┘
```

1. **The Compounding Deficit Trap**: Classrooms progress on a rigid, calendar-driven syllabus. When a student fails to master equivalent fractions in Chapter 7, they inevitably fail Decimals (Ch 8), Ratios (Ch 12), and Algebraic Expressions in Class 7.
2. **The "Black-Box" AI Problem**: Modern platforms use unverified predictive scoring or LLM chat that "guesses" student competency, often producing false praise or confusing explanations without actionable diagnostic data.
3. **The Language Divide in STEM**: Over 70% of Indian students learn in vernacular or bilingual classrooms. Most digital platforms present cold literal English translations rather than official NCERT terminology (*तुल्य भिन्न*, *अंश/हर*, *पूर्णांक*, *म.स.प.*, *ल.स.प.*).
4. **Disenfranchised Teachers**: Existing software attempts to automate away educators rather than empowering them with granular cohort diagnostic heatmaps and manual override controls.

---

## 💡 The SikshaPath Innovation

SikshaPath replaces guesswork with **deterministic pedagogical science**:

| Traditional EdTech | SikshaPath Approach | Educational Impact |
| :--- | :--- | :--- |
| **Opaque Machine Learning** | **Deterministic Pedagogical Rules** | 100% explainable recommendations visible to student and teacher |
| **Monolingual / Poor Hindi** | **Native NCERT Bilingual Engine** | Authentic NCERT Hindi & English vocabulary side-by-side |
| **Static Text / Abstract Formulas**| **Dynamic Visual Sandboxes** | Real-time fraction bars & circular pie partitioners |
| **Displaced Teachers** | **Teacher Override Authority** | Educators retain 1-click authority over any algorithmic decision |
| **Heavy Cloud Server Bills** | **100% Client-Side Offline First** | Runs locally on low-cost school hardware with zero API latency |

---

## 🏗️ System Architecture & Data Flow

SikshaPath is engineered as a zero-dependency, ultra-fast client-side Single Page Application (SPA). The architecture isolates state management, heuristic evaluation, and visual rendering:

```mermaid
flowchart TD
    subgraph UI_Layer["1. Presentation & Interaction Layer"]
        A["Landing Page & Hero Showcase"]
        B["Student Dashboard & Analytics"]
        C["Adaptive 5-Stage Journey Hub"]
        D["Concept Gap Map (Interactive DAG)"]
        E["Teacher Console & Cohort Heatmap"]
        F["SikshaMitra AI Doubts Assistant"]
    end

    subgraph State_Layer["2. Reactive State & Context Layer"]
        G["AppContext (Global Store)"]
        H["Active Student Profile & Personas"]
        I["Telemetry: Diagnostic Scores, XP, Streak"]
        J["Teacher Override State"]
        K["i18n Bilingual Dictionary (EN / HI)"]
    end

    subgraph Engine_Layer["3. Heuristic Pedagogical Rule Engine"]
        L{"Diagnostic Score Evaluator"}
        M["Rule 1: Diagnostic < 50% -> Foundation Recap & Manipulatives"]
        N["Rule 2: Diagnostic 50-79% -> Targeted Concept Practice"]
        O["Rule 3: Diagnostic >= 80% -> Mini-Test Verification"]
        P["Rule 4: Teacher Override -> Direct Pedagogical Assignment"]
    end

    subgraph Data_Layer["4. NCERT Knowledge Graph & Curriculum Bank"]
        Q["6 Class 6 NCERT Math Chapters"]
        R["92+ Bilingual Questions Bank"]
        S["Interactive Visualizer Sandbox State"]
        T["Browser LocalStorage (Zero PII, Offline)"]
    end

    UI_Layer --> State_Layer
    State_Layer --> Engine_Layer
    Engine_Layer --> Data_Layer
    Data_Layer -.-> State_Layer
    State_Layer -.-> UI_Layer
```

---

## 🔄 5-Stage Cyclical Mastery Loop

Every topic in SikshaPath guides the learner through an empirically validated 5-stage mastery cycle:

```mermaid
flowchart LR
    S1["Stage 1: Quick Check<br/>(3-Question Diagnostic)"] --> S2["Stage 2: Learn<br/>(Visual Manipulatives & Recap)"]
    S2 --> S3["Stage 3: Solve<br/>(Practice with Adaptive Hints)"]
    S3 --> S4["Stage 4: Test<br/>(Mini-Test Verification)"]
    S4 --> S5["Stage 5: Adapt<br/>(Transparent Rule Generation)"]
    S5 -->|Certified Mastery| S6["Next NCERT Chapter"]
    S5 -->|Concept Gap Detected| S2
```

### Detailed Breakdown of the Cycle:

1. **Stage 1: Quick Check (Diagnostic Assessment)**
   - 3 carefully calibrated diagnostic questions targeting foundational prerequisites.
   - Evaluates micro-concept understanding (e.g., distinguishing numerator from denominator).
   - Generates an immediate baseline score and identifies weak concept nodes.

2. **Stage 2: Learn (Visual Manipulatives & Foundation Recap)**
   - Automatically opens **Foundation Recap** if diagnostic score $< 50\%$.
   - Interactive SVG/Canvas fraction partitions (change numerators/denominators with sliders to watch the visual bars divide dynamically).
   - Bite-sized, bulleted NCERT explanations with real-world Indian contextual examples (e.g., sharing chapatis, cricket run-rates).

3. **Stage 3: Solve (Interactive Guided Practice)**
   - Scaffolding problems with progressive hints (*"Step 1: Find the LCM of denominators"*).
   - Instant visual feedback with color-coded success/error cards.
   - Full bilingual explanations appear automatically after answering.

4. **Stage 4: Test (Mini-Test Assessment)**
   - Rigorous chapter-level assessment covering all micro-concepts.
   - Real-time score calculation and question review log.
   - Certifies whether the student has achieved true competency or requires targeted revision.

5. **Stage 5: Adapt (Explainable Next-Step Generation)**
   - Evaluates performance against transparent pedagogical thresholds.
   - Displays the **exact rule** that triggered the next action (e.g., *"Diagnostic score 72% between 50% and 79% triggered Targeted Practice on Unlike Fractions"*).
   - Gives the student clear options: reinforce gaps or attempt challenge problems.

---

## ✨ Key Technical Features

### 1. 🔍 Explainable Pedagogical Rule Engine (Zero Black-Box)

Most EdTech platforms hide recommendations behind opaque algorithms. SikshaPath operates on **100% deterministic, inspectable rules**:

```javascript
// Located at: src/engine/recommendationEngine.js
export function getRecommendation(student, subjectId = 'mathematics', topicId = 'fractions') {
  // 1. TEACHER OVERRIDE: Human pedagogical authority takes absolute precedence
  if (teacherOverride && teacherOverride.active) {
    return {
      action: teacherOverride.action,
      reason: "Assigned directly by teacher based on classroom diagnostic observation.",
      stage: teacherOverride.targetStage
    };
  }

  // 2. DIAGNOSTIC GATE: Baseline must be established before progression
  if (!topicProgress || topicProgress.diagnosticScore == null) {
    return {
      action: 'diagnostic',
      reason: 'No diagnostic baseline on record. Take 3-minute Quick Check first.',
      stage: 'quick-check'
    };
  }

  // 3. FOUNDATIONAL REMEDIATION (< 50%): Prerequisite gap detected
  if (topicProgress.diagnosticScore < 50) {
    return {
      action: 'learn',
      reason: `Diagnostic score (${topicProgress.diagnosticScore}%) is below 50%. Foundational recap required.`,
      stage: 'learn'
    };
  }

  // 4. TARGETED PRACTICE (50% - 79%): Specific concept gaps identified
  if (topicProgress.diagnosticScore < 80) {
    return {
      action: 'practice',
      concept: weakestConcept,
      reason: `Baseline score (${topicProgress.diagnosticScore}%) is solid. Targeted practice on weak concepts recommended.`,
      stage: 'solve'
    };
  }

  // 5. TOPIC MASTERY (>= 80%): Ready for certification test
  return {
    action: 'test',
    reason: `Diagnostic score (${topicProgress.diagnosticScore}%) shows mastery. Prove topic proficiency via Mini-Test.`,
    stage: 'test'
  };
}
```

---

### 2. 🗺️ Interactive Concept-Gap Dependency Map (DAG)

The **Concept Gap Map** renders the curriculum not as a flat list, but as an interconnected **Directed Acyclic Graph (DAG)** of micro-skills.

```mermaid
graph TD
    classDef understood fill:#10B981,stroke:#059669,stroke-width:2px,color:#fff;
    classDef practising fill:#F59E0B,stroke:#D97706,stroke-width:2px,color:#fff;
    classDef notchecked fill:#334155,stroke:#475569,stroke-width:2px,color:#fff;

    N1["1. Fraction Basics (अंश व हर)"]:::understood
    N2["2. Proper & Improper (उचित/विषम भिन्न)"]:::understood
    N3["3. Equivalent Fractions (तुल्य भिन्न)"]:::practising
    N4["4. Like vs Unlike (समान व असमान हर)"]:::practising
    N5["5. Comparing Fractions (भिन्नों की तुलना)"]:::notchecked
    N6["6. Fraction Addition (भिन्नों का जोड़)"]:::notchecked

    N1 --> N2
    N1 --> N3
    N2 --> N4
    N3 --> N4
    N4 --> N5
    N4 --> N6
```

- **🟢 Understood ($\ge 80\%$ Score)**: Node turns vibrant green with checkmark. Prerequisite verified.
- **⏳ Practising ($< 80\%$ Score)**: Node highlights in amber glow. Active concept gap flagged.
- **⚪ Not Checked**: Node remains slate grey until diagnostic or practice is attempted.
- **Interactive Node Inspector**: Clicking any concept card reveals prerequisites, subsequent topics, current accuracy %, and a 1-click **"Practice This Concept"** button.

---

### 3. 🎨 Dynamic Visual Manipulatives Sandbox

In foundational mathematics, students struggle when forced to memorize abstract formulas before developing geometric intuition. SikshaPath features a built-in **Visual Fractions Sandbox**:

```
 ┌──────────────────────────────────────────────────────────────┐
 │             VISUAL EQUIVALENCE SANDBOX DEMO                  │
 │                                                              │
 │   Fraction A: [ 2 / 3 ]                                      │
 │   ┌──────────────────────┬──────────────────────┬────────┐   │
 │   │      1/3 (Cyan)      │      1/3 (Cyan)      │ Empty  │   │
 │   └──────────────────────┴──────────────────────┴────────┘   │
 │                                                              │
 │   Fraction B: [ 4 / 6 ]                                      │
 │   ┌──────────┬──────────┬──────────┬──────────┬───────┬──────┐│
 │   │1/6 (Lime)│1/6 (Lime)│1/6 (Lime)│1/6 (Lime)│ Empty │ Empty││
 │   └──────────┴──────────┴──────────┴──────────┴───────┴──────┘│
 │                                                              │
 │   💡 Visual Proof: Both bars span the EXACT same physical    │
 │      length! Therefore: 2/3 is equivalent to 4/6!            │
 └──────────────────────────────────────────────────────────────┘
```

- **Interactive Sliders**: Move numerator and denominator sliders to observe real-time recalculations.
- **Dual Visual Modes**: Toggle between segmented rectangular fraction bars and circular radial pie slices.
- **Color-Coded Slices**: Active portions glow with neon cyan/lime; unselected portions remain translucent.

---

### 4. 🇮🇳 Bilingual Scaffolding Engine

SikshaPath supports true dual-language learning. Unlike machine-translated apps, every term has been mapped to official **NCERT bilingual vocabulary**:

| Concept Domain | English NCERT Term | Official Hindi NCERT Term (हिंदी) | Contextual Meaning |
| :--- | :--- | :--- | :--- |
| **Fractions** | Numerator / Denominator | अंश / हर | ऊपर की संख्या / कुल बराबर भाग |
| **Fractions** | Equivalent Fractions | तुल्य भिन्न | समान मान दर्शाने वाली भिन्न |
| **Fractions** | Proper / Improper | उचित भिन्न / विषम भिन्न | अंश < हर / अंश $\ge$ हर |
| **Whole Numbers** | Predecessor / Successor | पूर्ववर्ती / परवर्ती | संख्या $- 1$ / संख्या $+ 1$ |
| **Playing Numbers** | Prime & Composite | अभाज्य एवं भाज्य संख्याएँ | 2 गुणनखंड / 2 से अधिक गुणनखंड |
| **Playing Numbers** | HCF & LCM | म.स.प. एवं ल.स.प. | महत्तम समापवर्तक / लघुत्तम समापवर्त्य |
| **Integers** | Additive Inverse | योज्य प्रतिलोम | विपरीत चिन्ह वाली संख्या (उदा. $+5$ का $-5$) |
| **Decimals** | Tenths & Hundredths | दशांश एवं शतांश | $1/10$ भाग एवं $1/100$ भाग |
| **Mensuration** | Perimeter & Area | परिमाप एवं क्षेत्रफल | बाहरी सीमा की लंबाई एवं आंतरिक क्षेत्र |

---

### 5. 👥 Dual Role Portals & Educator Override Control

SikshaPath bridges the gap between independent student practice and teacher orchestration:

#### Student Portal
- Gamified dashboard with real-time XP accumulation, streak count, and mastery levels.
- Direct-launch buttons to all 6 NCERT chapters.
- Downloadable student progress report with printable progress charts.

#### Teacher Console
- **Cohort Concept Gap Heatmap**: Color-coded matrix showing which students struggle with which specific concepts across the class.
- **At-Risk Student Flagging**: Instantly filters students scoring $< 50\%$ on diagnostic checks.
- **Pedagogical Override Arbiter**: If an educator knows a student needs revision or challenge, they open the override modal and assign:
  - 🔄 *Foundational Recap*
  - ✏️ *Guided Practice on Weak Concepts*
  - 🚀 *Skip Ahead to Mini-Test*
  - 🏆 *High-Difficulty Challenge Problems*

---

### 6. 🤖 शिक्षा-मित्र (SikshaMitra) AI Math Assistant

Located at the bottom-right corner of every screen is **शिक्षा-मित्र (SikshaMitra)**, a floating, responsive AI Math Doubts Assistant:

- **24/7 Bilingual NCERT Tutor**: Answers questions in Hindi and English with step-by-step mathematical working.
- **Pre-Loaded Quick Chips**:
  - 🍕 *भिन्न (Fractions) क्या हैं?*
  - ➖ *पूर्णांक (Integers) के चिन्ह नियम समझाओ*
  - 📐 *परिमाप और क्षेत्रफल के सूत्र*
  - ⚖️ *अनुपात और समानुपात (Ratio & Proportion)*
  - 🧮 *HCF और LCM में क्या अंतर है?*
- **Step-by-Step Problem Solver**: Handles custom math questions (e.g. typing `3/4 + 1/4` returns full LCM working and step-by-step fraction addition).
- **Glassmorphic Tactile UI**: Designed with smooth message animations, typing indicators, and light/dark theme adaptation.

---

### 7. 🔒 100% Offline-First & Privacy-Preserving Design

- **Zero Cloud Data Transmission**: Student profiles, diagnostic scores, and logs are stored exclusively in the browser's `localStorage`.
- **Zero API Bills**: Runs completely self-contained without requiring paid OpenAI/Claude API keys.
- **PWA & Solar School Ready**: Ideal for remote schools with intermittent or non-existent internet connections.

---

## 📚 NCERT Class 6 Mathematics Coverage

SikshaPath features comprehensive bilingual lesson content, worked examples, and diagnostic/practice/test questions across **6 Core NCERT Mathematics Chapters**:

| Ch # | Chapter Title (English) | Chapter Title (हिंदी) | Micro-Concepts Included | Question Bank |
| :---: | :--- | :--- | :--- | :---: |
| **Ch 7** | Fractions | भिन्न | Numerator/Denominator, Types of Fractions, Equivalent Fractions, Comparing, Addition/Subtraction | **40 Questions** |
| **Ch 2** | Whole Numbers | पूर्ण संख्याएँ | Natural vs Whole Numbers, Predecessor/Successor, Number Line Operations, Closure & Commutative Laws | **15 Questions** |
| **Ch 3** | Playing with Numbers | संख्याओं के साथ खेलना | Factors & Multiples, Prime & Composite, Divisibility Rules (2-11), Prime Factorisation, HCF & LCM | **13 Questions** |
| **Ch 6** | Integers | पूर्णांक | Need for Negative Numbers, Number Line Representation, Absolute Value, Addition & Subtraction Rules | **10 Questions** |
| **Ch 8** | Decimals in Daily Life | दशमलव | Tenths & Hundredths, Comparing Decimals, Money/Length/Weight Conversions, Decimal Addition | **7 Questions** |
| **Ch 10**| Mensuration | क्षेत्रमिति | Perimeter of Rectangle & Square, Area of Rectangle & Square, Practical Word Problems | **7 Questions** |
| **TOTAL**| **6 Core Chapters** | **कक्षा 6 सम्पूर्ण गणित** | **32 Micro-Concepts** | **92+ Questions** |

---

## 🛠️ Technology Stack

| Architecture Layer | Technology | Architectural Justification |
| :--- | :--- | :--- |
| **Client Framework** | [React 18.3](https://react.dev/) | Declarative component tree, reactive hooks (`useMemo`, `useState`, `useContext`) |
| **Build Pipeline** | [Vite 8.3](https://vitejs.dev/) | Sub-150ms ESBuild compilation, instant HMR, tree-shaken static assets |
| **Routing System** | [React Router v6](https://reactrouter.com/) | `HashRouter` implementation ensuring seamless navigation on static hosts (GitHub Pages) |
| **State & Telemetry**| Web Storage API (LocalStorage) | Instant offline persistence, zero latency, zero cloud dependency, 100% PII safety |
| **Styling & Theme** | Custom CSS3 Architecture | Responsive variables, Dark Neon Claymorphism, Light Mode, zero heavy CSS libraries |
| **Error Resilience** | Custom React `ErrorBoundary` | Catches runtime exceptions gracefully with 1-click recovery |

---

## 📂 Project Directory Tree

```text
sikshapath/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated CI/CD deployment pipeline for GitHub Pages
├── public/
│   ├── favicon.ico               # SikshaPath branding icon
│   └── _redirects                # SPA single-page rewrite rules for static hosts
├── src/
│   ├── components/               # Reusable Visual & Pedagogical Components
│   │   ├── AITutorChat.jsx       # "शिक्षा-मित्र" Floating AI Math Doubts Chatbot
│   │   ├── ConceptMap.jsx        # Interactive concept-gap DAG graph & node inspector
│   │   ├── ErrorBoundary.jsx     # Global error boundary to prevent screen freezing
│   │   ├── Footer.jsx            # Multi-column footer with curriculum links & disclaimer
│   │   ├── FractionVisualizer.jsx# Dynamic visual fraction pie & bar sandbox
│   │   ├── Navbar.jsx            # Responsive navigation bar with role & theme toggles
│   │   ├── ResetConfirmModal.jsx # Student data state reset modal
│   │   ├── Sidebar.jsx           # Collapsible mobile/desktop navigation drawer
│   │   └── TeacherOverrideModal.jsx # Modal allowing educators to override recommendations
│   ├── context/
│   │   └── AppContext.jsx        # Global context: student profile, theme, language, telemetry
│   ├── data/
│   │   ├── lessons.js            # Comprehensive NCERT Class 6 bilingual lesson content (6 Ch)
│   │   ├── questions.js          # 92+ NCERT Class 6 bilingual question bank with hints
│   │   ├── students.js           # Built-in student personas with pre-loaded progress
│   │   ├── subjects.js           # Curriculum hierarchy & micro-concept definitions
│   │   └── translations.js       # Complete English-Hindi i18n dictionary
│   ├── engine/
│   │   └── recommendationEngine.js # Deterministic pedagogical recommendation rules
│   ├── pages/
│   │   ├── AdaptiveLearningJourney.jsx # 5-Stage cyclical adaptive learning hub
│   │   ├── ConceptGapMapPage.jsx       # Dedicated full-page concept dependency explorer
│   │   ├── LandingPage.jsx             # 2-Column Hero, Live sandbox preview & course catalog
│   │   ├── RoleSelectionPage.jsx       # Student persona & teacher role switcher
│   │   ├── StudentDashboard.jsx        # Student analytics, topic progress, active recommendations
│   │   ├── StudentReportPage.jsx       # Exportable student report card & concept breakdown
│   │   └── TeacherDashboard.jsx        # Educator console: cohort gap heatmap & overrides
│   ├── styles/                         # Modular CSS Design System
│   │   ├── chatbot.css           # Styling for SikshaMitra AI floating widget
│   │   ├── concept-map.css       # Concept map graph & inspector styling
│   │   ├── dashboard.css         # Analytics cards, gauges, and tables
│   │   ├── index.css             # Global theme variables, typography, and base layout
│   │   ├── journey.css           # 5-stage stepper, question cards, and visualizers
│   │   ├── landing.css           # 2-column hero, course micro-grid, and feature showcases
│   │   ├── mobile.css            # Responsive breakpoints & mobile navigation drawer
│   │   └── teacher.css           # Educator heatmap, override controls, and cohort charts
│   ├── App.jsx                   # Main layout shell and route definitions
│   └── main.jsx                  # React application entry point (HashRouter)
├── index.html                    # HTML5 entry template
├── package.json                  # Dependencies, scripts, and project metadata
├── vercel.json                   # Vercel deployment & rewrite configuration
└── vite.config.js                # Vite build and asset path configurations
```

---

## 🚀 Local Installation & Setup

Experience SikshaPath locally in under 2 minutes:

### Prerequisites
- **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes bundled with Node.js)

### Step-by-Step Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vanshikayadav6153-ai/sikshaPath.git
   cd sikshaPath
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   *Vite will compile the bundle in ~130ms and auto-open your browser at `http://localhost:5173/`.*

4. **Verify production build**:
   ```bash
   npm run build
   ```
   *Output files will be generated in `dist/` with zero compile errors.*

---

## 🏆 Hackathon Evaluation Matrix

| Judging Criterion | How SikshaPath Excels | Evidence in Codebase |
| :--- | :--- | :--- |
| **Problem-Solution Fit** | Directly tackles India's 52% middle-school foundational numeracy deficit using NEP 2020 pedagogical standards. | `src/data/lessons.js`, `src/data/questions.js` |
| **Algorithmic Innovation** | Completely eliminates black-box AI hallucinations with transparent, deterministic recommendation heuristics. | `src/engine/recommendationEngine.js` |
| **Inclusivity & Vernacular Impact** | 100% authentic bilingual NCERT terminology in English and Hindi for rural and semi-urban learners. | `src/data/translations.js`, `src/components/AITutorChat.jsx` |
| **Teacher Empowerment** | Provides educators with cohort-level diagnostic heatmaps and 1-click pedagogical override authority. | `src/pages/TeacherDashboard.jsx`, `src/components/TeacherOverrideModal.jsx` |
| **Visual & Interactive Pedagogy** | Dynamic SVG/Canvas fraction partitioners and interactive Concept Gap DAGs replace static textbook reading. | `src/components/FractionVisualizer.jsx`, `src/components/ConceptMap.jsx` |
| **Offline-First Resilience** | 100% client-side execution with zero external cloud dependencies or server costs. | `src/context/AppContext.jsx` |

---

## 🔮 Future Roadmap

- [ ] **Vernacular Voice Walkthroughs**: Speech synthesis in regional languages (Marathi, Bengali, Tamil, Telugu) for visually impaired and auditory learners.
- [ ] **Mesh Network Peer-to-Peer Sync**: Local Wi-Fi sync between a teacher's laptop and student tablets without requiring active internet access.
- [ ] **Automated Remedial Worksheet Generator**: 1-click generation of printable PDF homework sheets targeting a student's specific concept gaps.
- [ ] **Science Modules (Classes 6–10)**: Expansion into NCERT Physics, Chemistry, and Biology visual sandboxes.

---

## 🤝 Contributing

Contributions to SikshaPath are warmly welcomed! 

1. Fork the Repository.
2. Create your Feature Branch (`git checkout -b feature/NewVisualSandbox`).
3. Commit your Changes (`git commit -m 'feat: add integers number line sandbox'`).
4. Push to the Branch (`git push origin feature/NewVisualSandbox`).
5. Open a **Pull Request**.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

<p align="center">
  <strong>Built with ❤️ for every student and teacher across India 🇮🇳</strong><br/>
  <em>SikshaPath — Learn at Your Pace. Grow with Guidance.</em>
</p>
