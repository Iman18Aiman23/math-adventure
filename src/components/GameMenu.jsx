import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const OPERATIONS = [
  { id: 'add',      emoji: '➕', labelBm: 'Tambah',  labelEn: 'Addition',       color: '#58CC02', dark: '#46A302', light: '#d7ffb8' },
  { id: 'subtract', emoji: '➖', labelBm: 'Tolak',   labelEn: 'Subtraction',    color: '#1CB0F6', dark: '#0B8DC0', light: '#ddf4ff' },
  { id: 'multiply', emoji: '✖️', labelBm: 'Darab',   labelEn: 'Multiplication', color: '#CE82FF', dark: '#9B59B6', light: '#f4dfff' },
  { id: 'divide',   emoji: '➗', labelBm: 'Bahagi',  labelEn: 'Division',       color: '#FF9600', dark: '#CC7800', light: '#ffe6c2' },
  { id: 'random',   emoji: '🎲', labelBm: 'Rawak',   labelEn: 'Random Mix',     color: '#FF4B4B', dark: '#CC3B3B', light: '#ffd9d9' },
];

const DIFFICULTIES = [
  { id: 'easy',   emoji: '🌱', labelBm: 'Senang',    labelEn: 'Easy',   descBm: '(1-9)',     color: '#58CC02', dark: '#46A302', light: '#d7ffb8' },
  { id: 'medium', emoji: '⭐', labelBm: 'Sederhana', labelEn: 'Medium', descBm: '(10-99)',   color: '#FFC800', dark: '#CC9C00', light: '#fff3cd' },
  { id: 'hard',   emoji: '🔥', labelBm: 'Susah',     labelEn: 'Hard',   descBm: '(100+)',    color: '#FF4B4B', dark: '#CC3B3B', light: '#ffd9d9' },
];

const INPUT_MODES = [
  { id: 'multiple', emoji: '🔘', labelBm: 'Pilihan', labelEn: 'Choices', color: '#CE82FF', dark: '#9B59B6', light: '#f4dfff' },
  { id: 'typing',   emoji: '⌨️', labelBm: 'Taip',    labelEn: 'Type',    color: '#FF9600', dark: '#CC7800', light: '#ffe6c2' },
];

// Numbers 1 to 9
const NUMBERS = Array.from({length: 9}, (_, i) => i + 1);

export default function GameMenu({ onStart, onBack, onHome, language }) {
  const [selOp,    setSelOp]    = useState(null);
  const [selNums,  setSelNums]  = useState([]);
  const [selDiff,  setSelDiff]  = useState(null);
  const [selInput, setSelInput] = useState(null);

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
    <div className="math-menu-fullscreen">
      <style>{`
        .math-menu-fullscreen {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #f7f7f7;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .math-header {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          background: #fff;
          border-bottom: 2px solid #E5E5E5;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .math-back-btn {
          background: transparent;
          color: #AFAFAF;
          padding: 8px;
          border-radius: 50%;
        }
        .math-header-title {
          flex: 1;
          text-align: center;
          font-weight: 900;
          color: #3C3C3C;
          font-size: 1.05rem;
          margin-right: 38px;
        }
        .math-scroll-area {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        .math-section {
          background: #fff;
          border: 2px solid #E5E5E5;
          border-radius: 16px;
          padding: 12px;
        }
        .math-section-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #3C3C3C;
          margin-bottom: 10px;
        }
        .math-btn-card-vert {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          background: var(--btn-light, #f5f5f5);
          border: 2px solid var(--btn-color, #E5E5E5);
          border-bottom: 4px solid var(--btn-dark, #C0C0C0);
          border-radius: 12px;
          padding: 8px 4px;
          text-align: center;
          transition: all 0.1s;
          width: 100%;
        }
        .math-btn-card-vert:active {
          transform: translateY(2px);
          border-bottom-width: 2px;
        }
        .math-btn-card-vert.selected {
          background: var(--btn-color);
          border-color: var(--btn-dark);
          border-bottom-color: var(--btn-dark);
          box-shadow: 0 0 0 3px var(--btn-light);
        }
        .math-btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        .math-btn-label {
          font-weight: 800;
          font-size: 0.75rem;
          color: #3C3C3C;
          line-height: 1.1;
          word-break: break-word;
        }
        .math-btn-desc {
          font-weight: 700;
          font-size: 0.65rem;
          color: #777;
        }

        /* Responsive grid helpers */
        .grid-ops {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }
        .btn-rawak {
          grid-column: span 4;
          flex-direction: row;
          justify-content: center;
        }
        .btn-rawak .math-btn-label {
          font-size: 0.9rem;
        }
        @media (min-width: 768px) {
          .grid-ops {
            grid-template-columns: repeat(5, 1fr);
          }
          .btn-rawak {
            grid-column: span 1;
            flex-direction: column;
            justify-content: flex-start;
          }
          .btn-rawak .math-btn-label {
            font-size: 0.75rem;
          }
        }
        .grid-nombor {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
        }
        @media (min-width: 768px) {
          .grid-nombor {
            grid-template-columns: repeat(10, 1fr);
          }
        }
        .grid-3-cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .grid-2-cols {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
        }

        .math-start-area {
          padding: 12px;
          background: #fff;
          border-top: 2px solid #E5E5E5;
        }
        .math-start-btn {
          width: 100%;
          padding: 14px;
          font-size: 1.25rem;
          font-weight: 900;
          color: white;
          background: #58CC02;
          border: none;
          border-bottom: 5px solid #46A302;
          border-radius: 16px;
          transition: all 0.1s;
        }
        .math-start-btn:active:not(:disabled) {
          transform: translateY(3px);
          border-bottom-width: 2px;
        }
        .math-start-btn:disabled {
          background: #E5E5E5;
          border-bottom-color: #C0C0C0;
          color: #AFAFAF;
        }
      `}</style>

      <div className="math-header">
        <button className="math-back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <div className="math-header-title">
          {bm ? 'Operasi Matematik' : 'Math Operations'}
        </div>
      </div>

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
                  style={{ '--btn-color': '#1CB0F6', '--btn-dark': '#0B8DC0', '--btn-light': '#ddf4ff', padding: '6px' }}
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
                  style={{ '--btn-color': '#1CB0F6', '--btn-dark': '#0B8DC0', '--btn-light': '#ddf4ff', padding: '6px' }}
                >
                  <div className="math-btn-icon" style={{ borderRadius: '8px', width: '38px', height: '38px', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>{n}</div>
                </button>
              );
            })}

            {/* Random Button */}
            <button
               onClick={() => handleToggleNum('random')}
               className={`math-btn-card-vert ${selNums.includes('random') ? 'selected' : ''}`}
               style={{ '--btn-color': '#CE82FF', '--btn-dark': '#9B59B6', '--btn-light': '#f4dfff', padding: '6px' }}
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

      </div>

      <div className="math-start-area">
        <button
          className="math-start-btn"
          disabled={!isReady}
          onClick={handleStart}
        >
          {bm ? 'Mula Main!' : 'Start Playing!'} 🚀
        </button>
      </div>
      
    </div>
  );
}
