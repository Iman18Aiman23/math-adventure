import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import NumberTraceLesson from '../../_shared/NumberTraceLesson';

const TOPIC_ID = '1-4-1-tulis-0-20';
const THEME = {
  pageGradient: 'linear-gradient(180deg,#FFFBEB 0%,#FDE68A 50%,#D97706 100%)',
  dark: '#B45309',
  cd: '#D97706',
  accent: '#F59E0B',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FEF3C7 0%,#FCD34D 55%,#D97706 100%)',
  pillGradient: 'linear-gradient(180deg,#F59E0B,#D97706)',
};

export default function Tulis0Hingga20({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const label = language === 'bm' ? 'Tulis 0 hingga 20' : 'Write 0 to 20';
  return (
    <MatematikTopicShell
      language={language}
      onBack={onBack}
      theme={THEME}
      emoji="✏️"
      titleBM="Tulis Nombor 0-20"
      titleEN="Write Number 0-20"
      subtitleBM=""
      subtitleEN=""
      showToggle={false}
      showReadyCta={false}
      learn={
        <NumberTraceLesson
          onBack={onBack}
          language={language}
          topicId={TOPIC_ID}
          topicLabel={label}
          topicComplete={topicComplete}
          onNextTopic={onNextTopic}
          accentColor={THEME.accent}
          scoreStorageKey="mt_ld_m1_scores"
          scoreId="tulis-0-20"
          hideTopbar
        />
      }
    />
  );
}
