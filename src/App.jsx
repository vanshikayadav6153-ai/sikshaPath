/**
 * SikshaPath - Main Application Router & Shell
 */

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ResetConfirmModal from './components/ResetConfirmModal';
import StudentLoginModal from './components/StudentLoginModal';
import AITutorChat from './components/AITutorChat';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import AdaptiveLearningJourney from './pages/AdaptiveLearningJourney';
import ConceptGapMapPage from './pages/ConceptGapMapPage';
import StudentReportPage from './pages/StudentReportPage';
import TeacherDashboard from './pages/TeacherDashboard';
import RoleSelectionPage from './pages/RoleSelectionPage';

// Global Styles
import './styles/index.css';
import './styles/landing.css';
import './styles/dashboard.css';
import './styles/journey.css';
import './styles/teacher.css';
import './styles/concept-map.css';
import './styles/mobile.css';
import './styles/chatbot.css';

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useApp();

  // Sync theme to document body and root
  React.useEffect(() => {
    const activeTheme = theme || 'dark';
    document.documentElement.setAttribute('data-theme', activeTheme);
    document.body.className = `theme-${activeTheme}`;
  }, [theme]);

  return (
    <div className={`app-layout theme-${theme || 'dark'}`}>
      <Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="main-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/learn" element={<AdaptiveLearningJourney />} />
            <Route path="/student/concept-map" element={<ConceptGapMapPage />} />
            <Route path="/student/report" element={<StudentReportPage />} />
            {/* Alias for dashboard button */}
            <Route path="/student/progress" element={<StudentReportPage />} />
            <Route path="/select-profile" element={<RoleSelectionPage />} />
            <Route path="/profile" element={<RoleSelectionPage />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </main>

      <Footer />
      <StudentLoginModal />
      <ResetConfirmModal />
      <AITutorChat />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

