import React, { useRef, useEffect } from 'react';

const TextInput = ({ question, answer, onChange, onSubmit, disabled, autoFocus }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, question.id]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit?.();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      width: '100%',
      maxWidth: '500px'
    }}>
      <div style={{
        fontSize: '1.8rem',
        fontWeight: 700,
        color: '#2D4059',
        textAlign: 'center'
      }}>
        {question.question}
      </div>

      <div style={{
        display: 'flex',
        gap: '0.5rem',
        width: '100%'
      }}>
        <input
          ref={inputRef}
          type="number"
          value={answer || ''}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          placeholder="Enter your answer"
          style={{
            flex: 1,
            padding: '1rem',
            fontSize: '1.2rem',
            fontWeight: 700,
            border: '2px solid #E0E0E0',
            borderRadius: '8px',
            outline: 'none',
            transition: 'all 0.3s ease',
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
        <button
          onClick={onSubmit}
          disabled={disabled || !answer}
          style={{
            padding: '1rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 700,
            backgroundColor: disabled || !answer ? '#CCC' : '#58CC02',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: disabled || !answer ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            minWidth: '120px'
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
          Submit
        </button>
      </div>

      <div style={{
        fontSize: '0.9rem',
        color: '#999',
        textAlign: 'center'
      }}>
        Type your answer and press Enter or click Submit
      </div>
    </div>
  );
};

export default TextInput;
