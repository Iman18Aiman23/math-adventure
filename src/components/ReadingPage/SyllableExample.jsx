import React from 'react';

export default function SyllableExample({ text, syllable, label, dir = 'ltr', lang = 'ms' }) {
  const example = text ?? '';
  const target = syllable?.toLowerCase() ?? '';
  const matchAt = target ? example.toLowerCase().indexOf(target) : -1;
  const parts = matchAt < 0
    ? [example]
    : [example.slice(0, matchAt), example.slice(matchAt, matchAt + target.length), example.slice(matchAt + target.length)];

  return (
    <div className="kv-syllable-example" dir={dir} lang={lang}>
      <span className="kv-syllable-example-label">{label}</span>
      <span className="kv-syllable-example-text" dir={dir} lang={lang}>
        {parts.map((part, index) => index === 1 && matchAt >= 0
          ? <mark className="kv-syllable-highlight" key={index}>{part}</mark>
          : <React.Fragment key={index}>{part}</React.Fragment>)}
      </span>
    </div>
  );
}
