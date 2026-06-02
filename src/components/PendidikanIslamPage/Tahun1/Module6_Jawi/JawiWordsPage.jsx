import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, Search } from 'lucide-react';
import { JAWI_TOPICS } from '../../../../utils/jawiWordsData';
import { LOCALIZATION } from '../../../../utils/localization';
import BackButton from '../../../BackButton';

const CARD_COLORS = [
  { bg: '#4ECDC4', light: '#E8FAF8', text: '#1A5C56' },
  { bg: '#FF6B6B', light: '#FFEEEE', text: '#8B2D2D' },
  { bg: '#FFE66D', light: '#FFFCE8', text: '#8B7A1A' },
  { bg: '#8BC34A', light: '#F0F7E8', text: '#4A6B2D' },
  { bg: '#9D4EDD', light: '#F3E8FC', text: '#5A2D8B' },
];

export default function JawiWordsPage({ onBack, language }) {
  const t = LOCALIZATION[language].jawiGames;
  const [selectedTopic, setSelectedTopic] = useState(null);

  const TopicCard = ({ topic, idx }) => (
    <button
      onClick={() => setSelectedTopic(topic)}
      className="jw-card"
      type="button"
      style={{
        background: CARD_COLORS[idx % CARD_COLORS.length].light,
        border: `3px solid ${CARD_COLORS[idx % CARD_COLORS.length].bg}`,
        borderRadius: '1.5rem', padding: '1.5rem 1.25rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
        cursor: 'pointer', width: '100%',
        transition: 'transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .28s',
        boxShadow: `0 6px 18px ${CARD_COLORS[idx % CARD_COLORS.length].bg}22`,
        fontFamily: "'Fredoka', system-ui, sans-serif",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 14px 30px ${CARD_COLORS[idx % CARD_COLORS.length].bg}44`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
    >
      <div style={{
        background: CARD_COLORS[idx % CARD_COLORS.length].bg,
        width: 56, height: 56, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff',
      }}>
        {idx === 0 ? <span style={{ fontSize: '1.6rem' }}>🏃</span> :
         idx === 1 ? <span style={{ fontSize: '1.6rem' }}>👤</span> :
         idx === 2 ? <span style={{ fontSize: '1.6rem' }}>📦</span> :
         idx === 3 ? <span style={{ fontSize: '1.6rem' }}>🌿</span> :
                     <span style={{ fontSize: '1.6rem' }}>💭</span>}
      </div>
      <h3 style={{
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
        fontSize: '1.2rem', color: '#1F2937', margin: 0, textAlign: 'center',
      }}>
        {language === 'bm' ? topic.title : topic.titleEng || topic.title}
      </h3>
      <div style={{
        background: `${CARD_COLORS[idx % CARD_COLORS.length].bg}22`,
        color: CARD_COLORS[idx % CARD_COLORS.length].text,
        padding: '0.25rem 0.8rem', borderRadius: '999px',
        fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
        fontSize: '0.82rem',
      }}>
        {topic.words.length} {language === 'bm' ? 'Perkataan' : 'Words'}
      </div>
    </button>
  );

  const WordCard = ({ word, colorIdx }) => {
    const c = CARD_COLORS[colorIdx % CARD_COLORS.length];
    return (
      <div
        className="jw-word-card"
        style={{
          background: '#fff',
          border: `2px solid ${c.bg}44`,
          borderRadius: '1.2rem', padding: '1rem 0.75rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: '0.35rem',
          boxShadow: `0 3px 10px ${c.bg}15`,
          transition: 'transform .25s cubic-bezier(.34,1.56,.64,1)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
      >
        <span style={{ fontSize: 'clamp(2.2rem, 7vw, 3rem)', lineHeight: 1 }}>
          {word.emoji}
        </span>
        <span style={{
          fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 700,
          color: '#1F2937', fontFamily: 'Amiri, serif', lineHeight: 1.1,
        }}>
          {word.jawi}
        </span>
        <span style={{
          fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)',
          color: '#6B7280', fontWeight: 600,
          fontFamily: "'Fredoka', system-ui, sans-serif",
        }}>
          {word.rumi}
        </span>
      </div>
    );
  };

  const sectionLabelStyle = {
    fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
    fontSize: '1rem', color: '#374151', textAlign: 'center',
    letterSpacing: '.04em', margin: '0.5rem 0 1rem',
    display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center',
  };
  const sectionLine = {
    content: '""', height: '3px', flex: 1, maxWidth: '60px',
    borderRadius: '999px',
    background: 'linear-gradient(90deg, rgba(16,185,129,.6), rgba(52,211,153,.7))',
  };

  // Topic Selection View
  if (!selectedTopic) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto',
        minHeight: '100%',
        background: 'linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 35%, #F0FDFA 100%)',
      }}>
        <BackButton onClick={onBack} />

        <div style={{ padding: '68px 1rem 2rem', maxWidth: '700px', margin: '0 auto', width: '100%' }}>
          <div style={sectionLabelStyle}>
            <span style={sectionLine} />
            {language === 'bm' ? 'Pilih Kategori' : 'Choose a Category'}
            <span style={sectionLine} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}>
            {JAWI_TOPICS.map((topic, idx) => (
              <TopicCard key={topic.id} topic={topic} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Word List View
  const topicIdx = JAWI_TOPICS.findIndex(t => t.id === selectedTopic.id);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto',
      minHeight: '100%',
      background: 'linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 35%, #F0FDFA 100%)',
    }}>
      <BackButton onClick={() => setSelectedTopic(null)} />

      <div style={{ padding: '68px 1rem 2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{
          background: CARD_COLORS[topicIdx % CARD_COLORS.length].bg,
          borderRadius: '1.5rem', padding: '1.25rem 1.5rem',
          marginBottom: '1.25rem',
          textAlign: 'center',
          boxShadow: `0 6px 20px ${CARD_COLORS[topicIdx % CARD_COLORS.length].bg}33`,
        }}>
          <h2 style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: '1.4rem', color: '#fff', margin: 0,
          }}>
            {language === 'bm' ? selectedTopic.title : selectedTopic.titleEng || selectedTopic.title}
          </h2>
          <p style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
            fontSize: '0.82rem', color: 'rgba(255,255,255,.8)', margin: '0.25rem 0 0',
          }}>
            {selectedTopic.words.length} {language === 'bm' ? 'Perkataan' : 'Words'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '0.8rem',
        }}>
          {selectedTopic.words.map((word, idx) => (
            <WordCard key={idx} word={word} colorIdx={topicIdx} />
          ))}
        </div>
      </div>
    </div>
  );
}
