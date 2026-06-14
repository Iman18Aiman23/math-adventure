import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '2-1-1c-pesanan-permintaan';
const ACCENT = '#E8821A';

const CATEGORIES = [
  {
    title: 'Pesanan',
    desc: 'Mesej untuk disampaikan kepada orang lain — ingat butirannya (siapa, apa, bila, di mana).',
    example: '"Beritahu emak: kelas tambahan Sabtu pukul lapan." → bila? Sabtu pukul lapan',
    usage: 'Tangkap maklumat penting.',
  },
  {
    title: 'Permintaan',
    desc: 'Meminta sesuatu atau bantuan dengan sopan — ingat apa yang diminta.',
    example: '"Minta tolong ambil beg biru di atas meja." → apa? beg biru',
    usage: 'Dengar butiran permintaan.',
  },
];

function PesananPermintaanLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <>
      <style>{`
        .kba-learn-root { height: 100dvh; overflow: hidden; background: linear-gradient(180deg, #FEF0E6 0%, #FDE0C6 50%, #FCCFA3 100%); font-family: 'Fredoka', system-ui, sans-serif; display: flex; flex-direction: column; }
        .kba-topbar { flex-shrink: 0; position: relative; display: flex; align-items: center; gap: 4px; padding: 10px 12px; min-height: 44px; background: rgba(255,255,255,.88); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(0,0,0,.06); }
        .kba-topbar::after { content: ''; flex: 0 1 88px; }
        .kba-back { flex-shrink: 0; display: flex; align-items: center; gap: 4px; font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 13px; color: #64748B; background: none; border: none; cursor: pointer; padding: 6px 10px; border-radius: 10px; }
        .kba-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) { .kba-back-label { display: none; } .kba-topbar::after { flex-basis: 42px; } }
        .kba-title { flex: 1; min-width: 0; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(12px, 3.4vw, 14px); color: #1E293B; }
        .kba-body { flex: 1; min-height: 0; display: flex; flex-direction: column; align-items: center; width: 100%; padding: clamp(6px, 1.6vh, 16px) 16px clamp(4px, 1.2vh, 12px); overflow: hidden; }
        .kba-heading { flex-shrink: 0; text-align: center; width: 100%; margin-bottom: clamp(8px, 2vh, 18px); }
        .kba-heading h1 { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(15px, min(4.4vw, 4.2vh), 24px); color: #1E293B; margin: 0; }
        .kba-heading p { font-size: clamp(10px, min(2.6vw, 1.8vh), 13px); font-weight: 500; color: #475569; margin: 4px 0 0; }
        .kba-cards { flex: 1; min-height: 0; width: 100%; max-width: 540px; overflow-y: auto; padding: 2px 4px; display: flex; flex-direction: column; gap: clamp(8px, 1.4vh, 14px); }
        .kba-card { flex-shrink: 0; background: #fff; border-radius: clamp(14px, 2.4vw, 18px); padding: clamp(10px, 1.4vh, 16px) clamp(12px, 1.8vw, 18px); border: 2px solid ${ACCENT}18; box-shadow: 0 4px 12px -6px rgba(0,0,0,.06); cursor: pointer; transition: all .2s ease; }
        .kba-card:hover { border-color: ${ACCENT}44; }
        .kba-card.expanded { border-color: ${ACCENT}; }
        .kba-card-header { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .kba-card-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(13px, min(3.2vw, 2.8vh), 17px); color: ${ACCENT}; }
        .kba-card-toggle { flex-shrink: 0; font-size: 16px; color: ${ACCENT}; transition: transform .2s ease; }
        .kba-card-toggle.open { transform: rotate(180deg); }
        .kba-card-content { overflow: hidden; max-height: 0; transition: max-height .3s ease; }
        .kba-card-content.open { max-height: 400px; }
        .kba-card-desc { margin-top: 8px; font-size: clamp(10px, min(2.4vw, 1.8vh), 13px); color: #64748B; font-weight: 500; font-style: italic; }
        .kba-card-example { margin-top: 8px; font-size: clamp(11px, min(2.6vw, 2vh), 14px); font-weight: 600; color: #334155; line-height: 1.6; padding: 8px 10px; background: #FFF5E8; border-radius: 10px; border-left: 4px solid ${ACCENT}55; }
        .kba-card-usage { margin-top: 6px; font-size: clamp(10px, min(2.2vw, 1.6vh), 12px); color: ${ACCENT}; font-weight: 700; }
        .kba-cta { flex-shrink: 0; text-align: center; width: 100%; max-width: 360px; margin-top: clamp(6px, 1.4vh, 14px); }
        .kba-cta-btn { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(14px, min(3.8vw, 2.6vh), 18px); cursor: pointer; border: none; border-radius: 999px; padding: clamp(9px, 1.8vh, 13px) 28px; color: #fff; width: 100%; background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT}); box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80; transition: transform .12s ease, box-shadow .12s; }
        .kba-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .kba-footer { flex-shrink: 0; text-align: center; padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px); font-size: 10px; font-weight: 500; color: #94A3B8; }
        @media (max-height: 480px) { .kba-heading p, .kba-footer { display: none; } }
      `}</style>

      <div className="kba-learn-root">
        <div className="kba-topbar">
          <button className="kba-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="kba-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="kba-title">{topicTitle}</span>
        </div>

        <div className="kba-body">
          <div className="kba-heading">
            <h1>{language === 'bm' ? 'Pesanan & Permintaan 📨' : 'Messages & Requests 📨'}</h1>
            <p>{language === 'bm' ? 'Ketuk untuk belajar cara sampaikan pesanan dan permintaan' : 'Tap to learn about messages and requests'}</p>
          </div>

          <div className="kba-cards">
            {CATEGORIES.map((c, i) => (
              <div key={i} className={`kba-card${expandedIdx === i ? ' expanded' : ''}`} onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}>
                <div className="kba-card-header">
                  <span className="kba-card-title">{c.title}</span>
                  <span className={`kba-card-toggle${expandedIdx === i ? ' open' : ''}`}>▼</span>
                </div>
                <div className={`kba-card-content${expandedIdx === i ? ' open' : ''}`}>
                  <div className="kba-card-desc">{c.desc}</div>
                  <div className="kba-card-example">📖 {c.example}</div>
                  <div className="kba-card-usage">💡 {c.usage}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="kba-cta">
            <button className="kba-cta-btn" onClick={onStartQuiz}>🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}</button>
          </div>
        </div>

        <div className="kba-footer">Bahasa Melayu KSSR · {topicTitle}</div>
      </div>
    </>
  );
}

export default function PesananPermintaan({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];
  const quiz = useBMQuiz(currentQs, reviewQs, 10);

  const topicTitle = language === 'bm' ? 'Pesanan & Permintaan' : 'Messages & Requests';

  if (page === 'learn') {
    return (
      <PesananPermintaanLearnPage
        onBack={() => onBack?.()}
        onStartQuiz={() => setPage('quiz')}
        topicTitle={topicTitle}
        language={language}
      />
    );
  }

  return (
    <BMLessonQuizLayout
      onBack={() => onBack?.()} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic}
      topicTitle={topicTitle}
      quiz={quiz}
      language={language}
      accentColor={ACCENT}
      onShowLearn={() => setPage('learn')}
      instructionMode
    />
  );
}
