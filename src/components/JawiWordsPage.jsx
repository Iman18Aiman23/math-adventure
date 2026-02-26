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
                borderRadius: '1.5rem',
                padding: '1.5rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                width: '100%',
                minHeight: '160px',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                margin: 0
            }}
        >
            <div style={{
                background: topic.color,
                padding: '0.75rem',
                borderRadius: '50%',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <BookOpen size={30} />
            </div>
            <h2 style={{
                fontSize: '1.25rem',
                color: '#333',
                textAlign: 'center',
                margin: 0,
                lineHeight: '1.2'
            }}>
                {language === 'bm' ? topic.title : topic.titleEng || topic.title}
            </h2>
            <div style={{
                background: `${topic.color}20`,
                color: topic.color,
                padding: '0.2rem 0.6rem',
                borderRadius: '0.75rem',
                fontWeight: 'bold',
                fontSize: '0.85rem'
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
                borderRadius: '1rem',
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                aspectRatio: '1',
                transition: 'transform 0.2s',
                cursor: 'default',
                width: '100%'
            }}
        >
            <span style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', lineHeight: '1', marginBottom: '0.2rem' }}>
                {word.emoji}
            </span>
            <span style={{
                fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
                fontWeight: 'bold',
                color: '#333',
                fontFamily: 'serif',
                lineHeight: '1.2'
            }}>
                {word.jawi}
            </span>
            <span style={{
                fontSize: 'clamp(0.85rem, 3vw, 1.1rem)',
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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem',
                    padding: '1rem',
                    maxWidth: '1000px',
                    width: '100%',
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
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '1rem',
                padding: '1rem',
                maxWidth: '1000px',
                width: '100%',
                margin: '0 auto',
                paddingBottom: '3rem'
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
