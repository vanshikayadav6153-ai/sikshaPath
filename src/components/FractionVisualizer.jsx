/**
 * SikshaPath - Interactive Fraction Visualizer
 * Renders interactive fraction bars and pie slices to help students
 * visualize numerator, denominator, and equivalent fractions.
 */

import React, { useState } from 'react';

export default function FractionVisualizer({
  initialNumerator = 3,
  initialDenominator = 8,
  interactive = true,
  showControls = true,
  language = 'en'
}) {
  const [numerator, setNumerator] = useState(initialNumerator);
  const [denominator, setDenominator] = useState(initialDenominator);

  const clampNum = (val) => Math.max(0, Math.min(val, denominator));
  const clampDenom = (val) => {
    const nextDenom = Math.max(1, Math.min(val, 16));
    setDenominator(nextDenom);
    if (numerator > nextDenom) {
      setNumerator(nextDenom);
    }
  };

  // Generate pie slices with SVG path
  const radius = 80;
  const center = 90;
  const slices = [];
  const anglePerSlice = 360 / denominator;

  for (let i = 0; i < denominator; i++) {
    const startAngle = (i * anglePerSlice - 90) * (Math.PI / 180);
    const endAngle = ((i + 1) * anglePerSlice - 90) * (Math.PI / 180);

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArc = anglePerSlice > 180 ? 1 : 0;
    const pathData =
      denominator === 1
        ? `M ${center} ${center - radius} A ${radius} ${radius} 0 1 1 ${center - 0.001} ${center - radius} Z`
        : `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    const isShaded = i < numerator;

    slices.push(
      <path
        key={i}
        d={pathData}
        fill={isShaded ? '#3B82F6' : '#F1F5F9'}
        stroke="#1E293B"
        strokeWidth="1.5"
        style={{
          cursor: interactive ? 'pointer' : 'default',
          transition: 'fill 0.2s ease'
        }}
        onClick={() => {
          if (!interactive) return;
          // Toggle slice count
          if (i < numerator) {
            setNumerator(i);
          } else {
            setNumerator(i + 1);
          }
        }}
      />
    );
  }

  // Fraction simplification
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(numerator, denominator);
  const simNum = numerator / divisor;
  const simDenom = denominator / divisor;
  const isSimplified = divisor === 1 || numerator === 0;

  return (
    <div className="fraction-visualizer-card">
      <div className="visualizer-header">
        <h4>{language === 'hi' ? 'सचित्र भिन्न प्रदर्शक' : 'Fraction Visualizer'}</h4>
        <div className="fraction-display-badge">
          <div className="math-fraction">
            <span className="fraction-num">{numerator}</span>
            <span className="fraction-bar" />
            <span className="fraction-denom">{denominator}</span>
          </div>
          {!isSimplified && (
            <span className="simplified-tag">
              = {simNum}/{simDenom} ({language === 'hi' ? 'सरलतम रूप' : 'simplified'})
            </span>
          )}
        </div>
      </div>

      <div className="visualizer-body">
        {/* Pie Diagram */}
        <div className="pie-container">
          <svg width="180" height="180" viewBox="0 0 180 180" className="pie-svg">
            {slices}
          </svg>
          <span className="visualizer-caption">
            {interactive
              ? language === 'hi'
                ? 'स्लाइस पर क्लिक करके रंग बदलें'
                : 'Click slices to shade/unshade'
              : ''}
          </span>
        </div>

        {/* Fraction Bar Diagram */}
        <div className="bar-container">
          <div className="fraction-bar-rect">
            {Array.from({ length: denominator }).map((_, idx) => (
              <div
                key={idx}
                className={`bar-segment ${idx < numerator ? 'shaded' : ''}`}
                style={{ width: `${100 / denominator}%` }}
                onClick={() => {
                  if (!interactive) return;
                  if (idx < numerator) {
                    setNumerator(idx);
                  } else {
                    setNumerator(idx + 1);
                  }
                }}
              >
                {denominator <= 10 && (
                  <span className="segment-label">1/{denominator}</span>
                )}
              </div>
            ))}
          </div>
          <div className="fraction-explanation-text">
            <strong>{numerator}</strong> {language === 'hi' ? 'भाग रंगे हैं कुल' : 'parts shaded out of'}{' '}
            <strong>{denominator}</strong> {language === 'hi' ? 'बराबर भागों में से' : 'equal parts'} (
            {Math.round((numerator / denominator) * 100)}%)
          </div>
        </div>
      </div>

      {showControls && interactive && (
        <div className="visualizer-controls">
          <div className="control-group">
            <label>
              {language === 'hi' ? 'अंश (Numerator): ' : 'Numerator (Top): '}
              <strong>{numerator}</strong>
            </label>
            <div className="btn-stepper">
              <button
                type="button"
                className="btn-step"
                onClick={() => setNumerator((n) => Math.max(0, n - 1))}
                disabled={numerator <= 0}
              >
                -
              </button>
              <input
                type="range"
                min="0"
                max={denominator}
                value={numerator}
                onChange={(e) => setNumerator(Number(e.target.value))}
                className="slider"
              />
              <button
                type="button"
                className="btn-step"
                onClick={() => setNumerator((n) => Math.min(denominator, n + 1))}
                disabled={numerator >= denominator}
              >
                +
              </button>
            </div>
          </div>

          <div className="control-group">
            <label>
              {language === 'hi' ? 'हर (Denominator): ' : 'Denominator (Bottom): '}
              <strong>{denominator}</strong>
            </label>
            <div className="btn-stepper">
              <button
                type="button"
                className="btn-step"
                onClick={() => clampDenom(denominator - 1)}
                disabled={denominator <= 1}
              >
                -
              </button>
              <input
                type="range"
                min="1"
                max="12"
                value={denominator}
                onChange={(e) => clampDenom(Number(e.target.value))}
                className="slider"
              />
              <button
                type="button"
                className="btn-step"
                onClick={() => clampDenom(denominator + 1)}
                disabled={denominator >= 12}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

