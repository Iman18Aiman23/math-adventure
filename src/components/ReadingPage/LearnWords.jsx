import React from 'react';
import ReadingDataLearningPage from './ReadingDataLearningPage';

export default function LearnWords({ onBack, onComplete, language, title, ...accountProps }) {
  return (
    <ReadingDataLearningPage
      onBack={onBack}
      onComplete={onComplete}
      language={language}
      title={title ?? (language === 'bm' ? 'Perkataan' : 'Words')}
      level={3}
      accountProps={accountProps}
    />
  );
}
