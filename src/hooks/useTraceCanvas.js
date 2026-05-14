import { useEffect, useRef, useCallback } from 'react';
import { VIEW_BOX } from '../data/letterPaths';

// Canvas-based tracing engine with segment-by-segment progress.
//
// Design:
// - Segments are traced one at a time; when one completes, it locks in
//   permanently and the next segment's guide becomes active.
// - 60fps on low-end tablets → single rAF loop, no React re-renders during draw.
// - Real-handwriting feel → quadratic-Bézier smoothing.
// - Forgiving tolerance with lookahead window prevents skip-ahead.
// - Minimal GC via Float32Array and object pooling.

const TOLERANCE_PX            = 12;
const LOOKAHEAD_WINDOW        = 10;
const MIN_SAMPLE_INTERVAL_MS  = 12;
const MIN_SAMPLE_DIST_LOGICAL = 1.2;
const INPUT_BUFFER_CAPACITY   = 2048;
const PROGRESS_NOTIFY_EVERY   = 0.03;

const TOL_SQ = TOLERANCE_PX * TOLERANCE_PX;

const createPool = (size) => {
  const pool = new Array(size);
  for (let i = 0; i < size; i++) pool[i] = { x: 0, y: 0 };
  let head = 0;
  return {
    next() {
      const obj = pool[head];
      head = (head + 1) % size;
      return obj;
    },
  };
};

// Pre-sample a single segment to the same precision as the full letter
const sampleSegmentPath = (segments, segmentIndex) => {
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
        x: mt*mt*mt*p0.x + 3*mt*mt*t*p1.x + 3*mt*t*t*p2.x + t*t*t*p3.x,
        y: mt*mt*mt*p0.y + 3*mt*mt*t*p1.y + 3*mt*t*t*p2.y + t*t*t*p3.y,
      };
    }
    return out;
  };

  let pts = [];
  const seg = segments[segmentIndex];
  let segPts;
  if (seg.type === 'L') segPts = sampleLine(seg.points[0], seg.points[1]);
  else if (seg.type === 'C') segPts = sampleCubic(...seg.points);
  else segPts = [];

  pts = pts.concat(segPts);
  const flat = new Float32Array(pts.length * 2);
  for (let i = 0; i < pts.length; i++) {
    flat[i * 2]     = pts[i].x;
    flat[i * 2 + 1] = pts[i].y;
  }
  return { samples: flat, count: pts.length };
};

export function useTraceCanvas({
  canvasRef,
  letter,
  strokeColor = '#58CC02',
  strokeWidth = 12,
  onProgress,
  onComplete,
  resetSignal,
}) {
  // Canvas state
  const ctxRef           = useRef(null);
  const dprRef           = useRef(1);
  const cssSizeRef       = useRef({ w: 0, h: 0 });
  const offscreenRef     = useRef(null);
  const rafIdRef         = useRef(0);
  const dashOffsetRef    = useRef(0);

  // Segment tracking
  const currentSegmentRef = useRef(0);       // which segment we're on (0..segments.length-1)
  const completedSegmentsRef = useRef([]);   // array of completed segment canvases
  const currentSegmentSamplesRef = useRef(null); // pre-sampled points for current segment

  // User input
  const isDrawingRef     = useRef(false);
  const inputBufferRef   = useRef(new Float32Array(INPUT_BUFFER_CAPACITY * 2));
  const inputCountRef    = useRef(0);
  const lastSampleTRef   = useRef(0);
  const pointPoolRef     = useRef(createPool(16));

  // Progress within current segment
  const progressIdxRef   = useRef(0);
  const lastNotifiedRef  = useRef(0);
  const completedRef     = useRef(false);

  const resetStroke = useCallback(() => {
    inputCountRef.current = 0;
    progressIdxRef.current = 0;
    lastNotifiedRef.current = 0;
    completedRef.current = false;
    isDrawingRef.current = false;
    currentSegmentRef.current = 0;
    completedSegmentsRef.current = [];
    currentSegmentSamplesRef.current = null;
    onProgress?.(0);
  }, [onProgress]);

  useEffect(() => {
    resetStroke();
    offscreenRef.current = null;
  }, [resetSignal, letter, resetStroke]);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Use offsetWidth/Height — immune to CSS transforms (e.g. bounceIn
    // animation that scales the parent to 0.3 on mount). getBoundingClientRect
    // returns visually-transformed dimensions, which would permanently corrupt
    // cssSizeRef because ResizeObserver doesn't fire for transform changes.
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;
    dprRef.current = dpr;
    cssSizeRef.current = { w, h };
    offscreenRef.current = null;
  }, [canvasRef]);

  const logicalToCss = useCallback((lx, ly) => {
    const { w, h } = cssSizeRef.current;
    const size = Math.min(w, h);
    const offX = (w - size) / 2;
    const offY = (h - size) / 2;
    return { x: offX + (lx / VIEW_BOX) * size, y: offY + (ly / VIEW_BOX) * size };
  }, []);

  const cssToLogical = useCallback((cx, cy) => {
    const { w, h } = cssSizeRef.current;
    const size = Math.min(w, h);
    const offX = (w - size) / 2;
    const offY = (h - size) / 2;
    return { x: ((cx - offX) / size) * VIEW_BOX, y: ((cy - offY) / size) * VIEW_BOX };
  }, []);

  // Pre-sample a segment's path (needed for progress tracking even when no guide is rendered)
  const getSegmentSamples = useCallback((segmentIndex) => {
    if (!letter) return null;
    return sampleSegmentPath(letter.segments, segmentIndex);
  }, [letter]);

  // Render a COMPLETED segment as solid green guide with markers. Active segments
  // are rendered live in the frame loop (just the dashed line — no solid bed).
  const renderCompletedSegment = useCallback((segmentIndex) => {
    const { w, h } = cssSizeRef.current;
    if (!w || !h || !letter) return null;

    const segmentSamples = sampleSegmentPath(letter.segments, segmentIndex);
    const make = (width, height) => {
      if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(width, height);
      const c = document.createElement('canvas');
      c.width = width; c.height = height;
      return c;
    };
    const dpr = dprRef.current;
    const off = make(Math.round(w * dpr), Math.round(h * dpr));
    const ctx = off.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Green glow halo
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(88, 204, 2, 0.18)';
    ctx.lineWidth = 30;
    ctx.beginPath();
    const first = logicalToCss(segmentSamples.samples[0], segmentSamples.samples[1]);
    ctx.moveTo(first.x, first.y);
    for (let i = 1; i < segmentSamples.count; i++) {
      const p = logicalToCss(segmentSamples.samples[i * 2], segmentSamples.samples[i * 2 + 1]);
      ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();

    // Solid green guide
    ctx.strokeStyle = '#58CC02';
    ctx.lineWidth = 18;
    ctx.stroke();

    // Start (▶) and End (■) markers shown only on the completed segment
    const seg = letter.segments[segmentIndex];
    const segStart = seg.points[0];
    const segEnd = seg.points[seg.points.length - 1];

    const drawMarker = (lx, ly, fill, label) => {
      const p = logicalToCss(lx, ly);
      ctx.fillStyle = fill;
      ctx.beginPath(); ctx.arc(p.x, p.y, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(label, p.x, p.y + 0.5);
    };
    drawMarker(segStart.x, segStart.y, '#58CC02', '▶');
    drawMarker(segEnd.x, segEnd.y, '#FF4B4B', '■');

    return off;
  }, [letter, logicalToCss]);

  const advanceProgress = useCallback((lx, ly) => {
    if (!letter || completedRef.current) return;
    const samples = currentSegmentSamplesRef.current;
    if (!samples) return;

    const start = progressIdxRef.current;
    const end = Math.min(start + LOOKAHEAD_WINDOW, samples.count);
    let best = start;
    for (let i = start; i < end; i++) {
      const dx = lx - samples.samples[i * 2];
      const dy = ly - samples.samples[i * 2 + 1];
      if (dx * dx + dy * dy <= TOL_SQ) best = i;
    }
    if (best > progressIdxRef.current) {
      progressIdxRef.current = best;
      const p = best / (samples.count - 1);
      if (p - lastNotifiedRef.current >= PROGRESS_NOTIFY_EVERY || p >= 1) {
        lastNotifiedRef.current = p;
        const segmentCount = letter.segments.length;
        const overallProgress = (currentSegmentRef.current + p) / segmentCount;
        onProgress?.(overallProgress);
      }
      if (best >= samples.count - 1) {
        // Segment complete — lock it in green with markers
        const completedCanvas = renderCompletedSegment(currentSegmentRef.current);
        if (completedCanvas) {
          completedSegmentsRef.current.push(completedCanvas);
        }
        // Clear user's drawn stroke immediately
        inputCountRef.current = 0;

        if (currentSegmentRef.current < letter.segments.length - 1) {
          // Move to next segment
          currentSegmentRef.current += 1;
          progressIdxRef.current = 0;
          lastNotifiedRef.current = 0;
          currentSegmentSamplesRef.current = getSegmentSamples(currentSegmentRef.current);
        } else {
          // Letter complete
          completedRef.current = true;
          onComplete?.();
        }
      }
    }
  }, [letter, onComplete, onProgress]);

  const handlePointerDown = useCallback((e) => {
    if (completedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use offsetWidth/Height for the zero-check (immune to CSS transforms)
    if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
      setupCanvas();
      requestAnimationFrame(() => {
        if (ctxRef.current) handlePointerDown(e);
      });
      return;
    }

    const rect = canvas.getBoundingClientRect();

    canvas.setPointerCapture?.(e.pointerId);
    isDrawingRef.current = true;

    inputCountRef.current = 0;
    lastSampleTRef.current = 0;

    // Initialize current segment samples on first draw
    if (!currentSegmentSamplesRef.current && letter) {
      currentSegmentSamplesRef.current = getSegmentSamples(currentSegmentRef.current);
    }

    const pt = pointPoolRef.current.next();
    pt.x = e.clientX - rect.left;
    pt.y = e.clientY - rect.top;
    inputBufferRef.current[0] = pt.x;
    inputBufferRef.current[1] = pt.y;
    inputCountRef.current = 1;

    const logical = cssToLogical(pt.x, pt.y);
    advanceProgress(logical.x, logical.y);
  }, [canvasRef, cssToLogical, advanceProgress, letter, getSegmentSamples, setupCanvas]);

  const handlePointerMove = useCallback((e) => {
    if (!isDrawingRef.current || completedRef.current) return;

    const now = performance.now();
    if (now - lastSampleTRef.current < MIN_SAMPLE_INTERVAL_MS) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const buf = inputBufferRef.current;
    const cnt = inputCountRef.current;
    if (cnt > 0) {
      const dx = x - buf[(cnt - 1) * 2];
      const dy = y - buf[(cnt - 1) * 2 + 1];
      if (dx * dx + dy * dy < MIN_SAMPLE_DIST_LOGICAL * MIN_SAMPLE_DIST_LOGICAL) return;
    }
    if (cnt < INPUT_BUFFER_CAPACITY) {
      buf[cnt * 2] = x; buf[cnt * 2 + 1] = y;
      inputCountRef.current = cnt + 1;
    }
    lastSampleTRef.current = now;

    const logical = cssToLogical(x, y);
    advanceProgress(logical.x, logical.y);
  }, [canvasRef, cssToLogical, advanceProgress]);

  const handlePointerUp = useCallback((e) => {
    isDrawingRef.current = false;
    try { canvasRef.current?.releasePointerCapture?.(e.pointerId); } catch (_) {}
  }, [canvasRef]);

  const drawUserStroke = useCallback((ctx) => {
    const buf = inputBufferRef.current;
    const n = inputCountRef.current;
    if (n < 2) return;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    ctx.moveTo(buf[0], buf[1]);
    if (n === 2) {
      ctx.lineTo(buf[2], buf[3]);
    } else {
      for (let i = 1; i < n - 1; i++) {
        const cx = buf[i * 2];
        const cy = buf[i * 2 + 1];
        const ex = (cx + buf[(i + 1) * 2]) / 2;
        const ey = (cy + buf[(i + 1) * 2 + 1]) / 2;
        ctx.quadraticCurveTo(cx, cy, ex, ey);
      }
      ctx.lineTo(buf[(n - 1) * 2], buf[(n - 1) * 2 + 1]);
    }
    ctx.stroke();
  }, [strokeColor, strokeWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    let resizeObserver;
    let delayedSetupTimer;
    let setupAttempts = 0;

    // Initial setup with aggressive retrying
    const attemptSetup = () => {
      if (!canvas) return;
      // offsetWidth/Height are immune to CSS transforms (bounceIn etc.)
      if (canvas.offsetWidth > 0 && canvas.offsetHeight > 0) {
        setupCanvas();
      } else if (setupAttempts < 10) {
        setupAttempts++;
        const delay = setupAttempts > 3 ? 100 : 30;
        delayedSetupTimer = setTimeout(attemptSetup, delay);
      }
    };

    attemptSetup();

    if (canvas && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (canvas.offsetWidth > 0 && canvas.offsetHeight > 0) {
          setupCanvas();
        }
      });
      resizeObserver.observe(canvas);
    }

    const handleResize = () => setupCanvas();
    window.addEventListener('resize', handleResize);

    const frame = () => {
      const ctx = ctxRef.current;
      if (!ctx) {
        // Try to setup canvas if not initialized yet
        setupCanvas();
        rafIdRef.current = requestAnimationFrame(frame);
        return;
      }
      const { w, h } = cssSizeRef.current;
      ctx.clearRect(0, 0, w, h);

      // 1. Draw all completed segments (locked in green with markers)
      for (const completedCanvas of completedSegmentsRef.current) {
        ctx.drawImage(completedCanvas, 0, 0, w, h);
      }

      // 2. Ensure current segment samples are loaded (no offscreen guide bed)
      if (!currentSegmentSamplesRef.current && letter && currentSegmentRef.current < letter.segments.length) {
        currentSegmentSamplesRef.current = getSegmentSamples(currentSegmentRef.current);
      }

      // 3. Animated dashed line showing the active segment's path
      if (letter && currentSegmentSamplesRef.current && !completedRef.current) {
        dashOffsetRef.current -= 0.6;
        ctx.save();
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.strokeStyle = '#1CB0F6';
        ctx.lineWidth = 4;
        ctx.setLineDash([10, 8]);
        ctx.lineDashOffset = dashOffsetRef.current;
        ctx.beginPath();
        const samples = currentSegmentSamplesRef.current;
        const startIdx = progressIdxRef.current;
        const first = logicalToCss(samples.samples[startIdx * 2], samples.samples[startIdx * 2 + 1]);
        ctx.moveTo(first.x, first.y);
        for (let i = startIdx + 1; i < samples.count; i++) {
          const p = logicalToCss(samples.samples[i * 2], samples.samples[i * 2 + 1]);
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 4. Player's traced stroke
      drawUserStroke(ctx);

      // 5. Pulsing target dot at current progress
      if (letter && currentSegmentSamplesRef.current && !completedRef.current) {
        const samples = currentSegmentSamplesRef.current;
        const idx = progressIdxRef.current;
        const lp = logicalToCss(samples.samples[idx * 2], samples.samples[idx * 2 + 1]);
        const t = (performance.now() % 1000) / 1000;
        const r = 6 + Math.sin(t * Math.PI * 2) * 2;
        ctx.fillStyle = 'rgba(28,176,246,0.85)';
        ctx.beginPath(); ctx.arc(lp.x, lp.y, r, 0, Math.PI * 2); ctx.fill();
      }

      rafIdRef.current = requestAnimationFrame(frame);
    };
    rafIdRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      if (delayedSetupTimer) clearTimeout(delayedSetupTimer);
    };
  }, [letter, setupCanvas, getSegmentSamples, logicalToCss, drawUserStroke]);

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    resetStroke,
  };
}
