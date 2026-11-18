import React from 'react';
import { playHoverSound } from '../../utils/soundManager';
import './AZPickerGrid.css';

const PREMIUM_HUES = [
  { color: '#3B82F6', tint: '#EFF6FF', deep: '#1D4ED8', ink: '#2563EB' },
  { color: '#22C55E', tint: '#F0FDF4', deep: '#15803D', ink: '#16A34A' },
  { color: '#F43F5E', tint: '#FFF1F2', deep: '#BE123C', ink: '#E11D48' },
  { color: '#F97316', tint: '#FFF7ED', deep: '#C2410C', ink: '#EA580C' },
  { color: '#84CC16', tint: '#F7FEE7', deep: '#4D7C0F', ink: '#65A30D' },
];

const LETTER_PALETTES = Object.fromEntries(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, i) => [letter, PREMIUM_HUES[i % PREMIUM_HUES.length]])
);

export default function AZPickerGrid({
  letters,
  onSelectLetter,
  getCardCount,
  language = 'en',
  variant = 'master',
  direction = 'ltr',
  renderLetter,
  renderCaption,
  mirrorLetterStyle = false,
  letterCardSuffix = '',
}) {
  const isJawi = variant === 'jawi';
  const isMalay = language === 'bm';

  return (
    <div className={`az-picker-grid az-picker-grid--${variant}`} dir={direction}>
      {letters.map((letter, index) => {
        const letterPalette = LETTER_PALETTES[letter.toUpperCase()];
        const displayedLetter = letter.toUpperCase();
        const displayedCompanion = 'AEIOU'.includes(displayedLetter)
          ? displayedLetter.toLowerCase()
          : 'a';
        const colors = !isJawi && letterPalette
          ? letterPalette
          : PREMIUM_HUES[index % PREMIUM_HUES.length];
        const cardCount = isJawi ? null : (getCardCount?.(letter) ?? 0);
        const style = {
          '--tile-surface': colors.tint,
          '--kc': colors.color,
          '--kc-ink': colors.ink,
          '--kt': colors.tint,
          '--kc-border': colors.color,
          '--kc-under': colors.deep,
          '--tile-border': colors.color,
          '--tile-border-hover': colors.color,
          '--tile-ink': colors.ink,
          '--az-delay': `${0.04 + index * 0.02}s`,
          animationDelay: `${0.04 + index * 0.025}s`,
        };

        return (
          <button
            key={letter}
            type="button"
            className={`az-picker-tile az-picker-tile--${variant}${mirrorLetterStyle ? ' az-letter-tile az-letter-tile--kv-mirror' : ''}`}
            onMouseEnter={mirrorLetterStyle ? playHoverSound : undefined}
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
              mirrorLetterStyle ? (
                <div className="az-picker-letter-slot--kv-mirror">
                  <span className="az-tile-letter">
                    {displayedLetter}<small>{displayedCompanion}{letterCardSuffix}</small>
                  </span>
                </div>
              ) : (
                <>
                  <span className="az-picker-letter az-picker-letter--master">
                    {letter}<small>{letter.toLowerCase()}</small>
                  </span>
                  <span className="az-picker-caption az-picker-caption--master">
                    {cardCount} {isMalay ? 'kad' : cardCount === 1 ? 'card' : 'cards'}
                  </span>
                </>
              )
            )}
          </button>
        );
      })}
    </div>
  );
}
