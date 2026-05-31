import React, { useState } from 'react';
import BackButton from '../BackButton';

const LETTERS = [
  { ar: 'أ',  name: 'Alif'  },
  { ar: 'ب',  name: 'Ba'    },
  { ar: 'ت',  name: 'Ta'    },
  { ar: 'ث',  name: 'Sa'    },
  { ar: 'ج',  name: 'Jim'   },
  { ar: 'ح',  name: 'Ha'    },
  { ar: 'خ',  name: 'Kha'   },
  { ar: 'د',  name: 'Dal'   },
  { ar: 'ذ',  name: 'Zal'   },
  { ar: 'ر',  name: 'Ra'    },
  { ar: 'ز',  name: 'Zai'   },
  { ar: 'س',  name: 'Sin'   },
  { ar: 'ش',  name: 'Syin'  },
  { ar: 'ص',  name: 'Sad'   },
  { ar: 'ض',  name: 'Dad'   },
  { ar: 'ط',  name: "Ta'"   },
  { ar: 'ظ',  name: "Za'"   },
  { ar: 'ع',  name: 'Ain'   },
  { ar: 'غ',  name: 'Ghain' },
  { ar: 'ف',  name: 'Fa'    },
  { ar: 'ق',  name: 'Qaf'   },
  { ar: 'ك',  name: 'Kaf'   },
  { ar: 'ل',  name: 'Lam'   },
  { ar: 'م',  name: 'Mim'   },
  { ar: 'ن',  name: 'Nun'   },
  { ar: 'ه',  name: "Ha'"   },
  { ar: 'و',  name: 'Wau'   },
  { ar: 'لا', name: 'La'    },
  { ar: 'ي',  name: 'Ya'    },
];

const ALIF = LETTERS[0].ar; // 'أ' — permanent review letter for Halaman 2–29

// 2-column layout matching Iqra 1 book format.
// direction:rtl → array[0] renders on the RIGHT (first read in RTL).
//
// Halaman 1 (l1=أ, no l3):   50% l1 / 50% l2  — pure 2-letter page
// Halaman 2–29 (l3=Alif):   40% l1 / 40% l2 / 20% Alif
//   10 cells × 3 letters = 30 slots → 12 l1 + 12 l2 + 6 l3
//   Row 1: 3l1+3l2  Row 2: 2l1+2l2+2l3  Row 3: 3l1+3l2
//   Row 4: 2l1+2l2+2l3  Row 5: 2l1+2l2+2l3  → total ✓
function makeRows(l1, l2, l3) {
  if (!l3) {
    // Halaman 1 — only أ and ب
    return [
      [`${l2} ${l1} ${l2}`,  `${l1} ${l2} ${l1}`],
      [`${l2} ${l2} ${l1}`,  `${l1} ${l1} ${l2}`],
      [`${l1} ${l2} ${l2}`,  `${l2} ${l1} ${l1}`],
      [`${l1} ${l1} ${l2}`,  `${l2} ${l2} ${l1}`],
      [`${l1} ${l2} ${l1}`,  `${l2} ${l1} ${l2}`],
      [`${l1} ${l2}`],
    ];
  }
  // Halaman 2–29 — l1 40% · l2 40% · l3 (Alif review) 20%
  return [
    [`${l2} ${l1} ${l2}`,  `${l1} ${l2} ${l1}`],   // Row 1: 3l1 + 3l2
    [`${l1} ${l3} ${l2}`,  `${l2} ${l3} ${l1}`],   // Row 2: 2l1 + 2l2 + 2l3
    [`${l1} ${l1} ${l2}`,  `${l2} ${l2} ${l1}`],   // Row 3: 3l1 + 3l2
    [`${l3} ${l2} ${l1}`,  `${l3} ${l1} ${l2}`],   // Row 4: 2l1 + 2l2 + 2l3
    [`${l2} ${l3} ${l1}`,  `${l1} ${l3} ${l2}`],   // Row 5: 2l1 + 2l2 + 2l3
    [`${l1} ${l2}`],                                  // Row 6: wide
  ];
}

const PAGES = LETTERS.map((letter, i) => {
  const pair = LETTERS[(i + 1) % LETTERS.length];
  const reviewAr = letter.ar === ALIF ? null : ALIF;
  return {
    ...letter,
    pairAr:   pair.ar,
    pairName: pair.name,
    reviewAr,
    rows: makeRows(letter.ar, pair.ar, reviewAr),
  };
});

const PALETTE = [
  '#E53935','#D81B60','#8E24AA','#5E35B1','#3949AB',
  '#1E88E5','#039BE5','#00ACC1','#00897B','#43A047',
  '#7CB342','#F9A825','#FB8C00','#F4511E','#6D4C41',
];
const col = (idx) => PALETTE[idx % PALETTE.length];

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'ar-SA';
  window.speechSynthesis.speak(utt);
}

// ── Popup modal — Iqra 1 book-page format ───────────────────────────────────
function LetterPopup({ pageIdx, onClose, onPrev, onNext, language }) {
  const page = PAGES[pageIdx];

  // red = l1 (main) · blue = l2 (pair) · green = Alif review
  const letterColor = (letter) => {
    if (letter === page.ar)       return '#C62828';
    if (letter === page.pairAr)   return '#1565C0';
    if (letter === page.reviewAr) return '#2E7D32';
    return '#555';
  };

  function CellLetters({ cellStr }) {
    const parts = cellStr.split(' ');
    return parts.map((letter, i) => (
      <React.Fragment key={i}>
        <span style={{ color: letterColor(letter) }}>{letter}</span>
        {i < parts.length - 1 && '  '}
      </React.Fragment>
    ));
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      zIndex: 1000,
      display: 'flex',
    }}>
      <div style={{
        background: '#fff',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* ── Top bar ── */}
        <div style={{
          padding: '0.3rem 0.75rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid #ddd',
          background: '#f7f7f7',
        }}>
          <span style={{ fontSize: '0.72rem', color: '#666', fontWeight: 700, letterSpacing: 0.5 }}>
            Iqra 1 &mdash; Halaman {pageIdx + 1} / {PAGES.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none', border: 'none',
              cursor: 'pointer', fontSize: '1rem', color: '#888',
              lineHeight: 1, padding: '0.15rem 0.3rem',
            }}
          >✕</button>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '0.75rem 0.75rem 0' }}>

          {/* Instruction box */}
          <div style={{
            border: '2px solid #222',
            borderRadius: '3px',
            padding: '0.55rem 0.85rem',
            marginBottom: '0.7rem',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: "'Amiri Quran', serif",
              fontSize: '1.05rem',
              direction: 'rtl',
              margin: '0 0 0.05rem',
              color: '#111',
              lineHeight: 2,
            }}>
              باچ تروس {page.ar} ، {page.pairAr} دان سترسن،
            </p>
            <p style={{
              fontFamily: "'Amiri Quran', serif",
              fontSize: '1.05rem',
              direction: 'rtl',
              margin: 0,
              color: '#111',
              lineHeight: 2,
            }}>
              تيدق ڤرلو دايجا. باچ دغن ڤيندق
            </p>
          </div>

          {/* Large letter header — RTL order: Alif (right) → Ba → Ta (left) */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '2rem',
            padding: '0.3rem 1rem 0.6rem',
            borderBottom: '2.5px solid #222',
            direction: 'rtl',
          }}>
            {/* 1st in JSX = rightmost in RTL → أ Alif (review, small) */}
            {page.reviewAr && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Amiri Quran', serif", fontSize: '3.5rem', color: '#2E7D32', lineHeight: 1.15 }}>
                  {page.reviewAr}
                </div>
                <div style={{ fontSize: '0.55rem', fontWeight: 800, color: '#2E7D32', letterSpacing: 1, textTransform: 'uppercase' }}>
                  Alif
                </div>
              </div>
            )}
            {/* 2nd = middle → ب l1 (large, red) */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Amiri Quran', serif", fontSize: '5.5rem', color: '#C62828', lineHeight: 1.15 }}>
                {page.ar}
              </div>
              <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#C62828', letterSpacing: 1, textTransform: 'uppercase' }}>
                {page.name}
              </div>
            </div>
            {/* 3rd = leftmost → ت l2 (large, blue) */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Amiri Quran', serif", fontSize: '5.5rem', color: '#1565C0', lineHeight: 1.15 }}>
                {page.pairAr}
              </div>
              <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#1565C0', letterSpacing: 1, textTransform: 'uppercase' }}>
                {page.pairName}
              </div>
            </div>
          </div>

          {/* ── Reading grid: 2 cols (rows 1–5) + 1 wide (row 6) ── */}
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            direction: 'rtl',
            border: '1px solid #888',
            marginBottom: '0.75rem',
          }}>
            <tbody>
              {page.rows.map((row, rIdx) => {
                const isWide = row.length === 1;
                return (
                  <tr key={rIdx}>
                    {row.map((cellStr, cIdx) => (
                      <td
                        key={cIdx}
                        colSpan={isWide ? 2 : 1}
                        onClick={() => speak(cellStr)}
                        style={{
                          border: '1px solid #aaa',
                          textAlign: 'center',
                          padding: isWide ? '0.8rem 0.5rem' : '0.6rem 0.25rem',
                          fontFamily: "'Amiri Quran', serif",
                          fontSize: isWide ? '2.8rem' : '2rem',
                          cursor: 'pointer',
                          userSelect: 'none',
                          lineHeight: 1.6,
                          width: isWide ? '100%' : '50%',
                          background: '#fff',
                          direction: 'rtl',
                        }}
                      >
                        <CellLetters cellStr={cellStr} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Colour legend for Halaman 2+ */}
          {page.reviewAr && (
            <div style={{
              display: 'flex', justifyContent: 'center', gap: '1.2rem',
              fontSize: '0.65rem', fontWeight: 700,
              paddingBottom: '0.75rem',
            }}>
              <span style={{ color: '#C62828' }}>● {page.name}</span>
              <span style={{ color: '#1565C0' }}>● {page.pairName}</span>
              <span style={{ color: '#2E7D32' }}>● Alif (ulang kaji)</span>
            </div>
          )}
        </div>

        {/* ── Navigation footer ── */}
        <div style={{
          padding: '0.5rem 0.75rem',
          borderTop: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f7f7f7',
        }}>
          <button
            type="button"
            onClick={onPrev}
            disabled={pageIdx === 0}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '4px',
              border: `1.5px solid ${pageIdx === 0 ? '#ddd' : '#999'}`,
              background: '#fff',
              color: pageIdx === 0 ? '#ccc' : '#333',
              fontWeight: 700, fontSize: '0.8rem',
              cursor: pageIdx === 0 ? 'default' : 'pointer',
            }}
          >
            ← {language === 'bm' ? 'Sebelum' : 'Prev'}
          </button>
          <span style={{ fontSize: '0.72rem', color: '#777', fontWeight: 700 }}>
            {page.name}
          </span>
          <button
            type="button"
            onClick={onNext}
            disabled={pageIdx === PAGES.length - 1}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '4px',
              border: `1.5px solid ${pageIdx === PAGES.length - 1 ? '#ddd' : '#999'}`,
              background: '#fff',
              color: pageIdx === PAGES.length - 1 ? '#ccc' : '#333',
              fontWeight: 700, fontSize: '0.8rem',
              cursor: pageIdx === PAGES.length - 1 ? 'default' : 'pointer',
            }}
          >
            {language === 'bm' ? 'Seterus' : 'Next'} →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page: letter selection grid ────────────────────────────────────────
export default function Iqra1Page({ onBack, language }) {
  const [selectedIdx, setSelectedIdx] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#FFF8E1' }}>
      <BackButton onClick={onBack} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div style={{
            display: 'inline-block',
            background: '#E65100', color: '#fff',
            borderRadius: '50px', padding: '0.3rem 1.2rem',
            fontWeight: 800, fontSize: '1rem', marginBottom: '0.3rem',
          }}>
            {language === 'bm' ? 'Iqra 1 — Huruf Tunggal' : 'Iqra 1 — Single Letters'}
          </div>
          <p style={{ fontSize: '0.73rem', color: '#888', margin: '0.25rem 0 0' }}>
            {language === 'bm'
              ? 'Pilih huruf untuk buka halaman pembelajaran'
              : 'Tap a letter to open its learning page'}
          </p>
          <p style={{ fontSize: '0.68rem', color: '#BDBDBD', margin: '0.1rem 0 0' }}>
            ← {language === 'bm' ? 'Dibaca dari kanan ke kiri' : 'Read right to left'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0.55rem',
          direction: 'rtl',
          paddingBottom: '1.5rem',
        }}>
          {PAGES.map((page, idx) => (
            <button
              key={page.ar}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              style={{
                background: '#fff',
                border: `2.5px solid ${col(idx)}`,
                borderRadius: '12px',
                padding: '0.55rem 0.2rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem',
                boxShadow: `0 2px 8px ${col(idx)}28`,
              }}
            >
              <span style={{ fontFamily: "'Amiri Quran', serif", fontSize: '2.2rem', color: col(idx), lineHeight: 1.3 }}>
                {page.ar}
              </span>
              <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#666' }}>
                {page.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedIdx !== null && (
        <LetterPopup
          pageIdx={selectedIdx}
          onClose={() => setSelectedIdx(null)}
          onPrev={() => setSelectedIdx(i => Math.max(0, i - 1))}
          onNext={() => setSelectedIdx(i => Math.min(PAGES.length - 1, i + 1))}
          language={language}
        />
      )}
    </div>
  );
}
