import { useId } from 'react';

// Unmodified supplied artwork. SVG viewports show each illustration without
// baking the reference screenshot's text, buttons or navigation into the UI.
const REFERENCE_ART = import.meta.env.BASE_URL + 'images/speaking/sebutan-reference.png';
const BOUNDS = {
  robot: [540, 108, 444, 372],
  bm_kv: [67, 580, 207, 128],
  bm_kvk: [67, 748, 212, 123],
  en_long_vowels: [67, 911, 212, 132],
  numbers: [67, 1082, 212, 130],
  common_objects: [67, 1252, 212, 128],
};

export default function BMMenuArtwork({ topic }) {
  const clipId = useId();
  const [x, y, width, height] = BOUNDS[topic];
  return (
    <svg viewBox={`${x} ${y} ${width} ${height}`} aria-hidden="true" focusable="false">
      <defs><clipPath id={clipId}><rect x={x} y={y} width={width} height={height} rx="22" /></clipPath></defs>
      <image href={REFERENCE_ART} width="1024" height="1536" clipPath={`url(#${clipId})`} />
    </svg>
  );
}
