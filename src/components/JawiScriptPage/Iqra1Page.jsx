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

// Each page: current letter (l1) + next letter (l2), 6 rows × 4 cols
// With direction:rtl on the table, array[0] renders on the RIGHT
function makeRows(l1, l2) {
  return [
    [l2, l1, l2, l1],
    [l1, l2, l1, l2],
    [l2, l1, l1, l2],
    [l1, l2, l2, l1],
    [l2, l2, l1, l1],
    [l1 + l2, l1, l2, l1],
  ];
}

const PAGES = LETTERS.map((letter, i) => {
  const pair = LETTERS[(i + 1) % LETTERS.length];
  return { ...letter, pairAr: pair.ar, pairName: pair.name, rows: makeRows(letter.ar, pair.ar) };
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

// ── Popup modal ──────────────────────────────────────────────────────────────
function LetterPopup({ pageIdx, onClose, onPrev, onNext, language }) {
  const page = PAGES[pageIdx];
  const accentColor = col(pageIdx);

  const cellColor = (cell) => {
    if (cell === page.ar)     return '#C62828';
    if (cell === page.pairAr) return '#1565C0';
    return '#2E7D32';
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.65)',
      zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0.75rem',
    }}>
      <div style={{
        background: '#fff',
        width: 'min(440px, 96vw)',
        maxHeight: '90vh',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
      }}>

        {/* ── Colour title bar ── */}
        <div style={{
          padding: '0.55rem 1rem',
          background: accentColor,
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontWeight: 700, fontSize: '0.82rem', opacity: 0.92 }}>
            Iqra 1 &mdash; {pageIdx + 1} / {PAGES.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.22)', border: 'none',
              borderRadius: '50%', width: 28, height: 28,
              cursor: 'pointer', color: '#fff',
              fontSize: '1rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ overflowY: 'auto', flex: 1 }}>

          {/* Instruction box */}
          <div style={{
            padding: '0.65rem 1rem 0.55rem',
            background: '#FFFDE7',
            borderBottom: '2px solid #F5F5F5',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: "'Amiri Quran', serif",
              fontSize: '1rem',
              direction: 'rtl',
              margin: '0 0 0.25rem',
              color: '#4E342E',
              lineHeight: 2,
            }}>
              باچ تروس {page.ar} ، {page.pairAr} دان سترسن، تيدق ڤرلو دايچا. باچ دغن ڤيندق.
            </p>
            <p style={{ fontSize: '0.72rem', color: '#777', margin: 0 }}>
              {language === 'bm'
                ? `Baca terus ${page.name}, ${page.pairName} dan seterusnya. Tidak perlu dieja. Baca dengan pantas.`
                : `Read ${page.name}, ${page.pairName} and continue. No need to spell. Read quickly.`
              }
            </p>
          </div>

          {/* Big letter pair */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '3rem',
            padding: '0.9rem 1rem 0.6rem',
            direction: 'rtl',
            borderBottom: '2px solid #F5F5F5',
          }}>
            {/* l1 — current letter (appears on RIGHT in RTL) */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Amiri Quran', serif",
                fontSize: '5rem',
                color: '#C62828',
                lineHeight: 1.15,
              }}>{page.ar}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#C62828', letterSpacing: 1, textTransform: 'uppercase' }}>
                {page.name}
              </div>
            </div>
            {/* l2 — pair letter (appears on LEFT in RTL) */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Amiri Quran', serif",
                fontSize: '5rem',
                color: '#1565C0',
                lineHeight: 1.15,
              }}>{page.pairAr}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1565C0', letterSpacing: 1, textTransform: 'uppercase' }}>
                {page.pairName}
              </div>
            </div>
          </div>

          {/* ── Reading grid ── */}
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            direction: 'rtl',
          }}>
            <tbody>
              {page.rows.map((row, rIdx) => (
                <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      onClick={() => speak(cell)}
                      style={{
                        border: '1px solid #E0E0E0',
                        textAlign: 'center',
                        padding: '0.55rem 0.15rem',
                        fontFamily: "'Amiri Quran', serif",
                        fontSize: '2.4rem',
                        color: cellColor(cell),
                        cursor: 'pointer',
                        userSelect: 'none',
                        lineHeight: 1.5,
                        width: '25%',
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Navigation footer ── */}
        <div style={{
          padding: '0.55rem 0.75rem',
          borderTop: '2px solid #F0F0F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#FAFAFA',
        }}>
          <button
            type="button"
            onClick={onPrev}
            disabled={pageIdx === 0}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '20px', border: 'none',
              background: pageIdx === 0 ? '#EEE' : col(pageIdx - 1),
              color: pageIdx === 0 ? '#AAA' : '#fff',
              fontWeight: 700, fontSize: '0.8rem',
              cursor: pageIdx === 0 ? 'default' : 'pointer',
            }}
          >
            ← {language === 'bm' ? 'Sebelum' : 'Prev'}
          </button>
          <span style={{ fontSize: '0.72rem', color: '#999', fontWeight: 600 }}>
            {page.name}
          </span>
          <button
            type="button"
            onClick={onNext}
            disabled={pageIdx === PAGES.length - 1}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '20px', border: 'none',
              background: pageIdx === PAGES.length - 1 ? '#EEE' : col(pageIdx + 1),
              color: pageIdx === PAGES.length - 1 ? '#AAA' : '#fff',
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
        {/* Header */}
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

        {/* 29 letter buttons — direction:rtl so أ starts top-right */}
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
              <span style={{
                fontFamily: "'Amiri Quran', serif",
                fontSize: '2.2rem',
                color: col(idx),
                lineHeight: 1.3,
              }}>
                {page.ar}
              </span>
              <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#666' }}>
                {page.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Popup */}
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
