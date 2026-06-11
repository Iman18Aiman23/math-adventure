import React from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '1-1-6-dengar-teka';
const ACCENT = '#E8821A';

// Listening topic — quiz-only (no learn page): the child HEARS a word
// (auto-played TTS + replay button from BMLessonQuizLayout's audioText
// support) and picks the written word. Reverse skill of the emoji
// letter quizzes, covering the silibus "Mendengar" strand.
// Review pool: questions from the letter topics + suku kata (~30% of rounds).
const REVIEW_IDS = [
  '1-1-1-mendengar-menyebut',
  '1-1-3-konsonan-bj',
  '1-1-4-konsonan-kr',
  '1-1-5-konsonan-sz',
  '1-1-7-suku-kata',
];

export default function DengarTeka({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const reviewQs = REVIEW_IDS.flatMap(id => BM_QUESTIONS[id] || []);
  const quiz = useBMQuiz(BM_QUESTIONS[TOPIC_ID] || [], reviewQs, 15);
  const topicTitle = language === 'bm' ? 'Dengar & Teka' : 'Listen & Guess';

  const handleBack = () => {
    onBack?.();
  };

  return (
    <BMLessonQuizLayout
      onBack={handleBack} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic}
      topicTitle={topicTitle}
      quiz={quiz}
      language={language}
      accentColor={ACCENT}
    />
  );
}
