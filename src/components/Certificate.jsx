import React from 'react';
import MascotIcon from './icons/MascotIcon';

const Certificate = ({ assessment, score, onRetry, onBack, language = 'eng' }) => {

  const isPassed = score.score >= assessment.scoreTarget;
  const percentage = score.percentage;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: isPassed ? 'linear-gradient(135deg, #E8F5E9, #F1F8E9)' : 'linear-gradient(135deg, #FFEBEE, #FCE4EC)',
      padding: '2rem',
      fontFamily: "'Fredoka One', cursive"
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '3rem',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        {/* Mascot */}
        <div style={{
          marginBottom: '2rem',
          fontSize: '4rem'
        }}>
          <MascotIcon size={100} />
        </div>

        {/* Result Title */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 900,
          color: isPassed ? '#2E7D32' : '#C62828',
          margin: '0 0 1rem 0',
          letterSpacing: '1px'
        }}>
          {isPassed ? '🎉 Congratulations!' : '😊 Try Again!'}
        </h1>

        {/* Assessment Name */}
        <p style={{
          fontSize: '1.2rem',
          color: '#555',
          margin: '1rem 0',
          fontWeight: 600
        }}>
          {assessment.name}
        </p>

        {/* Score Display */}
        <div style={{
          backgroundColor: isPassed ? '#E8F5E9' : '#FFEBEE',
          borderRadius: '12px',
          padding: '2rem',
          margin: '2rem 0',
          border: `3px solid ${isPassed ? '#4CAF50' : '#F44336'}`
        }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: 900,
            color: isPassed ? '#4CAF50' : '#F44336',
            marginBottom: '0.5rem'
          }}>
            {percentage}%
          </div>
          <div style={{
            fontSize: '1.1rem',
            color: '#666',
            marginBottom: '1rem'
          }}>
            {score.correct} out of {score.total} correct
          </div>

          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '12px',
            backgroundColor: '#E0E0E0',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${percentage}%`,
              height: '100%',
              backgroundColor: isPassed ? '#4CAF50' : '#F44336',
              transition: 'width 1s ease-out'
            }} />
          </div>
        </div>

        {/* Target Score Info */}
        <p style={{
          fontSize: '0.95rem',
          color: '#999',
          margin: '1.5rem 0',
          fontStyle: 'italic'
        }}>
          {isPassed
            ? `You achieved the target score of ${assessment.scoreTarget}! Excellent work!`
            : `You need ${assessment.scoreTarget} points to pass. You got ${score.score} points. Keep practicing!`
          }
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {!isPassed && (
            <button
              onClick={onRetry}
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 700,
                backgroundColor: '#4A90E2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#357ABD';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#4A90E2';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🔄 Try Again
            </button>
          )}

          <button
            onClick={onBack}
            style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: 700,
              backgroundColor: isPassed ? '#58CC02' : '#F5F5F5',
              color: isPassed ? 'white' : '#2D4059',
              border: `2px solid ${isPassed ? '#58CC02' : '#E0E0E0'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {isPassed ? '✨ Continue' : '← Back'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
