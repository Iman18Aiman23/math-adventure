import React from 'react';
import { Check, Settings, Volume2 } from 'lucide-react';

const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI' },
  { key: 'ENG', label: 'ENG' },
  { key: 'JAWI', label: 'JAWI' },
];

export default function ReadingLearningCard({
  currentItem,
  displayText,
  translationText,
  flipDirection,
  script,
  language,
  settingsRef,
  onScriptChange,
  onListenMain,
  onListenTranslation,
}) {
  const isMalay = language === 'bm';
  const textLanguage = script === 'ENG' ? 'en' : script === 'JAWI' ? 'ms-Arab' : 'ms';
  const translationLanguage = script === 'ENG' ? 'ms' : 'en';
  const listenLabel = isMalay ? `Dengar ${displayText ?? ''}` : `Listen to ${displayText ?? ''}`;
  const translationListenLabel = isMalay
    ? `Dengar ${translationText ?? ''}`
    : `Listen to ${translationText ?? ''}`;

  return (
    <article key={currentItem?.id} className={`kv-flashcard kv-reading-flashcard${flipDirection ? ` kv-flashcard--flip-${flipDirection}` : ''}`} aria-label={displayText}>
      <div className="kv-flashcard-header">
        <div className="kv-flashcard-top-row">
          <details className="kv-settings kv-flashcard-settings" ref={settingsRef}>
            <summary aria-label={isMalay ? 'Tetapan bahasa dan tulisan' : 'Language and script settings'} title={isMalay ? 'Tetapan' : 'Settings'}>
              <Settings size={21} aria-hidden="true" />
            </summary>
            <div className="kv-settings-panel" role="group" aria-label={isMalay ? 'Pilihan bahasa dan tulisan' : 'Language and script'}>
              <span className="kv-settings-label">{isMalay ? 'Bahasa & tulisan' : 'Language & script'}</span>
              {SCRIPTS.map(option => (
                <button
                  type="button"
                  key={option.key}
                  aria-pressed={script === option.key}
                  onClick={() => {
                    onScriptChange(option.key);
                    settingsRef.current.open = false;
                    settingsRef.current.querySelector('summary').focus();
                  }}
                >
                  {option.label}{script === option.key && <Check size={17} aria-hidden="true" />}
                </button>
              ))}
            </div>
          </details>
        </div>
      </div>
      <div className="kv-flashcard-body">
        <div className="kv-flashcard-learning-group">
          <div className="kv-flashcard-item kv-flashcard-picture-item">
            <div className="kv-flashcard-picture" aria-hidden="true">{currentItem?.emoji}</div>
          </div>
          <div className="kv-flashcard-text-group">
            <div className="kv-flashcard-item kv-flashcard-word-item">
              <div className="kv-inline-audio-card">
                <div className="kv-flashcard-word" dir={script === 'JAWI' ? 'rtl' : 'ltr'} lang={textLanguage}>{displayText}</div>
                <button type="button" className="kv-inline-audio-button" onClick={onListenMain} aria-label={listenLabel} title={isMalay ? 'Tekan untuk dengar' : 'Tap to listen'}>
                  <Volume2 size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="kv-flashcard-item kv-flashcard-translation-item">
              <div className="kv-inline-audio-card">
                <div className="kv-flashcard-translation" lang={translationLanguage}>{translationText}</div>
                <button type="button" className="kv-inline-audio-button" onClick={onListenTranslation} aria-label={translationListenLabel} title={isMalay ? 'Tekan untuk dengar' : 'Tap to listen'}>
                  <Volume2 size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
