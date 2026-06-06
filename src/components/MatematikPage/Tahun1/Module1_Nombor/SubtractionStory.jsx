import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// KSSR Matematik Tahun 1 — Bidang 3: Tolak dalam lingkungan 100.
// Three mechanics (12 qs / round, 4 each, shuffled):
//   1. bergambar — emoji-dot visual, A ∈ [5,20], B ∈ [1,A-1]
//   2. simbolik  — pure equation, A ∈ [20,99], B ∈ [1,A-1]
//   3. cerita    — story problem, A ∈ [20,99], B ∈ [1,A-1]

const randInt = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const shuffle  = arr => [...arr].sort(() => Math.random() - 0.5);
const pick     = arr => arr[Math.floor(Math.random() * arr.length)];

const ITEMS = [
  { bm: 'epal',    eng: 'apples',   emoji: '🍎' },
  { bm: 'pensel',  eng: 'pencils',  emoji: '✏️' },
  { bm: 'guli',    eng: 'marbles',  emoji: '🔵' },
  { bm: 'buku',    eng: 'books',    emoji: '📚' },
  { bm: 'bunga',   eng: 'flowers',  emoji: '🌸' },
  { bm: 'permen',  eng: 'candies',  emoji: '🍬' },
  { bm: 'bola',    eng: 'balls',    emoji: '⚽' },
  { bm: 'biskut',  eng: 'biscuits', emoji: '🍪' },
];

const STORY_TEMPLATES = [
  {
    bm:  (a, b, it) => `Ada ${a} ${it.bm}. ${b} ${it.bm} diambil. Berapa tinggal?`,
    eng: (a, b, it) => `There are ${a} ${it.eng}. ${b} were taken. How many left?`,
  },
  {
    bm:  (a, b, it) => `Saya ada ${a} ${it.bm}. Saya beri ${b} kepada kawan. Berapa tinggal?`,
    eng: (a, b, it) => `I have ${a} ${it.eng}. I gave ${b} to a friend. How many left?`,
  },
  {
    bm:  (a, b, it) => `Kelas ada ${a} ${it.bm}. ${b} hilang. Berapa ada sekarang?`,
    eng: (a, b, it) => `The class has ${a} ${it.eng}. ${b} are missing. How many remain?`,
  },
  {
    bm:  (a, b, it) => `Dalam bakul ada ${a} ${it.bm}. ${b} jatuh. Berapa masih dalam bakul?`,
    eng: (a, b, it) => `A basket has ${a} ${it.eng}. ${b} fell out. How many are still inside?`,
  },
];

function makeDistractors(answer, count = 3) {
  const pool = [-3, -2, -1, 1, 2, 3, -5, 5].map(o => answer + o).filter(x => x > 0 && x !== answer);
  const unique = [...new Set(pool)];
  return shuffle(unique).slice(0, count);
}

function genBergambarQ() {
  const a = randInt(5, 20);
  const b = randInt(1, a - 1);
  const ans = a - b;
  const item = pick(ITEMS);
  return {
    type: 'bergambar',
    a, b, ans, item,
    question_bm:  `${a} − ${b} = ?`,
    question_eng: `${a} − ${b} = ?`,
    options: shuffle([ans, ...makeDistractors(ans)]).map(v => ({ key: String(v), label_bm: String(v), label_eng: String(v) })),
    answer: String(ans),
  };
}

function genSimbolikQ() {
  const a = randInt(20, 99);
  const b = randInt(1, Math.min(a - 1, 50));
  const ans = a - b;
  return {
    type: 'simbolik',
    a, b, ans,
    question_bm:  `${a} − ${b} = ?`,
    question_eng: `${a} − ${b} = ?`,
    options: shuffle([ans, ...makeDistractors(ans)]).map(v => ({ key: String(v), label_bm: String(v), label_eng: String(v) })),
    answer: String(ans),
  };
}

function genCeritaQ() {
  const a = randInt(20, 99);
  const b = randInt(5, Math.min(a - 1, 50));
  const ans = a - b;
  const item = pick(ITEMS);
  const tmpl = pick(STORY_TEMPLATES);
  return {
    type: 'cerita',
    a, b, ans, item,
    story_bm:  tmpl.bm(a, b, item),
    story_eng: tmpl.eng(a, b, item),
    question_bm:  `${a} − ${b} = ?`,
    question_eng: `${a} − ${b} = ?`,
    options: shuffle([ans, ...makeDistractors(ans)]).map(v => ({ key: String(v), label_bm: String(v), label_eng: String(v) })),
    answer: String(ans),
  };
}

function buildQuestions() {
  const qs = [];
  for (let i = 0; i < 4; i++) qs.push(genBergambarQ());
  for (let i = 0; i < 4; i++) qs.push(genSimbolikQ());
  for (let i = 0; i < 4; i++) qs.push(genCeritaQ());
  return shuffle(qs);
}

const TYPE_META = {
  bergambar: { bm: 'Tolak Bergambar', eng: 'Visual Subtraction', emoji: '🔵' },
  simbolik:  { bm: 'Tolak Nombor',    eng: 'Number Subtraction', emoji: '🔢' },
  cerita:    { bm: 'Masalah Cerita',  eng: 'Story Problem',      emoji: '📖' },
};
const emptyStats = () => ({
  bergambar: { c: 0, t: 0 },
  simbolik:  { c: 0, t: 0 },
  cerita:    { c: 0, t: 0 },
});

export default function SubtractionStory({ onBack, language = 'bm' }) {
  const [questions,  setQuestions]  = useState(() => buildQuestions());
  const [index,      setIndex]      = useState(0);
  const [selected,   setSelected]   = useState(null);
  const [score,      setScore]      = useState(0);
  const [streak,     setStreak]     = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [stats,      setStats]      = useState(emptyStats);
  const [complete,   setComplete]   = useState(false);

  const current    = questions[index];
  const isAnswered = selected !== null;
  const isCorrect  = isAnswered && selected === current?.answer;
  const isLastQ    = index + 1 >= questions.length;

  const handleSelect = useCallback((key) => {
    if (isAnswered || !current) return;
    setSelected(key);
    const correct = key === current.answer;
    setStats(s => ({
      ...s,
      [current.type]: { c: s[current.type].c + (correct ? 1 : 0), t: s[current.type].t + 1 },
    }));
    if (correct) {
      playSound('correct');
      setScore(s => s + 1);
      setStreak(s => {
        const next = s + 1;
        if (next % 4 === 0) confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        setBestStreak(b => Math.max(b, next));
        return next;
      });
    } else {
      playSound('wrong');
      setStreak(0);
    }
  }, [current, isAnswered]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (isLastQ) { setComplete(true); confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } }); return; }
    setIndex(i => i + 1);
    setSelected(null);
  }, [isAnswered, isLastQ]);

  useEffect(() => {
    if (!complete && isLastQ && isAnswered) {
      const id = setTimeout(() => {
        setComplete(true);
        confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      }, 2000);
      return () => clearTimeout(id);
    }
  }, [complete, isLastQ, isAnswered]);

  const handleReset = useCallback(() => {
    setQuestions(buildQuestions());
    setIndex(0); setSelected(null); setScore(0); setStreak(0); setBestStreak(0);
    setStats(emptyStats()); setComplete(false);
  }, []);

  if (complete) {
    const pct = Math.round((score / questions.length) * 100);
    const verdict = pct >= 90 ? { bm: 'Cemerlang!',  eng: 'Excellent!',  color: '#2E7D32' }
                  : pct >= 70 ? { bm: 'Bagus!',      eng: 'Good job!',   color: '#388E3C' }
                  : pct >= 50 ? { bm: 'Boleh lagi!', eng: 'Keep going!', color: '#F57C00' }
                              : { bm: 'Cuba lagi!',  eng: 'Try again!',  color: '#C62828' };
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <BackButton onClick={onBack} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3.5rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>📖</div>
          <h2 style={{ color: verdict.color, fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.25rem' }}>
            {language === 'bm' ? verdict.bm : verdict.eng}
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#888', marginBottom: '1rem' }}>
            {language === 'bm' ? 'Laporan Markah' : 'Score Report'}
          </p>
          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.25rem 1.5rem', border: '3px solid #FFCF80', marginBottom: '1rem', textAlign: 'center', width: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
              {language === 'bm' ? 'MARKAH KESELURUHAN' : 'TOTAL SCORE'}
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#FF9600', lineHeight: 1 }}>
              {score}<span style={{ fontSize: '1.5rem', color: '#999' }}> / {questions.length}</span>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: verdict.color, marginTop: '0.25rem' }}>{pct}%</div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.75rem' }}>
              <div style={{ background: '#FFEAD0', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#D9610B', border: '1.5px solid #FFC081' }}>
                🔥 {language === 'bm' ? 'Streak terbaik' : 'Best streak'}: {bestStreak}
              </div>
            </div>
          </div>
          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1rem 1.25rem', border: '2px solid #FFCF80', marginBottom: '1rem', width: '100%' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888', letterSpacing: '0.5px', marginBottom: '0.65rem' }}>
              {language === 'bm' ? 'PRESTASI MENGIKUT KEMAHIRAN' : 'PERFORMANCE BY SKILL'}
            </div>
            {Object.entries(TYPE_META).map(([key, meta]) => {
              const s = stats[key];
              const p = s.t ? Math.round((s.c / s.t) * 100) : 0;
              const barColor = p >= 75 ? '#4CAF50' : p >= 50 ? '#FF9600' : '#FF6B6B';
              return (
                <div key={key} style={{ marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#333' }}>
                      {meta.emoji} {language === 'bm' ? meta.bm : meta.eng}
                    </span>
                    <span style={{ fontWeight: 900, fontSize: '0.85rem', color: barColor }}>{s.c}/{s.t} · {p}%</span>
                  </div>
                  <div style={{ background: '#F5F5F5', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ background: barColor, height: '100%', width: `${p}%`, borderRadius: '999px', transition: 'width 0.4s' }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
            <button onClick={handleReset} style={{ flex: 1, padding: '0.85rem', background: '#FFFFFF', color: '#FF9600', border: '2px solid #FF9600', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
              {language === 'bm' ? 'Main Semula' : 'Play Again'}
            </button>
            <button onClick={onBack} style={{ flex: 1, padding: '0.85rem', background: '#FF9600', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 0 #D47A00' }}>
              {language === 'bm' ? 'Kembali' : 'Back'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!current) return null;
  const typeLabel = TYPE_META[current.type];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h1 style={{ color: '#FF9600', fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.1rem' }}>
              📖 {language === 'bm' ? 'Cerita Penolakan' : 'Subtraction Story'}
            </h1>
            <p style={{ color: '#888', fontSize: '0.82rem' }}>
              {language === 'bm' ? 'Tolak dalam lingkungan 100' : 'Subtraction within 100'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <div style={{ background: '#FFF6D6', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#B58800', border: '1.5px solid #FFE08A' }}>⭐ {score}</div>
            <div style={{ background: '#FFEAD0', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#D9610B', border: '1.5px solid #FFC081' }}>🔥 {streak}</div>
          </div>
        </div>
        <div style={{ background: '#FFD9A8', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#FF9600', height: '100%', borderRadius: '999px', width: `${(index / questions.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.78rem', marginTop: '0.35rem' }}>{index + 1} / {questions.length}</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFFFFF', border: '3px solid #FFCF80', borderRadius: '24px', padding: '1.25rem 1rem', textAlign: 'center', marginBottom: '1rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FF7043', marginBottom: '0.5rem', letterSpacing: '0.6px' }}>
            {typeLabel.emoji} {language === 'bm' ? typeLabel.bm.toUpperCase() : typeLabel.eng.toUpperCase()}
          </p>

          {/* Bergambar: emoji-dot visual */}
          {current.type === 'bergambar' && (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px', marginBottom: '0.75rem', padding: '0.5rem' }}>
                {Array.from({ length: current.a }).map((_, i) => (
                  <span key={i} style={{ fontSize: '1.4rem', opacity: i < current.ans ? 1 : 0.22, transition: 'opacity 0.3s' }}>
                    {current.item.emoji}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>
                {language === 'bm' ? '(Kabur = hilang/diambil)' : '(Faded = taken away)'}
              </p>
            </>
          )}

          {/* Simbolik: equation only */}
          {current.type === 'simbolik' && (
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#FF3D8B', letterSpacing: '4px', marginBottom: '0.75rem' }}>
              {current.a} − {current.b}
            </div>
          )}

          {/* Cerita: story text */}
          {current.type === 'cerita' && (
            <>
              <div style={{ textAlign: 'left', background: '#FFF8F0', border: '2px solid #FFCF80', borderRadius: '14px', padding: '0.85rem 1rem', marginBottom: '0.75rem', fontSize: '0.95rem', lineHeight: 1.6, color: '#333', fontWeight: 700 }}>
                <span style={{ fontSize: '1.4rem', marginRight: '0.4rem' }}>{current.item.emoji}</span>
                {language === 'bm' ? current.story_bm : current.story_eng}
              </div>
            </>
          )}

          <p style={{ fontSize: '1.1rem', fontWeight: 900, color: '#333' }}>
            {language === 'bm' ? current.question_bm : current.question_eng}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
          {current.options.map((opt, idx) => {
            const chosen      = selected === opt.key;
            const isAnswerOpt = opt.key === current.answer;
            const showCorrect = isAnswered && isAnswerOpt;
            const showWrong   = isAnswered && chosen && !isAnswerOpt;
            let bg = '#FFFFFF', border = '#FFCF80', color = '#333';
            if (showCorrect)     { bg = '#E8F5E9'; border = '#4CAF50'; color = '#2E7D32'; }
            else if (showWrong)  { bg = '#FFEBEE'; border = '#FF6B6B'; color = '#C62828'; }
            else if (isAnswered) { color = '#999'; }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt.key)}
                disabled={isAnswered}
                style={{
                  background: bg, border: `3px solid ${border}`, borderRadius: '14px',
                  padding: '1rem 0.5rem', fontWeight: 900, fontSize: '1.5rem', color,
                  cursor: isAnswered ? 'default' : 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                }}>
                <span>{language === 'bm' ? opt.label_bm : opt.label_eng}</span>
                {showCorrect && <span style={{ fontSize: '1rem' }}>✓</span>}
                {showWrong   && <span style={{ fontSize: '1rem' }}>✗</span>}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 700, color: isCorrect ? '#2E7D32' : '#C62828' }}>
            {isCorrect
              ? (language === 'bm' ? '✓ Betul!' : '✓ Correct!')
              : (language === 'bm' ? `Jawapan: ${current.answer}` : `Answer: ${current.answer}`)}
          </div>
        )}
      </div>

      <div style={{ flexShrink: 0, background: '#FFE9CC', borderTop: '2px solid rgba(255,150,0,0.25)', padding: '0.75rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleReset}
          style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={18} /> {language === 'bm' ? 'Mula Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#FF9600' : '#FFCF80', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #D47A00' : 'none', transition: 'background 0.2s' }}>
          {isLastQ
            ? (language === 'bm' ? 'Tamat ✓' : 'Finish ✓')
            : (language === 'bm' ? 'Seterusnya →' : 'Next →')}
        </button>
      </div>
    </div>
  );
}
