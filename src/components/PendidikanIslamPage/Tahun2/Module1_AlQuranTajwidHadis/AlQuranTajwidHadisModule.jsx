import React from 'react';
import { FONT_IMPORT, ARABIC_FONT } from '../../_shared/arabic';

const CARD_BG = '#FFFDF8';

const TOPICS = [
  {
    id: 'sukun-syaddah',
    pill: 'TOPIK 1.1',
    title: 'Sukun & Syaddah',
    desc: 'Kenali tanda mati (sukun) dan tanda tekan (syaddah) dalam bacaan al-Quran.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(212,150,10,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="18" rx="12" fill="#D4960A" />
        <rect x="12" y="24" width="76" height="12" fill="#D4960A" />
        <text x="50" y="31" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.1</text>
        <text x="34" y="66" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="28" fontWeight="700" fill="#065F46">بْ</text>
        <text x="66" y="66" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="28" fontWeight="700" fill="#1E40AF">بّ</text>
        <circle cx="34" cy="76" r="1.3" fill="#D4960A" opacity=".5" />
        <circle cx="66" cy="76" r="1.3" fill="#D4960A" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'idgham',
    pill: 'TOPIK 1.2',
    title: 'Idgham',
    desc: 'Pelajari hukum Nun Sakinah & Tanwin — bacaan idgham dengan jelas.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(212,150,10,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#D4960A" />
        <rect x="10" y="20" width="80" height="10" fill="#D4960A" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.2</text>
        <text x="30" y="64" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="22" fontWeight="700" fill="#065F46">مَنْ</text>
        <text x="60" y="64" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="22" fontWeight="700" fill="#1E40AF">يَّ</text>
        <circle cx="30" cy="74" r="1.3" fill="#D4960A" opacity=".5" />
        <circle cx="60" cy="74" r="1.3" fill="#D4960A" opacity=".5" />
        <circle cx="45" cy="74" r="1.3" fill="#D4960A" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'tilawah-tahun2',
    pill: 'TOPIK 1.3',
    title: 'Tilawah & Hafazan',
    desc: 'Baca dan hafaz surah-surah pendek dengan tajwid yang betul.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="14" width="80" height="72" rx="12" fill={CARD_BG} stroke="rgba(212,150,10,0.35)" strokeWidth="2" />
        <rect x="10" y="14" width="80" height="16" rx="12" fill="#D4960A" />
        <rect x="10" y="20" width="80" height="10" fill="#D4960A" />
        <text x="50" y="26" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.3</text>
        <text x="50" y="44" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="20" fontWeight="700" fill="#166534">الفاتحة</text>
        <text x="50" y="66" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="14" fontWeight="600" fill="#92400E">الفلق</text>
        <circle cx="26" cy="76" r="1.3" fill="#D4960A" opacity=".5" />
        <circle cx="50" cy="76" r="1.3" fill="#D4960A" opacity=".5" />
        <circle cx="74" cy="76" r="1.3" fill="#D4960A" opacity=".5" />
      </svg>
    ),
  },
  {
    id: 'hadis-tahun2',
    pill: 'TOPIK 1.4',
    title: 'Hadis',
    desc: 'Pelajari hadis-hadis pilihan tentang niat dan kasih sayang.',
    visual: (
      <svg viewBox="0 0 100 100">
        <rect x="12" y="18" width="76" height="64" rx="12" fill={CARD_BG} stroke="rgba(212,150,10,0.35)" strokeWidth="2" />
        <rect x="12" y="18" width="76" height="16" rx="12" fill="#D4960A" />
        <rect x="12" y="24" width="76" height="10" fill="#D4960A" />
        <text x="50" y="30" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="8" fontWeight="700" fill="#fff">Topik 1.4</text>
        <text x="30" y="50" textAnchor="middle" fontFamily={ARABIC_FONT} fontSize="14" fontWeight="600" fill="#065F46">الحَدِيث</text>
        <text x="58" y="48" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="28" fontWeight="700" fill="#92400E">📖</text>
        <rect x="26" y="60" width="48" height="14" rx="6" fill="#D4960A" opacity=".2" />
        <text x="50" y="71" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontSize="7" fontWeight="700" fill="#92400E">SUNNAH</text>
        <circle cx="30" cy="76" r="1.3" fill="#D4960A" opacity=".5" />
        <circle cx="50" cy="76" r="1.3" fill="#D4960A" opacity=".5" />
        <circle cx="70" cy="76" r="1.3" fill="#D4960A" opacity=".5" />
      </svg>
    ),
  },
];

export default function AlQuranTajwidHadisModule({ onSelectTopic, language = 'bm' }) {
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
        .aq-year-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.7);
          border: 2px solid rgba(212,150,10,0.3);
          border-radius: 999px;
          padding: 4px 16px 4px 12px;
          margin-bottom: 8px;
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: #92400E;
          letter-spacing: .02em;
        }
        .aq-year-badge::before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #D4960A;
          display: inline-block;
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
          width: min(170px, 65vw);
          height: min(170px, 65vw);
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
        <h1>
          {language === 'bm'
            ? 'MODUL 1 : Al-Quran, Tajwid & Hadis'
            : 'MODULE 1 : Al-Quran, Tajwid & Hadith'}
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
