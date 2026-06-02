import React, { useState } from 'react';
import './PendidikanIslamPage.css';
import PageLayout from '../PageLayout';
import { playHoverSound } from '../../utils/soundManager';
import { RobotDefs, RobotHeadArabic } from '../SubjectRobots';
import ICONS from './PendidikanIslamIcons';

const MODULES = [
  { id: 'al-quran', num: 1, tClass: 't-quran', titleBM: 'Al-Quran & Tajwid', titleEN: 'Quran & Tajweed' },
  { id: 'akidah',   num: 2, tClass: 't-akidah', titleBM: 'Akidah',           titleEN: 'Faith' },
  { id: 'ibadah',   num: 3, tClass: 't-ibadah', titleBM: 'Ibadah',           titleEN: 'Worship' },
  { id: 'sirah',    num: 4, tClass: 't-sirah', titleBM: 'Sirah',            titleEN: 'Biography' },
  { id: 'adab',     num: 5, tClass: 't-adab', titleBM: 'Adab & Akhlak',     titleEN: 'Manners' },
  { id: 'jawi',     num: 6, tClass: 't-jawi', titleBM: 'Celik Jawi',        titleEN: 'Jawi Literacy' },
];

const YEARS = [
  { id: 1, labelBM: 'Tahun 1', labelEN: 'Year 1', locked: false },
  { id: 2, labelBM: 'Tahun 2', labelEN: 'Year 2', locked: false },
  { id: 3, labelBM: 'Tahun 3', labelEN: 'Year 3', locked: true  },
];

export default function PendidikanIslamHomePage({ onBack, onSelectModule, language = 'bm' }) {
  const [activeYear, setActiveYear] = useState(1);

  const heroSubtitle = (
    <>
      {language === 'bm'
        ? 'Belajar dengan seronok & penuh berkat'
        : 'Learn with joy & full of blessings'}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#D4960A">
        <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
      </svg>
    </>
  );

  const sectionLabel = language === 'bm' ? 'Pilih Modul' : 'Choose Module';

  const tiles = MODULES.map(mod => {
    const IconComponent = ICONS[mod.id];
    const locked = activeYear === 3;
    const title = language === 'bm' ? mod.titleBM : mod.titleEN;

    return (
      <button
        key={mod.id}
        className={`pi-icon-card ${mod.tClass}`}
        disabled={locked}
        onClick={locked ? undefined : () => onSelectModule?.(activeYear === 1 ? mod.id : `${activeYear}-${mod.id}`)}
        onMouseEnter={!locked ? playHoverSound : undefined}
        type="button"
      >
        {IconComponent && <IconComponent size={200} />}
        {locked && <span className="pi-lock-badge">🔒</span>}
        {!locked && activeYear !== 1 && (
          <span className="pi-year-badge">T{activeYear}</span>
        )}
      </button>
    );
  });

  return (
    <>
      <RobotDefs />
      <PageLayout
        classPrefix="pi"
        heroIcon={<RobotHeadArabic style={{ width: 140, height: 100 }} />}
        heroSubtitle={heroSubtitle}
        sectionLabel={sectionLabel}
        onBack={onBack}
      >
        <div className="pi-year-row">
          {YEARS.map(y => {
            const label = language === 'bm' ? y.labelBM : y.labelEN;
            return (
              <button
                key={y.id}
                className={`pi-year-tab${activeYear === y.id && !y.locked ? ' active' : ''}`}
                disabled={y.locked}
                onClick={() => !y.locked && setActiveYear(y.id)}
                onMouseEnter={!y.locked ? playHoverSound : undefined}
                type="button"
              >
                {y.locked ? `🔒 ${label}` : label}
              </button>
            );
          })}
        </div>

        {tiles}
      </PageLayout>
    </>
  );
}
