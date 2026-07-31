import React, { useEffect, useMemo, useState } from 'react';
import { Clipboard, Database, Eye, FileWarning, Inbox, Search, Trash2, X } from 'lucide-react';
import BackButton from '../BackButton';
import { clearQuestionIssueReports, getQuestionIssueReports, QUESTION_ISSUE_REPORTS_KEY } from './_shared/questionIssueReportStore';

const COMPARE_PROMPTS = {
  'lebih-banyak': 'Yang manakah lebih?',
  'lebih-sedikit': 'Yang manakah sedikit?',
  'sama-banyak': 'Yang manakah sama banyak?',
};

const REPORTS_PAGE_CSS = `
  .qir-page {
    min-height: 100%;
    width: 100%;
    overflow-y: auto;
    color: #172033;
    background:
      radial-gradient(circle at 0% 0%, rgba(14, 165, 233, .12), transparent 24rem),
      radial-gradient(circle at 100% 0%, rgba(16, 185, 129, .12), transparent 22rem),
      linear-gradient(180deg, #f4f8fc 0%, #eef4f7 100%);
    font-family: 'Fredoka', sans-serif;
  }

  .qir-shell {
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: 14px 0 34px;
  }

  .qir-topbar,
  .qir-actions,
  .qir-title-row,
  .qir-card-head,
  .qir-dialog-head {
    display: flex;
    align-items: center;
  }

  .qir-topbar {
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .qir-actions {
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .qir-btn {
    border: 1px solid #d8dee8;
    background: #ffffff;
    color: #243044;
    min-height: 38px;
    border-radius: 9px;
    padding: 8px 12px;
    font: 800 14px/1 'Fredoka', sans-serif;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(27, 39, 60, .06);
    transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, background .18s ease;
  }

  .qir-btn:hover {
    transform: translateY(-1px);
    border-color: #8bbfe5;
    background: #f7fbff;
    box-shadow: 0 8px 18px rgba(14, 116, 144, .10);
  }

  .qir-btn:active {
    transform: translateY(0) scale(.98);
  }

  .qir-btn:focus-visible,
  .qir-search:focus-within {
    outline: 3px solid rgba(14, 165, 233, .22);
    outline-offset: 2px;
  }

  .qir-btn-danger {
    border-color: #fecaca;
    background: #fff1f2;
    color: #b4232a;
  }

  .qir-hero {
    background:
      linear-gradient(90deg, rgba(14, 165, 233, .10), rgba(16, 185, 129, .08) 45%, rgba(255, 255, 255, .95) 76%),
      #ffffff;
    border: 1px solid #cfe0ec;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 10px 26px rgba(27, 39, 60, .06);
  }

  .qir-title-row {
    justify-content: space-between;
    gap: 14px;
  }

  .qir-eyebrow {
    margin: 0 0 4px;
    color: #0f766e;
    font: 900 12px/1 'Baloo 2', sans-serif;
  }

  .qir-title {
    margin: 0;
    color: #111827;
    font: 900 clamp(26px, 4vw, 36px)/1 'Baloo 2', sans-serif;
    text-wrap: balance;
  }

  .qir-subtitle {
    max-width: 620px;
    margin: 6px 0 0;
    color: #667085;
    font-size: 14px;
    font-weight: 650;
    line-height: 1.35;
  }

  .qir-badge {
    flex: 0 0 auto;
    min-width: 118px;
    border: 1px solid #bae6fd;
    border-radius: 12px;
    background: #eff8ff;
    color: #075985;
    padding: 10px 12px;
  }

  .qir-badge strong {
    display: block;
    font: 900 28px/.85 'Baloo 2', sans-serif;
    font-variant-numeric: tabular-nums;
  }

  .qir-badge span {
    display: block;
    margin-top: 4px;
    color: #0f7490;
    font-size: 12px;
    font-weight: 800;
  }

  .qir-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }

  .qir-stat {
    border: 1px solid #dbe8f1;
    border-radius: 10px;
    background: #ffffff;
    padding: 8px 10px;
    min-width: 0;
    display: inline-flex;
    align-items: baseline;
    gap: 8px;
  }

  .qir-stat span {
    color: #64748b;
    font-size: 12px;
    font-weight: 800;
  }

  .qir-stat strong {
    display: inline;
    margin-top: 0;
    color: #0f766e;
    font: 900 15px/1 'Fredoka', sans-serif;
    overflow-wrap: anywhere;
  }

  .qir-toolbar {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    align-items: center;
    margin: 12px 0;
  }

  .qir-search {
    min-height: 42px;
    border: 1px solid #cfe0ec;
    background: #ffffff;
    border-radius: 14px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 1px 2px rgba(27, 39, 60, .04);
  }

  .qir-search input {
    width: 100%;
    min-width: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: #162033;
    font: 700 15px/1.2 'Fredoka', sans-serif;
  }

  .qir-search input::placeholder {
    color: #8794a7;
  }

  .qir-storage {
    min-height: 42px;
    border: 1px solid #ccfbf1;
    border-radius: 12px;
    background: #f0fdfa;
    color: #0f766e;
    padding: 0 13px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 900;
    white-space: nowrap;
  }

  .qir-list {
    display: grid;
    gap: 12px;
  }

  .qir-card {
    position: relative;
    overflow: hidden;
    border: 1px solid #dce8f1;
    background: rgba(255, 255, 255, .95);
    border-radius: 18px;
    padding: 16px;
    box-shadow: 0 16px 38px rgba(27, 39, 60, .08);
  }

  .qir-card::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 5px;
    background: linear-gradient(180deg, #ef4444, #0ea5e9, #10b981);
  }

  .qir-card-head {
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
    padding-left: 6px;
  }

  .qir-report-title {
    margin: 0;
    color: #0f172a;
    font: 900 24px/1 'Baloo 2', sans-serif;
  }

  .qir-card-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .qir-time {
    color: #68778b;
    font-size: 13px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .qir-fields {
    display: grid;
    grid-template-columns: 1.45fr .65fr 1fr 1fr;
    gap: 12px;
  }

  .qir-field {
    min-width: 0;
    border-radius: 12px;
    background: #f8fafc;
    border: 1px solid #edf2f7;
    padding: 11px 12px;
  }

  .qir-field b {
    display: block;
    color: #64748b;
    font-size: 12px;
    margin-bottom: 5px;
  }

  .qir-field span {
    display: block;
    color: #152238;
    font-weight: 850;
    overflow-wrap: anywhere;
  }

  .qir-field-compact span {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .qir-empty {
    border: 1px dashed #9ed7ef;
    border-radius: 20px;
    background: linear-gradient(135deg, #ffffff, #f0fdfa);
    min-height: 260px;
    display: grid;
    place-items: center;
    padding: 28px;
    text-align: center;
    color: #617086;
  }

  .qir-empty svg {
    color: #0ea5e9;
    margin-bottom: 12px;
  }

  .qir-empty strong {
    display: block;
    color: #172033;
    font: 900 24px/1 'Baloo 2', sans-serif;
  }

  .qir-dialog-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(15, 23, 42, .52);
    display: grid;
    place-items: center;
    padding: 16px;
  }

  .qir-dialog {
    width: min(94vw, 680px);
    max-height: 88dvh;
    overflow-y: auto;
    border-radius: 22px;
    background: #ffffff;
    padding: 18px;
    box-shadow: 0 32px 90px rgba(15, 23, 42, .34);
  }

  .qir-dialog-head {
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
    padding-bottom: 12px;
    border-bottom: 1px solid #edf1f6;
  }

  .qir-dialog-title {
    margin: 0;
    color: #991b1b;
    font: 900 25px/1 'Baloo 2', sans-serif;
  }

  .qir-dialog-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .qir-icon-btn {
    width: 40px;
    padding: 0;
  }

  .qir-evidence {
    display: grid;
    gap: 16px;
  }

  .qir-screenshot {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid #dbe8f1;
    border-radius: 14px;
    background: #f8fafc;
  }

  .qir-raw {
    border: 1px solid #dbe8f1;
    border-radius: 14px;
    background: #f8fafc;
    padding: 10px 12px;
  }

  .qir-raw summary {
    cursor: pointer;
    color: #075985;
    font-weight: 900;
  }

  .qir-raw pre {
    margin: 10px 0 0;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    color: #334155;
    font: 600 12px/1.45 monospace;
  }

  @media (max-width: 840px) {
    .qir-toolbar {
      grid-template-columns: 1fr;
      display: grid;
    }
    .qir-fields {
      grid-template-columns: 1fr;
    }
    .qir-storage {
      justify-self: start;
    }
  }

  @media (max-width: 560px) {
    .qir-shell {
      width: min(100% - 20px, 1180px);
      padding-top: 10px;
    }

    .qir-topbar,
    .qir-title-row,
    .qir-card-head {
      align-items: stretch;
      flex-direction: column;
    }

    .qir-actions,
    .qir-card-meta {
      justify-content: stretch;
    }

    .qir-actions .qir-btn,
    .qir-card-meta .qir-btn {
      flex: 1 1 auto;
    }

    .qir-hero,
    .qir-card,
    .qir-dialog {
      border-radius: 14px;
    }

    .qir-stats {
      display: grid;
      grid-template-columns: 1fr;
    }

    .qir-stat {
      justify-content: space-between;
    }
  }
`;

function Field({ label, value, compact = false }) {
  if (value == null || value === '') return null;
  return (
    <div className={`qir-field${compact ? ' qir-field-compact' : ''}`}>
      <b>{label}</b>
      <span title={compact && typeof value === 'string' ? value : undefined}>
        {typeof value === 'string' ? value : JSON.stringify(value)}
      </span>
    </div>
  );
}

function exportableReport(report) {
  if (!report?.screenshot) return report;
  return {
    ...report,
    screenshot: `[captured in Reports page: ${Math.round(report.screenshot.length / 1024)} KB]`,
  };
}

function Objects({ icon = '●', count = 0 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 28px)', justifyContent: 'center', gap: 6 }}>
      {Array.from({ length: Number(count) || 0 }, (_, i) => (
        <span key={i} style={{ fontSize: 25, lineHeight: 1, textAlign: 'center' }}>{icon}</span>
      ))}
    </div>
  );
}

function MoneyVisual({ denom, size = 96 }) {
  if (!denom) return null;
  if (denom.type === 'coin') {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block' }}>
        <circle cx="50" cy="50" r="44" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="3" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2', sans-serif" fontWeight="900" fontSize="18" fill="#4B5563">
          {denom.label}
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 130 62" width={size + 28} height={Math.round(size * 0.55)} style={{ display: 'block' }}>
      <rect x="2" y="2" width="126" height="58" rx="8" fill={denom.color || '#3B82F6'} stroke={denom.color || '#3B82F6'} strokeWidth="2" />
      <rect x="6" y="6" width="118" height="50" rx="5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <text x="65" y="35" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2', sans-serif" fontWeight="900" fontSize="28" fill="#fff">
        {denom.label}
      </text>
    </svg>
  );
}

function FractionVisual({ shape = 'circle', parts = 2, shaded = 1, size = 92 }) {
  const safeParts = Math.max(1, Number(parts) || 1);
  const safeShaded = Math.max(0, Math.min(safeParts, Number(shaded) || 0));

  if (shape === 'square') {
    return (
      <div style={{ width: size, height: size, display: 'grid', gridTemplateColumns: `repeat(${safeParts}, 1fr)`, border: '2px solid #64748B', borderRadius: 8, overflow: 'hidden', background: '#FFFFFF' }}>
        {Array.from({ length: safeParts }, (_, index) => (
          <div key={index} style={{ borderLeft: index ? '1px solid #CBD5E1' : 'none', background: index < safeShaded ? '#86EFAC' : '#FFFFFF' }} />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '2px solid #64748B',
        background: `conic-gradient(#86EFAC 0 ${safeShaded / safeParts}turn, #FFFFFF ${safeShaded / safeParts}turn 1turn)`,
        boxShadow: 'inset 0 0 0 1px #CBD5E1',
      }}
      title={`${safeShaded}/${safeParts}`}
    />
  );
}

function ClockFacePreview({ hour, minute = 0, size = 132 }) {
  const minuteAngle = (Number(minute) || 0) * 6;
  const hourAngle = (((Number(hour) || 12) % 12) + (Number(minute) || 0) / 60) * 30;
  return (
    <svg viewBox="0 0 160 160" width={size} height={size} style={{ display: 'block' }}>
      <circle cx="80" cy="80" r="72" fill="#FFFFFF" stroke="#22C55E" strokeWidth="5" />
      <circle cx="80" cy="80" r="61" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => {
        const angle = ((n - 3) * Math.PI) / 6;
        return (
          <text
            key={n}
            x={80 + 47 * Math.cos(angle)}
            y={80 + 47 * Math.sin(angle) + 5}
            textAnchor="middle"
            fontFamily="'Baloo 2', sans-serif"
            fontWeight="900"
            fontSize="13"
            fill="#15803D"
          >
            {n}
          </text>
        );
      })}
      <line x1="80" y1="80" x2="80" y2="36" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" transform={`rotate(${minuteAngle} 80 80)`} />
      <line x1="80" y1="80" x2="80" y2="49" stroke="#16A34A" strokeWidth="7" strokeLinecap="round" transform={`rotate(${hourAngle} 80 80)`} />
      <circle cx="80" cy="80" r="6" fill="#0F172A" />
    </svg>
  );
}

function DaySequencePreview({ sequence }) {
  if (!Array.isArray(sequence)) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, border: '1px solid #E2E8F0', borderRadius: 16, background: '#F8FAFC', padding: 12 }}>
      {sequence.map((day, index) => (
        <span key={`${day || 'blank'}-${index}`} style={{ minWidth: 74, borderRadius: 12, background: day ? '#22C55E' : '#FFFFFF', border: day ? '0' : '2px dashed #22C55E', color: day ? '#FFFFFF' : '#15803D', padding: '8px 10px', textAlign: 'center', fontFamily: "'Baloo 2', sans-serif", fontWeight: 900 }}>
          {day || '_____'}
        </span>
      ))}
    </div>
  );
}

function TimeQuestionPreview({ question, selected }) {
  const isTime = [
    'waktu-harian', 'baca-jam', 'digital-jam', 'hari-seterusnya', 'hari-sebelumnya',
    'hari-esok', 'bulan-seterusnya', 'bulan-card', 'cerita-masa',
    'padan-urutan-hari', 'susun-hari', 'bilangan-hari-minggu',
    'hari-pertama-sekolah', 'hari-antara', 'cuti-hujung-minggu',
  ].includes(question?.type);
  if (!isTime) return null;

  return (
    <div style={{ display: 'grid', gap: 18, fontFamily: "'Fredoka', sans-serif" }}>
      <h2 style={{ margin: 0, textAlign: 'center', fontFamily: "'Baloo 2', sans-serif", fontSize: 28, color: '#1E293B' }}>
        {question.prompt || 'Question'}
      </h2>
      {(question.type === 'baca-jam' || question.type === 'cerita-masa') && (
        <div style={{ display: 'grid', justifyItems: 'center' }}>
          <ClockFacePreview hour={question.hour} minute={question.minute} />
        </div>
      )}
      {(question.type === 'digital-jam' || question.type === 'bulan-card') && (
        <div style={{
          justifySelf: 'center',
          minWidth: 128,
          borderRadius: 18,
          border: '2px solid rgba(34,197,94,.45)',
          background: '#FFFFFF',
          boxShadow: '0 5px 0 rgba(34,197,94,.18)',
          padding: '14px 24px',
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 900,
          fontSize: 36,
          color: '#15803D',
          textAlign: 'center',
        }}>
          {question.display}
        </div>
      )}
      {question.type === 'padan-urutan-hari' && <DaySequencePreview sequence={question.sequence} />}
      {question.type === 'susun-hari' && Array.isArray(question.tiles) && (
        <div style={{ display: 'grid', gap: 10 }}>
          <MiniField label="Tiles shown">
            <ValuePreview value={question.tiles.map(tile => tile.value).join(', ')} />
          </MiniField>
          <MiniField label="Correct order">
            <ValuePreview value={question.correct?.join(', ') || question.answer} />
          </MiniField>
        </div>
      )}
      <OptionsPreview question={question} selected={selected} />
      <MiniField label="Correct Answer">
        <ValuePreview value={question.correct?.join(', ') || question.answer} />
      </MiniField>
    </div>
  );
}

function MoneyQuestionPreview({ question, selected }) {
  const hasMoney = (value) => {
    if (!value) return false;
    if (Array.isArray(value)) return value.some(hasMoney);
    if (typeof value !== 'object') return false;
    return value.type === 'coin' || value.type === 'note' || hasMoney(value.denom) || hasMoney(value.items);
  };
  const isMoney = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'A', 'B', 'C', 'pocket', 'ledger', 'envelope', 'pay'].includes(question?.type)
    && (hasMoney(question) || question.left || question.right || question.notes || question.options);
  if (!isMoney) return null;

  const selectedId = typeof selected === 'string' ? selected : null;

  return (
    <div style={{ display: 'grid', gap: 18, fontFamily: "'Fredoka', sans-serif" }}>
      <h2 style={{ margin: 0, textAlign: 'center', fontFamily: "'Baloo 2', sans-serif", fontSize: 28, color: '#1E293B' }}>
        {question.prompt || 'Question'}
      </h2>
      {question.notes && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, border: '1px solid #E2E8F0', borderRadius: 16, background: '#F8FAFC', padding: 14 }}>
          {question.notes.map((denom, index) => <MoneyVisual key={index} denom={denom} size={82} />)}
        </div>
      )}
      {question.targetItems && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, border: '1px solid #E2E8F0', borderRadius: 16, background: '#F8FAFC', padding: 14 }}>
          {question.targetItems.map((denom, index) => <MoneyVisual key={index} denom={denom} size={82} />)}
        </div>
      )}
      {question.sourceItems && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, border: '1px solid #E2E8F0', borderRadius: 16, background: '#F8FAFC', padding: 14 }}>
          {question.sourceItems.map((denom, index) => <MoneyVisual key={index} denom={denom} size={82} />)}
        </div>
      )}
      {(question.left || question.right) && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18 }}>
          <MoneyVisual denom={question.left} />
          <b style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: 26, color: '#CBD5E1' }}>vs</b>
          <MoneyVisual denom={question.right} />
        </div>
      )}
      {question.options && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
          {question.options.map((opt) => {
            const isAnswer = opt.id === question.answer;
            const isSelected = selectedId && opt.id === selectedId;
            return (
              <div
                key={opt.id}
                style={{
                  minHeight: 64,
                  border: isSelected ? '3px solid #EF4444' : isAnswer ? '3px solid #16A34A' : '2px solid #E2E8F0',
                  background: isAnswer ? '#DCFCE7' : '#FFFFFF',
                  borderRadius: 14,
                  padding: 10,
                  display: 'grid',
                  placeItems: 'center',
                  textAlign: 'center',
                  fontFamily: "'Baloo 2', sans-serif",
                  fontWeight: 900,
                  fontSize: 20,
                  color: isAnswer ? '#15803D' : '#1E293B',
                }}
              >
                {opt.denom ? <MoneyVisual denom={opt.denom} size={72} /> : Array.isArray(opt.items) ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}>
                    {opt.items.map((denom, index) => <MoneyVisual key={index} denom={denom} size={54} />)}
                  </div>
                ) : opt.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ValuePreview({ value }) {
  if (value == null || value === '') return null;
  if (Array.isArray(value)) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
        {value.map((item, index) => <ValuePreview key={index} value={item} />)}
      </div>
    );
  }
  if (typeof value !== 'object') {
    return <span>{String(value)}</span>;
  }
  if (value.type === 'coin' || value.type === 'note') return <MoneyVisual denom={value} size={72} />;
  if (value.shape && value.parts != null && value.shaded != null) return <FractionVisual shape={value.shape} parts={value.parts} shaded={value.shaded} size={72} />;
  if (value.icon && value.count != null) return <Objects icon={value.icon} count={value.count} />;
  if (value.value != null || value.label || value.text) return <span>{value.label ?? value.text ?? String(value.value)}</span>;
  return <span>{JSON.stringify(value)}</span>;
}

function MiniField({ label, children }) {
  if (children == null || children === '') return null;
  return (
    <div style={{ border: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: 14, padding: 10, display: 'grid', gap: 6 }}>
      <b style={{ color: '#64748B', fontSize: 12 }}>{label}</b>
      <div style={{ color: '#1E293B', fontWeight: 800, overflowWrap: 'anywhere' }}>{children}</div>
    </div>
  );
}

function OptionsPreview({ question, selected }) {
  if (!Array.isArray(question?.options)) return null;
  const selectedId = typeof selected === 'string' || typeof selected === 'number' ? String(selected) : null;
  const answerId = question.answer != null ? String(question.answer) : null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
      {question.options.map((opt, index) => {
        const id = String(opt?.id ?? index);
        const isAnswer = answerId && id === answerId;
        const isSelected = selectedId && id === selectedId;
        return (
          <div
            key={id}
            style={{
              minHeight: 58,
              border: isSelected ? '3px solid #EF4444' : isAnswer ? '3px solid #16A34A' : '2px solid #E2E8F0',
              background: isAnswer ? '#DCFCE7' : '#FFFFFF',
              borderRadius: 14,
              padding: 10,
              display: 'grid',
              placeItems: 'center',
              textAlign: 'center',
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 900,
              fontSize: 19,
              color: isAnswer ? '#15803D' : '#1E293B',
            }}
          >
            <ValuePreview value={opt?.denom || opt?.items || opt?.objects || (opt?.shape && opt?.parts ? opt : null) || opt?.value || opt?.label || opt?.text || opt} />
          </div>
        );
      })}
    </div>
  );
}

function GenericQuestionPreview({ question, selected }) {
  const title = question?.prompt || question?.question || question?.header || 'Question';
  return (
    <div style={{ display: 'grid', gap: 16, fontFamily: "'Fredoka', sans-serif" }}>
      <h2 style={{ margin: 0, textAlign: 'center', fontFamily: "'Baloo 2', sans-serif", fontSize: 27, color: '#1E293B' }}>
        {title}
      </h2>
      {question?.shape && question?.parts != null && question?.shaded != null && (
        <div style={{ display: 'grid', justifyItems: 'center' }}>
          <FractionVisual shape={question.shape} parts={question.parts} shaded={question.shaded} size={112} />
        </div>
      )}
      <OptionsPreview question={question} selected={selected} />
      <MiniField label="Correct Answer">
        <ValuePreview value={question?.answerVal ?? question?.answer} />
      </MiniField>
    </div>
  );
}

function CompareQuestionPreview({ question, selected }) {
  const timePreview = TimeQuestionPreview({ question, selected });
  if (timePreview) return timePreview;

  const moneyPreview = MoneyQuestionPreview({ question, selected });
  if (moneyPreview) return moneyPreview;

  const isCompare = question?.a != null && question?.b != null && question?.icon && !question?.options;
  if (!isCompare) {
    return <GenericQuestionPreview question={question} selected={selected} />;
  }

  return (
    <div style={{ display: 'grid', gap: 18, fontFamily: "'Fredoka', sans-serif" }}>
      <h2 style={{ margin: 0, textAlign: 'center', fontFamily: "'Baloo 2', sans-serif", fontSize: 28, color: '#1E293B' }}>
        {COMPARE_PROMPTS[question.type] || question.prompt || 'Question'}
      </h2>
      {question.type === 'sama-banyak' && (
        <div style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
          <b style={{ color: '#64748B' }}>Sama dengan ini</b>
          <div style={{ border: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: 14, padding: 12 }}>
            <Objects icon={question.icon} count={question.ref} />
          </div>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        {['a', 'b'].map((side) => (
          <div
            key={side}
            style={{
              minHeight: 138,
              border: selected === side ? '3px solid #EF4444' : '2px solid #E2E8F0',
              background: '#FFFFFF',
              borderRadius: 16,
              padding: 12,
              display: 'grid',
              alignContent: 'space-between',
              gap: 10,
            }}
          >
            <Objects icon={question.icon} count={question[side]} />
            <div style={{ justifySelf: 'center', minWidth: 46, borderRadius: 14, background: '#F8FAFC', boxShadow: '0 4px 0 #CBD5E1', padding: '6px 12px', textAlign: 'center', fontWeight: 900, fontSize: 22 }}>
              {question[side]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function QuestionIssueReportsPage({ onBack, language = 'bm' }) {
  const [reports, setReports] = useState([]);
  const [preview, setPreview] = useState(null);
  const [query, setQuery] = useState('');
  const json = useMemo(() => JSON.stringify(reports.map(exportableReport), null, 2), [reports]);
  const filteredReports = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return reports;
    return reports.filter((report) => JSON.stringify(exportableReport(report)).toLowerCase().includes(needle));
  }, [query, reports]);
  const latestReport = reports.reduce((latest, report) => {
    if (!report.submittedAt) return latest;
    const time = new Date(report.submittedAt).getTime();
    return time > latest ? time : latest;
  }, 0);
  const sourceCount = useMemo(() => new Set(reports.map((report) => report.source).filter(Boolean)).size, [reports]);

  useEffect(() => {
    getQuestionIssueReports().then(setReports);
  }, []);

  const copyAll = async () => {
    await navigator.clipboard?.writeText(json);
  };

  const copyReport = async (report) => {
    await navigator.clipboard?.writeText(JSON.stringify(exportableReport(report), null, 2));
  };

  const clearAll = async () => {
    await clearQuestionIssueReports();
    setReports([]);
    setQuery('');
  };

  return (
    <div className="qir-page">
      <style>{REPORTS_PAGE_CSS}</style>
      <main className="qir-shell">
        <nav className="qir-topbar" aria-label="Question reports navigation">
          <BackButton onClick={onBack} />
          <div className="qir-actions">
            <button type="button" className="qir-btn" onClick={copyAll}>
              <Clipboard size={17} aria-hidden="true" />
              <span>Copy JSON</span>
            </button>
            <button type="button" className="qir-btn qir-btn-danger" onClick={clearAll}>
              <Trash2 size={17} aria-hidden="true" />
              <span>Clear</span>
            </button>
          </div>
        </nav>

        <section className="qir-hero">
          <div className="qir-title-row">
            <div>
              <p className="qir-eyebrow">Matematik admin</p>
              <h1 className="qir-title">Question Reports</h1>
              <p className="qir-subtitle">
                Review reported questions and inspect the exact learner view.
              </p>
            </div>
            <div className="qir-badge" aria-label={`${reports.length} reports`}>
              <strong>{reports.length}</strong>
              <span>Total reports</span>
            </div>
          </div>
          <div className="qir-stats" aria-label="Report summary">
            <div className="qir-stat">
              <span>Sources</span>
              <strong>{sourceCount}</strong>
            </div>
            <div className="qir-stat">
              <span>Latest report</span>
              <strong>{latestReport ? new Date(latestReport).toLocaleDateString() : '-'}</strong>
            </div>
            <div className="qir-stat">
              <span>Storage</span>
              <strong>localStorage</strong>
            </div>
          </div>
        </section>

        <section className="qir-toolbar" aria-label="Report tools">
          <label className="qir-search">
            <Search size={18} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search issue, source, score ID..."
              aria-label="Search reports"
            />
          </label>
          <div className="qir-storage" title={QUESTION_ISSUE_REPORTS_KEY}>
            <Database size={17} aria-hidden="true" />
            <span>{QUESTION_ISSUE_REPORTS_KEY}</span>
          </div>
        </section>

        {reports.length === 0 ? (
          <section className="qir-empty">
            <div>
              <Inbox size={40} aria-hidden="true" />
              <strong>No reports yet</strong>
              <p>{language === 'bm' ? 'Belum ada laporan soalan disimpan dalam pelayar ini.' : 'No question reports are stored in this browser yet.'}</p>
            </div>
          </section>
        ) : filteredReports.length === 0 ? (
          <section className="qir-empty">
            <div>
              <FileWarning size={40} aria-hidden="true" />
              <strong>No matching reports</strong>
              <p>Try another issue, source, or score ID.</p>
            </div>
          </section>
        ) : (
          <section className="qir-list" aria-label="Question report list">
            {filteredReports.map((report) => {
              const reportNo = reports.indexOf(report) + 1;
              return (
                <article key={`${report.submittedAt}-${reportNo}`} className="qir-card">
                  <div className="qir-card-head">
                    <h2 className="qir-report-title">Report #{reportNo}</h2>
                    <div className="qir-card-meta">
                      <button type="button" className="qir-btn" onClick={() => setPreview(report)}>
                        <Eye size={17} aria-hidden="true" />
                        <span>View Evidence</span>
                      </button>
                      <button type="button" className="qir-btn" onClick={() => copyReport(report)}>
                        <Clipboard size={17} aria-hidden="true" />
                        <span>Copy Report</span>
                      </button>
                      <span className="qir-time">
                        {report.submittedAt ? new Date(report.submittedAt).toLocaleString() : ''}
                      </span>
                    </div>
                  </div>
                  <div className="qir-fields">
                    <Field label="Issue" value={report.issue} />
                    <Field label="Issue Type" value={report.issueType} />
                    <Field label="Question No" value={report.questionNo} />
                    <Field label="Question Type" value={report.question?.type} />
                    <Field label="Source" value={report.source} />
                    <Field label="Score ID" value={report.scoreId} />
                    <Field label="Selected" value={report.selected} />
                    <Field label="Correct Answer" value={report.correctAnswer ?? report.question?.answerVal ?? report.question?.answer} />
                    <Field label="Report ID" value={report.reportId} />
                    <Field label="Viewport" value={report.environment?.viewport ? `${report.environment.viewport.width} × ${report.environment.viewport.height} @ ${report.environment.viewport.devicePixelRatio || 1}x` : undefined} />
                    <Field label="Screenshot" value={report.screenshot ? 'Captured' : report.screenshotStatus} />
                    <Field label="Visible Text" value={report.visibleText} compact />
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>
      {preview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Question preview"
          className="qir-dialog-backdrop"
          onClick={() => setPreview(null)}
        >
          <section className="qir-dialog" onClick={(event) => event.stopPropagation()}>
            <div className="qir-dialog-head">
              <h2 className="qir-dialog-title">Report #{reports.indexOf(preview) + 1} Evidence</h2>
              <div className="qir-dialog-actions">
                <button type="button" className="qir-btn" onClick={() => copyReport(preview)}>
                  <Clipboard size={17} aria-hidden="true" />
                  <span>Copy Report</span>
                </button>
                <button type="button" className="qir-btn qir-icon-btn" onClick={() => setPreview(null)} aria-label="Close preview">
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="qir-evidence">
              {preview.screenshot && (
                <img className="qir-screenshot" src={preview.screenshot} alt="Exact learner screen when this report was submitted" />
              )}
              {!preview.screenshot && <CompareQuestionPreview question={preview.question} selected={preview.selected} />}
              <details className="qir-raw">
                <summary>Full diagnostic payload</summary>
                <pre>{JSON.stringify(exportableReport(preview), null, 2)}</pre>
              </details>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
