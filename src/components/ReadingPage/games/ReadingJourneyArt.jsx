import React, { useId } from 'react';

const ATLAS = `${import.meta.env.BASE_URL}images/reading/journey-clay-atlas.png`;
// Independent SVG viewports keep the atlas's artwork separate from live UI.
const BOUNDS = {
  book: '15 30 340 290', sprout: '355 50 250 250', star: '650 60 260 255',
  medal: '970 45 245 275', diamond: '30 350 280 245', trophy: '335 335 280 285',
  abc: '640 345 300 265', lock: '975 345 240 270', puzzle: '25 650 290 245',
  blocks: '360 640 245 265', cards: '630 650 300 265', kvk: '945 695 295 165',
  missing: '20 975 300 175', shirt: '340 935 270 250', sentence: '620 975 320 165',
  story: '940 925 300 270',
};

export default function ReadingJourneyArt({ name, className = '' }) {
  const clipId = useId();
  const [x, y, width, height] = BOUNDS[name].split(' ');
  return <svg className={`rg-journey-art ${className}`} viewBox={BOUNDS[name]} aria-hidden="true" focusable="false">
    <defs><clipPath id={clipId}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>
    <image href={ATLAS} width="1254" height="1254" clipPath={`url(#${clipId})`} />
  </svg>;
}
