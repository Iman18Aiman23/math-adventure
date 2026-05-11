import React from 'react';

const QuestionPalette = ({ totalQuestions, currentQuestion, answeredQuestions, onSelectQuestion, isMobile }) => {
  // Hide on mobile if isMobile is true
  if (isMobile) return null;

  const getButtonColor = (questionNum) => {
    if (questionNum === currentQuestion) {
      return { backgroundColor: '#4A90E2', color: 'white' };
    }
    if (answeredQuestions.has(questionNum)) {
      return { backgroundColor: '#58CC02', color: 'white' };
    }
    return { backgroundColor: '#F5F5F5', color: '#999' };
  };

  return (
    <div style={{
      width: '250px',
      backgroundColor: '#FAFAFA',
      borderRight: '2px solid #E5E5E5',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      height: '100%',
      overflowY: 'auto'
    }}>
      <div style={{
        fontSize: '1rem',
        fontWeight: 700,
        color: '#2D4059',
        marginBottom: '0.5rem'
      }}>
        Question Navigator
      </div>

      <div style={{
        fontSize: '0.8rem',
        color: '#999',
        marginBottom: '1rem'
      }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{
            display: 'inline-block',
            width: '16px',
            height: '16px',
            backgroundColor: '#4A90E2',
            borderRadius: '4px',
            marginRight: '0.5rem'
          }} /> Current
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{
            display: 'inline-block',
            width: '16px',
            height: '16px',
            backgroundColor: '#58CC02',
            borderRadius: '4px',
            marginRight: '0.5rem'
          }} /> Answered
        </div>
        <div>
          <span style={{
            display: 'inline-block',
            width: '16px',
            height: '16px',
            backgroundColor: '#F5F5F5',
            border: '2px solid #E0E0E0',
            borderRadius: '4px',
            marginRight: '0.5rem'
          }} /> Unvisited
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.75rem'
      }}>
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => onSelectQuestion(num - 1)}
            style={{
              padding: '0.75rem',
              fontSize: '0.9rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              ...getButtonColor(num)
            }}
            onMouseEnter={(e) => {
              if (num !== currentQuestion && !answeredQuestions.has(num)) {
                e.target.style.backgroundColor = '#E8F5E9';
              }
            }}
            onMouseLeave={(e) => {
              if (num !== currentQuestion && !answeredQuestions.has(num)) {
                e.target.style.backgroundColor = '#F5F5F5';
              }
            }}
          >
            {num}
          </button>
        ))}
      </div>

      <div style={{
        marginTop: 'auto',
        paddingTop: '1rem',
        borderTop: '2px solid #E5E5E5',
        fontSize: '0.85rem',
        color: '#666'
      }}>
        <div style={{ marginBottom: '0.5rem' }}>
          Answered: {answeredQuestions.size} / {totalQuestions}
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#E0E0E0',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(answeredQuestions.size / totalQuestions) * 100}%`,
            height: '100%',
            backgroundColor: '#58CC02',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    </div>
  );
};

export default QuestionPalette;
