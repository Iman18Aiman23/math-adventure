import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import NumberTraceLesson from '../../_shared/NumberTraceLesson';

const TOPIC_ID = '1-4-1-tulis-0-20';
const THEME = {
  pageGradient: 'linear-gradient(180deg,#F7FEE7 0%,#DCFCE7 55%,#86EFAC 100%)',
  dark: '#15803D',
  cd: '#16A34A',
  accent: '#22C55E',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#F7FEE7 0%,#BBF7D0 58%,#86EFAC 100%)',
  pillGradient: 'linear-gradient(180deg,#86EFAC,#22C55E)',
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
