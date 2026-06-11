import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '2-3-3-jawapan-pemahaman';
const ACCENT = '#7A4FD0';

const PASSAGES = [
  {
    title: 'Gotong-royong',
    text: 'Pada hari Ahad, penduduk Taman Murni mengadakan gotong-royong. Mereka membersihkan longkang dan menanam pokok bunga. Ali membantu membuang sampah. Semua berasa gembira kerana kawasan perumahan menjadi bersih dan cantik.',
    questions: [
      { q: 'Bilakah gotong-royong diadakan?', a: 'Pada hari Ahad' },
      { q: 'Siapa yang membantu membuang sampah?', a: 'Ali' },
      { q: 'Mengapa semua berasa gembira?', a: 'Kawasan perumahan menjadi bersih dan cantik' },
    ],
  },
  {
    title: 'Kunjungan ke Perpustakaan',
    text: 'Cikgu Anita membawa murid Tahun 2 ke perpustakaan sekolah. Di sana, mereka membaca buku cerita. Siti meminjam buku tentang haiwan. Ahmad suka membaca buku sains. Cikgu Anita berpesan supaya menjaga buku dengan baik.',
    questions: [
      { q: 'Ke mana Cikgu Anita membawa murid?', a: 'Ke perpustakaan sekolah' },
      { q: 'Apakah buku yang dipinjam Siti?', a: 'Buku tentang haiwan' },
      { q: 'Apa pesanan Cikgu Anita?', a: 'Menjaga buku dengan baik' },
    ],
  },
  {
    title: 'Keluarga Bahagia',
    text: 'Keluarga Rani sangat bahagia. Pada hujung minggu, mereka makan bersama di restoran kegemaran. Rani suka memesan nasi goreng. Adiknya, Tom, suka mi goreng. Ayah dan emak makan ikan bakar. Selepas makan, mereka berjalan-jalan di taman.',
    questions: [
      { q: 'Di mana mereka makan pada hujung minggu?', a: 'Di restoran kegemaran' },
      { q: 'Apa makanan kegemaran Rani?', a: 'Nasi goreng' },
      { q: 'Apa yang mereka lakukan selepas makan?', a: 'Berjalan-jalan di taman' },
    ],
  },
];

function JawapanPemahamanLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <>
      <style>{`
        .jp-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .jp-learn-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .jp-learn-topbar::after { content: ''; flex: 0 1 88px; }
        .jp-learn-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .jp-learn-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .jp-back-label { display: none; }
          .jp-learn-topbar::after { flex-basis: 42px; }
        }
        .jp-learn-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .jp-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(6px, 1.6vh, 16px) 16px clamp(4px, 1.2vh, 12px);
          overflow: hidden;
        }
        .jp-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-bottom: clamp(8px, 2vh, 18px);
        }
        .jp-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, min(4.4vw, 4.2vh), 24px);
          color: #1E293B; margin: 0;
        }
        .jp-learn-heading p {
          font-size: clamp(10px, min(2.6vw, 1.8vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .jp-cards-scroll {
          flex: 1; min-height: 0; width: 100%; max-width: 540px;
          overflow-y: auto;
          padding: 2px 4px;
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.4vh, 14px);
        }
        .jp-card {
          flex-shrink: 0;
          background: #fff;
          border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(10px, 1.4vh, 16px) clamp(12px, 1.8vw, 18px);
          border: 2px solid ${ACCENT}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
          cursor: pointer;
          transition: all .2s ease;
        }
        .jp-card:hover { border-color: ${ACCENT}44; }
        .jp-card.expanded { border-color: ${ACCENT}; }
        .jp-card-header {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
        }
        .jp-card-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, min(3.2vw, 2.8vh), 17px);
          color: #1E293B;
        }
        .jp-card-toggle {
          flex-shrink: 0; font-size: 16px; color: ${ACCENT};
          transition: transform .2s ease;
        }
        .jp-card-toggle.open { transform: rotate(180deg); }
        .jp-card-content {
          overflow: hidden; max-height: 0; transition: max-height .3s ease;
        }
        .jp-card-content.open { max-height: 600px; }
        .jp-passage-text {
          margin-top: 10px;
          font-size: clamp(12px, min(2.8vw, 2.2vh), 15px);
          font-weight: 600; color: #334155; line-height: 1.6;
          padding: 10px 12px;
          background: #F8F5FF;
          border-radius: 12px;
          border-left: 4px solid ${ACCENT}55;
        }
        .jp-qa-box {
          margin-top: 8px;
          padding: 8px 12px;
          background: #F0FDF4;
          border-radius: 12px;
          border-left: 4px solid #16A34A;
        }
        .jp-qa-item {
          font-size: clamp(11px, min(2.4vw, 1.8vh), 13px);
          padding: 3px 0;
          color: #166534;
        }
        .jp-qa-q { font-weight: 700; }
        .jp-qa-a { font-weight: 500; color: #15803D; display: block; margin-left: 8px; }
        .jp-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(6px, 1.4vh, 14px);
        }
        .jp-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px; color: #fff; width: 100%;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .jp-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .jp-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .jp-learn-heading p, .jp-learn-footer { display: none; }
        }
      `}</style>

      <div className="jp-learn-root">
        <div className="jp-learn-topbar">
          <button className="jp-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="jp-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="jp-learn-title">{topicTitle}</span>
        </div>

        <div className="jp-learn-body">
          <div className="jp-learn-heading">
            <h1>
              {language === 'bm' ? 'Menulis Jawapan Pemahaman 📝' : 'Writing Comprehension Answers 📝'}
            </h1>
            <p>
              {language === 'bm'
                ? 'Baca petikan dan lihat contoh soalan serta jawapan'
                : 'Read the passage and see examples of questions and answers'}
            </p>
          </div>

          <div className="jp-cards-scroll">
            {PASSAGES.map((p, i) => (
              <div key={i}
                className={`jp-card${expandedIdx === i ? ' expanded' : ''}`}
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
              >
                <div className="jp-card-header">
                  <span className="jp-card-title">{p.title}</span>
                  <span className={`jp-card-toggle${expandedIdx === i ? ' open' : ''}`}>▼</span>
                </div>
                <div className={`jp-card-content${expandedIdx === i ? ' open' : ''}`}>
                  <div className="jp-passage-text">{p.text}</div>
                  <div className="jp-qa-box">
                    {p.questions.map((qa, j) => (
                      <div key={j} className="jp-qa-item">
                        <span className="jp-qa-q">Q: {qa.q}</span>
                        <span className="jp-qa-a">Jawapan: {qa.a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="jp-learn-cta">
            <button className="jp-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>

        <div className="jp-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}

export default function JawapanPemahaman({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Menulis Jawapan Pemahaman' : 'Writing Comprehension Answers';

  const handleBack = () => {
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <JawapanPemahamanLearnPage
        onBack={handleBack}
        onStartQuiz={() => setPage('quiz')}
        topicTitle={topicTitle}
        language={language}
      />
    );
  }

  return (
    <BMLessonQuizLayout
      onBack={handleBack} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic}
      topicTitle={topicTitle}
      quiz={quiz}
      language={language}
      accentColor={ACCENT}
      onShowLearn={() => setPage('learn')}
    />
  );
}
