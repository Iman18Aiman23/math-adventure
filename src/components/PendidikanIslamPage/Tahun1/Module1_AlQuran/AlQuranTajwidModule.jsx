import React from 'react';
import BackButton from '../../../BackButton';
import { FONT_IMPORT, ARABIC_FONT } from '../../_shared/arabic';

const CARD_BG = '#FFFDF8';

const TOPICS = [
  {
    id: 'huruf-hijaiyah',
    pill: 'TOPIK 1.1',
    title: 'Huruf Hijaiyah Tunggal',
    desc: 'Kenali dan sebut 29 huruf hijaiyah dari alif hingga ya.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(212,150,10,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#D4960A" />
        <rect x="12" y="24" width="76" height="12" fill="#D4960A" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Modul 1.1</text>
        <text x="80" y="66" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="24" fontWeight="700" fill="#065F46">ا</text>
        <text x="60" y="66" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="24" fontWeight="700" fill="#1E40AF">ب</text>
        <text x="30" y="66" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="24" fontWeight="700" fill="#92400E">ت</text>
        <circle cx="72" cy="74" r="1.3" fill="#D4960A" opacity=".5" />
        <circle cx="50" cy="74" r="1.3" fill="#D4960A" opacity=".5" />
        <circle cx="28" cy="74" r="1.3" fill="#D4960A" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'tanda-bacaan',
    pill: 'TOPIK 1.2',
    title: 'Tanda Bacaan Asas',
    desc: 'Baris atas, baris bawah dan baris depan untuk belajar al-Quran.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(212,150,10,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#D4960A" />
        <rect x="10" y="20" width="80" height="10" fill="#D4960A" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Modul 1.2</text>
        <text x="26" y="64" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="24" fontWeight="700" fill="#065F46">بُ</text>
        <text x="50" y="64" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="24" fontWeight="700" fill="#1E40AF">بِ</text>
        <text x="74" y="64" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="24" fontWeight="700" fill="#92400E">بَ</text>
      </svg>
    ),
  },
  {
    id: 'tanwin',
    pill: 'TOPIK 1.3',
    title: 'Tanwin Baris Dua',
    desc: 'Belajar baris dua: tanwin fathah, kasrah dan dammah.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(212,150,10,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#D4960A" />
        <rect x="10" y="20" width="80" height="10" fill="#D4960A" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Modul 1.3</text>
        <text x="26" y="64" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="24" fontWeight="700" fill="#065F46">بٌ</text>
        <text x="50" y="64" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="24" fontWeight="700" fill="#1E40AF">بٍ</text>
        <text x="74" y="64" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="24" fontWeight="700" fill="#92400E">بً</text>
      </svg>
    ),
  },
  {
    id: 'hafazan',
    pill: 'TOPIK 1.4',
    title: 'Tilawah dan Hafazan',
    desc: 'Bacaan tilawah yang betul dan latihan menghafaz ayat.',
    visual: (
      <svg viewBox="0 0 100 100">
        <defs>
          <linearGradient id="qPL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8E1" />
            <stop offset="80%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
        </defs>
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(212,150,10,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="16" rx="12" fill="#D4960A" />
        <rect x="12" y="24" width="76" height="10" fill="#D4960A" />
        <text x="50" y="30" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Modul 1.4</text>
        <path d="M28 68 L34 52 L38 52 L32 68 Z" fill="#8B5E3C" opacity=".8" />
        <path d="M28 68 L34 52 Q31 50 30 50 L25 68 Z" fill="#6B3F1A" opacity=".6" />
        <path d="M72 68 L66 52 L62 52 L68 68 Z" fill="#8B5E3C" opacity=".8" />
        <path d="M72 68 L66 52 Q69 50 70 50 L75 68 Z" fill="#6B3F1A" opacity=".6" />
        <path d="M30 44 Q50 38 70 44 L70 60 Q50 54 30 60 Z" fill="#166534" />
        <path d="M31 46 Q50 40 69 46 L69 58 Q50 52 31 58 Z" fill="#D4A017" />
        <path d="M32 48 Q48 42 68 48 L68 56 Q48 50 32 56 Z" fill="url(#qPL)" stroke="#B8860B" strokeWidth=".5" />
        <rect x="48" y="48" width="4" height="8" fill="#5B3A0A" opacity=".3" rx=".5" />
        <rect x="36" y="49" width="10" height="4" rx="1" fill="none" stroke="#B8860B" strokeWidth=".7" opacity=".7" />
        <rect x="54" y="49" width="10" height="4" rx="1" fill="none" stroke="#B8860B" strokeWidth=".7" opacity=".7" />
        <line x1="38" y1="56" x2="46" y2="56" stroke="#5B3A0A" strokeWidth=".8" opacity=".7" />
        <line x1="54" y1="56" x2="62" y2="56" stroke="#5B3A0A" strokeWidth=".8" opacity=".7" />
        <path d="M48 60 L48 68 L50.5 66 L53 68 L53 60 Z" fill="#166534" />
        <circle cx="36" cy="47" r="1.5" fill="#FFD700" opacity=".7" />
        <circle cx="50" cy="47" r="1.5" fill="#FFD700" opacity=".7" />
        <circle cx="64" cy="47" r="1.5" fill="#FFD700" opacity=".7" />
      </svg>
    ),
  },
];

export default function AlQuranTajwidModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <>
      <style>{`
        ${FONT_IMPORT}
        .aq-page {
          padding: 56px 24px 80px;
          width: 100%;
          max-width: 100%;
          background: radial-gradient(ellipse at top, #FFF7D6 0%, #FDD97A 55%, #F5CD6D 100%);
          min-height: 100vh;
          font-family: 'Fredoka', system-ui, sans-serif;
          color: #10243A;
          position: relative;
        }
        .aq-page h1 {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(22px, 5vw, 38px);
          color: #92400E;
          text-align: center;
          margin: 0 0 6px;
        }
        .aq-subtitle {
          text-align: center;
          color: #A05210;
          font-weight: 600;
          font-size: clamp(11px, 2.5vw, 13px);
          letter-spacing: .14em;
          text-transform: uppercase;
          margin: 0 0 48px;
        }
        .aq-grid {
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 28px;
        }
        .aq-card {
          background: linear-gradient(180deg, #fff, #FFF8EC);
          border-radius: 28px;
          padding: 24px 20px 26px;
          border: 1px solid rgba(212,150,10,.18);
          box-shadow: 0 12px 32px -12px rgba(146,64,14,.22), 0 2px 6px rgba(212,150,10,.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          transition: transform .32s cubic-bezier(.34,1.56,.64,1), box-shadow .32s;
          cursor: pointer;
        }
        .aq-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 22px 48px -14px rgba(146,64,14,.32);
        }
        .aq-stage {
          width: 170px;
          height: 170px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at 50% 34%, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%);
          box-shadow: inset 0 -8px 24px rgba(146,64,14,.2), inset 0 2px 0 rgba(255,255,255,.5);
        }
        .aq-stage svg {
          width: 90%;
          height: 90%;
          overflow: visible;
        }
        .aq-pill {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #fff;
          padding: 5px 14px;
          border-radius: 999px;
          background: linear-gradient(180deg, #F59E0B, #D4960A);
          box-shadow: 0 2px 0 #92400E;
        }
        .aq-card-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #92400E;
          margin: 0;
          text-align: center;
        }
        .aq-card-desc {
          font-family: 'Fredoka', sans-serif;
          font-weight: 500;
          font-size: 12.5px;
          color: #A05210;
          margin: 0;
          text-align: center;
          line-height: 1.5;
          padding: 0 4px;
        }
        .aq-stage svg {
          animation: stage-float 3.4s ease-in-out infinite;
        }
        @keyframes stage-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>

      <div className="aq-page">
        <BackButton
          onClick={onBack}
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 10,
          }}
        />

        <h1>
          {language === 'bm'
            ? 'MODUL 1 : Al-Quran & Tajwid'
            : 'MODULE 1 : Al-Quran & Tajwid'}
        </h1>
        <p className="aq-subtitle">
          {language === 'bm'
            ? 'PILIH TOPIK UNTUK MEMULAKAN PEMBELAJARAN'
            : 'SELECT A TOPIC TO START LEARNING'}
        </p>

        <div className="aq-grid">
          {TOPICS.map((t) => (
            <div
              key={t.id}
              className="aq-card"
              onClick={() => onSelectTopic?.(t.id)}
            >
              <div className="aq-stage">
                {t.visual}
              </div>
              <h3 className="aq-card-title">{t.title}</h3>
              <p className="aq-card-desc">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
