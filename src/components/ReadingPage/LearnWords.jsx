import React from 'react';
import { readingData } from '../../data/curriculum/readingData';
import KVLearningPage from './KVLearningPage';

const wordItems = readingData
  .filter(item => item.level === 3)
  .map(item => ({
    id: item.id,
    kv: item.syllables?.[0] ?? '',
    jawiSyllable: item.jawi.split(/\s+/)[0] ?? '',
    icon: item.emoji,
    ms: { word: item.rumi.replace(/-/g, '') },
    en: { word: item.eng },
    jawi: { word: item.jawi },
  }));

export default function LearnWords({ onBack, onComplete = onBack, language, title, ...accountProps }) {
  return (
    <KVLearningPage
      {...accountProps}
      onBack={onBack}
      onComplete={onComplete}
      language={language}
      title={title ?? (language === 'bm' ? 'Perkataan' : 'Words')}
      items={wordItems}
      initialScript="RUMI"
    />
  );
}
