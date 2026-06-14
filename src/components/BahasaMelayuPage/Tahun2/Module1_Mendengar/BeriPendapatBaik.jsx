import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import BMNotaCard from '../../_shared/BMNotaCard';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '2-1-2b-beri-pendapat-baik';
const ACCENT = '#E8821A';

export default function BeriPendapatBaik({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [showNote, setShowNote] = useState(true);
  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];
  const quiz = useBMQuiz(currentQs, reviewQs, 10);

  const topicTitle = language === 'bm' ? 'Beri Pendapat Baik' : 'Give Good Opinions';

  if (showNote) {
    return (
      <BMNotaCard
        language={language}
        accentColor={ACCENT}
        topicTitle={topicTitle}
        definition={language === 'bm'
          ? 'Fikir dahulu, kemudian beri jawapan yang sopan dan menolong.'
          : 'Think first, then give a polite and helpful answer.'}
        examples={language === 'bm'
          ? ['Kawan jatuh basikal → "Tolong kawan bangun."', 'Kawan nampak sedih → "Pujuk dan tanya dia."']
          : ['Friend falls off bike → "Help them get up."', 'Friend looks sad → "Comfort and ask them."']}
        conclusion={language === 'bm' ? '➜ Pilih tindakan yang baik hati dan bertanggungjawab.' : '➜ Choose kind and responsible actions.'}
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
        showFeedback
        hideEmoji
      />
  );
}
