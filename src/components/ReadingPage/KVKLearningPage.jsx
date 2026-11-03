import React from 'react';
import { KVK_LETTERS, getKVKSeriesByLetter } from '../../data/curriculum/bm_kvk';
import { KVK_EXAMPLES, KVK_EXAMPLES_JAWI } from '../../data/curriculum/kvkExampleSentences';
import KVLearningPage from './KVLearningPage';

const getSeries = letter => getKVKSeriesByLetter(letter).map(item => ({
  ...item,
  kv: item.kvk,
  ms: { ...item.ms, sentence: KVK_EXAMPLES[item.id] ?? item.ms?.sentence },
  jawi: { ...item.jawi, sentence: KVK_EXAMPLES_JAWI[item.id] },
}));

export default function KVKLearningPage({
  onBack,
  onComplete = onBack,
  language,
  onStartQuiz,
  title = language === 'bm' ? 'Suku Kata KVK' : 'KVK Syllables',
  ...accountProps
}) {
  return (
    <KVLearningPage
      {...accountProps}
      onBack={onBack}
      onComplete={onComplete}
      language={language}
      onStartQuiz={onStartQuiz}
      title={title}
      letters={KVK_LETTERS}
      getSeriesByLetter={getSeries}
    />
  );
}
