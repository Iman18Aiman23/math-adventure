import React from 'react';

// Get fruit icons based on number
const getFruitIcon = (num) => {
  const fruits = ['🍎', '🍇', '🍌', '🍉', '🍓', '🍒', '🥭', '🍍', '🍊', '🥝'];
  return fruits[Math.min(num - 1, 9)];
};

// Get animal icons based on number
const getAnimalIcon = (num) => {
  const animals = ['🐱', '🐰', '🐄', '🐐', '🐶', '🦊', '🐻', '🐼', '🐨', '🦁'];
  return animals[Math.min(num - 1, 9)];
};

const MultipleChoice = ({ question, answer, onChange, disabled }) => {
  try {
    if (!question || !question.options) {
      return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading question...</div>;
    }

    // Simply extract numbers from the question string
    const getIconForTopic = (topic) => {
      if (topic?.includes('addition') || topic?.includes('subtraction') || topic?.includes('multiplication')) {
        return getFruitIcon(1);
      }
      return getAnimalIcon(1);
    };

    const icon = getIconForTopic(question?.topic);
    const showIcons = question?.num1 && question?.num2 && question?.num1 <= 10 && question?.num2 <= 10;

    const handleSelect = (option) => {
      if (!disabled) {
        onChange(option.toString());
      }
    };

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
        alignItems: 'center'
      }}>
        {/* Visual Icons Display - Only if numbers are available */}
        {showIcons && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            minHeight: '60px'
          }}>
            {/* First group of icons */}
            <div style={{
              display: 'flex',
              gap: '0.3rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              minWidth: '60px',
              maxWidth: '150px'
            }}>
              {Array.from({ length: question.num1 }).map((_, i) => (
                <span key={`n1-${i}`} style={{ fontSize: '1.8rem', lineHeight: '1' }}>
                  {icon}
                </span>
              ))}
            </div>

            {/* Operator */}
            <div style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              color: '#4A90E2'
            }}>
              {question.symbol || '+'}
            </div>

            {/* Second group of icons */}
            <div style={{
              display: 'flex',
              gap: '0.3rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              minWidth: '60px',
              maxWidth: '150px'
            }}>
              {Array.from({ length: question.num2 }).map((_, i) => (
                <span key={`n2-${i}`} style={{ fontSize: '1.8rem', lineHeight: '1' }}>
                  {icon}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Math Expression */}
        <div style={{
          fontSize: '2.5rem',
          fontWeight: 900,
          color: '#2D4059',
          textAlign: 'center'
        }}>
          {question.question} = ?
        </div>

        {/* Multiple Choice Options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          {question.options.map((option, index) => {
            const labels = ['A', 'B', 'C', 'D'];
            return (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                disabled={disabled}
                style={{
                  padding: '1rem 1.2rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  backgroundColor: answer === option.toString() ? '#58CC02' : '#F5F5F5',
                  color: '#2D4059',
                  border: answer === option.toString() ? '3px solid #58CC02' : '2px solid #E0E0E0',
                  borderRadius: '10px',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '70px',
                  minWidth: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  opacity: disabled ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!disabled && answer !== option.toString()) {
                    e.target.style.backgroundColor = '#E8F5E9';
                    e.target.style.borderColor = '#58CC02';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!disabled && answer !== option.toString()) {
                    e.target.style.backgroundColor = '#F5F5F5';
                    e.target.style.borderColor = '#E0E0E0';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  opacity: 0.7,
                  position: 'absolute',
                  top: '0.5rem',
                  left: '0.5rem'
                }}>
                  {labels[index]}
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 700 }}>{option}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  } catch (err) {
    console.error('MultipleChoice error:', err);
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        color: '#CC3B3B',
        fontSize: '1rem'
      }}>
        ⚠️ Error loading question
      </div>
    );
  }
};

export default MultipleChoice;
