import React, { useEffect, useRef } from 'react';
import './PendidikanIslamPage.css';
import { RobotDefs } from '../SubjectRobots';
import BackButton from '../BackButton';
import PendidikanIslamRobot from './PendidikanIslamRobot';

const YEARS = [
  {
    id: 1, labelBM: 'Tahun 1', labelEN: 'Year 1',
    theme: 't1', emoji: '📗',
    metaBM: '6 Modul · Mula belajar', metaEN: '6 Modules · Start learning',
    locked: false,
  },
  {
    id: 2, labelBM: 'Tahun 2', labelEN: 'Year 2',
    theme: 't2', emoji: '📘',
    metaBM: '6 Modul · Teruskan', metaEN: '6 Modules · Continue',
    locked: false,
  },
  {
    id: 3, labelBM: 'Tahun 3', labelEN: 'Year 3',
    theme: 't3',
    locked: true,
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
  return <div className="pi-home-sky" ref={ref} />;
}

export default function PendidikanIslamHomePage({ initialYear = 1, onBack, onSelectModule, language = 'bm' }) {
  return (
    <>
      <RobotDefs />
      <div className="pi-home-root">
        <div className="pi-home-scroll">
          <div className="pi-body">
            <div className="pi-home-wrap">
              <SkyStars />

              <div className="pi-home-back">
                <BackButton onClick={onBack} />
              </div>

              <div className="pi-brand">
                <span className="pi-brand-dot">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 6.5C5 5.7 5.7 5 6.5 5H12v14H6.5C5.7 19 5 18.3 5 17.5V6.5Z" fill="#fff"/>
                    <path d="M19 6.5C19 5.7 18.3 5 17.5 5H12v14h5.5c.8 0 1.5-.7 1.5-1.5V6.5Z" fill="#CFF1FF"/>
                  </svg>
                </span>
                <b className="pi-brand-text">Iman<span>Genius</span></b>
              </div>

              <p className="pi-tagline">
                {language === 'bm'
                  ? 'Pembelajaran digital yang interaktif, menyeronokkan dan bermakna. 🚀'
                  : 'Interactive digital learning, fun and meaningful. 🚀'}
              </p>

              <h1 className="pi-home-h1">
                {language === 'bm' ? 'Pilih Tahun' : 'Choose Year'}
              </h1>

              <div className="pi-home-hint">
                {language === 'bm'
                  ? 'KLIK PADA ROBOT UNTUK MEMULAKAN PEMBELAJARAN'
                  : 'CLICK ON THE ROBOT TO START LEARNING'}
              </div>

              <div className="pi-years">
                {YEARS.map((y) => {
                  const label = language === 'bm' ? y.labelBM : y.labelEN;
                  const isUnlocked = !y.locked;

                  if (isUnlocked) {
                    return (
                      <div
                        key={y.id}
                        className={`pi-year ${y.theme}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectModule?.(y.id === 1 ? 'al-quran' : `${y.id}-al-quran`)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectModule?.(y.id === 1 ? 'al-quran' : `${y.id}-al-quran`); }}
                      >
                        <div className="pi-disc">
                          <PendidikanIslamRobot year={y.id} />
                        </div>
                        <div className="pi-ribbon">{label}</div>
                        <div className="pi-meta">
                          {y.emoji} <b>{y.metaBM}</b>
                        </div>
                        <span className="pi-go">Mula ▸</span>
                      </div>
                    );
                  }

                  return (
                    <div key={y.id} className={`pi-year ${y.theme} locked`} aria-disabled="true">
                      <div className="pi-lockchip">
                        <svg viewBox="0 0 24 24" fill="none">
                          <rect x="5" y="10" width="14" height="10" rx="2.5" fill="#fff"/>
                          <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="#fff" strokeWidth="2.2" fill="none"/>
                          <circle cx="12" cy="15" r="1.8" fill="#6E8195"/>
                        </svg>
                      </div>
                      <div className="pi-disc">
                        <PendidikanIslamRobot year={y.id} />
                      </div>
                      <div className="pi-soonbadge">{label}</div>
                      <div className="pi-soontag">🔒 {language === 'bm' ? 'Akan datang' : 'Coming soon'}</div>
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
