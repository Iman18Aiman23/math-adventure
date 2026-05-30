import React from 'react';
import BackButton from './BackButton';

/**
 * PageLayout - Reusable standard page layout for topic/category selection pages
 *
 * Provides consistent structure for:
 * - ReadingPage (rp-), BMPage (bp-), MathHome (mh-), JawiPage (jw-)
 *
 * Props:
 *   classPrefix: string - CSS class prefix (e.g., 'mh', 'rp', 'bp', 'jw')
 *   heroIcon: React element - Icon/SVG to display in hero section
 *   heroSubtitle: React element or string - Subtitle text with optional star icon
 *   sectionLabel: string - Section divider text (e.g., "Choose Topic")
 *   hintText: React element or string - Footer hint text
 *   onBack: function - Callback for back button
 *   children: React elements - Grid tiles content
 *   additionalSection: React element - Optional extra section (e.g., BMPage's "How to Play")
 *   bodyClassName: string - Optional additional body class
 */
export default function PageLayout({
  classPrefix,
  heroIcon,
  heroTitle,
  heroSubtitle,
  sectionLabel,
  hintText,
  onBack,
  children,
  additionalSection,
  bodyClassName = '',
}) {
  const shellClass = `${classPrefix}-shell`;
  const bodyClass = `${classPrefix}-body ${bodyClassName}`;
  const heroClass = `${classPrefix}-hero`;
  const heroWrapClass = `${classPrefix}-hero-emoji-wrap`;
  const heroEmojiClass = `${classPrefix}-hero-emoji`;
  const heroSubClass = `${classPrefix}-hero-sub`;
  const sectionLabelClass = `${classPrefix}-section-label`;
  const gridClass = `${classPrefix}-grid`;
  const hintClass = `${classPrefix}-hint`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: 'var(--bg-body)' }}>
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', background: 'var(--bg-body)' }}>
        <div className={bodyClass} style={{ minHeight: '100%' }}>
          <div className={shellClass}>
            {/* Back Button */}
            <BackButton onClick={onBack} />

            {/* Hero Section */}
            <section className={heroClass}>
              <div className={heroWrapClass}>
                <span className={heroEmojiClass} role="img" aria-label="page icon">
                  {heroIcon}
                </span>
              </div>
              {heroTitle && <h1 className={`${classPrefix}-hero-title`}>{heroTitle}</h1>}
              <p className={heroSubClass}>
                {heroSubtitle}
              </p>
            </section>

            {/* Section Label */}
            <div className={sectionLabelClass}>
              {sectionLabel}
            </div>

            {/* Grid of Tiles */}
            <div className={gridClass}>
              {children}
            </div>

            {/* Hint Footer */}
            {hintText && (
              <div className={hintClass}>
                {hintText}
              </div>
            )}

            {/* Optional Additional Section (e.g., BMPage's "How to Play") */}
            {additionalSection && additionalSection}
          </div>
        </div>
      </div>
    </div>
  );
}
