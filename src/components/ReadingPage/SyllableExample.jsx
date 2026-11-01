import React from 'react';
import AnnotatedText from './AnnotatedText';

export default function SyllableExample({ text, label, dir = 'ltr', lang = 'ms' }) {
  const example = text ?? '';

  return (
    <div className="kv-syllable-example" dir={dir} lang={lang}>
      <span className="kv-syllable-example-label">{label}</span>
      <span className="kv-syllable-example-text" dir={dir} lang={lang}>
        <AnnotatedText text={example} markClass="kv-syllable-highlight" />
      </span>
    </div>
  );
}
