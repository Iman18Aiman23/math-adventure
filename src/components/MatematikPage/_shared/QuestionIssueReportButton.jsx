import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { saveQuestionIssueReport } from './questionIssueReportStore';

function clean(value, depth = 0) {
  if (value == null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
  if (typeof value === 'function' || depth > 3) return undefined;
  if (Array.isArray(value)) return value.map((item) => clean(item, depth + 1)).filter((item) => item !== undefined);
  if (typeof value === 'object') {
    if (value.$$typeof) return '[React element]';
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, item]) => [key, clean(item, depth + 1)])
        .filter(([, item]) => item !== undefined),
    );
  }
  return String(value);
}

function buildReport({ question, questionIndex, totalQuestions, selected, answered, scoreId, source, issue }) {
  const url = typeof window === 'undefined' ? '' : `${window.location.pathname}${window.location.hash}`;
  const visibleText = !question && typeof document !== 'undefined'
    ? (document.querySelector('.view-container')?.innerText || document.body?.innerText || '').slice(0, 2000)
    : undefined;
  return {
    subject: 'Matematik Tahun 1',
    source,
    scoreId,
    submittedAt: new Date().toISOString(),
    url,
    questionNo: questionIndex != null ? questionIndex + 1 : undefined,
    totalQuestions,
    answered,
    selected: clean(selected),
    issue,
    question: clean(question),
    visibleText,
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
  const label = state === 'submitted' ? 'Report Submitted' : 'Report';

  if (!answered) return null;

  const handleSubmit = async () => {
    try {
      const report = buildReport({ question, questionIndex, totalQuestions, selected, answered, scoreId, source, issue });
      await saveQuestionIssueReport(report);
      await copyText(JSON.stringify(report, null, 2));
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
        type="button"
        onClick={() => setOpen(true)}
        disabled={state === 'submitted'}
        title={language === 'bm' ? 'Laporkan isu soalan ini' : 'Report this question issue'}
        aria-label={language === 'bm' ? 'Laporkan isu soalan ini' : 'Report this question issue'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          marginTop: 10,
          minHeight: 32,
          padding: '6px 14px',
          borderRadius: 999,
          border: '1.5px solid #EF4444',
          background: state === 'failed' ? '#FEF2F2' : state === 'submitted' ? '#FFF1F2' : '#FFFFFF',
          color: '#DC2626',
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 800,
          fontSize: 13,
          cursor: state === 'submitted' ? 'default' : 'pointer',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 0 rgba(127,29,29,.18)',
          opacity: state === 'submitted' ? .88 : 1,
        }}
      >
        <AlertCircle size={16} strokeWidth={2.5} />
        <span>{state === 'failed' ? (language === 'bm' ? 'Gagal' : 'Failed') : label}</span>
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={language === 'bm' ? 'Laporan isu' : 'Issue report'}
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
              <button type="button" onClick={handleSubmit} style={{ border: 'none', background: '#DC2626', color: '#FFF', borderRadius: 999, padding: '8px 16px', fontWeight: 900, cursor: 'pointer' }}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
