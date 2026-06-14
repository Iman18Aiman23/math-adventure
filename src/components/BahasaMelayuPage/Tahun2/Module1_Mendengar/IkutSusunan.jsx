import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import BMNotaCard from '../../_shared/BMNotaCard';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '2-1-1c-ikut-susunan';
const ACCENT = '#E8821A';

export default function IkutSusunan({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [showNote, setShowNote] = useState(true);  // Nota Penting intro on every entry
  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];
  const quiz = useBMQuiz(currentQs, reviewQs, 10);

  if (showNote) {
    return (
      <BMNotaCard
        language={language}
        accentColor={ACCENT}
        topicTitle={language === 'bm' ? 'Ikut Susunan' : 'Follow the Order'}
        definition={language === 'bm'
          ? 'Susunan ialah urutan langkah — langkah pertama, kedua, dan terakhir. Dengar dengan teliti supaya tahu apa yang perlu dibuat dahulu dan kemudian.'
          : 'A sequence is the order of steps — first, second, and last. Listen carefully so you know what to do first and next.'}
        examples={language === 'bm'
          ? ['Cikgu berkata, "Ambil pensel, lukis bulatan, kemudian warnakan."', 'Langkah pertama: ambil pensel. Langkah terakhir: warnakan.']
          : ['Teacher says, "Take a pencil, draw a circle, then colour it."', 'First step: take a pencil. Last step: colour it.']}
        conclusion={language === 'bm' ? '➜ Murid mengikut susunan langkah dengan betul.' : '➜ The pupil follows the steps in the correct order.'}
        onStart={() => setShowNote(false)}
        onBack={onBack}
      />
    );
  }

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
