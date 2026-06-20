import React from 'react';
import NumberTraceLesson from '../../_shared/NumberTraceLesson';

const TOPIC_ID = '1-4-1-tulis-0-20';
const ACCENT = '#F59E0B';

export default function Tulis0Hingga20(props) {
  const label = props.language === 'bm' ? 'Tulis 0 hingga 20' : 'Write 0 to 20';
  return (
    <NumberTraceLesson
      {...props}
      topicId={TOPIC_ID}
      topicLabel={label}
      accentColor={ACCENT}
    />
  );
}
