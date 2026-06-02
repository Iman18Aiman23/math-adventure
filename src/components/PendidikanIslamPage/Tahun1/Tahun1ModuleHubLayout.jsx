import React from 'react';
import BackButton from '../../BackButton';
import { FONT_IMPORT } from '../_shared/arabic';

export default function Tahun1ModuleHubLayout({
  moduleNum,
  moduleName,
  moduleNameEn,
  theme,
  topics,
  onBack,
  onSelectTopic,
  language = 'bm',
  footer,
}) {
  return (
    <>
      <style>{`
        ${FONT_IMPORT}
        .pi-mhub-page {
          padding: 56px 24px 80px;
          width: 100%;
          max-width: 100%;
          background: ${theme.pageGradient};
          min-height: 100vh;
          font-family: 'Fredoka', system-ui, sans-serif;
          color: #10243A;
          position: relative;
        }
        .pi-mhub-page h1 {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(22px, 5vw, 38px);
          color: ${theme.dark};
          text-align: center;
          margin: 0 0 6px;
        }
        .pi-mhub-subtitle {
          text-align: center;
          color: ${theme.dark};
          opacity: 0.8;
          font-weight: 600;
          font-size: clamp(11px, 2.5vw, 13px);
          letter-spacing: .14em;
          text-transform: uppercase;
          margin: 0 0 48px;
        }
        .pi-mhub-grid {
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 28px;
        }
        .pi-mhub-card {
          background: linear-gradient(180deg, #fff, #FFF8EC);
          border-radius: 28px;
          padding: 24px 20px 26px;
          border: 1px solid ${theme.accent}2E;
          box-shadow: 0 12px 32px -12px ${theme.dark}38, 0 2px 6px ${theme.accent}1A;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          transition: transform .32s cubic-bezier(.34,1.56,.64,1);
          cursor: pointer;
          will-change: transform;
        }
        .pi-mhub-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 22px 48px -14px ${theme.dark}52;
        }
        .pi-mhub-stage {
          width: 170px;
          height: 170px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: ${theme.stageGradient};
          box-shadow: inset 0 -8px 24px ${theme.dark}33, inset 0 2px 0 rgba(255,255,255,.5);
        }
        .pi-mhub-stage svg {
          width: 90%;
          height: 90%;
          overflow: visible;
          animation: pi-mhub-float 3.4s ease-in-out infinite;
        }
        .pi-mhub-pill {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #fff;
          padding: 5px 14px;
          border-radius: 999px;
          background: ${theme.pillGradient};
          box-shadow: 0 2px 0 ${theme.dark};
        }
        .pi-mhub-card-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: ${theme.dark};
          margin: 0;
          text-align: center;
        }
        .pi-mhub-card-desc {
          font-family: 'Fredoka', sans-serif;
          font-weight: 500;
          font-size: 12.5px;
          color: ${theme.dark};
          opacity: 0.7;
          margin: 0;
          text-align: center;
          line-height: 1.5;
          padding: 0 4px;
        }
        @keyframes pi-mhub-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .floatA{animation:floatA 3.6s ease-in-out infinite;transform-origin:center}
        .floatA.d1{animation-delay:.4s}.floatA.d2{animation-delay:.8s}.floatA.d3{animation-delay:1.2s}
        @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .pulse{animation:pulse 2.2s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
        .bob{animation:bob 2.6s ease-in-out infinite;transform-origin:center}
        @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .spin{animation:spin 18s linear infinite;transform-origin:50px 32px}
        @keyframes spin{to{transform:rotate(360deg)}}
        .drip{animation:drip 2.2s ease-in infinite}
        @keyframes drip{0%{transform:translateY(-2px);opacity:0}30%{opacity:1}100%{transform:translateY(12px);opacity:0}}
        .bubble{transform-origin:center;animation:bubble 3s ease-in-out infinite}
        .bubble.b2{animation-delay:.6s}.bubble.b3{animation-delay:1.2s}.bubble.b4{animation-delay:1.8s}.bubble.b5{animation-delay:2.4s}
        @keyframes bubble{0%{transform:translateY(4px) scale(.6);opacity:0}25%{opacity:.9}70%{opacity:.7}100%{transform:translateY(-16px) scale(1.05);opacity:0}}
        .zzz{animation:zzz 3s ease-in-out infinite}
        @keyframes zzz{0%{transform:translateY(2px);opacity:0}30%{opacity:1}100%{transform:translate(4px,-12px);opacity:0}}
        .wave{animation:wave 1.8s ease-in-out infinite}
        .wave.w2{animation-delay:.3s}.wave.w3{animation-delay:.6s}
        @keyframes wave{0%,100%{opacity:.35;transform:scale(.9)}50%{opacity:1;transform:scale(1.05)}}
      `}</style>

      <div className="pi-mhub-page">
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
            ? `MODUL ${moduleNum} : ${moduleName}`
            : `MODULE ${moduleNum} : ${moduleNameEn}`}
        </h1>
        <p className="pi-mhub-subtitle">
          {language === 'bm'
            ? 'PILIH TOPIK UNTUK MEMULAKAN PEMBELAJARAN'
            : 'SELECT A TOPIC TO START LEARNING'}
        </p>

        <div className="pi-mhub-grid">
          {topics.map((t) => (
            <div
              key={t.id}
              className="pi-mhub-card"
              onClick={() => onSelectTopic?.(t.id)}
            >
              <div className="pi-mhub-stage">
                {t.visual}
              </div>
              <h3 className="pi-mhub-card-title">{t.title}</h3>
              <p className="pi-mhub-card-desc">{t.desc}</p>
            </div>
          ))}
        </div>

        {footer && (
          <div style={{ marginTop: '3rem' }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
