import React from 'react';
import MatematikActivityFrame from './MatematikActivityFrame';
import { pick, randInt, shuffle } from './explorePrimitives_shared';

const FRAC_WORDS = ['Setengah', 'Suku', 'Dua perempat', 'Tiga perempat'];

function FractionSvg({ type, parts, shaded, size }) {
  const sz = size || 'clamp(90px, 16vmin, 160px)';
  const strok = { stroke: '#334155', strokeWidth: 3, fill: 'none' };
  if (type === 'circle' && parts === 2) {
    const d = shaded > 0 ? 'M 60 10 A 50 50 0 0 0 60 110 Z' : null;
    return (
      <svg viewBox="0 0 120 120" width={sz} height={sz} style={{ display: 'block' }}>
        <circle cx="60" cy="60" r="50" {...strok} />
        <line x1="60" y1="10" x2="60" y2="110" {...strok} />
        {d && <path d={d} fill="#A855F7" opacity="0.35" />}
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
        {quads.slice(0, shaded).map((d, i) => <path key={i} d={d} fill="#A855F7" opacity="0.35" />)}
      </svg>
    );
  }
  if (type === 'square' && parts === 2) {
    return (
      <svg viewBox="0 0 120 120" width={sz} height={sz} style={{ display: 'block' }}>
        <rect x="10" y="10" width="100" height="100" rx="6" {...strok} />
        <line x1="60" y1="10" x2="60" y2="110" {...strok} />
        {shaded > 0 && <rect x="10" y="10" width="50" height="100" fill="#A855F7" opacity="0.35" rx="6" />}
      </svg>
    );
  }
  if (type === 'square' && parts === 4) {
    const quads = [
      <rect key={0} x="10" y="10" width="50" height="50" fill="#A855F7" opacity="0.35" rx="3" />,
      <rect key={1} x="60" y="10" width="50" height="50" fill="#A855F7" opacity="0.35" rx="3" />,
      <rect key={2} x="10" y="60" width="50" height="50" fill="#A855F7" opacity="0.35" rx="3" />,
      <rect key={3} x="60" y="60" width="50" height="50" fill="#A855F7" opacity="0.35" rx="3" />,
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
  const s = { stroke: '#6D28D9', strokeWidth: 3, fill: 'none' };
  if (type === 'circle') {
    return (
      <svg viewBox="0 0 120 120" width={sz} height={sz} style={{ display: 'block' }}>
        <circle cx="60" cy="60" r="50" {...s} />
        {/* Equal halves — line dead center */}
        <line x1="60" y1="10" x2="60" y2="110" {...s} />
        {/* Shading on left half */}
        <path d="M 60 10 A 50 50 0 0 0 60 110 Z" fill="#A855F7" opacity="0.25" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" width={sz} height={sz} style={{ display: 'block' }}>
      <rect x="10" y="10" width="100" height="100" rx="6" {...s} />
      <line x1="60" y1="10" x2="60" y2="110" {...s} />
      <rect x="10" y="10" width="50" height="100" fill="#A855F7" opacity="0.25" rx="6" />
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
        <path d="M 35 17 A 50 50 0 0 0 35 103 Z" fill="#94A3B8" opacity="0.18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" width={sz} height={sz} style={{ display: 'block' }}>
      <rect x="10" y="10" width="100" height="100" rx="6" {...s} />
      {/* Very off-center line — x=35 */}
      <line x1="35" y1="10" x2="35" y2="110" {...s} />
      <rect x="10" y="10" width="25" height="100" fill="#94A3B8" opacity="0.18" rx="6" />
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

function genNamakanPecahan() {
  const qa = pick(FRAC_QUESTION_ANSWER);
  const shape = pick(['circle', 'square']);
  const opts = makeOptions(qa.text);
  const options = opts.map((v, i) => ({ id: `opt-${i}`, value: v }));
  return {
    type: 'kp-namakan',
    prompt: 'Apakah pecahan kawasan berlorek?',
    shape,
    parts: qa.parts,
    shaded: qa.shaded,
    options,
    answer: options.find(o => o.value === qa.text).id,
  };
}

function genPilihGambar() {
  const qa = pick(FRAC_QUESTION_ANSWER);
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

function buildKenaliPecahanRound() {
  const qs = [];
  for (let i = 0; i < 3; i++) qs.push(genSamaBesar());
  for (let i = 0; i < 4; i++) qs.push(genNamakanPecahan());
  for (let i = 0; i < 3; i++) qs.push(genPilihGambar());
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
        else if (picked) { bg = 'linear-gradient(135deg,#F5F3FF,#EDE9FE)'; bd = C?.accent || '#8B5CF6'; }
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
          else if (picked) { bg = `${C?.accent || '#8B5CF6'}18`; bd = C?.accent || '#8B5CF6'; clr = C?.dark || '#5B21B6'; txt = opt.value; }
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
        else if (picked) { bg = 'linear-gradient(135deg,#F5F3FF,#EDE9FE)'; bd = C?.accent || '#8B5CF6'; }
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
                ? '0 0 0 4px rgba(22,163,74,.2), 0 10px 28px rgba(22,163,74,.14)'
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
          case 'kp-namakan': return <NamakanContent q={q} ctx={ctx} />;
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
