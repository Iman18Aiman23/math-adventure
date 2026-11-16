import { useId } from 'react';
import FadeInImage from './FadeInImage';
import './StandardHeroBanner.css';

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

function HeroSparkle({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2.4c.72 4.72 2.76 6.76 7.48 7.48-4.72.72-6.76 2.76-7.48 7.48-.72-4.72-2.76-6.76-7.48-7.48 4.72-.72 6.76-2.76 7.48-7.48Z" />
    </svg>
  );
}

export default function StandardHeroBanner({
  titlePrefix,
  titleHighlight,
  titleTrailing,
  subtitle,
  meta,
  ctaText,
  ctaLink,
  ctaOnClick,
  ctaDisabled = false,
  mascotSrc,
  headingLevel = 'h1',
  className = '',
}) {
  const headingId = useId();
  const Heading = HEADING_TAGS.has(headingLevel) ? headingLevel : 'h1';

  return (
    <section className={`standard-hero-banner ${className}`.trim()} aria-labelledby={headingId}>
      <div className="standard-hero-banner__sky" aria-hidden="true">
        <span className="standard-hero-banner__halo" />
        <HeroSparkle className="standard-hero-banner__sparkle standard-hero-banner__sparkle--a" />
        <HeroSparkle className="standard-hero-banner__sparkle standard-hero-banner__sparkle--b" />
        <HeroSparkle className="standard-hero-banner__sparkle standard-hero-banner__sparkle--c" />
        <span className="standard-hero-banner__bead standard-hero-banner__bead--a" />
        <span className="standard-hero-banner__bead standard-hero-banner__bead--b" />
        <span className="standard-hero-banner__pill standard-hero-banner__pill--a" />
        <span className="standard-hero-banner__pill standard-hero-banner__pill--b" />
      </div>
      <div className="standard-hero-banner__copy">
        <Heading className="standard-hero-banner__title" id={headingId}>
          {titlePrefix && <span className="standard-hero-banner__prefix">{titlePrefix}</span>}
          {titleHighlight && <span className="standard-hero-banner__highlight">{titleHighlight}</span>}
          {titleTrailing && <span className="standard-hero-banner__trailing">{titleTrailing}</span>}
        </Heading>
        {subtitle && <p className="standard-hero-banner__subtitle">{subtitle}</p>}
        {meta && <div className="standard-hero-banner__meta">{meta}</div>}
        {ctaText && (ctaOnClick || ctaLink) && (
          <div className="standard-hero-banner__action">
            {ctaOnClick || ctaDisabled ? (
              <button type="button" className="standard-hero-banner__cta" onClick={ctaOnClick} disabled={ctaDisabled}>
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
          <FadeInImage src={mascotSrc} alt="" />
        </div>
      )}
    </section>
  );
}
