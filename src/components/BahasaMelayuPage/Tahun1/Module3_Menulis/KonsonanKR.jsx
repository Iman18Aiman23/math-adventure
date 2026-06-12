import React from 'react';
import LetterTraceLesson from './LetterTraceLesson';

const LETTERS = ['K','L','M','N','P','Q','R'];
const TOPIC_ID = '1-3-3-menulis-konsonan-kr';
const ACCENT = '#7A4FD0';

export default function KonsonanKR(props) {
  const label = props.language === 'bm' ? 'Konsonan K–R' : 'Consonants K–R';
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
