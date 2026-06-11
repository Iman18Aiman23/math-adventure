import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '3-3-1-menulis-karangan';
const ACCENT = '#7A4FD0';

const EXAMPLES = [
  {
    title: 'Karangan Naratif: Hari Sukan',
    parts: [
      'Pendahuluan: Hari Sukan diadakan di padang sekolah. Semua murid berpakaian sukan.',
      'Isi: Acara bermula pada pukul 8 pagi. Acara larian 100 meter dimenangi oleh Ali. Acara lompat jauh pula dimenangi oleh Siti.',
      'Penutup: Hari Sukan tamat pada pukul 12 tengah hari. Semua berasa gembira.',
    ],
  },
  {
    title: 'Karangan Biografi: Ibu Saya',
    parts: [
      'Pendahuluan: Nama ibu saya Aminah. Beliau seorang guru.',
      'Isi: Ibu mengajar di SK Taman Murni. Ibu sangat rajin dan penyayang. Setiap pagi, ibu menyediakan sarapan untuk kami.',
      'Penutup: Saya sangat sayang akan ibu. Saya mahu menjadi seperti ibu.',
    ],
  },
  {
    title: 'Karangan Fakta: Kucing',
    parts: [
      'Pendahuluan: Kucing ialah haiwan peliharaan yang comel.',
      'Isi: Kucing mempunyai empat kaki, dua mata yang tajam, dan misai. Kucing suka makan ikan dan minum susu. Kucing juga suka bermain dengan bola benang.',
      'Penutup: Kucing merupakan haiwan yang setia dan mudah dijaga.',
    ],
  },
];

function KaranganLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <>
      <style>{`
        .kr-learn-root { height:100dvh; overflow:hidden; background:linear-gradient(180deg,#F0EBFB 0%,#DCD2F4 50%,#C4B5ED 100%); font-family:'Fredoka',system-ui,sans-serif; display:flex; flex-direction:column; }
        .kr-learn-topbar { flex-shrink:0; position:relative; display:flex; align-items:center; gap:4px; padding:10px 12px; min-height:44px; background:rgba(255,255,255,.88); backdrop-filter:blur(10px); border-bottom:1px solid rgba(0,0,0,.06); }
        .kr-learn-topbar::after { content:''; flex:0 1 88px; }
        .kr-learn-back { flex-shrink:0; display:flex; align-items:center; gap:4px; font-family:'Baloo 2',sans-serif; font-weight:700; font-size:13px; color:#64748B; background:none; border:none; cursor:pointer; padding:6px 10px; border-radius:10px; }
        .kr-learn-back:hover { background:#F1F5F9; }
        @media (max-width:480px) { .kr-back-label { display:none; } .kr-learn-topbar::after { flex-basis:42px; } }
        .kr-learn-title { flex:1; min-width:0; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(12px,3.4vw,14px); color:#1E293B; }
        .kr-learn-body { flex:1; min-height:0; display:flex; flex-direction:column; align-items:center; width:100%; padding:clamp(6px,1.6vh,16px) 16px clamp(4px,1.2vh,12px); overflow:hidden; }
        .kr-learn-heading { flex-shrink:0; text-align:center; width:100%; margin-bottom:clamp(8px,2vh,18px); }
        .kr-learn-heading h1 { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(15px,min(4.4vw,4.2vh),24px); color:#1E293B; margin:0; }
        .kr-learn-heading p { font-size:clamp(10px,min(2.6vw,1.8vh),13px); font-weight:500; color:#475569; margin:4px 0 0; }
        .kr-scroll { flex:1; min-height:0; width:100%; max-width:540px; overflow-y:auto; padding:2px 4px; display:flex; flex-direction:column; gap:clamp(8px,1.4vh,14px); }
        .kr-card { flex-shrink:0; background:#fff; border-radius:clamp(14px,2.4vw,18px); padding:clamp(10px,1.4vh,16px) clamp(12px,1.8vw,18px); border:2px solid ${ACCENT}18; box-shadow:0 4px 12px -6px rgba(0,0,0,.06); cursor:pointer; transition:all .2s ease; }
        .kr-card:hover { border-color:${ACCENT}44; }
        .kr-card.expanded { border-color:${ACCENT}; }
        .kr-card-header { display:flex; align-items:center; justify-content:space-between; gap:10px; }
        .kr-card-title { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(13px,min(3.2vw,2.8vh),17px); color:#1E293B; }
        .kr-card-toggle { flex-shrink:0; font-size:16px; color:${ACCENT}; transition:transform .2s ease; }
        .kr-card-toggle.open { transform:rotate(180deg); }
        .kr-card-content { overflow:hidden; max-height:0; transition:max-height .3s ease; }
        .kr-card-content.open { max-height:600px; }
        .kr-part { font-size:clamp(11px,min(2.6vw,2vh),14px); font-weight:500; color:#334155; line-height:1.6; padding:6px 10px; margin-top:6px; border-radius:8px; }
        .kr-part:nth-child(1) { background:#F8F5FF; border-left:3px solid ${ACCENT}; }
        .kr-part:nth-child(2) { background:#F0FDF4; border-left:3px solid #16A34A; }
        .kr-part:nth-child(3) { background:#FFF7ED; border-left:3px solid #F59E0B; }
        .kr-learn-cta { flex-shrink:0; text-align:center; width:100%; max-width:360px; margin-top:clamp(6px,1.4vh,14px); }
        .kr-learn-cta-btn { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(14px,min(3.8vw,2.6vh),18px); cursor:pointer; border:none; border-radius:999px; padding:clamp(9px,1.8vh,13px) 28px; color:#fff; width:100%; background:linear-gradient(180deg,${ACCENT}cc,${ACCENT}); box-shadow:0 4px 0 ${ACCENT}66,0 10px 20px -10px ${ACCENT}80; transition:transform .12s ease,box-shadow .12s; }
        .kr-learn-cta-btn:active { transform:translateY(2px); box-shadow:0 2px 0 ${ACCENT}66; }
        .kr-learn-footer { flex-shrink:0; text-align:center; padding:clamp(2px,.6vh,6px) 16px clamp(4px,1vh,10px); font-size:10px; font-weight:500; color:#94A3B8; }
        @media (max-height:480px) { .kr-learn-heading p,.kr-learn-footer { display:none; } }
      `}</style>

      <div className="kr-learn-root">
        <div className="kr-learn-topbar">
          <button className="kr-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span className="kr-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="kr-learn-title">{topicTitle}</span>
        </div>
        <div className="kr-learn-body">
          <div className="kr-learn-heading">
            <h1>{language === 'bm' ? 'Menulis Karangan ✍️' : 'Essay Writing ✍️'}</h1>
            <p>{language === 'bm' ? 'Lihat contoh karangan dengan pendahuluan, isi, dan penutup' : 'See essay examples with introduction, content, and conclusion'}</p>
          </div>
          <div className="kr-scroll">
            {EXAMPLES.map((ex, i) => (
              <div key={i} className={`kr-card${expandedIdx === i ? ' expanded' : ''}`}
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}>
                <div className="kr-card-header">
                  <span className="kr-card-title">{ex.title}</span>
                  <span className={`kr-card-toggle${expandedIdx === i ? ' open' : ''}`}>▼</span>
                </div>
                <div className={`kr-card-content${expandedIdx === i ? ' open' : ''}`}>
                  {ex.parts.map((p, j) => (
                    <div key={j} className="kr-part">{p}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="kr-learn-cta">
            <button className="kr-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>
        <div className="kr-learn-footer">Bahasa Melayu KSSR · {topicTitle}</div>
      </div>
    </>
  );
}

export default function MenulisKarangan({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');
  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];
  const quiz = useBMQuiz(currentQs, reviewQs, 15);
  const topicTitle = language === 'bm' ? 'Menulis Karangan' : 'Essay Writing';
  const handleBack = () => { onBack?.(); };
  if (page === 'learn')
    return <KaranganLearnPage onBack={handleBack} onStartQuiz={() => setPage('quiz')} topicTitle={topicTitle} language={language} />;
  return <BMLessonQuizLayout onBack={handleBack} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic} topicTitle={topicTitle} quiz={quiz} language={language} accentColor={ACCENT} onShowLearn={() => setPage('learn')} />;
}
