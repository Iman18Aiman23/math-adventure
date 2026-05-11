import React, { useState } from 'react';
import { baseAssessments } from '../data/curriculum/assessment';
import AppHeader from '../components/AppHeader';
import AssessmentPage from './AssessmentPage';

const AssessmentSelector = ({ onBack, language = 'eng', gameState }) => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  if (selectedAssessment) {
    return (
      <AssessmentPage
        assessment={selectedAssessment}
        onBack={() => setSelectedAssessment(null)}
        language={language}
        gameState={gameState}
      />
    );
  }

  // Filter assessments by topic (math tests)
  const mathAssessments = baseAssessments.filter(a =>
    ['math-add-lvl1', 'math-add-lvl2', 'math-sub-lvl1', 'math-sub-lvl2', 'math-mul-lvl1', 'math-mul-lvl2'].includes(a.slug)
  );

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy':
        return '#58CC02';
      case 'medium':
        return '#FF9800';
      case 'hard':
        return '#F44336';
      default:
        return '#4A90E2';
    }
  };

  const getTopicEmoji = (topic) => {
    switch (topic?.toLowerCase()) {
      case 'addition':
        return '➕';
      case 'subtraction':
        return '➖';
      case 'multiplication':
        return '✖️';
      case 'division':
        return '➗';
      default:
        return '🧮';
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#FAFAFA'
    }}>
      <AppHeader onBack={onBack} gameState={gameState} language={language} />

      {/* Header Section */}
      <div style={{
        backgroundColor: 'linear-gradient(135deg, #4A90E2, #357ABD)',
        background: 'linear-gradient(135deg, #4A90E2, #357ABD)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: 900,
          marginBottom: '0.5rem',
          letterSpacing: '1px'
        }}>
          📋 Select an Assessment
        </div>
        <p style={{
          fontSize: '1.1rem',
          opacity: 0.9,
          margin: 0
        }}>
          Choose a math assessment to test your skills
        </p>
      </div>

      {/* Assessments Grid */}
      <div style={{
        flex: 1,
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        {mathAssessments.map((assessment) => (
          <div
            key={assessment.id}
            onClick={() => setSelectedAssessment(assessment)}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '2px solid #E5E5E5',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.borderColor = '#4A90E2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.borderColor = '#E5E5E5';
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#2D4059',
                  marginBottom: '0.5rem'
                }}>
                  {getTopicEmoji(assessment.topic)} {assessment.name}
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#999',
                  margin: 0
                }}>
                  {assessment.description}
                </p>
              </div>
              <div style={{
                backgroundColor: getDifficultyColor(assessment.level),
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}>
                {assessment.level}
              </div>
            </div>

            {/* Details */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #E5E5E5'
            }}>
              <div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#999',
                  fontWeight: 600,
                  marginBottom: '0.25rem'
                }}>
                  Duration
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#2D4059'
                }}>
                  {assessment.duration} min
                </div>
              </div>

              <div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#999',
                  fontWeight: 600,
                  marginBottom: '0.25rem'
                }}>
                  Questions
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#2D4059'
                }}>
                  {assessment.totalQuestions}
                </div>
              </div>

              <div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#999',
                  fontWeight: 600,
                  marginBottom: '0.25rem'
                }}>
                  Target Score
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#58CC02'
                }}>
                  {assessment.scoreTarget} pts
                </div>
              </div>

              <div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#999',
                  fontWeight: 600,
                  marginBottom: '0.25rem'
                }}>
                  Type
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#4A90E2',
                  textTransform: 'capitalize'
                }}>
                  {assessment.questionType.replace('-', ' ')}
                </div>
              </div>
            </div>

            {/* Status Badge */}
            {assessment.status && (
              <div style={{
                backgroundColor: assessment.status === 'Completed' ? '#E8F5E9' : '#FFF3E0',
                color: assessment.status === 'Completed' ? '#2E7D32' : '#E65100',
                padding: '0.75rem',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {assessment.status === 'Completed' ? '✓ Completed' : '⏳ Pending'}
              </div>
            )}

            {/* Start Button */}
            <button
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 700,
                backgroundColor: '#4A90E2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginTop: 'auto'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#357ABD';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#4A90E2';
              }}
            >
              Start Assessment →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentSelector;
