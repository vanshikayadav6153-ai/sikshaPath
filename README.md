# 🎓 SikshaPath (शिक्षापथ)
### *Bridging Foundational Concept Gaps Through Transparent, Multilingual Adaptive Learning*

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x%20%2F%208.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![NCERT Aligned](https://img.shields.io/badge/Curriculum-NCERT%20Class%206-orange.svg)](#-curriculum-coverage)
[![NEP 2020 Compliant](https://img.shields.io/badge/Policy-NEP%202020%20Aligned-success.svg)](#-key-features)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Deployment](https://img.shields.io/badge/Deploy-GitHub%20Pages%20%7C%20Vercel-success)](https://vanshikayadav6153-ai.github.io/sikshaPath/)

---

## 📌 Executive Summary

**SikshaPath (शिक्षापथ)** is an open-source, intelligent, and research-grounded adaptive learning platform engineered to identify and remediate foundational learning gaps in middle-school mathematics (NCERT Class 6). Designed in alignment with India's **National Education Policy (NEP 2020)** and **NIPUN Bharat guidelines**, SikshaPath moves away from opaque "black-box" machine learning algorithms. Instead, it utilizes an **explainable, deterministic pedagogical rule engine** paired with **interactive visual manipulatives**, **diagnostic concept-gap dependency trees**, and **bilingual vernacular scaffolding** (English & authentic Hindi NCERT terminology).

---

## 🛑 The Problem

Across developing education ecosystems, over **50% of middle-school students face severe cumulative learning deficits** in foundational STEM subjects:
1. **The Compounding Deficit**: Traditional classrooms advance according to a rigid calendar rather than individual competency. A student who struggles with basic fraction equivalence or negative numbers falls further behind when algebra and geometry are introduced.
2. **The "Black-Box" AI Dilemma**: Modern EdTech platforms often implement opaque AI recommendation systems that neither the student nor the teacher can inspect, audit, or pedagogically adjust.
3. **Language Barriers in STEM**: Millions of students studying in regional medium schools struggle because digital platforms fail to support accurate vernacular mathematical terminology.
4. **Disconnected Educators**: Teachers lack actionable diagnostic data to identify *why* a student answered a problem incorrectly (e.g., misidentifying the denominator vs. failing common LCM operations).

---

## 💡 The SikshaPath Solution

SikshaPath resolves these systemic challenges through a **5-Stage Cyclical Mastery Loop**:

```
 ┌────────────────┐       ┌────────────────┐       ┌────────────────┐
 │ 1. Quick Check │ ────> │   2. Learn     │ ────> │   3. Solve     │
 │  (Diagnostic)  │       │ (Visual Lab)   │       │(Practice+Hints)│
 └────────────────┘       └────────────────┘       └────────────────┘
         ▲                                                  │
         │                ┌────────────────┐                │
         └─────────────── │   5. Adapt     │ <──────────────┘
          (Next Topic)    │  (Rule Engine) │
                          └────────────────┘
                                  ▲
                                  │
                          ┌────────────────┐
                          │    4. Test     │
                          │  (Assessment)  │
                          └────────────────┘
```

1. **Step 1: Quick Check (Diagnostic Assessment)**: Identifies existing baseline competency across specific sub-concepts before learning begins.
2. **Step 2: Learn (Visual Manipulatives & Foundation Recap)**: Provides conceptual foundations, step-by-step NCERT worked examples, and real-time interactive diagrams (e.g., dynamic fraction bars and circular slice visualizers).
3. **Step 3: Solve (Scaffolded Practice)**: Interactive questions with immediate corrective feedback, progressive hints, and step-by-step solution breakdowns.
4. **Step 4: Test (Mini-Test Verification)**: Rigorous evaluation across all chapter sub-skills to measure true mastery.
5. **Step 5: Adapt (Explainable Next-Step Generation)**: Transparent rule engine analyzes diagnostic scores, concept-specific error rates, and educator overrides to prescribe the optimal next pedagogical intervention.

---

## ✨ Core Features

### 1. 🔍 Explainable Pedagogical Rule Engine
- **Zero Black-Box Guesswork**: Every student recommendation (e.g., *"Foundation Recap"*, *"Targeted Practice on Weak Concepts"*, *"Mini-Test Challenge"*) displays the explicit rule and logic criteria that triggered it.
- **Pedagogical Teacher Overrides**: Educators have complete authority to override automated paths, assign custom learning interventions, and prescribe specific difficulty levels.

### 2. 🗺️ Interactive Concept-Gap Dependency Map
- Visualizes curriculum concepts as a connected directed acyclic graph (DAG).
- Real-time classification into **3 Explicit Mastery States**:
  - ⚪ **Not Checked**: Diagnostic not yet attempted.
  - ⏳ **Practising**: Active learning state ($< 80\%$ accuracy).
  - 🟢 **Understood**: Certified mastery ($\ge 80\%$ accuracy).
- Instant detection and highlighting of prerequisite knowledge bottlenecks.

### 3. 🎨 Real-Time Interactive Visualizer Sandboxes
- **Dynamic Fraction Sandbox**: Visualizes numerator and denominator partitioning in real time with interactive circular pies, segmented rectangular bars, and fraction equivalence comparison.
- **Number Line & Geometric Explorations**: Visual coordinate shifts for integers and geometric configurations.

### 4. 🇮🇳 Native Bilingual Engine (English & Hindi)
- Seamless one-click toggling between English and authentic NCERT Hindi mathematical terminology (e.g., *अंश/हर*, *पूर्ववर्ती/परवर्ती*, *तुल्य भिन्न*, *ल.स.प./म.स.प.*, *दशांश/शतांश*).
- Full internationalization support designed for vernacular-medium classrooms.

### 5. 👥 Dual Role Architecture & Student Personas
- **Student Portal**: Self-paced, gamified learning journey with XP progression, milestone badges, and intuitive progress charts.
- **Teacher Dashboard**: Cohort-level performance analytics, concept-gap heatmaps, at-risk student flagging, and batch assignment capabilities.
- **Pre-Configured Personas**: Built-in test personas (*Aarav Patel* - foundational struggles, *Diya Sharma* - fast-paced achiever, *Rohan Gupta* - steady learner) for immediate evaluation without setup friction.

### 6. 📱 Responsive Neomorphic / Claymorphic UI
- Tactile modern design system featuring **Dark Neon Claymorphism** and clean **Light Mode**.
- 100% mobile-responsive layouts with touch-friendly swipeable strips, collapsible sidebars, and accessible controls.

---

## 📚 Curriculum Coverage (NCERT Class 6 Mathematics)

| Chapter | Title (English) | Title (हिंदी) | Key Micro-Concepts | Question Bank |
| :--- | :--- | :--- | :--- | :---: |
| **Ch 7** | Fractions | भिन्न | Numerator/Denominator, Types of Fractions, Equivalent Fractions, Comparing, Addition/Subtraction | 40 Questions |
| **Ch 2** | Whole Numbers | पूर्ण संख्याएँ | Natural vs Whole Numbers, Predecessor/Successor, Number Line, Closure & Commutative, Distributive Law | 15 Questions |
| **Ch 3** | Playing with Numbers | संख्याओं के साथ खेलना | Factors & Multiples, Prime & Composite, Divisibility Rules (2-11), Prime Factorisation, HCF, LCM | 13 Questions |
| **Ch 6** | Integers | पूर्णांक | Need for Negatives, Number Line Representation, Integer Ordering, Addition & Subtraction Rules | 10 Questions |
| **Ch 8** | Decimals | दशमलव | Tenths & Hundredths, Comparing Decimals, Currency & Metric Conversions, Vertical Addition | 7 Questions |
| **Ch 4** | Basic Geometrical Ideas | आधारभूत ज्यामितीय अवधारणाएँ | Points, Lines, Rays, Curves & Polygons, Angles, Triangles, Quadrilaterals, Circle Parts | 7 Questions |

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | [React 18](https://react.dev/) | Component architecture, state management, reactive virtual DOM |
| **Build & Tooling**| [Vite](https://vitejs.dev/) | Instant Hot Module Replacement (HMR) and optimized ESBuild bundling |
| **Routing** | [React Router v6](https://reactrouter.com/) | Hash-based client routing (`HashRouter`) for universal static hosting |
| **Design System** | Custom CSS3 Architecture | Responsive variables, Dark Neon & Light Claymorphism, Mobile-first CSS |
| **State Persistence** | Web Storage API (LocalStorage) | Offline-capable student profiles, quiz telemetry, and teacher overrides |
| **CI/CD & Hosting** | [GitHub Actions](https://github.com/features/actions) / [Vercel](https://vercel.com/) | Automated test, production build, and continuous deployment |

---

## 📂 Project Directory Structure

```text
sikshapath/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Actions deployment pipeline
├── public/
│   ├── favicon.ico               # SikshaPath branding icon
│   └── _redirects                # SPA single-page rewrite rules for static hosts
├── src/
│   ├── components/               # Reusable UI & Core Visual Components
│   │   ├── ConceptMap.jsx        # Interactive concept-gap graph & node inspector
│   │   ├── Footer.jsx            # Platform footer with curriculum credits
│   │   ├── FractionVisualizer.jsx# Dynamic visual fraction pie & bar sandbox
│   │   ├── Navbar.jsx            # Top navigation, persona switcher, theme & lang toggles
│   │   ├── ResetConfirmModal.jsx # Student data state reset modal
│   │   └── Sidebar.jsx           # Collapsible mobile/desktop navigation drawer
│   ├── context/
│   │   └── AppContext.jsx        # Global context: student profile, theme, language, telemetry
│   ├── data/
│   │   ├── lessons.js            # Comprehensive NCERT bilingual lesson content
│   │   ├── questions.js          # 92+ NCERT Class 6 bilingual question bank
│   │   ├── students.js           # Built-in student personas with pre-loaded progress
│   │   ├── subjects.js           # Curriculum hierarchy & micro-concept definitions
│   │   └── translations.js       # Complete English-Hindi i18n dictionary
│   ├── engine/
│   │   └── recommendationEngine.js # Deterministic pedagogical recommendation rules
│   ├── pages/
│   │   ├── AdaptiveLearningJourney.jsx # 5-Stage cyclical adaptive learning hub
│   │   ├── ConceptGapMapPage.jsx       # Dedicated full-page concept dependency explorer
│   │   ├── LandingPage.jsx             # Product landing, interactive demo & course catalog
│   │   ├── RoleSelectionPage.jsx       # Student persona & teacher role switcher
│   │   ├── StudentDashboard.jsx        # Student analytics, topic progress, active recommendations
│   │   ├── StudentReportPage.jsx       # Exportable student report card & concept breakdown
│   │   └── TeacherDashboard.jsx        # Educator console: cohort gap heatmap & overrides
│   ├── styles/                         # Modular CSS Design System
│   │   ├── concept-map.css       # Concept map graph & inspector styling
│   │   ├── dashboard.css         # Analytics cards, gauges, and tables
│   │   ├── index.css             # Theme variables, typography, and base resets
│   │   ├── journey.css           # 5-stage stepper, question cards, and visualizers
│   │   ├── landing.css           # Claymorphic hero, course grid, and feature showcases
│   │   ├── mobile.css            # Responsive breakpoints & mobile navigation drawer
│   │   └── teacher.css           # Educator heatmap, override controls, and cohort charts
│   ├── App.jsx                   # Main layout shell and route definitions
│   └── main.jsx                  # React application entry point (HashRouter)
├── index.html                    # HTML5 template
├── package.json                  # Dependencies, scripts, and project metadata
├── vercel.json                   # Vercel deployment & rewrite configuration
└── vite.config.js                # Vite build and asset path configurations
```

---

## 🚀 Installation & Local Development

Follow these steps to run SikshaPath on your local machine:

### Prerequisites
- **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm**: v9.0.0 or higher (bundled with Node.js) or **yarn** / **pnpm**
- **Git**: Installed and configured on your terminal

### Step-by-Step Setup

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
   The application will start immediately. Open your browser and navigate to:
   ```text
   http://localhost:5173/
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```
   The compiled, minified bundle will be output to the `dist/` directory.

5. **Preview the production build locally**:
   ```bash
   npm run preview
   ```

---

## 🌐 Live Deployment Guide

SikshaPath is optimized for zero-cost, high-performance static hosting:

### Option A: GitHub Pages (Pre-Configured)
1. Push your repository to GitHub.
2. In your repository, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site at:
   `https://<your-username>.github.io/sikshaPath/`

### Option B: Vercel (1-Click Deployment)
1. Import your GitHub repository to [Vercel](https://vercel.com/).
2. Framework Preset: **Vite**.
3. Root Directory: `./` (or directory containing `package.json`).
4. Click **Deploy**. Vercel will utilize `vercel.json` for seamless client-side route handling.

---

## 🧭 The Recommendation Logic Explained

SikshaPath enforces transparency in educational decision-making. The recommendation engine evaluates student performance against standardized pedagogical benchmarks:

```javascript
// Example of Deterministic Rule Evaluation:
if (teacherOverridePresent) {
  // 1. Teacher pedagogical authority supersedes automated rules
  return assignTeacherRecommendation();
} else if (diagnosticNotAttempted) {
  // 2. Baseline diagnostic required before progression
  return recommendStage("quick-check");
} else if (diagnosticScore < 50) {
  // 3. Score below 50%: Prerequisite breakdown detected
  return recommendStage("learn", { focus: "foundation-recap", difficulty: 1 });
} else if (diagnosticScore < 80) {
  // 4. Score 50%-79%: Targeted practice on identified concept gaps
  return recommendStage("solve", { weakConcepts: identifyGaps(), difficulty: 2 });
} else {
  // 5. Score >= 80%: Certified topic mastery
  return recommendStage("test", { challengeMode: true, difficulty: 3 });
}
```

---

## 🔮 Future Roadmap

- [ ] **AI Vernacular Voice Tutor**: Audio-guided visual walkthroughs in Indian regional languages (Tamil, Telugu, Bengali, Marathi).
- [ ] **Offline PWA & Local Mesh Sync**: Progressive Web App capabilities for solar-powered tablets in remote, internet-disconnected rural schools.
- [ ] **Expanded Curriculum**: Complete Class 6-10 NCERT Science modules (Physics, Chemistry, Biology) and interactive laboratory simulations.
- [ ] **Teacher Printables**: 1-click PDF worksheet generation tailored specifically to each student's identified concept gaps.

---

## 🤝 Contributing

Contributions make the open-source community an empowering space to learn, inspire, and create. Any contributions to SikshaPath are **greatly appreciated**!

1. Fork the Project.
2. Create your Feature Branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your Changes:
   ```bash
   git commit -m "feat: add AmazingFeature to concept visualizer"
   ```
4. Push to the Branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a **Pull Request**.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 💬 Acknowledgments & Credits

- **National Council of Educational Research and Training (NCERT)** for public curriculum frameworks and mathematical pedagogical guidelines.
- **NEP 2020 & NIPUN Bharat Initiative** for inspiring foundational literacy and numeracy (FLN) digital innovations.
- Developed with ❤️ for educators, students, and lifelong learners across India.
