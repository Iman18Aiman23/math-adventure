import React from 'react';
import { ArrowLeft, Calculator, CircleCheck, CircleX, Diamond, Heart, Star, Trophy } from 'lucide-react';
import AppHeader from '../AppHeader';

export function MathGameShell({ className, styles, children }) {
  return (
    <div className={className}>
      {styles && <style>{styles}</style>}
      {children}
    </div>
  );
}

export function MathGameHeader({
  variant = 'reference',
  classPrefix = 'ops',
  onBack,
  gameState,
  language,
  title = 'Matematik',
  subtitle,
  icon,
  hearts,
  gems,
  stars,
  onRewardsClick,
}) {
  if (variant === 'app') {
    return (
      <AppHeader
        onBack={onBack}
        gameState={gameState}
        language={language}
        hearts={hearts}
        gems={gems}
        stars={stars}
        icon={icon}
        title={title}
        subtitle={subtitle}
      />
    );
  }

  const rewardsLabel = language === 'bm' ? 'Ganjaran' : 'Rewards';

  return (
    <header className={`${classPrefix}-ref-header`}>
      <div className={`${classPrefix}-ref-header-left`}>
        <button
          type="button"
          className={`${classPrefix}-ref-back`}
          onClick={onBack}
          aria-label={language === 'bm' ? 'Kembali' : 'Back'}
        >
          <ArrowLeft size={28} strokeWidth={3} aria-hidden="true" />
        </button>

        <div className={`${classPrefix}-ref-subject-icon`} aria-hidden="true">
          <Calculator size={30} strokeWidth={2.7} />
        </div>

        <div className={`${classPrefix}-ref-title-block`}>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className={`${classPrefix}-ref-rewards`} aria-label={rewardsLabel}>
        <button type="button" className={`${classPrefix}-ref-reward-pill`} onClick={onRewardsClick} title={language === 'bm' ? 'Bintang' : 'Stars'}>
          <Star className={`${classPrefix}-ref-reward-icon is-star`} size={28} fill="currentColor" strokeWidth={2.2} aria-hidden="true" />
          <span>{stars}</span>
        </button>
        <button type="button" className={`${classPrefix}-ref-reward-pill`} onClick={onRewardsClick} title={language === 'bm' ? 'Nyawa' : 'Hearts'}>
          <Heart className={`${classPrefix}-ref-reward-icon is-heart`} size={28} fill="currentColor" strokeWidth={2.2} aria-hidden="true" />
          <span>{hearts}</span>
        </button>
        <button type="button" className={`${classPrefix}-ref-reward-pill`} onClick={onRewardsClick} title={language === 'bm' ? 'Permata' : 'Gems'}>
          <Diamond className={`${classPrefix}-ref-reward-icon is-gem`} size={28} fill="currentColor" strokeWidth={2.2} aria-hidden="true" />
          <span>{gems}</span>
        </button>
      </div>
    </header>
  );
}

export function MathGameBody({ className = 'ops-game-board', children }) {
  return <main className={className}>{children}</main>;
}

export function MathGameFooter({
  language,
  correctCount,
  wrongCount,
  progress,
  milestone = 10,
  className = '',
}) {
  const bm = language === 'bm';

  return (
    <>
      <style>{`
        .mgf-footer {
          width: min(100%, 1100px);
          max-width: 1100px;
          min-width: 0;
          flex: 0 0 auto;
          margin: 0 auto max(8px, env(safe-area-inset-bottom));
          padding: clamp(10px, 1.4dvh, 16px) clamp(12px, 3vw, 22px);
          border: 1px solid #DDEBE5;
          border-radius: clamp(20px, 4vw, 30px);
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 3px 12px rgba(31, 78, 60, 0.06);
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: flex-start;
          gap: clamp(6px, 1dvh, 10px);
          box-sizing: border-box;
        }
        .mgf-answer-row {
          width: 100%;
          min-height: 32px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: clamp(6px, 1.5vw, 12px);
          white-space: nowrap;
          min-width: 0;
          flex-wrap: nowrap;
        }
        .mgf-title {
          color: #102D53;
          font-weight: 900;
          font-size: clamp(12px, 2.5vw, 17px);
          flex: 0 0 auto;
        }
        .mgf-stats {
          display: inline-flex;
          align-items: center;
          gap: clamp(6px, 1.5vw, 12px);
          min-width: 0;
          flex-wrap: nowrap;
        }
        .mgf-stat {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: clamp(4px, 1vw, 8px);
          min-width: 0;
          font-size: clamp(12px, 2.5vw, 17px);
          font-weight: 900;
          line-height: 1;
          padding: clamp(3px, 0.7vw, 6px) clamp(6px, 1.3vw, 10px);
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.25);
          background: rgba(255, 255, 255, 0.8);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
        }
        .mgf-stat.is-correct { color: #159653; }
        .mgf-stat.is-wrong { color: #E93E46; }
        .mgf-icon {
          width: clamp(20px, 4.8vw, 30px);
          height: clamp(20px, 4.8vw, 30px);
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #FFFFFF;
          flex: 0 0 auto;
          box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.35), 0 3px 8px rgba(15, 23, 42, 0.12);
        }
        .mgf-icon svg {
          width: 58%;
          height: 58%;
          display: block;
        }
        .mgf-icon.is-correct { background: #27B668; }
        .mgf-icon.is-wrong { background: #FF4D55; }
        .mgf-muted {
          color: #64748B;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          line-height: 1;
        }
        .mgf-divider {
          width: 1px;
          height: 26px;
          background: #CBD5D1;
          flex: 0 0 auto;
        }
        .mgf-progress-row {
          width: 100%;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: clamp(10px, 2vw, 16px);
        }
        .mgf-trophy {
          width: clamp(40px, 9vw, 58px);
          height: clamp(40px, 9vw, 58px);
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #9A6A00;
          background: linear-gradient(180deg, #FFD84D, #FFB515);
          box-shadow: 0 2px 6px rgba(180, 120, 0, 0.12);
        }
        .mgf-track {
          width: 100%;
          height: clamp(12px, 2dvh, 18px);
          border-radius: 999px;
          background: #E5EBE8;
          overflow: hidden;
        }
        .mgf-fill {
          height: 100%;
          border-radius: inherit;
          background: #FFB800;
          transition: width 300ms ease;
        }
        .mgf-count {
          color: #102D53;
          font-size: clamp(16px, 3vw, 22px);
          font-weight: 900;
          min-width: 42px;
          text-align: right;
          white-space: nowrap;
        }
        @media (max-width: 430px) {
          .mgf-footer {
            width: calc(100% - 20px);
            padding: 9px 10px;
          }
          .mgf-answer-row {
            gap: 6px;
            justify-content: flex-start;
          }
          .mgf-stats {
            gap: 6px;
          }
          .mgf-stat {
            padding: 4px 7px;
          }
          .mgf-muted {
            font-size: 0.72em;
            letter-spacing: 0.02em;
          }
        }
      `}</style>
      <div className={`mgf-footer ${className}`.trim()}>
        <div className="mgf-answer-row">
          <span className="mgf-title">{bm ? 'Jawapan :' : 'Answer :'}</span>
          <span className="mgf-stats">
          <span className="mgf-stat is-correct">
            <span className="mgf-icon is-correct">
              <CircleCheck size={22} strokeWidth={3.2} aria-hidden="true" />
            </span>
            <span>{correctCount}</span>
            <span className="mgf-muted">{bm ? 'Betul' : 'Correct'}</span>
          </span>
          <span className="mgf-divider" aria-hidden="true" />
          <span className="mgf-stat is-wrong">
            <span className="mgf-icon is-wrong">
              <CircleX size={22} strokeWidth={3.2} aria-hidden="true" />
            </span>
            <span>{wrongCount}</span>
            <span className="mgf-muted">{bm ? 'Salah' : 'Wrong'}</span>
          </span>
        </span>
      </div>

      <div className="mgf-progress-row">
        <span className="mgf-trophy">
          <Trophy size={30} fill="currentColor" strokeWidth={2.4} aria-hidden="true" />
        </span>
        <div className="mgf-track">
          <div className="mgf-fill" style={{ width: `${(progress / milestone) * 100}%` }} />
        </div>
        <span className="mgf-count">
          {progress}/{milestone}
        </span>
      </div>
      </div>
    </>
  );
}
