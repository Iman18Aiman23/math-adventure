import { useId } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import useBrowserBack from '../../hooks/useBrowserBack';
import HomeHeaderActions from './HomeHeaderActions';
import { PageHeader, PageHero } from './PageHeaderHero';
import { prioritizeHeroMascot } from './heroImage';
import './SubjectMenuLayout.css';
import './PageContainer.css';

// DesktopSidebar and SubjectMenuFooter are owned by App, outside its scroll area.
export default function SubjectMenuLayout({
  title, eyebrow, heroTitle, description, encouragement, mascot,
  sectionTitle, sectionDescription, topics, onSelect, onBack,
  language = 'bm', pending, notice, additionalContent, heroBackground, sharedPageChrome = false,
  rootClassName, rootStyle, wrapClassName, headerContent, heroContent, heroAction, heroClassName = '', contentClassName, overlayContent, children, ...accountProps
}) {
  const id = useId();
  // Dashboard pages can provide the app's home action as `onHome`; use it
  // when they do not have a page-specific back destination.
  const handleBack = useBrowserBack(onBack || accountProps.onHome);
  const comingSoon = language === 'bm' ? 'Segera Hadir' : 'Coming Soon';

  return (
    <main className={rootClassName || `mh-screen${sharedPageChrome ? ' page-layout-root' : ''}`} style={rootStyle} aria-label={title}>
      {pending}
      {notice && <div className="mh-menu-notice" role="status">{notice}</div>}
      <div className={wrapClassName || 'mh-wrap page-container'}>
        {headerContent ?? (sharedPageChrome ? <PageHeader {...accountProps} title={title} onBack={handleBack} language={language} /> : <header className="mh-header">
          <button type="button" className="mh-back" onClick={handleBack} aria-label={language === 'bm' ? 'Kembali' : 'Back'}><ArrowLeft aria-hidden="true" /></button>
          <h1>{title}</h1>
          <HomeHeaderActions {...accountProps} language={language} />
        </header>)}
        {heroContent !== undefined ? heroContent : (sharedPageChrome ? <PageHero {...{ eyebrow, heroTitle, description, encouragement, mascot, heroBackground, action: heroAction }} className={heroClassName} /> : <section className={`mh-hero ${heroClassName}`.trim()} aria-labelledby={`${id}-hero`} style={heroBackground ? { background: heroBackground } : undefined}>
          <div className="mh-hero-copy">
            <p className="mh-eyebrow">{eyebrow}</p>
            <h2 id={`${id}-hero`}>{heroTitle}</h2>
            <p className="mh-description">{description}</p>
            {encouragement && <p className="mh-encouragement">{encouragement}</p>}
          </div>
          <div className="mh-mascot" aria-hidden="true">{prioritizeHeroMascot(mascot)}</div>
        </section>)}
        {children !== undefined ? (contentClassName ? <div className={contentClassName}>{children}</div> : children) : <>
          <div className="mh-section-heading">
            <h2 id={`${id}-topics`}>{sectionTitle}</h2>
            <p>{sectionDescription}</p>
          </div>
          <section className="mh-topic-grid" aria-labelledby={`${id}-topics`}>
            {topics.map(topic => topic.compactTag ? (
              <button key={topic.id} type="button" className={`mh-topic-card mh-${topic.theme} mh-compact-tag mh-compact-tag-${topic.id}`}
                disabled={topic.disabled} onClick={() => onSelect(topic.id)} onMouseEnter={topic.onMouseEnter}
                title={topic.disabled ? (topic.disabledReason || topic.disabledLabel || comingSoon) : undefined}>
                <div className="mh-compact-tag-content card-container">
                  <div className="mh-compact-tag-icon icon-wrapper" aria-hidden="true">{topic.visual}</div>
                  <div className="mh-compact-tag-text text-wrapper">
                    <span className="mh-compact-tag-title">{topic.title}</span>
                  </div>
                </div>
                {topic.showAction !== false && <span className="mh-compact-tag-go">
                  <span>{language === 'bm' ? 'Mula' : 'Start'}</span>
                  <span className="mh-compact-tag-arrow" aria-hidden="true">&gt;</span>
                </span>}
              </button>
            ) : topic.imageButton ? (
              <div key={topic.id} className={`mh-topic-card mh-${topic.theme} mh-image-button-card mh-image-button-${topic.id}`}>
                <button type="button" className="mh-image-art-button" disabled={topic.disabled}
                  onClick={() => onSelect(topic.id)} onMouseEnter={topic.onMouseEnter}
                  title={topic.disabled ? (topic.disabledReason || topic.disabledLabel || comingSoon) : undefined}
                  aria-label={`${topic.title}. ${language === 'bm' ? 'Mula' : 'Start'}`}>
                  {topic.visual}
                </button>
                {topic.showAction !== false && <button type="button" className="mh-image-card-action" disabled={topic.disabled}
                  onClick={() => onSelect(topic.id)} onMouseEnter={topic.onMouseEnter}
                  title={topic.disabled ? (topic.disabledReason || topic.disabledLabel || comingSoon) : undefined}>
                  {topic.disabled ? (topic.disabledLabel || comingSoon) : language === 'bm' ? 'Mula' : 'Start'}
                  <span aria-hidden="true">&gt;</span>
                </button>}
              </div>
            ) : (
              <button key={topic.id} type="button" className={`mh-topic-card mh-${topic.theme}`}
                disabled={topic.disabled} onClick={() => onSelect(topic.id)} onMouseEnter={topic.onMouseEnter}
                title={topic.disabled ? (topic.disabledReason || topic.disabledLabel || comingSoon) : undefined}>
                <span className="mh-topic-visual" aria-hidden="true">{topic.visual}</span>
                <span className="mh-topic-copy">
                  <span className="mh-topic-title">{topic.title}</span>
                  <span className="mh-topic-description">{topic.description}</span>
                  {topic.disabled && <span className="mh-coming-soon">{topic.disabledLabel || comingSoon}</span>}
                </span>
                <span className="mh-card-action">
                  <span>{topic.disabled ? (topic.disabledLabel || comingSoon) : language === 'bm' ? 'Mula Belajar' : 'Start Learning'}</span>
                  <span className="mh-arrow" aria-hidden="true"><ChevronRight /></span>
                </span>
              </button>
            ))}
          </section>
          {additionalContent}
        </>}
      </div>
      {overlayContent}
    </main>
  );
}
