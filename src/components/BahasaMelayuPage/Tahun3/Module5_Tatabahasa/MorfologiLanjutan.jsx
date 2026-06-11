import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '3-5-1-morfologi-lanjutan';
const ACCENT = '#159E96';

const CATEGORIES = [
  {
    title: 'Kata Hubung Pancangan',
    desc: 'Menghubungkan ayat utama dengan ayat kecil',
    examples: [
      'bahawa — "Saya tahu bahawa dia murid yang rajin."',
      'supaya — "Belajar bersungguh-sungguh supaya berjaya."',
      'semasa — "Dia menangis semasa mendengar berita."',
    ],
  },
  {
    title: 'Kata Sendi Nama',
    desc: 'Kata di hadapan kata nama',
    examples: [
      'di — "Buku itu di atas meja."',
      'ke — "Mereka pergi ke pantai."',
      'dari — "Dia datang dari Melaka."',
      'daripada — "Hadiah ini daripada Cikgu Siti."',
    ],
  },
  {
    title: 'Kata Sandang',
    desc: 'Kata yang menerangkan kata nama',
    examples: [
      'si — "Si comel itu kucing saya."',
      'sang — "Sang kancil bijak menipu."',
      'para — "Para pelajar mendengar dengan teliti."',
    ],
  },
  {
    title: 'Kata Banyak Makna',
    desc: 'Perkataan yang lebih dari satu makna',
    examples: [
      'tahi — "tahi lalat" ("tahi" bukan najis, tanda pada kulit)',
      'buah — "buah tangan" ("buah" bukan buah-buahan, bermaksud oleh-oleh)',
      'kaki — "kaki botol" ("kaki" bukan anggota badan, bahagian bawah botol)',
    ],
  },
];

function MorfologiLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <>
      <style>{`
        .ml-learn-root { height:100dvh; overflow:hidden; background:linear-gradient(180deg,#E6F6F4 0%,#C6E9E5 50%,#A0DBD4 100%); font-family:'Fredoka',system-ui,sans-serif; display:flex; flex-direction:column; }
        .ml-learn-topbar { flex-shrink:0; position:relative; display:flex; align-items:center; gap:4px; padding:10px 12px; min-height:44px; background:rgba(255,255,255,.88); backdrop-filter:blur(10px); border-bottom:1px solid rgba(0,0,0,.06); }
        .ml-learn-topbar::after { content:''; flex:0 1 88px; }
        .ml-learn-back { flex-shrink:0; display:flex; align-items:center; gap:4px; font-family:'Baloo 2',sans-serif; font-weight:700; font-size:13px; color:#64748B; background:none; border:none; cursor:pointer; padding:6px 10px; border-radius:10px; }
        .ml-learn-back:hover { background:#F1F5F9; }
        @media (max-width:480px) { .ml-back-label { display:none; } .ml-learn-topbar::after { flex-basis:42px; } }
        .ml-learn-title { flex:1; min-width:0; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(12px,3.4vw,14px); color:#1E293B; }
        .ml-learn-body { flex:1; min-height:0; display:flex; flex-direction:column; align-items:center; width:100%; padding:clamp(6px,1.6vh,16px) 16px clamp(4px,1.2vh,12px); overflow:hidden; }
        .ml-learn-heading { flex-shrink:0; text-align:center; width:100%; margin-bottom:clamp(8px,2vh,18px); }
        .ml-learn-heading h1 { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(15px,min(4.4vw,4.2vh),24px); color:#1E293B; margin:0; }
        .ml-learn-heading p { font-size:clamp(10px,min(2.6vw,1.8vh),13px); font-weight:500; color:#475569; margin:4px 0 0; }
        .ml-scroll { flex:1; min-height:0; width:100%; max-width:540px; overflow-y:auto; padding:2px 4px; display:flex; flex-direction:column; gap:clamp(8px,1.4vh,14px); }
        .ml-card { flex-shrink:0; background:#fff; border-radius:clamp(14px,2.4vw,18px); padding:clamp(10px,1.4vh,16px) clamp(12px,1.8vw,18px); border:2px solid ${ACCENT}18; box-shadow:0 4px 12px -6px rgba(0,0,0,.06); cursor:pointer; transition:all .2s ease; }
        .ml-card:hover { border-color:${ACCENT}44; }
        .ml-card.expanded { border-color:${ACCENT}; }
        .ml-card-header { display:flex; align-items:center; justify-content:space-between; gap:10px; }
        .ml-card-title { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(13px,min(3.2vw,2.8vh),17px); color:${ACCENT}; }
        .ml-card-toggle { flex-shrink:0; font-size:16px; color:${ACCENT}; transition:transform .2s ease; }
        .ml-card-toggle.open { transform:rotate(180deg); }
        .ml-card-content { overflow:hidden; max-height:0; transition:max-height .3s ease; }
        .ml-card-content.open { max-height:600px; }
        .ml-desc { margin-top:8px; font-size:clamp(10px,min(2.4vw,1.8vh),13px); color:#64748B; font-weight:500; font-style:italic; }
        .ml-examples { margin-top:6px; display:flex; flex-direction:column; gap:4px; }
        .ml-example { font-size:clamp(11px,min(2.6vw,2vh),14px); font-weight:600; color:#334155; line-height:1.5; padding:5px 10px; background:#F0FDF9; border-radius:8px; border-left:3px solid ${ACCENT}55; }
        .ml-learn-cta { flex-shrink:0; text-align:center; width:100%; max-width:360px; margin-top:clamp(6px,1.4vh,14px); }
        .ml-learn-cta-btn { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(14px,min(3.8vw,2.6vh),18px); cursor:pointer; border:none; border-radius:999px; padding:clamp(9px,1.8vh,13px) 28px; color:#fff; width:100%; background:linear-gradient(180deg,${ACCENT}cc,${ACCENT}); box-shadow:0 4px 0 ${ACCENT}66,0 10px 20px -10px ${ACCENT}80; transition:transform .12s ease,box-shadow .12s; }
        .ml-learn-cta-btn:active { transform:translateY(2px); box-shadow:0 2px 0 ${ACCENT}66; }
        .ml-learn-footer { flex-shrink:0; text-align:center; padding:clamp(2px,.6vh,6px) 16px clamp(4px,1vh,10px); font-size:10px; font-weight:500; color:#94A3B8; }
        @media (max-height:480px) { .ml-learn-heading p,.ml-learn-footer { display:none; } }
      `}</style>

      <div className="ml-learn-root">
        <div className="ml-learn-topbar">
          <button className="ml-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span className="ml-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="ml-learn-title">{topicTitle}</span>
        </div>
        <div className="ml-learn-body">
          <div className="ml-learn-heading">
            <h1>{language === 'bm' ? 'Morfologi Lanjutan 📚' : 'Advanced Morphology 📚'}</h1>
            <p>{language === 'bm' ? 'Pelajari kata hubung pancangan, kata sendi nama, kata sandang, dan kata banyak makna' : 'Learn subordinate conjunctions, prepositions, articles, and polysemous words'}</p>
          </div>
          <div className="ml-scroll">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className={`ml-card${expandedIdx === i ? ' expanded' : ''}`}
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}>
                <div className="ml-card-header">
                  <span className="ml-card-title">{cat.title}</span>
                  <span className={`ml-card-toggle${expandedIdx === i ? ' open' : ''}`}>▼</span>
                </div>
                <div className={`ml-card-content${expandedIdx === i ? ' open' : ''}`}>
                  <div className="ml-desc">{cat.desc}</div>
                  <div className="ml-examples">
                    {cat.examples.map((ex, j) => (
                      <div key={j} className="ml-example">📖 {ex}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="ml-learn-cta">
            <button className="ml-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>
        <div className="ml-learn-footer">Bahasa Melayu KSSR · {topicTitle}</div>
      </div>
    </>
  );
}

export default function MorfologiLanjutan({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');
  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];
  const quiz = useBMQuiz(currentQs, reviewQs, 15);
  const topicTitle = language === 'bm' ? 'Morfologi Lanjutan' : 'Advanced Morphology';
  const handleBack = () => { onBack?.(); };
  if (page === 'learn')
    return <MorfologiLearnPage onBack={handleBack} onStartQuiz={() => setPage('quiz')} topicTitle={topicTitle} language={language} />;
  return <BMLessonQuizLayout onBack={handleBack} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic} topicTitle={topicTitle} quiz={quiz} language={language} accentColor={ACCENT} onShowLearn={() => setPage('learn')} />;
}
