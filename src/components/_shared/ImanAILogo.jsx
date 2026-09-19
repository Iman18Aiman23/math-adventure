import './ImanAILogo.css';

/** Horizontal robot identity adapted from the supplied brand reference. */
export default function ImanAILogo({ variant = 'color', language = 'en' }) {
  return (
    <span className={`imanai-logo imanai-logo--${variant}`}>
      <img
        className="imanai-logo-image"
        src={`${import.meta.env.BASE_URL}brand/imanai-horizontal.webp`}
        alt={language === 'bm' ? 'ImanAI — Belajar. Main. Membesar.' : 'ImanAI — Learn. Play. Grow.'}
        width="868"
        height="289"
        decoding="async"
      />
    </span>
  );
}
