import React from 'react';
import MatematikActivityFrame from './MatematikActivityFrame';
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
  ]).map((denom) => ({ id: denom.id, value: denom.label }));

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
  ]).map((denom) => ({ id: denom.id, value: denom.label }));

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
  const { answered, selected, answer, handlePick } = ctx;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(8px, 1.4vmin, 14px)', width: '100%', maxWidth: 360 }}>
      {q.options.map((opt) => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        let bg = '#fff', bd = '#CBD5E1', clr = '#1E293B', txt = opt.value;
        if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; clr = '#fff'; txt = `${opt.value} ✓`; }
        else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; clr = '#fff'; }
        else if (answered) { bg = '#fff'; bd = '#E2E8F0'; clr = '#94A3B8'; txt = opt.value; }
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
    { target: 100, targetLabel: 'RM1', given: ['50sen', '20sen'], missingId: '20sen' },
  ];

  const chosen = pick(pool);
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
    { label: 'RM1', shown: ['50sen', '20sen', '20sen', '10sen'], alt: ['rm1'] },
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
    if (!used.has(t) && items.length > 0) {
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
  const { answered, selected, answer, handlePick } = ctx;
  const picked = selected === opt.id;
  const isAns = opt.id === answer;
  let bg = 'rgba(255,255,255,.92)', bd = '#CBD5E1', clr = '#1E293B', lbl = opt.label;
  if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; clr = '#fff'; }
  else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; clr = '#fff'; }
  else if (answered) { bg = 'rgba(255,255,255,.5)'; bd = '#E2E8F0'; clr = '#94A3B8'; }

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
      `${owner} mahu catat jumlah wang ini. Pilih catatan yang betul.`,
      `Jumlah wang ${owner} perlu ditulis dalam buku. Pilih jawapan.`,
      `Bantu ${owner} pilih catatan wang yang sepadan.`,
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
    prompt: `${owner} simpan ${source} ini. Pilih label jumlah.`,
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
      `${menu.buyer} pilih ${story.item}. Wang manakah bayaran tepat?`,
      `Di ${menu.place}, ${menu.buyer} mahu membeli ${story.item}. Berapa perlu bayar?`,
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
      `Resit menunjukkan ${story.a[0]} ${formatMoney(story.a[1])} serta ${story.b[0]} ${formatMoney(story.b[1])}. Jumlah?`,
      `Di ${story.place}, ${story.buyer} ambil dua barang. Pilih jumlah belanja.`,
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
  const noteSize = q.type === 'envelope'
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
                border: `2px solid ${bd}`,
                borderBottomWidth: ctx.answered ? 2 : 5,
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
