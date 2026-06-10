import React, { useEffect, useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';
import SpeechManager from '../../../../services/SpeechManager';

const TOPIC_ID = '1-4-1-keindahan-bahasa';
const ACCENT = '#EC4899';

const DIALOGUES = [
  {
    title: 'Di Kantin',
    lines: [
      { speaker: 'Ali', text: 'Selamat pagi, Cikgu!' },
      { speaker: 'Cikgu Siti', text: 'Selamat pagi, Ali. Dah sarapan?' },
      { speaker: 'Ali', text: 'Belum lagi, Cikgu. Saya nak beli nasi lemak.' },
      { speaker: 'Cikgu Siti', text: 'Bagus. Jangan lupa minum air ya.' },
      { speaker: 'Ali', text: 'Baik, Cikgu. Terima kasih!' },
    ],
  },
  {
    title: 'Di Perpustakaan',
    lines: [
      { speaker: 'Cikgu Rina', text: 'Murid-murid, jangan bising di perpustakaan.' },
      { speaker: 'Ani', text: 'Maaf, Cikgu. Kami nak pinjam buku.' },
      { speaker: 'Cikgu Rina', text: 'Boleh. Pilih buku yang kamu suka.' },
      { speaker: 'Adam', text: 'Saya nak pinjam buku cerita, Cikgu.' },
      { speaker: 'Cikgu Rina', text: 'Bagus, Adam. Rajin membaca ya.' },
    ],
  },
];

const PANTUNS = [
  {
    lines: 'Pergi ke kedai membeli gula,\nJangan lupa beli sebuku roti.\nBelajar rajin di sekolah,\nSupaya pandai dan berbakti.',
    style: 'Pantun Empat Kerat',
  },
  {
    lines: 'Pokok kelura tumbuh di tebing,\nBuahnya masak dimakan helang.\nKalau nak hidup bersenang,\nRajinlah belajar berpesan-pesann.',
    style: 'Pantun Empat Kerat',
  },
  {
    lines: 'Pisang emas dibawa belayar,\nMasak sebiji di atas peti.\nHutang emas boleh dibayar,\nHutang budi dibawa mati.',
    style: 'Pantun Empat Kerat',
  },
];

const SONGS = [
  {
    title: 'Bangun Pagi',
    lyrics: 'Bangun pagi, gosok gigi,\nCuci muka, pakai baju.\nPergi sekolah dengan hati gembira,\nBelajar rajin bersama-sama.',
  },
  {
    title: 'Sayang Keluarga',
    lyrics: 'Ayah, ibu, kakak, abang,\nSayang semuanya tidak terbilang.\nAdik kecil comel dan manja,\nKeluarga bahagia selama-lamanya.',
  },
];

function KeindahanLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [tab, setTab] = useState('dialog');
  const [playingLine, setPlayingLine] = useState(null);

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handleSpeak = (text, idx) => {
    SpeechManager.stopSpeaking();
    setPlayingLine(idx);
    SpeechManager.speak(text, 'ms-MY', { rate: 0.8, pitch: 1.1 });
  };

  return (
    <>
      <style>{`
        .kib-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #FEF1F7 0%, #FCE7F3 50%, #F9D5E7 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .kib-learn-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; justify-content: center;
          padding: 10px 16px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .kib-learn-back {
          position: absolute; left: 12px;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .kib-learn-back:hover { background: #F1F5F9; }
        .kib-learn-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: 14px; color: #1E293B;
        }
        .kib-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(8px, 1.6vh, 16px) 16px;
          overflow: hidden;
        }
        .kib-tabs {
          flex-shrink: 0;
          display: flex; gap: 6px;
          background: #fff; border-radius: 14px;
          padding: 4px;
          margin-bottom: clamp(8px, 1.6vh, 14px);
          width: 100%; max-width: 520px;
          box-shadow: 0 2px 8px rgba(0,0,0,.06);
        }
        .kib-tab {
          flex: 1; text-align: center;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(10px, 2.2vw, 13px);
          padding: clamp(5px, .8vh, 7px) 6px;
          border: none; border-radius: 11px;
          cursor: pointer;
          background: transparent;
          color: #94A3B8;
          transition: all .2s ease;
        }
        .kib-tab.active {
          background: ${ACCENT};
          color: #fff;
          box-shadow: 0 2px 6px ${ACCENT}44;
        }
        .kib-content {
          flex: 1; min-height: 0; width: 100%; max-width: 520px;
          overflow-y: auto;
          padding: 2px 4px;
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.4vh, 12px);
        }
        .kib-section-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, 3.2vw, 17px);
          color: #1E293B;
          margin-bottom: 2px;
        }
        .kib-card {
          background: #fff; border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(12px, 1.6vh, 16px) clamp(14px, 2vw, 20px);
          border: 2px solid ${ACCENT}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
        }
        .kib-card-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 3vw, 16px);
          color: ${ACCENT};
          margin-bottom: 8px;
        }
        .kib-dialog-line {
          display: flex; align-items: flex-start; gap: 8px;
          padding: 4px 0;
        }
        .kib-dialog-speaker {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(11px, 2.4vw, 13px);
          color: ${ACCENT};
          flex-shrink: 0;
          min-width: 70px;
        }
        .kib-dialog-text {
          flex: 1;
          font-size: clamp(12px, 2.6vw, 15px);
          font-weight: 600; color: #334155;
          line-height: 1.5;
        }
        .kib-dialog-btn {
          flex-shrink: 0;
          font-size: 16px; cursor: pointer;
          background: none; border: none;
          padding: 2px 6px;
          opacity: .5;
          transition: opacity .2s;
        }
        .kib-dialog-btn:hover { opacity: 1; }
        .kib-dialog-btn.playing { opacity: 1; }
        .kib-pantun-text {
          font-family: 'Baloo 2', sans-serif; font-style: italic;
          font-size: clamp(13px, min(3vw, 2.6vh), 16px);
          font-weight: 600; color: #334155;
          line-height: 1.8;
          white-space: pre-line;
          padding: clamp(8px, 1.2vh, 12px);
          background: #FDF2F8;
          border-radius: 12px;
          border-left: 4px solid ${ACCENT}55;
        }
        .kib-pantun-style {
          font-size: clamp(10px, 2.2vw, 12px);
          font-weight: 500; color: ${ACCENT};
          margin-top: 6px;
        }
        .kib-song-card {
          background: #fff; border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(12px, 1.6vh, 16px) clamp(14px, 2vw, 20px);
          border: 2px solid ${ACCENT}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
        }
        .kib-song-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, 3.2vw, 17px);
          color: ${ACCENT};
          margin-bottom: 8px;
        }
        .kib-song-lyrics {
          font-size: clamp(12px, 2.6vw, 15px);
          font-weight: 600; color: #334155;
          line-height: 1.8;
          white-space: pre-line;
        }
        .kib-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(6px, 1.2vh, 12px);
        }
        .kib-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .kib-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .kib-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .kib-learn-footer { display: none; }
        }
      `}</style>

      <div className="kib-learn-root">
        <div className="kib-learn-topbar">
          <button className="kib-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
          <span className="kib-learn-title">{topicTitle}</span>
        </div>

        <div className="kib-learn-body">
          <div className="kib-tabs">
            {[
              { id: 'dialog', label: language === 'bm' ? '🎭 Dialog' : '🎭 Dialog' },
              { id: 'pantun', label: language === 'bm' ? '📜 Pantun' : '📜 Pantun' },
              { id: 'lagu', label: language === 'bm' ? '🎵 Lagu' : '🎵 Song' },
            ].map(t => (
              <button key={t.id}
                className={`kib-tab${tab === t.id ? ' active' : ''}`}
                onClick={() => setTab(t.id)}
              >{t.label}</button>
            ))}
          </div>

          <div className="kib-content">
            {tab === 'dialog' && (
              <>
                <div className="kib-section-title">
                  🎬 {language === 'bm' ? 'Dialog — Latih Sebutan & Intonasi' : 'Dialogues — Practice Pronunciation & Intonation'}
                </div>
                {DIALOGUES.map((d, i) => (
                  <div key={i} className="kib-card">
                    <div className="kib-card-title">{d.title}</div>
                    {d.lines.map((l, j) => (
                      <div key={j} className="kib-dialog-line">
                        <span className="kib-dialog-speaker">{l.speaker}:</span>
                        <span className="kib-dialog-text">{l.text}</span>
                        <button
                          className={`kib-dialog-btn${playingLine === `${i}-${j}` ? ' playing' : ''}`}
                          onClick={() => handleSpeak(l.text, `${i}-${j}`)}
                          aria-label={`Speak ${l.text}`}
                        >🔊</button>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}

            {tab === 'pantun' && (
              <>
                <div className="kib-section-title">
                  📜 {language === 'bm' ? 'Pantun — Lafaz dengan Irama' : 'Pantun — Recite with Rhythm'}
                </div>
                {PANTUNS.map((p, i) => (
                  <div key={i} className="kib-card">
                    <div className="kib-pantun-text">{p.lines}</div>
                    <div className="kib-pantun-style">{p.style}</div>
                  </div>
                ))}
              </>
            )}

            {tab === 'lagu' && (
              <>
                <div className="kib-section-title">
                  🎵 {language === 'bm' ? 'Lagu Kanak-Kanak' : "Children's Songs"}
                </div>
                {SONGS.map((s, i) => (
                  <div key={i} className="kib-song-card">
                    <div className="kib-song-title">🎶 {s.title}</div>
                    <div className="kib-song-lyrics">{s.lyrics}</div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="kib-learn-cta">
            <button className="kib-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>

        <div className="kib-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}

export default function KeindahanBahasa({ onBack, language = 'bm', topicComplete }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Menghayati Keindahan Bahasa' : 'Appreciating the Beauty of Language';

  const handleBack = () => {
    topicComplete?.(TOPIC_ID);
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <KeindahanLearnPage
        onBack={handleBack}
        onStartQuiz={() => setPage('quiz')}
        topicTitle={topicTitle}
        language={language}
      />
    );
  }

  return (
    <BMLessonQuizLayout
      onBack={handleBack}
      topicTitle={topicTitle}
      quiz={quiz}
      language={language}
      accentColor={ACCENT}
      onShowLearn={() => setPage('learn')}
    />
  );
}
