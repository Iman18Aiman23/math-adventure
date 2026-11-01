import React from 'react';
import ReadingDataLearningPage from './ReadingDataLearningPage';

export default function LongSentences({ onBack, onComplete, language, title, ...accountProps }) {
  return (
    <ReadingDataLearningPage
      onBack={onBack}
      onComplete={onComplete}
      language={language}
      title={title ?? (language === 'bm' ? 'Ayat Mudah' : 'Simple Sentences')}
      level={4}
      accountProps={accountProps}
    />
  );
}
