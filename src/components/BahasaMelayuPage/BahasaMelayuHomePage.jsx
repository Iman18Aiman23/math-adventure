import React, { useEffect, useRef } from 'react';
import './BahasaMelayuPage.css';
import { RobotDefs, RobotSpeaking } from '../SubjectRobots';
import BackButton from '../BackButton';

const YEARS = [
  {
    id: 1, labelBM: 'Tahun 1', labelEN: 'Year 1',
    theme: 't1', emoji: '📗',
    metaBM: '5 Modul · Mula belajar', metaEN: '5 Modules · Start learning',
    locked: false,
  },
  {
    id: 2, labelBM: 'Tahun 2', labelEN: 'Year 2',
    theme: 't2', emoji: '📘',
    metaBM: '5 Modul · Teruskan', metaEN: '5 Modules · Continue',
    locked: false,
  },
  {
    id: 3, labelBM: 'Tahun 3', labelEN: 'Year 3',
    theme: 't3', emoji: '📕',
    metaBM: '5 Modul · Mula belajar', metaEN: '5 Modules · Start learning',
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
  return <div className="bm-home-sky" ref={ref} />;
}

export default function BahasaMelayuHomePage({ onBack, onSelectYear, language = 'bm' }) {
  return (
    <>
      <RobotDefs />
      <div className="bm-home-root">
        <div className="bm-home-scroll">
          <div className="bm-body">
            <div className="bm-home-wrap">
              <SkyStars />

              <div className="bm-home-back">
                <BackButton onClick={onBack} />
              </div>

              <div className="bm-brand">
                <span className="bm-brand-dot">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="4" width="16" height="16" rx="3" fill="#fff"/>
                    <text x="12" y="15" textAnchor="middle" fontFamily="Baloo 2,sans-serif" fontWeight="800" fontSize="12" fill="#0284C7">ب</text>
                  </svg>
                </span>
                <b className="bm-brand-text">Bahasa<span>Melayu</span></b>
              </div>

              <p className="bm-tagline">
                {language === 'bm'
                  ? 'Bacalah, hayatilah, cintailah Bahasa Melayu! 🚀'
                  : 'Read, cherish, and love the Malay language! 🚀'}
              </p>

              <h1 className="bm-home-h1">
                {language === 'bm' ? 'Pilih Tahun' : 'Choose Year'}
              </h1>

              <div className="bm-home-hint">
                {language === 'bm'
                  ? 'KLIK PADA ROBOT UNTUK MEMULAKAN'
                  : 'CLICK ON THE ROBOT TO START'}
              </div>

              <div className="bm-years">
                {YEARS.map((y) => {
                  const label = language === 'bm' ? y.labelBM : y.labelEN;
                  const meta = language === 'bm' ? y.metaBM : y.metaEN;

                  return (
                    <div
                      key={y.id}
                      className={`bm-year ${y.theme}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => onSelectYear?.(y.id)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectYear?.(y.id); }}
                    >
                      <div className="bm-disc">
                        <RobotSpeaking className="bm-year-robot-svg" />
                      </div>
                      <div className="bm-ribbon">{label}</div>
                      <div className="bm-meta">
                        {y.emoji} <b>{meta}</b>
                      </div>
                      <span className="bm-go">{language === 'bm' ? 'Mula ▸' : 'Start ▸'}</span>
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
