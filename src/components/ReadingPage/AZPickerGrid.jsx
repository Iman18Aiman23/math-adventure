import React from 'react';
import './AZPickerGrid.css';

const MASTER_PALETTE = [
  { color: '#EF4444', tint: '#FEF2F2' },
  { color: '#F59E0B', tint: '#FFFBEB' },
  { color: '#10B981', tint: '#ECFDF5' },
  { color: '#3B82F6', tint: '#EFF6FF' },
  { color: '#8B5CF6', tint: '#F5F3FF' },
  { color: '#EC4899', tint: '#FDF2F8' },
  { color: '#14B8A6', tint: '#F0FDFA' },
];

const JAWI_PALETTE = [
  { base: '#FF9600', light: '#FFD9A0', deep: '#8F5300' },
  { base: '#1CB0F6', light: '#A0E4FF', deep: '#0B6EA0' },
  { base: '#58CC02', light: '#B4F576', deep: '#2E7001' },
  { base: '#CE82FF', light: '#ECD0FF', deep: '#7A3FA0' },
  { base: '#FF4B4B', light: '#FFB0B0', deep: '#A01010' },
  { base: '#00C2A8', light: '#A0F0E8', deep: '#007A6A' },
];

export default function AZPickerGrid({
  letters,
  onSelectLetter,
  getCardCount,
  language = 'en',
  variant = 'master',
  direction = 'ltr',
  renderLetter,
  renderCaption,
}) {
  const isJawi = variant === 'jawi';
  const palette = isJawi ? JAWI_PALETTE : MASTER_PALETTE;
  const isMalay = language === 'bm';

  return (
    <div className={`az-picker-grid az-picker-grid--${variant}`} dir={direction}>
      {letters.map((letter, index) => {
        const colors = palette[index % palette.length];
        const cardCount = isJawi ? null : (getCardCount?.(letter) ?? 0);
        const style = isJawi
          ? {
              '--tile-base': colors.base,
              '--tile-light': colors.light,
              '--tile-deep': colors.deep,
              animationDelay: `${0.04 + index * 0.025}s`,
            }
          : {
              '--kc': colors.color,
              '--kt': colors.tint,
              '--kc-border': `${colors.color}33`,
              '--kc-under': `${colors.color}2e`,
              animationDelay: `${0.04 + index * 0.025}s`,
            };

        return (
          <button
            key={letter}
            type="button"
            className={`az-picker-tile az-picker-tile--${variant}`}
            onClick={() => onSelectLetter(letter)}
            style={style}
          >
            {isJawi ? (
              <>
                <span className="az-picker-letter az-picker-letter--jawi">
                  {renderLetter?.(letter) ?? letter}
                </span>
                <span className="az-picker-caption az-picker-caption--jawi" dir="ltr">
                  {renderCaption?.(letter) ?? `${letter} \u00b7 ${letter.toLowerCase()}`}
                </span>
              </>
            ) : (
              <>
                <span className="az-picker-letter az-picker-letter--master">
                  {letter}<small>{letter.toLowerCase()}</small>
                </span>
                <span className="az-picker-caption az-picker-caption--master">
                  {cardCount} {isMalay ? 'kad' : cardCount === 1 ? 'card' : 'cards'}
                </span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
