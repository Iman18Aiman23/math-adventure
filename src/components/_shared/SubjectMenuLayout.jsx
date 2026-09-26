import { useId } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import useBrowserBack from '../../hooks/useBrowserBack';
import HomeHeaderActions from './HomeHeaderActions';
import { PageHeader, PageHero } from './PageHeaderHero';
import './SubjectMenuLayout.css';

// DesktopSidebar and SubjectMenuFooter are owned by App, outside its scroll area.
export default function SubjectMenuLayout({
  title, eyebrow, heroTitle, description, encouragement, mascot,
  sectionTitle, sectionDescription, topics, onSelect, onBack,
  language = 'bm', pending, notice, additionalContent, heroBackground, sharedPageChrome = false, ...accountProps
}) {
  const id = useId();
  const handleBack = useBrowserBack(onBack);
  const comingSoon = language === 'bm' ? 'Segera Hadir' : 'Coming Soon';

  return (
    <main className="mh-screen" aria-label={title}>
      {pending}
      {notice && <div className="mh-menu-notice" role="status">{notice}</div>}
      <div className="mh-wrap">
        {sharedPageChrome ? <PageHeader {...accountProps} title={title} onBack={handleBack} language={language} /> : <header className="mh-header">
          <button type="button" className="mh-back" onClick={handleBack} aria-label={language === 'bm' ? 'Kembali' : 'Back'}><ArrowLeft aria-hidden="true" /></button>
          <h1>{title}</h1>
          <HomeHeaderActions {...accountProps} language={language} />
        </header>}
        {sharedPageChrome ? <PageHero {...{ eyebrow, heroTitle, description, encouragement, mascot, heroBackground }} /> : <section className="mh-hero" aria-labelledby={`${id}-hero`} style={heroBackground ? { background: heroBackground } : undefined}>
          <div className="mh-hero-copy">
            <p className="mh-eyebrow">{eyebrow}</p>
            <h2 id={`${id}-hero`}>{heroTitle}</h2>
            <p className="mh-description">{description}</p>
            <p className="mh-encouragement">{encouragement}</p>
          </div>
          <div className="mh-mascot" aria-hidden="true">{mascot}</div>
        </section>}
        <div className="mh-section-heading">
          <h2 id={`${id}-topics`}>{sectionTitle}</h2>
          <p>{sectionDescription}</p>
        </div>
        <section className="mh-topic-grid" aria-labelledby={`${id}-topics`}>
          {topics.map(topic => (
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
      </div>
    </main>
  );
}
