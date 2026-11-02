import React from 'react';
import { readingData } from '../../data/curriculum/readingData';
import KVLearningPage from './KVLearningPage';

const sentenceItems = readingData
  .filter(item => item.level === 4)
  .map(item => ({
    id: item.id,
    kv: item.rumi.split(/\s+/)[0] ?? '',
    jawiSyllable: '',
    icon: item.emoji,
    ms: { word: item.rumi.replace(/-/g, '') },
    en: { word: item.eng },
    jawi: { word: item.jawi },
  }));

export default function LongSentences({ onBack, onComplete = onBack, language, title, ...accountProps }) {
  return (
    <KVLearningPage
      {...accountProps}
      onBack={onBack}
      onComplete={onComplete}
      language={language}
      title={title ?? (language === 'bm' ? 'Ayat Mudah' : 'Simple Sentences')}
      items={sentenceItems}
      initialScript="RUMI"
    />
  );
}
