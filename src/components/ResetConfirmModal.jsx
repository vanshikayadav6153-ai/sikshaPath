/**
 * SikshaPath - Reset Demo Data Confirmation Modal
 */

import React from 'react';
import { useApp } from '../context/AppContext';

export default function ResetConfirmModal() {
  const { isResetModalOpen, setIsResetModalOpen, handleResetData, t, language } = useApp();

  if (!isResetModalOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsResetModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon-badge warning">⚠️</div>
          <h3>{t('resetConfirmTitle')}</h3>
        </div>
        <div className="modal-body">
          <p>{t('resetConfirmDesc')}</p>
          <div className="demo-notice-box">
            <small>
              {language === 'hi'
                ? 'यह आपके ब्राउज़र के localStorage को साफ़ करके 3 मूल छात्र प्रोफाइल (आरव, प्रिया, रोहन) को पुनः स्थापित करेगा।'
                : 'This clears browser localStorage and restores default demo students: Aarav (Struggling), Priya (On-Track), and Rohan (Advanced).'}
            </small>
          </div>
        </div>
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setIsResetModalOpen(false)}
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleResetData}
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}

