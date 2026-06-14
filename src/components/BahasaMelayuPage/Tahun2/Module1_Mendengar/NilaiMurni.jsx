import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import BMNotaCard from '../../_shared/BMNotaCard';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '2-1-2c-nilai-murni';
const ACCENT = '#E8821A';

export default function NilaiMurni({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [showNote, setShowNote] = useState(true);
  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];
  const quiz = useBMQuiz(currentQs, reviewQs, 10);

  const topicTitle = language === 'bm' ? 'Nilai Murni' : 'Moral Values';

  if (showNote) {
    return (
      <BMNotaCard
        language={language}
        accentColor={ACCENT}
        topicTitle={topicTitle}
        definition={language === 'bm'
          ? 'Jawapan yang baik menunjukkan nilai seperti tolong-menolong, hormat, dan jujur.'
          : 'Good answers show values like helpfulness, respect, and honesty.'}
        examples={language === 'bm'
          ? ['Jumpa dompet → beri kepada guru (jujur)', 'Bilik kotor → bersihkan (bertanggungjawab)']
          : ['Find a wallet → give to teacher (honest)', 'Dirty room → clean it (responsible)']}
        conclusion={language === 'bm' ? '➜ Tanya: "Apa yang baik untuk semua orang?"' : '➜ Ask: "What is good for everyone?"'}
        onStart={() => setShowNote(false)}
        onBack={onBack}
      />
    );
  }

  return (
    <BMLessonQuizLayout
      onBack={() => onBack?.()} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic}
      topicTitle={topicTitle}
      quiz={quiz}
      language={language}
      accentColor={ACCENT}
    />
  );
}
