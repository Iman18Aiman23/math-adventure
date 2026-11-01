import React from 'react';

// Wrap text between double quotes in a mark and omit the markers.
// Example: '"I"ni "A"yam "Sa"ya' renders as Ini Ayam Saya with the
// I, A, and Sa segments highlighted.
export function stripHighlightMarkers(text = '') {
  return String(text).replace(/"([^"]*)"/g, '$1');
}

export default function AnnotatedText({ text = '', markClass = 'kv-sentence-kv' }) {
  const parts = String(text).split(/"([^"]*)"/g);

  return (
    <>
      {parts.map((part, index) => index % 2 === 1
        ? <mark className={markClass} key={index}>{part}</mark>
        : <React.Fragment key={index}>{part}</React.Fragment>)}
    </>
  );
}
