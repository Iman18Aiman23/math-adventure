import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import BMNotaCard from '../../_shared/BMNotaCard';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '2-1-1d-pesanan';
const ACCENT = '#E8821A';

export default function Pesanan({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [showNote, setShowNote] = useState(true);  // Nota Penting intro on every entry
  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];
  const quiz = useBMQuiz(currentQs, reviewQs, 10);
  const topicTitle = language === 'bm' ? 'Pesanan' : 'Messages';

  if (showNote) {
    return (
      <BMNotaCard
        language={language}
        accentColor={ACCENT}
        topicTitle={topicTitle}
        definition={language === 'bm'
          ? 'Pesanan ialah mesej yang kita sampaikan kepada orang lain. Kita perlu ingat butiran penting seperti masa, tempat, dan apa yang berlaku.'
          : 'A message is information we pass on to someone. Remember the important details such as the time, place, and what happened.'}
        examples={language === 'bm'
          ? ['Ibu berkata, "Beritahu ayah: mesyuarat pukul lima petang di sekolah."', 'Kita sampaikan pesanan itu dengan tepat.']
          : ['Mum says, "Tell dad: the meeting is at five o\'clock at school."', 'We pass on the message accurately.']}
        conclusion={language === 'bm' ? '➜ Murid menyampaikan pesanan dengan tepat.' : '➜ The pupil delivers the message accurately.'}
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
      instructionMode
    />
  );
}
