import React from 'react';
import LetterTraceLesson from './LetterTraceLesson';

const LETTERS = ['B','C','D','F','G','H','J'];
const TOPIC_ID = '1-3-2-menulis-konsonan-bj';
const ACCENT = '#7A4FD0';

export default function KonsonanBJ(props) {
  const label = props.language === 'bm' ? 'Konsonan B–J' : 'Consonants B–J';
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
