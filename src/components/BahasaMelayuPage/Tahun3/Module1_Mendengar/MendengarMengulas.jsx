import React, { useEffect, useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';
import SpeechManager from '../../../../services/SpeechManager';

const TOPIC_ID = '3-1-1-mendengar-mengulas';
const ACCENT = '#E8821A';

const DIALOGUES = [
  {
    title: 'Di Kantin Sekolah',
    speaker: 'Ali',
    text: 'Cikgu, saya hendak membeli nasi lemak. Berapa harganya?',
    reply: 'Nasi lemak satu ringgit, Ali. Jangan lupa minum air ya.',
    listenLabel: 'Dengar dialog',
  },
  {
    title: 'Di Perpustakaan',
    speaker: 'Siti',
    text: 'Cikgu, saya mahu pinjam buku cerita ini. Bolehkah?',
    reply: 'Tentu boleh. Ingat pulangkan dalam masa seminggu ya.',
    listenLabel: 'Dengar dialog',
  },
  {
    title: 'Di Padang',
    speaker: 'Ahmad',
    text: 'Tolong hantarkan bola itu kepada saya!',
    reply: 'Baik, Ahmad. Tangkap bola ini!',
    listenLabel: 'Dengar dialog',
  },
];

function MendengarMengulasLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handleListen = (idx, text) => {
    SpeechManager.stopSpeaking();
    setPlaying(idx);
    SpeechManager.speak(text, 'ms-MY', { rate: 0.72, pitch: 1.1 });
  };

  return (
    <>
      <style>{`
        .mu-learn-root { height:100dvh; overflow:hidden; background:linear-gradient(180deg,#FEF4E6 0%,#FAE0BB 50%,#F5C88E 100%); font-family:'Fredoka',system-ui,sans-serif; display:flex; flex-direction:column; }
        .mu-learn-topbar { flex-shrink:0; position:relative; display:flex; align-items:center; gap:4px; padding:10px 12px; min-height:44px; background:rgba(255,255,255,.88); backdrop-filter:blur(10px); border-bottom:1px solid rgba(0,0,0,.06); }
        .mu-learn-topbar::after { content:''; flex:0 1 88px; }
        .mu-learn-back { flex-shrink:0; display:flex; align-items:center; gap:4px; font-family:'Baloo 2',sans-serif; font-weight:700; font-size:13px; color:#64748B; background:none; border:none; cursor:pointer; padding:6px 10px; border-radius:10px; }
        .mu-learn-back:hover { background:#F1F5F9; }
        @media (max-width:480px) { .mu-back-label { display:none; } .mu-learn-topbar::after { flex-basis:42px; } }
        .mu-learn-title { flex:1; min-width:0; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(12px,3.4vw,14px); color:#1E293B; }
        .mu-learn-body { flex:1; min-height:0; display:flex; flex-direction:column; align-items:center; width:100%; padding:clamp(6px,1.6vh,16px) 16px clamp(4px,1.2vh,12px); overflow:hidden; }
        .mu-learn-heading { flex-shrink:0; text-align:center; width:100%; margin-bottom:clamp(8px,2vh,18px); }
        .mu-learn-heading h1 { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(15px,min(4.4vw,4.2vh),24px); color:#1E293B; margin:0; }
        .mu-learn-heading p { font-size:clamp(10px,min(2.6vw,1.8vh),13px); font-weight:500; color:#475569; margin:4px 0 0; }
        .mu-scroll { flex:1; min-height:0; width:100%; max-width:540px; overflow-y:auto; padding:2px 4px; display:flex; flex-direction:column; gap:clamp(8px,1.4vh,14px); }
        .mu-card { flex-shrink:0; background:#fff; border-radius:clamp(14px,2.4vw,18px); padding:clamp(12px,1.6vh,18px) clamp(14px,2vw,20px); border:2px solid ${ACCENT}18; box-shadow:0 4px 12px -6px rgba(0,0,0,.06); }
        .mu-card-title { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(14px,min(3.4vw,3vh),18px); color:${ACCENT}; margin-bottom:8px; display:flex; align-items:center; gap:6px; }
        .mu-speech { display:flex; align-items:flex-start; gap:8px; margin-bottom:6px; }
        .mu-bubble { flex:1; background:#FFF7ED; border-radius:12px; padding:8px 12px; border:1.5px solid #FED7AA; }
        .mu-bubble-label { font-size:clamp(9px,2vw,11px); font-weight:700; color:${ACCENT}; margin-bottom:2px; }
        .mu-bubble-text { font-size:clamp(12px,min(2.8vw,2.2vh),15px); font-weight:600; color:#334155; line-height:1.5; }
        .mu-listen-btn { flex-shrink:0; background:none; border:none; font-size:18px; cursor:pointer; padding:6px; border-radius:50%; transition:background .15s; }
        .mu-listen-btn:hover { background:#FEF3C7; }
        .mu-listen-btn.playing { background:#DCFCE7; }
        .mu-learn-cta { flex-shrink:0; text-align:center; width:100%; max-width:360px; margin-top:clamp(6px,1.4vh,14px); }
        .mu-learn-cta-btn { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(14px,min(3.8vw,2.6vh),18px); cursor:pointer; border:none; border-radius:999px; padding:clamp(9px,1.8vh,13px) 28px; color:#fff; width:100%; background:linear-gradient(180deg,${ACCENT}cc,${ACCENT}); box-shadow:0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80; transition:transform .12s ease,box-shadow .12s; }
        .mu-learn-cta-btn:active { transform:translateY(2px); box-shadow:0 2px 0 ${ACCENT}66; }
        .mu-learn-footer { flex-shrink:0; text-align:center; padding:clamp(2px,.6vh,6px) 16px clamp(4px,1vh,10px); font-size:10px; font-weight:500; color:#94A3B8; }
        @media (max-height:480px) { .mu-learn-heading p,.mu-learn-footer { display:none; } }
      `}</style>

      <div className="mu-learn-root">
        <div className="mu-learn-topbar">
          <button className="mu-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span className="mu-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="mu-learn-title">{topicTitle}</span>
        </div>
        <div className="mu-learn-body">
          <div className="mu-learn-heading">
            <h1>{language === 'bm' ? 'Mendengar & Mengulas 👂' : 'Listening & Responding 👂'}</h1>
            <p>{language === 'bm' ? 'Dengar dialog dan fahami maksudnya' : 'Listen to dialogues and understand their meaning'}</p>
          </div>
          <div className="mu-scroll">
            {DIALOGUES.map((d, i) => (
              <div key={i} className="mu-card">
                <div className="mu-card-title">💬 {d.title}</div>
                <div className="mu-speech">
                  <div className="mu-bubble">
                    <div className="mu-bubble-label">{d.speaker}:</div>
                    <div className="mu-bubble-text">{d.text}</div>
                  </div>
                  <button className={`mu-listen-btn${playing === i ? ' playing' : ''}`}
                    onClick={() => handleListen(i, d.text)}>
                    {playing === i ? '🔊' : '🔈'}
                  </button>
                </div>
                <div className="mu-speech">
                  <div className="mu-bubble">
                    <div className="mu-bubble-label">{language === 'bm' ? 'Respons:' : 'Reply:'}</div>
                    <div className="mu-bubble-text">{d.reply}</div>
                  </div>
                  <button className={`mu-listen-btn${playing === i+10 ? ' playing' : ''}`}
                    onClick={() => handleListen(i+10, d.reply)}>
                    {playing === i+10 ? '🔊' : '🔈'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mu-learn-cta">
            <button className="mu-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>
        <div className="mu-learn-footer">Bahasa Melayu KSSR · {topicTitle}</div>
      </div>
    </>
  );
}

export default function MendengarMengulas({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');
  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];
  const quiz = useBMQuiz(currentQs, reviewQs, 15);
  const topicTitle = language === 'bm' ? 'Mendengar & Mengulas' : 'Listening & Responding';
  const handleBack = () => { onBack?.(); };
  if (page === 'learn')
    return <MendengarMengulasLearnPage onBack={handleBack} onStartQuiz={() => setPage('quiz')} topicTitle={topicTitle} language={language} />;
  return <BMLessonQuizLayout onBack={handleBack} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic} topicTitle={topicTitle} quiz={quiz} language={language} accentColor={ACCENT} onShowLearn={() => setPage('learn')} />;
}
