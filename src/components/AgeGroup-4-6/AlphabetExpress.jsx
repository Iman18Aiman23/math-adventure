import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw } from 'lucide-react';
import BackButton from '../BackButton';

// ── Letter stages — each becomes one train of coaches to fill ──
const STAGES = [
  ['A', 'B', 'C', 'D'],
  ['E', 'F', 'G', 'H'],
  ['I', 'J', 'K', 'L'],
  ['M', 'N', 'O', 'P'],
  ['Q', 'R', 'S', 'T'],
  ['U', 'V', 'W', 'X'],
  ['Y', 'Z'],
];

// Balloon / coach colour palette (index keyed by a letter's position in its stage,
// so each balloon and its matching coach always share the same colour).
const COLORS = [
  { fill: 'linear-gradient(145deg,#FF80AB 0%,#FF1744 100%)', knot: '#B71C1C', coach: 'linear-gradient(160deg,#FF5A7A 0%,#E11D48 100%)', deep: '#9F1239', text: '#fff' },
  { fill: 'linear-gradient(145deg,#40C4FF 0%,#0091EA 100%)', knot: '#01579B', coach: 'linear-gradient(160deg,#38BDF8 0%,#0284C7 100%)', deep: '#075985', text: '#fff' },
  { fill: 'linear-gradient(145deg,#FFD740 0%,#FF6D00 100%)', knot: '#E65100', coach: 'linear-gradient(160deg,#FBBF24 0%,#F59E0B 100%)', deep: '#B45309', text: '#7c2d12' },
  { fill: 'linear-gradient(145deg,#A5D6A7 0%,#2E7D32 100%)', knot: '#1B5E20', coach: 'linear-gradient(160deg,#34D399 0%,#059669 100%)', deep: '#065F46', text: '#fff' },
  { fill: 'linear-gradient(145deg,#CE93D8 0%,#8E24AA 100%)', knot: '#6A1B9A', coach: 'linear-gradient(160deg,#A78BFA 0%,#7C3AED 100%)', deep: '#5B21B6', text: '#fff' },
  { fill: 'linear-gradient(145deg,#FFCC80 0%,#F57C00 100%)', knot: '#BF360C', coach: 'linear-gradient(160deg,#FB923C 0%,#EA580C 100%)', deep: '#9A3412', text: '#fff' },
];

// Drifting background clouds for the train scene.
const CLOUDS = [
  { top: '12%', w: 90,  h: 26, dur: 34, delay: -4 },
  { top: '26%', w: 120, h: 32, dur: 47, delay: -22 },
  { top: '8%',  w: 70,  h: 20, dur: 28, delay: -12 },
  { top: '44%', w: 100, h: 28, dur: 40, delay: -33 },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Build the coach + balloon data for a given stage index.
const buildStage = (index) => {
  const letters = STAGES[index];
  const coaches = letters.map((letter, i) => ({
    letter,
    colorIdx: i % COLORS.length,
    filled: false,
  }));
  const balloons = shuffle(letters).map((letter) => {
    const colorIdx = letters.indexOf(letter) % COLORS.length;
    return { letter, colorIdx, placed: false };
  });
  return { coaches, balloons };
};

export default function AlphabetExpress({ onBack, language = 'bm', theme = {} }) {
  const [gameState, setGameState] = useState('playing');   // 'playing' | 'won'
  const [stageIndex, setStageIndex] = useState(0);
  const [coaches, setCoaches] = useState([]);
  const [balloons, setBalloons] = useState([]);
  const [completed, setCompleted] = useState(0);           // trains finished
  const [drag, setDrag] = useState(null);                  // active drag descriptor
  const [hoverLetter, setHoverLetter] = useState(null);    // coach currently under pointer
  const [wobbleLetter, setWobbleLetter] = useState(null);  // coach to shake on a miss
  const [trainStyle, setTrainStyle] = useState({ transform: 'translateX(0)', transition: 'transform 1.6s cubic-bezier(0.25,1,0.5,1)' });
  const [fit, setFit] = useState(1);                       // scale-to-fit factor for the train

  const coachRefs = useRef({});      // letter → DOM element (drop targets)
  const timers = useRef([]);         // pending setTimeouts (cleared on unmount)
  const celebratingRef = useRef(false);
  const stageAreaRef = useRef(null); // the centred region the train must fit inside
  const trainRef = useRef(null);     // the train itself (natural, pre-transform size)
  const floatRef = useRef(null);     // the balloon that follows the pointer (moved imperatively)
  const dragRef = useRef(null);      // live drag data: offsets + cached coach rects (no re-renders)

  const addTimer = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => { pending.forEach(clearTimeout); SpeechManager.stopSpeaking(); };
  }, []);

  const speakLetter = useCallback((letter) => {
    SpeechManager.speak(letter, 'en-US', { rate: 0.7, pitch: 1.3 });
  }, []);

  // ── Scale the train so it fills the available area (no big empty body) ──
  const recomputeFit = useCallback(() => {
    const area = stageAreaRef.current;
    const train = trainRef.current;
    if (!area || !train) return;
    // offsetWidth/Height are the natural, pre-transform layout sizes.
    const naturalW = train.offsetWidth;
    const naturalH = train.offsetHeight;
    if (!naturalW || !naturalH) return;
    const availW = area.clientWidth - 24;   // breathing room on the sides
    const availH = area.clientHeight - 12;
    const next = Math.max(0.5, Math.min(availW / naturalW, availH / naturalH, 2.6));
    setFit(next);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return undefined;
    recomputeFit();
    const ro = new ResizeObserver(recomputeFit);
    if (stageAreaRef.current) ro.observe(stageAreaRef.current);
    window.addEventListener('resize', recomputeFit);
    return () => { ro.disconnect(); window.removeEventListener('resize', recomputeFit); };
  }, [gameState, coaches, recomputeFit]);

  // ── Start / load a stage ──
  const loadStage = useCallback((index, animateIn = true) => {
    const { coaches: c, balloons: b } = buildStage(index);
    coachRefs.current = {};
    setCoaches(c);
    setBalloons(b);
    celebratingRef.current = false;
    if (animateIn) {
      setTrainStyle({ transform: 'translateX(-160%)', transition: 'none' });
      addTimer(() => {
        setTrainStyle({ transform: 'translateX(0)', transition: 'transform 1.6s cubic-bezier(0.25,1,0.5,1)' });
      }, 80);
    }
  }, [addTimer]);

  const startGame = useCallback(() => {
    setStageIndex(0);
    setCompleted(0);
    setGameState('playing');
    loadStage(0);
  }, [loadStage]);

  // Start the first train immediately when the game opens (no intro screen).
  useEffect(() => { loadStage(0); }, [loadStage]);

  // ── Drop-target hit test against the rects cached at drag-start (no layout reads per move) ──
  const hitFromCache = useCallback((x, y) => {
    const rects = dragRef.current?.rects || [];
    for (const r of rects) {
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return r.letter;
    }
    return null;
  }, []);

  // ── Place a balloon into its coach ──
  const placeBalloon = useCallback((letter, colorIdx, coachEl) => {
    setCoaches((prev) => prev.map((c) => (c.letter === letter ? { ...c, filled: true, colorIdx } : c)));
    setBalloons((prev) => prev.map((b) => (b.letter === letter ? { ...b, placed: true } : b)));
    playSound('correct');
    if (coachEl) {
      const r = coachEl.getBoundingClientRect();
      confetti({
        particleCount: 28,
        spread: 50,
        origin: { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight },
      });
    }
  }, []);

  // ── Pointer drag wiring (set up while a drag is active) ──
  // The floating balloon is moved imperatively via floatRef.style — no React state
  // updates per pointermove, so the train tree is not re-rendered while dragging.
  useEffect(() => {
    if (!drag) return undefined;

    const onMove = (e) => {
      const info = dragRef.current;
      if (!info) return;
      const x = e.clientX - info.offX;
      const y = e.clientY - info.offY;
      if (floatRef.current) floatRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.12)`;
      // Only re-render when the highlighted coach actually changes.
      const t = hitFromCache(e.clientX, e.clientY);
      if (t !== info.lastHover) {
        info.lastHover = t;
        setHoverLetter(t);
      }
    };
    const onUp = (e) => {
      const target = hitFromCache(e.clientX, e.clientY);
      if (target === drag.letter) {
        placeBalloon(drag.letter, drag.colorIdx, coachRefs.current[drag.letter]);
      } else {
        playSound('wrong');
        setWobbleLetter(drag.letter);
        addTimer(() => setWobbleLetter(null), 600);
      }
      dragRef.current = null;
      setDrag(null);
      setHoverLetter(null);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [drag, hitFromCache, placeBalloon, addTimer]);

  const onBalloonDown = useCallback((e, balloon) => {
    if (balloon.placed || drag) return;
    e.preventDefault();
    speakLetter(balloon.letter);
    const r = e.currentTarget.getBoundingClientRect();
    // Cache coach rects once — they don't move during a drag, so we never read
    // layout again until the next pointerdown.
    const rects = [];
    Object.entries(coachRefs.current).forEach(([letter, el]) => {
      if (!el) return;
      const cr = el.getBoundingClientRect();
      rects.push({ letter, left: cr.left, right: cr.right, top: cr.top, bottom: cr.bottom });
    });
    dragRef.current = { offX: e.clientX - r.left, offY: e.clientY - r.top, rects, lastHover: null };
    setDrag({ letter: balloon.letter, colorIdx: balloon.colorIdx, w: r.width, x0: r.left, y0: r.top });
  }, [drag, speakLetter]);

  // ── Detect a completed train → celebrate → next stage (or win after Y–Z) ──
  useEffect(() => {
    if (gameState !== 'playing' || celebratingRef.current) return;
    if (coaches.length === 0 || !coaches.every((c) => c.filled)) return;

    celebratingRef.current = true;
    setCompleted((n) => n + 1);
    const isLast = stageIndex >= STAGES.length - 1;

    confetti({ particleCount: 130, spread: 85, origin: { y: 0.6 } });

    // Chug the finished train off to the right…
    addTimer(() => setTrainStyle({ transform: 'translateX(160%)', transition: 'transform 1.4s cubic-bezier(0.6,0,0.9,0.4)' }), 900);
    // …then either show the win screen, or roll in the next set of empty coaches.
    addTimer(() => {
      if (isLast) {
        confetti({ particleCount: 180, spread: 110, origin: { y: 0.5 } });
        setGameState('won');
      } else {
        setStageIndex((prev) => {
          const next = prev + 1;
          loadStage(next);
          return next;
        });
      }
    }, 2600);
  }, [coaches, gameState, stageIndex, addTimer, loadStage]);

  // ── Theme helpers ──
  const swatch = theme.swatch || '#0284C7';

  // ════════════════════════ WON ════════════════════════
  if (gameState === 'won') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F0F9FF' }}>
        <BackButton onClick={onBack} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', gap: '1.25rem' }}>
          <Trophy size={84} color="#FFC800" />
          <h1 style={{ fontWeight: 900, fontSize: '2rem', color: '#16A34A', margin: 0, fontFamily: 'var(--font-heading)' }}>
            {language === 'bm' ? '🎉 Tren Tamat!' : '🎉 End of the Line!'}
          </h1>
          <p style={{ color: '#64748B', fontWeight: 700, margin: 0, fontSize: '1.05rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Kamu siapkan semua tren dari A hingga Z!' : 'You completed every train from A to Z!'}
          </p>
          <div style={{ background: '#fff', border: '2px solid #E2E8F0', borderRadius: '20px', padding: '1rem 2rem', display: 'flex', gap: '2rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>{language === 'bm' ? 'Tren' : 'Trains'}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: swatch }}>{completed}/{STAGES.length}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>{language === 'bm' ? 'Huruf' : 'Letters'}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1E293B' }}>26/26</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={startGame} onMouseEnter={playHoverSound} style={{ padding: '0.9rem 1.75rem', background: '#1CB0F6', color: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 6px 0 #0091D0', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              <RefreshCw size={20} /> {language === 'bm' ? 'Main Lagi' : 'Play Again'}
            </button>
            <button onClick={onBack} onMouseEnter={playHoverSound} style={{ padding: '0.9rem 1.75rem', background: '#fff', color: '#64748B', border: '2px solid #E2E8F0', borderRadius: '16px', boxShadow: '0 6px 0 #E2E8F0', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer', fontFamily: 'var(--font-heading)' }}>
              {language === 'bm' ? 'Keluar' : 'Exit'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════ PLAYING ════════════════════════
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', flex: 1,
      background: 'linear-gradient(180deg,#BAE6FD 0%,#E0F2FE 50%,#F0FDF4 100%)',
      overflow: 'hidden', userSelect: 'none', WebkitUserSelect: 'none',
      // responsive balloon size (dock + dragged balloon share these)
      '--ax-balloon': 'clamp(56px, 8.5vw, 92px)',
      '--ax-balloon-fs': 'clamp(1.9rem, 4.4vw, 3rem)',
    }}>
      <style>{`
        @keyframes axFloat { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-9px) rotate(2deg); } }
        @keyframes axSpin  { to { transform: rotate(360deg); } }
        @keyframes axSteam { 0% { transform: translateY(0) scale(0.6); opacity:0.8; } 50% { transform: translateY(-22px) scale(1.1); opacity:0.4; } 100% { transform: translateY(-44px) scale(1.5); opacity:0; } }
        @keyframes axWobble { 0%,100% { transform: translateX(0); } 15% { transform: translateX(-7px) rotate(-2deg); } 30% { transform: translateX(6px) rotate(2deg); } 45% { transform: translateX(-4px); } 60% { transform: translateX(2px); } }
        @keyframes axPop { 0% { transform: scale(0.85); } 55% { transform: scale(1.16); } 100% { transform: scale(1); } }
        @keyframes axClouds { from { transform: translateX(115%); } to { transform: translateX(-125%); } }
        .ax-wheel { animation: axSpin 1.1s linear infinite; }
        .ax-balloon { animation: axFloat 3s ease-in-out infinite; }
        .ax-cloud { position: absolute; background: #fff; border-radius: 999px; opacity: 0.8; animation: axClouds linear infinite; pointer-events: none; }
        .ax-cloud::before, .ax-cloud::after { content: ''; position: absolute; background: #fff; border-radius: 50%; }
        .ax-cloud::before { width: 46%; height: 160%; top: -70%; left: 16%; }
        .ax-cloud::after  { width: 60%; height: 200%; top: -110%; right: 14%; }
      `}</style>

      {/* Top bar: back + progress + score */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: 'max(0.75rem, env(safe-area-inset-top)) 1rem 0.5rem' }}>
        <BackButton onClick={onBack} style={{ position: 'static', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.4rem', overflowX: 'auto', padding: '0.15rem 0' }}>
          {STAGES.map((s, idx) => (
            <span key={idx} style={{
              flexShrink: 0, padding: '0.15rem 0.55rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800,
              whiteSpace: 'nowrap',
              ...(idx === stageIndex
                ? { background: '#FBBF24', color: '#7c2d12', boxShadow: '0 2px 0 #D97706' }
                : idx < stageIndex
                ? { background: '#DCFCE7', color: '#15803D' }
                : { background: '#F1F5F9', color: '#94A3B8' }),
            }}>
              {idx < stageIndex ? '✓ ' : idx === stageIndex ? '🚂 ' : ''}{s.join('')}
            </span>
          ))}
        </div>
        <div style={{ background: '#FFF7ED', border: '2px solid #FED7AA', borderRadius: '999px', padding: '0.2rem 0.65rem', fontWeight: 800, fontSize: '0.85rem', color: '#EA580C', flexShrink: 0 }}>
          🏆 {completed}
        </div>
      </div>

      {/* Train scene — drifting clouds + a scale-to-fit train, vertically centred */}
      <div ref={stageAreaRef} style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* drifting clouds */}
        {CLOUDS.map((cl, i) => (
          <div key={i} className="ax-cloud" style={{ top: cl.top, width: cl.w, height: cl.h, animationDuration: `${cl.dur}s`, animationDelay: `${cl.delay}s` }} />
        ))}

        {/* scale wrapper — keeps the train large + centred on any screen */}
        <div style={{ transform: `scale(${fit})`, transformOrigin: 'center center', position: 'relative', zIndex: 1 }}>
          {/* whole assembly (sliding cars + fixed rails) — measured for scale-to-fit */}
          <div ref={trainRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* only the cars + engine slide in/out via translateX; the rails stay put */}
            <div style={{ ...trainStyle, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '0.6rem', willChange: 'transform' }}>
          {/* Coaches (drop targets) */}
          {coaches.map((coach) => {
            const c = COLORS[coach.colorIdx];
            const isHover = hoverLetter === coach.letter && drag && !coach.filled;
            const isWobble = wobbleLetter === coach.letter;
            return (
              <div key={coach.letter} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: isWobble ? 'axWobble 0.55s ease-in-out' : undefined }}>
                <div
                  ref={(el) => { coachRefs.current[coach.letter] = el; }}
                  style={{
                    width: 76, height: 68, borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s', position: 'relative',
                    ...(coach.filled
                      ? { background: c.coach, border: `3px solid ${c.deep}`, boxShadow: `0 6px 0 ${c.deep}`, animation: 'axPop 0.45s' }
                      : { background: isHover ? '#DBEAFE' : 'rgba(255,255,255,0.5)', border: `3px dashed ${isHover ? '#3B82F6' : '#94A3B8'}`, transform: isHover ? 'scale(1.06)' : 'none' }),
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '2.4rem', lineHeight: 1,
                    color: coach.filled ? c.text : 'rgba(100,116,139,0.45)',
                    textShadow: coach.filled ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
                  }}>
                    {coach.letter}
                  </span>
                </div>
                {/* coach wheels */}
                <div style={{ display: 'flex', gap: '1.6rem', marginTop: '-4px' }}>
                  {[0, 1].map((w) => (
                    <div key={w} className={coach.filled ? 'ax-wheel' : undefined} style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: coach.filled ? '#1E293B' : '#94A3B8',
                      border: `3px solid ${coach.filled ? '#FBBF24' : '#CBD5E1'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s',
                    }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: coach.filled ? '#FBBF24' : '#E2E8F0' }} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Locomotive engine (faces right) */}
          <div style={{ position: 'relative', width: 120, flexShrink: 0 }}>
            {/* steam puffs */}
            <div style={{ position: 'absolute', top: -34, right: 20, display: 'flex', gap: '4px', pointerEvents: 'none' }}>
              {[0, 0.4, 0.8].map((d, i) => (
                <span key={i} style={{ width: 10 + i * 5, height: 10 + i * 5, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', display: 'block', animation: `axSteam 1.5s ${d}s ease-out infinite` }} />
              ))}
            </div>
            <div style={{ position: 'relative', height: 84 }}>
              {/* cab */}
              <div style={{ position: 'absolute', bottom: 4, left: 2, width: 46, height: 64, background: 'linear-gradient(180deg,#F43F5E,#BE123C)', borderRadius: '8px 4px 4px 8px', border: '2px solid #9F1239', boxShadow: '0 4px 0 #881337' }}>
                <div style={{ position: 'absolute', top: 8, left: 8, width: 28, height: 26, background: '#CFFAFE', borderRadius: '12px 12px 4px 4px', border: '3px solid #FBBF24' }} />
              </div>
              {/* boiler */}
              <div style={{ position: 'absolute', bottom: 4, left: 44, width: 64, height: 44, background: 'linear-gradient(180deg,#FB7185,#E11D48)', borderRadius: '4px 10px 10px 4px', border: '2px solid #9F1239', boxShadow: '0 4px 0 #881337' }} />
              {/* funnel */}
              <div style={{ position: 'absolute', top: 8, right: 16, width: 14, height: 30, background: '#1E293B', borderRadius: '4px 4px 0 0', borderBottom: '3px solid #FBBF24' }} />
              {/* dome */}
              <div style={{ position: 'absolute', top: 22, right: 42, width: 16, height: 14, background: 'linear-gradient(180deg,#FDE047,#F59E0B)', borderRadius: '8px 8px 0 0' }} />
              {/* headlamp */}
              <div style={{ position: 'absolute', bottom: 16, right: 2, width: 16, height: 16, background: 'radial-gradient(circle at 40% 40%,#FEF9C3,#F59E0B)', border: '2px solid #B45309', borderRadius: '4px' }} />
            </div>
            {/* drive wheels */}
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 8px', marginTop: '-6px' }}>
              {[0, 1, 2].map((w) => (
                <div key={w} className="ax-wheel" style={{ width: 28, height: 28, borderRadius: '50%', background: '#1E293B', border: '4px solid #FBBF24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#DC2626' }} />
                </div>
              ))}
            </div>
          </div>
            </div>

            {/* steel rails — fixed track; the train slides over them (scaled, not translated) */}
            <div style={{ width: '116%', marginLeft: '-8%', marginTop: '4px', borderTop: '5px solid #64748B', borderBottom: '5px solid #64748B', height: 16, background: 'repeating-linear-gradient(90deg,#78350F 0 14px,#F59E0B 14px 28px)' }} />
          </div>
        </div>
      </div>

      {/* Balloon dock */}
      <div style={{ background: 'rgba(255,255,255,0.95)', borderTop: '4px solid #7DD3FC', borderRadius: '24px 24px 0 0', padding: '1.25rem 1rem 1rem', position: 'relative', marginTop: '0.5rem' }}>
        <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#0EA5E9', color: '#fff', padding: '0.3rem 1rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
          {language === 'bm' ? 'Stesen Belon 🎈' : 'Balloon Station 🎈'}
        </div>
        <p style={{ textAlign: 'center', color: '#64748B', fontWeight: 600, fontSize: '0.82rem', margin: '0.4rem 0 0.6rem' }}>
          {language === 'bm' ? 'Sentuh dan heret belon ke gerabak yang sama!' : 'Touch and drag a balloon to the matching coach!'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem', minHeight: 80 }}>
          {balloons.map((balloon, i) => {
            const c = COLORS[balloon.colorIdx];
            const isGhost = balloon.placed || (drag && drag.letter === balloon.letter);
            if (isGhost) {
              // empty slot left behind once the balloon is gone / in flight
              return <div key={balloon.letter} style={{ width: 'var(--ax-balloon)', height: 'var(--ax-balloon)', borderRadius: '50%', border: '3px dashed #CBD5E1', opacity: 0.5 }} />;
            }
            return (
              <div
                key={balloon.letter}
                className="ax-balloon"
                onPointerDown={(e) => onBalloonDown(e, balloon)}
                style={{ animationDelay: `${i * 0.18}s`, cursor: 'grab', touchAction: 'none' }}
              >
                <div style={{
                  width: 'var(--ax-balloon)', height: 'var(--ax-balloon)', borderRadius: '50% 50% 48% 48% / 56% 56% 44% 44%',
                  background: c.fill, border: '2.5px solid rgba(255,255,255,0.55)',
                  boxShadow: `0 8px 22px ${c.knot}55, inset 8px 8px 14px rgba(255,255,255,0.28), inset -8px -6px 14px rgba(0,0,0,0.15)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'var(--ax-balloon-fs)', color: c.text, textShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>
                    {balloon.letter}
                  </span>
                  <div style={{ position: 'absolute', top: '16%', left: '20%', width: '26%', height: '15%', borderRadius: '50%', background: 'rgba(255,255,255,0.45)', transform: 'rotate(-32deg)' }} />
                </div>
                <div style={{ width: 8, height: 6, margin: '0 auto', background: c.knot, borderRadius: '50% 50% 45% 45% / 55% 55% 45% 45%' }} />
                <svg width={12} height={16} style={{ display: 'block', margin: '0 auto' }}>
                  <path d="M6 0 Q3 8 6 16" stroke="rgba(0,0,0,0.22)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating balloon following the pointer while dragging */}
      {drag && (
        <div ref={floatRef} style={{ position: 'fixed', left: 0, top: 0, width: drag.w, height: drag.w, zIndex: 1000, pointerEvents: 'none', transform: `translate(${drag.x0}px, ${drag.y0}px) scale(1.12)`, filter: 'drop-shadow(0 18px 22px rgba(0,0,0,0.25))' }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '50% 50% 48% 48% / 56% 56% 44% 44%',
            background: COLORS[drag.colorIdx].fill, border: '2.5px solid rgba(255,255,255,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'var(--ax-balloon-fs)', color: COLORS[drag.colorIdx].text, textShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>
              {drag.letter}
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
