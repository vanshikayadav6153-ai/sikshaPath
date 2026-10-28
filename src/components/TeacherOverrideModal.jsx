/**
 * SikshaPath - Teacher Override Recommendation Modal
 * Gives educators full pedagogical control to manually assign
 * Revision, Guided Practice, Continue, or Challenge.
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import subjects from '../data/subjects';

export default function TeacherOverrideModal({ student, isOpen, onClose }) {
  const { saveTeacherOverride, clearTeacherOverride, language, t } = useApp();

  const classNum = student?.class || 6;
  const subjectKey = student?.subject || 'mathematics';
  const topicId = student?.currentTopic || 'fractions';
  const topicData = subjects[subjectKey]?.classes?.[classNum]?.topics?.find((t) => t.id === topicId);
  const concepts = topicData?.concepts || [];

  const existingOverride = student?.teacherOverride?.[topicId];

  const [action, setAction] = useState(existingOverride?.action || 'guided-practice');
  const [selectedConcept, setSelectedConcept] = useState(existingOverride?.concept || concepts[0] || '');
  const [difficulty, setDifficulty] = useState(existingOverride?.difficulty || 2);
  const [notes, setNotes] = useState(existingOverride?.notes || '');

  if (!isOpen || !student) return null;

  const handleSave = (e) => {
    e.preventDefault();
    saveTeacherOverride(student.id, topicId, {
      action,
      concept: selectedConcept,
      difficulty,
      notes: notes || `Teacher assigned: ${action.replace(/-/g, ' ')} on ${selectedConcept || topicId}`,
      notesHi: `शिक्षक द्वारा निर्धारित: ${selectedConcept || topicId} पर ${action}`
    });
    onClose();
  };

  const handleClear = () => {
    clearTeacherOverride(student.id, topicId);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon-badge">👩‍🏫</div>
          <div>
            <h3>{t('overrideRecommendation')}</h3>
            <p className="modal-sub">
              {student.name} &middot; Class {student.class} &middot;{' '}
              {language === 'hi' ? topicData?.nameHi : topicData?.name}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="modal-form">
          <div className="form-group">
            <label className="form-label">
              {language === 'hi' ? 'शिक्षक द्वारा अनुशंसित कदम:' : 'Assigned Next Step:'}
            </label>
            <div className="override-options-grid">
              <label
                className={`override-radio-card ${action === 'revision' ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="action"
                  value="revision"
                  checked={action === 'revision'}
                  onChange={() => setAction('revision')}
                />
                <div className="override-radio-content">
                  <span className="override-title">📘 {t('actionRevision')}</span>
                  <span className="override-desc">
                    {language === 'hi'
                      ? 'बुनियादी संकल्पनाओं और सचित्र उदाहरणों का पुनरावलोकन।'
                      : 'Review foundation prerequisites and visual examples.'}
                  </span>
                </div>
              </label>

              <label
                className={`override-radio-card ${action === 'guided-practice' ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="action"
                  value="guided-practice"
                  checked={action === 'guided-practice'}
                  onChange={() => setAction('guided-practice')}
                />
                <div className="override-radio-content">
                  <span className="override-title">✏️ {t('actionGuidedPractice')}</span>
                  <span className="override-desc">
                    {language === 'hi'
                      ? 'संकेतों और चरणबद्ध व्याख्या के साथ निर्देशित अभ्यास।'
                      : 'Step-by-step practice with active hints.'}
                  </span>
                </div>
              </label>

              <label
                className={`override-radio-card ${action === 'continue' ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="action"
                  value="continue"
                  checked={action === 'continue'}
                  onChange={() => setAction('continue')}
                />
                <div className="override-radio-content">
                  <span className="override-title">➡️ {t('actionContinue')}</span>
                  <span className="override-desc">
                    {language === 'hi'
                      ? 'सामान्य गति से अगले विषय या मिनी-टेस्ट की ओर बढ़ें।'
                      : 'Proceed with normal progression or mini-test.'}
                  </span>
                </div>
              </label>

              <label
                className={`override-radio-card ${action === 'challenge' ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="action"
                  value="challenge"
                  checked={action === 'challenge'}
                  onChange={() => setAction('challenge')}
                />
                <div className="override-radio-content">
                  <span className="override-title">🚀 {t('actionChallenge')}</span>
                  <span className="override-desc">
                    {language === 'hi'
                      ? 'उच्च कठिनाई वाले बहु-चरणीय समस्या समाधान।'
                      : 'Multi-step advanced high-order thinking problems.'}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">
                {language === 'hi' ? 'लक्षित संकल्पना (Target Concept):' : 'Target Concept Focus:'}
              </label>
              <select
                className="form-select"
                value={selectedConcept}
                onChange={(e) => setSelectedConcept(e.target.value)}
              >
                {concepts.map((c) => (
                  <option key={c} value={c}>
                    {c.replace(/-/g, ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group flex-1">
              <label className="form-label">
                {language === 'hi' ? 'कठिनाई स्तर (Difficulty):' : 'Difficulty Level:'}
              </label>
              <select
                className="form-select"
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
              >
                <option value={1}>{language === 'hi' ? 'स्तर 1 - सरल / बुनियादी' : 'Level 1 - Foundation'}</option>
                <option value={2}>{language === 'hi' ? 'स्तर 2 - मानक' : 'Level 2 - Standard'}</option>
                <option value={3}>{language === 'hi' ? 'स्तर 3 - उच्च / चुनौती' : 'Level 3 - Advanced'}</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              {language === 'hi' ? 'शिक्षक की टिप्पणी / मार्गदर्शन:' : 'Teacher Guidance Note:'}
            </label>
            <textarea
              className="form-textarea"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'छात्र के डैशबोर्ड पर प्रदर्शित करने के लिए विशेष निर्देश...'
                  : 'Specific instructions to be displayed on student dashboard...'
              }
            />
          </div>

          <div className="modal-actions">
            {existingOverride && (
              <button
                type="button"
                className="btn btn-outline btn-danger-text"
                onClick={handleClear}
              >
                {language === 'hi' ? 'ओवरराइड हटाएं' : 'Clear Override'}
              </button>
            )}
            <div className="modal-actions-right">
              <button type="button" className="btn btn-outline" onClick={onClose}>
                {t('cancel')}
              </button>
              <button type="submit" className="btn btn-primary">
                {t('saveChanges')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

