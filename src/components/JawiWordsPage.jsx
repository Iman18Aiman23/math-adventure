import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Star, Home } from 'lucide-react';
import { JAWI_TOPICS } from '../utils/jawiWordsData';

const TopicCard = ({ topic, onClick }) => {
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
                {topic.title}
            </h2>
            <div style={{
                background: `${topic.color}20`, // 20% opacity
                color: topic.color,
                padding: '0.2rem 0.8rem',
                borderRadius: '10px',
                fontWeight: 'bold'
            }}>
                {topic.words.length} Words
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

export default function JawiWordsPage({ onBack, onHome }) {
    const [selectedTopic, setSelectedTopic] = useState(null);

    // Topic Selection View
    if (!selectedTopic) {
        return (
            <div className="fade-in" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button
                        onClick={onBack}
                        style={{
                            background: 'rgba(0,0,0,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <ArrowLeft size={32} />
                    </button>
                    <button
                        onClick={onHome}
                        style={{
                            background: 'rgba(0,0,0,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <Home size={32} />
                    </button>
                    <h1 className="game-title" style={{ margin: 0, fontSize: '2.5rem', color: '#9D4EDD' }}>
                        1st 100 Words
                    </h1>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    padding: '1rem'
                }}>
                    {JAWI_TOPICS.map(topic => (
                        <TopicCard
                            key={topic.id}
                            topic={topic}
                            onClick={() => setSelectedTopic(topic)}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Word List View
    return (
        <div className="fade-in" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => setSelectedTopic(null)}
                        style={{
                            background: selectedTopic.color, // Theme color back button
                            border: 'none',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white'
                        }}
                    >
                        <ArrowLeft size={32} />
                    </button>

                    <h1 style={{
                        margin: 0,
                        fontSize: '2rem',
                        color: selectedTopic.color,
                        fontWeight: 'bold'
                    }}>
                        {selectedTopic.title}
                    </h1>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '1.5rem',
                paddingBottom: '2rem'
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
