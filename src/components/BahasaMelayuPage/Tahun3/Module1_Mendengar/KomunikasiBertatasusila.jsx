import React, { useEffect, useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';
import SpeechManager from '../../../../services/SpeechManager';

const TOPIC_ID = '3-1-2-berkomunikasi';
const ACCENT = '#E8821A';

const SCENES = [
  {
    title: 'Meminta Tolong',
    polite: 'Tolong hantarkan buku ini kepada Cikgu Siti.',
    impolite: 'Hantarkan buku ini!',
    tip: 'Gunakan kata "tolong" semasa meminta pertolongan.',
  },
  {
    title: 'Memberi Salam',
    polite: 'Selamat pagi, Cikgu. Boleh saya masuk?',
    impolite: 'Saya nak masuk sekarang!',
    tip: 'Beri salam dan minta izin sebelum masuk.',
  },
  {
    title: 'Melayan Tetamu',
    polite: 'Selamat datang, jemput duduk. Nak minum?',
    impolite: 'Duduk sana. Apa nak?',
    tip: 'Sambut tetamu dengan mesra dan tawarkan minuman.',
  },
  {
    title: 'Meminta Maaf',
    polite: 'Maafkan saya, Cikgu. Saya sudah lewat.',
    impolite: 'Saya lewatlah!',
    tip: 'Gunakan kata "maaf" dan berikan alasan.',
  },
  {
    title: 'Menerima Pesanan',
    polite: 'Baik, ibu. Saya akan siapkan kerja rumah.',
    impolite: 'Ok, ok nanti buatlah.',
    tip: 'Gunakan "baik" dan ulang pesanan untuk sahkan.',
  },
];

function KomunikasiLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handlePlay = (key, text) => {
    SpeechManager.stopSpeaking();
    setPlaying(key);
    SpeechManager.speak(text, 'ms-MY', { rate: 0.72, pitch: 1.15 });
  };

  return (
    <>
      <style>{`
        .kb-learn-root { height:100dvh; overflow:hidden; background:linear-gradient(180deg,#FEF4E6 0%,#FAE0BB 50%,#F5C88E 100%); font-family:'Fredoka',system-ui,sans-serif; display:flex; flex-direction:column; }
        .kb-learn-topbar { flex-shrink:0; position:relative; display:flex; align-items:center; gap:4px; padding:10px 12px; min-height:44px; background:rgba(255,255,255,.88); backdrop-filter:blur(10px); border-bottom:1px solid rgba(0,0,0,.06); }
        .kb-learn-topbar::after { content:''; flex:0 1 88px; }
        .kb-learn-back { flex-shrink:0; display:flex; align-items:center; gap:4px; font-family:'Baloo 2',sans-serif; font-weight:700; font-size:13px; color:#64748B; background:none; border:none; cursor:pointer; padding:6px 10px; border-radius:10px; }
        .kb-learn-back:hover { background:#F1F5F9; }
        @media (max-width:480px) { .kb-back-label { display:none; } .kb-learn-topbar::after { flex-basis:42px; } }
        .kb-learn-title { flex:1; min-width:0; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(12px,3.4vw,14px); color:#1E293B; }
        .kb-learn-body { flex:1; min-height:0; display:flex; flex-direction:column; align-items:center; width:100%; padding:clamp(6px,1.6vh,16px) 16px clamp(4px,1.2vh,12px); overflow:hidden; }
        .kb-learn-heading { flex-shrink:0; text-align:center; width:100%; margin-bottom:clamp(8px,2vh,18px); }
        .kb-learn-heading h1 { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(15px,min(4.4vw,4.2vh),24px); color:#1E293B; margin:0; }
        .kb-learn-heading p { font-size:clamp(10px,min(2.6vw,1.8vh),13px); font-weight:500; color:#475569; margin:4px 0 0; }
        .kb-scroll { flex:1; min-height:0; width:100%; max-width:540px; overflow-y:auto; padding:2px 4px; display:flex; flex-direction:column; gap:clamp(8px,1.4vh,14px); }
        .kb-card { flex-shrink:0; background:#fff; border-radius:clamp(14px,2.4vw,18px); padding:clamp(10px,1.4vh,16px) clamp(12px,1.8vw,18px); border:2px solid ${ACCENT}18; box-shadow:0 4px 12px -6px rgba(0,0,0,.06); }
        .kb-card-title { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(13px,min(3.2vw,2.8vh),17px); color:${ACCENT}; margin-bottom:8px; }
        .kb-compare { display:flex; flex-direction:column; gap:4px; margin-bottom:6px; }
        .kb-line { display:flex; align-items:center; gap:6px; padding:4px 8px; border-radius:8px; font-size:clamp(11px,min(2.6vw,2vh),14px); font-weight:600; }
        .kb-line-good { background:#F0FDF4; color:#166534; }
        .kb-line-bad { background:#FEF2F2; color:#991B1B; }
        .kb-line-icon { flex-shrink:0; font-size:14px; }
        .kb-btn { flex-shrink:0; background:none; border:none; font-size:14px; cursor:pointer; padding:2px 6px; border-radius:6px; }
        .kb-tip { font-size:clamp(9px,2vw,11px); color:${ACCENT}; font-weight:600; margin-top:4px; display:flex; align-items:center; gap:4px; }
        .kb-learn-cta { flex-shrink:0; text-align:center; width:100%; max-width:360px; margin-top:clamp(6px,1.4vh,14px); }
        .kb-learn-cta-btn { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(14px,min(3.8vw,2.6vh),18px); cursor:pointer; border:none; border-radius:999px; padding:clamp(9px,1.8vh,13px) 28px; color:#fff; width:100%; background:linear-gradient(180deg,${ACCENT}cc,${ACCENT}); box-shadow:0 4px 0 ${ACCENT}66,0 10px 20px -10px ${ACCENT}80; transition:transform .12s ease,box-shadow .12s; }
        .kb-learn-cta-btn:active { transform:translateY(2px); box-shadow:0 2px 0 ${ACCENT}66; }
        .kb-learn-footer { flex-shrink:0; text-align:center; padding:clamp(2px,.6vh,6px) 16px clamp(4px,1vh,10px); font-size:10px; font-weight:500; color:#94A3B8; }
        @media (max-height:480px) { .kb-learn-heading p,.kb-learn-footer { display:none; } }
      `}</style>

      <div className="kb-learn-root">
        <div className="kb-learn-topbar">
          <button className="kb-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span className="kb-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="kb-learn-title">{topicTitle}</span>
        </div>
        <div className="kb-learn-body">
          <div className="kb-learn-heading">
            <h1>{language === 'bm' ? 'Berkomunikasi secara Bertatasusila 🗣️' : 'Communicating Politely 🗣️'}</h1>
            <p>{language === 'bm' ? 'Bandingkan cara bercakap yang sopan dan kurang sopan' : 'Compare polite and impolite ways of speaking'}</p>
          </div>
          <div className="kb-scroll">
            {SCENES.map((s, i) => (
              <div key={i} className="kb-card">
                <div className="kb-card-title">{s.title}</div>
                <div className="kb-compare">
                  <div className="kb-line kb-line-good">
                    <span className="kb-line-icon">✅</span>
                    <span style={{flex:1}}>{s.polite}</span>
                    <button className="kb-btn" onClick={() => handlePlay(`p${i}`, s.polite)}>
                      {playing === `p${i}` ? '🔊' : '🔈'}
                    </button>
                  </div>
                  <div className="kb-line kb-line-bad">
                    <span className="kb-line-icon">❌</span>
                    <span style={{flex:1}}>{s.impolite}</span>
                    <button className="kb-btn" onClick={() => handlePlay(`b${i}`, s.impolite)}>
                      {playing === `b${i}` ? '🔊' : '🔈'}
                    </button>
                  </div>
                </div>
                <div className="kb-tip">💡 {s.tip}</div>
              </div>
            ))}
          </div>
          <div className="kb-learn-cta">
            <button className="kb-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>
        <div className="kb-learn-footer">Bahasa Melayu KSSR · {topicTitle}</div>
      </div>
    </>
  );
}

export default function KomunikasiBertatasusila({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');
  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];
  const quiz = useBMQuiz(currentQs, reviewQs, 15);
  const topicTitle = language === 'bm' ? 'Berkomunikasi secara Bertatasusila' : 'Communicating Politely';
  const handleBack = () => { onBack?.(); };
  if (page === 'learn')
    return <KomunikasiLearnPage onBack={handleBack} onStartQuiz={() => setPage('quiz')} topicTitle={topicTitle} language={language} />;
  return <BMLessonQuizLayout onBack={handleBack} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic} topicTitle={topicTitle} quiz={quiz} language={language} accentColor={ACCENT} onShowLearn={() => setPage('learn')} />;
}
