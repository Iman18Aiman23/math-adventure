import React, { useRef, useEffect } from 'react';

const LongMethod = ({ question, answer, onChange, onSubmit, disabled, autoFocus }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, question.id]);

  // Parse the question to extract operands
  const parseQuestion = () => {
    const parts = question.question.match(/(\d+)\s*([\+\-\×÷])\s*(\d+)/);
    if (!parts) return { num1: '', op: '', num2: '' };
    return {
      num1: parts[1],
      op: parts[2],
      num2: parts[3]
    };
  };

  const { num1, op, num2 } = parseQuestion();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit?.();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{
        fontSize: '1.2rem',
        fontWeight: 600,
        color: '#666',
        marginBottom: '1rem'
      }}>
        Solve using long method
      </div>

      {/* Workbook-style layout */}
      <div style={{
        backgroundColor: '#FFFEF9',
        border: '2px solid #E0D5C8',
        borderRadius: '8px',
        padding: '2rem',
        fontFamily: 'monospace',
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#2D4059',
        lineHeight: '2.5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        minHeight: '200px',
        justifyContent: 'center'
      }}>
        <div style={{ marginBottom: '0.5rem' }}>{num1}</div>
        <div style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '3px solid #2D4059', width: '100%', textAlign: 'right' }}>
          {op} {num2}
        </div>
        <input
          ref={inputRef}
          type="number"
          value={answer || ''}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          placeholder="?"
          style={{
            width: '100%',
            padding: '0.5rem',
            fontSize: '1.5rem',
            fontWeight: 700,
            border: '2px solid #E0E0E0',
            borderRadius: '4px',
            outline: 'none',
            textAlign: 'right',
            fontFamily: 'monospace',
            backgroundColor: disabled ? '#F5F5F5' : 'white',
            color: '#2D4059',
            opacity: disabled ? 0.6 : 1
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.target.style.borderColor = '#58CC02';
              e.target.style.boxShadow = '0 0 0 3px rgba(88, 204, 2, 0.1)';
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#E0E0E0';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Submit button */}
      <button
        onClick={onSubmit}
        disabled={disabled || !answer}
        style={{
          padding: '1rem 2rem',
          fontSize: '1rem',
          fontWeight: 700,
          backgroundColor: disabled || !answer ? '#CCC' : '#58CC02',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: disabled || !answer ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          width: '100%'
        }}
        onMouseEnter={(e) => {
          if (!disabled && answer) {
            e.target.style.backgroundColor = '#46A302';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && answer) {
            e.target.style.backgroundColor = '#58CC02';
          }
        }}
      >
        Submit Answer
      </button>
    </div>
  );
};

export default LongMethod;
