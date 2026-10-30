/**
 * SikshaPath - Global Error Boundary Component
 * Catches unhandled runtime exceptions gracefully so the page never crashes or freezes
 */

import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SikshaPath ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.hash = '#/student/dashboard';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '540px',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
            <h2 style={{ color: '#FFFFFF', marginBottom: '0.75rem', fontSize: '1.5rem' }}>
              सीखने की यात्रा पुनः लोड करें (Reload Learning Journey)
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
              पेज लोड करते समय एक क्षणिक त्रुटि हुई। कृपया नीचे दिए गए बटन पर क्लिक करके यात्रा को पुनः प्रारंभ करें।
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  background: 'linear-gradient(135deg, #00F0FF 0%, #0284C7 100%)',
                  color: '#031427',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.75rem 1.5rem',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                🔄 पुनः लोड करें (Reload Journey)
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.hash = '#/';
                  window.location.reload();
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '0.75rem 1.5rem',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                🏠 होम पर जाएं (Go Home)
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
