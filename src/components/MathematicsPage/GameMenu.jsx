import React, { useState } from 'react';
import BackButton from '../BackButton';

const OPERATIONS = [
  { id: 'add',      emoji: '➕', labelBm: 'Tambah',  labelEn: 'Addition',       color: '#62D98B', dark: '#20A458', light: '#DDFBE8' },
  { id: 'subtract', emoji: '➖', labelBm: 'Tolak',   labelEn: 'Subtraction',    color: '#68C7F7', dark: '#188CC5', light: '#DDF3FF' },
  { id: 'multiply', emoji: '✖️', labelBm: 'Darab',   labelEn: 'Multiplication', color: '#D9A5FF', dark: '#9957C8', light: '#F3E3FF' },
  { id: 'divide',   emoji: '➗', labelBm: 'Bahagi',  labelEn: 'Division',       color: '#FFB86C', dark: '#D46B1F', light: '#FFE8CF' },
  { id: 'random',   emoji: '🎲', labelBm: 'Rawak',   labelEn: 'Random Mix',     color: '#FF8B8B', dark: '#D94B4B', light: '#FFE0E0' },
];

const DIFFICULTIES = [
  { id: 'easy',   emoji: '🌱', labelBm: 'Senang',    labelEn: 'Easy',   descBm: '(1-9)',     color: '#62D98B', dark: '#20A458', light: '#DDFBE8' },
  { id: 'medium', emoji: '⭐', labelBm: 'Sederhana', labelEn: 'Medium', descBm: '(10-99)',   color: '#FFD873', dark: '#D59B17', light: '#FFF3CF' },
  { id: 'hard',   emoji: '🔥', labelBm: 'Susah',     labelEn: 'Hard',   descBm: '(100+)',    color: '#FF8B8B', dark: '#D94B4B', light: '#FFE0E0' },
];

const INPUT_MODES = [
  { id: 'multiple', emoji: '🔘', labelBm: 'Pilihan', labelEn: 'Choices', color: '#D9A5FF', dark: '#9957C8', light: '#F3E3FF' },
  { id: 'typing',   emoji: '⌨️', labelBm: 'Taip',    labelEn: 'Type',    color: '#FFB86C', dark: '#D46B1F', light: '#FFE8CF' },
];

// Numbers 1 to 9
const NUMBERS = Array.from({length: 9}, (_, i) => i + 1);

export default function GameMenu({
  onStart,
  onBack,
  language,
  embedded = false,
  initialOperation = null,
  initialDifficulty = null,
  initialNums = [],
  initialInputMode = null,
}) {
  const [selOp,    setSelOp]    = useState(() => OPERATIONS.find(op => op.id === initialOperation) || null);
  const [selNums,  setSelNums]  = useState(() => Array.isArray(initialNums) ? initialNums : []);
  const [selDiff,  setSelDiff]  = useState(() => DIFFICULTIES.find(d => d.id === initialDifficulty) || null);
  const [selInput, setSelInput] = useState(() => INPUT_MODES.find(m => m.id === initialInputMode) || null);

  const bm = language === 'bm';

  const handleToggleNum = (n) => {
    if (n === 'random') {
      setSelNums(['random']);
      return;
    }
    
    let current = selNums.includes('random') ? [] : [...selNums];
    if (current.includes(n)) {
       current = current.filter(x => x !== n);
    } else {
       current.push(n);
    }
    
    setSelNums(current);
  };

  const handleStart = () => {
    if (selOp && selDiff && selInput) {
      const finalNums = selNums.includes('random') ? [] : selNums;
      onStart(selOp.id, selDiff.id, finalNums, selInput.id);
    }
  };

  const isReady = selOp && selDiff && selInput;

  return (
    <div className={`math-menu-fullscreen${embedded ? ' math-menu-embedded' : ''}`}>
      <style>{`
        .math-menu-fullscreen {
          width: 100%;
          height: 100vh;
          height: 100dvh;
          max-width: 100vw;
          min-width: 0;
          display: flex;
          flex-direction: column;
          min-height: 0;
          background:
            radial-gradient(circle at 16% 10%, rgba(45, 212, 191, 0.14), transparent 30%),
            radial-gradient(circle at 84% 4%, rgba(255, 216, 115, 0.18), transparent 28%),
            linear-gradient(180deg, #FBFCFD 0%, #F7FBF8 52%, #EEF6F5 100%);
          overflow-y: hidden;
          overflow-x: hidden;
          padding: 0 clamp(0.55rem, 2.6vw, 1.2rem);
          margin: 0 auto;
          box-sizing: border-box;
        }
        .math-menu-fullscreen *,
        .math-menu-fullscreen *::before,
        .math-menu-fullscreen *::after {
          box-sizing: border-box;
        }
        .math-menu-embedded {
          height: 100%;
          max-width: none;
          margin: 0;
          padding: 0;
          background: transparent;
          overflow: hidden;
        }
        .math-scroll-area {
          flex: 1 1 auto;
          width: min(100%, 760px);
          max-width: 100%;
          margin: 0 auto;
          padding: clamp(3.1rem, 7dvh, 4.25rem) 0 clamp(0.6rem, 1.8dvh, 1rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(0.45rem, 1.35dvh, 0.85rem);
          min-height: 0;
          overflow: hidden;
          box-sizing: border-box;
        }
        .math-menu-embedded .math-scroll-area {
          flex: 1 1 auto;
          overflow-y: hidden;
          overflow-x: hidden;
          padding: clamp(0.65rem, 2vh, 1rem);
          gap: clamp(0.55rem, 1.6vh, 0.85rem);
        }
        .math-section {
          background:
            radial-gradient(circle at 12% 0%, rgba(255,255,255,0.9), transparent 42%),
            linear-gradient(145deg, rgba(255, 255, 255, 0.94), #F4F8F2);
          border: 1px solid rgba(227, 236, 224, 0.9);
          border-radius: clamp(18px, 3.5vmin, 24px);
          padding: clamp(0.62rem, 1.6dvh, 1rem);
          box-shadow:
            0 18px 34px rgba(55, 110, 30, 0.08),
            0 5px 0 rgba(227, 236, 224, 0.86),
            inset 0 2px 0 rgba(255,255,255,0.9),
            inset 0 -10px 18px rgba(55, 110, 30, 0.04);
          min-width: 0;
          box-sizing: border-box;
        }
        .math-menu-embedded .math-section {
          padding: clamp(0.65rem, 1.7vh, 0.9rem);
          border-radius: clamp(16px, 3vw, 22px);
        }
        .math-menu-embedded .math-section-title {
          font-size: clamp(0.78rem, 2.1vmin, 0.98rem);
          margin-bottom: clamp(0.35rem, 1.1vh, 0.65rem);
        }
        .math-section-title {
          font-size: clamp(0.8rem, 2.2vmin, 1.05rem);
          font-weight: 900;
          color: #3F2A86;
          margin-bottom: clamp(0.38rem, 1.2dvh, 0.7rem);
          letter-spacing: 0.5px;
          text-shadow: 0 2px 0 rgba(255,255,255,0.85);
        }
        .math-btn-card-vert {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background:
            radial-gradient(circle at 28% 18%, rgba(255,255,255,0.72), transparent 34%),
            linear-gradient(145deg, #FFFFFF 0%, var(--btn-light, #f5f5f5) 100%);
          border: 2px solid rgba(255,255,255,0.82);
          border-bottom: 6px solid var(--btn-dark, #C0C0C0);
          border-radius: clamp(14px, 2.8vmin, 20px);
          padding: clamp(0.42rem, 1.3dvh, 0.72rem) clamp(0.15rem, 1vw, 0.38rem);
          text-align: center;
          transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease, border-bottom-width 0.18s ease, background 0.18s ease;
          width: 100%;
          min-width: 0;
          cursor: pointer;
          font-family: inherit;
          box-shadow:
            0 12px 18px color-mix(in srgb, var(--btn-color, #E5E5E5) 24%, transparent),
            inset 0 3px 0 rgba(255,255,255,0.86),
            inset 0 -8px 14px rgba(0,0,0,0.08);
        }
        .math-btn-card-vert:hover {
          transform: translateY(-4px) scale(1.015);
          box-shadow:
            0 18px 26px color-mix(in srgb, var(--btn-color, #E5E5E5) 30%, transparent),
            inset 0 3px 0 rgba(255,255,255,0.9),
            inset 0 -8px 14px rgba(0,0,0,0.08);
          border-bottom-width: 8px;
        }
        .math-btn-card-vert:active {
          transform: translateY(2px);
          border-bottom-width: 3px;
          box-shadow:
            0 7px 12px color-mix(in srgb, var(--btn-color, #E5E5E5) 22%, transparent),
            inset 0 6px 12px rgba(0,0,0,0.1),
            inset 0 -2px 5px rgba(255,255,255,0.55);
        }
        .math-btn-card-vert.selected {
          background:
            radial-gradient(circle at 30% 18%, rgba(255,255,255,0.42), transparent 36%),
            linear-gradient(145deg, color-mix(in srgb, var(--btn-color) 76%, white), var(--btn-color));
          color: white;
          border-color: rgba(255,255,255,0.72);
          border-bottom-color: var(--btn-dark);
          box-shadow:
            0 0 0 5px var(--btn-light),
            0 15px 24px color-mix(in srgb, var(--btn-color) 34%, transparent),
            inset 0 3px 0 rgba(255,255,255,0.34),
            inset 0 -9px 14px rgba(0,0,0,0.16);
          transform: translateY(-2px) scale(1.04);
        }
        .math-btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(1.05rem, 3.1vmin, 1.85rem);
          flex-shrink: 0;
          width: clamp(32px, 6.4vmin, 54px);
          height: clamp(32px, 6.4vmin, 54px);
          border-radius: clamp(11px, 2.4vmin, 18px);
          background: rgba(255,255,255,0.42);
          box-shadow:
            inset 0 2px 0 rgba(255,255,255,0.78),
            inset 0 -4px 8px rgba(0,0,0,0.08);
          text-shadow: 0 3px 0 rgba(0,0,0,0.1);
        }
        .math-btn-label {
          font-weight: 900;
          font-size: clamp(0.62rem, 1.9vmin, 0.84rem);
          color: #3C3C3C;
          line-height: 1.2;
          word-break: break-word;
          text-shadow: 0 1px 0 rgba(255,255,255,0.75);
        }
        .math-menu-embedded .math-btn-card-vert {
          padding: clamp(0.4rem, 1.5vmin, 0.7rem) 0.25rem;
          gap: clamp(0.15rem, 0.6vmin, 0.35rem);
          border-radius: clamp(13px, 2.5vw, 18px);
          border-bottom-width: clamp(3px, 0.8vmin, 5px);
        }
        .math-menu-embedded .math-btn-icon {
          width: clamp(32px, 5.8vmin, 48px);
          height: clamp(32px, 5.8vmin, 48px);
          border-radius: clamp(10px, 2vw, 16px);
          font-size: clamp(1.05rem, 3.2vmin, 1.65rem);
        }
        .math-menu-embedded .math-btn-label {
          font-size: clamp(0.65rem, 1.9vmin, 0.84rem);
        }
        .math-btn-card-vert.selected .math-btn-label {
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        .math-btn-desc {
          font-weight: 700;
          font-size: 0.65rem;
          color: #677064;
        }

        /* Responsive grid helpers - Mobile first */
        .grid-ops {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: clamp(0.28rem, 1.15vmin, 0.65rem);
        }
        .btn-rawak {
          grid-column: span 1;
          flex-direction: column;
          justify-content: center;
        }
        .btn-rawak .math-btn-label {
          font-size: 0.65rem;
        }
        @media (min-width: 768px) {
          .grid-ops {
            gap: clamp(0.45rem, 1.2vmin, 0.8rem);
          }
          .btn-rawak .math-btn-label {
            font-size: 0.85rem;
          }
        }
        .grid-nombor {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: clamp(0.28rem, 1.15vmin, 0.65rem);
        }
        @media (min-width: 768px) {
          .grid-nombor {
            grid-template-columns: repeat(10, minmax(0, 1fr));
            gap: clamp(0.45rem, 1.2vmin, 0.8rem);
          }
        }
        .grid-3-cols {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(0.28rem, 1.15vmin, 0.65rem);
        }
        @media (min-width: 768px) {
          .grid-3-cols {
            gap: clamp(0.45rem, 1.2vmin, 0.8rem);
          }
        }
        .grid-2-cols {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(0.28rem, 1.15vmin, 0.65rem);
        }
        .math-menu-start-wrap {
          flex-shrink: 0;
          margin-top: clamp(0.35rem, 1vh, 0.75rem);
        }
        .math-menu-embedded .math-start-btn {
          padding: clamp(0.62rem, 1.75vh, 0.88rem) !important;
          font-size: clamp(0.95rem, 2.4vmin, 1.1rem) !important;
          border-radius: 18px !important;
        }
        @media (max-width: 430px), (max-height: 680px) {
          .math-menu-embedded .grid-ops {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .math-menu-embedded .math-scroll-area {
            padding: clamp(0.45rem, 1.5vh, 0.7rem);
            gap: clamp(0.38rem, 1.1vh, 0.55rem);
          }
          .math-menu-embedded .math-section {
            padding: clamp(0.42rem, 1.3vh, 0.65rem);
          }
          .math-menu-embedded .math-section-title {
            font-size: 0.78rem;
            margin-bottom: 0.34rem;
          }
          .math-menu-embedded .math-btn-card-vert {
            padding-block: clamp(0.26rem, 1vh, 0.45rem);
          }
          .math-menu-embedded .math-btn-icon {
            width: clamp(27px, 5.2vmin, 36px);
            height: clamp(27px, 5.2vmin, 36px);
            font-size: clamp(0.95rem, 2.7vmin, 1.15rem);
          }
        }
        @media (min-width: 768px) {
          .grid-2-cols {
            gap: clamp(0.45rem, 1.2vmin, 0.8rem);
          }
        }
        .math-start-btn {
          min-width: 0;
          max-width: 100%;
        }
        @media (max-height: 680px) {
          .math-scroll-area {
            padding-top: clamp(2.75rem, 8dvh, 3.35rem);
            gap: clamp(0.32rem, 1dvh, 0.5rem);
          }
          .math-section {
            padding: clamp(0.4rem, 1.25dvh, 0.62rem);
            border-radius: 16px;
          }
          .math-section-title {
            font-size: 0.78rem;
            margin-bottom: 0.32rem;
          }
          .math-btn-card-vert {
            padding-block: clamp(0.25rem, 0.95dvh, 0.45rem);
            gap: 2px;
            border-bottom-width: 3px;
          }
          .math-btn-icon {
            width: clamp(27px, 5.2vmin, 38px);
            height: clamp(27px, 5.2vmin, 38px);
            font-size: clamp(0.9rem, 2.65vmin, 1.15rem);
          }
          .math-btn-label {
            font-size: clamp(0.56rem, 1.75vmin, 0.72rem);
          }
          .math-start-btn {
            padding: clamp(0.55rem, 1.55dvh, 0.75rem) !important;
            font-size: clamp(0.95rem, 2.4vmin, 1.1rem) !important;
          }
        }
        @media (max-height: 540px) and (orientation: landscape) {
          .math-scroll-area {
            padding-top: 0.5rem;
          }
          .math-menu-fullscreen > :not(style):first-of-type {
            transform: scale(0.82);
            transform-origin: top left;
          }
        }
        @media (max-width: 560px) {
          .math-menu-fullscreen {
            padding: 0 0.45rem;
          }
          .math-btn-icon {
            width: 32px;
            height: 32px;
            font-size: 1.1rem;
          }
          .math-btn-label {
            font-size: 0.6rem;
          }
          .math-btn-card-vert {
            padding: 6px 2px;
            gap: 2px;
            border-radius: 14px;
            border: 2px solid rgba(255,255,255,0.82);
            border-bottom: 3px solid var(--btn-dark, #C0C0C0);
          }
          .math-section {
            padding: 0.75rem;
            border-radius: 18px;
          }
          .math-scroll-area {
            padding: clamp(2.95rem, 7dvh, 3.4rem) 0 0.55rem;
            gap: clamp(0.34rem, 1.1dvh, 0.48rem);
          }
          .math-section-title {
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
            font-weight: 800;
          }
          .math-start-btn {
            padding: 12px;
            font-size: 1.1rem;
          }
        }

      `}</style>

      {!embedded && (
        <BackButton
          onClick={onBack}
          style={{
            background: 'linear-gradient(145deg, #FFFFFF, #F4F8F2)',
            border: '1px solid rgba(227, 236, 224, 0.95)',
            boxShadow: '0 8px 18px rgba(55, 110, 30, 0.12), 0 3px 0 #DDE8DA, inset 0 2px 0 rgba(255,255,255,0.9), inset 0 -5px 10px rgba(55,110,30,0.06)',
          }}
        />
      )}

      <div className="math-scroll-area">

        {/* 1. Operation */}
        <div className="math-section">
          <div className="math-section-title">1. {bm ? 'Operasi' : 'Operation'}</div>
          
          <div className="grid-ops">
            {OPERATIONS.map(op => {
              const isSelected = selOp?.id === op.id;
              const isRandom = op.id === 'random';
              return (
                <button
                  key={op.id}
                  onClick={() => setSelOp(op)}
                  className={`math-btn-card-vert ${isSelected ? 'selected' : ''} ${isRandom ? 'btn-rawak' : ''}`}
                  style={{ '--btn-color': op.color, '--btn-dark': op.dark, '--btn-light': op.light }}
                >
                  <div className="math-btn-icon">{op.emoji}</div>
                  <div className="math-btn-label">{bm ? op.labelBm : op.labelEn}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Number - 2 rows (5 columns grid) */}
        <div className="math-section">
          <div className="math-section-title">2. {bm ? 'Nombor' : 'Number to Play'}</div>
          <div className="grid-nombor">
            
            {/* 1st row: 1-5 */}
            {NUMBERS.slice(0, 5).map(n => {
              const isSelected = selNums.includes(n);
              return (
                <button
                  key={n}
                  onClick={() => handleToggleNum(n)}
                  className={`math-btn-card-vert ${isSelected ? 'selected' : ''}`}
                  style={{ '--btn-color': '#68C7F7', '--btn-dark': '#188CC5', '--btn-light': '#DDF3FF', padding: '6px' }}
                >
                  <div className="math-btn-icon" style={{ borderRadius: '8px', width: '38px', height: '38px', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>{n}</div>
                </button>
              );
            })}

            {/* 2nd row: 6-9 */}
            {NUMBERS.slice(5, 9).map(n => {
              const isSelected = selNums.includes(n);
              return (
                <button
                  key={n}
                  onClick={() => handleToggleNum(n)}
                  className={`math-btn-card-vert ${isSelected ? 'selected' : ''}`}
                  style={{ '--btn-color': '#68C7F7', '--btn-dark': '#188CC5', '--btn-light': '#DDF3FF', padding: '6px' }}
                >
                  <div className="math-btn-icon" style={{ borderRadius: '8px', width: '38px', height: '38px', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>{n}</div>
                </button>
              );
            })}

            {/* Random Button */}
            <button
               onClick={() => handleToggleNum('random')}
               className={`math-btn-card-vert ${selNums.includes('random') ? 'selected' : ''}`}
               style={{ '--btn-color': '#D9A5FF', '--btn-dark': '#9957C8', '--btn-light': '#F3E3FF', padding: '6px' }}
            >
               <div className="math-btn-icon" style={{ borderRadius: '8px', width: '38px', height: '38px', fontSize: '1.2rem' }}>🎲</div>
            </button>

          </div>
        </div>

        {/* 3. Difficulty - 1 Row */}
        <div className="math-section">
          <div className="math-section-title">3. {bm ? 'Tahap Kesukaran' : 'Difficulty'}</div>
          <div className="grid-3-cols">
            {DIFFICULTIES.map(d => {
              const isSelected = selDiff?.id === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelDiff(d)}
                  className={`math-btn-card-vert ${isSelected ? 'selected' : ''}`}
                  style={{ '--btn-color': d.color, '--btn-dark': d.dark, '--btn-light': d.light }}
                >
                  <div className="math-btn-icon">{d.emoji}</div>
                  <div className="math-btn-label">{bm ? d.labelBm : d.labelEn}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Input Mode - 1 Row (2 cols) */}
        <div className="math-section">
          <div className="math-section-title">4. {bm ? 'Cara Menjawab' : 'Input mode'}</div>
          <div className="grid-2-cols">
            {INPUT_MODES.map(m => {
              const isSelected = selInput?.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelInput(m)}
                  className={`math-btn-card-vert ${isSelected ? 'selected' : ''}`}
                  style={{ '--btn-color': m.color, '--btn-dark': m.dark, '--btn-light': m.light, flexDirection: 'row', justifyContent: 'center' }}
                >
                  <div className="math-btn-icon">{m.emoji}</div>
                  <div className="math-btn-label" style={{ fontSize: '0.9rem' }}>{bm ? m.labelBm : m.labelEn}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Start Button - Part of scroll area */}
        <div className="math-menu-start-wrap">
          <button
            className="math-start-btn"
            disabled={!isReady}
            onClick={handleStart}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1.2rem',
              fontWeight: 900,
              color: 'white',
              background: isReady
                ? 'radial-gradient(circle at 30% 12%, rgba(255,255,255,0.36), transparent 34%), linear-gradient(145deg, #8EEB52 0%, #22C55E 62%, #16A34A 100%)'
                : 'linear-gradient(145deg, #FFFFFF, #E9EFE6)',
              border: isReady ? '1px solid rgba(255,255,255,0.7)' : '1px solid #DDE8DA',
              borderBottom: isReady ? '6px solid #15803D' : '4px solid #B8C7B3',
              borderRadius: '22px',
              cursor: isReady ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: isReady
                ? '0 16px 26px rgba(34, 197, 94, 0.25), inset 0 3px 0 rgba(255,255,255,0.3), inset 0 -8px 14px rgba(0,0,0,0.14)'
                : 'inset 0 2px 0 rgba(255,255,255,0.85)',
              letterSpacing: '0.5px',
              textShadow: isReady ? '0 2px 0 rgba(0,0,0,0.14)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (isReady) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 20px 32px rgba(34, 197, 94, 0.32), inset 0 3px 0 rgba(255,255,255,0.32), inset 0 -8px 14px rgba(0,0,0,0.14)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = isReady ? '0 16px 26px rgba(34, 197, 94, 0.25), inset 0 3px 0 rgba(255,255,255,0.3), inset 0 -8px 14px rgba(0,0,0,0.14)' : 'inset 0 2px 0 rgba(255,255,255,0.85)';
            }}
            onMouseDown={(e) => {
              if (isReady) {
                e.currentTarget.style.transform = 'translateY(2px)';
                e.currentTarget.style.borderBottomWidth = '3px';
              }
            }}
            onMouseUp={(e) => {
              if (isReady) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderBottomWidth = '6px';
              }
            }}
          >
            {bm ? 'Mula Main!' : 'Start Playing!'} 🚀
          </button>
        </div>

      </div>

    </div>
  );
}
