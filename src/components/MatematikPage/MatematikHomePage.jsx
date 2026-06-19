import React, { useEffect, useRef } from 'react';
import './MatematikPage.css';
import { RobotDefs, RobotMath } from '../SubjectRobots';
import BackButton from '../BackButton';

const YEARS = [
  {
    id: 1, labelBM: 'Tahun 1', labelEN: 'Year 1',
    theme: 't1', emoji: '📗',
    metaBM: '3 Modul · Mula belajar', metaEN: '3 Modules · Start learning',
    locked: false,
  },
  {
    id: 2, labelBM: 'Tahun 2', labelEN: 'Year 2',
    theme: 't2', emoji: '📘',
    metaBM: '3 Modul · Teruskan', metaEN: '3 Modules · Continue',
    locked: false,
  },
  {
    id: 3, labelBM: 'Tahun 3', labelEN: 'Year 3',
    theme: 't3', emoji: '📕',
    metaBM: '3 Modul · Mula belajar', metaEN: '3 Modules · Start learning',
    locked: false,
  },
];

function SkyStars() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const n = 26;
    let h = '';
    for (let i = 0; i < n; i++) {
      const s = (Math.random() * 3 + 2).toFixed(1);
      h += `<i style="left:${(Math.random() * 100).toFixed(1)}%;top:${(Math.random() * 100).toFixed(1)}%;width:${s}px;height:${s}px;animation-delay:${(Math.random() * 5).toFixed(1)}s"></i>`;
    }
    el.innerHTML = h;
  }, []);
  return <div className="mt-home-sky" ref={ref} />;
}

export default function MatematikHomePage({ onBack, onSelectYear, language = 'bm' }) {
  return (
    <>
      <RobotDefs />
      <div className="mt-home-root">
        <div className="mt-home-scroll">
          <div className="mt-body">
            <div className="mt-home-wrap">
              <SkyStars />

              <div className="mt-home-back">
                <BackButton onClick={onBack} />
              </div>

              <div className="mt-brand">
                <span className="mt-brand-dot">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="4" width="16" height="16" rx="3" fill="#fff"/>
                    <text x="12" y="15" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="700" fontSize="13" fill="#7A4FD0">+</text>
                  </svg>
                </span>
                <b className="mt-brand-text">Mate<span>matik</span></b>
              </div>

              <p className="mt-tagline">
                {language === 'bm'
                  ? 'Belajar matematik dengan cara yang menyeronokkan! 🚀'
                  : 'Learn math in a fun and exciting way! 🚀'}
              </p>

              <h1 className="mt-home-h1">
                {language === 'bm' ? 'Pilih Tahun' : 'Choose Year'}
              </h1>

              <div className="mt-home-hint">
                {language === 'bm'
                  ? 'KLIK PADA ROBOT UNTUK MEMULAKAN'
                  : 'CLICK ON THE ROBOT TO START'}
              </div>

              <div className="mt-years">
                {YEARS.map((y) => {
                  const label = language === 'bm' ? y.labelBM : y.labelEN;
                  const meta = language === 'bm' ? y.metaBM : y.metaEN;

                  return (
                    <div
                      key={y.id}
                      className={`mt-year ${y.theme}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => onSelectYear?.(y.id)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectYear?.(y.id); }}
                    >
                      <div className="mt-disc">
                        <RobotMath className="mt-year-robot-svg" />
                      </div>
                      <div className="mt-ribbon">{label}</div>
                      <div className="mt-meta">
                        {y.emoji} <b>{meta}</b>
                      </div>
                      <span className="mt-go">{language === 'bm' ? 'Mula ▸' : 'Start ▸'}</span>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
