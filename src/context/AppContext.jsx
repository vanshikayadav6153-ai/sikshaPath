/**
 * SikshaPath - Global Application Context
 * Handles student/teacher state, language translation, localStorage persistence,
 * quiz records, concept mastery updates, streak tracking, and teacher overrides.
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  loadStudents,
  saveStudents,
  getActiveStudentId,
  setActiveStudentId,
  getLanguagePreference,
  setLanguagePreference,
  getRolePreference,
  setRolePreference,
  getThemePreference,
  setThemePreference,
  resetAllData,
  loadEvaluatorSampleData
} from '../utils/progressStorage';
import { getActiveStreak, recordActivityStreak } from '../utils/streakEngine';
import { translations } from '../data/translations';
import { calculateUpdatedMastery } from '../engine/recommendationEngine';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [students, setStudents] = useState(() => loadStudents());
  const [currentStudentId, setCurrentStudentIdState] = useState(() => getActiveStudentId());
  const [role, setRoleState] = useState(() => getRolePreference());
  const [language, setLanguageState] = useState(() => getLanguagePreference());
  const [theme, setThemeState] = useState(() => getThemePreference());
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    setThemePreference(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      setThemePreference(next);
      return next;
    });
  }, []);

  // Sync students changes to localStorage
  useEffect(() => {
    saveStudents(students);
  }, [students]);

  // Set current active student ID
  const setCurrentStudentId = useCallback((id) => {
    setCurrentStudentIdState(id);
    setActiveStudentId(id);
  }, []);

  // Set role
  const setRole = useCallback((newRole) => {
    setRoleState(newRole);
    setRolePreference(newRole);
  }, []);

  // Set language
  const setLanguage = useCallback((newLang) => {
    setLanguageState(newLang);
    setLanguagePreference(newLang);
  }, []);

  // Translation helper function
  const t = useCallback(
    (key) => {
      const dict = translations[language] || translations.en;
      return dict[key] || translations.en[key] || key;
    },
    [language]
  );

  // Get current active student object with dynamic consistency streak
  const currentStudent = useMemo(() => {
    const stu = students.find((s) => s.id === currentStudentId) || students[0] || null;
    if (!stu) return null;
    return {
      ...stu,
      learningStreak: getActiveStreak(stu)
    };
  }, [students, currentStudentId]);

  // Update current student data
  const updateStudentData = useCallback(
    (updater) => {
      setStudents((prevList) =>
        prevList.map((stu) => {
          if (stu.id === currentStudentId) {
            const updated = typeof updater === 'function' ? updater(stu) : { ...stu, ...updater };
            return updated;
          }
          return stu;
        })
      );
    },
    [currentStudentId]
  );

  // Update specific student by ID (for teacher modifications)
  const updateSpecificStudent = useCallback((studentId, updater) => {
    setStudents((prevList) =>
      prevList.map((stu) => {
        if (stu.id === studentId) {
          const updated = typeof updater === 'function' ? updater(stu) : { ...stu, ...updater };
          return updated;
        }
        return stu;
      })
    );
  }, []);

  // Login or Register a Student with separate individual progress
  const loginOrRegisterStudent = useCallback(
    ({ name, classGrade = 6, language: prefLang = 'en', subject = 'mathematics' }) => {
      const cleanName = (name || '').trim();
      if (!cleanName) return null;

      // Check if student with this name already exists
      const existing = students.find(
        (s) => s.name.trim().toLowerCase() === cleanName.toLowerCase()
      );

      if (existing) {
        setCurrentStudentIdState(existing.id);
        setActiveStudentId(existing.id);
        setRoleState('student');
        setRolePreference('student');
        return { isNew: false, student: existing };
      }

      // Brand new student: starts at strictly ZERO progress, ZERO streak, and ZERO activities!
      const newStudent = {
        id: `student-${Date.now()}`,
        name: cleanName,
        avatar: ['👦', '👧', '🧑‍🎓', '🌟', '🚀', '⭐', '🦉', '🎓'][students.length % 8],
        class: Number(classGrade) || 6,
        preferredLanguage: prefLang || language || 'en',
        subject: subject || 'mathematics',
        currentTopic: 'fractions',
        learningPersona: 'on-track',
        personaLabel: 'Student Learner',
        personaLabelHi: 'छात्र शिक्षार्थी',
        personaDescription: `Class ${classGrade} student. Separate profile with isolated progress tracking and daily consistency streak.`,
        personaDescriptionHi: `कक्षा ${classGrade} का शिक्षार्थी। अलग प्रोफाइल, स्वतंत्र प्रगति ट्रैकिंग और निरंतरता स्ट्रीक।`,
        learningStreak: 0,
        lastActiveDate: null,
        topicProgress: {}, // 0% progress!
        quizHistory: [],   // 0 past quizzes!
        teacherOverride: null
      };

      const updatedList = [newStudent, ...students];
      setStudents(updatedList);
      saveStudents(updatedList);
      setCurrentStudentIdState(newStudent.id);
      setActiveStudentId(newStudent.id);
      setRoleState('student');
      setRolePreference('student');
      return { isNew: true, student: newStudent };
    },
    [students, language]
  );

  // Delete a student profile
  const deleteStudent = useCallback(
    (studentId) => {
      setStudents((prev) => {
        const filtered = prev.filter((s) => s.id !== studentId);
        const nextList = filtered.length > 0 ? filtered : resetAllData();
        saveStudents(nextList);
        if (currentStudentId === studentId) {
          const nextActiveId = nextList[0]?.id || 'student-1';
          setCurrentStudentIdState(nextActiveId);
          setActiveStudentId(nextActiveId);
        }
        return nextList;
      });
    },
    [currentStudentId]
  );

  // Save teacher override for a student on a specific topic
  const saveTeacherOverride = useCallback(
    (studentId, topicId, overrideObj) => {
      updateSpecificStudent(studentId, (prev) => {
        const existingOverrides = prev.teacherOverride || {};
        return {
          ...prev,
          teacherOverride: {
            ...existingOverrides,
            [topicId]: {
              ...overrideObj,
              date: new Date().toISOString()
            }
          }
        };
      });
    },
    [updateSpecificStudent]
  );

  // Clear teacher override
  const clearTeacherOverride = useCallback(
    (studentId, topicId) => {
      updateSpecificStudent(studentId, (prev) => {
        if (!prev.teacherOverride) return prev;
        const copy = { ...prev.teacherOverride };
        delete copy[topicId];
        return {
          ...prev,
          teacherOverride: Object.keys(copy).length > 0 ? copy : null
        };
      });
    },
    [updateSpecificStudent]
  );

  // Record a completed quiz attempt (diagnostic, practice, or test) with real consistency streak
  const recordQuizResult = useCallback(
    ({ type, topic = 'fractions', score, totalQuestions, correctCount, questionResponses = [], weakConcepts = [] }) => {
      updateStudentData((prev) => {
        const newQuizItem = {
          id: `qh-${Date.now()}`,
          type, // 'diagnostic' | 'practice' | 'test'
          topic,
          score,
          totalQuestions,
          correctCount,
          date: new Date().toISOString(),
          weakConcepts
        };

        const existingHistory = prev.quizHistory || [];
        const existingTopicProgress = prev.topicProgress || {};
        const curTopicData = existingTopicProgress[topic] || {
          status: 'practising',
          practiceAttempts: 0,
          conceptMastery: {}
        };

        const updatedMastery = calculateUpdatedMastery(
          curTopicData.conceptMastery || {},
          questionResponses
        );

        // Determine new topic status
        let newStatus = curTopicData.status || 'practising';
        if (type === 'test' && score >= 80) {
          newStatus = 'understood';
        } else if (newStatus === 'not-checked') {
          newStatus = 'practising';
        }

        const newTopicData = {
          ...curTopicData,
          status: newStatus,
          lastUpdated: new Date().toISOString(),
          conceptMastery: updatedMastery
        };

        if (type === 'diagnostic') {
          newTopicData.diagnosticScore = score;
        } else if (type === 'practice') {
          newTopicData.practiceAttempts = (curTopicData.practiceAttempts || 0) + 1;
        } else if (type === 'test') {
          newTopicData.testScore = score;
        }

        // Daily consistency streak calculation
        const streakResult = recordActivityStreak(prev.learningStreak || 0, prev.lastActiveDate);

        return {
          ...prev,
          learningStreak: streakResult.learningStreak,
          lastActiveDate: streakResult.lastActiveDate,
          quizHistory: [newQuizItem, ...existingHistory],
          topicProgress: {
            ...existingTopicProgress,
            [topic]: newTopicData
          }
        };
      });
    },
    [updateStudentData]
  );

  // Reset all data to initial clean state (0% progress, 0 streak)
  const handleResetData = useCallback(() => {
    const defaultData = resetAllData();
    setStudents(defaultData);
    setCurrentStudentIdState('student-1');
    setActiveStudentId('student-1');
    setIsResetModalOpen(false);
  }, []);

  // Load sample evaluator profiles for hackathon evaluators/judges
  const handleLoadEvaluatorData = useCallback(() => {
    const evaluatorData = loadEvaluatorSampleData();
    setStudents(evaluatorData);
    setCurrentStudentIdState('student-1');
    setActiveStudentId('student-1');
    setIsResetModalOpen(false);
  }, []);

  const value = {
    role,
    setRole,
    students,
    currentStudent,
    currentStudentId,
    setCurrentStudentId,
    language,
    setLanguage,
    theme,
    setTheme,
    toggleTheme,
    t,
    updateStudentData,
    updateSpecificStudent,
    loginOrRegisterStudent,
    deleteStudent,
    saveTeacherOverride,
    clearTeacherOverride,
    recordQuizResult,
    handleResetData,
    handleLoadEvaluatorData,
    isResetModalOpen,
    setIsResetModalOpen,
    isLoginModalOpen,
    setIsLoginModalOpen
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
