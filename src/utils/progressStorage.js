/**
 * SikshaPath - LocalStorage Persistence Utility
 * Manages all student states, quiz history, teacher overrides, and settings.
 * Ensures data survives page reloads and offers clean reset functionality.
 */

import initialStudents, { mockEvaluatorStudents } from '../data/demoStudents';

const STORAGE_KEY = 'sikshapath_app_state_v1';
const LANGUAGE_KEY = 'sikshapath_language_pref';
const ROLE_KEY = 'sikshapath_current_role';
const STUDENT_ID_KEY = 'sikshapath_active_student_id';
const THEME_KEY = 'sikshapath_theme_pref';

/**
 * Initializes storage with demo data if not yet present
 */
export function initializeStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStudents));
      return initialStudents;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStudents));
      return initialStudents;
    }
    return parsed;
  } catch (e) {
    console.warn('Failed to access localStorage, using memory fallback:', e);
    return initialStudents;
  }
}

/**
 * Load all students from storage
 */
export function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading students:', e);
  }
  return initializeStorage();
}

/**
 * Save all students array to storage
 */
export function saveStudents(students) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (e) {
    console.error('Error saving students to storage:', e);
  }
}

/**
 * Get the currently active student ID or default to 'student-1'
 */
export function getActiveStudentId() {
  try {
    const id = localStorage.getItem(STUDENT_ID_KEY);
    if (id) return id;
  } catch {}
  return 'student-1';
}

/**
 * Set active student ID
 */
export function setActiveStudentId(id) {
  try {
    localStorage.setItem(STUDENT_ID_KEY, id);
  } catch {}
}

/**
 * Get preferred language ('en' | 'hi')
 */
export function getLanguagePreference() {
  try {
    const lang = localStorage.getItem(LANGUAGE_KEY);
    if (lang === 'hi' || lang === 'en') return lang;
  } catch {}
  return 'en';
}

/**
 * Set preferred language
 */
export function setLanguagePreference(lang) {
  try {
    localStorage.setItem(LANGUAGE_KEY, lang);
  } catch {}
}

/**
 * Get preferred role ('student' | 'teacher')
 */
export function getRolePreference() {
  try {
    const role = localStorage.getItem(ROLE_KEY);
    if (role === 'teacher' || role === 'student') return role;
  } catch {}
  return 'student';
}

/**
 * Set preferred role
 */
export function setRolePreference(role) {
  try {
    localStorage.setItem(ROLE_KEY, role);
  } catch {}
}

/**
 * Get preferred theme ('dark' | 'light')
 * Defaults to 'dark' for neon playful aesthetic
 */
export function getThemePreference() {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === 'light' || theme === 'dark') return theme;
  } catch {}
  return 'dark';
}

/**
 * Set preferred theme
 */
export function setThemePreference(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

/**
 * Reset all data to initial clean student state (0% progress, 0 streak)
 */
export function resetAllData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STUDENT_ID_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStudents));
    return initialStudents;
  } catch (e) {
    console.error('Error resetting data:', e);
    return initialStudents;
  }
}

/**
 * Loads mock evaluator profiles with historical data for judges/evaluators
 */
export function loadEvaluatorSampleData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEvaluatorStudents));
    return mockEvaluatorStudents;
  } catch (e) {
    console.error('Error loading evaluator data:', e);
    return mockEvaluatorStudents;
  }
}

