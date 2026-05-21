import React from 'react';
import AgeGroupPage from './AgeGroupPage';

// Rainbow colors for pillars (consistent across all age groups)
const RAINBOW_PILLAR_COLORS = {
  reading: { main: '#FF4757', light: '#FFB3B3', dark: '#FF3838', shadow: '#D63031' },
  speaking: { main: '#FFA502', light: '#FFD699', dark: '#FF8C00', shadow: '#E67E22' },
  jawi: { main: '#FFD60A', light: '#FFE66D', dark: '#FFC300', shadow: '#F39C12' },
  math: { main: '#00BCD4', light: '#4DD0E1', dark: '#0097A7', shadow: '#00838F' },
};

const THEME_CONFIG = {
  'age-4-5': {
    primary: '#FF4757',
    dark: '#FF3838',
    light: '#FFE5E5',
    pillar: RAINBOW_PILLAR_COLORS,
  },
  'age-5-6': {
    primary: '#FFA502',
    dark: '#FF8C00',
    light: '#FFE4CC',
    pillar: RAINBOW_PILLAR_COLORS,
  },
  'age-6-7': {
    primary: '#FFD60A',
    dark: '#FFC300',
    light: '#FFF8E5',
    pillar: RAINBOW_PILLAR_COLORS,
  },
  'age-7-8': {
    primary: '#00BCD4',
    dark: '#0097A7',
    light: '#B2EBF2',
    pillar: RAINBOW_PILLAR_COLORS,
  },
  'age-8-9': {
    primary: '#7C4DFF',
    dark: '#512DA8',
    light: '#EDE7F6',
    pillar: RAINBOW_PILLAR_COLORS,
  },
};

export default function AgeGroupHome({ ageGroupId, onBack, onPlayGame, language = 'bm', applyTheme = true }) {
  const theme = THEME_CONFIG[ageGroupId];

  const themeStyles = applyTheme && theme ? `
    :root {
      --theme-primary: ${theme.primary};
      --theme-dark: ${theme.dark};
      --theme-light: ${theme.light};
      --pillar-reading-main: ${theme.pillar.reading.main};
      --pillar-reading-light: ${theme.pillar.reading.light};
      --pillar-reading-dark: ${theme.pillar.reading.dark};
      --pillar-reading-shadow: ${theme.pillar.reading.shadow};
      --pillar-speaking-main: ${theme.pillar.speaking.main};
      --pillar-speaking-light: ${theme.pillar.speaking.light};
      --pillar-speaking-dark: ${theme.pillar.speaking.dark};
      --pillar-speaking-shadow: ${theme.pillar.speaking.shadow};
      --pillar-jawi-main: ${theme.pillar.jawi.main};
      --pillar-jawi-light: ${theme.pillar.jawi.light};
      --pillar-jawi-dark: ${theme.pillar.jawi.dark};
      --pillar-jawi-shadow: ${theme.pillar.jawi.shadow};
      --pillar-math-main: ${theme.pillar.math.main};
      --pillar-math-light: ${theme.pillar.math.light};
      --pillar-math-dark: ${theme.pillar.math.dark};
      --pillar-math-shadow: ${theme.pillar.math.shadow};
    }
  ` : '';

  return (
    <>
      {themeStyles && <style>{themeStyles}</style>}
      <AgeGroupPage
        ageGroupId={ageGroupId}
        onBack={onBack}
        onPlayGame={onPlayGame}
        language={language}
        theme={theme}
      />
    </>
  );
}
