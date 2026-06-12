import React from 'react';
import LetterTraceLesson from './LetterTraceLesson';

const LETTERS = ['A','E','I','O','U'];
const TOPIC_ID = '1-3-1-menulis-vokal';
const ACCENT = '#7A4FD0';

export default function MenulisVokal(props) {
  const label = props.language === 'bm' ? 'Menulis Huruf Vokal' : 'Writing Vowel Letters';
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
