import React from 'react';
import MatematikActivityFrame from './MatematikActivityFrame';
import { NumOptionsGrid, WordOptionsGrid, pick, randInt, shuffle } from './explorePrimitives_shared';

const SCORE_KEY = 'mt_ld_m6_scores';
const OBJECTS = [
  { name: 'pensel', icon: '✏️', len: 8, mass: 1 },
  { name: 'buku', icon: '📘', len: 12, mass: 3 },
  { name: 'botol', icon: '🧴', len: 10, mass: 4 },
  { name: 'pemadam', icon: '🧽', len: 4, mass: 1 },
  { name: 'payung', icon: '🌂', len: 15, mass: 2 },
  { name: 'kotak', icon: '📦', len: 9, mass: 5 },
];
const LIQUIDS = [
  { name: 'gelas', icon: '🥛', ml: 200 },
  { name: 'cawan', icon: '☕', ml: 150 },
  { name: 'botol kecil', icon: '🧃', ml: 250 },
  { name: 'jag', icon: '🫙', ml: 500 },
];

const asOptions = (answer, pool, suffix = '') => shuffle([answer, ...shuffle(pool.filter(v => v !== answer)).slice(0, 3)])
  .map(v => ({ id: String(v), value: `${v}${suffix}` }));

function pairBy(prop) {
  const a = pick(OBJECTS);
  let b = pick(OBJECTS);
  while (b.name === a.name || b[prop] === a[prop]) b = pick(OBJECTS);
  return [a, b];
}

function genIdentifyMeasure() {
  const item = pick([
    ['Panjang', 'pembaris', '📏'],
    ['Jisim', 'penimbang', '⚖️'],
    ['Isi padu cecair', 'cawan penyukat', '🧪'],
  ]);
  return {
    type: 'tool',
    prompt: `Alat untuk ukur ${item[0].toLowerCase()} ialah?`,
    display: item[2],
    answer: item[1],
    options: asOptions(item[1], ['pembaris', 'penimbang', 'cawan penyukat', 'jam']),
  };
}

function genLengthCompare() {
  const [a, b] = pairBy('len');
  const askLong = Math.random() > 0.5;
  const answer = (askLong ? a.len > b.len : a.len < b.len) ? a.name : b.name;
  return {
    type: 'compare',
    prompt: askLong ? 'Objek manakah lebih panjang?' : 'Objek manakah lebih pendek?',
    items: [a, b],
    metric: 'len',
    answer,
    options: [a, b].map(o => ({ id: o.name, value: o.name })),
  };
}

function genLengthMeasure() {
  const obj = pick(OBJECTS);
  return {
    type: 'ruler',
    prompt: `Anggaran panjang ${obj.name} ialah?`,
    item: obj,
    answer: String(obj.len),
    options: asOptions(obj.len, [4, 6, 8, 9, 10, 12, 15], ' cm'),
  };
}

function genMassKnow() {
  const [a, b] = pairBy('mass');
  const answer = a.mass > b.mass ? a.name : b.name;
  return {
    type: 'balance',
    prompt: 'Objek manakah lebih berat?',
    items: [a, b],
    metric: 'mass',
    answer,
    options: [a, b].map(o => ({ id: o.name, value: o.name })),
  };
}

function genMassCompare() {
  const [a, b] = pairBy('mass');
  const askLight = Math.random() > 0.5;
  const answer = (askLight ? a.mass < b.mass : a.mass > b.mass) ? a.name : b.name;
  return {
    type: 'balance',
    prompt: askLight ? 'Objek manakah lebih ringan?' : 'Objek manakah lebih berat?',
    items: [a, b],
    metric: 'mass',
    answer,
    options: [a, b].map(o => ({ id: o.name, value: o.name })),
  };
}

function genLiquidKnow() {
  const liquid = pick(LIQUIDS);
  return {
    type: 'liquid',
    prompt: `Isi padu ${liquid.name} ialah?`,
    liquid,
    answer: String(liquid.ml),
    options: asOptions(liquid.ml, [100, 150, 200, 250, 300, 500], ' ml'),
  };
}

function genLiquidCompare() {
  const a = pick(LIQUIDS);
  let b = pick(LIQUIDS);
  while (b.name === a.name || b.ml === a.ml) b = pick(LIQUIDS);
  const askMore = Math.random() > 0.5;
  const answer = (askMore ? a.ml > b.ml : a.ml < b.ml) ? a.name : b.name;
  return {
    type: 'liquid-compare',
    prompt: askMore ? 'Bekas manakah lebih banyak air?' : 'Bekas manakah lebih sedikit air?',
    liquids: [a, b],
    answer,
    options: [a, b].map(o => ({ id: o.name, value: o.name })),
  };
}

const BANKS = {
  'kenali-ukur-objek': [genIdentifyMeasure, genLengthMeasure, genMassKnow, genLiquidKnow],
  'ukur-banding-panjang': [genLengthCompare, genLengthMeasure],
  'kenali-jisim': [genMassKnow, genIdentifyMeasure],
  'timbang-banding-jisim': [genMassCompare, genMassKnow],
  'kenali-isi-padu': [genLiquidKnow, genIdentifyMeasure],
  'sukat-banding-cecair': [genLiquidCompare, genLiquidKnow],
  'selesaikan-ukuran': [genLengthMeasure, genMassCompare, genLiquidCompare],
  'latih-diri-ukuran': [genIdentifyMeasure, genLengthCompare, genMassCompare, genLiquidCompare],
  'cabar-minda-ukuran': [genLengthMeasure, genMassCompare, genLiquidKnow, genLiquidCompare],
};

function buildRound(kind, total = 10) {
  const gens = BANKS[kind] || BANKS['kenali-ukur-objek'];
  return Array.from({ length: total }, (_, i) => ({ ...gens[i % gens.length](), qid: `${kind}-${i}-${randInt(1000, 9999)}` }));
}

function ObjectPair({ items, metric }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(14px, 4vmin, 44px)', width: '100%' }}>
      {items.map(item => (
        <div key={item.name} style={{ textAlign: 'center', minWidth: 'clamp(90px, 18vmin, 160px)' }}>
          <div style={{ fontSize: metric === 'len' ? `clamp(42px, ${item.len * 1.1}vmin, 116px)` : 'clamp(52px, 12vmin, 112px)', lineHeight: 1 }}>{item.icon}</div>
          <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, color: '#334155', fontSize: 'clamp(14px, 2.3vmin, 22px)' }}>{item.name}</div>
        </div>
      ))}
    </div>
  );
}

function RulerVisual({ item, C }) {
  return (
    <div style={{ display: 'grid', placeItems: 'center', gap: 'clamp(8px, 1.4vmin, 14px)' }}>
      <div style={{ fontSize: 'clamp(58px, 13vmin, 128px)', lineHeight: 1 }}>{item.icon}</div>
      <div style={{ width: 'clamp(190px, 42vmin, 420px)', height: 'clamp(34px, 6vmin, 58px)', borderRadius: '10px', background: '#FEF3C7', border: `3px solid ${C.accent}`, display: 'grid', gridTemplateColumns: `repeat(${item.len}, 1fr)`, overflow: 'hidden' }}>
        {Array.from({ length: item.len }, (_, i) => <span key={i} style={{ borderLeft: i ? '1px solid #D97706' : 0 }} />)}
      </div>
    </div>
  );
}

function LiquidVisual({ liquid, C }) {
  const fill = Math.max(28, Math.min(88, liquid.ml / 6));
  return (
    <div style={{ display: 'grid', placeItems: 'center', gap: 'clamp(6px, 1vmin, 12px)' }}>
      <div style={{ fontSize: 'clamp(34px, 7vmin, 72px)' }}>{liquid.icon}</div>
      <div style={{ width: 'clamp(82px, 16vmin, 140px)', height: 'clamp(108px, 22vmin, 190px)', border: `4px solid ${C.dark}`, borderTop: '0', borderRadius: '0 0 24px 24px', display: 'flex', alignItems: 'end', overflow: 'hidden', background: '#fff' }}>
        <div style={{ width: '100%', height: `${fill}%`, background: 'linear-gradient(180deg,#93C5FD,#2563EB)' }} />
      </div>
    </div>
  );
}

function renderQuestion(q, ctx) {
  const C = ctx.theme;
  const optionGrid = q.type === 'ruler' || q.type === 'liquid'
    ? <NumOptionsGrid options={q.options} answered={ctx.answered} selected={ctx.selected} answer={ctx.answer} handlePick={ctx.handlePick} theme={C} />
    : <WordOptionsGrid options={q.options} answered={ctx.answered} selected={ctx.selected} answer={ctx.answer} handlePick={ctx.handlePick} theme={C} columns={q.options.length > 2 ? 2 : 1} />;
  return (
    <>
      {q.type === 'tool' && <div style={{ fontSize: 'clamp(64px, 16vmin, 148px)', lineHeight: 1 }}>{q.display}</div>}
      {(q.type === 'compare' || q.type === 'balance') && <ObjectPair items={q.items} metric={q.metric} />}
      {q.type === 'ruler' && <RulerVisual item={q.item} C={C} />}
      {q.type === 'liquid' && <LiquidVisual liquid={q.liquid} C={C} />}
      {q.type === 'liquid-compare' && <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px, 4vmin, 50px)', width: '100%' }}>{q.liquids.map(liquid => <LiquidVisual key={liquid.name} liquid={liquid} C={C} />)}</div>}
      {optionGrid}
    </>
  );
}

function Frame({ kind, total = 10, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={() => buildRound(kind, total)}
      renderQuestion={renderQuestion}
      theme={theme}
      onExit={onExit}
      language={language}
      showQuestionProgress
      scoreId={kind}
      scoreStorageKey={SCORE_KEY}
    />
  );
}

export function KenaliUkurObjekExplore(props) { return <Frame kind="kenali-ukur-objek" {...props} />; }
export function UkurBandingPanjangExplore(props) { return <Frame kind="ukur-banding-panjang" {...props} />; }
export function KenaliJisimExplore(props) { return <Frame kind="kenali-jisim" {...props} />; }
export function TimbangBandingJisimExplore(props) { return <Frame kind="timbang-banding-jisim" {...props} />; }
export function KenaliIsiPaduExplore(props) { return <Frame kind="kenali-isi-padu" {...props} />; }
export function SukatBandingCecairExplore(props) { return <Frame kind="sukat-banding-cecair" {...props} />; }
export function SelesaikanUkuranExplore(props) { return <Frame kind="selesaikan-ukuran" {...props} />; }
export function LatihDiriUkuranExplore(props) { return <Frame kind="latih-diri-ukuran" {...props} />; }
export function CabarMindaUkuranExplore(props) { return <Frame kind="cabar-minda-ukuran" total={30} {...props} />; }
