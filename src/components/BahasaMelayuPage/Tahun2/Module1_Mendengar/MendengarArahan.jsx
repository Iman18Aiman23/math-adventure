import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import BMNotaCard from '../../_shared/BMNotaCard';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '2-1-1b-mendengar-arahan';
const ACCENT = '#E8821A';

export default function MendengarArahan({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [showNote, setShowNote] = useState(true);  // Nota Penting intro on every entry
  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];
  const quiz = useBMQuiz(currentQs, reviewQs, 10);

  if (showNote) {
    return (
      <BMNotaCard
        language={language}
        accentColor={ACCENT}
        topicTitle={language === 'bm' ? 'Mendengar Arahan' : 'Listen to Instructions'}
        definition={language === 'bm'
          ? 'Arahan ialah sesuatu yang disuruh buat. Kita perlu mendengar dengan teliti supaya faham apa yang perlu dilakukan.'
          : 'An instruction is something you are told to do. Listen carefully so you understand what to do.'}
        examples={language === 'bm'
          ? ['Cikgu berkata, "Sila buka buku dan baca muka surat lima."', 'Murid membuka buku lalu membaca.']
          : ['Teacher says, "Please open your book and read page five."', 'The pupil opens the book and reads.']}
        conclusion={language === 'bm' ? '➜ Murid mendengar dan memahami arahan.' : '➜ The pupil listens to and understands the instruction.'}
        onStart={() => setShowNote(false)}
        onBack={onBack}
      />
    );
  }

  return (
    <BMLessonQuizLayout
      onBack={() => onBack?.()} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic}
      topicTitle={language === 'bm' ? 'Mendengar Arahan' : 'Listen to Instructions'}
      quiz={quiz}
      language={language}
      accentColor={ACCENT}
      instructionMode
    />
  );
}
