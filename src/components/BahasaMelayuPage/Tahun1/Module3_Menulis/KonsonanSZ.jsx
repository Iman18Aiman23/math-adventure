import React from 'react';
import LetterTraceLesson from './LetterTraceLesson';

const LETTERS = ['S','T','V','W','X','Y','Z'];
const TOPIC_ID = '1-3-4-menulis-konsonan-sz';
const ACCENT = '#7A4FD0';

export default function KonsonanSZ(props) {
  const label = props.language === 'bm' ? 'Konsonan S–Z' : 'Consonants S–Z';
  return (
    <LetterTraceLesson
      {...props}
      letters={LETTERS}
      topicId={TOPIC_ID}
      topicLabel={label}
      accentColor={ACCENT}
    />
  );
}
