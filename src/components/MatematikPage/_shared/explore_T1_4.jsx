import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
import { pick, randInt, shuffle } from './explorePrimitives_shared';

function formatMoney(sen) {
  if (sen < 100) return `${sen} sen`;
  const ringgit = Math.floor(sen / 100);
  const s = sen % 100;
  return s === 0 ? `RM${ringgit}` : `RM${ringgit}.${s.toString().padStart(2, '0')}`;
}

const DENOMS = [
  { id: '5sen', label: '5 sen', value: 5, type: 'coin', color: '#9CA3AF' },
  { id: '10sen', label: '10 sen', value: 10, type: 'coin', color: '#9CA3AF' },
  { id: '20sen', label: '20 sen', value: 20, type: 'coin', color: '#9CA3AF' },
  { id: '50sen', label: '50 sen', value: 50, type: 'coin', color: '#9CA3AF' },
  { id: 'rm1', label: 'RM1', value: 100, type: 'note', color: '#3B82F6' },
  { id: 'rm5', label: 'RM5', value: 500, type: 'note', color: '#22C55E' },
  { id: 'rm10', label: 'RM10', value: 1000, type: 'note', color: '#EF4444' },
];

function MoneyVisual({ denom, size }) {
  const sz = size || 'clamp(80px, 14vmin, 140px)';
  if (denom.type === 'coin') {
    return (
      <svg viewBox="0 0 100 100" width={sz} height={sz} style={{ display: 'block' }}>
        <circle cx="50" cy="50" r="44" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="3" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
          fontFamily="'Baloo 2', sans-serif" fontWeight="900"
          fontSize="clamp(22px, 4.4vmin, 36px)" fill="#4B5563">
          {denom.label}
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 130 62" width={sz} height={sz} style={{ display: 'block' }}>
      <rect x="2" y="2" width="126" height="58" rx="8" fill={denom.color} stroke={denom.color} strokeWidth="2" />
      <rect x="6" y="6" width="118" height="50" rx="5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <text x="65" y="35" textAnchor="middle" dominantBaseline="central"
        fontFamily="'Baloo 2', sans-serif" fontWeight="900"
        fontSize="clamp(28px, 5.6vmin, 46px)" fill="#fff">
        {denom.label}
      </text>
    </svg>
  );
}

function buildValueQuestion(target) {
  const correctPool = DENOMS.filter((d) => (target === 'rm' ? d.value >= 100 : d.value < 100));
  const wrongPool = DENOMS.filter((d) => (target === 'rm' ? d.value < 100 : d.value >= 100));
  const correct = pick(correctPool);
  const options = shuffle([
    correct,
    ...shuffle(wrongPool).slice(0, 3),
  ]).map((denom) => ({ id: denom.id, value: denom.label, denom }));

  return {
    prompt: target === 'rm' ? 'Yang manakah Wang Kertas(RM)?' : `Yang manakah ${correct.label}?`,
    answer: correct.id,
    type: target === 'rm' ? 'Q1' : 'Q2',
    options,
  };
}

function buildCategoryQuestion(target) {
  const correctPool = DENOMS.filter((d) => (target === 'rm' ? d.value >= 100 : d.value < 100));
  const wrongPool = DENOMS.filter((d) => (target === 'rm' ? d.value < 100 : d.value >= 100));
  const correct = pick(correctPool);
  const options = shuffle([
    correct,
    ...shuffle(wrongPool).slice(0, 3),
  ]).map((denom) => ({ id: denom.id, value: denom.label, denom }));

  return {
    prompt: target === 'rm' ? 'Yang manakah wang kertas?' : 'Yang manakah syiling?',
    answer: correct.id,
    type: target === 'rm' ? 'Q1' : 'Q2',
    options,
  };
}

function genQ1() {
  return buildValueQuestion('rm');
}

function genQ2() {
  return buildCategoryQuestion('sen');
}

function genQ3() {
  const count = randInt(2, 4);
  const picked = [];
  let total = 0;
  for (let i = 0; i < count; i++) {
    const d = pick(DENOMS);
    if (total + d.value <= 1500) {
      picked.push(d);
      total += d.value;
    } else {
      const small = pick(DENOMS.slice(0, 4));
      picked.push(small);
      total += small.value;
    }
  }
  const totalLabel = formatMoney(total);
  const distractors = [];
  const offsets = shuffle([-1, -2, 1, 2, -3, 3]);
  for (const o of offsets) {
    const v = total + o;
    if (v > 0 && v !== total && distractors.length < 3) {
      distractors.push(formatMoney(v));
    }
  }
  const allLabels = shuffle([totalLabel, ...distractors.slice(0, 3)]);
  return {
    prompt: 'Berapa jumlah wang ini?',
    notes: picked,
    answer: totalLabel,
    type: 'Q3',
    options: allLabels.map(l => ({ id: l, value: l })),
  };
}

function genQ4() {
  const [a, b] = shuffle(DENOMS).slice(0, 2);
  const smaller = a.value < b.value ? a : b;
  return {
    prompt: 'Mana lebih kecil?',
    left: a,
    right: b,
    answer: smaller.id,
    type: 'Q4',
    options: shuffle([
      { id: a.id, value: a.label },
      { id: b.id, value: b.label },
    ]),
  };
}

function genQ5() {
  const [a, b] = shuffle(DENOMS).slice(0, 2);
  const bigger = a.value > b.value ? a : b;
  return {
    prompt: 'Mana lebih besar?',
    left: a,
    right: b,
    answer: bigger.id,
    type: 'Q5',
    options: shuffle([
      { id: a.id, value: a.label },
      { id: b.id, value: b.label },
    ]),
  };
}

const GENERATORS = { Q1: genQ1, Q2: genQ2, Q3: genQ3, Q4: genQ4, Q5: genQ5 };

function buildRound() {
  const qs = Object.values(GENERATORS).flatMap((generate) => [generate(), generate()]);
  return shuffle(qs);
}

function renderOptions(q, ctx) {
  const { answered, selected, answer, handlePick, examMode } = ctx;
  const useMoneyVisual = q.type === 'Q1' || q.type === 'Q2';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(8px, 1.4vmin, 14px)', width: '100%', maxWidth: 360 }}>
      {q.options.map((opt) => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        let bg = '#fff', bd = '#CBD5E1', clr = '#1E293B', txt = opt.value;
        if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; clr = '#fff'; txt = `${opt.value} ✓`; }
        else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; clr = '#fff'; }
        else if (answered) { bg = '#fff'; bd = '#E2E8F0'; clr = '#94A3B8'; txt = opt.value; }
        else if (examMode && picked) { bd = '#10B981'; }
        return (
          <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
            style={{
              padding: 'clamp(12px, 1.8vmin, 20px)',
              border: 'none', borderBottom: answered ? 'none' : `4px solid ${bd}`,
              borderRadius: 'clamp(12px, 1.6vmin, 18px)',
              background: bg, color: clr,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(18px, 2.8vmin, 28px)',
              lineHeight: 1.1, whiteSpace: 'nowrap',
              cursor: answered ? 'default' : 'pointer',
              transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
              minHeight: 44,
            }}
          >
            {useMoneyVisual && opt.denom
              ? <MoneyVisual denom={opt.denom} size="clamp(70px, 12vmin, 110px)" />
              : txt}
          </button>
        );
      })}
    </div>
  );
}

function renderQuestion(q, ctx) {
  const { theme: C } = ctx;

  if (q.type === 'Q1' || q.type === 'Q2') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2.2vmin, 24px)', width: '100%' }}>
        {renderOptions(q, ctx)}
      </div>
    );
  }

  if (q.type === 'Q3') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2.2vmin, 24px)', width: '100%' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: 'clamp(6px, 1vmin, 12px)',
          background: 'rgba(255,255,255,0.8)', borderRadius: 'clamp(16px, 2.2vmin, 24px)',
          padding: 'clamp(10px, 1.6vmin, 18px)',
          border: '1px solid #E2E8F0',
          maxWidth: 400,
        }}>
          {q.notes.map((denom, i) => (
            <MoneyVisual key={i} denom={denom} />
          ))}
        </div>
        {renderOptions(q, ctx)}
      </div>
    );
  }

  if (q.type === 'Q4' || q.type === 'Q5') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2.2vmin, 24px)', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(20px, 4vmin, 40px)', width: '100%', maxWidth: 400 }}>
          <MoneyVisual denom={q.left} />
          <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 4vmin, 40px)', color: '#CBD5E1' }}>vs</span>
          <MoneyVisual denom={q.right} />
        </div>
        {renderOptions(q, ctx)}
      </div>
    );
  }

  return null;
}

export function KenaliNilaiWangExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildRound}
      renderQuestion={renderQuestion}
      theme={theme}
      onExit={onExit}
    />
  );
}

// ── Tukar Wang Explore ──────────────────────────────────────────────────────

function sumItems(items) {
  return items.reduce((s, d) => s + d.value, 0);
}

function findDenom(id) {
  return DENOMS.find(d => d.id === id);
}

function makeCombination(target, maxItems = 4) {
  const sorted = [...DENOMS].sort((a, b) => b.value - a.value);
  const items = [];
  let remaining = target;
  for (const d of sorted) {
    while (remaining >= d.value && items.length < maxItems) {
      items.push({ ...d });
      remaining -= d.value;
    }
  }
  if (remaining > 0) {
    const coins = DENOMS.slice(0, 4).sort((a, b) => b.value - a.value);
    for (const d of coins) {
      while (remaining >= d.value && items.length < maxItems) {
        items.push({ ...d });
        remaining -= d.value;
      }
    }
  }
  return items;
}

function distinctTargets(exclude, count) {
  const candidates = [20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 300, 400, 500];
  const shuffled = shuffle(candidates.filter(v => v !== exclude));
  return shuffled.slice(0, count);
}

function randomInexactGroup(target) {
  for (let attempt = 0; attempt < 20; attempt++) {
    const t = pick(distinctTargets(target, 14));
    const items = makeCombination(t);
    if (items.length > 0 && sumItems(items) !== target) return items;
  }
  const d = pick(DENOMS);
  return [{ ...d }];
}

// Type A — Padan nilai sama
function genTypeA() {
  const pool = [
    { sen: 50, label: '50 sen', parts: ['20sen', '20sen', '10sen'] },
    { sen: 100, label: 'RM1', parts: ['50sen', '50sen'] },
    { sen: 200, label: 'RM2.00', parts: ['rm1', 'rm1'] },
    { sen: 500, label: 'RM5', parts: ['rm1', 'rm1', 'rm1', 'rm1', 'rm1'] },
    { sen: 50, label: '50 sen', parts: ['20sen', '10sen', '10sen', '10sen'] },
    { sen: 100, label: 'RM1', parts: ['50sen', '20sen', '20sen', '10sen'] },
    { sen: 20, label: '20 sen', parts: ['10sen', '10sen'] },
    { sen: 50, label: '50 sen', parts: ['50sen'] },
  ];

  const chosen = pick(pool);
  const correctItems = chosen.parts.map(id => ({ ...findDenom(id) }));
  const targetSen = sumItems(correctItems);

  const wrongOpts = [];
  const used = new Set();
  while (wrongOpts.length < 3) {
    const items = randomInexactGroup(targetSen);
    const total = sumItems(items);
    if (!used.has(total) && items.length > 0) {
      used.add(total);
      wrongOpts.push(items);
    }
  }

  const all = shuffle([correctItems, ...wrongOpts]);
  const labels = all.map(items => formatMoney(sumItems(items)));

  return {
    type: 'A',
    prompt: 'Yang manakah sama nilai dengan',
    promptBadge: chosen.label,
    targetLabel: chosen.label,
    answer: all.indexOf(correctItems).toString(),
    options: all.map((items, i) => ({
      id: i.toString(),
      items,
      total: sumItems(items),
      label: labels[i],
    })),
  };
}

// Type B — Lengkapkan tukaran
function genTypeB() {
  const pool = [
    { target: 50, targetLabel: '50 sen', given: ['20sen', '20sen'], missingId: '10sen' },
    { target: 50, targetLabel: '50 sen', given: ['20sen', '10sen'], missingId: '20sen' },
    { target: 100, targetLabel: 'RM1', given: ['50sen', '20sen', '20sen'], missingId: '10sen' },
    { target: 500, targetLabel: 'RM5', given: ['rm1', 'rm1', 'rm1', 'rm1'], missingId: 'rm1' },
    { target: 50, targetLabel: '50 sen', given: ['10sen', '10sen', '10sen'], missingId: '20sen' },
    { target: 100, targetLabel: 'RM1', given: ['50sen', '20sen', '10sen'], missingId: '20sen' },
  ];

  const validPool = pool.filter((entry) => {
    const givenTotal = sumItems(entry.given.map(id => findDenom(id))).valueOf();
    const missingDenom = findDenom(entry.missingId);
    return missingDenom && givenTotal + missingDenom.value === entry.target;
  });

  const chosen = pick(validPool.length ? validPool : pool);
  const givenItems = chosen.given.map(id => ({ ...findDenom(id) }));
  const missingDenom = findDenom(chosen.missingId);

  const wrong = shuffle(DENOMS.filter(d => d.id !== chosen.missingId)).slice(0, 3);
  const all = shuffle([{ ...missingDenom }, ...wrong.map(d => ({ ...d }))]);

  return {
    type: 'B',
    prompt: 'Pilih wang yang melengkapkan tukaran.',
    targetLabel: chosen.targetLabel,
    given: givenItems,
    answer: all.indexOf(all.find(d => d.id === chosen.missingId)).toString(),
    options: all.map((d, i) => ({
      id: i.toString(),
      denom: d,
      label: d.label,
    })),
  };
}

// Type C — Pilih cara lain
function genTypeC() {
  const pool = [
    { label: '50 sen', shown: ['50sen'], alt: ['20sen', '20sen', '10sen'] },
    { label: '50 sen', shown: ['20sen', '20sen', '10sen'], alt: ['10sen', '10sen', '10sen', '20sen'] },
    { label: 'RM1', shown: ['rm1'], alt: ['50sen', '50sen'] },
    { label: 'RM1', shown: ['50sen', '50sen'], alt: ['50sen', '20sen', '20sen', '10sen'] },
    { label: 'RM1', shown: ['50sen', '20sen', '20sen', '10sen'], alt: ['50sen', '50sen'] },
    { label: 'RM2.00', shown: ['rm1', 'rm1'], alt: ['rm1', '50sen', '50sen'] },
  ];

  const chosen = pick(pool);
  const shownItems = chosen.shown.map(id => ({ ...findDenom(id) }));
  const target = sumItems(shownItems);
  const altCorrect = chosen.alt.map(id => ({ ...findDenom(id) }));

  const wrongOpts = [];
  const used = new Set([target]);
  while (wrongOpts.length < 3) {
    const items = randomInexactGroup(target);
    const t = sumItems(items);
    if (!used.has(t) && items.length > 1) {
      used.add(t);
      wrongOpts.push(items);
    }
  }

  const raw = shuffle([altCorrect, ...wrongOpts]);
  const all = raw.map((items, i) => ({ items, total: sumItems(items), idx: i }));
  const answerIdx = all.findIndex(o => o.total === target);

  return {
    type: 'C',
    prompt: 'Yang manakah',
    promptBadge: chosen.label,
    shown: shownItems,
    targetLabel: chosen.label,
    answer: answerIdx >= 0 ? answerIdx.toString() : '0',
    options: all.map((o, i) => ({
      id: i.toString(),
      items: o.items,
      total: o.total,
      label: formatMoney(o.total),
    })),
  };
}

function buildTukarRound() {
  const as = [];
  for (let i = 0; i < 4; i++) as.push(genTypeA());
  const bs = [];
  for (let i = 0; i < 3; i++) bs.push(genTypeB());
  const cs = [];
  for (let i = 0; i < 3; i++) cs.push(genTypeC());
  return shuffle([...as, ...bs, ...cs]);
}

function renderTukarOptionButton(opt, ctx, size, showLabel = true) {
  const { answered, selected, answer, handlePick, examMode } = ctx;
  const picked = selected === opt.id;
  const isAns = opt.id === answer;
  let bg = 'rgba(255,255,255,.92)', bd = '#CBD5E1', clr = '#1E293B', lbl = opt.label;
  if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; clr = '#fff'; }
  else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; clr = '#fff'; }
  else if (answered) { bg = 'rgba(255,255,255,.5)'; bd = '#E2E8F0'; clr = '#94A3B8'; }
  else if (examMode && picked) { bd = '#10B981'; }

  const vSize = size || 'clamp(50px, 9vmin, 90px)';

  return (
    <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(4px, 0.6vmin, 8px)',
        padding: 'clamp(8px, 1.2vmin, 14px)',
        border: 'none', borderBottom: answered ? 'none' : `4px solid ${bd}`,
        borderRadius: 'clamp(12px, 1.6vmin, 18px)',
        background: bg, color: clr,
        cursor: answered ? 'default' : 'pointer',
        transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
        minHeight: 'clamp(108px, 18vmin, 160px)', minWidth: 44, width: '100%', flex: '1 1 0',
      }}
    >
      <div style={{
        display: 'flex',
        flex: '1 1 auto',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        gap: 'clamp(2px, 0.4vmin, 4px)',
      }}>
        {opt.items
          ? opt.items.map((d, j) => <MoneyVisual key={j} denom={d} size={vSize} />)
          : opt.denom
            ? <MoneyVisual denom={opt.denom} size={vSize} />
            : null
        }
      </div>
      {showLabel ? (
        <span style={{
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(14px, 2.2vmin, 22px)', lineHeight: 1.1,
        }}>
          {answered && isAns ? `${lbl} ✓` : lbl}
        </span>
      ) : null}
    </button>
  );
}

function renderTukarWangQuestion(q, ctx) {
  const { theme: C } = ctx;

  if (q.type === 'A') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 'clamp(6px, 1vmin, 12px)', width: 'min(100%, 420px)', maxWidth: 420,
        }}>
          {q.options.map(opt => renderTukarOptionButton(opt, ctx, undefined, false))}
        </div>
      </div>
    );
  }

  if (q.type === 'B') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
          gap: 'clamp(4px, 0.8vmin, 10px)',
          background: 'rgba(255,255,255,.92)', borderRadius: 'clamp(14px, 2vmin, 20px)',
          padding: 'clamp(8px, 1.4vmin, 16px)',
          border: '1px solid #E2E8F0', maxWidth: 440,
        }}>
          {q.given.map((d, i) => (
            <MoneyVisual key={i} denom={d} size="clamp(60px, 10vmin, 100px)" />
          ))}
          <span style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
            fontSize: 'clamp(20px, 3.6vmin, 32px)', color: '#94A3B8',
            margin: '0 clamp(2px, 0.4vmin, 4px)',
          }}>+ ?</span>
          <span style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
            fontSize: 'clamp(24px, 4vmin, 40px)', color: C.dark,
            marginLeft: 'clamp(8px, 1.4vmin, 16px)',
          }}>= {q.targetLabel}</span>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 'clamp(6px, 1vmin, 12px)', width: 'min(100%, 420px)', maxWidth: 420,
        }}>
          {q.options.map(opt => renderTukarOptionButton(opt, ctx, undefined, false))}
        </div>
      </div>
    );
  }

  if (q.type === 'C') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 'clamp(6px, 1vmin, 12px)', width: 'min(100%, 420px)', maxWidth: 420,
        }}>
          {q.options.map(opt => renderTukarOptionButton(opt, ctx, undefined, false))}
        </div>
      </div>
    );
  }

  return null;
}

export function TukarWangExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildTukarRound}
      renderQuestion={renderTukarWangQuestion}
      theme={theme}
      onExit={onExit}
    />
  );
}

// ── Dapat & Catat Wang Explore ──────────────────────────────────────────────

function genDapatCatatTypeA() {
  const count = randInt(2, 4);
  const picked = [];
  let total = 0;
  for (let i = 0; i < count; i++) {
    const d = pick(DENOMS);
    if (total + d.value <= 1500) {
      picked.push(d);
      total += d.value;
    } else {
      const small = pick(DENOMS.slice(0, 4));
      picked.push(small);
      total += small.value;
    }
  }
  const totalLabel = formatMoney(total);
  const distractors = new Set();
  const offsets = shuffle([-5, -10, -20, 5, 10, 20, -50, 50, -100, 100, -200, 200]);
  for (const o of offsets) {
    if (distractors.size >= 3) break;
    const v = total + o;
    if (v > 0 && v !== total) {
      const lbl = formatMoney(v);
      if (!distractors.has(lbl)) distractors.add(lbl);
    }
  }
  while (distractors.size < 3) {
    const d = pick(DENOMS);
    const lbl = d.label;
    if (lbl !== totalLabel && !distractors.has(lbl)) distractors.add(lbl);
  }
  const allLabels = shuffle([totalLabel, ...Array.from(distractors)]);
  return {
    type: 'A',
    prompt: 'Dapat wang ini. Berapa jumlahnya?',
    notes: picked,
    answer: totalLabel,
    options: allLabels.map(l => ({ id: l, value: l })),
  };
}

function genDapatCatatTypeB() {
  const count = randInt(2, 3);
  const picked = [];
  let total = 0;
  for (let i = 0; i < count; i++) {
    const d = pick(DENOMS);
    if (total + d.value <= 1500) {
      picked.push(d);
      total += d.value;
    } else {
      const small = pick(DENOMS.slice(0, 4));
      picked.push(small);
      total += small.value;
    }
  }
  const totalLabel = formatMoney(total);
  const distractors = new Set();
  const pool = shuffle(DENOMS.filter(d => d.label !== totalLabel));
  for (const d of pool) {
    if (distractors.size >= 3) break;
    if (!distractors.has(d.label)) distractors.add(d.label);
  }
  while (distractors.size < 3) {
    const lbl = formatMoney(randInt(1, 10) * 5);
    if (lbl !== totalLabel && !distractors.has(lbl)) distractors.add(lbl);
  }
  const allLabels = shuffle([totalLabel, ...Array.from(distractors)]);
  return {
    type: 'B',
    prompt: 'Catat jumlah wang ini.',
    notes: picked,
    answer: totalLabel,
    options: allLabels.map(l => ({ id: l, value: l })),
  };
}

function genDapatCatatTypeC() {
  const count = randInt(2, 3);
  const picked = [];
  let total = 0;
  for (let i = 0; i < count; i++) {
    const d = pick(DENOMS);
    if (total + d.value <= 1500) {
      picked.push(d);
      total += d.value;
    } else {
      const small = pick(DENOMS.slice(0, 4));
      picked.push(small);
      total += small.value;
    }
  }
  const totalLabel = formatMoney(total);
  const distractors = new Set();
  const offsets = shuffle([-15, -25, 15, 25, -30, 30, -40, 40]);
  for (const o of offsets) {
    if (distractors.size >= 3) break;
    const v = total + o;
    if (v > 0 && v !== total) {
      const lbl = formatMoney(v);
      if (!distractors.has(lbl)) distractors.add(lbl);
    }
  }
  while (distractors.size < 3) {
    const d = pick(DENOMS);
    const lbl = d.label;
    if (lbl !== totalLabel && !distractors.has(lbl)) distractors.add(lbl);
  }
  const allLabels = shuffle([totalLabel, ...Array.from(distractors)]);
  return {
    type: 'C',
    prompt: 'Pilih catatan yang betul.',
    notes: picked,
    answer: totalLabel,
    options: allLabels.map(l => ({ id: l, value: l })),
  };
}

function buildDapatCatatRound() {
  const as = [];
  for (let i = 0; i < 4; i++) as.push(genDapatCatatTypeA());
  const bs = [];
  for (let i = 0; i < 3; i++) bs.push(genDapatCatatTypeB());
  const cs = [];
  for (let i = 0; i < 3; i++) cs.push(genDapatCatatTypeC());
  return shuffle([...as, ...bs, ...cs]);
}

function renderDapatCatatWangQuestion(q, ctx) {
  const { theme: C } = ctx;
  const noteSize = q.notes.length >= 3 ? 'clamp(56px, 8vmin, 84px)' : 'clamp(62px, 8.6vmin, 92px)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
        gap: 'clamp(6px, 1vmin, 12px)',
        background: 'rgba(255,255,255,0.8)', borderRadius: 'clamp(16px, 2.2vmin, 24px)',
        padding: 'clamp(10px, 1.6vmin, 18px)',
        border: '1px solid #E2E8F0',
        maxWidth: 400,
      }}>
        {q.type === 'A' && (
          <div style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
            fontSize: 'clamp(14px, 2.2vmin, 22px)', color: C.dark,
            background: `${C.accent}22`, borderRadius: '8px',
            padding: '2px 10px', lineHeight: 1.2,
          }}>
            Dapat
          </div>
        )}
        {q.notes.map((denom, i) => (
          <MoneyVisual key={i} denom={denom} size={noteSize} />
        ))}
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'clamp(6px, 1vmin, 12px)', width: 'min(100%, 420px)', maxWidth: 420,
      }}>
        {q.options.map((opt) => {
          const picked = ctx.selected === opt.id;
          const isAns = opt.id === q.answer;
          let bg = '#fff', bd = '#CBD5E1', clr = '#1E293B', txt = opt.value;
          if (ctx.answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; clr = '#fff'; txt = `${opt.value} ✓`; }
          else if (ctx.answered && picked) { bg = '#EF4444'; bd = '#EF4444'; clr = '#fff'; }
          else if (ctx.answered) { bg = '#fff'; bd = '#E2E8F0'; clr = '#94A3B8'; txt = opt.value; }
          return (
            <button key={opt.id} type="button" onClick={() => ctx.handlePick(opt.id)} disabled={ctx.answered}
              style={{
                padding: 'clamp(12px, 1.8vmin, 20px)',
                border: 'none', borderBottom: ctx.answered ? 'none' : `4px solid ${bd}`,
                borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                background: bg, color: clr,
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(18px, 2.8vmin, 28px)',
                lineHeight: 1.1, whiteSpace: 'nowrap',
                cursor: ctx.answered ? 'default' : 'pointer',
                transition: 'all .15s ease',
                minHeight: 44,
              }}
            >
              {txt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function buildDapatCatatMoneySetV2(minCount = 2, maxCount = 4, maxTotal = 1500) {
  const count = randInt(minCount, maxCount);
  const picked = [];
  let total = 0;
  for (let i = 0; i < count; i++) {
    const d = pick(DENOMS);
    if (total + d.value <= maxTotal) {
      picked.push(d);
      total += d.value;
    } else {
      const small = pick(DENOMS.slice(0, 4));
      picked.push(small);
      total += small.value;
    }
  }
  return { picked, total, totalLabel: formatMoney(total) };
}

function buildMoneyLabelOptionsV2(total, totalLabel, offsets) {
  const distractors = new Set();
  for (const offset of shuffle(offsets)) {
    if (distractors.size >= 3) break;
    const candidate = total + offset;
    if (candidate > 0 && candidate !== total) distractors.add(formatMoney(candidate));
  }
  while (distractors.size < 3) {
    const d = pick(DENOMS);
    if (d.label !== totalLabel) distractors.add(d.label);
  }
  return shuffle([totalLabel, ...Array.from(distractors)]).map((label) => ({ id: label, value: label }));
}

function genDapatCatatTypePocketV2() {
  const story = pick([
    { start: 500, item: 'nasi lemak', price: 300 },
    { start: 500, item: 'air mineral', price: 200 },
    { start: 500, item: 'roti', price: 100 },
    { start: 1000, item: 'buku kecil', price: 400 },
    { start: 1000, item: 'pensel', price: 200 },
    { start: 1000, item: 'ais krim', price: 500 },
  ]);
  const total = story.start - story.price;
  const totalLabel = formatMoney(total);
  return {
    type: 'pocket',
    badge: 'Cerita Baki',
    title: 'Duit Ali',
    prompt: `Ali ada ${formatMoney(story.start)}. Beli ${story.item} ${formatMoney(story.price)}. Berapa baki?`,
    notes: [DENOMS.find((d) => d.value === story.start)],
    story: {
      label: 'Kantin Ali',
      tone: '#F97316',
      ops: ['-'],
      resultLabel: 'Baki',
      cards: [
        { label: 'Duit Ali', value: formatMoney(story.start) },
        { label: story.item, value: formatMoney(story.price) },
      ],
    },
    answer: totalLabel,
    options: buildMoneyLabelOptionsV2(total, totalLabel, [-100, 100, -200, 200, -300, 300]),
  };
}

function genDapatCatatTypeLedgerV2() {
  const { picked, total, totalLabel } = buildDapatCatatMoneySetV2(2, 3);
  const owner = pick(['Siti', 'Danish', 'Lina', 'Haziq']);
  const book = pick(['Buku Wang', 'Buku Belanja', 'Nota Simpanan']);
  return {
    type: 'ledger',
    badge: pick(['Catat Jumlah', 'Buku Wang', 'Nota Duit']),
    title: `${book} ${owner}`,
    prompt: pick([
      `Bantu ${owner} catat duit didalam buku wang.`,
      `Pilih wang yang perlu disimpan oleh ${owner}.`,
      `Bantu ${owner} catat wang yang sepadan.`,
    ]),
    notes: picked,
    answer: totalLabel,
    options: buildMoneyLabelOptionsV2(total, totalLabel, [-5, 5, -15, 15, -25, 25, -50, 50]),
  };
}

function genDapatCatatTypeEnvelopeV2() {
  const { picked, total, totalLabel } = buildDapatCatatMoneySetV2(2, 3);
  const owner = pick(['Mia', 'Amin', 'Sara', 'Irfan']);
  const source = pick(['duit raya', 'hadiah nenek', 'upah bantu ibu', 'duit tabung']);
  return {
    type: 'envelope',
    badge: pick(['Label Sampul', 'Simpan Duit', 'Sampul Wang']),
    title: pick([`Sampul ${owner}`, `Duit ${owner}`, `Simpanan ${owner}`]),
    prompt: `Pilih wang yang perlu disimpan oleh ${owner}.`,
    sourceLabel: source,
    notes: picked,
    answer: totalLabel,
    options: buildMoneyLabelOptionsV2(total, totalLabel, [-10, 10, -20, 20, -30, 30, -40, 40]),
  };
}

function genDapatCatatTypePayV2() {
  const menus = [
    {
      place: 'Kantin',
      buyer: 'Ali',
      items: [
        { item: 'roti', icon: '🍞', price: 100 },
        { item: 'air kotak', icon: '🧃', price: 200 },
        { item: 'nasi lemak', icon: '🍙', price: 300 },
      ],
    },
    {
      place: 'Gerai Sejuk',
      buyer: 'Irfan',
      items: [
        { item: 'ais krim', icon: '🍦', price: 300 },
        { item: 'air kotak', icon: '🧃', price: 200 },
        { item: 'buah epal', icon: '🍎', price: 100 },
      ],
    },
    {
      place: 'Kedai Buku',
      buyer: 'Mia',
      items: [
        { item: 'pensel', icon: '✏️', price: 200 },
        { item: 'buku', icon: '📘', price: 500 },
        { item: 'pemadam', icon: '🧽', price: 100 },
      ],
    },
  ];
  const menu = pick(menus);
  const story = pick(menu.items);
  const totalLabel = formatMoney(story.price);
  return {
    type: 'pay',
    badge: pick(['Bayar Tepat', 'Pilih Bayaran', 'Harga Barang']),
    title: menu.place,
    prompt: pick([
      `Berapa ${menu.buyer} perlu bayar untuk membeli ${story.item}?`,
      `Berapa ${menu.buyer} perlu bayar jika mahu membeli ${story.item} di ${menu.place}.?`,
      `Berapa ${menu.buyer} perlu bayar untuk membeli ${story.item}?`,
    ]),
    story: {
      label: pick(['Menu Harga', 'Lihat Menu', menu.place]),
      tone: '#0EA5E9',
      menu: menu.items,
    },
    answer: totalLabel,
    options: buildMoneyLabelOptionsV2(story.price, totalLabel, [-100, 100, -200, 200, 300, 500]),
  };
}

function genDapatCatatTypeSaveV2() {
  const story = pick([
    { person: 'Mia', giver: 'ibu', start: 100, add: 100 },
    { person: 'Sara', giver: 'ayah', start: 200, add: 300 },
    { person: 'Amin', giver: 'nenek', start: 500, add: 100 },
    { person: 'Irfan', giver: 'datuk', start: 500, add: 500 },
    { person: 'Lina', giver: 'kakak', start: 100, add: 200 },
    { person: 'Haziq', giver: 'ibu', start: 200, add: 200 },
  ]);
  const total = story.start + story.add;
  const totalLabel = formatMoney(total);
  return {
    type: 'save',
    badge: pick(['Tambah Simpan', 'Jumlah Duit', 'Duit Bertambah']),
    title: pick([`Tabung ${story.person}`, `Duit ${story.person}`, `Simpanan ${story.person}`]),
    prompt: `${story.person} ada ${formatMoney(story.start)} dan ${story.giver} memberi ${story.person} lagi ${formatMoney(story.add)}. Berapa jumlah duit ${story.person}?`,
    story: {
      label: pick(['Tabung Duit', 'Duit Bertambah', 'Simpanan Baru']),
      tone: '#10B981',
      ops: ['+'],
      resultLabel: 'Jumlah',
      cards: [
        { label: `${story.person} ada`, value: formatMoney(story.start) },
        { label: `${story.giver} beri`, value: formatMoney(story.add) },
      ],
    },
    answer: totalLabel,
    options: buildMoneyLabelOptionsV2(total, totalLabel, [-100, 100, -200, 200, -300, 300]),
  };
}

function genDapatCatatTypeReceiptV2() {
  const story = pick([
    { place: 'Kantin', buyer: 'Ali', a: ['roti', 100], b: ['air', 200] },
    { place: 'Kedai Buku', buyer: 'Mia', a: ['pensel', 200], b: ['pemadam', 100] },
    { place: 'Kedai Sekolah', buyer: 'Danish', a: ['buku', 400], b: ['pensel', 200] },
    { place: 'Gerai Buah', buyer: 'Sara', a: ['buah', 300], b: ['air', 200] },
    { place: 'Kantin', buyer: 'Amin', a: ['nasi lemak', 300], b: ['air kotak', 200] },
  ]);
  const total = story.a[1] + story.b[1];
  const totalLabel = formatMoney(total);
  return {
    type: 'receipt',
    badge: pick(['Resit Kecil', 'Jumlah Belanja', 'Catat Resit']),
    title: pick([`Resit ${story.buyer}`, story.place, 'Catat Belanja']),
    prompt: pick([
      `${story.buyer} beli ${story.a[0]} ${formatMoney(story.a[1])} dan ${story.b[0]} ${formatMoney(story.b[1])}. Catat jumlah.`,
      `Kira harga dua barang dibawah?`,
      `${story.buyer} membeli dua barang. Pilih wang perlu dibayar.`,
    ]),
    story: {
      label: pick(['Resit Kantin', 'Resit Belanja', story.place]),
      tone: '#6366F1',
      ops: ['+'],
      resultLabel: 'Jumlah',
      cards: [
        { label: story.a[0], value: formatMoney(story.a[1]) },
        { label: story.b[0], value: formatMoney(story.b[1]) },
      ],
    },
    answer: totalLabel,
    options: buildMoneyLabelOptionsV2(total, totalLabel, [-100, 100, -200, 200, -300, 300]),
  };
}

function buildDapatCatatRoundV2() {
  const ledger = [];
  for (let i = 0; i < 2; i++) ledger.push(genDapatCatatTypeLedgerV2());
  const envelope = [];
  for (let i = 0; i < 2; i++) envelope.push(genDapatCatatTypeEnvelopeV2());
  return shuffle([
    ...envelope,
    genDapatCatatTypePayV2(),
    genDapatCatatTypePayV2(),
    genDapatCatatTypeSaveV2(),
    genDapatCatatTypeSaveV2(),
    ...ledger,
    genDapatCatatTypeReceiptV2(),
    genDapatCatatTypeReceiptV2(),
  ]);
}

function renderDapatCatatPocketSceneV2(q, C, noteSize) {
  return (
    <div style={{
      position: 'relative',
      width: 'min(100%, 460px)',
      minHeight: 'clamp(130px, 20vmin, 170px)',
      borderRadius: '20px',
      background: 'linear-gradient(180deg, rgba(255,255,255,.98), rgba(255,247,214,.96))',
      border: '2px solid rgba(245,158,11,.26)',
      boxShadow: '0 22px 44px rgba(245,158,11,.16)',
      overflow: 'hidden',
      padding: 'clamp(10px, 1.4vmin, 14px)',
    }}>
      <div style={{
        position: 'absolute',
        inset: '12px 14px auto auto',
        width: 52,
        height: 52,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(253,224,71,.92), rgba(245,158,11,.18) 70%, transparent 74%)',
        opacity: 0.88,
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(16px, 2.2vmin, 22px)', color: C.dark }}>
            {q.title}
          </div>
        </div>
        <div style={{
          flexShrink: 0,
          borderRadius: 999,
          padding: '4px 10px',
          background: 'linear-gradient(180deg, #FDE68A, #F59E0B)',
          color: '#7C2D12',
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(12px, 1.7vmin, 15px)',
          boxShadow: '0 8px 16px rgba(245,158,11,.22)',
        }}>
          Dapat
        </div>
      </div>
      <div style={{ position: 'relative', marginTop: 4, minHeight: 'clamp(94px, 16vmin, 132px)' }}>
        {q.notes.map((denom, i) => (
          <div
            key={`${denom.label}-${i}`}
            className="dcw-float-note"
            style={{
              position: 'absolute',
              left: `${10 + (i * 24)}%`,
              top: `${i % 2 === 0 ? 2 : 12}px`,
              animationDelay: `${i * 0.16}s`,
              zIndex: 3,
            }}
          >
            <MoneyVisual denom={denom} size={noteSize} />
          </div>
        ))}
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          width: 'min(84%, 320px)',
          height: 'clamp(64px, 10vmin, 84px)',
          borderRadius: '24px 24px 30px 30px',
          background: 'linear-gradient(180deg, #FDBA74 0%, #F97316 38%, #C2410C 100%)',
          border: '3px solid rgba(255,255,255,.5)',
          boxShadow: 'inset 0 10px 18px rgba(255,255,255,.18), inset 0 -14px 22px rgba(124,45,18,.2), 0 18px 28px rgba(146,64,14,.22)',
          zIndex: 2,
        }}>
          <div style={{
            position: 'absolute',
            left: '8%',
            right: '8%',
            top: 9,
            height: 10,
            borderRadius: 999,
            background: 'linear-gradient(180deg, rgba(255,255,255,.82), rgba(255,255,255,.22))',
            boxShadow: '0 2px 0 rgba(154,52,18,.28)',
          }} />
          <div style={{
            position: 'absolute',
            left: '50%',
            bottom: -2,
            transform: 'translateX(-50%)',
            width: '72%',
            height: '60%',
            borderRadius: '0 0 24px 24px',
            background: 'linear-gradient(180deg, rgba(234,88,12,.28), rgba(154,52,18,.28))',
            clipPath: 'polygon(0 0, 100% 0, 86% 100%, 14% 100%)',
          }} />
        </div>
      </div>
    </div>
  );
}

function renderDapatCatatLedgerSceneV2(q, C, noteSize, answered) {
  return (
    <div style={{
      width: 'min(100%, 460px)',
      borderRadius: '20px',
      background: 'linear-gradient(180deg, rgba(255,255,255,.98), rgba(224,242,254,.98))',
      border: '2px solid rgba(14,165,233,.2)',
      boxShadow: '0 22px 42px rgba(14,165,233,.12)',
      overflow: 'hidden',
      padding: 'clamp(10px, 1.4vmin, 14px)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(16px, 2.2vmin, 22px)', color: C.dark }}>
            {q.title}
          </div>
        </div>
        <div style={{
          borderRadius: 14,
          padding: '4px 10px',
          background: 'linear-gradient(180deg, #DBEAFE, #93C5FD)',
          color: '#1D4ED8',
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(12px, 1.7vmin, 15px)',
        }}>
          Catat
        </div>
      </div>
      <div style={{
        marginTop: 'clamp(8px, 1.2vmin, 12px)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, .9fr)',
        gap: 'clamp(8px, 1.2vmin, 12px)',
        alignItems: 'stretch',
      }}>
        <div style={{
          minHeight: 94,
          borderRadius: 18,
          background: 'rgba(255,255,255,.94)',
          border: '1px solid rgba(14,165,233,.14)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(6px, 1vmin, 10px)',
          padding: 'clamp(8px, 1.2vmin, 12px)',
        }}>
          {q.notes.map((denom, i) => (
            <MoneyVisual key={`${denom.label}-${i}`} denom={denom} size={noteSize} />
          ))}
        </div>
        <div style={{
          position: 'relative',
          minHeight: 94,
          borderRadius: 18,
          background: 'linear-gradient(180deg, #FEFEFE, #EFF6FF)',
          border: '1px solid rgba(148,163,184,.32)',
          padding: '10px 12px',
          overflow: 'hidden',
        }}>
          <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(14px, 1.9vmin, 18px)', color: '#334155' }}>
            Buku Wang
          </div>
          {answered ? (
            <div style={{
              marginTop: 8,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 92,
              padding: '5px 14px',
              borderRadius: 999,
              background: '#DBEAFE',
              color: '#1D4ED8',
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(20px, 4.8vw, 28px)',
              lineHeight: 1,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.8)',
            }}>
              {q.answer}
            </div>
          ) : (
            <>
              <div className="dcw-pen-line" style={{ marginTop: 10, height: 2, background: '#BFDBFE' }} />
              <div className="dcw-pen-line" style={{ marginTop: 14, height: 2, background: '#BFDBFE', animationDelay: '.18s' }} />
              <div className="dcw-pen-line" style={{ marginTop: 14, height: 2, background: '#BFDBFE', animationDelay: '.32s' }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function renderDapatCatatEnvelopeSceneV2(q, C, noteSize, answered) {
  return (
    <div style={{
      width: 'min(100%, 460px)',
      borderRadius: '20px',
      background: 'linear-gradient(180deg, rgba(255,255,255,.99), rgba(220,252,231,.98))',
      border: '2px solid rgba(16,185,129,.2)',
      boxShadow: '0 22px 42px rgba(16,185,129,.12)',
      overflow: 'hidden',
      padding: 'clamp(10px, 1.4vmin, 14px)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(16px, 2.2vmin, 22px)', color: C.dark }}>
            {q.title}
          </div>
        </div>
        <div style={{
          borderRadius: 999,
          padding: '4px 10px',
          background: 'linear-gradient(180deg, #BBF7D0, #34D399)',
          color: '#065F46',
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(12px, 1.7vmin, 15px)',
        }}>
          Simpan
        </div>
      </div>
      <div style={{
        marginTop: 'clamp(8px, 1.2vmin, 12px)',
        minHeight: 'clamp(118px, 17vmin, 154px)',
        borderRadius: 18,
        background: 'linear-gradient(180deg, rgba(255,255,255,.9), rgba(240,253,244,.9))',
        border: '1px solid rgba(16,185,129,.16)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          left: 12,
          top: 10,
          borderRadius: 999,
          padding: '3px 9px',
          background: '#DCFCE7',
          color: '#047857',
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(11px, 1.6vmin, 14px)',
          zIndex: 4,
        }}>
          {q.sourceLabel || 'Duit raya'}
        </div>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 'clamp(26px, 3.5vmin, 34px)',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 'clamp(6px, 1vmin, 10px)',
          width: 'min(90%, 340px)',
          zIndex: 3,
        }}>
          {q.notes.map((denom, i) => (
            <div key={`${denom.label}-${i}`} className="dcw-sway-note" style={{ animationDelay: `${i * 0.18}s` }}>
              <MoneyVisual denom={denom} size={noteSize} />
            </div>
          ))}
        </div>
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          width: 'min(90%, 340px)',
          height: 'clamp(78px, 11vmin, 100px)',
          borderRadius: '18px 18px 22px 22px',
          background: 'linear-gradient(180deg, #FEF3C7, #F59E0B)',
          border: '2px solid rgba(255,255,255,.72)',
          boxShadow: '0 16px 28px rgba(217,119,6,.22)',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            clipPath: 'polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)',
            background: 'linear-gradient(180deg, #FCD34D, #F59E0B)',
          }} />
          <div style={{
            position: 'absolute',
            left: 16,
            right: 16,
            top: 10,
            height: 8,
            borderRadius: 999,
            background: 'rgba(255,255,255,.68)',
            boxShadow: '0 2px 0 rgba(146,64,14,.16)',
          }} />
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '46%',
            transform: 'translate(-50%, -50%)',
            minWidth: 118,
            padding: '7px 16px',
            borderRadius: 999,
            background: answered ? '#DCFCE7' : 'rgba(255,255,255,.9)',
            color: answered ? '#16A34A' : '#92400E',
            border: answered ? '2px solid #22C55E' : '2px dashed rgba(146,64,14,.28)',
            fontFamily: "'Baloo 2', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(16px, 2.6vmin, 24px)',
            lineHeight: 1,
            textAlign: 'center',
          }}>
            {answered ? q.answer : 'Label ?'}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderDapatCatatStorySceneV2(q, C, answered) {
  const s = q.story;
  const tone = s.tone || C.accent;
  if (s.menu) {
    return (
      <div style={{
        width: 'min(100%, 460px)',
        borderRadius: '20px',
        background: `linear-gradient(180deg, rgba(255,255,255,.99), ${tone}16)`,
        border: `2px solid ${tone}45`,
        boxShadow: `0 22px 42px ${tone}20`,
        overflow: 'hidden',
        padding: 'clamp(10px, 1.4vmin, 14px)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(16px, 2.2vmin, 22px)', color: C.dark }}>
              {q.title}
            </div>
            <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 800, fontSize: 'clamp(11px, 1.6vmin, 14px)', color: '#64748B' }}>
              {s.label}
            </div>
          </div>
          <div style={{
            flexShrink: 0,
            borderRadius: 999,
            padding: '4px 10px',
            background: `linear-gradient(180deg, #FFFFFF, ${tone}35)`,
            color: C.dark,
            fontFamily: "'Baloo 2', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(12px, 1.7vmin, 15px)',
          }}>
            {q.badge}
          </div>
        </div>
        <div style={{
          marginTop: 'clamp(8px, 1.2vmin, 12px)',
          minHeight: 'clamp(112px, 18vmin, 142px)',
          borderRadius: 18,
          background: 'rgba(255,255,255,.82)',
          border: '1px solid rgba(148,163,184,.22)',
          padding: 'clamp(8px, 1.2vmin, 12px)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(82px, 1fr))', gap: 'clamp(7px, 1.2vmin, 10px)' }}>
            {s.menu.map((item) => (
              <div key={item.item} style={{
                borderRadius: 16,
                background: 'linear-gradient(180deg, #FFFFFF, #F8FAFC)',
                border: '2px solid rgba(148,163,184,.24)',
                boxShadow: '0 10px 18px rgba(15,23,42,.06)',
                padding: 'clamp(7px, 1.2vmin, 10px) 6px',
                textAlign: 'center',
                minWidth: 0,
              }}>
                <div style={{ fontSize: 'clamp(30px, 6vmin, 44px)', lineHeight: 1 }}>{item.icon}</div>
                <div style={{ marginTop: 4, fontFamily: "'Fredoka', sans-serif", fontWeight: 800, fontSize: 'clamp(10px, 1.55vmin, 13px)', color: '#64748B', lineHeight: 1.05 }}>
                  {item.item}
                </div>
                <div style={{
                  margin: '6px auto 0',
                  width: 'fit-content',
                  borderRadius: 999,
                  padding: '2px 9px',
                  background: '#F1F5F9',
                  color: '#475569',
                  fontFamily: "'Baloo 2', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(15px, 2.5vmin, 21px)',
                  lineHeight: 1,
                }}>
                  {formatMoney(item.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{
      width: 'min(100%, 460px)',
      borderRadius: '20px',
      background: `linear-gradient(180deg, rgba(255,255,255,.99), ${tone}16)`,
      border: `2px solid ${tone}45`,
      boxShadow: `0 22px 42px ${tone}20`,
      overflow: 'hidden',
      padding: 'clamp(10px, 1.4vmin, 14px)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(16px, 2.2vmin, 22px)', color: C.dark }}>
            {q.title}
          </div>
          <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 800, fontSize: 'clamp(11px, 1.6vmin, 14px)', color: '#64748B' }}>
            {s.label}
          </div>
        </div>
        <div style={{
          flexShrink: 0,
          borderRadius: 999,
          padding: '4px 10px',
          background: `linear-gradient(180deg, #FFFFFF, ${tone}35)`,
          color: C.dark,
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(12px, 1.7vmin, 15px)',
        }}>
          {q.badge}
        </div>
      </div>
      <div style={{
        marginTop: 'clamp(8px, 1.2vmin, 12px)',
        minHeight: 'clamp(108px, 17vmin, 140px)',
        borderRadius: 18,
        background: 'rgba(255,255,255,.82)',
        border: '1px solid rgba(148,163,184,.22)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 'clamp(6px, 1vmin, 10px)',
        padding: 'clamp(8px, 1.2vmin, 12px)',
      }}>
        {s.cards.map((card, i) => (
          <React.Fragment key={`${card.label}-${i}`}>
            <div style={{
              minWidth: 'clamp(82px, 18vmin, 118px)',
              borderRadius: 16,
              background: card.icon ? `linear-gradient(180deg, #FFFFFF, ${tone}14)` : '#FFFFFF',
              border: `2px solid ${tone}35`,
              boxShadow: '0 10px 18px rgba(15,23,42,.08)',
              padding: card.icon ? '7px 10px 9px' : '8px 10px',
              textAlign: 'center',
            }}>
              {card.icon && (
                <div style={{
                  width: 'clamp(50px, 10vmin, 70px)',
                  height: 'clamp(50px, 10vmin, 70px)',
                  margin: '0 auto 4px',
                  borderRadius: 18,
                  display: 'grid',
                  placeItems: 'center',
                  background: `radial-gradient(circle at 35% 28%, #FFFFFF 0%, ${tone}22 72%)`,
                  boxShadow: `inset 0 0 0 2px ${tone}22, 0 8px 16px ${tone}18`,
                  fontSize: 'clamp(30px, 6.4vmin, 46px)',
                  lineHeight: 1,
                }}>
                  {card.icon}
                </div>
              )}
              <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 800, fontSize: 'clamp(11px, 1.7vmin, 14px)', color: '#64748B', lineHeight: 1.05 }}>
                {card.label}
              </div>
              <div style={{
                margin: card.icon ? '5px auto 0' : '3px 0 0',
                width: card.icon ? 'fit-content' : 'auto',
                borderRadius: card.icon ? 999 : 0,
                padding: card.icon ? '3px 12px' : 0,
                background: card.icon ? '#FFFFFF' : 'transparent',
                border: card.icon ? `2px solid ${tone}35` : 'none',
                fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 900,
                fontSize: card.icon ? 'clamp(18px, 3.8vmin, 28px)' : 'clamp(22px, 4.5vmin, 34px)',
                color: tone,
                lineHeight: .95,
              }}>
                {card.value}
              </div>
            </div>
            {s.ops[i] && (
              <div style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: `${tone}22`,
                color: tone,
                fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 900,
                fontSize: 28,
              }}>
                {s.ops[i]}
              </div>
            )}
          </React.Fragment>
        ))}
        <div style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          background: '#E2E8F0',
          color: '#334155',
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 900,
          fontSize: 26,
        }}>
          =
        </div>
        <div style={{
          minWidth: 'clamp(92px, 20vmin, 130px)',
          borderRadius: 18,
          background: answered ? '#DCFCE7' : `linear-gradient(180deg, #FFFFFF, ${tone}24)`,
          border: answered ? '2px solid #22C55E' : `2px dashed ${tone}88`,
          boxShadow: answered ? '0 10px 20px rgba(34,197,94,.16)' : '0 10px 18px rgba(15,23,42,.08)',
          padding: '8px 12px',
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 800, fontSize: 'clamp(11px, 1.7vmin, 14px)', color: '#64748B', lineHeight: 1.05 }}>
            {s.resultLabel}
          </div>
          <div style={{ marginTop: 3, fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 5vmin, 36px)', color: answered ? '#16A34A' : C.dark, lineHeight: .95 }}>
            {answered ? q.answer : '?'}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderDapatCatatWangQuestionV2(q, ctx) {
  const { theme: C } = ctx;
  const noteCount = q.notes?.length || 0;
  const noteSize = ctx.examMode
    ? (noteCount >= 3 ? 'clamp(40px, 8vmin, 58px)' : 'clamp(46px, 9vmin, 66px)')
    : q.type === 'envelope'
    ? (noteCount >= 3 ? 'clamp(76px, 13vmin, 88px)' : 'clamp(82px, 14vmin, 96px)')
    : q.type === 'ledger'
      ? (noteCount >= 3 ? 'clamp(68px, 12vmin, 84px)' : 'clamp(74px, 13vmin, 92px)')
      : q.type === 'pocket'
        ? (noteCount >= 3 ? 'clamp(58px, 10vmin, 76px)' : 'clamp(64px, 11vmin, 84px)')
    : (noteCount >= 3 ? 'clamp(42px, 6.2vmin, 66px)' : 'clamp(48px, 6.8vmin, 74px)');
  const scene = q.story
    ? renderDapatCatatStorySceneV2(q, C, ctx.answered)
    : q.type === 'ledger'
      ? renderDapatCatatLedgerSceneV2(q, C, noteSize, ctx.answered)
      : renderDapatCatatEnvelopeSceneV2(q, C, noteSize, ctx.answered);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(8px, 1.2vmin, 12px)', width: '100%' }}>
      <style>{`
        @keyframes dcwFloatDrop {
          0% { transform: translateY(-10px) rotate(-4deg); }
          50% { transform: translateY(8px) rotate(3deg); }
          100% { transform: translateY(-10px) rotate(-4deg); }
        }
        @keyframes dcwPenWrite {
          0% { transform: scaleX(0.2); opacity: .3; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes dcwSway {
          0% { transform: rotate(-4deg) translateY(0); }
          50% { transform: rotate(4deg) translateY(-4px); }
          100% { transform: rotate(-4deg) translateY(0); }
        }
        .dcw-float-note {
          animation: dcwFloatDrop 1.9s ease-in-out infinite;
          transform-origin: center top;
        }
        .dcw-pen-line {
          transform-origin: left center;
          animation: dcwPenWrite .7s ease forwards;
        }
        .dcw-sway-note {
          animation: dcwSway 2.1s ease-in-out infinite;
          transform-origin: center bottom;
        }
      `}</style>
      {scene}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 'clamp(6px, 1vmin, 10px)',
        width: 'min(100%, 460px)',
      }}>
        {q.options.map((opt, index) => {
          const picked = ctx.selected === opt.id;
          const isAns = opt.id === q.answer;
          let bg = 'rgba(255,255,255,.98)';
          let bd = '#CBD5E1';
          let clr = '#1E293B';
          let txt = opt.value;

          if (ctx.answered && isAns) {
            bg = '#22C55E';
            bd = '#22C55E';
            clr = '#FFFFFF';
            txt = `${opt.value} ✓`;
          } else if (ctx.answered && picked) {
            bg = '#EF4444';
            bd = '#EF4444';
            clr = '#FFFFFF';
          } else if (ctx.answered) {
            bg = 'rgba(255,255,255,.78)';
            bd = '#E2E8F0';
            clr = '#94A3B8';
          } else if (ctx.examMode && picked) {
            bd = '#10B981';
          }

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => ctx.handlePick(opt.id)}
              disabled={ctx.answered}
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: 'clamp(8px, 1.2vmin, 12px)',
                border: `2px solid ${ctx.examMode && picked ? '#CBD5E1' : bd}`,
                borderBottomWidth: ctx.answered ? 2 : 5,
                borderBottomColor: ctx.examMode && picked ? '#10B981' : bd,
                borderRadius: '16px',
                background: bg,
                color: clr,
                cursor: ctx.answered ? 'default' : 'pointer',
                transition: 'transform .16s ease, box-shadow .16s ease, border-color .16s ease',
                minHeight: 56,
                boxShadow: ctx.answered ? 'none' : '0 12px 24px rgba(15,23,42,.08)',
                transform: ctx.answered ? 'none' : `translateY(${index % 2 === 0 ? '0px' : '2px'})`,
              }}
            >
              <div style={{
                fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(20px, 2.8vmin, 28px)',
                lineHeight: 1.05,
                whiteSpace: 'nowrap',
              }}>
                {txt}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DapatCatatWangExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildDapatCatatRoundV2}
      renderQuestion={renderDapatCatatWangQuestionV2}
      theme={theme}
      onExit={onExit}
    />
  );
}

// ── Selesaikan Wang Explore ─────────────────────────────────────────────────

const BUYING_STORIES = [
  { buyer: 'Ali', item: 'roti', price: 100 },
  { buyer: 'Siti', item: 'air', price: 200 },
  { buyer: 'Mia', item: 'nasi lemak', price: 300 },
  { buyer: 'Amin', item: 'ais krim', price: 200 },
  { buyer: 'Sara', item: 'pensel', price: 100 },
  { buyer: 'Danish', item: 'buku', price: 400 },
  { buyer: 'Lina', item: 'pemadam', price: 100 },
  { buyer: 'Irfan', item: 'air kotak', price: 200 },
  { buyer: 'Haziq', item: 'roti canai', price: 300 },
  { buyer: 'Mohan', item: 'buah', price: 200 },
];

function genSelTotal() {
  const a = pick(BUYING_STORIES);
  let b = pick(BUYING_STORIES);
  while (b.buyer === a.buyer) b = pick(BUYING_STORIES);
  const total = a.price + b.price;
  const totalLabel = formatMoney(total);
  const labels = buildMoneyLabelOptionsV2(total, totalLabel, [-100, 100, -200, 200, -300, 300]);
  return {
    type: 'sel-total',
    prompt: `${a.buyer} beli ${a.item} ${formatMoney(a.price)} dan ${b.item} ${formatMoney(b.price)}. Berapa jumlah?`,
    answer: totalLabel,
    options: labels,
  };
}

function genSelPay() {
  const story = pick([
    { item: 'nasi lemak', price: 300, pay: 500 },
    { item: 'roti', price: 100, pay: 500 },
    { item: 'air', price: 200, pay: 500 },
    { item: 'buku', price: 400, pay: 1000 },
    { item: 'pensel', price: 200, pay: 500 },
    { item: 'ais krim', price: 300, pay: 500 },
    { item: 'air kotak', price: 200, pay: 1000 },
    { item: 'pemadam', price: 100, pay: 500 },
  ]);
  const change = story.pay - story.price;
  const changeLabel = formatMoney(change);
  const labels = buildMoneyLabelOptionsV2(change, changeLabel, [-100, 100, -200, 200, -300, 300]);
  return {
    type: 'sel-pay',
    prompt: `${story.item} ${formatMoney(story.price)}. Bayar ${formatMoney(story.pay)}. Berapa baki?`,
    answer: changeLabel,
    options: labels,
  };
}

function genSelChange() {
  const story = pick([
    { name: 'Ali', start: 1000, item: 'buku', price: 400 },
    { name: 'Siti', start: 500, item: 'roti', price: 100 },
    { name: 'Mia', start: 500, item: 'air', price: 200 },
    { name: 'Amin', start: 1000, item: 'nasi lemak', price: 300 },
    { name: 'Sara', start: 500, item: 'ais krim', price: 200 },
    { name: 'Danish', start: 1000, item: 'pensel', price: 200 },
    { name: 'Lina', start: 500, item: 'pemadam', price: 100 },
    { name: 'Irfan', start: 1000, item: 'air kotak', price: 200 },
  ]);
  const change = story.start - story.price;
  const changeLabel = formatMoney(change);
  const labels = buildMoneyLabelOptionsV2(change, changeLabel, [-100, 100, -200, 200, -300, 300]);
  return {
    type: 'sel-change',
    prompt: `${story.name} ada ${formatMoney(story.start)}. Beli ${story.item} ${formatMoney(story.price)}. Berapa baki?`,
    answer: changeLabel,
    options: labels,
  };
}

function genSelSave() {
  const story = pick([
    { name: 'Mia', start: 200, add: 300 },
    { name: 'Amin', start: 500, add: 100 },
    { name: 'Sara', start: 100, add: 200 },
    { name: 'Irfan', start: 500, add: 500 },
    { name: 'Lina', start: 100, add: 300 },
    { name: 'Haziq', start: 200, add: 200 },
    { name: 'Danish', start: 300, add: 200 },
    { name: 'Siti', start: 100, add: 400 },
  ]);
  const total = story.start + story.add;
  const totalLabel = formatMoney(total);
  const labels = buildMoneyLabelOptionsV2(total, totalLabel, [-100, 100, -200, 200, -300, 300]);
  return {
    type: 'sel-save',
    prompt: `${story.name} ada ${formatMoney(story.start)}. ${story.name} dapat ${formatMoney(story.add)} lagi. Berapa jumlah?`,
    answer: totalLabel,
    options: labels,
  };
}

function buildSelesaikanWangRound() {
  const qs = [];
  for (let i = 0; i < 3; i++) qs.push(genSelTotal());
  for (let i = 0; i < 2; i++) qs.push(genSelPay());
  for (let i = 0; i < 3; i++) qs.push(genSelChange());
  for (let i = 0; i < 2; i++) qs.push(genSelSave());
  return shuffle(qs);
}

function renderSelesaikanWangQuestion(q, ctx) {
  const { answered, selected, answer, handlePick, theme: C, examMode } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 20px)', width: '100%' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 'clamp(6px, 1vmin, 12px)', width: 'min(100%, 420px)', maxWidth: 420,
      }}>
        {q.options.map((opt) => {
          const picked = selected === opt.id;
          const isAns = opt.id === q.answer;
          let bg = '#fff', bd = '#CBD5E1', clr = '#1E293B', txt = opt.value;
          if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; clr = '#fff'; txt = `${opt.value} ✓`; }
          else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; clr = '#fff'; }
          else if (answered) { bg = 'rgba(255,255,255,.78)'; bd = '#E2E8F0'; clr = '#94A3B8'; txt = opt.value; }
          else if (examMode && picked) { bd = '#10B981'; }
          return (
            <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
              style={{
                padding: 'clamp(12px, 1.8vmin, 20px)',
                border: 'none', borderBottom: answered ? 'none' : `4px solid ${bd}`,
                borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                background: bg, color: clr,
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(18px, 2.8vmin, 28px)',
                lineHeight: 1.1, whiteSpace: 'nowrap',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
                minHeight: 44,
              }}
            >
              {txt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SelesaikanWangExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildSelesaikanWangRound}
      renderQuestion={renderSelesaikanWangQuestion}
      theme={theme}
      onExit={onExit}
    />
  );
}

// ── Latih Diri Wang Explore ─────────────────────────────────────────────────

function genLdIdentify() {
  const d = pick(DENOMS);
  const wrong = shuffle(DENOMS.filter((x) => x.id !== d.id)).slice(0, 3);
  const all = shuffle([d, ...wrong]);
  return {
    type: 'ld-identify',
    prompt: `Yang manakah ${d.label}?`,
    answer: d.id,
    options: all.map((x) => ({ id: x.id, value: x.label, denom: x })),
  };
}

function genLdCountTotal() {
  const count = randInt(2, 4);
  const picked = [];
  let total = 0;
  for (let i = 0; i < count; i++) {
    const d = pick(DENOMS);
    if (total + d.value <= 1500) {
      picked.push(d);
      total += d.value;
    } else {
      const small = pick(DENOMS.slice(0, 4));
      picked.push(small);
      total += small.value;
    }
  }
  const totalLabel = formatMoney(total);
  const labels = buildMoneyLabelOptionsV2(total, totalLabel, [-10, 10, -20, 20, -50, 50]);
  return {
    type: 'ld-count',
    prompt: 'Berapa jumlah wang ini?',
    notes: picked,
    answer: totalLabel,
    options: labels,
  };
}

function genLdEquivalent() {
  const pool = [
    { label: '50 sen', target: 50, shown: ['50sen'], alt1: ['20sen', '20sen', '10sen'], alt2: ['10sen', '10sen', '10sen', '20sen'] },
    { label: 'RM1', target: 100, shown: ['rm1'], alt: ['50sen', '50sen'] },
    { label: 'RM1', target: 100, shown: ['50sen', '50sen'], alt: ['50sen', '20sen', '20sen', '10sen'] },
    { label: 'RM5', target: 500, shown: ['rm5'], alt: ['rm1', 'rm1', 'rm1', 'rm1', 'rm1'] },
  ];
  const chosen = pick(pool);
  const shownItems = chosen.shown.map((id) => ({ ...findDenom(id) }));
  const shownTotal = sumItems(shownItems);
  const correctAlt = (chosen.alt || chosen.alt1).map((id) => ({ ...findDenom(id) }));
  const correctTotal = sumItems(correctAlt);

  const wrongOpts = [];
  const used = new Set([shownTotal]);
  for (let attempt = 0; attempt < 20 && wrongOpts.length < 3; attempt++) {
    const items = randomInexactGroup(shownTotal);
    const t = sumItems(items);
    if (!used.has(t) && items.length > 1) {
      used.add(t);
      wrongOpts.push(items);
    }
  }

  const raw = shuffle([correctAlt, ...wrongOpts]);
  const all = raw.map((items, i) => ({ items, total: sumItems(items), idx: i }));
  const answerIdx = all.findIndex((o) => o.total === shownTotal);

  return {
    type: 'ld-equivalent',
    prompt: 'Yang manakah sama nilai dengan',
    promptBadge: chosen.label,
    shown: shownItems,
    answer: answerIdx >= 0 ? answerIdx.toString() : '0',
    options: all.map((o, i) => ({
      id: i.toString(),
      items: o.items,
      total: o.total,
      label: formatMoney(o.total),
    })),
  };
}

function genLdRecord() {
  const { picked, total, totalLabel } = buildDapatCatatMoneySetV2(2, 3);
  const labels = buildMoneyLabelOptionsV2(total, totalLabel, [-5, 5, -15, 15, -25, 25]);
  return {
    type: 'ld-record',
    prompt: 'Catat jumlah wang ini.',
    notes: picked,
    answer: totalLabel,
    options: labels,
  };
}

function buildLatihDiriWangRound() {
  return buildUjianWangRound().slice(0, 12);
}

function renderLatihDiriWangQuestion(q, ctx) {
  if (!q.type?.startsWith('ld-')) return renderUjianWangQuestion(q, ctx);

  const { answered, selected, answer, handlePick, theme: C, examMode } = ctx;

  if (q.type === 'ld-identify') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(8px, 1.4vmin, 14px)', width: '100%', maxWidth: 360 }}>
        {q.options.map((opt) => {
          const picked = selected === opt.id;
          const isAns = opt.id === q.answer;
          let bg = '#fff', bd = '#CBD5E1';
          if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; }
          else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; }
          else if (answered) { bg = 'rgba(255,255,255,.78)'; bd = '#E2E8F0'; }
          else if (examMode && picked) { bd = '#10B981'; }
          return (
            <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
              style={{
                padding: 'clamp(12px, 1.8vmin, 20px)',
                border: 'none', borderBottom: answered ? 'none' : `4px solid ${bd}`,
                borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                background: bg, color: '#1E293B',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
                minHeight: 44,
              }}
            >
              <MoneyVisual denom={opt.denom} size="clamp(70px, 12vmin, 110px)" />
            </button>
          );
        })}
      </div>
    );
  }

  if (q.type === 'ld-count' || q.type === 'ld-record') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: 'clamp(6px, 1vmin, 12px)',
          background: 'rgba(255,255,255,0.8)', borderRadius: 'clamp(16px, 2.2vmin, 24px)',
          padding: 'clamp(10px, 1.6vmin, 18px)',
          border: '1px solid #E2E8F0', maxWidth: 400,
        }}>
          {q.notes.map((denom, i) => (
            <MoneyVisual key={i} denom={denom} />
          ))}
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(6px, 1vmin, 12px)', width: 'min(100%, 420px)', maxWidth: 420,
        }}>
          {q.options.map((opt) => {
            const picked = selected === opt.id;
            const isAns = opt.id === q.answer;
            let bg = '#fff', bd = '#CBD5E1', clr = '#1E293B', txt = opt.value;
            if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; clr = '#fff'; txt = `${opt.value} ✓`; }
            else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; clr = '#fff'; }
            else if (answered) { bg = 'rgba(255,255,255,.78)'; bd = '#E2E8F0'; clr = '#94A3B8'; txt = opt.value; }
            else if (examMode && picked) { bd = '#10B981'; }
            return (
              <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
                style={{
                  padding: 'clamp(12px, 1.8vmin, 20px)',
                  border: 'none', borderBottom: answered ? 'none' : `4px solid ${bd}`,
                  borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                  background: bg, color: clr,
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                  fontSize: 'clamp(18px, 2.8vmin, 28px)',
                  lineHeight: 1.1, whiteSpace: 'nowrap',
                  cursor: answered ? 'default' : 'pointer',
                  transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
                  minHeight: 44,
                }}
              >
                {txt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (q.type === 'ld-equivalent') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
          gap: 'clamp(4px, 0.8vmin, 10px)',
          background: 'rgba(255,255,255,.92)', borderRadius: 'clamp(14px, 2vmin, 20px)',
          padding: 'clamp(8px, 1.4vmin, 16px)',
          border: '1px solid #E2E8F0', maxWidth: 440,
        }}>
          {q.shown.map((d, i) => (
            <MoneyVisual key={i} denom={d} size="clamp(60px, 10vmin, 100px)" />
          ))}
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 'clamp(6px, 1vmin, 12px)', width: 'min(100%, 420px)', maxWidth: 420,
        }}>
          {q.options.map((opt) => {
            const picked = selected === opt.id;
            const isAns = opt.id === q.answer;
            let bg = 'rgba(255,255,255,.92)', bd = '#CBD5E1', clr = '#1E293B';
            if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; clr = '#fff'; }
            else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; clr = '#fff'; }
            else if (answered) { bg = 'rgba(255,255,255,.5)'; bd = '#E2E8F0'; clr = '#94A3B8'; }
            else if (examMode && picked) { bd = '#10B981'; }
            const vSize = 'clamp(50px, 9vmin, 90px)';
            return (
              <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(4px, 0.6vmin, 8px)',
                  padding: 'clamp(8px, 1.2vmin, 14px)',
                  border: 'none', borderBottom: answered ? 'none' : `4px solid ${bd}`,
                  borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                  background: bg, color: clr,
                  cursor: answered ? 'default' : 'pointer',
                  transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
                  minHeight: 'clamp(108px, 18vmin, 160px)', minWidth: 44, width: '100%', flex: '1 1 0',
                }}
              >
                <div style={{
                  display: 'flex', flex: '1 1 auto', width: '100%',
                  flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
                  alignContent: 'center', gap: 'clamp(2px, 0.4vmin, 4px)',
                }}>
                  {opt.items.map((d, j) => <MoneyVisual key={j} denom={d} size={vSize} />)}
                </div>
                <span style={{
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                  fontSize: 'clamp(14px, 2.2vmin, 22px)', lineHeight: 1.1,
                }}>
                  {answered && isAns ? `${opt.label} ✓` : opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}

export function LatihDiriWangExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildLatihDiriWangRound}
      renderQuestion={renderLatihDiriWangQuestion}
      theme={theme}
      onExit={onExit}
      showQuestionProgress
    />
  );
}

// ── Cabar Minda Wang Explore (formal exam, same pattern as Pecahan) ─────────

const UJIAN_WANG_TOTAL_QUESTIONS = 30;
const UJIAN_WANG_DURATION_SECONDS = 30 * 60;
const UJIAN_WANG_PASS_MARK = Math.ceil(UJIAN_WANG_TOTAL_QUESTIONS * 0.8);
const UJIAN_WANG_SECTIONS = [
  { id: 'kenali', name: 'Kenali & Nilai Wang', color: '#10B981' },
  { id: 'tukar', name: 'Tukar Wang', color: '#F59E0B' },
  { id: 'dapat-catat', name: 'Dapat & Catat Wang', color: '#6366F1' },
  { id: 'selesaikan', name: 'Selesaikan Wang', color: '#F97316' },
];

function buildUjianWangQuestionPool() {
  const pool = [];

  // Kenali & Nilai Wang questions
  for (let i = 0; i < 8; i++) {
    const qTypes = [genQ1, genQ2, genQ3, genQ4, genQ5];
    const gen = pick(qTypes);
    pool.push({ ...gen(), topicId: 'kenali' });
  }

  // Tukar Wang questions
  for (let i = 0; i < 7; i++) {
    const qTypes = [genTypeA, genTypeB, genTypeC];
    const gen = pick(qTypes);
    pool.push({ ...gen(), topicId: 'tukar' });
  }

  // Dapat & Catat Wang questions
  for (let i = 0; i < 8; i++) {
    const qTypes = [genDapatCatatTypePocketV2, genDapatCatatTypeLedgerV2, genDapatCatatTypeEnvelopeV2, genDapatCatatTypePayV2, genDapatCatatTypeSaveV2, genDapatCatatTypeReceiptV2];
    const gen = pick(qTypes);
    pool.push({ ...gen(), topicId: 'dapat-catat' });
  }

  // Selesaikan Wang questions
  for (let i = 0; i < 7; i++) {
    const qTypes = [genSelTotal, genSelPay, genSelChange, genSelSave];
    const gen = pick(qTypes);
    pool.push({ ...gen(), topicId: 'selesaikan' });
  }

  return shuffle(pool);
}

function getUjianWangSignature(question) {
  const base = question.prompt || '';
  const optStr = question.options ? question.options.map((o) => o.id || o.value).join('|') : '';
  return `${question.type || ''}:${base}:${optStr}`;
}

function buildUjianWangRound() {
  const selected = [];
  const seen = new Set();

  for (let attempts = 0; attempts < 30 && selected.length < UJIAN_WANG_TOTAL_QUESTIONS; attempts += 1) {
    const candidates = shuffle(buildUjianWangQuestionPool());

    for (const question of candidates) {
      if (selected.length >= UJIAN_WANG_TOTAL_QUESTIONS) break;
      const sig = getUjianWangSignature(question);
      if (seen.has(sig)) continue;
      seen.add(sig);
      selected.push({ ...question, topicId: question.topicId || 'kenali' });
    }
  }

  return shuffle(selected)
    .slice(0, UJIAN_WANG_TOTAL_QUESTIONS)
    .map((question, index) => ({ ...question, examId: `ujian-wang-${index}` }));
}

function renderUjianWangQuestion(q, ctx) {
  // Route to existing renderers based on type patterns
  if (q.type === 'Q1' || q.type === 'Q2') {
    return renderOptions(q, ctx);
  }
  if (q.type === 'Q3') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: 'clamp(6px, 1vmin, 12px)',
          background: 'rgba(255,255,255,0.8)', borderRadius: 'clamp(16px, 2.2vmin, 24px)',
          padding: 'clamp(10px, 1.6vmin, 18px)',
          border: '1px solid #E2E8F0', maxWidth: 400,
        }}>
          {q.notes.map((denom, i) => (
            <MoneyVisual key={i} denom={denom} />
          ))}
        </div>
        {renderOptions(q, ctx)}
      </div>
    );
  }
  if (q.type === 'Q4' || q.type === 'Q5') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(20px, 4vmin, 40px)', width: '100%', maxWidth: 400 }}>
          <MoneyVisual denom={q.left} />
          <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 4vmin, 40px)', color: '#CBD5E1' }}>vs</span>
          <MoneyVisual denom={q.right} />
        </div>
        {renderOptions(q, ctx)}
      </div>
    );
  }
  if (q.type === 'A' || q.type === 'B' || q.type === 'C') {
    return renderTukarWangQuestion(q, { ...ctx, theme: ctx.theme || { accent: '#10B981', dark: '#047857' } });
  }
  if (q.type === 'pocket' || q.type === 'ledger' || q.type === 'envelope' || q.type === 'pay' || q.type === 'save' || q.type === 'receipt') {
    return renderDapatCatatWangQuestionV2(q, ctx);
  }
  if (q.type === 'ld-identify' || q.type === 'ld-count' || q.type === 'ld-record' || q.type === 'ld-equivalent') {
    return renderLatihDiriWangQuestion(q, ctx);
  }
  if (q.type === 'sel-total' || q.type === 'sel-pay' || q.type === 'sel-change' || q.type === 'sel-save') {
    return renderSelesaikanWangQuestion(q, ctx);
  }
  return null;
}

function ujianWangAnswerText(q, value) {
  const option = q?.options?.find((opt) => opt.id === value || String(opt.value) === String(value));
  if (option?.value != null) return String(option.value);
  if (option?.label != null) return String(option.label);
  return String(value ?? '');
}

export function CabarMindaWangExplore({ data, language, theme, onExit }) {
  const C = theme || {};
  const accent = C.accent || '#10B981';
  const dark = C.dark || '#047857';
  const cd = C.cd || '#065F46';
  const scoreStorageKey = data?.scoreStorageKey || 'mt_ld_m4_scores';
  const scoreId = data?.scoreId;

  const [phase, setPhase] = useState('start');
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(null);
  const [selectedPerQ, setSelectedPerQ] = useState(null);
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [reviewMode, setReviewMode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(UJIAN_WANG_DURATION_SECONDS);
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
    const qs = buildUjianWangRound();
    const blankAnswers = new Array(qs.length).fill(null);
    setQuestions(qs);
    setAnswers(blankAnswers);
    answersRef.current = blankAnswers;
    setSelectedPerQ({});
    setShowQuestionList(false);
    setReviewMode(null);
    setCurrent(0);
    setTimeLeft(UJIAN_WANG_DURATION_SECONDS);
    setTimeUsed(0);
    recordedRef.current = false;
    setPhase('exam');
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          finishExam(answersRef.current || new Array(qs.length).fill(null), UJIAN_WANG_DURATION_SECONDS);
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
    setSelectedPerQ((currentSelected) => ({ ...(currentSelected || {}), [current]: value }));
  }

  function handleExamNext() {
    if (!questions) return;
    if (answers[current] === null) return;
    if (current + 1 >= questions.length) {
      if (!answers.every((value) => value !== null)) {
        setShowQuestionList(true);
        return;
      }
      finishExam(answersRef.current || answers, UJIAN_WANG_DURATION_SECONDS - timeLeft);
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
              {language === 'bm' ? 'Ujian Wang' : 'Money Exam'}
            </div>
            <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(14px, 2vmin, 18px)', color: '#64748B', marginTop: 4 }}>
              {language === 'bm' ? 'Modul 4 — Wang' : 'Module 4 — Money'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'clamp(8px, 1.6vmin, 16px)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: language === 'bm' ? 'Soalan: 30' : 'Questions: 30', color: accent },
              { label: language === 'bm' ? '30 Minit' : '30 Minutes', color: '#F59E0B' },
              { label: language === 'bm' ? `Lulus 80% (${UJIAN_WANG_PASS_MARK}/30)` : `Pass 80% (${UJIAN_WANG_PASS_MARK}/30)`, color: '#16A34A' },
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
            border: '1.5px solid #A7F3D0',
            boxShadow: '0 12px 28px rgba(4,120,87,.10)',
            borderRadius: 'clamp(14px, 2vmin, 20px)', padding: 'clamp(14px, 2.4vmin, 24px)',
            maxWidth: 420, width: '100%',
          }}>
            <div style={{
              fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 'clamp(13px, 1.6vmin, 16px)', color: '#475569',
              display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.2vmin, 12px)',
            }}>
              <div>{language === 'bm' ? '📌 Jawab semua 30 soalan dalam 30 minit.' : '📌 Answer all 30 questions in 30 minutes.'}</div>
              <div>{language === 'bm' ? 'Soalan diambil daripada Kenali & Nilai Wang, Tukar Wang, Dapat & Catat Wang, dan Selesaikan Wang.' : 'Questions from Know & Value Money, Exchange Money, Get & Record Money, and Solve Money.'}</div>
              <div>{language === 'bm' ? '♻️ Tiada soalan yang sama diulang dalam satu ujian.' : '♻️ No repeated questions within one exam.'}</div>
              <div>{language === 'bm' ? `🎯 Skor ${UJIAN_WANG_PASS_MARK}/30 atau lebih untuk lulus.` : `🎯 Score ${UJIAN_WANG_PASS_MARK}/30 or more to pass.`}</div>
            </div>
          </div>
          <button type="button" onClick={startExam}
            style={{
              padding: 'clamp(14px, 2vmin, 20px) clamp(32px, 5vmin, 64px)', border: 'none', borderRadius: 999,
              background: `linear-gradient(180deg, ${accent}, ${cd})`, color: '#fff', cursor: 'pointer', width: '100%', maxWidth: 360,
              fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 2.8vmin, 26px)',
              boxShadow: `0 4px 0 ${dark}, 0 14px 24px rgba(4,120,87,.24)`, WebkitTapHighlightColor: 'transparent',
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
              {renderUjianWangQuestion(q, examCtx)}
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
    const passed = correctCount >= UJIAN_WANG_PASS_MARK;
    const usedMM = Math.floor(timeUsed / 60);
    const usedSS = timeUsed % 60;
    const sectionScores = UJIAN_WANG_SECTIONS.map((section) => {
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
            background: #F8FAFC; border: 2px solid #A7F3D0; border-radius: 22px;
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
            background: linear-gradient(180deg, #ECFDF5, #F8FAFC); border: 1.5px solid #A7F3D0;
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
                <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(12px, 1.5vmin, 15px)', color: '#F59E0B' }}>
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
                                {renderUjianWangQuestion(question, reviewCtx)}
                              </div>
                              <div className="ujian-review-answer">
                                <div>Jawapan anda: <span style={{ color: ok ? '#15803D' : '#DC2626' }}>{picked ? ujianWangAnswerText(question, picked) : 'Tidak dijawab'}</span></div>
                                {!ok && <div>Jawapan betul: <span style={{ color: '#15803D' }}>{ujianWangAnswerText(question, question.answer)}</span></div>}
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
                    boxShadow: `0 4px 0 ${dark}, 0 14px 24px rgba(4,120,87,.22)`, WebkitTapHighlightColor: 'transparent',
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
