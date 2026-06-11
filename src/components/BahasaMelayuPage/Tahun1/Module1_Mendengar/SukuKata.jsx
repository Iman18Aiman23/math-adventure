import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';
import KVLearningPage from '../../../ReadingPage/KVLearningPage';

const TOPIC_ID = '1-1-7-suku-kata';
const ACCENT = '#E8821A';

// Review pool: ~30% of quiz rounds come from the four letter topics.
const REVIEW_IDS = [
  '1-1-1-mendengar-menyebut',
  '1-1-3-konsonan-bj',
  '1-1-4-konsonan-kr',
  '1-1-5-konsonan-sz',
];

// Two-page topic: the full KV flashcard system (shared with the Age 4–6
// Reading pillar — letter picker, RUMI/ENG/JAWI toggle, tap-to-listen)
// as the learn page, then the first-syllable segmentation quiz.
export default function SukuKata({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const reviewQs = REVIEW_IDS.flatMap(id => BM_QUESTIONS[id] || []);
  const quiz = useBMQuiz(BM_QUESTIONS[TOPIC_ID] || [], reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Suku Kata' : 'Syllables';

  const handleBack = () => {
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <KVLearningPage
        onBack={handleBack}
        language={language}
        onStartQuiz={() => setPage('quiz')}
        title={topicTitle}
      />
    );
  }

  return (
    <BMLessonQuizLayout
      onBack={handleBack} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic}
      topicTitle={topicTitle}
      quiz={quiz}
      language={language}
      accentColor={ACCENT}
      onShowLearn={() => setPage('learn')}
    />
  );
}
