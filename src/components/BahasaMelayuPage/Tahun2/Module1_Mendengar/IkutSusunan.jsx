import React from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '2-1-1c-ikut-susunan';
const ACCENT = '#E8821A';

export default function IkutSusunan({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];
  const quiz = useBMQuiz(currentQs, reviewQs, 10);

  return (
    <BMLessonQuizLayout
      onBack={() => onBack?.()} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic}
      topicTitle={language === 'bm' ? 'Ikut Susunan' : 'Follow the Order'}
      quiz={quiz}
      language={language}
      accentColor={ACCENT}
      instructionMode
    />
  );
}
