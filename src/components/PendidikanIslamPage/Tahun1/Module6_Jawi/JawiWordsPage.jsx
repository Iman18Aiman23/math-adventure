import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { JAWI_TOPICS } from '../../../../utils/jawiWordsData';
import BackButton from '../../../BackButton';
import { FONT_IMPORT } from '../../_shared/arabic';
import JawiAlphabetPage from './JawiAlphabetPage';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#ECFDF5 0%,#D1FAE5 50%,#A7F3D0 100%)',
  dark: '#065F46',
  accent: '#10B981',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#D1FAE5 0%,#6EE7B7 55%,#10B981 100%)',
};

function SvgKataKerja() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="90" rx="24" ry="4" fill="rgba(6,95,70,.16)"/>
      <g className="floatA">
        <circle cx="50" cy="26" r="9" fill="#fff"/>
        <path d="M50 35 V58" stroke="#fff" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M50 45 L30 52" stroke="#fff" strokeWidth="3.8" strokeLinecap="round"/>
        <path d="M50 45 L70 38" stroke="#fff" strokeWidth="3.8" strokeLinecap="round"/>
        <path d="M50 58 L34 80" stroke="#fff" strokeWidth="3.8" strokeLinecap="round"/>
        <path d="M50 58 L66 78" stroke="#fff" strokeWidth="3.8" strokeLinecap="round"/>
      </g>
      <path d="M72 28 L80 24 M76 34 L84 32" stroke="#34D399" strokeWidth="2" strokeLinecap="round" opacity=".6" className="pulse"/>
    </svg>
  );
}

function SvgAnggotaBadan() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="90" rx="24" ry="4" fill="rgba(6,95,70,.16)"/>
      <g className="floatA">
        <circle cx="50" cy="26" r="9" fill="#fff"/>
        <path d="M50 35 V60" stroke="#fff" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M50 40 L32 48" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M50 40 L68 48" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M50 60 L36 82" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M50 60 L64 82" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/>
        <circle cx="32" cy="48" r="2.5" fill="#34D399" className="pulse"/>
        <circle cx="68" cy="48" r="2.5" fill="#34D399" className="pulse"/>
      </g>
    </svg>
  );
}

function SvgObjekAlatan() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="90" rx="24" ry="4" fill="rgba(6,95,70,.16)"/>
      <g className="floatA">
        <path d="M28 40 L50 28 L72 40 L50 52 Z" fill="#fff"/>
        <path d="M28 40 L28 68 L50 80 L50 52 Z" fill="#34D399" opacity=".5"/>
        <path d="M72 40 L72 68 L50 80 L50 52 Z" fill="#fff" opacity=".7"/>
        <path d="M28 54 L50 66 L72 54" stroke="#065F46" strokeWidth="1.5" strokeOpacity=".15" strokeLinecap="round"/>
        <path d="M68 26 L78 16 L80 20 L70 30 Z" fill="#FCD34D" stroke="#fff" strokeWidth="1.2"/>
      </g>
    </svg>
  );
}

function SvgAlamHaiwan() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="90" rx="24" ry="4" fill="rgba(6,95,70,.16)"/>
      <g className="floatA">
        <rect x="44" y="50" width="12" height="32" rx="3" fill="#fff" opacity=".85"/>
        <circle cx="50" cy="40" r="16" fill="#fff"/>
        <circle cx="50" cy="40" r="10" fill="#34D399" opacity=".3" className="pulse"/>
        <circle cx="42" cy="48" r="2" fill="#065F46" opacity=".2"/>
        <circle cx="58" cy="48" r="2" fill="#065F46" opacity=".2"/>
      </g>
      <circle cx="68" cy="28" r="8" fill="#FCD34D" className="pulse" opacity=".6"/>
    </svg>
  );
}

function SvgSifatRasa() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="90" rx="24" ry="4" fill="rgba(6,95,70,.16)"/>
      <g className="floatA">
        <circle cx="50" cy="46" r="20" fill="#fff"/>
        <circle cx="42" cy="42" r="3.5" fill="#065F46" opacity=".3"/>
        <circle cx="58" cy="42" r="3.5" fill="#065F46" opacity=".3"/>
        <path d="M38 54 Q50 64 62 54" stroke="#34D399" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <circle cx="34" cy="46" r="3" fill="#34D399" opacity=".25"/>
        <circle cx="66" cy="46" r="3" fill="#34D399" opacity=".25"/>
      </g>
    </svg>
  );
}

const SVGS = [SvgKataKerja, SvgAnggotaBadan, SvgObjekAlatan, SvgAlamHaiwan, SvgSifatRasa];

export default function JawiWordsPage({ onBack, language = 'bm' }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showAlphabet, setShowAlphabet] = useState(false);

  useEffect(() => {
    if (selectedTopic) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedTopic]);

  if (showAlphabet) {
    return <JawiAlphabetPage onBack={() => setShowAlphabet(false)} language={language} />;
  }

  return (
    <>
      <style>{`
        ${FONT_IMPORT}
        .jw-page {
          flex: 1; display: flex; flex-direction: column; width: 100%; max-width: 100%;
          background-image: ${THEME.pageGradient};
          background-repeat: no-repeat;
          background-color: #A7F3D0;
          font-family: 'Fredoka',system-ui,sans-serif;
          color: ${THEME.dark};
        }
        .jw-topbar {
          position: sticky; top: 0; z-index: 40;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px clamp(16px,4vw,40px);
          background: rgba(255,255,255,.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid ${THEME.accent}2E;
          box-shadow: 0 4px 18px ${THEME.dark}12;
        }
        .jw-crumb {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; letter-spacing: .04em; color: #8A5670;
        }
        .jw-hero {
          max-width: 760px; margin: 0 auto;
          padding: clamp(34px,6vw,64px) 24px 10px; text-align: center;
        }
        .jw-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
          color: #fff;
          background: linear-gradient(180deg,${THEME.accent}cc,${THEME.accent});
          padding: 7px 18px; border-radius: 999px;
          box-shadow: 0 4px 12px -4px ${THEME.dark}80;
        }
        .jw-emoji-icon {
          font-size: clamp(54px,11vw,80px); line-height: 1;
          margin: 18px 0 6px; display: block;
          filter: drop-shadow(0 8px 14px ${THEME.dark}48);
          animation: jw-bob 3.4s ease-in-out infinite;
        }
        @keyframes jw-bob {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-9px) rotate(2deg); }
        }
        .jw-h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(30px,6.5vw,48px); line-height: 1.08;
          color: ${THEME.dark}; margin: 0 0 14px;
          text-shadow: 0 2px 0 #fff;
        }
        .jw-lead {
          font-size: clamp(15px,2.4vw,18px); font-weight: 500;
          line-height: 1.6; color: #8A5670;
          max-width: 600px; margin: 0 auto; text-wrap: pretty;
        }
        .jw-progress {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin: 46px auto 6px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 14px; color: ${THEME.dark};
        }
        .jw-progress .jw-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: ${THEME.accent};
          box-shadow: 0 0 0 4px ${THEME.accent}2E;
        }
        .jw-sec-title {
          text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(22px,4vw,30px); color: ${THEME.dark};
          margin: 4px 0 4px;
        }
        .jw-sec-sub {
          text-align: center; font-size: 13px; letter-spacing: .14em;
          text-transform: uppercase; font-weight: 600;
          color: #8A5670; margin: 0 0 36px;
        }
        .jw-grid {
          max-width: 1080px; margin: 0 auto;
          padding: 0 clamp(16px,4vw,28px) 30px;
          display: grid; grid-template-columns: 1fr; gap: 24px;
        }
        @media(min-width:600px){.jw-grid{grid-template-columns:repeat(2,1fr)}}
        @media(min-width:980px){.jw-grid{grid-template-columns:repeat(3,1fr)}}
        .jw-card {
          position: relative;
          background: linear-gradient(180deg,#fff,#FEF4F8);
          border-radius: 24px;
          padding: 26px 22px 28px;
          border: 1px solid ${THEME.accent}28;
          box-shadow: 0 14px 34px -16px ${THEME.dark}48,0 2px 6px ${THEME.dark}0D;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          gap: 13px;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease;
          cursor: pointer; border: none; width: 100%; font-family: inherit;
          -webkit-tap-highlight-color: transparent;
        }
        .jw-card:hover { transform: translateY(-8px); box-shadow: 0 26px 50px -18px ${THEME.dark}66; }
        .jw-card:active { transform: translateY(-3px) scale(.99); }
        .jw-card:focus-visible { outline: 3px solid ${THEME.accent}; outline-offset: 2px; }
        .jw-num {
          position: absolute; top: 14px; left: 16px;
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 13px;
          color: #fff;
          background: linear-gradient(180deg,${THEME.accent}cc,${THEME.accent});
          width: 30px; height: 30px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 8px -2px ${THEME.dark}80;
        }
        .jw-stage {
          width: 120px; height: 120px; border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
          background: ${THEME.stageGradient};
          box-shadow: inset 0 -7px 20px ${THEME.dark}33,inset 0 2px 0 rgba(255,255,255,.5);
          margin-top: 6px;
        }
        .jw-stage svg { width: 78%; height: 78%; overflow: visible; }
        .jw-ctitle {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: 19px; color: ${THEME.dark}; margin: 2px 0 0;
        }
        .jw-csub {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 11px; letter-spacing: .08em;
          text-transform: uppercase; color: ${THEME.accent}; margin: 0;
        }
        .jw-cdesc {
          font-size: 13.5px; font-weight: 500; line-height: 1.55;
          color: #8A5670; margin: 2px 0 0;
        }
        .jw-foot { text-align: center; padding: 10px 20px 50px; color: #8A5670; font-size: 12.5px; font-weight: 500; }

        .t-alphabet {
          --base: #9D4EDD; --deep: #5B2A8A; --base-light: #B67AE6;
          --base-glow60: rgba(157,78,221,0.6); --base-glow70: rgba(157,78,221,0.7); --base-soft: #E2CAF5;
        }
        .jw-icon-card {
          position: relative; border: 0; padding: 0; aspect-ratio: 1/1; width: 100%;
          cursor: pointer; font-family: inherit; background: transparent; overflow: visible;
          transition: transform .35s cubic-bezier(.34,1.56,.64,1), filter .35s;
          animation: jw-tileIn .6s cubic-bezier(.34,1.56,.64,1) forwards;
          -webkit-tap-highlight-color: transparent;
          display: flex; align-items: center; justify-content: center;
          transform-style: preserve-3d;
        }
        @keyframes jw-tileIn {
          0% { opacity: 0; transform: translateY(28px) scale(.94); }
          70% { opacity: 1; transform: translateY(-6px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .jw-icon-card.t-alphabet:hover {
          transform: translateY(-12px) rotateX(8deg) rotateY(-12deg) scale(1.1);
          filter: brightness(1.15) drop-shadow(0 20px 30px rgba(157,78,221,.25));
        }
        .jw-icon-card:active {
          transform: translateY(0) rotateX(0) rotateY(0) scale(.96);
        }
        .jw-icon-card:focus-visible { outline: none; }
        .jw-icon-card svg { width: 100%; height: 100%; filter: drop-shadow(0 8px 16px rgba(0,0,0,.15)); transition: filter .35s; transform-style: preserve-3d; }
        .jw-icon-card:hover svg { filter: drop-shadow(0 12px 24px rgba(0,0,0,.2)); }

        .floatA { animation: jw-floatA 3.6s ease-in-out infinite; transform-origin: center; }
        @keyframes jw-floatA { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .pulse { animation: jw-pulse 2.2s ease-in-out infinite; }
        @keyframes jw-pulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }

        /* Modal overlay — confined to .app-container */
        .jw-overlay {
          position: absolute; inset: 0; z-index: 999;
          background: rgba(0,0,0,0.8);
          display: flex; align-items: center; justify-content: center;
          animation: jw-fadeIn .2s ease;
        }
        @keyframes jw-fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .jw-modal {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          box-shadow: 0 25px 60px rgba(0,0,0,0.3);
          animation: jw-slideUp .25s cubic-bezier(.34,1.56,.64,1);
          overflow: hidden;
        }
        @keyframes jw-slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .jw-modal-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 20px;
          border-bottom: 1px solid #E5E7EB;
          flex: none; background: #fff; z-index: 1;
        }
        .jw-modal-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(18px,3vw,24px);
          color: ${THEME.dark}; margin: 0;
        }
        .jw-close {
          width: 36px; height: 36px; border-radius: 50%;
          border: none; background: #F3F4F6;
          font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #6B7280; transition: background .15s;
          font-family: inherit;
        }
        .jw-close:hover { background: #E5E7EB; }

        .jw-modal-body {
          flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch;
          padding: 20px 16px 24px;
        }

        /* Word grid */
        .jw-word-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (min-width: 768px) {
          .jw-word-grid { grid-template-columns: repeat(5, 1fr); }
        }

        .jw-word-card {
          background: #fff;
          border: 2px solid ${THEME.accent}22;
          border-radius: 16px;
          padding: 12px 8px;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          gap: 4px;
          box-shadow: 0 2px 8px ${THEME.dark}0D;
          transition: transform .2s cubic-bezier(.34,1.56,.64,1);
        }
        .jw-word-card:hover { transform: translateY(-3px) scale(1.03); }

        .jw-word-emoji {
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          line-height: 1;
        }
        .jw-word-jawi {
          font-size: clamp(1.1rem, 3vw, 1.6rem);
          font-weight: 700;
          color: #1F2937;
          font-family: 'Amiri', serif;
          line-height: 1.1;
        }
        .jw-word-rumi {
          font-size: clamp(0.7rem, 1.8vw, 0.85rem);
          color: #6B7280;
          font-weight: 600;
          font-family: 'Fredoka', system-ui, sans-serif;
        }
        .jw-word-eng {
          font-size: clamp(0.6rem, 1.5vw, 0.72rem);
          color: #9CA3AF;
          font-weight: 500;
          font-family: 'Fredoka', system-ui, sans-serif;
        }

        @media(prefers-reduced-motion:reduce){*{animation:none!important}}
      `}</style>

      <div className="jw-page">
        <div className="jw-topbar">
          <div style={{ position: 'absolute', left: 'clamp(16px,4vw,40px)' }}>
            <BackButton onClick={onBack} />
          </div>
          <span className="jw-crumb">
            Modul 6 · Jawi › <span style={{ color: THEME.dark, fontWeight: 800 }}>
              {language === 'bm' ? 'Perkataan Jawi' : 'Jawi Words'}
            </span>
          </span>
        </div>

        <header className="jw-hero">
          <span className="jw-badge">
            {language === 'bm' ? 'Pendidikan Islam · Tahun 1' : 'Islamic Education · Year 1'}
          </span>
          <span className="jw-emoji-icon">🖋️</span>
          <h1 className="jw-h1">
            {language === 'bm' ? 'Perkataan Jawi' : 'Jawi Words'}
          </h1>
          <p className="jw-lead">
            {language === 'bm'
              ? 'Mari belajar perkataan Jawi asas dengan ejaan dan sebutan yang betul. Jawi adalah tulisan tradisional Bahasa Melayu yang indah dan bersejarah.'
              : 'Let\'s learn basic Jawi words with correct spelling and pronunciation. Jawi is the beautiful traditional script of the Malay language.'}
          </p>
        </header>

        <div style={{ maxWidth: 200, margin: '30px auto 0' }}>
          <button
            className="jw-icon-card t-alphabet"
            onClick={() => setShowAlphabet(true)}
            type="button"
            aria-label={language === 'bm' ? 'Alif Ba Ta' : 'Alif Ba Ta'}
          >
            <svg viewBox="0 0 200 200" fill="none">
              <rect x="10" y="10" width="180" height="180" rx="30" fill="#fff" stroke="#9D4EDD" strokeWidth="4"/>
              <rect x="38" y="40" width="124" height="120" rx="32" fill="#8E24AA"/>
              <rect x="48" y="80" width="28" height="38" rx="5" fill="#FFF6E2" stroke="#5B3A0A" strokeWidth="2"/>
              <rect x="48" y="80" width="28" height="8" rx="5" fill="rgba(255,255,255,.55)"/>
              <text x="62" y="108" textAnchor="middle" fontFamily="'Baloo 2','Noto Sans Arabic',sans-serif" fontWeight="800" fontSize="24" fill="#5B3A0A">ت</text>
              <g transform="rotate(-6 100 98)">
                <rect x="86" y="76" width="28" height="38" rx="5" fill="#fff" stroke="#5B3A0A" strokeWidth="2"/>
                <rect x="86" y="76" width="28" height="8" rx="5" fill="rgba(123,31,162,.18)"/>
                <text x="100" y="104" textAnchor="middle" fontFamily="'Baloo 2','Noto Sans Arabic',sans-serif" fontWeight="800" fontSize="24" fill="#5B3A0A">ب</text>
              </g>
              <rect x="124" y="80" width="28" height="38" rx="5" fill="#FFE082" stroke="#7A4D02" strokeWidth="2"/>
              <rect x="124" y="80" width="28" height="8" rx="5" fill="rgba(255,255,255,.55)"/>
              <text x="138" y="108" textAnchor="middle" fontFamily="'Baloo 2','Noto Sans Arabic',sans-serif" fontWeight="800" fontSize="24" fill="#7A4D02">ا</text>
              <text x="100" y="174" fontSize="13" fontFamily="'Fredoka','Baloo 2',sans-serif" fontWeight="700" fill="#7B1FA2" textAnchor="middle">Alif Ba Ta</text>
            </svg>
          </button>
        </div>

        <div className="jw-progress">
          <span className="jw-dot"></span>
          {JAWI_TOPICS.length} {language === 'bm' ? 'Topik Pembelajaran' : 'Learning Topics'}
        </div>
        <h2 className="jw-sec-title">
          {language === 'bm' ? 'Topik Pembelajaran' : 'Learning Topics'}
        </h2>
        <p className="jw-sec-sub">
          {language === 'bm' ? 'Ketuk setiap kad untuk melihat perkataan' : 'Tap each card to see the words'}
        </p>

        <div className="jw-grid">
          {JAWI_TOPICS.map((topic, idx) => (
            <button
              key={topic.id}
              className="jw-card"
              onClick={() => setSelectedTopic(topic)}
            >
              <span className="jw-num">{idx + 1}</span>
              <div className="jw-stage">
                {React.createElement(SVGS[idx])}
              </div>
              <p className="jw-csub">
                {language === 'bm' ? 'Pilih Kategori' : 'Choose Category'}
              </p>
              <h3 className="jw-ctitle">
                {language === 'bm' ? topic.title : topic.titleEng}
              </h3>
              <p className="jw-cdesc">
                {topic.words.length} {language === 'bm' ? 'Perkataan' : 'Words'}
              </p>
            </button>
          ))}
        </div>

        <p className="jw-foot">ImanGenius · Pendidikan Islam</p>
      </div>

      {selectedTopic && createPortal(
        <div className="jw-overlay" onClick={() => setSelectedTopic(null)}>
          <div className="jw-modal" onClick={e => e.stopPropagation()}>
            <div className="jw-modal-header">
              <h2 className="jw-modal-title">
                {language === 'bm' ? selectedTopic.title : selectedTopic.titleEng}
              </h2>
              <button className="jw-close" onClick={() => setSelectedTopic(null)} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="jw-modal-body">
              <div className="jw-word-grid">
                {selectedTopic.words.map((word, idx) => (
                  <div className="jw-word-card" key={idx}>
                    <span className="jw-word-emoji">{word.emoji}</span>
                    <span className="jw-word-jawi">{word.jawi}</span>
                    <span className="jw-word-rumi">{word.rumi}</span>
                    <span className="jw-word-eng">{word.eng}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.querySelector('.app-container') || document.body
      )}
    </>
  );
}
