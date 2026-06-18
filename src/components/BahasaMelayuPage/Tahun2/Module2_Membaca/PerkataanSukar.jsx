import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';
import PerkataanSukarLearningPage from './PerkataanSukarLearningPage';

const TOPIC_ID = '2-2-1-perkataan-sukar';
const ACCENT = '#1E7AC9';

export default function PerkataanSukar({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Perkataan Sukar (Digraf & Diftong)' : 'Difficult Words (Digraphs & Diphthongs)';

  const handleBack = () => {
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <PerkataanSukarLearningPage
        onBack={handleBack}
        language={language}
        onStartQuiz={() => setPage('quiz')}
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
