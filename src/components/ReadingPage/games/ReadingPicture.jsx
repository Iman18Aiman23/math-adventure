import React from 'react';
import { scenes, vocabulary } from './readingContent';

export default function ReadingPicture({ word, scene }) {
  if (!scene) {
    return <span className="rg-picture" role="img" aria-label={word}>{vocabulary.find(v => v.word === word)?.emoji}</span>;
  }
  const s = scenes.find(item => item.id === scene);
  const drinking = s.action === 'drink';
  const eating = s.action === 'eat';
  return <svg className="rg-scene" viewBox="0 0 240 170" role="img" aria-label={s.sentence}>
    <rect width="240" height="170" rx="20" fill="#eef8ff" />
    <ellipse cx="120" cy="150" rx="90" ry="10" fill="#d5eee4" />
    <path d="M86 109 L83 143 M113 109 L117 143" stroke="#304969" strokeWidth="12" strokeLinecap="round" />
    <path d="M75 111 Q72 66 99 68 Q125 66 123 111Z" fill="#59bba1" />
    <circle cx="99" cy="44" r="25" fill="#efbe91" />
    <path d="M74 42 Q70 10 98 16 Q128 13 124 43 L114 30 Q93 37 82 28Z" fill="#493c36" />
    <circle cx="93" cy="43" r="2.5" fill="#26324b" /><circle cx="109" cy="43" r="2.5" fill="#26324b" />
    <path d="M94 55 Q102 61 109 54" fill="none" stroke="#8c483a" strokeWidth="2.5" strokeLinecap="round" />
    <path d={drinking ? 'M121 79 L145 64 L129 49' : 'M78 81 L89 103 M120 81 L147 103'} fill="none" stroke="#efbe91" strokeWidth="11" strokeLinecap="round" />
    {eating && <><path d="M134 114H206M148 114V145M196 114V145" stroke="#b8946d" strokeWidth="8" /><path d="M128 97L117 58" stroke="#78879e" strokeWidth="4" /><ellipse cx="116" cy="56" rx="5" ry="8" fill="#78879e" /></>}
    <text x={drinking ? 124 : s.action === 'wear' ? 99 : s.action === 'shoes' ? 110 : 161} y={drinking ? 62 : s.action === 'shoes' ? 148 : 111} textAnchor="middle" fontSize={s.action === 'wear' ? 54 : 42}>{s.object}</text>
    <text x="193" y="28" textAnchor="middle" fontSize="16" fontFamily="Fredoka, sans-serif" fill="#304969">{s.person}</text>
  </svg>;
}
