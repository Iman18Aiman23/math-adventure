// Digit stroke-path data (0–9) for finger-tracing, mirroring letterPaths.js.
// Coordinates live in a logical 100x100 space. Each digit is a sequence of
// segments (lines 'L' or cubic Béziers 'C'); the canvas engine pre-samples the
// stroke. Stroke order/direction follows standard handwriting (see the
// "I Can Write Numbers" worksheet): start point = first point of the first
// segment, arrows = sampling direction.

const SAMPLES_PER_UNIT_LENGTH = 0.6;
const CUBIC_STEPS = 64;

const sampleLine = (a, b) => {
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const n = Math.max(2, Math.ceil(len * SAMPLES_PER_UNIT_LENGTH));
  const out = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    out[i] = { x: a.x + dx * t, y: a.y + dy * t };
  }
  return out;
};

const sampleCubic = (p0, p1, p2, p3) => {
  const out = new Array(CUBIC_STEPS + 1);
  for (let i = 0; i <= CUBIC_STEPS; i++) {
    const t = i / CUBIC_STEPS;
    const mt = 1 - t;
    out[i] = {
      x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
      y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
    };
  }
  return out;
};

const sampleLetter = (segments) => {
  let pts = [];
  for (const seg of segments) {
    let segPts;
    if (seg.type === 'L') segPts = sampleLine(seg.points[0], seg.points[1]);
    else if (seg.type === 'C') segPts = sampleCubic(...seg.points);
    else continue;
    if (pts.length > 0) segPts.shift();
    pts = pts.concat(segPts);
  }
  const flat = new Float32Array(pts.length * 2);
  for (let i = 0; i < pts.length; i++) {
    flat[i * 2] = pts[i].x;
    flat[i * 2 + 1] = pts[i].y;
  }
  return { samples: flat, count: pts.length };
};

const compile = (raw) => {
  const segments = raw.segments;
  return {
    char: raw.char,
    start: segments[0].points[0],
    end: segments[segments.length - 1].points.at(-1),
    segments,
    ...sampleLetter(segments),
  };
};

const RAW = {
  // 0 — tall oval, start top-centre, counter-clockwise (left → bottom → right → top)
  '0': {
    char: '0',
    segments: [
      { type: 'C', points: [{ x: 50, y: 15 }, { x: 30, y: 15 }, { x: 20, y: 33 }, { x: 20, y: 50 }] },
      { type: 'C', points: [{ x: 20, y: 50 }, { x: 20, y: 67 }, { x: 30, y: 85 }, { x: 50, y: 85 }] },
      { type: 'C', points: [{ x: 50, y: 85 }, { x: 70, y: 85 }, { x: 80, y: 67 }, { x: 80, y: 50 }] },
      { type: 'C', points: [{ x: 80, y: 50 }, { x: 80, y: 33 }, { x: 70, y: 15 }, { x: 50, y: 15 }] },
    ],
  },
  // 1 — single straight stem, top → bottom
  '1': {
    char: '1',
    segments: [
      { type: 'L', points: [{ x: 50, y: 15 }, { x: 50, y: 85 }] },
    ],
  },
  // 2 — top arc (clockwise) → curved sweep down-left → straight base
  '2': {
    char: '2',
    segments: [
      { type: 'C', points: [{ x: 26, y: 32 }, { x: 28, y: 14 }, { x: 72, y: 14 }, { x: 72, y: 38 }] },
      { type: 'C', points: [{ x: 72, y: 38 }, { x: 72, y: 54 }, { x: 46, y: 64 }, { x: 26, y: 80 }] },
      { type: 'L', points: [{ x: 26, y: 80 }, { x: 76, y: 80 }] },
    ],
  },
  // 3 — small top bump + larger round bottom bump (a near-circle), pinch middle
  '3': {
    char: '3',
    segments: [
      { type: 'C', points: [{ x: 33, y: 27 }, { x: 36, y: 14 }, { x: 57, y: 13 }, { x: 67, y: 25 }] },
      { type: 'C', points: [{ x: 67, y: 25 }, { x: 76, y: 34 }, { x: 72, y: 46 }, { x: 49, y: 49 }] },
      { type: 'C', points: [{ x: 49, y: 49 }, { x: 62, y: 49 }, { x: 71, y: 57 }, { x: 71, y: 68 }] },
      { type: 'C', points: [{ x: 71, y: 68 }, { x: 71, y: 80 }, { x: 60, y: 87 }, { x: 48, y: 87 }] },
      { type: 'C', points: [{ x: 48, y: 87 }, { x: 40, y: 87 }, { x: 35, y: 82 }, { x: 33, y: 73 }] },
    ],
  },
  // 4 — diagonal + crossbar (one stroke), then the right vertical (second stroke)
  '4': {
    char: '4',
    segments: [
      { type: 'L', points: [{ x: 54, y: 16 }, { x: 20, y: 62 }] },
      { type: 'L', points: [{ x: 20, y: 62 }, { x: 78, y: 62 }] },
      { type: 'L', points: [{ x: 62, y: 16 }, { x: 62, y: 86 }] },
    ],
  },
  // 5 — top hat (R→L) → down the back → big round bowl
  '5': {
    char: '5',
    segments: [
      { type: 'L', points: [{ x: 66, y: 16 }, { x: 32, y: 16 }] },
      { type: 'L', points: [{ x: 32, y: 16 }, { x: 32, y: 52 }] },
      { type: 'C', points: [{ x: 32, y: 52 }, { x: 56, y: 47 }, { x: 76, y: 57 }, { x: 76, y: 71 }] },
      { type: 'C', points: [{ x: 76, y: 71 }, { x: 76, y: 85 }, { x: 52, y: 88 }, { x: 34, y: 79 }] },
    ],
  },
  // 6 — descending curve from top-right, then a clean bottom "o" loop
  '6': {
    char: '6',
    segments: [
      { type: 'C', points: [{ x: 55,y: 18 }, { x: 40, y: 16 }, { x: 22, y: 42 }, { x: 28, y: 65 }] },
      { type: 'C', points: [{ x: 28, y: 65 }, { x: 28, y: 74.94 }, { x: 36.06, y: 83 }, { x: 46, y: 83 }] },
      { type: 'C', points: [{ x: 46, y: 83 }, { x: 55.94, y: 83 }, { x: 64, y: 74.94 }, { x: 64, y: 65 }] },
      { type: 'C', points: [{ x: 64, y: 65 }, { x: 64, y: 55.06 }, { x: 55.94, y: 47 }, { x: 46, y: 47 }] },
      { type: 'C', points: [{ x: 46, y: 47 }, { x: 36.06, y: 47 }, { x: 28, y: 55.06 }, { x: 28, y: 65 }] },
    ],
  },
  // 7 — top bar then diagonal down-left
  '7': {
    char: '7',
    segments: [
      { type: 'L', points: [{ x: 26, y: 18 }, { x: 74, y: 18 }] },
      { type: 'L', points: [{ x: 74, y: 18 }, { x: 40, y: 85 }] },
    ],
  },
  // 8 — true figure-eight built from two round "o" lobes (top + bottom circles)
  '8': {
    char: '8',
    segments: [
      { type: 'C', points: [{ x: 50, y: 16 }, { x: 40.61, y: 16 }, { x: 33, y: 23.61 }, { x: 33, y: 33 }] },
      { type: 'C', points: [{ x: 33, y: 33 }, { x: 33, y: 42.39 }, { x: 40.61, y: 50 }, { x: 50, y: 50 }] },
      { type: 'C', points: [{ x: 50, y: 50 }, { x: 59.39, y: 50 }, { x: 67, y: 57.61 }, { x: 67, y: 67 }] },
      { type: 'C', points: [{ x: 67, y: 67 }, { x: 67, y: 76.39 }, { x: 59.39, y: 84 }, { x: 50, y: 84 }] },
      { type: 'C', points: [{ x: 50, y: 84 }, { x: 40.61, y: 84 }, { x: 33, y: 76.39 }, { x: 33, y: 67 }] },
      { type: 'C', points: [{ x: 33, y: 67 }, { x: 33, y: 57.61 }, { x: 40.61, y: 50 }, { x: 50, y: 50 }] },
      { type: 'C', points: [{ x: 50, y: 50 }, { x: 59.39, y: 50 }, { x: 67, y: 42.39 }, { x: 67, y: 33 }] },
      { type: 'C', points: [{ x: 67, y: 33 }, { x: 67, y: 23.61 }, { x: 59.39, y: 16 }, { x: 50, y: 16 }] },
    ],
  },
  // 9 — small "o" circle (top) + straight "l" tail down the right
  '9': {
    char: '9',
    segments: [
      { type: 'C', points: [{ x: 43, y: 16 }, { x: 33.06, y: 16 }, { x: 25, y: 24.06 }, { x: 25, y: 34 }] },
      { type: 'C', points: [{ x: 25, y: 34 }, { x: 25, y: 43.94 }, { x: 33.06, y: 52 }, { x: 43, y: 52 }] },
      { type: 'C', points: [{ x: 43, y: 52 }, { x: 52.94, y: 52 }, { x: 61, y: 43.94 }, { x: 61, y: 34 }] },
      { type: 'C', points: [{ x: 61, y: 34 }, { x: 61, y: 24.06 }, { x: 52.94, y: 16 }, { x: 43, y: 16 }] },
      { type: 'L', points: [{ x: 61, y: 14}, { x: 61, y: 85 }] },
    ],
  },
};

export const DIGIT_PATHS = Object.keys(RAW).sort().map(k => compile(RAW[k]));

export const VIEW_BOX = 100;
