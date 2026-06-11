import React, { useEffect, useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';
import SpeechManager from '../../../../services/SpeechManager';

const TOPIC_ID = '3-2-2-kelancaran-membaca';
const ACCENT = '#1E7AC9';

const TEXTS = [
  {
    title: 'Lawatan ke Kuala Lumpur',
    label: 'Berita',
    text: 'Seramai 40 orang murid Tahun 3 dari SK Taman Murni telah mengadakan lawatan ke Kuala Lumpur pada hari Sabtu yang lalu. Mereka melawat Menara Kuala Lumpur dan Muzium Negara. Lawatan ini bertujuan untuk menambah ilmu pengetahuan.',
  },
  {
    title: 'Jualan Amal SK Taman Murni',
    label: 'Iklan',
    text: 'Jualan Amal SK Taman Murni. Tarikh: 15 Jun. Masa: 8 pagi hingga 12 tengah hari. Tempat: Dewan Serbaguna. Pelbagai gerakan makanan dan permainan disediakan. Masuk percuma!',
  },
  {
    title: 'Cara Membuat Kolaj',
    label: 'Manual',
    text: 'Langkah 1: Sediakan kertas lukisan, gunting, dan gam. Langkah 2: Guntingkan kertas warna mengikut bentuk yang dikehendaki. Langkah 3: Tampalkan kertas yang telah digunting pada kertas lukisan. Langkah 4: Hiaskan dengan bahan lain seperti daun atau butang.',
  },
  {
    title: 'Kempen Cintai Alam Sekitar',
    label: 'Ucapan',
    text: 'Marilah kita menjaga alam sekitar. Jangan buang sampah merata-rata. Guna semula barang yang masih elok. Setiap daripada kita boleh membantu menyelamatkan bumi kita yang tercinta.',
  },
];

function KelancaranMembacaLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [readingIdx, setReadingIdx] = useState(null);
  const [playingIdx, setPlayingIdx] = useState(null);

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handleListen = (idx, text) => {
    SpeechManager.stopSpeaking();
    setPlayingIdx(idx);
    SpeechManager.speak(text, 'ms-MY', { rate: 0.65, pitch: 1.05 });
  };

  return (
    <>
      <style>{`
        .kmb-learn-root { height:100dvh; overflow:hidden; background:linear-gradient(180deg,#EBF5FF 0%,#D5E9FA 50%,#B7D9F5 100%); font-family:'Fredoka',system-ui,sans-serif; display:flex; flex-direction:column; }
        .kmb-learn-topbar { flex-shrink:0; position:relative; display:flex; align-items:center; gap:4px; padding:10px 12px; min-height:44px; background:rgba(255,255,255,.88); backdrop-filter:blur(10px); border-bottom:1px solid rgba(0,0,0,.06); }
        .kmb-learn-topbar::after { content:''; flex:0 1 88px; }
        .kmb-learn-back { flex-shrink:0; display:flex; align-items:center; gap:4px; font-family:'Baloo 2',sans-serif; font-weight:700; font-size:13px; color:#64748B; background:none; border:none; cursor:pointer; padding:6px 10px; border-radius:10px; }
        .kmb-learn-back:hover { background:#F1F5F9; }
        @media (max-width:480px) { .kmb-back-label { display:none; } .kmb-learn-topbar::after { flex-basis:42px; } }
        .kmb-learn-title { flex:1; min-width:0; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(12px,3.4vw,14px); color:#1E293B; }
        .kmb-learn-body { flex:1; min-height:0; display:flex; flex-direction:column; align-items:center; width:100%; padding:clamp(6px,1.6vh,16px) 16px clamp(4px,1.2vh,12px); overflow:hidden; }
        .kmb-learn-heading { flex-shrink:0; text-align:center; width:100%; margin-bottom:clamp(8px,2vh,18px); }
        .kmb-learn-heading h1 { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(15px,min(4.4vw,4.2vh),24px); color:#1E293B; margin:0; }
        .kmb-learn-heading p { font-size:clamp(10px,min(2.6vw,1.8vh),13px); font-weight:500; color:#475569; margin:4px 0 0; }
        .kmb-scroll { flex:1; min-height:0; width:100%; max-width:560px; overflow-y:auto; padding:2px 4px; display:flex; flex-direction:column; gap:clamp(8px,1.4vh,14px); }
        .kmb-card { flex-shrink:0; background:#fff; border-radius:clamp(14px,2.4vw,18px); padding:clamp(10px,1.4vh,16px) clamp(12px,1.8vw,18px); border:2px solid ${ACCENT}18; box-shadow:0 4px 12px -6px rgba(0,0,0,.06); cursor:pointer; transition:all .2s ease; }
        .kmb-card:hover { border-color:${ACCENT}44; }
        .kmb-card.expanded { border-color:${ACCENT}; }
        .kmb-card-header { display:flex; align-items:center; justify-content:space-between; gap:10px; }
        .kmb-card-title { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(13px,min(3.2vw,2.8vh),17px); color:#1E293B; }
        .kmb-badge { font-size:clamp(9px,2vw,11px); font-weight:700; color:#fff; background:${ACCENT}; border-radius:999px; padding:2px 10px; }
        .kmb-card-toggle { flex-shrink:0; font-size:16px; color:${ACCENT}; transition:transform .2s ease; }
        .kmb-card-toggle.open { transform:rotate(180deg); }
        .kmb-card-content { overflow:hidden; max-height:0; transition:max-height .3s ease; }
        .kmb-card-content.open { max-height:400px; }
        .kmb-text { margin-top:10px; font-size:clamp(12px,min(2.8vw,2.2vh),15px); font-weight:600; color:#334155; line-height:1.7; padding:10px 12px; background:#F0F7FF; border-radius:12px; border-left:4px solid ${ACCENT}55; text-align:justify; }
        .kmb-listen-row { display:flex; align-items:center; justify-content:flex-end; gap:8px; margin-top:8px; }
        .kmb-listen-btn { font-family:'Baloo 2',sans-serif; font-weight:700; font-size:clamp(10px,2.2vw,12px); color:#fff; background:linear-gradient(180deg,${ACCENT}cc,${ACCENT}); border:none; border-radius:999px; padding:4px 14px; cursor:pointer; display:flex; align-items:center; gap:4px; }
        .kmb-listen-btn:hover { opacity:.9; }
        .kmb-listen-btn.playing { background:linear-gradient(180deg,#16A34A,#15803D); }
        .kmb-learn-cta { flex-shrink:0; text-align:center; width:100%; max-width:360px; margin-top:clamp(6px,1.4vh,14px); }
        .kmb-learn-cta-btn { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(14px,min(3.8vw,2.6vh),18px); cursor:pointer; border:none; border-radius:999px; padding:clamp(9px,1.8vh,13px) 28px; color:#fff; width:100%; background:linear-gradient(180deg,${ACCENT}cc,${ACCENT}); box-shadow:0 4px 0 ${ACCENT}66,0 10px 20px -10px ${ACCENT}80; transition:transform .12s ease,box-shadow .12s; }
        .kmb-learn-cta-btn:active { transform:translateY(2px); box-shadow:0 2px 0 ${ACCENT}66; }
        .kmb-learn-footer { flex-shrink:0; text-align:center; padding:clamp(2px,.6vh,6px) 16px clamp(4px,1vh,10px); font-size:10px; font-weight:500; color:#94A3B8; }
        @media (max-height:480px) { .kmb-learn-heading p,.kmb-learn-footer { display:none; } }
      `}</style>

      <div className="kmb-learn-root">
        <div className="kmb-learn-topbar">
          <button className="kmb-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span className="kmb-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="kmb-learn-title">{topicTitle}</span>
        </div>
        <div className="kmb-learn-body">
          <div className="kmb-learn-heading">
            <h1>{language === 'bm' ? 'Kelancaran Membaca 📖' : 'Reading Fluency 📖'}</h1>
            <p>{language === 'bm' ? 'Baca pelbagai jenis teks dengan lancar. Ketuk untuk buka dan dengar sebutan.' : 'Read various text types fluently. Tap to open and hear pronunciation.'}</p>
          </div>
          <div className="kmb-scroll">
            {TEXTS.map((t, i) => (
              <div key={i} className={`kmb-card${readingIdx === i ? ' expanded' : ''}`}
                onClick={() => setReadingIdx(readingIdx === i ? null : i)}>
                <div className="kmb-card-header">
                  <span className="kmb-card-title">{t.title}</span>
                  <span className="kmb-badge">{t.label}</span>
                  <span className={`kmb-card-toggle${readingIdx === i ? ' open' : ''}`}>▼</span>
                </div>
                <div className={`kmb-card-content${readingIdx === i ? ' open' : ''}`}>
                  <div className="kmb-text">{t.text}</div>
                  <div className="kmb-listen-row">
                    <button className={`kmb-listen-btn${playingIdx === i ? ' playing' : ''}`}
                      onClick={(e) => { e.stopPropagation(); handleListen(i, t.text); }}>
                      {playingIdx === i ? '🔊 Mendengar...' : '🔈 Dengar'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="kmb-learn-cta">
            <button className="kmb-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>
        <div className="kmb-learn-footer">Bahasa Melayu KSSR · {topicTitle}</div>
      </div>
    </>
  );
}

export default function KelancaranMembaca({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');
  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];
  const quiz = useBMQuiz(currentQs, reviewQs, 15);
  const topicTitle = language === 'bm' ? 'Kelancaran Membaca' : 'Reading Fluency';
  const handleBack = () => { onBack?.(); };
  if (page === 'learn')
    return <KelancaranMembacaLearnPage onBack={handleBack} onStartQuiz={() => setPage('quiz')} topicTitle={topicTitle} language={language} />;
  return <BMLessonQuizLayout onBack={handleBack} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic} topicTitle={topicTitle} quiz={quiz} language={language} accentColor={ACCENT} onShowLearn={() => setPage('learn')} />;
}
