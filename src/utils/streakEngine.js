/**
 * SikshaPath - Daily Consistency & Learning Streak Engine
 *
 * Rules:
 * 1. A new student starts with 0 streak and 0 progress.
 * 2. When a student completes a learning activity (diagnostic, practice, test):
 *    - If no previous activity: streak becomes 1, lastActiveDate = today.
 *    - If lastActiveDate was today: streak stays at current streak (keeps today's active status).
 *    - If lastActiveDate was yesterday: consecutive day! streak becomes streak + 1, lastActiveDate = today.
 *    - If lastActiveDate was 2 or more days ago: consistency was broken! streak resets to 1, lastActiveDate = today.
 * 3. When viewing the student's dashboard:
 *    - If no lastActiveDate: streak is 0.
 *    - If lastActiveDate is today or yesterday: active streak is maintained.
 *    - If lastActiveDate is older than yesterday: streak drops to 0 (since consistency was broken).
 */

/**
 * Returns today's date string in YYYY-MM-DD format (local timezone)
 */
export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates day difference between two YYYY-MM-DD date strings (dateB - dateA)
 */
export function getDaysDifference(dateStrA, dateStrB) {
  if (!dateStrA || !dateStrB) return Infinity;
  const [y1, m1, d1] = dateStrA.split('-').map(Number);
  const [y2, m2, d2] = dateStrB.split('-').map(Number);
  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((utc2 - utc1) / msPerDay);
}

/**
 * Computes active streak for display on student dashboard
 */
export function getActiveStreak(student) {
  if (!student) return 0;
  if (!student.lastActiveDate || !student.learningStreak) return 0;

  const todayStr = getLocalDateString();
  const daysDiff = getDaysDifference(student.lastActiveDate, todayStr);

  // If active today (0) or active yesterday (1), streak is valid and maintained
  if (daysDiff === 0 || daysDiff === 1) {
    return Math.max(0, student.learningStreak);
  }

  // If more than 1 day has passed without practice, consistency is broken -> 0
  return 0;
}

/**
 * Computes updated streak state when a learning activity is recorded
 */
export function recordActivityStreak(currentStreak = 0, lastActiveDate = null) {
  const todayStr = getLocalDateString();

  if (!lastActiveDate) {
    return {
      learningStreak: 1,
      lastActiveDate: todayStr,
      isNewDay: true
    };
  }

  const daysDiff = getDaysDifference(lastActiveDate, todayStr);

  if (daysDiff === 0) {
    // Activity already done today, maintain streak
    return {
      learningStreak: Math.max(1, currentStreak),
      lastActiveDate: todayStr,
      isNewDay: false
    };
  } else if (daysDiff === 1) {
    // Exactly yesterday! Consecutive day consistency!
    return {
      learningStreak: Math.max(0, currentStreak) + 1,
      lastActiveDate: todayStr,
      isNewDay: true
    };
  } else {
    // Skipped days -> streak broken, restart at 1 today
    return {
      learningStreak: 1,
      lastActiveDate: todayStr,
      isNewDay: true
    };
  }
}
