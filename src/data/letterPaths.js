// Letter path data + dense pre-sampling.
//
// Coordinates live in a logical 100x100 space; the canvas engine scales them
// to its rendered CSS size at draw time. Each letter is a sequence of segments
// (lines or cubic Béziers). We pre-sample the whole stroke into a flat
// Float32Array of [x0, y0, x1, y1, …] — denser sampling means finer-grained
// tolerance/progress checks, and a typed array avoids per-sample GC pressure
// during the draw loop (samples are read every pointer move, often >100/sec).
//
// To add lowercase: append entries to LETTERS_LOWER using the same shape
// (architecture and engine are already case-agnostic).

const SAMPLES_PER_UNIT_LENGTH = 0.6; // ~60 samples for a path of length 100
const CUBIC_STEPS = 64;              // Bézier subdivisions per curve segment

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
      x: mt*mt*mt*p0.x + 3*mt*mt*t*p1.x + 3*mt*t*t*p2.x + t*t*t*p3.x,
      y: mt*mt*mt*p0.y + 3*mt*mt*t*p1.y + 3*mt*t*t*p2.y + t*t*t*p3.y,
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
    if (pts.length > 0) segPts.shift(); // de-duplicate joint between segments
    pts = pts.concat(segPts);
  }
  // Pack into a flat Float32Array. Typed arrays are contiguous in memory and
  // accessed without object dereferencing per point → big win in the hot loop.
  const flat = new Float32Array(pts.length * 2);
  for (let i = 0; i < pts.length; i++) {
    flat[i * 2]     = pts[i].x;
    flat[i * 2 + 1] = pts[i].y;
  }
  return { samples: flat, count: pts.length };
};

// Raw definitions — segments in stroke order from start to end.
const RAW = {
  A: {
    char: 'A',
    segments: [
      { type: 'L', points: [{ x: 25, y: 82 }, { x: 50, y: 18 }] },
      { type: 'L', points: [{ x: 50, y: 18 }, { x: 75, y: 82 }] },
      { type: 'L', points: [{ x: 35, y: 50 }, { x: 65, y: 50 }] },
    ],
  },
  B: {
  char: 'B',
  segments: [
    // Main vertical spine
    {
      type: 'L',
      points: [
        { x: 30, y: 15 },
        { x: 30, y: 85 },
      ],
    },

    // Top horizontal lead
    {
      type: 'L',
      points: [
        { x: 30, y: 15 },
        { x: 62, y: 15 },
      ],
    },

    // Top bowl
    {
      type: 'C',
      points: [
        { x: 62, y: 15 }, // start
        { x: 82, y: 18 }, // control 1
        { x: 82, y: 42 }, // control 2
        { x: 30, y: 45 }, // end
      ],
    },

    // Middle connector
    {
      type: 'L',
      points: [
        { x: 30, y: 45 },
        { x: 64, y: 45 },
      ],
    },

    // Bottom bowl
    {
      type: 'C',
      points: [
        { x: 64, y: 45 }, // start
        { x: 86, y: 50 }, // control 1
        { x: 86, y: 82 }, // control 2
        { x: 30, y: 85 }, // end
      ],
    },
  ],
},
  C: {
    char: 'C',
    segments: [
      { type: 'C', points: [
        { x: 80, y: 30 },
        { x: 30, y: 5 },
        { x: 30, y: 95 },
        { x: 80, y: 70 },
      ]},
    ],
  },
  D: {
    char: 'D',
    segments: [
      { type: 'L', points: [{ x: 32, y: 18 }, { x: 32, y: 82 }] },
      { type: 'L', points: [{ x: 32, y: 18 }, { x: 65, y: 18 }] },
      { type: 'C', points: [
        { x: 65, y: 18 },
        { x: 78, y: 18 },
        { x: 78, y: 82 },
        { x: 65, y: 82 },
      ]},
      { type: 'L', points: [{ x: 65, y: 82 }, { x: 32, y: 82 }] },
    ],
  },
  E: {
    char: 'E',
    segments: [
      { type: 'L', points: [{ x: 75, y: 18 }, { x: 32, y: 18 }] },
      { type: 'L', points: [{ x: 32, y: 18 }, { x: 32, y: 82 }] },
      { type: 'L', points: [{ x: 32, y: 82 }, { x: 75, y: 82 }] },
      { type: 'L', points: [{ x: 32, y: 50 }, { x: 68, y: 50 }] },
    ],
  },
  F: {
    char: 'F',
    segments: [
      { type: 'L', points: [{ x: 32, y: 18 }, { x: 32, y: 82 }] },
      { type: 'L', points: [{ x: 32, y: 18 }, { x: 72, y: 18 }] },
      { type: 'L', points: [{ x: 32, y: 50 }, { x: 65, y: 50 }] },
    ],
  },
 G: {
  char: 'G',
  segments: [
    // Main outer curve
    {
      type: 'C',
      points: [
        { x: 78, y: 25 }, // start top-right
        { x: 18, y: 5 },  // control 1
        { x: 18, y: 95 }, // control 2
        { x: 78, y: 75 }, // end bottom-right
      ],
    },

    // Inner horizontal bar
    {
      type: 'L',
      points: [
        { x: 78, y: 75 },
        { x: 55, y: 75 },
      ],
    },

    // Vertical connector upward
    {
      type: 'L',
      points: [
        { x: 55, y: 75 },
        { x: 55, y: 52 },
      ],
    },

    // Inner middle stroke
    {
      type: 'L',
      points: [
        { x: 55, y: 52 },
        { x: 78, y: 52 },
      ],
    },
  ],
},
  H: {
    char: 'H',
    segments: [
      { type: 'L', points: [{ x: 32, y: 18 }, { x: 32, y: 82 }] },
      { type: 'L', points: [{ x: 32, y: 50 }, { x: 68, y: 50 }] },
      { type: 'L', points: [{ x: 68, y: 18 }, { x: 68, y: 82 }] },
    ],
  },
  I: {
    char: 'I',
    segments: [
      { type: 'L', points: [{ x: 50, y: 18 }, { x: 50, y: 82 }] },
    ],
  },
  J: {
    char: 'J',
    segments: [
      { type: 'L', points: [{ x: 65, y: 18 }, { x: 65, y: 65 }] },
      { type: 'C', points: [
        { x: 65, y: 65 },
        { x: 65, y: 82 },
        { x: 30, y: 82 },
        { x: 30, y: 75 },
      ]},
    ],
  },
  K: {
    char: 'K',
    segments: [
      { type: 'L', points: [{ x: 32, y: 18 }, { x: 32, y: 82 }] },
      { type: 'L', points: [{ x: 32, y: 50 }, { x: 75, y: 18 }] },
      { type: 'L', points: [{ x: 32, y: 50 }, { x: 75, y: 82 }] },
    ],
  },
  L: {
    char: 'L',
    segments: [
      { type: 'L', points: [{ x: 32, y: 18 }, { x: 32, y: 80 }] },
      { type: 'L', points: [{ x: 32, y: 80 }, { x: 76, y: 80 }] },
    ],
  },
  M: {
    char: 'M',
    segments: [
      { type: 'L', points: [{ x: 28, y: 82 }, { x: 28, y: 18 }] },
      { type: 'L', points: [{ x: 28, y: 18 }, { x: 50, y: 50 }] },
      { type: 'L', points: [{ x: 50, y: 50 }, { x: 72, y: 18 }] },
      { type: 'L', points: [{ x: 72, y: 18 }, { x: 72, y: 82 }] },
    ],
  },
  N: {
    char: 'N',
    segments: [
      { type: 'L', points: [{ x: 32, y: 82 }, { x: 32, y: 18 }] },
      { type: 'L', points: [{ x: 32, y: 18 }, { x: 70, y: 82 }] },
      { type: 'L', points: [{ x: 70, y: 82 }, { x: 70, y: 18 }] },
    ],
  },
  O: {
    char: 'O',
    segments: [
      { type: 'C', points: [
        { x: 50, y: 18 },
        { x: 14, y: 18 },
        { x: 14, y: 82 },
        { x: 50, y: 82 },
      ]},
      { type: 'C', points: [
        { x: 50, y: 82 },
        { x: 86, y: 82 },
        { x: 86, y: 18 },
        { x: 50, y: 18 },
      ]},
    ],
  },
  P: {
    char: 'P',
    segments: [
      { type: 'L', points: [{ x: 32, y: 82 }, { x: 32, y: 18 }] },
      { type: 'L', points: [{ x: 32, y: 18 }, { x: 68, y: 18 }] },
      { type: 'C', points: [
        { x: 68, y: 18 },
        { x: 78, y: 18 },
        { x: 78, y: 48 },
        { x: 32, y: 48 },
      ]},
    ],
  },
  Q: {
    char: 'Q',
    segments: [
      { type: 'C', points: [
        { x: 50, y: 18 },
        { x: 14, y: 18 },
        { x: 14, y: 78 },
        { x: 50, y: 78 },
      ]},
      { type: 'C', points: [
        { x: 50, y: 78 },
        { x: 86, y: 78 },
        { x: 86, y: 18 },
        { x: 50, y: 18 },
      ]},
      { type: 'L', points: [{ x: 60, y: 70 }, { x: 80, y: 88 }] },
    ],
  },
  R: {
    char: 'R',
    segments: [
      { type: 'L', points: [{ x: 32, y: 82 }, { x: 32, y: 18 }] },
      { type: 'L', points: [{ x: 32, y: 18 }, { x: 68, y: 18 }] },
      { type: 'C', points: [
        { x: 68, y: 18 },
        { x: 78, y: 18 },
        { x: 78, y: 48 },
        { x: 32, y: 48 },
      ]},
      { type: 'L', points: [{ x: 32, y: 48 }, { x: 75, y: 82 }] },
    ],
  },
  S: {
    char: 'S',
    segments: [
      { type: 'C', points: [
        { x: 72, y: 25 },
        { x: 28, y: 25 },
        { x: 28, y: 35 },
        { x: 72, y: 45 },
      ]},
      { type: 'C', points: [
        { x: 72, y: 45 },
        { x: 28, y: 55 },
        { x: 28, y: 65 },
        { x: 72, y: 75 },
      ]},
    ],
  },
  T: {
    char: 'T',
    segments: [
      { type: 'L', points: [{ x: 28, y: 18 }, { x: 72, y: 18 }] },
      { type: 'L', points: [{ x: 50, y: 18 }, { x: 50, y: 82 }] },
    ],
  },
  U: {
    char: 'U',
    segments: [
      { type: 'L', points: [{ x: 28, y: 20 }, { x: 28, y: 58 }] },
      { type: 'C', points: [
        { x: 28, y: 58 },
        { x: 28, y: 88 },
        { x: 72, y: 88 },
        { x: 72, y: 58 },
      ]},
      { type: 'L', points: [{ x: 72, y: 58 }, { x: 72, y: 20 }] },
    ],
  },
  V: {
    char: 'V',
    segments: [
      { type: 'L', points: [{ x: 25, y: 18 }, { x: 50, y: 82 }] },
      { type: 'L', points: [{ x: 75, y: 18 }, { x: 50, y: 82 }] },
    ],
  },
  W: {
    char: 'W',
    segments: [
      { type: 'L', points: [{ x: 20, y: 18 }, { x: 32, y: 82 }] },
      { type: 'L', points: [{ x: 32, y: 82 }, { x: 50, y: 40 }] },
      { type: 'L', points: [{ x: 50, y: 40 }, { x: 68, y: 82 }] },
      { type: 'L', points: [{ x: 68, y: 82 }, { x: 80, y: 18 }] },
    ],
  },
  X: {
    char: 'X',
    segments: [
      { type: 'L', points: [{ x: 25, y: 18 }, { x: 75, y: 82 }] },
      { type: 'L', points: [{ x: 75, y: 18 }, { x: 25, y: 82 }] },
    ],
  },
  Y: {
    char: 'Y',
    segments: [
      { type: 'L', points: [{ x: 28, y: 18 }, { x: 50, y: 50 }] },
      { type: 'L', points: [{ x: 72, y: 18 }, { x: 50, y: 50 }] },
      { type: 'L', points: [{ x: 50, y: 50 }, { x: 50, y: 82 }] },
    ],
  },
  Z: {
    char: 'Z',
    segments: [
      { type: 'L', points: [{ x: 72, y: 18 }, { x: 28, y: 18 }] },
      { type: 'L', points: [{ x: 28, y: 18 }, { x: 72, y: 82 }] },
      { type: 'L', points: [{ x: 72, y: 82 }, { x: 28, y: 82 }] },
    ],
  },
};

// Lowercase letter shapes — designed with proper x-height (~y:42–82),
// ascenders for b/d/f/h/k/l/t (~y:18–82), and descenders for g/j/p/q/y (~down to y:95).
const RAW_LOWER = {
  a: {
    char: 'a',
    segments: [
      { type: 'C', points: [
        { x: 68, y: 50 }, { x: 30, y: 40 }, { x: 30, y: 82 }, { x: 68, y: 78 },
      ]},
      { type: 'L', points: [{ x: 68, y: 50 }, { x: 68, y: 82 }] },
    ],
  },
  b: {
    char: 'b',
    segments: [
      { type: 'L', points: [{ x: 30, y: 18 }, { x: 30, y: 82 }] },
      { type: 'C', points: [
        { x: 30, y: 55 }, { x: 70, y: 45 }, { x: 70, y: 85 }, { x: 30, y: 80 },
      ]},
    ],
  },
  c: {
    char: 'c',
    segments: [
      { type: 'C', points: [
        { x: 72, y: 52 }, { x: 28, y: 40 }, { x: 28, y: 85 }, { x: 72, y: 76 },
      ]},
    ],
  },
  d: {
    char: 'd',
    segments: [
      { type: 'L', points: [{ x: 70, y: 18 }, { x: 70, y: 82 }] },
      { type: 'C', points: [
        { x: 70, y: 55 }, { x: 30, y: 45 }, { x: 30, y: 85 }, { x: 70, y: 80 },
      ]},
    ],
  },
  e: {
    char: 'e',
    segments: [
      { type: 'L', points: [{ x: 30, y: 62 }, { x: 72, y: 62 }] },
      { type: 'C', points: [
        { x: 72, y: 62 }, { x: 70, y: 40 }, { x: 28, y: 48 }, { x: 30, y: 75 },
      ]},
      { type: 'C', points: [
        { x: 30, y: 75 }, { x: 40, y: 86 }, { x: 60, y: 85 }, { x: 72, y: 78 },
      ]},
    ],
  },
  f: {
    char: 'f',
    segments: [
      { type: 'C', points: [
        { x: 65, y: 20 }, { x: 50, y: 18 }, { x: 42, y: 28 }, { x: 42, y: 45 },
      ]},
      { type: 'L', points: [{ x: 42, y: 45 }, { x: 42, y: 82 }] },
      { type: 'L', points: [{ x: 28, y: 50 }, { x: 58, y: 50 }] },
    ],
  },
  g: {
    char: 'g',
    segments: [
      { type: 'C', points: [
        { x: 68, y: 52 }, { x: 30, y: 42 }, { x: 30, y: 80 }, { x: 68, y: 75 },
      ]},
      { type: 'L', points: [{ x: 68, y: 52 }, { x: 68, y: 88 }] },
      { type: 'C', points: [
        { x: 68, y: 88 }, { x: 64, y: 96 }, { x: 32, y: 96 }, { x: 28, y: 88 },
      ]},
    ],
  },
  h: {
    char: 'h',
    segments: [
      { type: 'L', points: [{ x: 30, y: 18 }, { x: 30, y: 82 }] },
      { type: 'C', points: [
        { x: 30, y: 60 }, { x: 50, y: 40 }, { x: 68, y: 55 }, { x: 68, y: 82 },
      ]},
    ],
  },
  i: {
    char: 'i',
    segments: [
      { type: 'L', points: [{ x: 50, y: 45 }, { x: 50, y: 82 }] },
    ],
  },
  j: {
    char: 'j',
    segments: [
      { type: 'L', points: [{ x: 58, y: 45 }, { x: 58, y: 82 }] },
      { type: 'C', points: [
        { x: 58, y: 82 }, { x: 58, y: 95 }, { x: 28, y: 95 }, { x: 25, y: 85 },
      ]},
    ],
  },
  k: {
    char: 'k',
    segments: [
      { type: 'L', points: [{ x: 30, y: 18 }, { x: 30, y: 82 }] },
      { type: 'L', points: [{ x: 30, y: 65 }, { x: 65, y: 45 }] },
      { type: 'L', points: [{ x: 30, y: 65 }, { x: 65, y: 82 }] },
    ],
  },
  l: {
    char: 'l',
    segments: [
      { type: 'L', points: [{ x: 50, y: 18 }, { x: 50, y: 82 }] },
    ],
  },
  m: {
    char: 'm',
    segments: [
      { type: 'L', points: [{ x: 18, y: 45 }, { x: 18, y: 82 }] },
      { type: 'C', points: [
        { x: 18, y: 55 }, { x: 32, y: 40 }, { x: 48, y: 55 }, { x: 48, y: 82 },
      ]},
      { type: 'C', points: [
        { x: 48, y: 55 }, { x: 62, y: 40 }, { x: 80, y: 55 }, { x: 80, y: 82 },
      ]},
    ],
  },
  n: {
    char: 'n',
    segments: [
      { type: 'L', points: [{ x: 28, y: 45 }, { x: 28, y: 82 }] },
      { type: 'C', points: [
        { x: 28, y: 55 }, { x: 50, y: 40 }, { x: 72, y: 55 }, { x: 72, y: 82 },
      ]},
    ],
  },
  o: {
    char: 'o',
    segments: [
      { type: 'C', points: [
        { x: 50, y: 42 }, { x: 22, y: 42 }, { x: 22, y: 82 }, { x: 50, y: 82 },
      ]},
      { type: 'C', points: [
        { x: 50, y: 82 }, { x: 78, y: 82 }, { x: 78, y: 42 }, { x: 50, y: 42 },
      ]},
    ],
  },
  p: {
    char: 'p',
    segments: [
      { type: 'L', points: [{ x: 30, y: 45 }, { x: 30, y: 95 }] },
      { type: 'C', points: [
        { x: 30, y: 55 }, { x: 70, y: 42 }, { x: 70, y: 82 }, { x: 30, y: 80 },
      ]},
    ],
  },
  q: {
    char: 'q',
    segments: [
      { type: 'C', points: [
        { x: 70, y: 52 }, { x: 30, y: 42 }, { x: 30, y: 82 }, { x: 70, y: 80 },
      ]},
      { type: 'L', points: [{ x: 70, y: 52 }, { x: 70, y: 95 }] },
    ],
  },
  r: {
    char: 'r',
    segments: [
      { type: 'L', points: [{ x: 30, y: 45 }, { x: 30, y: 82 }] },
      { type: 'C', points: [
        { x: 30, y: 55 }, { x: 50, y: 40 }, { x: 65, y: 45 }, { x: 70, y: 52 },
      ]},
    ],
  },
  s: {
    char: 's',
    segments: [
      { type: 'C', points: [
        { x: 70, y: 52 }, { x: 28, y: 45 }, { x: 28, y: 60 }, { x: 65, y: 65 },
      ]},
      { type: 'C', points: [
        { x: 65, y: 65 }, { x: 28, y: 70 }, { x: 28, y: 85 }, { x: 70, y: 78 },
      ]},
    ],
  },
  t: {
    char: 't',
    segments: [
      { type: 'L', points: [{ x: 45, y: 28 }, { x: 45, y: 75 }] },
      { type: 'C', points: [
        { x: 45, y: 75 }, { x: 48, y: 85 }, { x: 58, y: 84 }, { x: 65, y: 80 },
      ]},
      { type: 'L', points: [{ x: 28, y: 45 }, { x: 60, y: 45 }] },
    ],
  },
  u: {
    char: 'u',
    segments: [
      { type: 'L', points: [{ x: 28, y: 45 }, { x: 28, y: 70 }] },
      { type: 'C', points: [
        { x: 28, y: 70 }, { x: 28, y: 85 }, { x: 68, y: 85 }, { x: 68, y: 70 },
      ]},
      { type: 'L', points: [{ x: 68, y: 45 }, { x: 68, y: 82 }] },
    ],
  },
  v: {
    char: 'v',
    segments: [
      { type: 'L', points: [{ x: 28, y: 45 }, { x: 50, y: 82 }] },
      { type: 'L', points: [{ x: 72, y: 45 }, { x: 50, y: 82 }] },
    ],
  },
  w: {
    char: 'w',
    segments: [
      { type: 'L', points: [{ x: 18, y: 45 }, { x: 32, y: 82 }] },
      { type: 'L', points: [{ x: 32, y: 82 }, { x: 50, y: 58 }] },
      { type: 'L', points: [{ x: 50, y: 58 }, { x: 68, y: 82 }] },
      { type: 'L', points: [{ x: 68, y: 82 }, { x: 82, y: 45 }] },
    ],
  },
  x: {
    char: 'x',
    segments: [
      { type: 'L', points: [{ x: 28, y: 45 }, { x: 72, y: 82 }] },
      { type: 'L', points: [{ x: 72, y: 45 }, { x: 28, y: 82 }] },
    ],
  },
  y: {
    char: 'y',
    segments: [
      { type: 'L', points: [{ x: 28, y: 45 }, { x: 50, y: 75 }] },
      { type: 'L', points: [{ x: 72, y: 45 }, { x: 32, y: 95 }] },
    ],
  },
  z: {
    char: 'z',
    segments: [
      { type: 'L', points: [{ x: 28, y: 45 }, { x: 72, y: 45 }] },
      { type: 'L', points: [{ x: 72, y: 45 }, { x: 28, y: 82 }] },
      { type: 'L', points: [{ x: 28, y: 82 }, { x: 72, y: 82 }] },
    ],
  },
};

// Shift a letter's y-coords so its bounding box (control-point hull) is
// vertically centered at `targetCenterY`. Used for lowercase to keep each
// glyph optically centered regardless of ascender/descender extent.
const centerLetterY = (segments, targetCenterY = 50) => {
  let minY = Infinity, maxY = -Infinity;
  for (const seg of segments) {
    for (const p of seg.points) {
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
  }
  const shift = targetCenterY - (minY + maxY) / 2;
  if (Math.abs(shift) < 0.5) return segments;
  return segments.map(seg => ({
    ...seg,
    points: seg.points.map(p => ({ x: p.x, y: p.y + shift })),
  }));
};

// Compile each letter once at module load; the engine consumes the
// pre-sampled Float32Array directly.
const compile = (raw, displayChar, { center = false } = {}) => {
  const segments = center ? centerLetterY(raw.segments) : raw.segments;
  return {
    char: displayChar,
    start: segments[0].points[0],
    end: segments[segments.length - 1].points.at(-1),
    segments,
    ...sampleLetter(segments),
  };
};

export const LETTERS_UPPER = [
  compile(RAW.A, 'A'),
  compile(RAW.B, 'B'),
  compile(RAW.C, 'C'),
  compile(RAW.D, 'D'),
  compile(RAW.E, 'E'),
  compile(RAW.F, 'F'),
  compile(RAW.G, 'G'),
  compile(RAW.H, 'H'),
  compile(RAW.I, 'I'),
  compile(RAW.J, 'J'),
  compile(RAW.K, 'K'),
  compile(RAW.L, 'L'),
  compile(RAW.M, 'M'),
  compile(RAW.N, 'N'),
  compile(RAW.O, 'O'),
  compile(RAW.P, 'P'),
  compile(RAW.Q, 'Q'),
  compile(RAW.R, 'R'),
  compile(RAW.S, 'S'),
  compile(RAW.T, 'T'),
  compile(RAW.U, 'U'),
  compile(RAW.V, 'V'),
  compile(RAW.W, 'W'),
  compile(RAW.X, 'X'),
  compile(RAW.Y, 'Y'),
  compile(RAW.Z, 'Z'),
];

// Lowercase letters — each auto-centered vertically in the 100x100 box
// (centerLetterY shifts the bbox center to y:50) so individual glyphs
// sit in the middle of the drawing area regardless of ascenders/descenders.
const lc = (raw, ch) => compile(raw, ch, { center: true });
export const LETTERS_LOWER = [
  lc(RAW_LOWER.a, 'a'),
  lc(RAW_LOWER.b, 'b'),
  lc(RAW_LOWER.c, 'c'),
  lc(RAW_LOWER.d, 'd'),
  lc(RAW_LOWER.e, 'e'),
  lc(RAW_LOWER.f, 'f'),
  lc(RAW_LOWER.g, 'g'),
  lc(RAW_LOWER.h, 'h'),
  lc(RAW_LOWER.i, 'i'),
  lc(RAW_LOWER.j, 'j'),
  lc(RAW_LOWER.k, 'k'),
  lc(RAW_LOWER.l, 'l'),
  lc(RAW_LOWER.m, 'm'),
  lc(RAW_LOWER.n, 'n'),
  lc(RAW_LOWER.o, 'o'),
  lc(RAW_LOWER.p, 'p'),
  lc(RAW_LOWER.q, 'q'),
  lc(RAW_LOWER.r, 'r'),
  lc(RAW_LOWER.s, 's'),
  lc(RAW_LOWER.t, 't'),
  lc(RAW_LOWER.u, 'u'),
  lc(RAW_LOWER.v, 'v'),
  lc(RAW_LOWER.w, 'w'),
  lc(RAW_LOWER.x, 'x'),
  lc(RAW_LOWER.y, 'y'),
  lc(RAW_LOWER.z, 'z'),
];

export const VIEW_BOX = 100;
