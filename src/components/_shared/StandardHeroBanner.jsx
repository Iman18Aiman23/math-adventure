import { useId } from 'react';
import './StandardHeroBanner.css';

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

export default function StandardHeroBanner({
  titlePrefix,
  titleHighlight,
  subtitle,
  ctaText,
  ctaLink,
  ctaOnClick,
  mascotSrc,
  headingLevel = 'h1',
  className = '',
}) {
  const headingId = useId();
  const Heading = HEADING_TAGS.has(headingLevel) ? headingLevel : 'h1';

  return (
    <section className={`standard-hero-banner ${className}`.trim()} aria-labelledby={headingId}>
      <div className="standard-hero-banner__copy">
        <Heading className="standard-hero-banner__title" id={headingId}>
          {titlePrefix && <span className="standard-hero-banner__prefix">{titlePrefix}</span>}
          {titleHighlight && <span className="standard-hero-banner__highlight">{titleHighlight}</span>}
        </Heading>
        {subtitle && <p className="standard-hero-banner__subtitle">{subtitle}</p>}
        {ctaText && (ctaOnClick || ctaLink) && (
          <div className="standard-hero-banner__action">
            {ctaOnClick ? (
              <button type="button" className="standard-hero-banner__cta" onClick={ctaOnClick}>
                {ctaText}
              </button>
            ) : (
              <a className="standard-hero-banner__cta" href={ctaLink}>
                {ctaText}
              </a>
            )}
          </div>
        )}
      </div>
      {mascotSrc && (
        <div className="standard-hero-banner__mascot" aria-hidden="true">
          <img src={mascotSrc} alt="" />
        </div>
      )}
    </section>
  );
}
