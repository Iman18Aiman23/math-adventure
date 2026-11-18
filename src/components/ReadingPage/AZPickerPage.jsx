import React from 'react';
import { PageHeader } from '../_shared/PageHeaderHero';
import '../_shared/StandardHeroBanner.css';
import AZPickerGrid from './AZPickerGrid';
import './KVLearningPage.css';

export default function AZPickerPage({
  letters,
  getCardCount,
  onBack,
  onSelectLetter,
  language = 'en',
  title,
  onStartQuiz,
  letterCardSuffix = '',
  mirrorAZStyle = false,
  ...accountProps
}) {
  const isMalay = language === 'bm';

  return (
    <main className={`mh-screen page-layout-root kv-picker kv-picker--master iman-layout${mirrorAZStyle ? ' kv-picker--az-mirror' : ''}`} aria-label={title}>
      <div className="mh-wrap page-container kv-picker-wrap">
        <PageHeader
          {...accountProps}
          onBack={onBack}
          language={isMalay ? 'bm' : 'en'}
          backOnly
          showProgress={false}
        />
        <div className="kv-picker-body">
          <div className="kv-picker-intro">
            <div>
              <span className="kv-picker-eyebrow">{title || (isMalay ? 'Membaca' : 'Reading')}</span>
              <h1>{isMalay ? 'Pilih huruf' : 'Choose a letter'}</h1>
              <p>{isMalay ? 'Ketik huruf untuk buka kad flash.' : 'Tap a letter to open its flashcards.'}</p>
            </div>
            <span className="kv-picker-count">
              {letters.length} {isMalay ? 'huruf' : 'letters'}
            </span>
          </div>
          <AZPickerGrid
            letters={letters}
            getCardCount={getCardCount}
            onSelectLetter={onSelectLetter}
            language={isMalay ? 'bm' : 'en'}
            variant="master"
            mirrorLetterStyle={mirrorAZStyle}
            letterCardSuffix={letterCardSuffix}
          />
          {onStartQuiz && (
            <div className="standard-hero-banner__action kv-picker-quiz-action">
              <button type="button" className="standard-hero-banner__cta blue-gradient-hero" onClick={onStartQuiz}>
                {isMalay ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
