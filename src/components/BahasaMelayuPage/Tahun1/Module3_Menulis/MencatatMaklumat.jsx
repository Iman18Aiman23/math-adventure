import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMHeader from '../../_shared/BMHeader';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '1-3-3-mencatat-maklumat';
const ACCENT = '#7A4FD0';

const PASSAGES = [
  {
    title: 'Keluarga Saya',
    text: 'Nama saya Ali. Saya berumur tujuh tahun. Saya tinggal di Kuala Lumpur. Saya mempunyai seorang abang dan seorang kakak. Hobi saya ialah membaca buku.',
    notes: [
      'Nama: Ali',
      'Umur: 7 tahun',
      'Tempat tinggal: Kuala Lumpur',
      'Adik-beradik: seorang abang, seorang kakak',
      'Hobi: membaca buku',
    ],
  },
  {
    title: 'Haiwan Peliharaan',
    text: 'Cikgu Siti mempunyai seekor kucing bernama Comel. Comel berwarna putih dan kelabu. Comel suka makan ikan. Setiap hari, Cikgu Siti memberi Comel minum susu.',
    notes: [
      'Haiwan: kucing',
      'Nama: Comel',
      'Warna: putih dan kelabu',
      'Makanan kegemaran: ikan',
      'Minuman: susu',
    ],
  },
  {
    title: 'Lawatan ke Zoo',
    text: 'Pada hari Sabtu, murid Tahun 1 melawat ke Zoo Negara. Mereka naik bas. Di zoo, mereka melihat gajah, harimau, dan monyet. Mereka makan tengah hari di kantin zoo.',
    notes: [
      'Hari: Sabtu',
      'Tempat: Zoo Negara',
      'Kenderaan: bas',
      'Haiwan dilihat: gajah, harimau, monyet',
      'Makan tengah hari: di kantin zoo',
    ],
  },
  {
    title: 'Taman Permainan',
    text: 'Taman Permainan Aman Bestari sangat luas. Ada buaian, gelongsor, dan jongkang-jongket. Banyak pokok bunga ditanam di tepi taman. Setiap petang, kanak-kanak bermain di sana dengan gembira.',
    notes: [
      'Tempat: Taman Permainan Aman Bestari',
      'Kemudahan: buaian, gelongsor, jongkang-jongket',
      'Pokok: bunga di tepi taman',
      'Masa: setiap petang',
      'Suasana: gembira',
    ],
  },
];

function MencatatLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <>
      <style>{`
        .mmt-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }

        .mmt-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(10px, 2.2vh, 22px) 16px clamp(8px, 1.8vh, 18px);
          overflow: hidden;
        }
        .mmt-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-top: 8px;
          margin-bottom: clamp(10px, 2.8vh, 24px);
        }
        .mmt-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4.6vw, 4.4vh), 26px);
          color: #1E293B; margin: 0;
        }
        .mmt-learn-heading p {
          font-size: clamp(10px, min(2.8vw, 2vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .mmt-learn-list {
          flex: 1; min-height: 0; width: 100%; max-width: 540px;
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.4vh, 12px);
          overflow-y: auto;
          padding: 2px 4px;
        }
        .mmt-passage-card {
          flex-shrink: 0;
          background: #fff; border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(12px, 1.6vh, 16px) clamp(14px, 2vw, 20px);
          border: 2px solid ${ACCENT}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
          cursor: pointer;
          transition: all .2s ease;
        }
        .mmt-passage-card:hover { border-color: ${ACCENT}44; }
        .mmt-passage-card.expanded { border-color: ${ACCENT}; }
        .mmt-passage-header {
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px;
        }
        .mmt-passage-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.4vw, 3vh), 18px);
          color: #1E293B;
        }
        .mmt-passage-toggle {
          flex-shrink: 0;
          font-size: 18px; color: ${ACCENT};
          transition: transform .2s ease;
        }
        .mmt-passage-toggle.open { transform: rotate(180deg); }
        .mmt-passage-content {
          overflow: hidden;
          max-height: 0;
          transition: max-height .3s ease;
        }
        .mmt-passage-content.open { max-height: 600px; }
        .mmt-passage-text {
          margin-top: 12px;
          font-size: clamp(13px, min(3vw, 2.6vh), 16px);
          font-weight: 600; color: #334155;
          line-height: 1.6;
          padding: clamp(10px, 1.4vh, 14px);
          background: #F8F5FF;
          border-radius: 12px;
          border-left: 4px solid ${ACCENT}55;
        }
        .mmt-notes-box {
          margin-top: 10px;
          padding: clamp(10px, 1.4vh, 14px);
          background: #F0FDF4;
          border-radius: 12px;
          border-left: 4px solid #16A34A;
        }
        .mmt-notes-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(10px, 2.2vw, 13px);
          color: #16A34A;
          margin-bottom: 6px;
          display: flex; align-items: center; gap: 4px;
        }
        .mmt-notes-item {
          display: flex; align-items: flex-start; gap: 6px;
          font-size: clamp(11px, min(2.6vw, 2vh), 14px);
          font-weight: 600; color: #166534;
          padding: 2px 0;
        }
        .mmt-notes-bullet {
          flex-shrink: 0; color: #16A34A; font-weight: 800;
        }
        .mmt-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(8px, 1.6vh, 16px);
        }
        .mmt-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .mmt-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .mmt-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .mmt-learn-heading p, .mmt-learn-footer { display: none; }
        }
      `}</style>

      <div className="mmt-learn-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />

        <div className="mmt-learn-body">
          <div className="mmt-learn-heading">
            <h1>
              {language === 'bm' ? 'Mari Mencatat Maklumat 📝' : "Let's Record Information 📝"}
            </h1>
            <p>
              {language === 'bm'
                ? 'Tekan pada petikan untuk lihat catatan penting'
                : 'Tap a passage to see the important notes'}
            </p>
          </div>

          <div className="mmt-learn-list">
            {PASSAGES.map((p, i) => (
              <div key={i}
                className={`mmt-passage-card${expandedIdx === i ? ' expanded' : ''}`}
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
              >
                <div className="mmt-passage-header">
                  <span className="mmt-passage-title">{p.title}</span>
                  <span className={`mmt-passage-toggle${expandedIdx === i ? ' open' : ''}`}>
                    ▼
                  </span>
                </div>
                <div className={`mmt-passage-content${expandedIdx === i ? ' open' : ''}`}>
                  <div className="mmt-passage-text">{p.text}</div>
                  <div className="mmt-notes-box">
                    <div className="mmt-notes-label">
                      📋 {language === 'bm' ? 'Catatan Penting:' : 'Important Notes:'}
                    </div>
                    {p.notes.map((note, j) => (
                      <div key={j} className="mmt-notes-item">
                        <span className="mmt-notes-bullet">•</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mmt-learn-cta">
            <button className="mmt-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>

        <div className="mmt-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}

export default function MencatatMaklumat({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Mencatat Maklumat' : 'Recording Information';

  const handleBack = () => {
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <MencatatLearnPage
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
