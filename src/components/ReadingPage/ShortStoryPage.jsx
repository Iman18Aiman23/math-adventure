import React, { useEffect, useRef, useState } from 'react';
import { Settings } from 'lucide-react';
import ReadingLearningLayout from './ReadingLearningLayout';
import { JAWI_STORIES } from '../../utils/jawiStoriesData';
import './ShortStoryPage.css';

const STORY_LANGUAGES = [
  { id: 'bm', label: 'BM' },
  { id: 'eng', label: 'EN' },
  { id: 'jawi', label: 'JAWI' },
];
const STORY_BACKGROUNDS = {
  1: 'images/reading/busstory.webp',
  2: 'images/reading/aeroplanbestory.webp',
  3: 'images/reading/cutecat story.webp',
  4: 'images/reading/Tiget story.webp',
};

export default function ShortStoryPage({ onBack, language = 'bm', ...accountProps }) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [displayLang, setDisplayLang] = useState(language === 'bm' ? 'bm' : 'eng');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const storyContentRef = useRef(null);
  const settingsRef = useRef(null);
  const settingsPanelRef = useRef(null);
  const settingsButtonRef = useRef(null);
  const story = JAWI_STORIES[currentStoryIndex];
  const storyBackground = STORY_BACKGROUNDS[story.id]
    ? `${import.meta.env.BASE_URL}${STORY_BACKGROUNDS[story.id]}`
    : null;
  const isJawi = displayLang === 'jawi';

  useEffect(() => {
    if (storyContentRef.current) storyContentRef.current.scrollTop = 0;
  }, [currentStoryIndex]);

  useEffect(() => {
    setDisplayLang(language === 'bm' ? 'bm' : 'eng');
  }, [language]);

  useEffect(() => {
    if (!settingsOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (
        !settingsRef.current?.contains(event.target)
        && !settingsPanelRef.current?.contains(event.target)
      ) setSettingsOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setSettingsOpen(false);
        settingsButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [settingsOpen]);

  const getTitle = (item) => item.title[displayLang === 'eng' ? 'eng' : displayLang];
  const getParagraph = (paragraph) => paragraph[displayLang === 'eng' ? 'eng' : displayLang];
  const bm = language === 'bm';

  return (
    <ReadingLearningLayout
      pageClassName="rp-short-story-learning"
      onBack={onBack}
      onPrevious={() => setCurrentStoryIndex(index => Math.max(0, index - 1))}
      onNext={() => setCurrentStoryIndex(index => Math.min(JAWI_STORIES.length - 1, index + 1))}
      previousDisabled={currentStoryIndex === 0}
      nextDisabled={currentStoryIndex === JAWI_STORIES.length - 1}
      language={language}
      accountProps={accountProps}
    >
      <article
        className="rp-story-card"
        style={{ '--rp-story-accent': story.color, '--rp-story-tint': story.bgColor, '--rp-story-gradient': story.bgGradient }}
        aria-label={getTitle(story)}
      >
        {storyBackground && <img className="rp-story-background" src={storyBackground} alt="" aria-hidden="true" />}
        <div className="rp-story-middle">
          <div className="rp-story-scroll" ref={storyContentRef}>
            <div className="rp-story-book" key={`${story.id}-${displayLang}`}>
              <header className="rp-story-heading">
                <div className="rp-story-settings" ref={settingsRef}>
                  <button
                    ref={settingsButtonRef}
                    type="button"
                    className="rp-story-settings-button"
                    aria-label={bm ? 'Tetapan cerita' : 'Story settings'}
                    aria-expanded={settingsOpen}
                    aria-controls="rp-story-settings-panel"
                    onClick={() => setSettingsOpen(open => !open)}
                  >
                    <Settings size={21} aria-hidden="true" />
                  </button>
                </div>
                <h1 dir={isJawi ? 'rtl' : 'ltr'} lang={isJawi ? 'ms-Arab' : displayLang === 'eng' ? 'en' : 'ms'}>
                  {getTitle(story)}
                </h1>
              </header>

              <section
                className={`rp-story-text-panel${isJawi ? ' rp-story-text-panel--jawi' : ''}`}
                aria-label={getTitle(story)}
                dir={isJawi ? 'rtl' : 'ltr'}
                lang={isJawi ? 'ms-Arab' : displayLang === 'eng' ? 'en' : 'ms'}
              >
                {story.paragraphs.map((paragraph, index) => (
                  <p className="rp-story-line" key={`${story.id}-${index}`} dir={isJawi ? 'rtl' : 'ltr'} lang={isJawi ? 'ms-Arab' : displayLang === 'eng' ? 'en' : 'ms'}>
                    <span className="rp-story-line-number" aria-hidden="true">{index + 1}</span>
                    <span className="rp-story-line-text">{getParagraph(paragraph)}</span>
                  </p>
                ))}
              </section>
            </div>
          </div>
          <footer className="rp-story-footer">
            <p className="rp-story-count" aria-live="polite">
              {bm ? `Cerita ${currentStoryIndex + 1} daripada ${JAWI_STORIES.length}` : `Story ${currentStoryIndex + 1} of ${JAWI_STORIES.length}`}
            </p>
          </footer>
        </div>
        {settingsOpen && (
          <div className="rp-story-settings-overlay" onClick={() => setSettingsOpen(false)}>
            <div
              className="rp-story-settings-panel"
              id="rp-story-settings-panel"
              ref={settingsPanelRef}
              role="dialog"
              aria-modal="true"
              aria-label={bm ? 'Tetapan cerita' : 'Story settings'}
              onClick={event => event.stopPropagation()}
            >
              <label className="rp-story-select-label" htmlFor="rp-story-select">
                {bm ? 'Pilih cerita' : 'Choose a story'}
              </label>
              <select
                id="rp-story-select"
                className="rp-story-select"
                value={currentStoryIndex}
                onChange={event => {
                  setCurrentStoryIndex(Number(event.target.value));
                  setSettingsOpen(false);
                  settingsButtonRef.current?.focus();
                }}
              >
                {JAWI_STORIES.map((item, index) => (
                  <option key={item.id} value={index}>{getTitle(item)}</option>
                ))}
              </select>
              <div className="rp-story-language-tabs" role="group" aria-label={bm ? 'Bahasa cerita' : 'Story language'}>
                {STORY_LANGUAGES.map(option => (
                  <button
                    type="button"
                    key={option.id}
                    aria-pressed={displayLang === option.id}
                    onClick={() => {
                      setDisplayLang(option.id);
                      setSettingsOpen(false);
                      settingsButtonRef.current?.focus();
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </ReadingLearningLayout>
  );
}
