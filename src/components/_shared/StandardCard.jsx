import FadeInImage from './FadeInImage';
import './StandardCard.css';

export function StandardCard({
  title, subtitle, iconSrc, onClick, isLocked = false, onMouseEnter,
  className = '', ariaLabel, badge, badgeClassName = '', trailing,
}) {
  return (
    <button
      type="button"
      className={['standard-card', className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      disabled={isLocked}
    >
      <span className="standard-card__icon" aria-hidden="true">
        <FadeInImage src={iconSrc} alt="" />
      </span>
      <span className="standard-card__copy">
        {badge != null && badge !== false && (
          <span className={['standard-card__badge', badgeClassName].filter(Boolean).join(' ')}>{badge}</span>
        )}
        <span className="standard-card__title">{title}</span>
        <span className="standard-card__subtitle">{subtitle}</span>
      </span>
      {trailing && <span className="standard-card__trailing" aria-hidden="true">{trailing}</span>}
    </button>
  );
}

export default StandardCard;
