import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
import { pick, randInt, shuffle } from './explorePrimitives_shared';

const FRAC_WORDS = ['Setengah', 'Suku', 'Dua perempat', 'Tiga perempat'];

function FractionSvg({ type, parts, shaded, size }) {
  const sz = size || 'clamp(90px, 16vmin, 160px)';
  const strok = { stroke: '#334155', strokeWidth: 3, fill: 'none' };
  const shadeColors = ['#16A34A', '#22C55E', '#15803D', '#86EFAC'];
  if (type === 'circle' && parts === 2) {
    const d = shaded > 0 ? 'M 60 10 A 50 50 0 0 0 60 110 Z' : null;
    return (
      <svg viewBox="0 0 120 120" width={sz} height={sz} style={{ display: 'block' }}>
        <circle cx="60" cy="60" r="50" {...strok} />
        <line x1="60" y1="10" x2="60" y2="110" {...strok} />
        {d && <path d={d} fill={shadeColors[0]} opacity="0.72" />}
      </svg>
    );
  }
  if (type === 'circle' && parts === 4) {
    const quads = [
      'M 60 60 L 60 10 A 50 50 0 0 0 10 60 Z',
      'M 60 60 L 60 10 A 50 50 0 0 1 110 60 Z',
      'M 60 60 L 60 110 A 50 50 0 0 1 10 60 Z',
      'M 60 60 L 60 110 A 50 50 0 0 0 110 60 Z',
    ];
    return (
      <svg viewBox="0 0 120 120" width={sz} height={sz} style={{ display: 'block' }}>
        <circle cx="60" cy="60" r="50" {...strok} />
        <line x1="60" y1="10" x2="60" y2="110" {...strok} />
        <line x1="10" y1="60" x2="110" y2="60" {...strok} />
        {quads.slice(0, shaded).map((d, i) => <path key={i} d={d} fill={shadeColors[i % shadeColors.length]} opacity="0.72" />)}
      </svg>
    );
  }
  if (type === 'square' && parts === 2) {
    return (
      <svg viewBox="0 0 120 120" width={sz} height={sz} style={{ display: 'block' }}>
        <rect x="10" y="10" width="100" height="100" rx="6" {...strok} />
        <line x1="60" y1="10" x2="60" y2="110" {...strok} />
        {shaded > 0 && <rect x="10" y="10" width="50" height="100" fill={shadeColors[0]} opacity="0.72" rx="6" />}
      </svg>
    );
  }
  if (type === 'square' && parts === 4) {
    const quads = [
      <rect key={0} x="10" y="10" width="50" height="50" fill={shadeColors[0]} opacity="0.72" rx="3" />,
      <rect key={1} x="60" y="10" width="50" height="50" fill={shadeColors[1]} opacity="0.72" rx="3" />,
      <rect key={2} x="10" y="60" width="50" height="50" fill={shadeColors[2]} opacity="0.72" rx="3" />,
      <rect key={3} x="60" y="60" width="50" height="50" fill={shadeColors[3]} opacity="0.72" rx="3" />,
    ];
    return (
      <svg viewBox="0 0 120 120" width={sz} height={sz} style={{ display: 'block' }}>
        <rect x="10" y="10" width="100" height="100" rx="6" {...strok} />
        <line x1="60" y1="10" x2="60" y2="110" {...strok} />
        <line x1="10" y1="60" x2="110" y2="60" {...strok} />
        {quads.slice(0, shaded)}
      </svg>
    );
  }
  return null;
}

function EqualSvg({ type, size }) {
  const sz = size || 'clamp(90px, 18vmin, 180px)';
  const s = { stroke: '#15803D', strokeWidth: 3, fill: 'none' };
  if (type === 'circle') {
    return (
      <svg viewBox="0 0 120 120" width={sz} height={sz} style={{ display: 'block' }}>
        <circle cx="60" cy="60" r="50" {...s} />
        {/* Equal halves — line dead center */}
        <line x1="60" y1="10" x2="60" y2="110" {...s} />
        {/* Shading on left half */}
        <path d="M 60 10 A 50 50 0 0 0 60 110 Z" fill="#16A34A" opacity="0.25" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" width={sz} height={sz} style={{ display: 'block' }}>
      <rect x="10" y="10" width="100" height="100" rx="6" {...s} />
      <line x1="60" y1="10" x2="60" y2="110" {...s} />
      <rect x="10" y="10" width="50" height="100" fill="#16A34A" opacity="0.25" rx="6" />
    </svg>
  );
}

function UnequalSvg({ type, size }) {
  const sz = size || 'clamp(90px, 18vmin, 180px)';
  const s = { stroke: '#64748B', strokeWidth: 3, fill: 'none' };
  if (type === 'circle') {
    // Diagonal cut — obviously unequal (top-right to bottom-left)
    return (
      <svg viewBox="0 0 120 120" width={sz} height={sz} style={{ display: 'block' }}>
        <circle cx="60" cy="60" r="50" {...s} />
        {/* Very off-center line — x=35, only ~15% from left */}
        <line x1="35" y1="17" x2="35" y2="103" {...s} />
        <path d="M 35 17 A 50 50 0 0 0 35 103 Z" fill="#16A34A" opacity="0.18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" width={sz} height={sz} style={{ display: 'block' }}>
      <rect x="10" y="10" width="100" height="100" rx="6" {...s} />
      {/* Very off-center line — x=35 */}
      <line x1="35" y1="10" x2="35" y2="110" {...s} />
      <rect x="10" y="10" width="25" height="100" fill="#16A34A" opacity="0.18" rx="6" />
    </svg>
  );
}

function genSamaBesar() {
  const shape = pick(['circle', 'square']);
  // equalFirst: true = equal shape on LEFT position, false = equal shape on RIGHT
  const equalFirst = Math.random() < 0.5;
  return {
    type: 'kp-sama-besar',
    prompt: 'Yang manakah dipotong sama besar?',
    shape,
    equalFirst,
    answer: equalFirst ? 'sb-0' : 'sb-1',
  };
}

const FRAC_QUESTION_ANSWER = [
  { text: 'Setengah', value: '1/2', parts: 2, shaded: 1 },
  { text: 'Suku', value: '1/4', parts: 4, shaded: 1 },
  { text: 'Dua perempat', value: '2/4', parts: 4, shaded: 2 },
  { text: 'Tiga perempat', value: '3/4', parts: 4, shaded: 3 },
];

function makeOptions(correctText) {
  const opts = [correctText];
  const pool = FRAC_WORDS.filter(w => w !== correctText);
  shuffle(pool);
  for (const w of pool) { if (opts.length >= 4) break; opts.push(w); }
  return shuffle(opts);
}

function makeValueOptions(correctValue) {
  const opts = [correctValue];
  const pool = FRAC_QUESTION_ANSWER.map(item => item.value).filter(v => v !== correctValue);
  shuffle(pool);
  for (const v of pool) { if (opts.length >= 4) break; opts.push(v); }
  return shuffle(opts);
}

function takeShuffled(items, count) {
  return shuffle([...items]).slice(0, count);
}

function genNamakanPecahan(qa = pick(FRAC_QUESTION_ANSWER)) {
  const shape = pick(['circle', 'square']);
  const opts = makeOptions(qa.text);
  const options = opts.map((v, i) => ({ id: `opt-${i}`, value: v }));
  return {
    type: 'kp-namakan-text',
    prompt: 'Apakah pecahan kawasan berlorek?',
    shape,
    parts: qa.parts,
    shaded: qa.shaded,
    options,
    answer: options.find(o => o.value === qa.text).id,
  };
}

function genNamakanPecahanNombor(qa = pick(FRAC_QUESTION_ANSWER)) {
  const shape = pick(['circle', 'square']);
  const opts = makeValueOptions(qa.value);
  const options = opts.map((v, i) => ({ id: `opt-${i}`, value: v }));
  return {
    type: 'kp-namakan-number',
    prompt: 'Apakah pecahan kawasan berlorek?',
    shape,
    parts: qa.parts,
    shaded: qa.shaded,
    options,
    answer: options.find(o => o.value === qa.value).id,
  };
}

function genPilihGambar(qa = pick(FRAC_QUESTION_ANSWER)) {
  const shape = pick(['circle', 'square']);
  const others = FRAC_QUESTION_ANSWER.filter(q => q.value !== qa.value);
  const pool = shuffle(others).slice(0, 3);
  const all = shuffle([qa, ...pool]);
  const options = all.map((item, i) => ({
    id: `opt-${i}`,
    shape,
    parts: item.parts,
    shaded: item.shaded,
    value: item.value,
  }));
  return {
    type: 'kp-pilih-gambar',
    prompt: `Yang manakah ${qa.text.toLowerCase()}?`,
    options,
    answer: options.find(o => o.value === qa.value).id,
  };
}

function genPilihGambarNombor(qa = pick(FRAC_QUESTION_ANSWER)) {
  const shape = pick(['circle', 'square']);
  const others = FRAC_QUESTION_ANSWER.filter(q => q.value !== qa.value);
  const pool = shuffle(others).slice(0, 3);
  const all = shuffle([qa, ...pool]);
  const options = all.map((item, i) => ({
    id: `opt-${i}`,
    shape,
    parts: item.parts,
    shaded: item.shaded,
    value: item.value,
  }));
  return {
    type: 'kp-pilih-gambar-number',
    prompt: `Yang manakah ${qa.value}?`,
    options,
    answer: options.find(o => o.value === qa.value).id,
  };
}

function buildKenaliPecahanRound() {
  const qs = [];
  for (let i = 0; i < 2; i++) qs.push(genSamaBesar());
  takeShuffled(FRAC_QUESTION_ANSWER, 2).forEach(qa => qs.push(genPilihGambar(qa)));
  takeShuffled(FRAC_QUESTION_ANSWER, 2).forEach(qa => qs.push(genPilihGambarNombor(qa)));
  takeShuffled(FRAC_QUESTION_ANSWER, 2).forEach(qa => qs.push(genNamakanPecahan(qa)));
  takeShuffled(FRAC_QUESTION_ANSWER, 2).forEach(qa => qs.push(genNamakanPecahanNombor(qa)));
  return shuffle(qs);
}

function SamaBesarContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  const options = [
    { id: 'sb-0', label: 'Kiri', isEqual: q.equalFirst },
    { id: 'sb-1', label: 'Kanan', isEqual: !q.equalFirst },
  ];
  return (
    <div style={{
      display: 'flex', gap: 'clamp(10px, 2vmin, 24px)',
      width: '100%', flex: 1, minHeight: 0,
      padding: '0 clamp(8px, 2vmin, 24px)',
    }}>
      {options.map(opt => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        let bg, bd;
        if (answered && isAns) { bg = 'linear-gradient(135deg,#F0FFF4,#DCFCE7)'; bd = '#16A34A'; }
        else if (answered && picked) { bg = 'linear-gradient(135deg,#FFF5F5,#FEE2E2)'; bd = '#EF4444'; }
        else if (picked) { bg = 'linear-gradient(135deg,#F0FDF4,#DCFCE7)'; bd = C?.accent || '#16A34A'; }
        else { bg = 'rgba(255,255,255,0.92)'; bd = '#E2E8F0'; }
        return (
          <div key={opt.id} onClick={() => handlePick(opt.id)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(opt.id); }}}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 'clamp(6px, 1vmin, 12px)',
              padding: 'clamp(12px, 2vmin, 24px) clamp(8px, 1.4vmin, 16px)',
              background: bg, border: `2.5px solid ${bd}`,
              borderRadius: 'clamp(16px, 2.4vmin, 28px)',
              boxShadow: answered && isAns
                ? '0 0 0 4px rgba(22,163,74,.2), 0 12px 32px rgba(22,163,74,.16)'
                : answered && picked
                  ? '0 0 0 4px rgba(239,68,68,.2)'
                  : '0 6px 24px rgba(15,23,42,.10)',
              cursor: answered ? 'default' : 'pointer',
              transition: 'all .18s ease', WebkitTapHighlightColor: 'transparent',
              userSelect: 'none', minHeight: 0,
            }}>
            {opt.isEqual ? <EqualSvg type={q.shape} size="clamp(130px, 28vmin, 260px)" /> : <UnequalSvg type={q.shape} size="clamp(130px, 28vmin, 260px)" />}
            <div style={{
              fontFamily: "'Fredoka',sans-serif", fontWeight: 700,
              fontSize: 'clamp(12px, 1.8vmin, 16px)', color: '#64748B',
            }}>
              {opt.label}
            </div>
            {answered && (
              <div style={{
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
                fontSize: 'clamp(18px, 2.8vmin, 28px)',
                color: isAns ? '#16A34A' : (picked ? '#EF4444' : 'transparent'),
              }}>
                {isAns ? '✓' : (picked ? '✗' : '')}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function NamakanContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 'clamp(10px, 1.6vmin, 18px)', width: '100%',
      flex: 1, minHeight: 0, justifyContent: 'center',
    }}>
      <FractionSvg type={q.shape} parts={q.parts} shaded={q.shaded} size="clamp(140px, 35vmin, 320px)" />
      {/* 2-column grid of word answer buttons — fills available space */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'clamp(8px, 1.2vmin, 14px)',
        width: '100%', maxWidth: 'min(440px, 90vw)',
      }}>
        {q.options.map(opt => {
          const picked = selected === opt.id;
          const isAns = opt.id === answer;
          let bg, bd, clr, txt;
          if (answered && isAns) { bg = 'linear-gradient(135deg,#22C55E,#16A34A)'; bd = '#16A34A'; clr = '#fff'; txt = `${opt.value} ✓`; }
          else if (answered && picked) { bg = 'linear-gradient(135deg,#EF4444,#DC2626)'; bd = '#DC2626'; clr = '#fff'; txt = `${opt.value} ✗`; }
          else if (picked) { bg = `${C?.accent || '#16A34A'}18`; bd = C?.accent || '#16A34A'; clr = C?.dark || '#15803D'; txt = opt.value; }
          else { bg = 'rgba(255,255,255,0.92)'; bd = '#E2E8F0'; clr = '#1E293B'; txt = opt.value; }
          return (
            <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 'clamp(10px, 1.6vmin, 18px) clamp(10px, 1.4vmin, 16px)',
                borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                border: `2px solid ${bd}`,
                background: bg, color: clr,
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: answered && (isAns || picked) ? 'clamp(22px, 3.6vmin, 36px)' : 'clamp(18px, 2.8vmin, 28px)',
                lineHeight: 1.2, whiteSpace: 'nowrap', textAlign: 'center',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all .16s ease', WebkitTapHighlightColor: 'transparent',
                minHeight: 'clamp(52px, 8vmin, 82px)', width: '100%',
                boxShadow: answered && isAns
                  ? '0 0 0 3px rgba(34,197,94,.25), 0 8px 24px rgba(22,163,74,.2)'
                  : '0 4px 14px rgba(15,23,42,.09)',
              }}>
              {txt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PilihGambarContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 'clamp(8px, 1.4vmin, 16px)',
      width: '100%', maxWidth: 'min(480px, 90vw)',
      flex: 1, minHeight: 0,
    }}>
      {q.options.map(opt => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        let bg, bd;
        if (answered && isAns) { bg = 'linear-gradient(135deg,#F0FFF4,#DCFCE7)'; bd = '#16A34A'; }
        else if (answered && picked) { bg = 'linear-gradient(135deg,#FFF5F5,#FEE2E2)'; bd = '#EF4444'; }
        else if (picked) { bg = 'linear-gradient(135deg,#F0FDF4,#DCFCE7)'; bd = C?.accent || '#16A34A'; }
        else { bg = 'rgba(255,255,255,0.92)'; bd = '#E2E8F0'; }
        return (
          <div key={opt.id} onClick={() => handlePick(opt.id)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(opt.id); }}}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 'clamp(6px, 1.2vmin, 14px)',
              background: bg, border: `2.5px solid ${bd}`,
              borderRadius: 'clamp(12px, 1.8vmin, 22px)',
              boxShadow: answered && isAns
                ? '0 0 0 4px rgba(22,163,74,.2), 0 10px 28px rgba(34,197,94,.12)'
                : answered && picked
                  ? '0 0 0 4px rgba(239,68,68,.2)'
                  : '0 6px 20px rgba(15,23,42,.10)',
              cursor: answered ? 'default' : 'pointer',
              transition: 'all .18s ease', WebkitTapHighlightColor: 'transparent',
              userSelect: 'none', minHeight: 0,
            }}>
            <FractionSvg type={opt.shape} parts={opt.parts} shaded={opt.shaded} size="clamp(100px, 24vmin, 180px)" />
          </div>
        );
      })}
    </div>
  );
}

export function KenaliPecahanExplore({ data, language, theme, onExit }) {
  const buildRound = () => buildKenaliPecahanRound();
  return (
    <MatematikActivityFrame
      buildRound={buildRound}
      renderQuestion={(q, ctx) => {
        switch (q.type) {
          case 'kp-sama-besar': return <SamaBesarContent q={q} ctx={ctx} />;
          case 'kp-namakan-text':
          case 'kp-namakan-number':
            return <NamakanContent q={q} ctx={ctx} />;
          default: return <PilihGambarContent q={q} ctx={ctx} />;
        }
      }}
      theme={theme}
      onExit={onExit}
      scoreStorageKey={data?.scoreStorageKey || 'mt_ld_m3_scores'}
      scoreId={data?.scoreId}
    />
  );
}

const FRAC_STORY_NAMES = ['Dila', 'Johan', 'Mohan', 'Rita', 'Ali', 'Siti', 'Amin', 'Lisa', 'Geetha', 'Basir'];
const FRAC_STORY_ITEMS = ['epal', 'roti', 'pizza', 'kek', 'kek batik', 'donat', 'pie'];

const FRAC_VALUES = [
  { text: 'Setengah', value: '1/2', parts: 2, shaded: 1 },
  { text: 'Suku', value: '1/4', parts: 4, shaded: 1 },
  { text: 'Dua perempat', value: '2/4', parts: 4, shaded: 2 },
  { text: 'Tiga perempat', value: '3/4', parts: 4, shaded: 3 },
];

const FRAC_STORY_ADD = [
  { firstText: 'Suku', firstValue: '1/4', secondText: 'Suku', secondValue: '1/4', answerText: 'Dua perempat', answerValue: '2/4' },
  { firstText: 'Suku', firstValue: '1/4', secondText: 'Dua perempat', secondValue: '2/4', answerText: 'Tiga perempat', answerValue: '3/4' },
  { firstText: 'Dua perempat', firstValue: '2/4', secondText: 'Suku', secondValue: '1/4', answerText: 'Tiga perempat', answerValue: '3/4' },
];

const STORY_NUMBER_OPTIONS = ['1/2', '1/3', '1/4', '2/4', '3/4'];
const STORY_TEXT_OPTIONS = ['Setengah', 'Satu pertiga', 'Suku', 'Dua perempat', 'Tiga perempat'];

function pickFrac() {
  return pick(FRAC_VALUES);
}

function compareFracValue(a, b) {
  return (a.shaded * b.parts) - (b.shaded * a.parts);
}

function buildSelesaikanPecahanRound() {
  const qs = [];
  for (let i = 0; i < 4; i++) {
    qs.push(genSelCompare());
  }
  for (let i = 0; i < 6; i++) {
    qs.push(genSelStory());
  }
  return shuffle(qs);
}

function genSelCompare() {
  const which = pick(['kecil', 'besar']);
  const fracs = shuffle([...FRAC_VALUES]).slice(0, 4);
  const target = which === 'kecil'
    ? fracs.reduce((a, b) => (compareFracValue(a, b) <= 0 ? a : b))
    : fracs.reduce((a, b) => (compareFracValue(a, b) >= 0 ? a : b));
  const options = shuffle(fracs).map((v, i) => ({ id: `o${i}`, value: v.text }));
  return {
    type: 'sel-compare',
    header: 'Pembelajaran Selesaikan',
    prompt: which === 'kecil' ? 'Pilih pecahan paling kecil' : 'Pilih pecahan paling besar',
    options,
    answer: options.find(o => o.value === target.text).id,
  };
}

function genSelStory() {
  const name = pick(FRAC_STORY_NAMES);
  const item = pick(FRAC_STORY_ITEMS);
  const story = pick(FRAC_STORY_ADD);
  const useTextAnswer = Math.random() < 0.5;
  const answer = useTextAnswer ? story.answerText : story.answerValue;
  const optionPool = useTextAnswer ? STORY_TEXT_OPTIONS : STORY_NUMBER_OPTIONS;
  const choices = new Set([answer]);
  shuffle([...optionPool].filter(value => value !== answer)).forEach(value => {
    if (choices.size < 4) choices.add(value);
  });
  const options = shuffle([...choices]).map((value, i) => ({ id: `story-${i}`, value }));
  return {
    type: 'sel-story',
    header: 'Pembelajaran Selesaikan',
    prompt: `${name} ada ${story.firstText.toLowerCase()} ${item}. ${name} terima lagi ${story.secondText.toLowerCase()} ${item}. Apakah jumlah pecahan ${item} ${name} sekarang?`,
    options,
    answer: options.find(o => o.value === answer)?.id,
  };
}

function numToBM(n) {
  const ones = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'lapan', 'sembilan'];
  const teens = ['sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas', 'lapan belas', 'sembilan belas'];
  if (n < 10) return ones[n];
  if (n < 20) return teens[n - 10];
  return String(n);
}

export function SelesaikanPecahanExplore({ data, language, theme, onExit }) {
  const buildRound = () => buildSelesaikanPecahanRound();
  return (
    <MatematikActivityFrame
      buildRound={buildRound}
      renderQuestion={(q, ctx) => {
        switch (q.type) {
          case 'sel-compare': return <SelCompareContent q={q} ctx={ctx} />;
          case 'sel-story': return <SelStoryContent q={q} ctx={ctx} />;
          default: return <SelCompareContent q={q} ctx={ctx} />;
        }
      }}
      theme={theme}
      onExit={onExit}
      scoreStorageKey={data?.scoreStorageKey || 'mt_ld_m3_scores'}
      scoreId={data?.scoreId}
    />
  );
}

function SelCompareContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 'clamp(8px, 1.3vmin, 14px)',
      width: '100%', maxWidth: 'min(560px, 94vw)',
      flex: 1, minHeight: 0,
    }}>
      {q.options.map(opt => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        let bg, bd;
        if (answered && isAns) { bg = 'linear-gradient(135deg,#F0FFF4,#DCFCE7)'; bd = '#16A34A'; }
        else if (answered && picked) { bg = 'linear-gradient(135deg,#FFF5F5,#FEE2E2)'; bd = '#EF4444'; }
        else if (picked) { bg = 'linear-gradient(135deg,#F0FDF4,#DCFCE7)'; bd = C?.accent || '#16A34A'; }
        else { bg = 'rgba(255,255,255,0.92)'; bd = '#E2E8F0'; }
        return (
          <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 'clamp(5px, 1vmin, 10px)',
              padding: 'clamp(10px, 1.5vmin, 18px) clamp(8px, 1.2vmin, 14px)',
              background: bg, border: `2.5px solid ${bd}`,
              borderRadius: 'clamp(14px, 2vmin, 24px)',
              boxShadow: answered && isAns
                ? '0 0 0 4px rgba(22,163,74,.2), 0 12px 32px rgba(22,163,74,.16)'
                : answered && picked
                  ? '0 0 0 4px rgba(239,68,68,.2)'
                  : '0 6px 24px rgba(15,23,42,.10)',
              cursor: answered ? 'default' : 'pointer',
              transition: 'all .18s ease', WebkitTapHighlightColor: 'transparent',
              userSelect: 'none', minHeight: 0,
              aspectRatio: '1 / 1',
            }}>
            <FractionSvg type="circle" parts={FRAC_VALUES.find(f => f.text === opt.value)?.parts || 4} shaded={FRAC_VALUES.find(f => f.text === opt.value)?.shaded || 1} size="clamp(88px, 14vmin, 132px)" />
            <div style={{
              fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
              fontSize: 'clamp(15px, 2.1vmin, 22px)', color: '#1E293B',
              lineHeight: 1.08,
              textAlign: 'center',
            }}>
              {opt.value}
            </div>
            {answered && (
              <div style={{
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
                fontSize: 'clamp(16px, 2.2vmin, 24px)',
                color: isAns ? '#16A34A' : (picked ? '#EF4444' : 'transparent'),
              }}>
                {isAns ? '✓' : (picked ? '✗' : '')}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function SelKeypadContent({ q, ctx }) {
  const { answered, answer, handleKeypad, displayValue, theme: C } = ctx;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%',
      flex: 1, minHeight: 0, justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
        fontSize: 'clamp(22px, 3.5vmin, 36px)', color: '#1E293B',
        textAlign: 'center', lineHeight: 1.3,
      }}>
        {q.prompt}
      </div>
      <div style={{
        display: 'flex', gap: 'clamp(8px, 1.2vmin, 16px)',
        fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
        fontSize: 'clamp(28px, 5vmin, 48px)', color: '#1E293B',
      }}>
        <span style={{
          minWidth: 'clamp(60px, 10vmin, 100px)',
          background: answered ? (displayValue === answer ? 'linear-gradient(135deg,#22C55E,#16A34A)' : 'linear-gradient(135deg,#EF4444,#DC2626)') : 'rgba(255,255,255,0.92)',
          border: `3px solid ${answered ? (displayValue === answer ? '#16A34A' : '#EF4444') : C?.accent || '#16A34A'}`,
          borderRadius: 'clamp(12px, 2vmin, 20px)',
          padding: 'clamp(8px, 1.4vmin, 16px)',
          color: answered ? '#fff' : '#1E293B',
        }}>
          {displayValue || '?'}
        </span>
      </div>
    </div>
  );
}

function SelNamakanContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 'clamp(10px, 1.6vmin, 18px)', width: '100%',
      flex: 1, minHeight: 0, justifyContent: 'center',
    }}>
      <FractionSvg type={q.shape} parts={q.parts} shaded={q.shaded} size="clamp(140px, 35vmin, 320px)" />
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'clamp(8px, 1.2vmin, 14px)',
        width: '100%', maxWidth: 'min(440px, 90vw)',
      }}>
        {q.options.map(opt => {
          const picked = selected === opt.id;
          const isAns = opt.id === answer;
          let bg, bd, clr, txt;
          if (answered && isAns) { bg = 'linear-gradient(135deg,#22C55E,#16A34A)'; bd = '#16A34A'; clr = '#fff'; txt = `${opt.value} ✓`; }
          else if (answered && picked) { bg = 'linear-gradient(135deg,#EF4444,#DC2626)'; bd = '#DC2626'; clr = '#fff'; txt = `${opt.value} ✗`; }
          else if (picked) { bg = `${C?.accent || '#16A34A'}18`; bd = C?.accent || '#16A34A'; clr = C?.dark || '#15803D'; txt = opt.value; }
          else { bg = 'rgba(255,255,255,0.92)'; bd = '#E2E8F0'; clr = '#1E293B'; txt = opt.value; }
          return (
            <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 'clamp(10px, 1.6vmin, 18px) clamp(10px, 1.4vmin, 16px)',
                borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                border: `2px solid ${bd}`,
                background: bg, color: clr,
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: answered && (isAns || picked) ? 'clamp(18px, 3vmin, 30px)' : 'clamp(14px, 2.2vmin, 22px)',
                lineHeight: 1.2, whiteSpace: 'nowrap', textAlign: 'center',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all .16s ease', WebkitTapHighlightColor: 'transparent',
                minHeight: 'clamp(44px, 7vmin, 70px)', width: '100%',
                boxShadow: answered && isAns
                  ? '0 0 0 3px rgba(34,197,94,.25), 0 8px 24px rgba(22,163,74,.2)'
                  : '0 4px 14px rgba(15,23,42,.09)',
              }}>
              {txt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SelStoryContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%',
      flex: 1, minHeight: 0, justifyContent: 'center',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'clamp(10px, 1.6vmin, 16px)',
        width: '100%', maxWidth: 'min(460px, 92vw)',
      }}>
        {q.options.map(opt => {
          const picked = selected === opt.id;
          const isAns = opt.id === answer;
          let bg, bd, clr, txt;
          if (answered && isAns) { bg = 'linear-gradient(135deg,#22C55E,#16A34A)'; bd = '#16A34A'; clr = '#fff'; txt = `${opt.value} (Betul)`; }
          else if (answered && picked) { bg = 'linear-gradient(135deg,#EF4444,#DC2626)'; bd = '#DC2626'; clr = '#fff'; txt = `${opt.value} (Salah)`; }
          else if (picked) { bg = `${C?.accent || '#16A34A'}18`; bd = C?.accent || '#16A34A'; clr = C?.dark || '#15803D'; txt = opt.value; }
          else { bg = 'rgba(255,255,255,0.92)'; bd = '#E2E8F0'; clr = '#1E293B'; txt = opt.value; }
          return (
            <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 'clamp(12px, 1.8vmin, 18px)',
                borderRadius: 'clamp(12px, 1.8vmin, 18px)',
                border: `2px solid ${bd}`,
                background: bg, color: clr,
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: answered && (isAns || picked) ? 'clamp(22px, 3.6vmin, 34px)' : 'clamp(20px, 3.2vmin, 30px)',
                lineHeight: 1.1, textAlign: 'center',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all .16s ease', WebkitTapHighlightColor: 'transparent',
                minHeight: 'clamp(60px, 9vmin, 86px)', width: '100%',
                boxShadow: answered && isAns
                  ? '0 0 0 3px rgba(34,197,94,.25), 0 8px 24px rgba(22,163,74,.2)'
                  : '0 4px 14px rgba(15,23,42,.09)',
              }}>
              {txt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function buildLatihDiriPecahanRound() {
  const total = 12;
  const seen = new Set();
  const selected = [];

  for (let attempts = 0; attempts < 8 && selected.length < total; attempts += 1) {
    const candidates = shuffle([
      ...buildKenaliPecahanRound(),
      ...buildJawabPecahanRound(),
    ]);

    for (const question of candidates) {
      const sig = getLatihDiriPecahanSignature(question);
      if (seen.has(sig)) continue;
      seen.add(sig);
      selected.push(question);
      if (selected.length >= total) break;
    }
  }

  return shuffle(selected).slice(0, total);
}

function getLatihDiriPecahanSignature(question) {
  switch (question.type) {
    case 'kp-sama-besar':
      return `${question.type}:${question.shape}:${question.equalFirst}`;
    case 'kp-pilih-gambar':
    case 'kp-pilih-gambar-number':
      return `${question.type}:${question.prompt}:${question.options.map(opt => `${opt.parts}/${opt.shaded}`).join('|')}`;
    case 'kp-namakan-text':
    case 'kp-namakan-number':
      return `${question.type}:${question.shape}:${question.parts}:${question.shaded}:${question.options.map(opt => opt.value).join('|')}`;
    case 'jp-label-text':
    case 'jp-label-number':
      return `${question.type}:${question.parts}:${question.shaded}:${question.options.map(opt => opt.value).join('|')}`;
    case 'jp-shade-text':
    case 'jp-shade-number':
      return `${question.type}:${question.parts}:${question.target}:${question.prompt}`;
    default:
      return `${question.type}:${question.prompt}`;
  }
}

const JAWAB_FRACTION_SET = [
  { text: 'Suku', value: '1/4', parts: 4, shaded: 1 },
  { text: 'Setengah', value: '1/2', parts: 2, shaded: 1 },
  { text: 'Dua per empat', value: '2/4', parts: 4, shaded: 2 },
  { text: 'Tiga per empat', value: '3/4', parts: 4, shaded: 3 },
];

const JAWAB_TEXT_OPTIONS = JAWAB_FRACTION_SET.map((item) => item.text);
const JAWAB_NUMBER_OPTIONS = JAWAB_FRACTION_SET.map((item) => item.value);

function buildJawabPecahanRound() {
  const labelFractions = shuffle([...JAWAB_FRACTION_SET]);
  const shadeTextFractions = shuffle([...JAWAB_FRACTION_SET]).slice(0, 3);
  const shadeNumberFractions = shuffle([...JAWAB_FRACTION_SET]).slice(0, 3);

  const labelTextRounds = labelFractions.slice(0, 2).map((fraction, index) => (
    makeJawabLabelQuestion(`jp-label-text-${index}`, 'jp-label-text', fraction, JAWAB_TEXT_OPTIONS, fraction.text)
  ));

  const labelNumberRounds = labelFractions.slice(2, 4).map((fraction, index) => (
    makeJawabLabelQuestion(`jp-label-number-${index}`, 'jp-label-number', fraction, JAWAB_NUMBER_OPTIONS, fraction.value)
  ));

  const shadeTextRounds = shadeTextFractions.map((fraction, index) => (
    makeJawabShadeQuestion(`jp-shade-text-${index}`, 'jp-shade-text', fraction, `Lorekkan gambar di bawah menjadi ${fraction.text.toLowerCase()}.`)
  ));

  const shadeNumberRounds = shadeNumberFractions.map((fraction, index) => (
    makeJawabShadeQuestion(`jp-shade-number-${index}`, 'jp-shade-number', fraction, `Lorekkan gambar di bawah menjadi ${fraction.value}.`)
  ));

  return shuffle([
    ...labelTextRounds,
    ...labelNumberRounds,
    ...shadeTextRounds,
    ...shadeNumberRounds,
  ]);
}

function makeJawabLabelQuestion(id, type, fraction, optionPool, correctValue) {
  const options = shuffle([...optionPool]).map((value, index) => ({
    id: `${id}-opt-${index}`,
    value,
  }));

  return {
    id,
    type,
    prompt: `Bulatan yang dibahagi ${fraction.parts} dan berlorek ${fraction.shaded} bahagian.`,
    parts: fraction.parts,
    shaded: fraction.shaded,
    options,
    answer: options.find((option) => option.value === correctValue)?.id,
  };
}

function makeJawabShadeQuestion(id, type, fraction, prompt) {
  return {
    id,
    type,
    prompt,
    parts: fraction.parts,
    target: fraction.shaded,
    answer: 'correct',
  };
}

function genLdNamakan() {
  const frac = pickFrac();
  const shape = pick(['circle', 'square']);
  const opts = [frac.text];
  const pool = FRAC_VALUES.filter(f => f.text !== frac.text);
  shuffle(pool);
  for (const f of pool) { if (opts.length >= 4) break; opts.push(f.text); }
  const options = shuffle(opts).map((v, i) => ({ id: `opt-${i}`, value: v }));
  return {
    type: 'ld-namakan',
    prompt: 'Apakah pecahan kawasan berlorek?',
    shape,
    parts: frac.parts,
    shaded: frac.shaded,
    options,
    answer: options.find(o => o.value === frac.text).id,
  };
}

function genLdPilihGambar() {
  const frac = pickFrac();
  const shape = pick(['circle', 'square']);
  const others = FRAC_VALUES.filter(f => f.value !== frac.value);
  const pool = shuffle(others).slice(0, 3);
  const all = shuffle([frac, ...pool]);
  const options = all.map((item, i) => ({
    id: `opt-${i}`,
    shape,
    parts: item.parts,
    shaded: item.shaded,
    value: item.value,
  }));
  return {
    type: 'ld-pilih-gambar',
    prompt: `Yang manakah ${frac.text.toLowerCase()}?`,
    options,
    answer: options.find(o => o.value === frac.value).id,
  };
}

function genLdSamaBesar() {
  const shape = pick(['circle', 'square']);
  const equalFirst = Math.random() < 0.5;
  return {
    type: 'ld-sama-besar',
    prompt: 'Yang manakah dipotong sama besar?',
    shape,
    equalFirst,
    answer: equalFirst ? 'sb-0' : 'sb-1',
  };
}

export function LatihDiriPecahanExplore({ data, language, theme, onExit }) {
  const buildRound = () => buildLatihDiriPecahanRound();
  return (
    <MatematikActivityFrame
      buildRound={buildRound}
      renderQuestion={(q, ctx) => {
        if (q.type === 'kp-sama-besar') return <SamaBesarContent q={q} ctx={ctx} />;
        if (q.type === 'kp-namakan-text' || q.type === 'kp-namakan-number') return <NamakanContent q={q} ctx={ctx} />;
        if (q.type === 'kp-pilih-gambar' || q.type === 'kp-pilih-gambar-number') return <PilihGambarContent q={q} ctx={ctx} />;
        if (q.type === 'jp-label-text' || q.type === 'jp-label-number') return <JawabLabelFractionQuestion q={q} ctx={ctx} />;
        if (q.type === 'jp-shade-text' || q.type === 'jp-shade-number') return <JawabShadeFractionQuestion q={q} ctx={ctx} />;
        if (q.type === 'ld-pilih-gambar') return <LdPilihGambarContent q={q} ctx={ctx} />;
        if (q.type === 'ld-sama-besar') return <LdSamaBesarContent q={q} ctx={ctx} />;
        return <LdNamakanContent q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
      scoreStorageKey={data?.scoreStorageKey || 'mt_ld_m3_scores'}
      scoreId={data?.scoreId}
      showQuestionProgress
    />
  );
}

function JawabShadeFractionQuestion({ q, ctx }) {
  const { answered, isCorrect, handlePick, handleTouch, theme: C, autoSubmit } = ctx;
  const [pickedParts, setPickedParts] = React.useState([]);
  const selectedCount = pickedParts.length;
  const canSubmit = selectedCount === q.target;
  const resultTone = answered ? 'correct' : null;
  const displayPickedParts = answered && !isCorrect
    ? Array.from({ length: q.target }, (_, index) => index)
    : pickedParts;

  React.useEffect(() => {
    setPickedParts([]);
  }, [q.examId, q.id, q.prompt, q.parts, q.target]);

  function togglePart(index) {
    if (answered) return;
    if (handleTouch) handleTouch();
    setPickedParts((current) => {
      const next = current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index].sort((a, b) => a - b);
      if (autoSubmit && next.length === q.target) handlePick('correct');
      return next;
    });
  }

  function handleSubmit() {
    if (answered) return;
    handlePick(canSubmit ? 'correct' : 'wrong');
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flex: 1,
      minHeight: 0,
      gap: 'clamp(10px, 1.8vmin, 18px)',
    }}>
      <SelectableFractionSvg
        parts={q.parts}
        pickedParts={displayPickedParts}
        onToggle={togglePart}
        disabled={answered}
        resultTone={resultTone}
      />

      <div style={{
        fontFamily: "'Baloo 2', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(18px, 2.6vmin, 24px)',
        color: '#1E293B',
        textAlign: 'center',
      }}>
        {selectedCount}/{q.parts} bahagian dipilih
      </div>

      {!answered && !autoSubmit && (
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            minHeight: 'clamp(44px, 7vmin, 56px)',
            padding: 'clamp(10px, 1.5vmin, 14px) clamp(22px, 3vmin, 30px)',
            borderRadius: '999px',
            border: 'none',
            background: `linear-gradient(180deg, ${C?.accent || '#16A34A'}, ${C?.dark || '#15803D'})`,
            color: '#fff',
            fontFamily: "'Baloo 2', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(18px, 2.4vmin, 22px)',
            cursor: 'pointer',
            boxShadow: `0 4px 0 ${C?.dark || '#15803D'}`,
          }}
        >
          Semak Jawapan
        </button>
      )}
    </div>
  );
}

function JawabLabelFractionQuestion({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flex: 1,
      minHeight: 0,
      gap: 'clamp(10px, 1.8vmin, 18px)',
    }}>
      <StaticFractionSvg parts={q.parts} shaded={q.shaded} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 'clamp(8px, 1.2vmin, 12px)',
        width: '100%',
        maxWidth: 'min(460px, 90vw)',
      }}>
        {q.options.map((opt) => {
          const picked = selected === opt.id;
          const isAns = opt.id === answer;
          let bg = 'rgba(255,255,255,0.92)';
          let bd = '#E2E8F0';
          let clr = '#1E293B';

          if (answered && isAns) {
            bg = 'linear-gradient(135deg,#22C55E,#16A34A)';
            bd = '#16A34A';
            clr = '#fff';
          } else if (answered && picked) {
            bg = 'linear-gradient(135deg,#EF4444,#DC2626)';
            bd = '#DC2626';
            clr = '#fff';
          } else if (picked) {
            bg = `${C?.accent || '#16A34A'}18`;
            bd = C?.accent || '#16A34A';
            clr = C?.dark || '#15803D';
          }

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handlePick(opt.id)}
              disabled={answered}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'clamp(48px, 7vmin, 64px)',
                padding: 'clamp(10px, 1.5vmin, 16px)',
                borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                border: `2px solid ${bd}`,
                background: bg,
                color: clr,
                fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(18px, 2.6vmin, 24px)',
                lineHeight: 1.1,
                textAlign: 'center',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all .16s ease',
                WebkitTapHighlightColor: 'transparent',
                boxShadow: answered && isAns
                  ? '0 0 0 3px rgba(34,197,94,.25), 0 8px 24px rgba(22,163,74,.2)'
                  : '0 4px 14px rgba(15,23,42,.09)',
              }}
            >
              {opt.value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StaticFractionSvg({ parts, shaded }) {
  const size = 'clamp(132px, 24vmin, 190px)';
  const stroke = '#334155';
  const halfPaths = ['M 60 60 L 60 10 A 50 50 0 0 0 60 110 Z', 'M 60 60 L 60 10 A 50 50 0 0 1 60 110 Z'];
  const quarterPaths = [
    'M 60 60 L 60 10 A 50 50 0 0 0 10 60 Z',
    'M 60 60 L 60 10 A 50 50 0 0 1 110 60 Z',
    'M 60 60 L 60 110 A 50 50 0 0 1 10 60 Z',
    'M 60 60 L 60 110 A 50 50 0 0 0 110 60 Z',
  ];
  const paths = parts === 2 ? halfPaths : quarterPaths;

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ display: 'block' }}>
      {paths.map((path, index) => (
        <path
          key={index}
          d={path}
          fill={index < shaded ? '#16A34A' : '#FFFFFF'}
          opacity={index < shaded ? '0.42' : '1'}
          stroke={stroke}
          strokeWidth="2"
        />
      ))}
      <circle cx="60" cy="60" r="50" fill="none" stroke={stroke} strokeWidth="3.2" />
      <line x1="60" y1="10" x2="60" y2="110" stroke={stroke} strokeWidth="3" />
      {parts === 4 ? <line x1="10" y1="60" x2="110" y2="60" stroke={stroke} strokeWidth="3" /> : null}
    </svg>
  );
}

function SelectableFractionSvg({ parts, pickedParts, onToggle, disabled, resultTone }) {
  const size = 'clamp(132px, 24vmin, 190px)';
  const stroke = '#334155';
  const halfPaths = ['M 60 60 L 60 10 A 50 50 0 0 0 60 110 Z', 'M 60 60 L 60 10 A 50 50 0 0 1 60 110 Z'];
  const quarterPaths = [
    'M 60 60 L 60 10 A 50 50 0 0 0 10 60 Z',
    'M 60 60 L 60 10 A 50 50 0 0 1 110 60 Z',
    'M 60 60 L 60 110 A 50 50 0 0 1 10 60 Z',
    'M 60 60 L 60 110 A 50 50 0 0 0 110 60 Z',
  ];
  const paths = parts === 2 ? halfPaths : quarterPaths;

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ display: 'block' }}>
      {paths.map((path, index) => {
        const active = pickedParts.includes(index);
        const fill = active
          ? resultTone === 'correct'
            ? '#22C55E'
            : resultTone === 'wrong'
              ? '#EF4444'
              : '#16A34A'
          : '#FFFFFF';
        const opacity = active ? (resultTone ? '0.56' : '0.42') : '1';
        return (
          <path
            key={index}
            d={path}
            fill={fill}
            opacity={opacity}
            stroke={stroke}
            strokeWidth="2"
            onClick={() => onToggle(index)}
            style={{ cursor: disabled ? 'default' : 'pointer', transition: 'fill .16s ease, opacity .16s ease' }}
          />
        );
      })}
      <circle cx="60" cy="60" r="50" fill="none" stroke={stroke} strokeWidth="3.2" />
      <line x1="60" y1="10" x2="60" y2="110" stroke={stroke} strokeWidth="3" />
      {parts === 4 ? <line x1="10" y1="60" x2="110" y2="60" stroke={stroke} strokeWidth="3" /> : null}
    </svg>
  );
}

function LdNamakanContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 'clamp(10px, 1.6vmin, 18px)', width: '100%',
      flex: 1, minHeight: 0, justifyContent: 'center',
    }}>
      <FractionSvg type={q.shape} parts={q.parts} shaded={q.shaded} size="clamp(140px, 35vmin, 320px)" />
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'clamp(8px, 1.2vmin, 14px)',
        width: '100%', maxWidth: 'min(440px, 90vw)',
      }}>
        {q.options.map(opt => {
          const picked = selected === opt.id;
          const isAns = opt.id === answer;
          let bg, bd, clr, txt;
          if (answered && isAns) { bg = 'linear-gradient(135deg,#22C55E,#16A34A)'; bd = '#16A34A'; clr = '#fff'; txt = `${opt.value} ✓`; }
          else if (answered && picked) { bg = 'linear-gradient(135deg,#EF4444,#DC2626)'; bd = '#DC2626'; clr = '#fff'; txt = `${opt.value} ✗`; }
          else if (picked) { bg = `${C?.accent || '#16A34A'}18`; bd = C?.accent || '#16A34A'; clr = C?.dark || '#15803D'; txt = opt.value; }
          else { bg = 'rgba(255,255,255,0.92)'; bd = '#E2E8F0'; clr = '#1E293B'; txt = opt.value; }
          return (
            <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 'clamp(10px, 1.6vmin, 18px) clamp(10px, 1.4vmin, 16px)',
                borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                border: `2px solid ${bd}`,
                background: bg, color: clr,
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: answered && (isAns || picked) ? 'clamp(18px, 3vmin, 30px)' : 'clamp(14px, 2.2vmin, 22px)',
                lineHeight: 1.2, whiteSpace: 'nowrap', textAlign: 'center',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all .16s ease', WebkitTapHighlightColor: 'transparent',
                minHeight: 'clamp(44px, 7vmin, 70px)', width: '100%',
                boxShadow: answered && isAns
                  ? '0 0 0 3px rgba(34,197,94,.25), 0 8px 24px rgba(22,163,74,.2)'
                  : '0 4px 14px rgba(15,23,42,.09)',
              }}>
              {txt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LdPilihGambarContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 'clamp(8px, 1.4vmin, 16px)',
      width: '100%', maxWidth: 'min(480px, 90vw)',
      flex: 1, minHeight: 0,
    }}>
      {q.options.map(opt => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        let bg, bd;
        if (answered && isAns) { bg = 'linear-gradient(135deg,#F0FFF4,#DCFCE7)'; bd = '#16A34A'; }
        else if (answered && picked) { bg = 'linear-gradient(135deg,#FFF5F5,#FEE2E2)'; bd = '#EF4444'; }
        else if (picked) { bg = 'linear-gradient(135deg,#F0FDF4,#DCFCE7)'; bd = C?.accent || '#16A34A'; }
        else { bg = 'rgba(255,255,255,0.92)'; bd = '#E2E8F0'; }
        return (
          <div key={opt.id} onClick={() => handlePick(opt.id)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(opt.id); }}}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 'clamp(6px, 1.2vmin, 14px)',
              background: bg, border: `2.5px solid ${bd}`,
              borderRadius: 'clamp(12px, 1.8vmin, 22px)',
              boxShadow: answered && isAns
                ? '0 0 0 4px rgba(22,163,74,.2), 0 10px 28px rgba(34,197,94,.12)'
                : answered && picked
                  ? '0 0 0 4px rgba(239,68,68,.2)'
                  : '0 6px 20px rgba(15,23,42,.10)',
              cursor: answered ? 'default' : 'pointer',
              transition: 'all .18s ease', WebkitTapHighlightColor: 'transparent',
              userSelect: 'none', minHeight: 0,
            }}>
            <FractionSvg type={opt.shape} parts={opt.parts} shaded={opt.shaded} size="clamp(100px, 24vmin, 180px)" />
          </div>
        );
      })}
    </div>
  );
}

function LdSamaBesarContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  const options = [
    { id: 'sb-0', label: 'Kiri', isEqual: q.equalFirst },
    { id: 'sb-1', label: 'Kanan', isEqual: !q.equalFirst },
  ];
  return (
    <div style={{
      display: 'flex', gap: 'clamp(10px, 2vmin, 24px)',
      width: '100%', flex: 1, minHeight: 0,
      padding: '0 clamp(8px, 2vmin, 24px)',
    }}>
      {options.map(opt => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        let bg, bd;
        if (answered && isAns) { bg = 'linear-gradient(135deg,#F0FFF4,#DCFCE7)'; bd = '#16A34A'; }
        else if (answered && picked) { bg = 'linear-gradient(135deg,#FFF5F5,#FEE2E2)'; bd = '#EF4444'; }
        else if (picked) { bg = 'linear-gradient(135deg,#F0FDF4,#DCFCE7)'; bd = C?.accent || '#16A34A'; }
        else { bg = 'rgba(255,255,255,0.92)'; bd = '#E2E8F0'; }
        return (
          <div key={opt.id} onClick={() => handlePick(opt.id)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(opt.id); }}}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 'clamp(6px, 1vmin, 12px)',
              padding: 'clamp(12px, 2vmin, 24px) clamp(8px, 1.4vmin, 16px)',
              background: bg, border: `2.5px solid ${bd}`,
              borderRadius: 'clamp(16px, 2.4vmin, 28px)',
              boxShadow: answered && isAns
                ? '0 0 0 4px rgba(22,163,74,.2), 0 12px 32px rgba(22,163,74,.16)'
                : answered && picked
                  ? '0 0 0 4px rgba(239,68,68,.2)'
                  : '0 6px 24px rgba(15,23,42,.10)',
              cursor: answered ? 'default' : 'pointer',
              transition: 'all .18s ease', WebkitTapHighlightColor: 'transparent',
              userSelect: 'none', minHeight: 0,
            }}>
            {opt.isEqual ? <EqualSvg type={q.shape} size="clamp(130px, 28vmin, 260px)" /> : <UnequalSvg type={q.shape} size="clamp(130px, 28vmin, 260px)" />}
            <div style={{
              fontFamily: "'Fredoka',sans-serif", fontWeight: 700,
              fontSize: 'clamp(12px, 1.8vmin, 16px)', color: '#64748B',
            }}>
              {opt.label}
            </div>
            {answered && (
              <div style={{
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
                fontSize: 'clamp(18px, 2.8vmin, 28px)',
                color: isAns ? '#16A34A' : (picked ? '#EF4444' : 'transparent'),
              }}>
                {isAns ? '✓' : (picked ? '✗' : '')}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const UJIAN_PECAHAN_TOTAL_QUESTIONS = 30;
const UJIAN_PECAHAN_DURATION_SECONDS = 30 * 60;
const UJIAN_PECAHAN_PASS_MARK = Math.ceil(UJIAN_PECAHAN_TOTAL_QUESTIONS * 0.8);
const UJIAN_PECAHAN_SECTIONS = [
  { id: 'kenali', name: 'Kenali Pecahan', color: '#16A34A' },
  { id: 'jawab', name: 'Jawab Pecahan', color: '#16A34A' },
];

function getUjianPecahanSignature(question) {
  const base = getLatihDiriPecahanSignature(question);
  return question.type.startsWith('kp-') || question.type.startsWith('ld-')
    ? `kenali:${base}`
    : `jawab:${base}`;
}

function renderUjianPecahanQuestion(q, ctx) {
  if (q.type === 'kp-sama-besar') return <SamaBesarContent q={q} ctx={ctx} />;
  if (q.type === 'kp-namakan-text' || q.type === 'kp-namakan-number') return <NamakanContent q={q} ctx={ctx} />;
  if (q.type === 'kp-pilih-gambar' || q.type === 'kp-pilih-gambar-number') return <PilihGambarContent q={q} ctx={ctx} />;
  if (q.type === 'jp-label-text' || q.type === 'jp-label-number') return <JawabLabelFractionQuestion q={q} ctx={ctx} />;
  if (q.type === 'jp-shade-text' || q.type === 'jp-shade-number') return <JawabShadeFractionQuestion q={q} ctx={{ ...ctx, autoSubmit: true }} />;
  return <SelCompareContent q={q} ctx={ctx} />;
}

function ujianPecahanAnswerText(q, value) {
  if (value === 'correct') return 'Betul';
  if (value === 'wrong') return 'Salah';
  const option = q?.options?.find((opt) => opt.id === value || String(opt.value) === String(value));
  if (option?.value != null) return String(option.value);
  if (option?.label != null) return String(option.label);
  return String(value ?? '');
}

function buildUjianPecahanRound() {
  const selected = [];
  const seen = new Set();

  for (let attempts = 0; attempts < 24 && selected.length < UJIAN_PECAHAN_TOTAL_QUESTIONS; attempts += 1) {
    const candidates = shuffle([
      ...buildKenaliPecahanRound().map((question) => ({ ...question, topicId: 'kenali' })),
      ...buildJawabPecahanRound().map((question) => ({ ...question, topicId: 'jawab' })),
    ]);

    for (const question of candidates) {
      const sig = getUjianPecahanSignature(question);
      if (seen.has(sig)) continue;
      seen.add(sig);
      selected.push(question);
      if (selected.length >= UJIAN_PECAHAN_TOTAL_QUESTIONS) break;
    }
  }

  return shuffle(selected)
    .slice(0, UJIAN_PECAHAN_TOTAL_QUESTIONS)
    .map((question, index) => ({ ...question, examId: `ujian-pecahan-${index}` }));
}

export function CabarMindaPecahanExplore({ data, language, theme, onExit }) {
  const C = theme || {};
  const accent = C.accent || '#16A34A';
  const dark = C.dark || '#15803D';
  const cd = C.cd || '#15803D';
  const scoreStorageKey = data?.scoreStorageKey || 'mt_ld_m3_scores';
  const scoreId = data?.scoreId;

  const [phase, setPhase] = useState('start');
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(null);
  const [selectedPerQ, setSelectedPerQ] = useState(null);
  const [touchedPerQ, setTouchedPerQ] = useState(null);
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [reviewMode, setReviewMode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(UJIAN_PECAHAN_DURATION_SECONDS);
  const [timeUsed, setTimeUsed] = useState(0);
  const timerRef = useRef(null);
  const recordedRef = useRef(false);
  const answersRef = useRef(null);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  function finishExam(finalAnswers, finalTimeUsed) {
    if (!recordedRef.current) {
      recordActivityScore(scoreStorageKey, scoreId, finalAnswers.filter(Boolean).length, finalAnswers.length);
      recordedRef.current = true;
    }
    setTimeUsed(finalTimeUsed);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPhase('results');
  }

  function startExam() {
    const qs = buildUjianPecahanRound();
    const blankAnswers = new Array(qs.length).fill(null);
    setQuestions(qs);
    setAnswers(blankAnswers);
    answersRef.current = blankAnswers;
    setSelectedPerQ({});
    setTouchedPerQ({});
    setShowQuestionList(false);
    setReviewMode(null);
    setCurrent(0);
    setTimeLeft(UJIAN_PECAHAN_DURATION_SECONDS);
    setTimeUsed(0);
    recordedRef.current = false;
    setPhase('exam');
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          finishExam(answersRef.current || new Array(qs.length).fill(null), UJIAN_PECAHAN_DURATION_SECONDS);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  function handleExamPick(value) {
    if (!questions) return;
    const correct = value === questions[current].answer;
    const nextAnswers = [...answers];
    nextAnswers[current] = correct;
    setAnswers(nextAnswers);
    answersRef.current = nextAnswers;
    setSelectedPerQ({ ...selectedPerQ, [current]: value });
  }

  function handleExamTouch() {
    setTouchedPerQ((currentTouched) => {
      if (!currentTouched || currentTouched[current]) return currentTouched || {};
      return { ...currentTouched, [current]: true };
    });
  }

  function handleExamNext() {
    if (!questions) return;
    if (answers[current] === null) return;
    if (current + 1 >= questions.length) {
      if (!answers.every((value) => value !== null)) {
        setShowQuestionList(true);
        return;
      }
      finishExam(answersRef.current || answers, UJIAN_PECAHAN_DURATION_SECONDS - timeLeft);
      return;
    }
    setCurrent((value) => value + 1);
  }

  if (phase === 'start') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 4vmin, 48px) clamp(16px, 3vmin, 32px)', gap: 'clamp(16px, 2.6vmin, 32px)' }}>
          <div style={{ fontSize: 'clamp(48px, 10vmin, 80px)', lineHeight: 1 }}>📝</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vmin, 44px)', color: '#1E293B', lineHeight: 1.2 }}>
              {language === 'bm' ? 'Ujian Pecahan' : 'Fractions Exam'}
            </div>
            <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(14px, 2vmin, 18px)', color: '#64748B', marginTop: 4 }}>
              {language === 'bm' ? 'Modul 3 — Pecahan' : 'Module 3 — Fractions'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'clamp(8px, 1.6vmin, 16px)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: language === 'bm' ? 'Soalan: 30' : 'Questions: 30', color: accent },
              { label: language === 'bm' ? '30 Minit' : '30 Minutes', color: '#16A34A' },
              { label: language === 'bm' ? `Lulus 80% (${UJIAN_PECAHAN_PASS_MARK}/30)` : `Pass 80% (${UJIAN_PECAHAN_PASS_MARK}/30)`, color: '#16A34A' },
            ].map((chip) => (
              <div key={chip.label} style={{
                padding: '6px 16px', borderRadius: 999,
                background: 'rgba(255,255,255,.88)',
                border: `1.5px solid ${chip.color}44`, color: chip.color,
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(13px, 1.8vmin, 17px)',
              }}>{chip.label}</div>
            ))}
          </div>
          <div style={{
            background: 'rgba(255,255,255,.90)',
            border: '1.5px solid #BBF7D0',
            boxShadow: '0 12px 28px rgba(91,33,182,.10)',
            borderRadius: 'clamp(14px, 2vmin, 20px)', padding: 'clamp(14px, 2.4vmin, 24px)',
            maxWidth: 420, width: '100%',
          }}>
            <div style={{
              fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 'clamp(13px, 1.6vmin, 16px)', color: '#475569',
              display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.2vmin, 12px)',
            }}>
              <div>{language === 'bm' ? '📌 Jawab semua 30 soalan dalam 30 minit.' : '📌 Answer all 30 questions in 30 minutes.'}</div>
              <div>{language === 'bm' ? '🎲 Soalan diambil daripada Kenali Pecahan dan Jawab Pecahan.' : '🎲 Questions come from Know Fractions and Answer Fractions.'}</div>
              <div>{language === 'bm' ? '♻️ Tiada soalan yang sama diulang dalam satu ujian.' : '♻️ No repeated questions within one exam.'}</div>
              <div>{language === 'bm' ? `🎯 Skor ${UJIAN_PECAHAN_PASS_MARK}/30 atau lebih untuk lulus.` : `🎯 Score ${UJIAN_PECAHAN_PASS_MARK}/30 or more to pass.`}</div>
            </div>
          </div>
          <button type="button" onClick={startExam}
            style={{
              padding: 'clamp(14px, 2vmin, 20px) clamp(32px, 5vmin, 64px)', border: 'none', borderRadius: 999,
              background: `linear-gradient(180deg, ${accent}, ${cd})`, color: '#fff', cursor: 'pointer', width: '100%', maxWidth: 360,
              fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 2.8vmin, 26px)',
              boxShadow: `0 4px 0 ${dark}, 0 14px 24px rgba(91,33,182,.24)`, WebkitTapHighlightColor: 'transparent',
            }}>
            {language === 'bm' ? 'Mula Ujian →' : 'Start Exam →'}
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'exam' && questions) {
    const q = questions[current];
    const answered = answers[current] !== null;
    const answeredCount = answers.filter((value) => value !== null).length;
    const mm = Math.floor(timeLeft / 60);
    const ss = timeLeft % 60;
    const timerStr = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    const timerRed = timeLeft <= 300;
    const allAnswered = answeredCount === questions.length;
    const isLastQuestion = current + 1 >= questions.length;
    const nextLabel = isLastQuestion && allAnswered
      ? (language === 'bm' ? 'Tamat' : 'Finish')
      : (language === 'bm' ? 'Seterusnya ->' : 'Next ->');
    const examCtx = {
      answered: false,
      selected: selectedPerQ[current] || null,
      answer: q.answer,
      isCorrect: false,
      examMode: true,
      handlePick: handleExamPick,
      handleNext: handleExamNext,
      handleTouch: handleExamTouch,
      streak: 0,
      correct: 0,
      wrong: 0,
      theme: { accent, dark, cd, green: '#16A34A', red: '#DC2626' },
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <style>{`
          .ujian-scroll { flex: 1; min-height: 0; overflow: hidden; display: flex; flex-direction: column; }
          .ujian-body {
            min-height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            padding: clamp(6px, 1.1vmin, 12px) clamp(10px, 1.6vmin, 20px);
          }
          .ujian-content {
            width: 100%; max-width: min(94vw, 860px);
            display: flex; flex-direction: column; align-items: center;
            gap: clamp(4px, .9vmin, 9px);
          }
          .ujian-prompt {
            font-family: 'Baloo 2', sans-serif; font-weight: 800;
            font-size: clamp(18px, 3.4vmin, 32px); color: #1E293B; text-align: center; line-height: 1.08;
          }
          .ujian-feedback {
            font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: clamp(14px, 2vmin, 18px);
            text-align: center; min-height: 0; height: 0; overflow: hidden;
            display: flex; align-items: center; justify-content: center; color: #64748B;
          }
          .ujian-next {
            padding: clamp(8px, 1.1vmin, 13px) clamp(24px, 3.4vmin, 44px);
            border: none; border-radius: 999px; background: ${accent}; color: #fff;
            font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.2vmin, 22px);
            cursor: pointer; box-shadow: 0 4px 0 ${cd}; transition: transform .1s ease;
            -webkit-tap-highlight-color: transparent;
          }
          .ujian-next:hover:not(:disabled) { transform: translateY(-2px); }
          .ujian-next:active:not(:disabled) { transform: translateY(2px); }
          .ujian-next:disabled { opacity: .45; cursor: not-allowed; box-shadow: none; }
          .ujian-map-overlay {
            position: fixed; inset: 0; z-index: 80;
            display: grid; place-items: center; padding: 16px;
            background: rgba(15,23,42,.32); backdrop-filter: blur(10px);
          }
          .ujian-map-dialog {
            width: min(92vw, 440px); max-height: calc(100dvh - 32px); overflow: hidden;
            border: 1.5px solid #D1FAE5; border-radius: 24px; background: rgba(255,255,255,.98);
            box-shadow: 0 24px 70px rgba(15,23,42,.24); padding: 14px;
          }
          .ujian-map-head {
            display: flex; align-items: center; justify-content: space-between; gap: 12px;
            margin-bottom: 12px;
          }
          .ujian-map-title {
            font-family: 'Baloo 2', sans-serif; font-weight: 900; color: #1E293B;
            font-size: clamp(17px, 4.2vw, 22px); line-height: 1;
          }
          .ujian-map-close {
            width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid #A7F3D0;
            background: #ECFDF5; color: ${dark}; cursor: pointer;
            font-family: 'Baloo 2', sans-serif; font-weight: 900; font-size: 20px;
          }
          .ujian-map {
            display: grid; grid-template-columns: repeat(6, 1fr); gap: 7px;
          }
          .ujian-map-btn {
            min-width: 0; height: clamp(40px, 8.2dvh, 58px); border-radius: 12px; cursor: pointer;
            font-family: 'Baloo 2', sans-serif; font-weight: 900; font-size: 15px;
            transition: transform .12s ease, border-color .12s ease, background .12s ease;
            -webkit-tap-highlight-color: transparent;
          }
          .ujian-map-btn:hover { transform: translateY(-1px); }
          .ujian-map-toggle {
            border: 1.5px solid #A7F3D0; border-radius: 999px; background: #ECFDF5; color: ${dark};
            padding: 8px 14px; font-family: 'Baloo 2', sans-serif; font-weight: 900; font-size: 15px;
            cursor: pointer; -webkit-tap-highlight-color: transparent; box-sizing: border-box;
            max-width: 58%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }
          .ujian-footer {
            flex-shrink: 0; display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 12px;
            padding: clamp(8px, 1.2vmin, 15px) clamp(16px, 2.4vmin, 34px);
            background: rgba(255,255,255,.85); backdrop-filter: blur(12px); border-top: 1px solid #E2E8F0;
            box-sizing: border-box; width: 100%; overflow: hidden;
          }
          .ujian-timer { white-space: nowrap; flex-shrink: 0; }
          @media (max-width: 520px) {
            .ujian-map-overlay { padding: 12px; }
            .ujian-map-dialog { width: min(94vw, 380px); padding: 12px; border-radius: 22px; }
            .ujian-map { gap: 6px; }
          }
        `}</style>
        {showQuestionList && (
          <div
            className="ujian-map-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={language === 'bm' ? 'Senarai soalan' : 'Question list'}
            onClick={() => setShowQuestionList(false)}
          >
            <div className="ujian-map-dialog" onClick={(event) => event.stopPropagation()}>
              <div className="ujian-map-head">
                <div className="ujian-map-title">
                  {language === 'bm' ? `Soalan ${answeredCount}/${questions.length}` : `Questions ${answeredCount}/${questions.length}`}
                </div>
                <button type="button" className="ujian-map-close" onClick={() => setShowQuestionList(false)} aria-label={language === 'bm' ? 'Tutup' : 'Close'}>
                  x
                </button>
              </div>
              <div className="ujian-map">
                {questions.map((question, index) => {
                  const isCurrent = index === current;
                  const isAnswered = answers[index] !== null;
                  return (
                    <button
                      key={question.examId || index}
                      type="button"
                      className="ujian-map-btn"
                      onClick={() => {
                        setCurrent(index);
                        setShowQuestionList(false);
                      }}
                      style={{
                        border: isCurrent ? `3px solid ${dark}` : `1.5px solid ${isAnswered ? '#86EFAC' : '#CBD5E1'}`,
                        background: isAnswered ? '#DCFCE7' : '#FFFFFF',
                        color: isAnswered ? '#15803D' : '#475569',
                      }}
                      aria-label={`${language === 'bm' ? 'Soalan' : 'Question'} ${index + 1}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className="ujian-scroll">
          <div className="ujian-body">
            <div className="ujian-content">
              <div className="ujian-prompt">{q.prompt}</div>
              {renderUjianPecahanQuestion(q, examCtx)}
              <div className="ujian-feedback" aria-live="polite" />
              <button className="ujian-next" type="button" onClick={handleExamNext} disabled={!answered}>
                {nextLabel}
              </button>
            </div>
          </div>
        </div>
        <div className="ujian-footer">
          <button type="button" className="ujian-map-toggle" onClick={() => setShowQuestionList((value) => !value)}>
            {language === 'bm' ? `Soalan ${answeredCount}/${questions.length}` : `Questions ${answeredCount}/${questions.length}`}
          </button>
          <span className="ujian-timer" style={{ color: timerRed ? '#DC2626' : dark, fontSize: '0.85rem', fontWeight: 900, minWidth: 88, textAlign: 'right' }}>
            {timerStr}
          </span>
        </div>
      </div>
    );
  }

  if (phase === 'results' && questions) {
    const correctCount = answers.filter(Boolean).length;
    const wrongCount = answers.filter((value) => value === false).length;
    const unanswered = answers.filter((value) => value === null).length;
    const total = questions.length;
    const passed = correctCount >= UJIAN_PECAHAN_PASS_MARK;
    const usedMM = Math.floor(timeUsed / 60);
    const usedSS = timeUsed % 60;
    const sectionScores = UJIAN_PECAHAN_SECTIONS.map((section) => {
      let got = 0;
      let totalInSection = 0;
      questions.forEach((question, index) => {
        if (question.topicId !== section.id) return;
        totalInSection += 1;
        if (answers[index] === true) got += 1;
      });
      return { ...section, got, totalT: totalInSection, pct: totalInSection ? got / totalInSection : 0 };
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <style>{`
          .ujian-results-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
          .ujian-results-body {
            min-height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column; align-items: center;
            padding: clamp(20px, 3.6vmin, 48px) clamp(16px, 3vmin, 32px);
          }
          .ujian-results-content {
            width: 100%; max-width: 480px;
            display: flex; flex-direction: column; align-items: center;
            gap: clamp(14px, 2.4vmin, 28px);
          }
          .ujian-results-stats { display: flex; gap: clamp(8px, 1.4vmin, 16px); flex-wrap: wrap; justify-content: center; }
          .ujian-results-stat {
            padding: 5px 14px; border-radius: 999px; background: #F8FAFC; border: 1.5px solid #E2E8F0;
            font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: clamp(12px, 1.5vmin, 15px);
          }
          button.ujian-results-stat { cursor: pointer; -webkit-tap-highlight-color: transparent; }
          button.ujian-results-stat:hover { transform: translateY(-1px); }
          .ujian-results-stats > span.ujian-results-stat:nth-of-type(1),
          .ujian-results-stats > span.ujian-results-stat:nth-of-type(2) { display: none; }
          .ujian-review-backdrop {
            position: fixed; inset: 0; z-index: 2147483000;
            background: rgba(15, 23, 42, .42);
            display: flex; align-items: center; justify-content: center; padding: 14px;
          }
          .ujian-review-dialog {
            width: min(680px, 100%); max-height: min(760px, calc(100vh - 28px));
            background: #F8FAFC; border: 2px solid #BBF7D0; border-radius: 22px;
            box-shadow: 0 22px 60px rgba(15, 23, 42, .25);
            overflow: hidden; display: flex; flex-direction: column;
          }
          .ujian-review-head {
            display: flex; align-items: center; justify-content: space-between; gap: 12px;
            padding: 14px 16px; background: #FFFFFF; border-bottom: 1.5px solid #E2E8F0;
          }
          .ujian-review-heading {
            font-family: 'Baloo 2', sans-serif; font-weight: 900;
            color: #1E293B; font-size: clamp(18px, 3vmin, 28px);
          }
          .ujian-review-close {
            border: 1.5px solid #CBD5E1; background: #F8FAFC; color: #334155;
            border-radius: 999px; width: 38px; height: 38px; cursor: pointer;
            font-family: 'Baloo 2', sans-serif; font-weight: 900; font-size: 22px;
          }
          .ujian-review-list {
            padding: 14px; overflow-y: auto; -webkit-overflow-scrolling: touch;
            display: flex; flex-direction: column; gap: 14px;
          }
          .ujian-review-card {
            width: 100%; box-sizing: border-box; border-radius: 18px; padding: 12px;
            background: #fff; border: 1.5px solid #E2E8F0; font-family: 'Fredoka', sans-serif;
          }
          .ujian-review-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
          .ujian-review-title { min-width: 0; color: #1E293B; font-weight: 800; font-size: clamp(13px, 1.8vmin, 16px); }
          .ujian-review-pill { flex-shrink: 0; border-radius: 999px; padding: 3px 9px; font-weight: 800; font-size: 12px; }
          .ujian-review-question {
            margin-top: 10px; padding: 12px; border-radius: 16px;
            background: linear-gradient(180deg, #F0FDF4, #F8FAFC); border: 1.5px solid #BBF7D0;
          }
          .ujian-review-question .ujian-prompt { margin-bottom: 10px; }
          .ujian-review-answer { margin-top: 10px; display: grid; gap: 4px; font-weight: 700; font-size: clamp(12px, 1.7vmin, 15px); color: #334155; }
        `}</style>
        <div className="ujian-results-scroll">
          <div className="ujian-results-body">
            <div className="ujian-results-content">
              <div style={{
                width: 'clamp(100px, 18vmin, 140px)', height: 'clamp(100px, 18vmin, 140px)', borderRadius: '50%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, border: `3px solid ${passed ? '#16A34A' : '#DC2626'}`, background: '#F8FAFC',
              }}>
                <span style={{ fontSize: 'clamp(28px, 5vmin, 44px)', color: passed ? '#16A34A' : '#DC2626' }}>{correctCount}/{total}</span>
                <span style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 'clamp(11px, 1.6vmin, 15px)', color: passed ? '#16A34A' : '#DC2626' }}>
                  {passed ? 'LULUS ✓' : 'CUBA LAGI ✕'}
                </span>
              </div>
              <div className="ujian-results-stats">
                <button type="button" className="ujian-results-stat" onClick={() => setReviewMode('correct')} style={{ color: '#16A34A' }}>✓ Betul: {correctCount}</button>
                <button type="button" className="ujian-results-stat" onClick={() => setReviewMode('wrong')} style={{ color: '#DC2626' }}>✕ Salah: {wrongCount}</button>
                <span className="ujian-results-stat" style={{ color: '#16A34A' }}>✓ Betul: {correctCount}</span>
                <span className="ujian-results-stat" style={{ color: '#DC2626' }}>✕ Salah: {wrongCount}</span>
                <span className="ujian-results-stat" style={{ color: '#1E293B' }}>⏱ {usedMM}:{String(usedSS).padStart(2, '0')}</span>
              </div>
              {unanswered > 0 && (
                <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(12px, 1.5vmin, 15px)', color: '#16A34A' }}>
                  ⏰ {unanswered} {language === 'bm' ? 'soalan tidak dijawab' : 'questions unanswered'}
                </div>
              )}
              <div style={{ width: '100%', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: '4px 16px', boxSizing: 'border-box' }}>
                {sectionScores.map((section) => (
                  <div key={section.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 'clamp(8px, 1.2vmin, 12px) 0', borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ width: 3, height: 28, borderRadius: 2, background: section.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(12px, 1.5vmin, 15px)', color: '#334155' }}>
                        {section.name}
                      </div>
                      <div style={{ width: '100%', height: 6, background: '#E2E8F0', borderRadius: 3, marginTop: 4, overflow: 'hidden' }}>
                        <div style={{ width: `${section.pct * 100}%`, height: '100%', background: section.color, borderRadius: 3, transition: 'width 0.5s ease' }} />
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(13px, 1.6vmin, 17px)', color: section.pct >= 0.8 ? '#16A34A' : '#64748B', flexShrink: 0 }}>
                      {section.got}/{section.totalT}
                    </div>
                  </div>
                ))}
              </div>
              {reviewMode && createPortal((
                <div className="ujian-review-backdrop" role="dialog" aria-modal="true" aria-label={reviewMode === 'correct' ? 'Soalan betul' : 'Soalan salah'}>
                  <div className="ujian-review-dialog">
                    <div className="ujian-review-head">
                      <div className="ujian-review-heading">
                        {reviewMode === 'correct' ? `✓ Betul: ${correctCount}` : `✕ Salah: ${wrongCount}`}
                      </div>
                      <button type="button" className="ujian-review-close" onClick={() => setReviewMode(null)} aria-label="Tutup">×</button>
                    </div>
                    <div className="ujian-review-list">
                      {questions.map((question, index) => ({ question, index }))
                        .filter(({ index }) => reviewMode === 'correct' ? answers[index] === true : answers[index] === false)
                        .map(({ question, index }) => {
                          const ok = answers[index] === true;
                          const picked = selectedPerQ?.[index];
                          const reviewCtx = {
                            answered: true,
                            examMode: false,
                            selected: picked || null,
                            answer: question.answer,
                            isCorrect: ok,
                            handlePick: () => {},
                            handleNext: () => {},
                            handleTouch: () => {},
                            streak: 0,
                            correct: 0,
                            wrong: 0,
                            theme: { accent, dark, cd, green: '#16A34A', red: '#DC2626', canChangeAnswer: false, savedAnswer: picked || '' },
                          };
                          return (
                            <div
                              key={question.examId || index}
                              className="ujian-review-card"
                              style={{ borderColor: ok ? '#86EFAC' : '#FCA5A5', background: ok ? '#F0FDF4' : '#FEF2F2' }}
                            >
                              <div className="ujian-review-top">
                                <div className="ujian-review-title">{index + 1}. {question.type}</div>
                                <span className="ujian-review-pill" style={{ background: ok ? '#DCFCE7' : '#FEE2E2', color: ok ? '#15803D' : '#DC2626' }}>
                                  {ok ? 'Betul' : 'Salah'}
                                </span>
                              </div>
                              <div className="ujian-review-question">
                                <div className="ujian-prompt">{question.prompt}</div>
                                {renderUjianPecahanQuestion(question, reviewCtx)}
                              </div>
                              <div className="ujian-review-answer">
                                <div>Jawapan anda: <span style={{ color: ok ? '#15803D' : '#DC2626' }}>{picked ? ujianPecahanAnswerText(question, picked) : 'Tidak dijawab'}</span></div>
                                {!ok && <div>Jawapan betul: <span style={{ color: '#15803D' }}>{ujianPecahanAnswerText(question, question.answer)}</span></div>}
                              </div>
                            </div>
                          );
                        })}
                      {(reviewMode === 'correct' ? correctCount : wrongCount) === 0 && (
                        <div className="ujian-review-card" style={{ textAlign: 'center', color: '#64748B', fontWeight: 800 }}>
                          Tiada soalan untuk dipaparkan.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ), document.body)}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.6vmin, 16px)', width: '100%' }}>
                <button type="button" onClick={() => {
                  if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                  }
                  setPhase('start');
                }}
                  style={{
                    padding: 'clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)', border: 'none', borderRadius: 999,
                    background: `linear-gradient(180deg, ${accent}, ${cd})`, color: '#fff', cursor: 'pointer', width: '100%',
                    fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                    boxShadow: `0 4px 0 ${dark}, 0 14px 24px rgba(91,33,182,.22)`, WebkitTapHighlightColor: 'transparent',
                  }}>
                  ↻ {language === 'bm' ? 'Cuba Semula' : 'Try Again'}
                </button>
                <button type="button" onClick={onExit}
                  style={{
                    padding: 'clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)',
                    border: '1.5px solid #CBD5E1', borderRadius: 999, background: '#F8FAFC', color: '#475569', cursor: 'pointer', width: '100%',
                    fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)', WebkitTapHighlightColor: 'transparent',
                  }}>
                  ← {language === 'bm' ? 'Kembali' : 'Back'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
