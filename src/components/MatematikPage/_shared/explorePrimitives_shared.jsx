import React, { useEffect, useState } from 'react';

export const BOX_COLORS = [
  { bg: '#F87171', border: '#DC2626' },
  { bg: '#FB923C', border: '#EA580C' },
  { bg: '#FBBF24', border: '#D97706' },
  { bg: '#34D399', border: '#059669' },
  { bg: '#60A5FA', border: '#2563EB' },
  { bg: '#A78BFA', border: '#7C3AED' },
  { bg: '#F472B6', border: '#DB2777' },
];

/* SVG water-splash path data (200×200 viewBox). Each = irregular central body
   with sharp tapering spikes shooting outward + many satellite droplets. The
   central area stays solid so the answer number sits on opaque paint. */
export const SPLATTER_PATHS = [
  // 0. Blue style (Top-Right image) - 7 arms. Base radius ~ 55. Center area has plenty of room.
  'M 100 45 C 115 45, 120 30, 125 10 C 135 -10, 155 10, 140 35 C 135 45, 145 55, 155 50 C 180 40, 195 60, 175 75 C 165 85, 165 95, 175 105 C 195 115, 185 140, 160 135 C 150 130, 140 140, 145 150 C 155 175, 130 195, 115 170 C 105 155, 95 155, 85 170 C 70 195, 45 175, 55 150 C 60 140, 50 130, 40 135 C 15 140, 5 115, 25 105 C 35 95, 35 85, 25 75 C 5 60, 20 40, 45 50 C 55 55, 65 45, 60 35 C 45 10, 65 -10, 75 10 C 80 30, 85 45, 100 45 Z M 25 25 A 6 6 0 1 1 37 25 A 6 6 0 1 1 25 25 M 175 160 A 8 8 0 1 1 191 160 A 8 8 0 1 1 175 160 M 35 165 A 5 5 0 1 1 45 165 A 5 5 0 1 1 35 165',
  // 1. Orange style (Bottom-Left image) - Very large round blob with small bumps. Base radius ~ 65.
  'M 100 35 C 120 35, 140 40, 155 55 C 170 70, 170 80, 185 90 C 200 100, 175 130, 160 140 C 150 145, 155 160, 170 170 C 185 180, 160 205, 140 190 C 120 175, 110 165, 90 170 C 70 175, 50 190, 35 170 C 20 150, 40 135, 35 115 C 30 95, 10 90, 15 70 C 20 50, 40 55, 55 45 C 70 35, 80 35, 100 35 Z M 180 30 A 7 7 0 1 1 194 30 A 7 7 0 1 1 180 30 M 15 140 A 6 6 0 1 1 27 140 A 6 6 0 1 1 15 140 M 150 10 A 5 5 0 1 1 160 10 A 5 5 0 1 1 150 10 M 70 15 A 8 8 0 1 1 86 15 A 8 8 0 1 1 70 15',
  // 2. Pink style (Bottom-Right image) - Thick 6 arms, huge center. Base radius ~ 55.
  'M 100 45 C 115 45, 125 35, 135 15 C 150 -10, 175 15, 155 40 C 145 50, 150 60, 165 65 C 190 75, 195 105, 170 110 C 155 115, 150 125, 160 135 C 175 155, 155 185, 135 165 C 125 155, 110 155, 100 165 C 90 175, 95 195, 75 190 C 55 185, 60 160, 70 150 C 80 140, 75 125, 60 120 C 35 110, 30 80, 55 75 C 70 70, 75 60, 65 50 C 50 30, 75 5, 90 25 C 95 35, 90 45, 100 45 Z M 30 160 A 7 7 0 1 1 44 160 A 7 7 0 1 1 30 160 M 175 15 A 6 6 0 1 1 187 15 A 6 6 0 1 1 175 15 M 15 40 A 5 5 0 1 1 25 40 A 5 5 0 1 1 15 40',
  // 3. Realistic Orange style (Top-Left image) - Jagged but wide base. Base radius ~ 60.
  'M 100 40 C 120 40, 135 30, 140 15 C 145 -5, 165 5, 155 25 C 150 35, 165 40, 180 35 C 195 30, 195 50, 175 55 C 160 60, 165 75, 180 80 C 195 85, 195 110, 175 110 C 160 110, 155 125, 165 140 C 175 155, 155 175, 140 160 C 130 150, 115 155, 115 170 C 115 190, 90 190, 90 170 C 90 155, 75 150, 65 160 C 50 175, 30 155, 45 140 C 55 125, 50 110, 35 110 C 15 110, 15 85, 35 80 C 50 75, 55 60, 40 55 C 20 50, 20 30, 35 35 C 50 40, 65 35, 60 25 C 55 5, 75 -5, 80 15 C 85 30, 90 40, 100 40 Z M 20 20 A 8 8 0 1 1 36 20 A 8 8 0 1 1 20 20 M 180 160 A 7 7 0 1 1 194 160 A 7 7 0 1 1 180 160 M 20 170 A 6 6 0 1 1 32 170 A 6 6 0 1 1 20 170 M 150 185 A 5 5 0 1 1 160 185 A 5 5 0 1 1 150 185 M 95 15 A 4 4 0 1 1 103 15 A 4 4 0 1 1 95 15'
];

/**
 * Reusable interactive widgets for the Belajar (explore) phase.
 * Each primitive: theme via `accent`/`dark` props, big tappable targets (>=44px),
 * and no XP/scoring (a light session correct/wrong counter is OK).
 *
 * New primitives added per-topic in later slices.
 */

export function NumberGridExplore({ data, language, theme, onSpeak }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: "'Fredoka', sans-serif", color: '#5B6B7B' }}>
      <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
        {language === 'bm' ? 'Grid nombor akan datang' : 'Number grid coming soon'}
      </p>
    </div>
  );
}

export function BuildAddExplore({ data, language, theme, onSpeak }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: "'Fredoka', sans-serif", color: '#5B6B7B' }}>
      <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
        {language === 'bm' ? 'Interaktif bina tambah akan datang' : 'Build & add interactive coming soon'}
      </p>
    </div>
  );
}

export function FractionExplore({ data, language, theme, onSpeak }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: "'Fredoka', sans-serif", color: '#5B6B7B' }}>
      <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
        {language === 'bm' ? 'Interaktif pecahan akan datang' : 'Fraction interactive coming soon'}
      </p>
    </div>
  );
}

export function MoneyExplore({ data, language, theme, onSpeak }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: "'Fredoka', sans-serif", color: '#5B6B7B' }}>
      <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
        {language === 'bm' ? 'Interaktif wang akan datang' : 'Money interactive coming soon'}
      </p>
    </div>
  );
}

export function ClockExplore({ data, language, theme, onSpeak }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: "'Fredoka', sans-serif", color: '#5B6B7B' }}>
      <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
        {language === 'bm' ? 'Interaktif masa akan datang' : 'Clock interactive coming soon'}
      </p>
    </div>
  );
}

export const randInt = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const getNextExamQuestionIndex = (answers, current, fillSkippedOnly) => {
  if (!Array.isArray(answers) || answers.length === 0) return current;
  if (!fillSkippedOnly && current < answers.length - 1) return current + 1;
  const nextUnanswered = answers.findIndex((value, index) => index > current && value === null);
  if (nextUnanswered >= 0) return nextUnanswered;
  const firstUnanswered = answers.findIndex((value, index) => index !== current && value === null);
  return firstUnanswered >= 0 ? firstUnanswered : current;
};

function objEmojiSize(count) {
  if (count <= 4) return 'clamp(24px, 6vmin, 52px)';
  if (count <= 6) return 'clamp(22px, 5vmin, 44px)';
  if (count <= 10) return 'clamp(19px, 4vmin, 36px)';
  return 'clamp(16px, 3.2vmin, 30px)';
}

export function ObjectsGrid({ icon, count }) {
  const perRow = 4;
  const rows = [];
  const sz = objEmojiSize(count);
  for (let r = 0; r < Math.ceil(count / perRow); r++) {
    const rowItems = [];
    for (let c = 0; c < perRow && r * perRow + c < count; c++) {
      rowItems.push(
        <span key={c} style={{ fontSize: sz, lineHeight: 1.1 }}>{icon}</span>
      );
    }
    rows.push(
      <div key={r} style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: 'clamp(2px, 0.5vw, 5px)', width: '100%', maxWidth: '100%', minWidth: 0,
      }}>{rowItems}</div>
    );
  }
  return (
    <div className="mt-objects-grid" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: '1px', width: '100%', maxWidth: '100%', minWidth: 0,
    }}>
      {rows}
    </div>
  );
}

export function EmptyTray({ height, compact }) {
  return (
    <div className="mt-word-options-grid" style={{
      border: '2px dashed #CBD5E1', borderRadius: 'clamp(12px, 1.6vmin, 20px)',
      minHeight: height || 'clamp(60px, 10vmin, 120px)',
      width: compact ? 'clamp(50px, 8vmin, 100px)' : 'clamp(80px, 14vmin, 160px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} />
  );
}


export function NumOptionsGrid({ options, answered, selected, answer, handlePick, theme: C }) {
  const cols = Math.min(options.length, 4);
  const locked = answered && !C?.canChangeAnswer;
  const showFeedback = answered && !C?.canChangeAnswer;
  return (
    <div className="mt-num-options-grid" style={{
      display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 'clamp(8px, 1.4vmin, 16px)',
      width: '100%', maxWidth: cols <= 3 ? 360 : 400,
    }}>
      <style>{`
        @media (max-width: 430px) {
          .mt-num-options-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            max-width: min(100%, 320px) !important;
          }
          .mt-num-options-grid button {
            font-size: clamp(20px, 6vw, 32px) !important;
          }
        }
      `}</style>
      {options.map((opt, idx) => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        const c = BOX_COLORS[idx % BOX_COLORS.length];
        let bg, bd, clr, txt, anim, bxShadow;
        if (showFeedback && isAns) { bg = 'linear-gradient(135deg,#22C55E,#16A34A)'; bd = '#15803D'; clr = '#fff'; txt = `${opt.value} ✓`; anim = 'snkBounce .45s ease'; bxShadow = '0 4px 16px rgba(22,163,74,.3)'; }
        else if (showFeedback && picked) { bg = 'linear-gradient(135deg,#EF4444,#DC2626)'; bd = '#B91C1C'; clr = '#fff'; txt = `${opt.value} ✗`; anim = 'shakeError .35s ease'; bxShadow = '0 4px 16px rgba(220,38,38,.3)'; }
        else if (showFeedback) { bg = '#F8FAFC'; bd = '#E2E8F0'; clr = '#94A3B8'; txt = opt.value; anim = 'none'; bxShadow = 'none'; }
        else if (picked && C?.canChangeAnswer) { bg = `linear-gradient(135deg,${C?.accent || '#8B5CF6'},${C?.cd || C?.dark || '#5B21B6'})`; bd = C?.dark || C?.accent || '#5B21B6'; clr = '#FFFFFF'; txt = opt.value; anim = 'none'; bxShadow = `0 4px 14px ${C?.accent || '#8B5CF6'}40`; }
        else if (picked) { bg = `linear-gradient(135deg,${C?.accent || '#8B5CF6'}40,${C?.accent || '#8B5CF6'}20)`; bd = C?.accent || '#8B5CF6'; clr = C?.dark || C?.accent || '#5B21B6'; txt = opt.value; anim = 'none'; bxShadow = `0 2px 8px ${C?.accent || '#8B5CF6'}30`; }
        else { bg = '#fff'; bd = '#CBD5E1'; clr = '#1E293B'; txt = opt.value; anim = 'none'; bxShadow = '0 2px 0 rgba(15,23,42,.06)'; }
        return (
          <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={locked}
            style={{
              padding: 'clamp(10px, 1.6vmin, 18px)',
              border: 'none',
              borderBottom: showFeedback ? 'none' : `4px solid ${bd}`,
              borderRadius: 'clamp(12px, 1.6vmin, 18px)',
              background: bg,
              color: clr,
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
              fontSize: 'clamp(24px, 4vmin, 40px)',
              lineHeight: 1.1, whiteSpace: 'nowrap',
              cursor: locked ? 'default' : 'pointer',
              transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
              minHeight: 44, minWidth: 44,
              animation: anim,
              boxShadow: bxShadow,
            }}
          >
            {txt}
          </button>
        );
      })}
    </div>
  );
}


export const BM_ONES = ['sifar','satu','dua','tiga','empat','lima','enam','tujuh','lapan','sembilan'];
export const BM_TEENS = ['sepuluh','sebelas','dua belas','tiga belas','empat belas','lima belas','enam belas','tujuh belas','lapan belas','sembilan belas'];
export const BM_TENS = ['','','dua puluh','tiga puluh','empat puluh','lima puluh','enam puluh','tujuh puluh','lapan puluh','sembilan puluh'];

export function numToBM(n) {
  if (n < 0 || n > 100) return '';
  if (n === 100) return 'seratus';
  if (n < 10) return BM_ONES[n];
  if (n < 20) return BM_TEENS[n - 10];
  const t = Math.floor(n / 10), o = n % 10;
  return o === 0 ? BM_TENS[t] : `${BM_TENS[t]} ${BM_ONES[o]}`;
}

export function WordOptionsGrid({ options, answered, selected, answer, handlePick, theme: C, columns = 1, plain = false }) {
  const locked = answered && !C?.canChangeAnswer;
  const showFeedback = answered && !C?.canChangeAnswer;
  return (
    <div style={{
      display: columns > 1 ? 'grid' : 'flex',
      ...(columns > 1
        ? { gridTemplateColumns: `repeat(${columns}, 1fr)` }
        : { flexDirection: 'column' }),
      gap: 'clamp(8px, 1.2vmin, 14px)',
      width: '100%', maxWidth: 400,
    }}>
      {plain && (
        <style>{`
          .warnai-opt {
            position: relative; overflow: hidden;
            transition: transform .14s ease, background .18s ease, box-shadow .18s ease, border-color .18s ease;
          }
          .warnai-chip {
            width: clamp(16px, 2.6vmin, 22px); height: clamp(16px, 2.6vmin, 22px);
            border-radius: 6px; flex-shrink: 0; border: 2px solid #fff;
            box-shadow: 0 1px 4px rgba(0,0,0,.4); transition: transform .18s ease;
          }
          .warnai-opt:active { transform: translateY(1px) scale(.99); }
          @media (hover: hover) {
            .warnai-opt:hover {
              background: var(--swatch) !important;
              border-color: var(--swatch) !important;
              transform: translateY(-2px);
              box-shadow: 0 7px 18px rgba(0,0,0,.32), 0 0 18px var(--swatch);
            }
            .warnai-opt:hover .warnai-chip { transform: rotate(-8deg) scale(1.1); }
          }
        `}</style>
      )}
      {options.map((opt, idx) => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        const c = BOX_COLORS[idx % BOX_COLORS.length];
        const warnai = plain && !answered;
        let bg, bd, clr, txt, anim, bxShadow;
        if (showFeedback && isAns) { bg = 'linear-gradient(135deg,#22C55E,#16A34A)'; bd = '#15803D'; clr = '#fff'; txt = `${opt.value} ✓`; anim = 'snkBounce .45s ease'; bxShadow = '0 4px 16px rgba(22,163,74,.3)'; }
        else if (showFeedback && picked) { bg = 'linear-gradient(135deg,#EF4444,#DC2626)'; bd = '#B91C1C'; clr = '#fff'; txt = `${opt.value} ✗`; anim = 'shakeError .35s ease'; bxShadow = '0 4px 16px rgba(220,38,38,.3)'; }
        else if (picked) { bg = `linear-gradient(135deg,${C?.accent || '#8B5CF6'}40,${C?.accent || '#8B5CF6'}20)`; bd = C?.accent || '#8B5CF6'; clr = C?.dark || C?.accent || '#5B21B6'; txt = opt.value; anim = 'none'; bxShadow = `0 2px 8px ${C?.accent || '#8B5CF6'}30`; }
        else if (plain) { bg = '#fff'; bd = '#CBD5E1'; clr = '#1E293B'; txt = opt.value; anim = 'none'; bxShadow = '0 2px 0 rgba(15,23,42,.06)'; }
        else { bg = '#fff'; bd = '#CBD5E1'; clr = '#1E293B'; txt = opt.value; anim = 'none'; bxShadow = '0 2px 0 rgba(15,23,42,.06)'; }
        return (
          <button key={opt.id} type="button"
            className={warnai ? 'warnai-opt' : undefined}
            onClick={() => handlePick(opt.id)} disabled={locked}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 'clamp(8px, 1.4vmin, 12px)',
              padding: 'clamp(10px, 1.6vmin, 18px) clamp(16px, 2.4vmin, 28px)',
              ...(warnai
                ? { border: `2px solid ${bd}`, borderBottom: `5px solid ${bd}`, '--swatch': c.bg }
                : { border: 'none', borderBottom: showFeedback ? 'none' : `4px solid ${bd}` }),
              borderRadius: 'clamp(12px, 1.6vmin, 18px)',
              background: bg,
              color: clr,
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: showFeedback && (isAns || picked) ? 'clamp(24px, 4vmin, 40px)' : 'clamp(16px, 2.6vmin, 26px)',
              lineHeight: 1.2, whiteSpace: 'normal', overflowWrap: 'anywhere', textAlign: 'center',
              cursor: locked ? 'default' : 'pointer',
              transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
              minHeight: 44, minWidth: 0, width: '100%', boxSizing: 'border-box',
              animation: anim,
              boxShadow: bxShadow,
            }}
          >
            {warnai && <span className="warnai-chip" style={{ background: c.bg }} aria-hidden="true" />}
            <span style={{ color: clr }}>{txt}</span>
          </button>
        );
      })}
    </div>
  );
}


export function KeypadInput({ answered, isCorrect, handlePick, answer, theme: C, qid, maxLength = 2, compact = false }) {
  const [input, setInput] = useState(C?.savedAnswer || '');
  useEffect(() => { setInput(C?.savedAnswer || ''); }, [qid, C?.savedAnswer]);
  const locked = answered && !C?.canChangeAnswer;
  const showFeedback = answered && !C?.canChangeAnswer;
  const gap = compact ? 'clamp(4px, 0.7vmin, 8px)' : 'clamp(8px, 1.3vmin, 14px)';
  const displayHeight = compact ? 'clamp(34px, 5vmin, 46px)' : 'clamp(42px, 7vmin, 64px)';
  const displayWidth = compact ? 'clamp(72px, 16vmin, 132px)' : 'clamp(80px, 20vmin, 160px)';
  const displayFont = compact ? 'clamp(22px, 4.2vmin, 34px)' : 'clamp(24px, 5vmin, 44px)';
  const gridGap = compact ? 'clamp(4px, 0.7vmin, 7px)' : 'clamp(5px, 1vmin, 10px)';
  const gridWidth = compact ? 'clamp(220px, 44vmin, 300px)' : 'clamp(260px, 50vmin, 420px)';
  const keyHeight = compact ? 'clamp(32px, 4.7vmin, 42px)' : 'clamp(44px, 6vmin, 54px)';
  const keyFont = compact ? 'clamp(18px, 3vmin, 24px)' : 'clamp(20px, 3.4vmin, 30px)';
  const auxFont = compact ? 'clamp(14px, 2.4vmin, 19px)' : 'clamp(16px, 2.6vmin, 24px)';

  const setExamInput = (next) => {
    setInput(next);
    if (C?.canChangeAnswer) handlePick(next || null);
  };
  const press = (d) => { if (!locked && input.length < maxLength) setExamInput(input + d); };
  const back = () => { if (!locked) setExamInput(input.slice(0, -1)); };
  const submit = () => { if (!locked && input !== '') handlePick(input); };

  useEffect(() => {
    const onKey = (e) => {
      if (locked) return;
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); press(e.key); }
      else if (e.key === 'Backspace') { e.preventDefault(); back(); }
      else if (e.key === 'Enter') { e.preventDefault(); if (input !== '') handlePick(input); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [locked, input, handlePick]);

  return (
    <div className="mt-keypad-input" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap, width: '100%' }}>
      <style>{`
        .kp-btn { transition: all 0.08s ease; -webkit-tap-highlight-color: transparent; }
        .kp-btn:active { transform: translateY(4px); border-bottom-width: 0 !important; }
      `}</style>
      <div className={`mt-keypad-display${!locked ? ' snk-input-ready' : ''}`} style={{
        minWidth: displayWidth, minHeight: displayHeight,
        border: `3px solid ${showFeedback ? (isCorrect ? C.green : C.red) : '#CBD5E1'}`,
        borderRadius: 'clamp(12px, 1.6vmin, 18px)', background: '#F9FAFB',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: displayFont,
        color: showFeedback ? (isCorrect ? C.green : C.red) : (input ? '#334155' : '#CBD5E1'), padding: '0 14px',
      }}>
        {input || '?'}
      </div>
      {answered && !isCorrect && !C?.canChangeAnswer && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#64748B' }}>
          Jawapan: <b style={{ color: C.green }}>{answer}</b>
        </div>
      )}
      {!locked && (
        <div className="mt-keypad-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: gridGap, width: '100%', maxWidth: gridWidth }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <button key={d} type="button" className="kp-btn" onClick={() => press(String(d))}
              style={{
                minHeight: keyHeight, border: 'none',
                borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: '#3B82F6', color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: keyFont,
              }}>{d}</button>
          ))}
          <button type="button" className="kp-btn" onClick={back}
            style={{
              minHeight: keyHeight, border: 'none',
              borderBottom: '4px solid #DC2626', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#EF4444', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: auxFont,
            }}>Padam</button>
          <button type="button" className="kp-btn" onClick={() => press('0')}
            style={{
              minHeight: keyHeight, border: 'none',
              borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#3B82F6', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: keyFont,
            }}>0</button>
          {!C?.canChangeAnswer && (
            <button type="button" className="kp-btn" onClick={submit} disabled={input === ''}
              style={{
                minHeight: keyHeight, border: 'none',
                borderBottom: input === '' ? '4px solid #D1D5DB' : '4px solid #16A34A',
                borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: input === '' ? '#E5E7EB' : '#22C55E',
                color: input === '' ? '#9CA3AF' : '#fff', cursor: input === '' ? 'not-allowed' : 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: auxFont,
              }}>Semak</button>
          )}
        </div>
      )}
    </div>
  );
}
