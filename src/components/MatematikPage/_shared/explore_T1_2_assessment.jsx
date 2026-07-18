import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';
import useGamification from '../../../hooks/useGamification';
import { pick, randInt, shuffle } from './explorePrimitives_shared';
import { recordActivityScore } from './MatematikActivityFrame';
import QuestionIssueReportButton from './QuestionIssueReportButton';
import { module2CoreApi } from './explore_T1_2_core';

const { T1_M2_GENERATORS, renderT1M2Question } = module2CoreApi;

/*
 * Slice 2.F — "Selesaikan M2: Roda Nombor" (Module 2 problem-solving).
 * Wheel activity where 6 spokes radiate from a center number N.
 * Student fills in the blank for each spoke (free order).
 * All 6 spokes share the same center N each round. N ∈ [11,25].
 * No MatematikActivityFrame — custom layout with wheel SVG + card grid.
 * ════════════════════════════════════════════════════════════════════════ */

const SM2_NAMES = [['Aishah','Lili'],['Ali','Abu'],['Siti','Mira'],['Raju','Kumar']];
const SM2_NOUNS = ['bunga','buku','bola','pensel','bintang','stiker'];
const SM2_VERBS = ['pecah','hilang','jatuh','koyak','habis'];

function buildSelesaikanM2Round() {
  const N = randInt(11, 25);
  const namePair = pick(SM2_NAMES);
  const noun1 = pick(SM2_NOUNS);
  const noun2 = pick(SM2_NOUNS.filter(n => n !== noun1));
  const verb = pick(SM2_VERBS);

  const aA = randInt(1, N - 1);
  const aBcandidates = [...Array(N - 1)].map((_, i) => i + 1).filter(v => v !== aA);
  const aB = pick(aBcandidates);
  const bC = randInt(1, Math.min(20, 100 - N));
  const aD_extra = randInt(1, Math.min(30, 100 - N));
  const totalE = N + randInt(3, Math.min(20, 50 - N));
  const totalF = N + randInt(2, Math.min(15, 40 - N));

  return {
    N,
    correctAnswer: N, // the center number
    spokes: [
      { id: 0, type: 'sm2-add-addend',   a: aA,                 answer: N - aA,
        display: `${aA} + __ = ${N}` },
      { id: 1, type: 'sm2-sub-complete',  a: aB,                 answer: N - aB,
        display: `${N} = __ + ${aB}` },
      { id: 2, type: 'sm2-find-minuend',  b: bC,                 answer: N + bC,
        display: `Tolak ${bC} daripada __ ialah ${N}.` },
      { id: 3, type: 'sm2-compute-diff',  a: N + aD_extra, b: aD_extra, answer: N,
        display: `${N + aD_extra} − ${aD_extra} = __` },
      { id: 4, type: 'sm2-word-beza',     total: totalE, person1: namePair[0],
        person2: namePair[1], noun: noun1,                answer: totalE - N,
        display: `${namePair[0]} ada ${totalE} ${noun1}. ${namePair[1]} ada __ ${noun1}. Beza = ${N}.` },
      { id: 5, type: 'sm2-word-baki',     total: totalF, noun: noun2, verb,
        answer: totalF - N,
        display: `Ada ${totalF} ${noun2}. __ ${noun2} ${verb}. Baki ialah ${N}.` },
    ],
  };
}

export function SelesaikanM2Explore({ data, language, theme, onExit }) {
  const C = theme || {};
  const accent = C.accent || '#3B82F6';
  const dark = C.dark || '#1E3A8A';

  const [round, setRound] = useState(() => buildSelesaikanM2Round());
  const [solved, setSolved] = useState([false, false, false, false, false, false]);
  const [activeSpoke, setActiveSpoke] = useState(null);
  const [value, setValue] = useState('');
  const [shakeIdx, setShakeIdx] = useState(null);
  const [complete, setComplete] = useState(false);
  const wheelPaneRef = useRef(null);
  const [wheelSize, setWheelSize] = useState(240);

  useEffect(() => {
    const el = wheelPaneRef.current;
    if (!el) return undefined;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setWheelSize(Math.max(130, Math.min(width, height) - 12));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [complete]);

  const N = round.N;
  const spokes = round.spokes;
  const solvedCount = solved.filter(Boolean).length;
  const allSolved = solvedCount === 6;

  useEffect(() => {
    if (allSolved && !complete) {
      const t = setTimeout(() => {
        setComplete(true);
        recordActivityScore(data?.scoreStorageKey, data?.scoreId, 6, 6);
        playSound('streak');
        confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
        setTimeout(() => confetti({ particleCount: 140, spread: 120, startVelocity: 45, origin: { y: 0.55 } }), 250);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [allSolved, complete]);

  const handleOpen = (idx) => {
    if (solved[idx] || complete) return;
    setActiveSpoke(idx);
    setValue('');
    setShakeIdx(null);
  };

  const handleClose = () => {
    setActiveSpoke(null);
    setValue('');
    setShakeIdx(null);
  };

  const handleConfirm = () => {
    if (activeSpoke === null || value === '') return;
    const ans = parseInt(value, 10);
    const spoke = spokes[activeSpoke];
    if (ans === spoke.answer) {
      playSound('correct');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
      const next = [...solved];
      next[activeSpoke] = true;
      setSolved(next);
      setActiveSpoke(null);
      setValue('');
      setShakeIdx(null);
    } else {
      playSound('wrong');
      setShakeIdx(activeSpoke);
      setValue('');
      setTimeout(() => setShakeIdx(null), 500);
    }
  };

  const handleReset = () => {
    setRound(buildSelesaikanM2Round());
    setSolved([false, false, false, false, false, false]);
    setActiveSpoke(null);
    setValue('');
    setShakeIdx(null);
    setComplete(false);
  };

  // ── SVG wheel angles (0° at top, clockwise) ──
  const SPOKE_ANGLES = [0, 60, 120, 180, 240, 300];
  // Precomputed near-edge distance in SVG units (viewBox 0-100) for each spoke:
  // Cards at R=34.5, half-width=13, half-height=8.75.
  // Vertical spokes (0°/180°): line hits the top/bottom face → t = 34.5 - 8.75 = 25.75
  // Diagonal spokes (60°/120°/240°/300°): line hits the side face → t ≈ (34.5×cos - 13)/cos ≈ 19.5
  // Subtract 1 unit so the line stops cleanly just outside each card.
  const SPOKE_END_R = [24.75, 18.5, 18.5, 24.75, 18.5, 18.5];

  // ── Keypad press handlers ──
  const pressDigit = (d) => setValue(v => (v.length < 3 ? v + d : v));
  const pressBack = () => setValue(v => v.slice(0, -1));

  const spokeLabels = [
    'Tambah', 'Lengkap', 'Cari', 'Tolak', 'Cerita 1', 'Cerita 2',
  ];

  // ── Physical keyboard support while the question dialog is open ──
  useEffect(() => {
    if (activeSpoke === null || complete) return undefined;
    const onKey = (e) => {
      if (e.key >= '0' && e.key <= '9') { e.preventDefault(); pressDigit(e.key); }
      else if (e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); pressBack(); }
      else if (e.key === 'Enter') { e.preventDefault(); handleConfirm(); }
      else if (e.key === 'Escape') { e.preventDefault(); handleClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeSpoke, value, complete]);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', overflow: 'hidden', background: 'transparent' }}>
      <style>{`
        @keyframes sm2-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        @keyframes sm2-pop {
          0% { transform: scale(0.8); opacity: 0.5; }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .sm2-shake { animation: sm2-shake .35s ease; }
        .sm2-pop { animation: sm2-pop .4s cubic-bezier(.34,1.56,.64,1); }
        .sm2-kp-btn { transition: all 0.08s ease; -webkit-tap-highlight-color: transparent; }
        .sm2-kp-btn:active { transform: translateY(4px); border-bottom-width: 0 !important; }

        .sm2-body { position: relative; z-index: 1; flex: 1; display: flex; min-height: 0; overflow: hidden; }
        .sm2-wheel-pane { position: relative; flex: 1; overflow: hidden; min-height: 0; min-width: 0; }
        .sm2-wheel { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }

        @keyframes sm2-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sm2-dialog-in { 0% { transform: translateY(12px) scale(0.94); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        .sm2-backdrop {
          position: absolute; inset: 0; z-index: 50;
          display: flex; align-items: center; justify-content: center;
          padding: clamp(12px, 3vmin, 32px); overflow: hidden;
          background: rgba(15, 23, 42, .32); backdrop-filter: blur(4px);
          animation: sm2-backdrop-in .18s ease;
        }
        .sm2-dialog {
          position: relative; width: 100%; max-width: 360px; max-height: 100%;
          display: flex; flex-direction: column; align-items: center; gap: clamp(10px, 1.8vmin, 18px);
          background: linear-gradient(180deg, rgba(255,255,255,.98), rgba(239,248,255,.96)); border-radius: clamp(16px, 2.4vmin, 24px);
          border: 1.5px solid rgba(147,197,253,.7);
          padding: clamp(16px, 3vmin, 28px);
          box-shadow: 0 20px 50px -12px rgba(30,64,175,.26), inset 0 1px 0 rgba(255,255,255,.98);
          animation: sm2-dialog-in .26s cubic-bezier(.34,1.56,.64,1);
        }
        .sm2-keypad { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(5px, 0.9vmin, 9px); width: 100%; }
        .sm2-keypad button { height: clamp(34px, 5vmin, 48px); }
      `}</style>

      {complete ? (
        /* ── Completion overlay ── */
        <div style={{
          position: 'relative', zIndex: 1,
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 'clamp(16px, 3vmin, 32px)', padding: 'clamp(20px, 4vmin, 40px)',
        }}>
          <div style={{ fontSize: 'clamp(52px, 14vmin, 100px)', lineHeight: 1 }}>🎉</div>
          <div style={{
            fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(24px, 4.6vmin, 42px)', color: '#fff',
            textAlign: 'center', textShadow: '0 2px 18px rgba(129,140,248,.7)',
          }}>
            Tahniah! Semua 6 selesai!
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.6vmin, 16px)', width: '100%', maxWidth: 320 }}>
            <button type="button" onClick={handleReset}
              style={{
                padding: 'clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)', border: 'none', borderRadius: 999,
                background: accent, color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                boxShadow: `0 4px 0 ${dark}`, WebkitTapHighlightColor: 'transparent',
              }}>
              ↻ Main Semula
            </button>
            <button type="button" onClick={onExit}
              style={{
                padding: 'clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)', border: `2px solid ${accent}`, borderRadius: 999,
                background: '#fff', color: dark, cursor: 'pointer',
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                WebkitTapHighlightColor: 'transparent',
              }}>
              ← Selesai
            </button>
          </div>
        </div>
      ) : (
        /* ── Full-wheel body; tapping a spoke opens a question dialog ── */
        <div className="sm2-body">
          {/* Wheel pane (measured for responsive sizing) */}
          <div className="sm2-wheel-pane" ref={wheelPaneRef}>
            <div className="sm2-wheel" style={{ width: wheelSize, height: wheelSize }}>
              {/* SVG spokes + center ring */}
              <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))' }}>
                {SPOKE_ANGLES.map((angle, i) => {
                  const rad = (angle - 90) * Math.PI / 180;
                  const x1 = 50 + 14 * Math.cos(rad);
                  const y1 = 50 + 14 * Math.sin(rad);
                  const x2 = 50 + SPOKE_END_R[i] * Math.cos(rad);
                  const y2 = 50 + SPOKE_END_R[i] * Math.sin(rad);
                  const isSolved = solved[i];
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                          stroke={isSolved ? '#16A34A' : accent}
                          strokeWidth="2" strokeLinecap="round"
                          style={{ filter: isSolved ? 'drop-shadow(0 0 4px rgba(22,163,74,.45))' : `drop-shadow(0 0 4px ${accent}66)` }} />
                  );
                })}
                <circle cx="50" cy="50" r="13" fill={dark} stroke={accent} strokeWidth="2.4" style={{ filter: `drop-shadow(0 10px 18px ${accent}44)` }} />
                <circle cx="50" cy="50" r="14.5" fill="none" stroke="rgba(59,130,246,0.32)" strokeWidth="0.5" strokeDasharray="1 1.5" />
              </svg>
              {/* Center number */}
              <div style={{
                position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none',
              }}>
                <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: wheelSize * 0.13, color: '#fff', lineHeight: 1, textShadow: '0 0 14px rgba(6,182,212,.8), 0 0 4px rgba(255,255,255,.5)' }}>{N}</span>
                <span style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: Math.max(7, wheelSize * 0.035), color: '#BFDBFE', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Pusat</span>
              </div>
              {/* Spoke cards (absolute px positions) */}
              {spokes.map((spoke, i) => {
                const angle = SPOKE_ANGLES[i];
                const rad = (angle - 90) * Math.PI / 180;
                const R = wheelSize * 0.345;
                const cxPx = wheelSize / 2 + R * Math.cos(rad);
                const cyPx = wheelSize / 2 + R * Math.sin(rad);
                const cardW = wheelSize * 0.26;
                const cardH = wheelSize * 0.175;
                const isActive = activeSpoke === i;
                const isSolved = solved[i];
                const isShake = shakeIdx === i;
                let bg = 'rgba(255,255,255,.92)', bd = '#93C5FD', clr = dark;
                let boxShad = '0 12px 24px rgba(30,64,175,.12)';
                if (isSolved) {
                  bg = '#DCFCE7'; bd = '#16A34A'; clr = '#15803D';
                  boxShad = '0 12px 24px rgba(22,163,74,.16)';
                }
                if (isActive) {
                  bg = '#DBEAFE'; bd = accent;
                  boxShad = `0 0 0 3px ${accent}33, 0 16px 28px rgba(30,64,175,.20)`;
                }
                return (
                  <div key={spoke.id} style={{
                    position: 'absolute', left: cxPx, top: cyPx, width: cardW, height: cardH,
                    transform: 'translate(-50%,-50%)', zIndex: isActive ? 10 : 2,
                  }}>
                    <div
                      onClick={() => isSolved ? null : handleOpen(i)}
                      className={isShake ? 'sm2-shake' : isSolved ? 'sm2-pop' : ''}
                      style={{
                        width: '100%', height: '100%',
                        background: bg, border: `2px solid ${bd}`, borderRadius: Math.max(8, wheelSize * 0.04),
                        display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                        padding: '2px 4px', boxSizing: 'border-box',
                        cursor: isSolved ? 'default' : 'pointer',
                        boxShadow: boxShad,
                        transition: 'all .25s ease',
                        WebkitTapHighlightColor: 'transparent', overflow: 'hidden',
                        backdropFilter: 'blur(6px)',
                      }}>
                      {isSolved ? (
                        <span style={{ fontSize: cardH * 0.6, color: '#4ADE80', fontWeight: 900, textShadow: '0 0 8px rgba(74,222,128,.5)' }}>✓</span>
                      ) : (
                        <span style={{
                          fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
                          fontSize: Math.max(9, wheelSize * 0.045), color: clr, lineHeight: 1.1,
                          textShadow: isActive ? '0 0 8px rgba(244,114,182,.6)' : 'none',
                        }}>{spokeLabels[i]}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Question dialog (opens when a spoke is tapped) ── */}
            {activeSpoke !== null && (
              <div className="sm2-backdrop" onClick={handleClose}>
                <div className="sm2-dialog" onClick={(e) => e.stopPropagation()}>
                  <button type="button" onClick={handleClose} aria-label="Tutup"
                    style={{
                      position: 'absolute', top: 'clamp(8px, 1.4vmin, 14px)', right: 'clamp(8px, 1.4vmin, 14px)',
                      width: 'clamp(28px, 4vmin, 36px)', height: 'clamp(28px, 4vmin, 36px)',
                      border: 'none', borderRadius: '50%', background: '#EAF2FF', color: '#64748B',
                      cursor: 'pointer', fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
                      fontSize: 'clamp(14px, 2.2vmin, 18px)', lineHeight: 1, WebkitTapHighlightColor: 'transparent',
                    }}>✕</button>
                  <div style={{
                    fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 'clamp(13px, 2.2vmin, 17px)',
                    color: accent, textTransform: 'uppercase', letterSpacing: '.04em',
                  }}>{spokeLabels[activeSpoke]}</div>
                  <div style={{
                    fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(24px, 5vmin, 40px)',
                    color: '#1E293B', textAlign: 'center', lineHeight: 1.3,
                  }}>{spokes[activeSpoke].display}</div>
                  <div style={{
                    minWidth: 'clamp(96px, 18vmin, 140px)', height: 'clamp(48px, 6.6vmin, 66px)',
                    border: '2px solid #BFDBFE', borderRadius: 'clamp(10px, 1.4vmin, 15px)',
                    background: '#F8FBFF', boxShadow: 'inset 0 2px 6px rgba(30,64,175,.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 4.8vmin, 44px)',
                    color: value ? dark : '#94A3B8', padding: '0 16px',
                  }}>{value || '?'}</div>
                  <div className="sm2-keypad">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
                      <button key={d} type="button" className="sm2-kp-btn" onClick={() => pressDigit(String(d))}
                        style={{
                          border: 'none', borderBottom: '4px solid #2563EB', borderRadius: 'clamp(9px, 1.2vmin, 13px)',
                          background: '#3B82F6', color: '#fff', cursor: 'pointer',
                          fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                        }}>{d}</button>
                    ))}
                    <button type="button" className="sm2-kp-btn" onClick={pressBack}
                      style={{
                        border: 'none', borderBottom: '4px solid #DC2626', borderRadius: 'clamp(9px, 1.2vmin, 13px)',
                        background: '#EF4444', color: '#fff', cursor: 'pointer',
                        fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(12px, 2vmin, 18px)',
                      }}>Padam</button>
                    <button type="button" className="sm2-kp-btn" onClick={() => pressDigit('0')}
                      style={{
                        border: 'none', borderBottom: '4px solid #2563EB', borderRadius: 'clamp(9px, 1.2vmin, 13px)',
                        background: '#3B82F6', color: '#fff', cursor: 'pointer',
                        fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                      }}>0</button>
                  </div>
                  <button type="button" className="sm2-kp-btn" onClick={handleConfirm} disabled={value === ''}
                    style={{
                      width: '100%', height: 'clamp(44px, 6vmin, 58px)',
                      border: 'none', borderRadius: 'clamp(10px, 1.4vmin, 15px)',
                      borderBottom: value === '' ? '5px solid #D1D5DB' : '5px solid #15803D',
                      background: value === '' ? '#E5E7EB' : '#22C55E',
                      color: value === '' ? '#94A3B8' : '#fff',
                      cursor: value === '' ? 'not-allowed' : 'pointer',
                      fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 3vmin, 26px)',
                      WebkitTapHighlightColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}>Semak ✓</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* Drill helpers */

function renderQuestionM2All(q, ctx) {
  return renderT1M2Question(q, ctx);
}

function buildM2DrillRound(typeId) {
  const gen = T1_M2_GENERATORS[typeId];
  if (!gen) return [];
  return Array.from({ length: 10 }, (_, i) => ({ ...gen(), qid: i }));
}

const LD_SECTIONS = [
  { id: 'kenali-tambah',   name: 'Kenali Tambah',          color: '#3B82F6', types: ['kt-gabung','kt-garis','kt-perkataan','kt-ayat'] },
  { id: 'latihan-tambah',  name: 'Latihan Tambah',         color: '#6366F1', types: ['lt-mudah-m1','lt-warnai','lt-padankan','lt-bond','lt-abacus','lt-sederhana-s1','lt-sukar-k1'] },
  { id: 'kenali-tolak',    name: 'Kenali Tolak',            color: '#EF4444', types: ['kt-buang','kt-garis-sub','kt-perkataan-tolak','kt-ayat-tolak'] },
  { id: 'latihan-tolak',   name: 'Latihan Tolak',           color: '#F97316', types: ['lt-tolak-mudah-m1','lt-tolak-warnai','lt-tolak-padankan','lt-tolak-bond','lt-tolak-blok','lt-tolak-sederhana-s1','lt-tolak-sukar-k1'] },
  { id: 'cerita',          name: 'Cerita Tambah & Tolak',   color: '#16A34A', types: ['ctt-tambah','ctt-tolak','ctt-operasi','ctt-ayat'] },
  { id: 'tambah-berulang', name: 'Tambah Tolak Berulang',   color: '#14B8A6', types: ['tb-add-groups','tb-add-line','tb-add-complete','tb-sub-groups','tb-sub-line'] },
];

const LD_TYPE_LABELS = {
  'kt-gabung':            { label: 'Gabung Kumpulan',     hint: 'Kira jumlah kumpulan' },
  'kt-garis':             { label: 'Garis Nombor',        hint: 'Kira loncatan pada garis' },
  'kt-perkataan':         { label: 'Pilih Perkataan',     hint: 'Pilih tambah atau jumlah' },
  'kt-ayat':              { label: 'Lengkapkan Ayat',     hint: 'Isi tempat kosong' },
  'kt-buang':             { label: 'Buang Kumpulan',      hint: 'Kira baki kumpulan' },
  'kt-garis-sub':         { label: 'Garis Nombor',        hint: 'Kira undur pada garis' },
  'kt-perkataan-tolak':   { label: 'Pilih Perkataan',     hint: 'Pilih baki atau beza' },
  'kt-ayat-tolak':        { label: 'Lengkapkan Ayat',     hint: 'Isi tempat tolak' },
  'lt-mudah-m1':          { label: 'Mudah Tambah',        hint: 'Tambah fakta asas' },
  'lt-warnai':            { label: 'Warnai Tambah',       hint: 'Padan warna jawapan' },
  'lt-padankan':          { label: 'Padankan Tambah',     hint: 'Padan pasangan nombor' },
  'lt-bond':              { label: 'Ikatan Nombor',       hint: 'Cari bahagian ikatan' },
  'lt-abacus':            { label: 'Bina Blok',           hint: 'Bina dengan blok puluh' },
  'lt-sederhana-s1':      { label: 'Sederhana Tambah',    hint: 'Tambah tanpa mengumpul' },
  'lt-sukar-k1':          { label: 'Sukar Tambah',        hint: 'Tambah dengan mengumpul' },
  'lt-tolak-mudah-m1':    { label: 'Mudah Tolak',         hint: 'Tolak fakta asas' },
  'lt-tolak-warnai':      { label: 'Warnai Tolak',        hint: 'Padan warna jawapan' },
  'lt-tolak-padankan':    { label: 'Padankan Tolak',      hint: 'Padan pasangan nombor' },
  'lt-tolak-bond':        { label: 'Ikatan Nombor',       hint: 'Cari bahagian ikatan' },
  'lt-tolak-blok':        { label: 'Bina Blok',           hint: 'Bina dengan blok puluh' },
  'lt-tolak-sederhana-s1':{ label: 'Sederhana Tolak',     hint: 'Tolak tanpa meminjam' },
  'lt-tolak-sukar-k1':    { label: 'Sukar Tolak',         hint: 'Tolak dengan meminjam' },
  'ctt-tambah':           { label: 'Cerita Tambah',       hint: 'Selesaikan cerita tambah' },
  'ctt-tolak':            { label: 'Cerita Tolak',        hint: 'Selesaikan cerita tolak' },
  'ctt-operasi':          { label: 'Pilih Operasi',       hint: 'Tambah atau tolak?' },
  'ctt-ayat':             { label: 'Ayat Matematik',      hint: 'Pilih ayat yang betul' },
  'tb-add-groups':        { label: 'Kira Kumpulan',       hint: 'Kumpulan tambah berulang' },
  'tb-add-line':          { label: 'Garis Nombor TB',     hint: 'Loncat tambah berulang' },
  'tb-add-complete':      { label: 'Lengkapkan TB',       hint: 'Isi ayat tambah berulang' },
  'tb-sub-groups':        { label: 'Tolak Berturut',      hint: 'Kumpulan tolak berturut' },
  'tb-sub-line':          { label: 'Garis Nombor TB',     hint: 'Loncat tolak berturut' },
};

/* ════════════════════════════════════════════════════════════════════════
 * Slice 2.F — Latih Diri M2 (type picker + 10-question drill)
 * ════════════════════════════════════════════════════════════════════════ */

const SECTOR_META = {
  'kenali-tambah':   { icon: '⚡', ac: '#00d2ff', cardCls: 'ld-card-cyan'  },
  'latihan-tambah':  { icon: '⚙️', ac: '#00d2ff', cardCls: 'ld-card-cyan'  },
  'kenali-tolak':    { icon: '☄️', ac: '#ff5b7f', cardCls: 'ld-card-tolak' },
  'latihan-tolak':   { icon: '🛡️', ac: '#ff5b7f', cardCls: 'ld-card-tolak' },
  'cerita':          { icon: '🛰️', ac: '#ffd000', cardCls: 'ld-card-mixed' },
  'tambah-berulang': { icon: '🌌', ac: '#ffd000', cardCls: 'ld-card-mixed' },
};

const LD_SCORES_KEY = 'mt_ld_m2_scores';
const LD_PASS_RATIO = 0.8; // 8/10

function ldLoadScores() {
  try { return JSON.parse(localStorage.getItem(LD_SCORES_KEY) || '{}'); }
  catch { return {}; }
}

function ldRecordScore(typeId, correct, total) {
  const scores = ldLoadScores();
  const existing = scores[typeId];
  if (!existing || correct > existing.best) {
    const next = { ...scores, [typeId]: { best: correct, total, passed: correct / total >= LD_PASS_RATIO } };
    try { localStorage.setItem(LD_SCORES_KEY, JSON.stringify(next)); } catch {}
    return next;
  }
  return scores;
}

export function LatihDiriM2Explore({ data, language, theme, onExit }) {
  const C = theme || {};
  const accent = C.accent || '#3B82F6';
  const dark = C.dark || '#1E3A8A';
  const cd = C.cd || '#1D4ED8';
  const initialType = data?.initialType;

  const { xp, streak, loading: gLoading } = useGamification('mt');
  const [selectedType, setSelectedType] = useState(initialType || null);
  const [scores, setScores] = useState(ldLoadScores);

  useEffect(() => {
    if (initialType) setSelectedType(initialType);
  }, [initialType]);

  const handleScoreRecord = (typeId, correct, total) => {
    const updated = ldRecordScore(typeId, correct, total);
    setScores(updated);
  };

  if (!selectedType) {
    /* ── Phase A: Mission Control Grid ── */
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%' }}>
        <style>{`
          .ld-modules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
            gap: 10px;
          }

          /* ── Base card ── */
          .ld-module-card {
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            border-radius: 14px; border: 1px solid;
            padding: 12px 14px; display: flex; flex-direction: column;
            justify-content: space-between; min-height: 85px; cursor: pointer;
            transition: transform .22s cubic-bezier(.4,0,.2,1),
                        box-shadow .22s cubic-bezier(.4,0,.2,1),
                        border-color .22s ease, background .22s ease;
            -webkit-tap-highlight-color: transparent;
          }
          .ld-module-card:active { transform: scale(.96) !important; }

          /* ── Permanent glow — always-on resting state ── */
          .ld-card-cyan {
            background: rgba(0,22,48,.72);
            border-color: rgba(0,210,255,.42);
            box-shadow: 0 0 16px rgba(0,210,255,.26), inset 0 0 20px rgba(0,210,255,.07);
          }
          .ld-card-tolak {
            background: rgba(40,8,22,.72);
            border-color: rgba(255,91,127,.42);
            box-shadow: 0 0 16px rgba(255,91,127,.26), inset 0 0 20px rgba(255,91,127,.07);
          }
          .ld-card-mixed {
            background: rgba(36,30,0,.72);
            border-color: rgba(255,208,0,.42);
            box-shadow: 0 0 16px rgba(255,208,0,.26), inset 0 0 20px rgba(255,208,0,.07);
          }

          /* ── Card text ── */
          .ld-module-name {
            font-size: clamp(13px,1.8vmin,15px); font-weight: 600; color: #fff;
            margin: 0 0 4px; line-height: 1.2;
            font-family: 'Space Grotesk', 'Baloo 2', sans-serif;
          }
          .ld-module-desc {
            font-size: clamp(10px,1.3vmin,12px); color: #b0b3d6; margin: 0 0 8px;
            line-height: 1.3; font-family: 'Fredoka', sans-serif; flex: 1;
          }

          /* ── MULA button — permanent colored + glow ── */
          .ld-btn-launch {
            cursor: pointer;
            font-size: 11px; font-weight: 700; text-transform: uppercase;
            padding: 5px 14px; border-radius: 8px; letter-spacing: .6px;
            transition: all .2s ease; font-family: 'Baloo 2', sans-serif;
            position: relative; overflow: hidden; flex-shrink: 0;
          }
          .ld-btn-launch::after {
            content: '';
            position: absolute; top: 0; left: -120%; width: 60%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,.32), transparent);
            animation: ld-shine 2.8s ease-in-out infinite;
          }
          @keyframes ld-shine {
            0%   { left: -120%; }
            45%, 100% { left: 170%; }
          }
          @media (prefers-reduced-motion: reduce) {
            .ld-btn-launch::after { animation: none; }
          }

          .ld-card-cyan .ld-btn-launch {
            background: rgba(0,210,255,.22);
            border: 1px solid rgba(0,210,255,.6);
            color: #00d2ff;
            box-shadow: 0 0 11px rgba(0,210,255,.42);
          }
          .ld-card-tolak .ld-btn-launch {
            background: rgba(255,91,127,.22);
            border: 1px solid rgba(255,91,127,.6);
            color: #ff5b7f;
            box-shadow: 0 0 11px rgba(255,91,127,.42);
          }
          .ld-card-mixed .ld-btn-launch {
            background: rgba(255,208,0,.22);
            border: 1px solid rgba(255,208,0,.6);
            color: #ffd000;
            box-shadow: 0 0 11px rgba(255,208,0,.42);
          }

          /* ── Score badge ── */
          .ld-card-footer {
            display: flex; align-items: center; justify-content: space-between; gap: 6px;
          }
          .ld-score-badge {
            display: inline-flex; align-items: center; gap: 7px;
            padding: 4px 13px 4px 5px; border-radius: 999px; white-space: nowrap;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.12);
          }
          /* status icon chip */
          .ld-score-icon {
            display: inline-flex; align-items: center; justify-content: center;
            width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0;
            font-size: 10px; font-weight: 900; line-height: 1;
            font-family: 'Space Grotesk', sans-serif;
          }
          .ld-score-meta { display: flex; flex-direction: column; line-height: 1; }
          .ld-score-tag {
            font-family: 'Fredoka', sans-serif; font-size: 7px; font-weight: 700;
            letter-spacing: .7px; text-transform: uppercase; opacity: .75; margin-bottom: 2px;
          }
          .ld-score-num {
            font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 800;
            letter-spacing: -.2px;
          }
          .ld-score-num small { font-size: 9px; font-weight: 600; opacity: .6; margin-left: 2px; }

          .ld-score-badge.unplayed {
            background: linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.04));
            border: 1px solid rgba(255,255,255,.16); color: rgba(255,255,255,.62);
          }
          .ld-score-badge.unplayed .ld-score-icon {
            background: rgba(255,255,255,.12); color: rgba(255,255,255,.6);
          }
          .ld-score-badge.passed {
            background: linear-gradient(180deg, rgba(34,197,94,.26), rgba(34,197,94,.12));
            border: 1px solid rgba(74,222,128,.5); color: #6ee7a0;
            box-shadow: 0 0 12px rgba(34,197,94,.3), inset 0 1px 0 rgba(255,255,255,.14);
          }
          .ld-score-badge.passed .ld-score-icon {
            background: #22c55e; color: #052e16;
            box-shadow: 0 0 8px rgba(74,222,128,.7);
          }
          .ld-score-badge.failed {
            background: linear-gradient(180deg, rgba(239,68,68,.26), rgba(239,68,68,.12));
            border: 1px solid rgba(248,113,113,.5); color: #fca5a5;
            box-shadow: 0 0 12px rgba(239,68,68,.28), inset 0 1px 0 rgba(255,255,255,.14);
          }
          .ld-score-badge.failed .ld-score-icon {
            background: #ef4444; color: #fff;
            box-shadow: 0 0 8px rgba(248,113,113,.7);
          }

          /* ── New hover — stronger glow + lift ── */
          @media (hover: hover) {
            .ld-card-cyan:hover {
              border-color: #00d2ff;
              box-shadow: 0 0 26px rgba(0,210,255,.6), 0 0 60px rgba(0,210,255,.2),
                          inset 0 0 30px rgba(0,210,255,.13);
              transform: translateY(-4px);
              background: rgba(0,34,64,.9);
            }
            .ld-card-cyan:hover .ld-btn-launch {
              background: #00d2ff; border-color: #00d2ff;
              color: #011820; box-shadow: 0 0 22px rgba(0,210,255,.85);
            }

            .ld-card-tolak:hover {
              border-color: #ff5b7f;
              box-shadow: 0 0 26px rgba(255,91,127,.6), 0 0 60px rgba(255,91,127,.2),
                          inset 0 0 30px rgba(255,91,127,.13);
              transform: translateY(-4px);
              background: rgba(54,10,26,.9);
            }
            .ld-card-tolak:hover .ld-btn-launch {
              background: #ff5b7f; border-color: #ff5b7f;
              color: #fff; box-shadow: 0 0 22px rgba(255,91,127,.85);
            }

            .ld-card-mixed:hover {
              border-color: #ffd000;
              box-shadow: 0 0 26px rgba(255,208,0,.6), 0 0 60px rgba(255,208,0,.2),
                          inset 0 0 30px rgba(255,208,0,.13);
              transform: translateY(-4px);
              background: rgba(50,42,0,.9);
            }
            .ld-card-mixed:hover .ld-btn-launch {
              background: #ffd000; border-color: #ffd000;
              color: #1a1200; box-shadow: 0 0 22px rgba(255,208,0,.85);
            }
          }
          .ld-module-card,
          .ld-card-cyan,
          .ld-card-tolak,
          .ld-card-mixed {
            background:
              linear-gradient(180deg, rgba(255,255,255,.96), rgba(239,248,255,.90)),
              radial-gradient(circle at 50% 0%, color-mix(in srgb, ${accent} 16%, transparent), transparent 68%) !important;
            border: 1.5px solid color-mix(in srgb, ${accent} 30%, #D8E8FF) !important;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.98), 0 12px 26px rgba(30,64,175,.12) !important;
          }
          .ld-module-name {
            color: #1E293B !important;
            font-family: 'Baloo 2', sans-serif !important;
            font-weight: 900 !important;
          }
          .ld-module-desc {
            color: #5B6B7B !important;
            font-weight: 600 !important;
          }
          .ld-picker-stats { display: none !important; }
          .ld-btn-launch {
            background: linear-gradient(180deg, ${accent}, ${cd}) !important;
            border: 1px solid rgba(255,255,255,.34) !important;
            color: #fff !important;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.34), 0 3px 0 ${dark}, 0 10px 18px rgba(59,130,246,.22) !important;
          }
          .ld-score-badge.unplayed {
            background: #F1F5F9 !important;
            border-color: #D9E5F6 !important;
            color: #64748B !important;
            box-shadow: none !important;
          }
          .ld-score-badge.unplayed .ld-score-icon {
            background: #CBD5E1 !important;
            color: #fff !important;
          }
          .ld-score-badge.passed {
            background: #DCFCE7 !important;
            border-color: #86EFAC !important;
            color: #15803D !important;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.7) !important;
          }
          .ld-score-badge.failed {
            background: #FEE2E2 !important;
            border-color: #FCA5A5 !important;
            color: #B91C1C !important;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.7) !important;
          }
          @media (hover: hover) {
            .ld-module-card:hover {
              background: #fff !important;
              border-color: ${accent} !important;
              box-shadow: inset 0 1px 0 rgba(255,255,255,.98), 0 16px 34px rgba(30,64,175,.18) !important;
              transform: translateY(-3px);
            }
            .ld-module-card:hover .ld-btn-launch {
              background: linear-gradient(180deg, color-mix(in srgb, ${accent} 92%, white), ${cd}) !important;
              box-shadow: inset 0 1px 0 rgba(255,255,255,.36), 0 4px 0 ${dark}, 0 14px 24px rgba(59,130,246,.30) !important;
            }
          }
        `}</style>
        <div style={{ flex: 1, overflow: 'auto', padding: 'clamp(10px,2vmin,20px)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {/* Title row + score badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: 'clamp(17px,2.4vmin,23px)', color: dark }}>
                Pilih Jenis Latihan
              </div>
              {!gLoading && (
                <div className="ld-picker-stats" style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                  {[
                    { icon: '⭐', val: xp,     c: '#FFD23F', b: 'rgba(255,210,63,.4)', g: 'rgba(255,210,63,.18)' },
                    { icon: '⚡', val: streak, c: '#2DE2E6', b: 'rgba(45,226,230,.4)',  g: 'rgba(45,226,230,.18)' },
                  ].map(({ icon, val, c, b, g }) => (
                    <div key={icon} style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                      fontSize: 'clamp(12px,1.6vmin,14px)', color: c,
                      padding: '5px 11px', borderRadius: 10,
                      background: 'rgba(20,18,52,.6)', border: `1px solid ${b}`,
                      boxShadow: `0 0 12px ${g}`,
                    }}>{icon} {val}</div>
                  ))}
                </div>
              )}
            </div>
            {/* Sector sections */}
            {LD_SECTIONS.map((section, si) => {
              const meta = SECTOR_META[section.id] || { icon: '▶', ac: section.color, cardCls: 'ld-card-cyan' };
              return (
                <div key={section.id} style={{ marginBottom: si < LD_SECTIONS.length - 1 ? 26 : 8 }}>
                  {/* Sector title with gradient line */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, paddingLeft: 2 }}>
                    <span style={{
                      fontFamily: "'Baloo 2',sans-serif", fontWeight: 700,
                      fontSize: 'clamp(12px,1.5vmin,14px)', textTransform: 'uppercase',
                      letterSpacing: 2, color: meta.ac, whiteSpace: 'nowrap',
                    }}>{meta.icon} {section.name}</span>
                    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${meta.ac}66, transparent)` }} />
                  </div>
                  {/* Card grid */}
                  <div className="ld-modules-grid">
                    {section.types.map(typeId => {
                      const info = LD_TYPE_LABELS[typeId];
                      return (
                        <div key={typeId} className={`ld-module-card ${meta.cardCls}`} onClick={() => setSelectedType(typeId)}>
                          <div>
                            <p className="ld-module-name">{info.label}</p>
                            <p className="ld-module-desc">{info.hint}</p>
                          </div>
                          <div className="ld-card-footer">
                            {(() => {
                              const s = scores[typeId];
                              const status = !s ? 'unplayed' : (s.passed ? 'passed' : 'failed');
                              const icon = !s ? '–' : (s.passed ? '✓' : '✗');
                              const tag = !s ? 'Score' : (s.passed ? 'Lulus' : 'Gagal');
                              const best = s ? s.best : 0;
                              const total = s ? s.total : 10;
                              return (
                                <span className={`ld-score-badge ${status}`}>
                                  <span className="ld-score-icon">{icon}</span>
                                  <span className="ld-score-meta">
                                    <span className="ld-score-tag">{tag}</span>
                                    <span className="ld-score-num">{best}<small>/ {total}</small></span>
                                  </span>
                                </span>
                              );
                            })()}
                            <button type="button" className="ld-btn-launch">Mula</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <M2DrillScreen
      selectedType={selectedType}
      language={language}
      theme={theme}
      onBackToPicker={initialType ? onExit : () => setSelectedType(null)}
      onScoreRecord={handleScoreRecord}
      scoreId={data?.scoreId}
    />
  );
}

function M2DrillScreen({ selectedType, language, theme, onBackToPicker, onScoreRecord, scoreId }) {
  const C = theme || {};
  const accent = C.accent || '#3B82F6';
  const dark = C.dark || '#1E3A8A';
  const cd = C.cd || '#1D4ED8';

  const info = LD_TYPE_LABELS[selectedType];

  const [questions, setQuestions] = useState(() => buildM2DrillRound(selectedType));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [streak, setStreak] = useState(0);
  const [complete, setComplete] = useState(false);

  const q = questions[idx];
  if (!q) return null;

  const answered = selected !== null;
  const isCorrect = answered && selected === q.answer;
  const isLast = idx + 1 >= questions.length;
  const correctPct = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
  const progressInGroup = streak > 0 && streak % 10 === 0 ? 10 : streak % 10;

  const handlePick = (value) => {
    if (answered) return;
    setSelected(value);
    if (value === q.answer) {
      setCorrect(c => c + 1);
      setStreak(s => s + 1);
      playSound('correct');
      confetti({ particleCount: 45, spread: 60, startVelocity: 32, origin: { y: 0.7 }, scalar: 0.85 });
    } else {
      setWrong(w => w + 1);
      setStreak(0);
      playSound('wrong');
    }
  };

  const handleNext = () => {
    if (isLast) {
      setComplete(true);
      onScoreRecord?.(selectedType, correct, questions.length);
      return;
    }
    setSelected(null);
    setIdx(idx + 1);
  };

  const handleRedo = () => {
    setQuestions(buildM2DrillRound(selectedType));
    setIdx(0);
    setSelected(null);
    setCorrect(0);
    setWrong(0);
    setStreak(0);
    setComplete(false);
  };

  const handleBackToPicker = () => {
    onBackToPicker();
  };

  const drillCtx = { answered, selected, answer: q.answer, isCorrect, handlePick, handleNext, streak, correct, wrong, theme: { accent, dark, cd, green: '#16A34A', red: '#DC2626' } };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%' }}>
      <style>{`
        .ld-drill-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
        .maf-footer { flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: clamp(8px,1.2vmin,15px) clamp(16px,2.4vmin,34px); background: rgba(255,255,255,.9); backdrop-filter: blur(12px); border-top: 1px solid rgba(147,197,253,.42); box-shadow: 0 -10px 28px rgba(30,64,175,.08); }
        .maf-footer-tally { display: flex; align-items: center; gap: 6px 10px; flex-wrap: wrap; font-family: 'Fredoka',sans-serif; font-size: clamp(13px,1.7vmin,18px); font-weight: 700; color: #475569; }
        .maf-stats { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .maf-stats .maf-stat { display: inline-flex; align-items: center; gap: 3px; }
        .maf-stats .maf-divider { color: #CBD5E1; font-weight: 400; }
        .ld-drill-body {
          min-height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: clamp(14px, 3vmin, 40px);
        }
        .ld-drill-content {
          width: 100%; max-width: min(94vw, 860px);
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(8px, 1.6vmin, 18px);
        }
        .ld-drill-question {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(22px, 4.6vmin, 44px); color: #1E293B; text-align: center; line-height: 1.15;
        }
        .ld-drill-feedback {
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 28px);
          text-align: center; min-height: clamp(24px, 3.4vmin, 38px);
          display: flex; align-items: center; justify-content: center;
          color: #64748B;
        }
        .ld-drill-feedback.ok { color: #16A34A; }
        .ld-drill-feedback.no { color: #DC2626; }
        .ld-drill-next {
          padding: clamp(11px, 1.5vmin, 17px) clamp(28px, 4vmin, 52px); border: none; border-radius: 999px;
          background: linear-gradient(180deg, ${accent}, ${cd});
          color: #fff;
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 26px);
          cursor: pointer; box-shadow: 0 4px 16px ${accent}55; transition: transform .1s ease, box-shadow .1s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .ld-drill-next:active { transform: translateY(2px); box-shadow: 0 2px 8px ${accent}44; }
        .ld-drill-done-emoji { font-size: clamp(52px, 14vmin, 120px); line-height: 1; }
        .ld-drill-summary { display: flex; flex-direction: column; gap: clamp(8px, 1.4vmin, 14px); width: 100%; max-width: 340px; }
        .ld-drill-summary-row {
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(255,255,255,.92); border: 1px solid rgba(147,197,253,.42); border-radius: 14px;
          padding: clamp(10px, 1.6vmin, 16px) clamp(16px, 2.4vmin, 26px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 22px); color: #1E293B;
        }
        .ld-drill-summary-row b { font-size: clamp(20px, 3vmin, 28px); }
        .ld-drill-summary-row.ok b { color: #16A34A; }
        .ld-drill-summary-row.no b { color: #DC2626; }
        .ld-drill-complete-actions { display: flex; flex-wrap: wrap; gap: clamp(10px, 1.6vmin, 16px); justify-content: center; }
        .ld-drill-btn-secondary {
          padding: clamp(11px, 1.5vmin, 17px) clamp(24px, 3.4vmin, 44px); border-radius: 999px;
          border: 2px solid color-mix(in srgb, ${accent} 55%, #BFDBFE); background: #EFF6FF; color: ${dark};
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 24px);
          cursor: pointer; -webkit-tap-highlight-color: transparent;
        }
      `}</style>
      {complete ? (
        <div className="ld-drill-scroll">
          <div className="ld-drill-body">
            <div className="ld-drill-content" style={{ textAlign: 'center' }}>
              <div className="ld-drill-done-emoji">🎉</div>
              <div className="ld-drill-question">Tahniah!</div>
              <div className="ld-drill-feedback">Skor kamu: {correct}/{questions.length} ({correctPct}%)</div>
              <div className="ld-drill-summary">
                <div className="ld-drill-summary-row ok"><span>✅ Betul</span><b>{correct}</b></div>
                <div className="ld-drill-summary-row no"><span>❌ Salah</span><b>{wrong}</b></div>
              </div>
              <div className="ld-drill-complete-actions">
                <button className="ld-drill-btn-secondary" type="button" onClick={handleRedo}>↻ Main Semula</button>
                <button className="ld-drill-next" type="button" onClick={handleBackToPicker}>Pilih Latihan Lain →</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="ld-drill-scroll">
            <div className="ld-drill-body">
              <div className="ld-drill-content">
                {q.prompt && <div className="ld-drill-question">{q.prompt}</div>}
                {renderQuestionM2All(q, drillCtx)}
                <div className={`ld-drill-feedback ${answered ? (isCorrect ? 'ok' : 'no') : ''}`}>
                  {answered ? (isCorrect ? 'Betul! 🎉' : 'Cuba lagi') : ''}
                </div>
                {answered && (
                  <>
                  <button className="ld-drill-next" type="button" onClick={handleNext}>
                    {isLast ? 'Tamat 🎉' : 'Seterusnya →'}
                  </button>
                  <QuestionIssueReportButton
                    language={language}
                    question={q}
                    questionIndex={idx}
                    totalQuestions={questions.length}
                    selected={selected}
                    answered={answered}
                    scoreId={scoreId}
                    source="T1M2Drill"
                  />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="maf-footer">
            <div className="maf-footer-tally">
              <span>Jawapan :</span>
              <span className="maf-stats">
                <span className="maf-stat" style={{ color: '#16A34A' }}>
                  <span>✅</span><span>{correct}</span><span style={{ color: 'rgba(255,255,255,.45)', fontWeight: 500 }}>Betul</span>
                </span>
                <span className="maf-divider">|</span>
                <span className="maf-stat" style={{ color: '#DC2626' }}>
                  <span>❌</span><span>{wrong}</span><span style={{ color: 'rgba(255,255,255,.45)', fontWeight: 500 }}>salah</span>
                </span>
              </span>
            </div>
            <span style={{ color: dark, fontSize: '0.85rem', fontWeight: 900, minWidth: 28, textAlign: 'right' }}>
              {progressInGroup}/10
            </span>
          </div>
        </>
      )}
    </div>
  );
}

/* Exam builder */

// One question per type, then shuffle for the timed exam.
function buildCabarMindaM2Round() {
  const allTypes = [
    ...LD_SECTIONS[0].types, ...LD_SECTIONS[1].types,
    ...LD_SECTIONS[2].types, ...LD_SECTIONS[3].types,
    ...LD_SECTIONS[4].types, ...LD_SECTIONS[5].types,
  ];
  const cmQ = allTypes.map((typeId, i) => ({ ...T1_M2_GENERATORS[typeId](), qid: i }));
  return shuffle(cmQ);
}

const CM_SLICES = [
  { id: 'kenali-tambah',   name: 'Kenali Tambah',          color: '#3B82F6', types: ['kt-gabung','kt-garis','kt-perkataan','kt-ayat'] },
  { id: 'latihan-tambah',  name: 'Latihan Tambah',         color: '#6366F1', types: ['lt-mudah-m1','lt-warnai','lt-padankan','lt-bond','lt-abacus','lt-sederhana-s1','lt-sukar-k1'] },
  { id: 'kenali-tolak',    name: 'Kenali Tolak',            color: '#EF4444', types: ['kt-buang','kt-garis-sub','kt-perkataan-tolak','kt-ayat-tolak'] },
  { id: 'latihan-tolak',   name: 'Latihan Tolak',           color: '#F97316', types: ['lt-tolak-mudah-m1','lt-tolak-warnai','lt-tolak-padankan','lt-tolak-bond','lt-tolak-blok','lt-tolak-sederhana-s1','lt-tolak-sukar-k1'] },
  { id: 'cerita',          name: 'Cerita Tambah & Tolak',   color: '#16A34A', types: ['ctt-tambah','ctt-tolak','ctt-operasi','ctt-ayat'] },
  { id: 'tambah-berulang', name: 'Tambah Tolak Berulang',   color: '#14B8A6', types: ['tb-add-groups','tb-add-line','tb-add-complete','tb-sub-groups','tb-sub-line'] },
];

function optionText(q, value) {
  const option = q?.options?.find((opt) => opt.id === value || String(opt.value) === String(value));
  return option ? String(option.value) : String(value ?? '');
}

function correctText(q) {
  if (q.type === 'lt-abacus') return String(q.total);
  if (q.type === 'lt-tolak-blok') return String(q.diff);
  return optionText(q, q.answer);
}

export function CabarMindaM2Explore({ data, language, theme, onExit }) {
  const C = theme || {};
  const accent = C.accent || '#3B82F6';
  const dark = C.dark || '#1E3A8A';
  const cd = C.cd || '#1D4ED8';

  const [phase, setPhase] = useState('start');
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(null);
  const [selectedPerQ, setSelectedPerQ] = useState(null);
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [timeUsed, setTimeUsed] = useState(0);
  const [reviewMode, setReviewMode] = useState(null);
  const timerRef = useRef(null);
  const answersRef = useRef(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const finishExam = (finalAnswers, finalTimeUsed) => {
    if (data?.scoreStorageKey && data?.scoreId && questions?.length) {
      recordActivityScore(data.scoreStorageKey, data.scoreId, finalAnswers.filter(Boolean).length, questions.length);
    }
    setAnswers(finalAnswers);
    setTimeUsed(finalTimeUsed);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPhase('results');
  };

  const startExam = () => {
    const qs = buildCabarMindaM2Round();
    const blankAnswers = new Array(qs.length).fill(null);
    setQuestions(qs);
    setAnswers(blankAnswers);
    answersRef.current = blankAnswers;
    setSelectedPerQ({});
    setShowQuestionList(false);
    setReviewMode(null);
    setCurrent(0);
    setTimeLeft(1800);
    setTimeUsed(0);
    setPhase('exam');
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          finishExam(answersRef.current || blankAnswers, 1800);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handleExamPick = (value) => {
    if (!questions) return;
    const currentAnswers = answersRef.current || answers;
    if (value === null || value === '') {
      const newAnswers = [...currentAnswers];
      newAnswers[current] = null;
      setAnswers(newAnswers);
      answersRef.current = newAnswers;
      setSelectedPerQ((currentSelected) => ({ ...(currentSelected || {}), [current]: '' }));
      return;
    }
    const q = questions[current];
    const correct = q.type === 'lt-abacus'
      ? Number(value) === q.total
      : q.type === 'lt-tolak-blok'
        ? Number(value) === q.diff
        : value === q.answer;
    const newAnswers = [...currentAnswers];
    newAnswers[current] = correct;
    setAnswers(newAnswers);
    answersRef.current = newAnswers;
    setSelectedPerQ((currentSelected) => ({ ...(currentSelected || {}), [current]: String(value) }));
  };

  const handleExamNext = () => {
    if (!questions) return;
    const latestAnswers = answersRef.current || answers;
    if (latestAnswers[current] === null) return;
    if (current + 1 >= questions.length) {
      if (!latestAnswers.every((value) => value !== null)) {
        setShowQuestionList(true);
        return;
      }
      finishExam(latestAnswers, 1800 - timeLeft);
      return;
    }
    setCurrent(c => c + 1);
  };

  if (phase === 'start') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 4vmin, 48px) clamp(16px, 3vmin, 32px)', gap: 'clamp(16px, 2.6vmin, 32px)' }}>
          <div style={{ fontSize: 'clamp(48px, 10vmin, 80px)', lineHeight: 1 }}>🧠</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vmin, 44px)', color: '#1E293B', lineHeight: 1.2 }}>
              Cabar Minda
            </div>
            <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(14px, 2vmin, 18px)', color: '#64748B', marginTop: 4 }}>
              Modul 2 — Tambah dan Tolak
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'clamp(8px, 1.6vmin, 16px)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: '31 Soalan', color: '#3B82F6' },
              { label: '30 Minit', color: '#16A34A' },
              { label: 'Lulus 80% (25/31)', color: '#16A34A' },
            ].map(chip => (
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
            border: '1.5px solid #BFDBFE',
            boxShadow: '0 12px 28px rgba(30,64,175,.10)',
            borderRadius: 'clamp(14px, 2vmin, 20px)', padding: 'clamp(14px, 2.4vmin, 24px)',
            maxWidth: 420, width: '100%',
          }}>
            <div style={{
              fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 'clamp(13px, 1.6vmin, 16px)', color: '#475569',
              display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.2vmin, 12px)',
            }}>
              <div>📌 Jawab semua 31 soalan dalam 30 minit.</div>
              <div>⏱️ Masa berhenti apabila semua soalan dijawab atau masa tamat.</div>
              <div>🎯 Skor 25/31 atau lebih untuk lulus.</div>
            </div>
          </div>
          <button type="button" onClick={startExam}
            style={{
              padding: 'clamp(14px, 2vmin, 20px) clamp(32px, 5vmin, 64px)', border: 'none', borderRadius: 999,
              background: `linear-gradient(180deg, ${accent}, ${cd})`, color: '#fff', cursor: 'pointer', width: '100%', maxWidth: 360,
              fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 2.8vmin, 26px)',
              boxShadow: `0 4px 0 ${dark}, 0 14px 24px rgba(59,130,246,.24)`, WebkitTapHighlightColor: 'transparent',
            }}>
            Mula Peperiksaan →
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
      theme: { accent, dark, cd, green: '#16A34A', red: '#DC2626', canChangeAnswer: true, savedAnswer: selectedPerQ[current] || '' },
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <style>{`
          .cm2-scroll { flex: 1; min-height: 0; overflow: hidden; display: flex; flex-direction: column; }
          .cm2-body {
            min-height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            padding: clamp(6px, 1.1vmin, 12px) clamp(10px, 1.6vmin, 20px);
          }
          .cm2-content {
            width: 100%; max-width: min(94vw, 860px);
            display: flex; flex-direction: column; align-items: center;
            gap: clamp(4px, .9vmin, 9px);
          }
          .cm2-prompt {
            font-family: 'Baloo 2', sans-serif; font-weight: 800;
            font-size: clamp(18px, 3.4vmin, 32px); color: #1E293B; text-align: center; line-height: 1.08;
          }
          .cm2-feedback {
            font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: clamp(14px, 2vmin, 18px);
            text-align: center; min-height: 0; height: 0; overflow: hidden;
            display: flex; align-items: center; justify-content: center; color: #64748B;
          }
          .cm2-next {
            padding: clamp(8px, 1.1vmin, 13px) clamp(24px, 3.4vmin, 44px);
            border: none; border-radius: 999px; background: ${accent}; color: #fff;
            font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.2vmin, 22px);
            cursor: pointer; box-shadow: 0 4px 0 ${cd}; transition: transform .1s ease;
            -webkit-tap-highlight-color: transparent;
          }
          .cm2-next:hover:not(:disabled) { transform: translateY(-2px); }
          .cm2-next:active:not(:disabled) { transform: translateY(2px); }
          .cm2-next:disabled { opacity: .45; cursor: not-allowed; box-shadow: none; }
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
          .cm2-footer {
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
                      key={question.qid || index}
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
        <div className="cm2-scroll">
          <div className="cm2-body">
            <div className="cm2-content">
              {q.prompt && <div className="cm2-prompt">{q.prompt}</div>}
              {renderQuestionM2All(q, examCtx)}
              <div className="cm2-feedback" aria-live="polite" />
              <button className="cm2-next" type="button" onClick={handleExamNext} disabled={!answered}>
                {nextLabel}
              </button>
              <QuestionIssueReportButton
                language={language}
                question={q}
                questionIndex={current}
                totalQuestions={questions.length}
                selected={answers[current]}
                answered={answered}
                scoreId={data?.scoreId}
                source="T1M2Exam"
              />
            </div>
          </div>
        </div>
        <div className="cm2-footer">
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
    const wrongCount = answers.filter(a => a === false).length;
    const unanswered = answers.filter(a => a === null).length;
    const total = questions.length;
    const passed = correctCount >= 25;
    const usedMM = Math.floor(timeUsed / 60);
    const usedSS = timeUsed % 60;

    const sliceScores = CM_SLICES.map(slice => {
      let got = 0, totalT = 0;
      questions.forEach((q, i) => {
        if (slice.types.includes(q.type)) {
          totalT++;
          if (answers[i] === true) got++;
        }
      });
      return { ...slice, got, totalT, pct: totalT > 0 ? got / totalT : 0 };
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <style>{`
          .cm-results-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
          .cm-results-body {
            min-height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column; align-items: center;
            padding: clamp(20px, 3.6vmin, 48px) clamp(16px, 3vmin, 32px);
          }
          .cm-results-content {
            width: 100%; max-width: 480px;
            display: flex; flex-direction: column; align-items: center;
            gap: clamp(14px, 2.4vmin, 28px);
          }
          .cm-results-badge {
            width: clamp(100px, 18vmin, 140px); height: clamp(100px, 18vmin, 140px);
            border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center;
            font-family: 'Baloo 2', sans-serif; font-weight: 900;
            background: '#F8FAFC'; border: 3px solid;
          }
          .cm-results-stats { display: flex; gap: clamp(8px, 1.4vmin, 16px); flex-wrap: wrap; justify-content: center; }
          .cm-results-stat {
            padding: 5px 14px; border-radius: 999px;
            background: #F8FAFC; border: 1.5px solid #E2E8F0;
            font-family: 'Fredoka', sans-serif; font-weight: 700;
            font-size: clamp(12px, 1.5vmin, 15px);
          }
          button.cm-results-stat {
            cursor: pointer;
            min-height: 32px;
            box-shadow: 0 3px 0 rgba(15,23,42,.08);
            -webkit-tap-highlight-color: transparent;
          }
          button.cm-results-stat:active { transform: translateY(1px); box-shadow: 0 2px 0 rgba(15,23,42,.08); }
          .cm-results-table {
            width: 100%;
            background: #F8FAFC;
            border: 1.5px solid #E2E8F0; border-radius: 16px;
            padding: 4px 16px; box-sizing: border-box;
          }
          .cm-results-row {
            display: flex; align-items: center; gap: 10px;
            padding: clamp(8px, 1.2vmin, 12px) 0;
            border-bottom: 1px solid #E2E8F0;
          }
          .cm-results-row:last-child { border-bottom: none; }
          .cm-results-actions { display: flex; flex-direction: column; gap: clamp(10px, 1.6vmin, 16px); width: 100%; }
          .cm-review-backdrop {
            position: fixed; inset: 0; z-index: 2147483000;
            background: rgba(15, 23, 42, .42);
            display: flex; align-items: center; justify-content: center;
            padding: 14px;
          }
          .cm-review-dialog {
            width: min(680px, 100%);
            max-height: min(760px, calc(100vh - 28px));
            background: #F8FAFC;
            border: 2px solid #BFDBFE;
            border-radius: 22px;
            box-shadow: 0 22px 60px rgba(15, 23, 42, .25);
            overflow: hidden;
            display: flex; flex-direction: column;
          }
          .cm-review-head {
            display: flex; align-items: center; justify-content: space-between; gap: 12px;
            padding: 14px 16px;
            background: #FFFFFF;
            border-bottom: 1.5px solid #E2E8F0;
          }
          .cm-review-heading {
            font-family: 'Baloo 2', sans-serif; font-weight: 900;
            color: #1E293B; font-size: clamp(18px, 3vmin, 28px);
          }
          .cm-review-close {
            border: 1.5px solid #CBD5E1; background: #F8FAFC; color: #334155;
            border-radius: 999px; width: 38px; height: 38px; cursor: pointer;
            font-family: 'Baloo 2', sans-serif; font-weight: 900; font-size: 22px;
          }
          .cm-review-list {
            padding: 14px; overflow-y: auto; -webkit-overflow-scrolling: touch;
            display: flex; flex-direction: column; gap: 14px;
          }
          .cm-review-card {
            width: 100%; box-sizing: border-box; border-radius: 18px; padding: 12px;
            background: #fff; border: 1.5px solid #E2E8F0;
            font-family: 'Fredoka', sans-serif;
          }
          .cm-review-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
          .cm-review-title { min-width: 0; color: #1E293B; font-weight: 800; font-size: clamp(13px, 1.8vmin, 16px); }
          .cm-review-pill { flex-shrink: 0; border-radius: 999px; padding: 3px 9px; font-weight: 800; font-size: 12px; }
          .cm-review-question {
            margin-top: 10px;
            padding: 12px;
            border-radius: 16px;
            background: linear-gradient(180deg, #EFF6FF, #F8FAFC);
            border: 1.5px solid #DBEAFE;
          }
          .cm-review-question .cm2-prompt { margin-bottom: 10px; }
          .cm-review-answer { margin-top: 10px; display: grid; gap: 4px; font-weight: 700; font-size: clamp(12px, 1.7vmin, 15px); color: #334155; }
        `}</style>
        <div className="cm-results-scroll">
          <div className="cm-results-body">
            <div className="cm-results-content">
              <div className="cm-results-badge" style={{ borderColor: passed ? '#16A34A' : '#DC2626', background: '#F8FAFC' }}>
                <span style={{ fontSize: 'clamp(28px, 5vmin, 44px)', color: passed ? '#16A34A' : '#DC2626' }}>
                  {correctCount}/{total}
                </span>
                <span style={{
                  fontFamily: "'Fredoka',sans-serif", fontWeight: 700,
                  fontSize: 'clamp(11px, 1.6vmin, 15px)', color: passed ? '#16A34A' : '#DC2626',
                }}>
                  {passed ? 'LULUS ✓' : 'CUBA LAGI ✗'}
                </span>
              </div>
              <div className="cm-results-stats">
                <button type="button" className="cm-results-stat" onClick={() => setReviewMode('correct')} style={{ color: '#16A34A' }}>
                  {'\u2705'} Betul: {correctCount}
                </button>
                <button type="button" className="cm-results-stat" onClick={() => setReviewMode('wrong')} style={{ color: '#DC2626' }}>
                  {'\u274C'} Salah: {wrongCount}
                </button>
                <span className="cm-results-stat" style={{ color: '#1E293B' }}>⏱ {usedMM}:{String(usedSS).padStart(2, '0')}</span>
              </div>
              {unanswered > 0 && (
                <div style={{
                  fontFamily: "'Fredoka',sans-serif", fontWeight: 600,
                  fontSize: 'clamp(12px, 1.5vmin, 15px)', color: '#16A34A',
                }}>
                  ⏰ {unanswered} soalan tidak dijawab
                </div>
              )}
              <div className="cm-results-table">
                {sliceScores.map(slice => {
                  const pct = slice.pct;
                  let txtColor = '#DC2626';
                  if (pct >= 1) txtColor = '#16A34A';
                  else if (pct > 0) txtColor = '#64748B';
                  return (
                    <div key={slice.id} className="cm-results-row">
                      <div style={{
                        width: 3, height: 28, borderRadius: 2, background: slice.color, flexShrink: 0,
                      }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontFamily: "'Fredoka',sans-serif", fontWeight: 600,
                          fontSize: 'clamp(12px, 1.5vmin, 15px)', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>
                          {slice.name}
                        </div>
                        <div style={{
                          width: '100%', height: 6, background: '#E2E8F0', borderRadius: 3, marginTop: 4, overflow: 'hidden',
                        }}>
                          <div style={{
                            width: `${pct * 100}%`, height: '100%', background: slice.color, borderRadius: 3,
                            transition: 'width 0.5s ease',
                          }} />
                        </div>
                      </div>
                      <div style={{
                        fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
                        fontSize: 'clamp(13px, 1.6vmin, 17px)', color: txtColor, flexShrink: 0,
                      }}>
                        {slice.got}/{slice.totalT}
                      </div>
                    </div>
                  );
                })}
              </div>
              {reviewMode && createPortal((
                <div className="cm-review-backdrop" role="dialog" aria-modal="true" aria-label={reviewMode === 'correct' ? 'Soalan betul' : 'Soalan salah'}>
                  <div className="cm-review-dialog">
                    <div className="cm-review-head">
                      <div className="cm-review-heading">
                        {reviewMode === 'correct' ? `${'\u2705'} Betul: ${correctCount}` : `${'\u274C'} Salah: ${wrongCount}`}
                      </div>
                      <button type="button" className="cm-review-close" onClick={() => setReviewMode(null)} aria-label="Tutup">×</button>
                    </div>
                    <div className="cm-review-list">
                      {questions.map((question, index) => ({ question, index }))
                        .filter(({ index }) => reviewMode === 'correct' ? answers[index] === true : answers[index] === false)
                        .map(({ question, index }) => {
                          const ok = answers[index] === true;
                          const picked = selectedPerQ?.[index];
                          const userText = picked ? optionText(question, picked) : 'Tidak dijawab';
                          const title = LD_TYPE_LABELS[question.type]?.label || question.header || question.type;
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
                              key={question.qid || index}
                              className="cm-review-card"
                              style={{ borderColor: ok ? '#86EFAC' : '#FCA5A5', background: ok ? '#F0FDF4' : '#FEF2F2' }}
                            >
                              <div className="cm-review-top">
                                <div className="cm-review-title">{index + 1}. {title}</div>
                                <span
                                  className="cm-review-pill"
                                  style={{ background: ok ? '#DCFCE7' : '#FEE2E2', color: ok ? '#15803D' : '#DC2626' }}
                                >
                                  {ok ? 'Betul' : 'Salah'}
                                </span>
                              </div>
                              <div className="cm-review-question">
                                {question.prompt && <div className="cm2-prompt">{question.prompt}</div>}
                                {renderQuestionM2All(question, reviewCtx)}
                              </div>
                              <div className="cm-review-answer">
                                <div>Jawapan anda: <span style={{ color: ok ? '#15803D' : '#DC2626' }}>{userText}</span></div>
                                {!ok && <div>Jawapan betul: <span style={{ color: '#15803D' }}>{correctText(question)}</span></div>}
                              </div>
                            </div>
                          );
                        })}
                      {(reviewMode === 'correct' ? correctCount : wrongCount) === 0 && (
                        <div className="cm-review-card" style={{ textAlign: 'center', color: '#64748B', fontWeight: 800 }}>
                          Tiada soalan untuk dipaparkan.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ), document.body)}
              <div className="cm-results-actions">
                <button type="button" onClick={() => {
                  if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
                  setPhase('start');
                }}
                  style={{
                    padding: 'clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)', border: 'none', borderRadius: 999,
                    background: `linear-gradient(180deg, ${accent}, ${cd})`, color: '#fff', cursor: 'pointer', width: '100%',
                    fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                    boxShadow: `0 4px 0 ${dark}, 0 14px 24px rgba(59,130,246,.22)`, WebkitTapHighlightColor: 'transparent',
                  }}>
                  ↻ Cuba Semula
                </button>
                <button type="button" onClick={onExit}
                  style={{
                    padding: 'clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)',
                    border: '1.5px solid #CBD5E1', borderRadius: 999,
                    background: '#F8FAFC',
                    color: '#475569', cursor: 'pointer', width: '100%',
                    fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                    WebkitTapHighlightColor: 'transparent',
                  }}>
                  ← Kembali
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

/* ════════════════════════════════════════════════════════════════════════
 * Slice 3.1 — "Kenali Pecahan" (Module 3: Fractions)
 * 10-question round: 3× Type A (Sama Besar), 4× Type B (Namakan), 3× Type C (Pilih Gambar)
 * Concepts: 1/2, 1/4, 2/4, 3/4 only. Malay only. Uses MatematikActivityFrame.
 * ════════════════════════════════════════════════════════════════════════ */
