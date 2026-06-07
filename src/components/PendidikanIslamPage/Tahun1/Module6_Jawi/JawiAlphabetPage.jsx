import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Volume2, X } from 'lucide-react';
import { LOCALIZATION } from '../../../../utils/localization';
import { JAWI_ALPHABET } from '../../../../utils/jawiData';
import { SUKU_KATA_DATA } from '../../../../utils/jawiSukuKataData';
import { GLYPH_TO_SLUG } from '../../_shared/arabic.js';
import SpeechManager from '../../../../services/SpeechManager';
import BackButton from '../../../BackButton';

const JAWI_TILE_PALETTE = [
  { base: '#CE82FF', light: '#ECD0FF', deep: '#7A3FA0' },
  { base: '#1CB0F6', light: '#A0E4FF', deep: '#0B6EA0' },
  { base: '#58CC02', light: '#B4F576', deep: '#2E7001' },
  { base: '#FF9600', light: '#FFD9A0', deep: '#8F5300' },
  { base: '#FF4B4B', light: '#FFB0B0', deep: '#A01010' },
  { base: '#00C2A8', light: '#A0F0E8', deep: '#007A6A' },
  { base: '#F59E0B', light: '#FDE68A', deep: '#92400E' },
  { base: '#EC4899', light: '#F9A8D4', deep: '#9D174D' },
];

const JAWI_GLYPH_TO_SLUG = {
  'چ': 'ca', 'ڠ': 'nga', 'ڤ': 'pa', 'ݢ': 'ga', 'ۏ': 'va', 'ڽ': 'nya',
};

const ALL_SLUGS = { ...GLYPH_TO_SLUG, ...JAWI_GLYPH_TO_SLUG };
const AUDIO_BASE = `${import.meta.env.BASE_URL}audio/hijaiyah/`;

const getSukuKataCount = (jawi) => {
  const data = SUKU_KATA_DATA[jawi];
  return data ? data.length : 0;
};

const playLetterAudio = (jawiChar, rumiName) => {
  window.speechSynthesis?.cancel();
  const slug = ALL_SLUGS[jawiChar];
  if (!slug) { SpeechManager.speak(rumiName, 'ms-MY'); return; }
  const audio = new Audio(`${AUDIO_BASE}${slug}.mp3`);
  audio.addEventListener('error', () => SpeechManager.speak(rumiName, 'ms-MY'), { once: true });
  audio.play().catch(() => SpeechManager.speak(rumiName, 'ms-MY'));
};

export default function JawiAlphabetPage({ onBack, language }) {
  const t = LOCALIZATION[language].jawi;
  const [selectedAlphabet, setSelectedAlphabet] = useState(null);

  useEffect(() => {
    if (selectedAlphabet) {
      playLetterAudio(selectedAlphabet.jawi, selectedAlphabet.rumi);
    }
  }, [selectedAlphabet]);

  useEffect(() => () => SpeechManager.stopSpeaking(), []);

  const handleNextAlphabet = () => {
    const currentIndex = JAWI_ALPHABET.findIndex(item => item.jawi === selectedAlphabet.jawi);
    const nextIndex = (currentIndex + 1) % JAWI_ALPHABET.length;
    setSelectedAlphabet(JAWI_ALPHABET[nextIndex]);
  };

  const handlePrevAlphabet = () => {
    const currentIndex = JAWI_ALPHABET.findIndex(item => item.jawi === selectedAlphabet.jawi);
    const prevIndex = (currentIndex - 1 + JAWI_ALPHABET.length) % JAWI_ALPHABET.length;
    setSelectedAlphabet(JAWI_ALPHABET[prevIndex]);
  };

  const selectedIdx = selectedAlphabet
    ? JAWI_ALPHABET.findIndex(item => item.jawi === selectedAlphabet.jawi)
    : -1;
  const selectedPal = selectedIdx >= 0
    ? JAWI_TILE_PALETTE[selectedIdx % JAWI_TILE_PALETTE.length]
    : JAWI_TILE_PALETTE[0];
  const totalLetters = JAWI_ALPHABET.length;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto',
      background: 'linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 40%, #F0FDFA 100%)',
    }}>
      <style>{`
        .jawi-kv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 400px) { .jawi-kv-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
        @media (min-width: 500px) { .jawi-kv-grid { grid-template-columns: repeat(4, 1fr); gap: 14px; } }
        @media (min-width: 760px) { .jawi-kv-grid { grid-template-columns: repeat(5, 1fr); gap: 16px; } }
        .jawi-kv-letter-tile {
          position: relative; border: 0; padding: 0;
          aspect-ratio: 1 / 1.05; width: 100%;
          container-type: inline-size;
          border-radius: 24px; cursor: pointer; font-family: inherit;
          transition: transform .25s cubic-bezier(.34,1.56,.64,1);
          -webkit-tap-highlight-color: transparent;
          animation: jawiKvTileIn .5s cubic-bezier(.34,1.56,.64,1) forwards;
        }
        @keyframes jawiKvTileIn {
          0%   { opacity: 0; transform: translateY(22px) scale(.94); }
          70%  { opacity: 1; transform: translateY(-4px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .jawi-kv-letter-tile:hover  { transform: translateY(-6px) rotate(-1.2deg); }
        .jawi-kv-letter-tile:active { transform: translateY(5px) rotate(0deg); transition: transform .1s ease; }
        .jawi-kv-letter-tile::before {
          content: ""; position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,.18) 1.4px, transparent 1.6px);
          background-size: 18px 18px; opacity: .65; pointer-events: none; z-index: 1;
        }
        .jawi-kv-letter-tile::after {
          content: ""; position: absolute; top: 6px; left: 10px; right: 10px; height: 38%;
          border-radius: 20px 20px 0 0;
          background: linear-gradient(180deg, rgba(255,255,255,.42) 0%, rgba(255,255,255,.06) 75%, transparent 100%);
          pointer-events: none; z-index: 1;
        }
        .jawi-kv-tile-letter {
          position: absolute; inset: 0; padding-bottom: 28%;
          display: flex; align-items: center; justify-content: center; z-index: 2;
          font-family: 'Lateef', 'Noto Naskh Arabic', 'Times New Roman', serif; font-weight: 700;
          font-size: 60cqi; line-height: 1; color: #fff;
          text-shadow: 0 2px 0 rgba(0,0,0,.18);
        }
        .jawi-kv-tile-cap {
          position: absolute; bottom: 8px; left: 8px; right: 8px; z-index: 4;
          background: #fff; border-radius: 14px; padding: 6px 10px;
          box-shadow: 0 3px 0 rgba(0,0,0,.10);
          text-align: center; font-family: 'Fredoka', sans-serif; font-weight: 700;
          font-size: 0.8rem; line-height: 1;
        }
        .jawi-kv-section-label {
          font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: 1.05rem;
          color: #374151; text-align: center; letter-spacing: .04em;
          margin: 12px 0 16px;
          display: flex; align-items: center; gap: 14px; justify-content: center;
        }
        .jawi-kv-section-label::before, .jawi-kv-section-label::after {
          content: ""; height: 3px; flex: 1; max-width: 80px; border-radius: 999px;
          background: linear-gradient(90deg, rgba(206,130,255,.6), rgba(0,194,168,.7), rgba(28,176,246,.7), rgba(88,204,2,.6));
        }
        @media (max-width: 400px) {
          .jawi-kv-letter-tile { border-radius: 18px; }
          .jawi-kv-tile-cap { bottom: 5px; left: 5px; right: 5px; padding: 5px 6px; font-size: 0.68rem; border-radius: 10px; }
        }

        .jawi-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; padding: 1rem;
          animation: jawiModalFadeIn 0.25s ease-out;
        }
        @keyframes jawiModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .jawi-modal-content {
          background: white;
          border-radius: 2.5rem;
          width: 100%;
          max-width: 600px;
          max-height: 92vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 60px rgba(0,0,0,0.35);
          animation: jawiModalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes jawiModalPop {
          from { opacity: 0; transform: scale(0.82) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .suku-card {
          -webkit-tap-highlight-color: transparent;
        }
        .suku-card::after {
          content: "";
          position: absolute; top: 4px; left: 8px; right: 8px; height: 30%;
          border-radius: 14px 14px 0 0;
          background: linear-gradient(180deg, rgba(255,255,255,.35) 0%, rgba(255,255,255,.05) 70%, transparent 100%);
          pointer-events: none;
        }

        .nav-btn {
          border: none; cursor: pointer; font-family: inherit; font-weight: 800;
          transition: all .15s cubic-bezier(.34,1.56,.64,1);
          -webkit-tap-highlight-color: transparent;
        }
        .nav-btn:hover { transform: translateY(-3px); }
        .nav-btn:active { transform: translateY(2px); transition: transform .08s ease; }
      `}</style>

      <BackButton onClick={onBack} />

      <div style={{ padding: '68px 0.75rem 1.5rem', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <div className="jawi-kv-section-label">
          {language === 'bm' ? 'Pilih Huruf untuk Belajar' : 'Select a Letter to Learn'}
        </div>
        <div className="jawi-kv-grid" style={{ direction: 'rtl' }}>
          {JAWI_ALPHABET.map((item, idx) => {
            const pal = JAWI_TILE_PALETTE[idx % JAWI_TILE_PALETTE.length];
            const sukuCount = getSukuKataCount(item.jawi);
            return (
              <button
                key={idx}
                type="button"
                className="jawi-kv-letter-tile"
                onClick={() => setSelectedAlphabet(item)}
                style={{
                  background: `linear-gradient(165deg, ${pal.light} 0%, ${pal.base} 60%, ${pal.deep} 100%)`,
                  animationDelay: `${0.04 + idx * 0.025}s`,
                }}
              >
                <span className="jawi-kv-tile-letter">{item.jawi}</span>
                <span className="jawi-kv-tile-cap" style={{ color: pal.deep, direction: 'ltr' }}>
                  {item.rumi} · {sukuCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedAlphabet && createPortal(
        <div className="jawi-modal-overlay" onClick={() => setSelectedAlphabet(null)}>
          <div
            className="jawi-modal-content"
            style={{ border: `5px solid ${selectedPal.base}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              background: `linear-gradient(145deg, ${selectedPal.base} 0%, ${selectedPal.deep} 100%)`,
              padding: '1.5rem 1.5rem 1.25rem',
              borderBottom: 'none',
              position: 'relative',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    fontSize: '2.4rem', fontFamily: 'serif', color: '#fff',
                    lineHeight: 1, textShadow: '0 2px 4px rgba(0,0,0,.2)',
                    direction: 'rtl',
                  }}>
                    {selectedAlphabet.jawi}
                  </span>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,.95)', fontWeight: 800, fontSize: '1.15rem' }}>
                      {selectedAlphabet.rumi}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,.7)', fontWeight: 600, fontSize: '0.75rem' }}>
                      {language === 'bm' ? `Huruf ke-${selectedIdx + 1} dari ${totalLetters}` : `Letter ${selectedIdx + 1} of ${totalLetters}`}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAlphabet(null)}
                  style={{
                    background: 'rgba(255,255,255,.2)', border: 'none',
                    borderRadius: '50%', width: '2.2rem', height: '2.2rem',
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#fff', backdropFilter: 'blur(4px)',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{
                marginTop: '0.75rem', display: 'flex', gap: '0.5rem',
                alignItems: 'center',
              }}>
                <button
                  onClick={(e) => { e.stopPropagation(); playLetterAudio(selectedAlphabet.jawi, selectedAlphabet.rumi); }}
                  style={{
                    background: 'rgba(255,255,255,.2)', border: 'none',
                    borderRadius: '999px', padding: '0.35rem 0.9rem',
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    gap: '0.35rem', color: '#fff', fontWeight: 700, fontSize: '0.8rem',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <Volume2 size={15} />
                  {language === 'bm' ? 'Dengar' : 'Listen'}
                </button>

                <div style={{
                  marginLeft: 'auto', background: 'rgba(255,255,255,.15)',
                  borderRadius: '999px', padding: '0.2rem 0.7rem',
                  color: 'rgba(255,255,255,.85)', fontWeight: 700, fontSize: '0.72rem',
                }}>
                  {getSukuKataCount(selectedAlphabet.jawi)} suku kata
                </div>
              </div>
            </div>

            <div style={{ padding: '1.25rem 1.5rem' }}>
              {SUKU_KATA_DATA[selectedAlphabet.jawi] ? (
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                  gap: '0.7rem',
                }}>
                  {SUKU_KATA_DATA[selectedAlphabet.jawi].map((row, idx) => {
                    const CARD_COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF8C42', '#9D4EDD', '#6BCB77'];
                    const cardColor = CARD_COLORS[idx % CARD_COLORS.length];
                    return (
                      <div
                        key={idx}
                        className="suku-card"
                        style={{
                          background: `linear-gradient(165deg, ${cardColor}dd, ${cardColor})`,
                          borderRadius: '1.2rem', padding: '0.85rem',
                          color: 'white', position: 'relative', overflow: 'hidden',
                          boxShadow: `0 4px 12px ${cardColor}55`,
                          border: 'none',
                          animation: `jawiModalPop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards`,
                          animationDelay: `${idx * 0.06}s`,
                          opacity: 0,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', direction: 'rtl' }}>
                          <div style={{
                            background: 'rgba(255,255,255,.2)',
                            borderRadius: '0.75rem', padding: '0.45rem 0.6rem',
                            textAlign: 'center', minWidth: '52px',
                          }}>
                            <div style={{ fontSize: '1.5rem', fontFamily: 'serif', lineHeight: 1, fontWeight: 'bold' }}>
                              {row.jawi}
                            </div>
                          </div>
                          <div style={{ textAlign: 'center', flex: 1, direction: 'ltr' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 800, opacity: 0.95 }}>
                              {row.rumi}
                            </div>
                          </div>
                        </div>

                        <div style={{
                          background: 'rgba(0,0,0,0.1)',
                          padding: '0.35rem 0.5rem',
                          borderRadius: '0.75rem', textAlign: 'center',
                          marginTop: '0.45rem',
                        }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.9 }}>
                            {row.bunyi}
                          </div>
                        </div>


                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={{ textAlign: 'center', color: '#888', margin: '1rem 0' }}>
                  {t.noSyllableData}
                </p>
              )}
            </div>

            <div style={{
              display: 'flex', gap: '0.6rem', padding: '1rem 1.5rem 1.5rem',
              borderTop: '2px solid #f0f0f0',
            }}>
              <button
                onClick={handlePrevAlphabet}
                className="nav-btn"
                style={{
                  flex: 1, padding: '0.75rem 0.5rem', borderRadius: '14px',
                  background: '#fff', color: selectedPal.base,
                  border: `2px solid ${selectedPal.light}`,
                  borderBottom: `5px solid ${selectedPal.light}`,
                  boxShadow: '0 4px 0 rgba(0,0,0,.05)',
                  fontSize: '0.82rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
                }}
              >
                <ChevronLeft size={16} /> {t.prev}
              </button>

              <button
                onClick={() => setSelectedAlphabet(null)}
                className="nav-btn"
                style={{
                  flex: 1.5, padding: '0.75rem 0.5rem', borderRadius: '14px',
                  background: `linear-gradient(165deg, ${selectedPal.base}, ${selectedPal.deep})`,
                  color: '#fff', border: 'none',
                  borderBottom: `5px solid ${selectedPal.deep}cc`,
                  boxShadow: `0 4px 0 ${selectedPal.deep}55`,
                  fontSize: '0.9rem',
                }}
              >
                {t.close}
              </button>

              <button
                onClick={handleNextAlphabet}
                className="nav-btn"
                style={{
                  flex: 1, padding: '0.75rem 0.5rem', borderRadius: '14px',
                  background: '#fff', color: selectedPal.base,
                  border: `2px solid ${selectedPal.light}`,
                  borderBottom: `5px solid ${selectedPal.light}`,
                  boxShadow: '0 4px 0 rgba(0,0,0,.05)',
                  fontSize: '0.82rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
                }}
              >
                {t.next} <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
