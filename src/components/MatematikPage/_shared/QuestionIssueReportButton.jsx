import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { saveQuestionIssueReport } from './questionIssueReportStore';

function clean(value, depth = 0, seen = new WeakSet()) {
  if (value == null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
  if (typeof value === 'function' || depth > 8) return undefined;
  if (typeof value === 'object') {
    if (value.$$typeof) return '[React element]';
    if (seen.has(value)) return '[Circular]';
    seen.add(value);
    if (Array.isArray(value)) return value.map((item) => clean(item, depth + 1, seen)).filter((item) => item !== undefined);
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, item]) => [key, clean(item, depth + 1, seen)])
        .filter(([, item]) => item !== undefined),
    );
  }
  return String(value);
}

function getVisibleText() {
  if (typeof document === 'undefined') return '';
  const clone = (document.querySelector('.view-container') || document.body)?.cloneNode(true);
  clone?.querySelectorAll?.('.qir-report-overlay').forEach((element) => element.remove());
  return (clone?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 5000);
}

function normalizeCssColors(value) {
  return value.replace(
    /color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/g,
    (_, red, green, blue, alpha = '1') => `rgba(${Math.round(red * 255)}, ${Math.round(green * 255)}, ${Math.round(blue * 255)}, ${alpha})`,
  );
}

async function captureScreenshot() {
  if (typeof document === 'undefined') return undefined;
  try {
    const { default: html2canvas } = await import('html2canvas');
    const overlay = document.querySelector('.qir-report-overlay');
    const captureTarget = overlay?.parentElement?.closest(
      '.cmp-content, .maf-content-area, .cm1-content, .cm2-content, .ujian-content, .ujian-masa-card, .ld-drill-content',
    ) || document.querySelector('.view-container');
    const canvas = await html2canvas(captureTarget, {
      backgroundColor: '#ffffff',
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      scale: 1,
      logging: false,
      ignoreElements: (element) => element.classList?.contains('qir-report-overlay'),
      onclone: (clonedDocument) => {
        const screenshotStyle = clonedDocument.createElement('style');
        screenshotStyle.textContent = '*::before,*::after{background-image:none!important;box-shadow:none!important;border-color:transparent!important;color:inherit!important}';
        clonedDocument.head.appendChild(screenshotStyle);
        const colorProperties = [
          'color', 'background-color', 'background-image', 'border-top-color',
          'border-right-color', 'border-bottom-color', 'border-left-color',
          'box-shadow', 'text-shadow', 'outline-color', 'text-decoration-color',
          '-webkit-text-stroke-color', 'list-style-image',
        ];
        clonedDocument.querySelectorAll('*').forEach((element) => {
          const style = clonedDocument.defaultView.getComputedStyle(element);
          colorProperties.forEach((property) => {
            const value = style.getPropertyValue(property);
            if (!value.includes('color(')) return;
            element.style.setProperty(
              property,
              property === 'background-image' ? 'none' : normalizeCssColors(value),
              'important',
            );
          });
        });
      },
    });
    return canvas.toDataURL('image/jpeg', 0.72);
  } catch (error) {
    console.warn('[question report] Screenshot capture failed:', error);
    return undefined;
  }
}

function buildReport({ question, questionIndex, totalQuestions, selected, answered, scoreId, source, issue, issueType, screenshot }) {
  const correctAnswer = question?.answer ?? question?.answerVal ?? question?.correct;
  const selectedOption = question?.options?.find((option) => (
    String(option?.id ?? option?.value) === String(selected)
  ));
  const correctOption = question?.options?.find((option) => (
    String(option?.id ?? option?.value) === String(correctAnswer)
  ));
  const submittedAt = new Date();
  return {
    schemaVersion: 2,
    reportId: globalThis.crypto?.randomUUID?.() || `report-${submittedAt.getTime()}`,
    subject: 'Matematik Tahun 1',
    source,
    scoreId,
    submittedAt: submittedAt.toISOString(),
    issueType,
    issue,
    page: {
      title: typeof document === 'undefined' ? '' : document.title,
      url: typeof window === 'undefined' ? '' : window.location.href,
      path: typeof window === 'undefined' ? '' : `${window.location.pathname}${window.location.hash}`,
      language: typeof document === 'undefined' ? '' : document.documentElement.lang,
      buildMode: import.meta.env.MODE,
    },
    questionNo: questionIndex != null ? questionIndex + 1 : undefined,
    totalQuestions,
    answered,
    selected: clean(selected),
    selectedOption: clean(selectedOption),
    correctAnswer: clean(correctAnswer),
    correctOption: clean(correctOption),
    question: clean(question),
    visibleText: getVisibleText(),
    environment: typeof window === 'undefined' ? undefined : {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
      },
      screen: {
        width: window.screen?.width,
        height: window.screen?.height,
        orientation: window.screen?.orientation?.type,
      },
      browser: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.userAgentData?.platform || navigator.platform,
        online: navigator.onLine,
        touchPoints: navigator.maxTouchPoints,
      },
      preferences: {
        reducedMotion: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
        colorScheme: window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    screenshot,
    screenshotStatus: screenshot ? 'captured' : 'unavailable',
  };
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function copyableReport(report) {
  return report.screenshot
    ? { ...report, screenshot: `[captured in Reports page: ${Math.round(report.screenshot.length / 1024)} KB]` }
    : report;
}

export default function QuestionIssueReportButton({
  language = 'bm',
  question,
  questionIndex,
  totalQuestions,
  selected,
  answered,
  scoreId,
  source,
}) {
  const [state, setState] = useState('idle');
  const [open, setOpen] = useState(false);
  const [issue, setIssue] = useState('');
  const [issueType, setIssueType] = useState('visual-or-content');
  const label = state === 'submitted' ? 'Report Submitted' : state === 'submitting' ? 'Saving...' : 'Report';

  if (!answered) return null;

  const handleSubmit = async () => {
    setState('submitting');
    try {
      const screenshot = await captureScreenshot();
      const report = buildReport({ question, questionIndex, totalQuestions, selected, answered, scoreId, source, issue, issueType, screenshot });
      const savedReport = await saveQuestionIssueReport(report);
      await copyText(JSON.stringify(copyableReport(savedReport), null, 2)).catch(() => {});
      setState('submitted');
      setOpen(false);
      setIssue('');
    } catch {
      setState('failed');
      setTimeout(() => setState('idle'), 1600);
    }
  };

  return (
    <>
      <button
        className="qir-button"
        type="button"
        onClick={() => setOpen(true)}
        disabled={state === 'submitted' || state === 'submitting'}
        title={language === 'bm' ? 'Laporkan isu soalan ini' : 'Report this question issue'}
        aria-label={language === 'bm' ? 'Laporkan isu soalan ini' : 'Report this question issue'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          marginTop: 10,
          minHeight: 30,
          padding: '4px 10px',
          borderRadius: 999,
          border: '1.5px solid #EF4444',
          background: state === 'failed' ? '#FEF2F2' : state === 'submitted' ? '#FFF1F2' : '#FFFFFF',
          color: '#DC2626',
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 800,
          fontSize: 11,
          cursor: state === 'submitted' || state === 'submitting' ? 'default' : 'pointer',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 0 rgba(127,29,29,.18)',
          opacity: state === 'submitted' ? .88 : 1,
        }}
      >
        <AlertCircle size={13} strokeWidth={2.5} />
        <span>{state === 'failed' ? (language === 'bm' ? 'Gagal' : 'Failed') : label}</span>
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={language === 'bm' ? 'Laporan isu' : 'Issue report'}
          className="qir-report-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'grid',
            placeItems: 'center',
            padding: 16,
            background: 'rgba(15,23,42,.38)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              width: 'min(92vw, 420px)',
              borderRadius: 20,
              border: '2px solid #FECACA',
              background: '#FFFFFF',
              boxShadow: '0 24px 70px rgba(15,23,42,.28)',
              padding: 18,
              fontFamily: "'Fredoka', sans-serif",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 22, color: '#991B1B', marginBottom: 8 }}>
              Report Issue
            </div>
            <label style={{ display: 'grid', gap: 6, marginBottom: 10, color: '#475569', fontWeight: 800, fontSize: 13 }}>
              {language === 'bm' ? 'Jenis masalah' : 'Issue type'}
              <select
                value={issueType}
                onChange={(event) => setIssueType(event.target.value)}
                style={{ minHeight: 42, border: '1.5px solid #FCA5A5', borderRadius: 12, background: '#FFFFFF', padding: '8px 10px', fontFamily: "'Fredoka', sans-serif", fontSize: 15 }}
              >
                <option value="visual-or-content">{language === 'bm' ? 'Paparan atau kandungan tidak jelas' : 'Visual or unclear content'}</option>
                <option value="wrong-answer">{language === 'bm' ? 'Jawapan betul salah' : 'Incorrect answer key'}</option>
                <option value="cannot-continue">{language === 'bm' ? 'Tidak boleh teruskan' : 'Cannot continue'}</option>
                <option value="other">{language === 'bm' ? 'Lain-lain' : 'Other'}</option>
              </select>
            </label>
            <textarea
              value={issue}
              onChange={(event) => setIssue(event.target.value)}
              autoFocus
              placeholder={language === 'bm' ? 'Taip masalah soalan ini...' : 'Describe the issue...'}
              style={{
                width: '100%',
                minHeight: 120,
                resize: 'vertical',
                boxSizing: 'border-box',
                border: '1.5px solid #FCA5A5',
                borderRadius: 14,
                padding: 12,
                fontFamily: "'Fredoka', sans-serif",
                fontSize: 15,
                outlineColor: '#EF4444',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 14 }}>
              <button type="button" onClick={() => setOpen(false)} style={{ border: '1.5px solid #E5E7EB', background: '#FFF', color: '#475569', borderRadius: 999, padding: '8px 14px', fontWeight: 800, cursor: 'pointer' }}>
                Cancel
              </button>
              <button type="button" onClick={handleSubmit} disabled={state === 'submitting'} style={{ border: 'none', background: '#DC2626', color: '#FFF', borderRadius: 999, padding: '8px 16px', fontWeight: 900, cursor: state === 'submitting' ? 'wait' : 'pointer', opacity: state === 'submitting' ? .65 : 1 }}>
                {state === 'submitting' ? (language === 'bm' ? 'Menyimpan...' : 'Saving...') : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
