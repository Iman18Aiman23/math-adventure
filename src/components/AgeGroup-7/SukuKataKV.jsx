import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw } from 'lucide-react';
import BackButton from '../BackButton';

// ── 8 KV blending levels: drag a consonant + vowel to build the target syllable ──
const LEVELS = [
  { consonant: 'B', vowel: 'A', syllable: 'BA', remainder: 'JU', word: 'BAJU', emoji: '👕' },
  { consonant: 'C', vowel: 'I', syllable: 'CI', remainder: 'LI', word: 'CILI', emoji: '🌶️' },
  { consonant: 'B', vowel: 'U', syllable: 'BU', remainder: 'KU', word: 'BUKU', emoji: '📖' },
  { consonant: 'S', vowel: 'U', syllable: 'SU', remainder: 'SU', word: 'SUSU', emoji: '🥛' },
  { consonant: 'T', vowel: 'O', syllable: 'TO', remainder: 'PI', word: 'TOPI', emoji: '👒' },
  { consonant: 'G', vowel: 'I', syllable: 'GI', remainder: 'GI', word: 'GIGI', emoji: '🦷' },
  { consonant: 'D', vowel: 'A', syllable: 'DA', remainder: 'DU', word: 'DADU', emoji: '🎲' },
  { consonant: 'L', vowel: 'O', syllable: 'LO', remainder: 'RI', word: 'LORI', emoji: '🚚' },
];

const ALL_CONSONANTS = ['B', 'C', 'D', 'G', 'L', 'M', 'S', 'T'];
const ALL_VOWELS = ['A', 'I', 'U', 'E', 'O'];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Build the (deduped, shuffled) letter choices for a level, target letter always included.
const makePool = (target, all, count) => {
  const pool = [target, ...all.filter((l) => l !== target)].slice(0, count);
  return shuffle(pool);
};

const buildLevel = (idx) => {
  const lvl = LEVELS[idx];
  return {
    cons: makePool(lvl.consonant, ALL_CONSONANTS, 5),
    vow: makePool(lvl.vowel, ALL_VOWELS, 5),
  };
};

export default function SukuKataKV({ onBack, language = 'bm', theme = {} }) {
  const [gameState, setGameState] = useState('playing');  // 'playing' | 'won'
  const [levelIdx, setLevelIdx] = useState(0);
  const [cons, setCons] = useState(() => buildLevel(0).cons);
  const [vow, setVow] = useState(() => buildLevel(0).vow);
  const [slotC, setSlotC] = useState(null);   // letter placed in consonant slot
  const [slotV, setSlotV] = useState(null);   // letter placed in vowel slot
  const [completed, setCompleted] = useState(0);
  const [drag, setDrag] = useState(null);      // active drag descriptor
  const [hoverSlot, setHoverSlot] = useState(null); // 'consonant' | 'vowel' | null
  const [wobble, setWobble] = useState(false); // shake the machine on a wrong blend
  const [status, setStatus] = useState('idle'); // 'idle' | 'blending' | 'success' | 'fail'

  const slotCRef = useRef(null);
  const slotVRef = useRef(null);
  const floatRef = useRef(null);
  const dragRef = useRef(null);     // live drag data (offsets + cached slot rect) — no re-renders
  const timers = useRef([]);
  const processingRef = useRef(false);

  const lvl = LEVELS[levelIdx];

  const addTimer = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => { pending.forEach(clearTimeout); SpeechManager.stopSpeaking(); };
  }, []);

  const speak = useCallback((text) => { SpeechManager.speak(text, 'ms'); }, []);

  const loadLevel = useCallback((idx) => {
    const { cons: c, vow: v } = buildLevel(idx);
    setCons(c);
    setVow(v);
    setSlotC(null);
    setSlotV(null);
    setStatus('idle');
    processingRef.current = false;
  }, []);

  const startGame = useCallback(() => {
    setLevelIdx(0);
    setCompleted(0);
    setGameState('playing');
    loadLevel(0);
  }, [loadLevel]);

  // ── Drag wiring (floating balloon moved imperatively; no per-move re-render) ──
  useEffect(() => {
    if (!drag) return undefined;

    const onMove = (e) => {
      const info = dragRef.current;
      if (!info) return;
      const x = e.clientX - info.offX;
      const y = e.clientY - info.offY;
      if (floatRef.current) floatRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.18)`;
      const r = info.slot;
      const over = r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (over !== info.lastHover) {
        info.lastHover = over;
        setHoverSlot(over ? drag.type : null);
      }
    };
    const onUp = (e) => {
      const info = dragRef.current;
      const r = info?.slot;
      const over = r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (over) {
        playSound('correct');
        if (drag.type === 'consonant') setSlotC(drag.letter);
        else setSlotV(drag.letter);
      }
      dragRef.current = null;
      setDrag(null);
      setHoverSlot(null);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [drag]);

  const onBalloonDown = useCallback((e, letter, type) => {
    if (drag || processingRef.current) return;
    // Don't allow re-picking a letter that's already sitting in its slot.
    if (type === 'consonant' && slotC === letter) return;
    if (type === 'vowel' && slotV === letter) return;
    e.preventDefault();
    const el = e.currentTarget.getBoundingClientRect();
    const slotEl = (type === 'consonant' ? slotCRef : slotVRef).current;
    const sr = slotEl ? slotEl.getBoundingClientRect() : null;
    dragRef.current = {
      offX: e.clientX - el.left,
      offY: e.clientY - el.top,
      slot: sr ? { left: sr.left, right: sr.right, top: sr.top, bottom: sr.bottom } : null,
      lastHover: false,
    };
    setDrag({ letter, type, w: el.width, x0: el.left, y0: el.top });
  }, [drag, slotC, slotV]);

  // ── When both slots are filled, run the blend check ──
  useEffect(() => {
    if (gameState !== 'playing' || processingRef.current) return;
    if (!slotC || !slotV) return;

    processingRef.current = true;
    setStatus('blending');
    playSound('click');

    addTimer(() => {
      const ok = slotC === lvl.consonant && slotV === lvl.vowel;
      if (ok) {
        setStatus('success');
        playSound('correct');
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
        speak(lvl.word);
        const isLast = levelIdx >= LEVELS.length - 1;
        addTimer(() => {
          if (isLast) {
            setCompleted((n) => n + 1);
            confetti({ particleCount: 180, spread: 110, origin: { y: 0.5 } });
            setGameState('won');
          } else {
            setLevelIdx((i) => { loadLevel(i + 1); return i + 1; });
          }
        }, 2400);
      } else {
        setStatus('fail');
        playSound('wrong');
        setWobble(true);
        speak(language === 'bm' ? 'Cuba lagi.' : 'Try again.');
        addTimer(() => {
          setWobble(false);
          // Reset slots + reshuffle the trays for another try.
          const { cons: c, vow: v } = buildLevel(levelIdx);
          setCons(c);
          setVow(v);
          setSlotC(null);
          setSlotV(null);
          setStatus('idle');
          processingRef.current = false;
        }, 1100);
      }
    }, 850);
  }, [slotC, slotV, gameState, levelIdx, lvl, language, addTimer, speak, loadLevel]);

  // ── Theme helpers ──
  const swatch = theme.swatch || '#059669';

  // ── Status / tube message ──
  const tubeText = (() => {
    if (status === 'blending') return language === 'bm' ? 'Mengadun suku kata… 💫' : 'Blending syllable… 💫';
    if (status === 'success') return `${lvl.syllable}!`;
    if (status === 'fail') return language === 'bm' ? `Bukan ${slotC || ''}${slotV || ''}! Cuba lagi…` : `Not ${slotC || ''}${slotV || ''}! Try again…`;
    if (slotC && !slotV) return language === 'bm' ? `Konsonan "${slotC}" sedia! Tambah vokal…` : `Consonant "${slotC}" ready! Add a vowel…`;
    if (!slotC && slotV) return language === 'bm' ? `Vokal "${slotV}" sedia! Tambah konsonan…` : `Vowel "${slotV}" ready! Add a consonant…`;
    return language === 'bm' ? 'Seret huruf ke dalam mesin!' : 'Drag letters into the machine!';
  })();

  const lightColor = status === 'blending' || (slotC && slotV) ? '#22C55E' : (slotC || slotV) ? '#F59E0B' : '#EF4444';

  const renderBalloonBody = (letter, type, interactive) => {
    const grad = type === 'consonant'
      ? 'linear-gradient(145deg,#818CF8 0%,#4338CA 100%)'
      : 'linear-gradient(145deg,#FB7185 0%,#BE123C 100%)';
    const shadowC = type === 'consonant' ? 'rgba(67,56,202,0.45)' : 'rgba(190,18,60,0.45)';
    return (
      <div style={{
        width: 'var(--kv-balloon)', height: 'var(--kv-balloon)',
        borderRadius: '50% 50% 48% 48% / 56% 56% 44% 44%', background: grad,
        border: '2.5px solid rgba(255,255,255,0.55)',
        boxShadow: interactive ? `0 8px 20px ${shadowC}, inset 8px 8px 14px rgba(255,255,255,0.25), inset -8px -6px 14px rgba(0,0,0,0.18)` : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'var(--kv-balloon-fs)', color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>
          {letter}
        </span>
        <div style={{ position: 'absolute', top: '16%', left: '20%', width: '26%', height: '15%', borderRadius: '50%', background: 'rgba(255,255,255,0.45)', transform: 'rotate(-32deg)' }} />
      </div>
    );
  };

  // ── Tray (consonant / vowel) ──
  const Tray = ({ titleBm, titleEn, emoji, letters, type, placedLetter }) => (
    <div style={{ flex: 1, background: 'rgba(255,255,255,0.95)', borderRadius: '18px', border: '2px solid #BBF7D0', padding: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', minWidth: 0 }}>
      <span style={{ background: '#10B981', color: '#fff', borderRadius: '999px', padding: '0.15rem 0.8rem', fontWeight: 800, fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
        {(language === 'bm' ? titleBm : titleEn)} {emoji}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', minHeight: 'var(--kv-balloon)' }}>
        {letters.map((letter, i) => {
          const placed = placedLetter === letter;
          if (placed) {
            return <div key={`${letter}-${i}`} style={{ width: 'var(--kv-balloon)', height: 'var(--kv-balloon)', borderRadius: '50%', border: '2px dashed #CBD5E1', opacity: 0.5 }} />;
          }
          const isDragging = drag && drag.type === type && drag.letter === letter;
          return (
            <div
              key={`${letter}-${i}`}
              className="kv-balloon"
              onPointerDown={(e) => onBalloonDown(e, letter, type)}
              style={{ cursor: 'grab', touchAction: 'none', animationDelay: `${i * 0.15}s`, visibility: isDragging ? 'hidden' : 'visible' }}
            >
              {renderBalloonBody(letter, type, true)}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Slot (drop target) ──
  const Slot = ({ slotRef, type, label, placeholder, placedLetter }) => {
    const glow = hoverSlot === type;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
        <span style={{ color: '#FDE047', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
        <div
          ref={slotRef}
          style={{
            width: 'var(--kv-slot)', height: 'var(--kv-slot)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.25s',
            ...(placedLetter
              ? { background: 'transparent', border: 'none', animation: 'kvPop 0.45s' }
              : { background: glow ? 'rgba(220,252,231,0.85)' : 'rgba(15,118,110,0.35)', border: `4px dashed ${glow ? '#22C55E' : 'rgba(94,234,212,0.6)'}`, transform: glow ? 'scale(1.08)' : 'none', boxShadow: glow ? '0 0 18px rgba(34,197,94,0.45)' : 'none' }),
          }}
        >
          {placedLetter
            ? renderBalloonBody(placedLetter, type, false)
            : <span style={{ color: 'rgba(204,251,241,0.5)', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'var(--kv-slot-fs)' }}>{placeholder}</span>}
        </div>
      </div>
    );
  };

  // ════════════════════════ WON ════════════════════════
  if (gameState === 'won') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F0FDF4' }}>
        <BackButton onClick={onBack} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', gap: '1.25rem' }}>
          <Trophy size={84} color="#FFC800" />
          <h1 style={{ fontWeight: 900, fontSize: '2rem', color: '#16A34A', margin: 0, fontFamily: 'var(--font-heading)', textAlign: 'center' }}>
            {language === 'bm' ? '🎉 Syabas! Tahniah!' : '🎉 Well Done!'}
          </h1>
          <p style={{ color: '#64748B', fontWeight: 700, margin: 0, fontSize: '1.05rem', textAlign: 'center', maxWidth: 360 }}>
            {language === 'bm'
              ? 'Kamu berjaya membina semua suku kata KV dengan cemerlang!'
              : 'You built every KV syllable brilliantly!'}
          </p>
          <div style={{ background: '#fff', border: '2px solid #E2E8F0', borderRadius: '20px', padding: '1rem 2rem', display: 'flex', gap: '2rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>{language === 'bm' ? 'Suku Kata' : 'Syllables'}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: swatch }}>{LEVELS.length}/{LEVELS.length}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={startGame} onMouseEnter={playHoverSound} style={{ padding: '0.9rem 1.75rem', background: '#22C55E', color: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 6px 0 #15803D', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              <RefreshCw size={20} /> {language === 'bm' ? 'Main Semula' : 'Play Again'}
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
      background: 'linear-gradient(180deg,#F0FDF4 0%,#DCFCE7 50%,#BBF7D0 100%)',
      overflow: 'hidden', userSelect: 'none', WebkitUserSelect: 'none',
      '--kv-balloon': 'clamp(46px, 8vw, 64px)',
      '--kv-balloon-fs': 'clamp(1.4rem, 3.6vw, 2rem)',
      '--kv-slot': 'clamp(72px, 15vw, 104px)',
      '--kv-slot-fs': 'clamp(2.2rem, 5vw, 3rem)',
    }}>
      <style>{`
        @keyframes kvSway { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-4px) rotate(2deg); } }
        @keyframes kvPop  { 0% { transform: scale(0.85); } 50% { transform: scale(1.18); } 100% { transform: scale(1); } }
        @keyframes kvWobble { 0%,100% { transform: translateX(0); } 15% { transform: translateX(-8px) rotate(-2deg); } 30% { transform: translateX(6px) rotate(2deg); } 45% { transform: translateX(-4px); } 60% { transform: translateX(2px); } }
        @keyframes kvPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .kv-balloon { animation: kvSway 4s ease-in-out infinite; }
      `}</style>

      {/* Top bar: back + progress + score */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: 'max(0.75rem, env(safe-area-inset-top)) 1rem 0.5rem' }}>
        <BackButton onClick={onBack} style={{ position: 'static', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.35rem', overflowX: 'auto', padding: '0.15rem 0' }}>
          {LEVELS.map((l, idx) => (
            <span key={idx} style={{
              flexShrink: 0, padding: '0.15rem 0.5rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 800, whiteSpace: 'nowrap',
              ...(idx === levelIdx
                ? { background: '#FBBF24', color: '#7c2d12', boxShadow: '0 2px 0 #D97706' }
                : idx < levelIdx
                ? { background: '#DCFCE7', color: '#15803D' }
                : { background: '#F1F5F9', color: '#94A3B8' }),
            }}>
              {idx < levelIdx ? '✓ ' : idx === levelIdx ? '🌸 ' : ''}{l.syllable}
            </span>
          ))}
        </div>
        <div style={{ background: '#FFF7ED', border: '2px solid #FED7AA', borderRadius: '999px', padding: '0.2rem 0.65rem', fontWeight: 800, fontSize: '0.85rem', color: '#EA580C', flexShrink: 0 }}>
          ⭐ {levelIdx}/{LEVELS.length}
        </div>
      </div>

      {/* Main play area */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.75rem', padding: '0.5rem 1rem 1rem', maxWidth: 640, width: '100%', margin: '0 auto' }}>

        {/* Target clue card */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '2px solid #FBBF24', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', boxShadow: '0 4px 0 #FDE68A' }}>
          <span style={{ fontSize: 'clamp(2.6rem, 9vw, 4rem)', lineHeight: 1 }}>{lvl.emoji}</span>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(1.8rem, 7vw, 2.8rem)', color: '#1E293B', letterSpacing: '0.02em' }}>
            <span style={{ color: '#10B981', textDecoration: 'underline wavy' }}>{lvl.syllable}</span>{lvl.remainder}
          </div>
        </div>

        {/* Blending machine */}
        <div style={{
          background: 'linear-gradient(135deg,#059669,#115E59)', borderRadius: '20px', borderBottom: '5px solid #134E4A',
          padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
          animation: wobble ? 'kvWobble 0.6s ease-in-out' : undefined,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: lightColor, animation: 'kvPulse 1s ease-in-out infinite', display: 'block' }} />
            <span style={{ color: '#FDE047', fontWeight: 900, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {language === 'bm' ? 'Mesin Penggabung' : 'Blending Machine'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Slot slotRef={slotCRef} type="consonant" label={language === 'bm' ? '1. Konsonan' : '1. Consonant'} placeholder="K" placedLetter={slotC} />
            <span style={{ color: '#FBBF24', fontWeight: 900, fontSize: '2.2rem', animation: 'kvPulse 1.4s ease-in-out infinite' }}>+</span>
            <Slot slotRef={slotVRef} type="vowel" label={language === 'bm' ? '2. Vokal' : '2. Vowel'} placeholder="V" placedLetter={slotV} />
          </div>

          <div style={{ width: '100%', maxWidth: 380, background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(94,234,212,0.3)', borderRadius: '10px', padding: '0.5rem 0.75rem', minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{
              fontWeight: 800, textAlign: 'center', lineHeight: 1.3,
              fontSize: status === 'success' ? '1.6rem' : '0.82rem',
              color: status === 'success' ? '#FDE047' : '#5EEAD4',
              fontFamily: status === 'success' ? 'var(--font-heading)' : 'inherit',
              letterSpacing: status === 'success' ? '0.1em' : 'normal',
              animation: status === 'success' ? 'kvPop 0.5s' : undefined,
            }}>
              {tubeText}
            </span>
          </div>
        </div>

        {/* Letter trays */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Tray titleBm="Konsonan" titleEn="Consonants" emoji="🔠" letters={cons} type="consonant" placedLetter={slotC} />
          <Tray titleBm="Vokal" titleEn="Vowels" emoji="🅰️" letters={vow} type="vowel" placedLetter={slotV} />
        </div>
      </div>

      {/* Floating balloon following the pointer while dragging */}
      {drag && (
        <div ref={floatRef} style={{
          position: 'fixed', left: 0, top: 0, width: drag.w, height: drag.w, zIndex: 1000, pointerEvents: 'none',
          transform: `translate(${drag.x0}px, ${drag.y0}px) scale(1.18)`, filter: 'drop-shadow(0 16px 20px rgba(0,0,0,0.25))',
        }}>
          {renderBalloonBody(drag.letter, drag.type, true)}
        </div>
      )}
    </div>
  );
}
