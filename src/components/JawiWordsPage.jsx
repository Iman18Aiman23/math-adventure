import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { JAWI_TOPICS } from '../utils/jawiWordsData';
import { LOCALIZATION } from '../utils/localization';
import GameHeader from './GameHeader';

const TopicCard = ({ topic, onClick, language }) => {
    return (
        <button
            onClick={onClick}
            className="card fade-in"
            style={{
                background: 'white',
                border: `3px solid ${topic.color}`,
                borderRadius: '20px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                width: '100%',
                minHeight: '200px',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            }}
        >
            <div style={{
                background: topic.color,
                padding: '1rem',
                borderRadius: '50%',
                color: 'white'
            }}>
                <BookOpen size={40} />
            </div>
            <h2 style={{
                fontSize: '1.5rem',
                color: '#333',
                textAlign: 'center',
                margin: 0
            }}>
                {language === 'bm' ? topic.title : topic.titleEng || topic.title}
            </h2>
            <div style={{
                background: `${topic.color}20`, // 20% opacity
                color: topic.color,
                padding: '0.2rem 0.8rem',
                borderRadius: '10px',
                fontWeight: 'bold'
            }}>
                {topic.words.length} {language === 'bm' ? 'Perkataan' : 'Words'}
            </div>
        </button>
    );
};

const WordCard = ({ word, color }) => {
    return (
        <div
            className="fade-in"
            style={{
                background: 'white',
                border: `2px solid ${color}`,
                borderRadius: '15px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                aspectRatio: '1',
                transition: 'transform 0.2s',
                cursor: 'default'
            }}
        >
            <span style={{ fontSize: '3rem', lineHeight: '1', marginBottom: '0.5rem' }}>
                {word.emoji}
            </span>
            <span style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#333',
                fontFamily: 'serif'
            }}>
                {word.jawi}
            </span>
            <span style={{
                fontSize: '1.2rem',
                color: '#666',
                fontWeight: '500'
            }}>
                {word.rumi}
            </span>
        </div>
    );
};

export default function JawiWordsPage({ onBack, onHome, language }) {
    const t = LOCALIZATION[language].jawiGames;
    const [selectedTopic, setSelectedTopic] = useState(null);

    // Topic Selection View
    if (!selectedTopic) {
        return (
            <div className="game-container fade-in">
                <GameHeader onBack={onBack} onHome={onHome} title={t.wordsTitle} language={language} />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    padding: '2rem',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {JAWI_TOPICS.map(topic => (
                        <TopicCard
                            key={topic.id}
                            topic={topic}
                            onClick={() => setSelectedTopic(topic)}
                            language={language}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Word List View
    return (
        <div className="game-container fade-in">
            <GameHeader
                onBack={() => setSelectedTopic(null)}
                onHome={onHome}
                title={language === 'bm' ? selectedTopic.title : selectedTopic.titleEng || selectedTopic.title}
                language={language}
            />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '1.5rem',
                padding: '2rem',
                maxWidth: '1000px',
                margin: '0 auto',
                paddingBottom: '4rem'
            }}>
                {selectedTopic.words.map((word, idx) => (
                    <WordCard
                        key={idx}
                        word={word}
                        color={selectedTopic.color}
                    />
                ))}
            </div>
        </div>
    );
}
