import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const OPERATIONS = [
  { id: 'add',      emoji: '➕', labelBm: 'Tambah',  labelEn: 'Addition',       color: '#00DD5F', dark: '#00AA40', light: '#C8FFE0' },
  { id: 'subtract', emoji: '➖', labelBm: 'Tolak',   labelEn: 'Subtraction',    color: '#0099FF', dark: '#0066CC', light: '#CCE5FF' },
  { id: 'multiply', emoji: '✖️', labelBm: 'Darab',   labelEn: 'Multiplication', color: '#DD44FF', dark: '#BB00FF', light: '#F0CCFF' },
  { id: 'divide',   emoji: '➗', labelBm: 'Bahagi',  labelEn: 'Division',       color: '#FF7700', dark: '#DD5500', light: '#FFD9B3' },
  { id: 'random',   emoji: '🎲', labelBm: 'Rawak',   labelEn: 'Random Mix',     color: '#FF3333', dark: '#DD0000', light: '#FFB3B3' },
];

const DIFFICULTIES = [
  { id: 'easy',   emoji: '🌱', labelBm: 'Senang',    labelEn: 'Easy',   descBm: '(1-9)',     color: '#00DD5F', dark: '#00AA40', light: '#C8FFE0' },
  { id: 'medium', emoji: '⭐', labelBm: 'Sederhana', labelEn: 'Medium', descBm: '(10-99)',   color: '#FFB800', dark: '#DD9300', light: '#FFE5B3' },
  { id: 'hard',   emoji: '🔥', labelBm: 'Susah',     labelEn: 'Hard',   descBm: '(100+)',    color: '#FF3333', dark: '#DD0000', light: '#FFB3B3' },
];

const INPUT_MODES = [
  { id: 'multiple', emoji: '🔘', labelBm: 'Pilihan', labelEn: 'Choices', color: '#DD44FF', dark: '#BB00FF', light: '#F0CCFF' },
  { id: 'typing',   emoji: '⌨️', labelBm: 'Taip',    labelEn: 'Type',    color: '#FF7700', dark: '#DD5500', light: '#FFD9B3' },
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
          background: linear-gradient(135deg, #FFF9E6 0%, #FFE6F0 50%, #E6F3FF 100%);
          overflow-y: auto;
          overflow-x: hidden;
        }
        .math-header {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          background: linear-gradient(135deg, #FFFFFF 0%, #FFF5E6 100%);
          border-bottom: 3px solid #FFD700;
          position: sticky;
          top: 0;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        .math-back-btn {
          background: transparent;
          color: #FF6B6B;
          padding: 8px;
          border-radius: 50%;
          font-weight: bold;
        }
        .math-header-title {
          flex: 1;
          text-align: center;
          font-weight: 900;
          color: #FF6B6B;
          font-size: 1.3rem;
          margin-right: 38px;
        }
        .math-scroll-area {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        .math-section {
          background: #fff;
          border: none;
          border-radius: 24px;
          padding: 1.2rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        .math-section-title {
          font-size: 1.1rem;
          font-weight: 900;
          color: #FF6B6B;
          margin-bottom: 1rem;
          letter-spacing: 0.5px;
        }
        .math-btn-card-vert {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: var(--btn-light, #f5f5f5);
          border: 3px solid var(--btn-color, #E5E5E5);
          border-bottom: 5px solid var(--btn-dark, #C0C0C0);
          border-radius: 16px;
          padding: 12px 6px;
          text-align: center;
          transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
          width: 100%;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .math-btn-card-vert:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          border-bottom-width: 7px;
        }
        .math-btn-card-vert:active {
          transform: translateY(2px);
          border-bottom-width: 2px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .math-btn-card-vert.selected {
          background: var(--btn-color);
          color: white;
          border-color: var(--btn-dark);
          border-bottom-color: var(--btn-dark);
          box-shadow: 0 0 0 4px var(--btn-light), 0 8px 16px rgba(0, 0, 0, 0.2);
          transform: scale(1.05);
        }
        .math-btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          flex-shrink: 0;
          width: 56px;
          height: 56px;
        }
        .math-btn-label {
          font-weight: 900;
          font-size: 0.85rem;
          color: #3C3C3C;
          line-height: 1.2;
          word-break: break-word;
        }
        .math-btn-card-vert.selected .math-btn-label {
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
          gap: 0.8rem;
        }
        .btn-rawak {
          grid-column: span 4;
          flex-direction: row;
          justify-content: center;
        }
        .btn-rawak .math-btn-label {
          font-size: 0.95rem;
        }
        @media (min-width: 768px) {
          .grid-ops {
            grid-template-columns: repeat(5, 1fr);
          }
          .btn-rawak {
            grid-column: span 1;
            flex-direction: column;
            justify-content: center;
          }
          .btn-rawak .math-btn-label {
            font-size: 0.85rem;
          }
        }
        .grid-nombor {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.8rem;
        }
        @media (min-width: 768px) {
          .grid-nombor {
            grid-template-columns: repeat(10, 1fr);
          }
        }
        .grid-3-cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.8rem;
        }
        .grid-2-cols {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.8rem;
        }

        .math-start-area {
          padding: 1rem;
          background: linear-gradient(135deg, #FFFFFF 0%, #FFF5E6 100%);
          border-top: 3px solid #FFD700;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
        }
        .math-start-btn {
          width: 100%;
          padding: 16px;
          font-size: 1.4rem;
          font-weight: 900;
          color: white;
          background: linear-gradient(135deg, #58CC02 0%, #46A302 100%);
          border: none;
          border-bottom: 6px solid #2E6B00;
          border-radius: 20px;
          transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          box-shadow: 0 8px 16px rgba(88, 204, 2, 0.3);
          letter-spacing: 0.5px;
        }
        .math-start-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(88, 204, 2, 0.4);
        }
        .math-start-btn:active:not(:disabled) {
          transform: translateY(2px);
          border-bottom-width: 2px;
          box-shadow: 0 2px 8px rgba(88, 204, 2, 0.3);
        }
        .math-start-btn:disabled {
          background: linear-gradient(135deg, #E5E5E5 0%, #D0D0D0 100%);
          border-bottom-color: #AFAFAF;
          color: #AFAFAF;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
