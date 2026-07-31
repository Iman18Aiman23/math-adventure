import React from 'react';
import './MatematikQuestionLayout.css';

// Kept beside the shared header so its label precedence stays consistent.
// eslint-disable-next-line react-refresh/only-export-components
export function getMatematikQuestionSkill(question, fallback, language = 'bm') {
  const label = question?.skill
    || question?.header
    || question?.activityTitle
    || fallback
    || (language === 'bm' ? 'Latihan' : 'Practice');
  const text = String(label).replace(/-/g, ' ').trim();
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

export function MatematikQuestionHeader({
  activityNumber = 1,
  skill,
  question,
  language = 'bm',
  dark = '#15803D',
  accent = '#22C55E',
  className = '',
}) {
  return (
    <section
      className={`mtq-question-header ${className}`.trim()}
      style={{ '--mtq-primary': dark, '--mtq-accent': accent }}
      aria-label={language === 'bm' ? 'Soalan' : 'Question'}
    >
      <div className="mtq-question-meta">
        <span className="mtq-activity-label">
          {language === 'bm' ? 'Aktiviti' : 'Activity'} {activityNumber}
        </span>
        <span className="mtq-skill-label">{skill}</span>
      </div>
      <h2 className="mtq-question-label">{question}</h2>
    </section>
  );
}

export function MatematikQuestionActions({ children, className = '' }) {
  return (
    <section
      className={`mtq-actions-section ${className}`.trim()}
      aria-label="Tindakan soalan"
    >
      {children}
    </section>
  );
}
