import React, { useState, useEffect, useCallback, useRef } from 'react';
import { generateAssessmentQuestions, calculateScore } from '../utils/mathGenerator';
import { validateAssessment, logAssessment } from '../utils/assessmentValidator';
import QuestionRenderer from '../components/QuestionRenderer';
import QuestionPalette from '../components/QuestionPalette';
import Certificate from '../components/Certificate';
import AppHeader from '../components/AppHeader';

const AssessmentPage = ({ assessment, onBack, language = 'eng', gameState }) => {
  // State Management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(assessment?.duration ? assessment.duration * 60 : 1800); // Convert minutes to seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [score, setScore] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  // Log and validate assessment on mount
  useEffect(() => {
    try {
      console.log('=== AssessmentPage Mounted ===');
      console.log('Assessment prop:', assessment);

      if (!assessment) {
        throw new Error('No assessment provided to AssessmentPage');
      }

      console.log('Assessment properties:');
      console.log('  - id:', assessment.id);
      console.log('  - name:', assessment.name);
      console.log('  - topic:', assessment.topic);
      console.log('  - level:', assessment.level);
      console.log('  - questionType:', assessment.questionType);
      console.log('  - totalQuestions:', assessment.totalQuestions);
      console.log('  - duration:', assessment.duration);

      if (!assessment.totalQuestions) {
        throw new Error(`Assessment missing totalQuestions field. Got: ${assessment.totalQuestions}`);
      }
      if (!assessment.topic) {
        throw new Error(`Assessment missing topic field. Got: ${assessment.topic}`);
      }
      if (!assessment.level) {
        throw new Error(`Assessment missing level field. Got: ${assessment.level}`);
      }

      console.log('✓ Assessment validation passed');
    } catch (err) {
      console.error('AssessmentPage validation error:', err.message);
      setError(err.message);
    }
  }, [assessment]);

  // Generate questions lazily
  useEffect(() => {
    try {
      if (!assessment) {
        console.log('Assessment not ready yet');
        return;
      }

      console.log('=== Setting up Assessment ===');

      // Validate assessment has required fields
      const validation = validateAssessment(assessment);
      if (!validation.valid) {
        console.error('Assessment validation failed:', validation.errors);
        setError(`Assessment validation failed:\n${validation.errors.join('\n')}`);
        return;
      }

      console.log('✓ Assessment is valid:', logAssessment(assessment));

      // Generate questions asynchronously in chunks to prevent blocking
      let questionsArray = [];
      let isGenerating = true;

      // Use requestIdleCallback for non-blocking generation
      const generateQuestionsAsync = () => {
        try {
          console.log('Generating questions...');
          const startTime = performance.now();

          // Generate all questions (this is fast now, no parsing needed)
          const generatedQuestions = generateAssessmentQuestions({
            totalQuestions: assessment.totalQuestions,
            topic: assessment.topic,
            level: assessment.level,
            questionType: assessment.questionType
          });

          const endTime = performance.now();
          console.log(`✓ Generated ${generatedQuestions.length} questions in ${(endTime - startTime).toFixed(2)}ms`);

          if (!generatedQuestions || generatedQuestions.length === 0) {
            throw new Error('Failed to generate questions');
          }

          // Ensure all questions have questionType
          generatedQuestions.forEach(q => {
            if (!q.questionType) {
              q.questionType = assessment.questionType || 'multiple-choice';
            }
          });

          setQuestions(generatedQuestions);
          isGenerating = false;
        } catch (err) {
          console.error('Question generation error:', err.message);
          setError(`Error generating questions: ${err.message}`);
          isGenerating = false;
        }
      };

      // Use requestIdleCallback if available, otherwise use setTimeout
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(generateQuestionsAsync, { timeout: 2000 });
      } else {
        setTimeout(generateQuestionsAsync, 100);
      }

      return () => {
        isGenerating = false;
      };
    } catch (err) {
      console.error('Assessment setup error:', err.message);
      setError(`Error setting up assessment: ${err.message}`);
    }
  }, [assessment]);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Timer effect
  useEffect(() => {
    if (showCertificate) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showCertificate]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer change
  const handleAnswerChange = useCallback((answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  }, [currentQuestionIndex, questions]);

  // Mark question as answered
  const handleAnswerSubmit = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    setAnsweredQuestions(prev => new Set([...prev, currentQuestionIndex + 1]));
    handleNextQuestion();
  }, [currentQuestionIndex, questions]);

  // Navigate to next question
  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  // Navigate to previous question
  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  // Navigate to specific question
  const handleSelectQuestion = useCallback((index) => {
    setCurrentQuestionIndex(index);
  }, []);

  // Submit assessment
  const handleSubmitAssessment = useCallback(() => {
    if (questions.length === 0) return;

    const result = calculateScore(questions, userAnswers);
    setScore(result);
    setShowCertificate(true);

    // Update assessment status in baseAssessments
    const updatedAssessment = {
      ...assessment,
      status: result.score >= assessment.scoreTarget ? 'Completed' : 'Failed',
      score: result.score,
      percentage: result.percentage
    };
    // You can dispatch this to your state management or localStorage
    console.log('Assessment completed:', updatedAssessment);
  }, [questions, userAnswers, assessment]);

  // Handle retry
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setAnsweredQuestions(new Set());
    setTimeRemaining(assessment.duration * 60);
    setIsTimeUp(false);
    setShowCertificate(false);
    setScore(null);
    const generatedQuestions = generateAssessmentQuestions({
      totalQuestions: assessment.totalQuestions,
      topic: assessment.topic,
      level: assessment.level,
      questionType: assessment.questionType
    });
    setQuestions(generatedQuestions);
  };

  if (showCertificate && score) {
    return (
      <Certificate
        assessment={assessment}
        score={score}
        onRetry={handleRetry}
        onBack={onBack}
        language={language}
      />
    );
  }

  if (questions.length === 0) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#999',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <div>⏳ Loading assessment...</div>
        <div style={{ fontSize: '0.9rem', color: '#CCC', maxWidth: '500px' }}>
          {assessment ? (
            <div>
              Assessment: {assessment.name} (ID: {assessment.id})
              <br />
              Topic: {assessment.topic}, Level: {assessment.level}
              <br />
              Type: {assessment.questionType}
            </div>
          ) : (
            'No assessment selected'
          )}
        </div>
      </div>
    );
  }

  // Show error if one exists
  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#FFEBEE',
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '500px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '1rem'
          }}>
            ⚠️ Error
          </div>
          <div style={{
            fontSize: '1.1rem',
            color: '#C62828',
            marginBottom: '1.5rem',
            fontWeight: 600
          }}>
            {error}
          </div>
          <div style={{
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '1.5rem',
            backgroundColor: '#F5F5F5',
            padding: '1rem',
            borderRadius: '8px',
            fontFamily: 'monospace'
          }}>
            {assessment && JSON.stringify({
              id: assessment.id,
              name: assessment.name,
              topic: assessment.topic,
              level: assessment.level,
              questionType: assessment.questionType,
              totalQuestions: assessment.totalQuestions,
              duration: assessment.duration
            }, null, 2)}
          </div>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 700,
              backgroundColor: '#4A90E2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? (userAnswers[currentQuestion.id] || '') : '';
  const timeUpClass = isTimeUp ? 'time-up' : '';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#fff'
    }}>
      {/* Header with Timer - FIXED */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        borderBottom: '2px solid #E5E5E5',
        backgroundColor: isTimeUp ? '#FFEBEE' : '#fff',
        flexShrink: 0
      }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2D4059' }}>
          {assessment.name}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {/* Progress Info */}
          <div style={{
            fontSize: '0.9rem',
            color: '#666',
            fontWeight: 600
          }}>
            Question {currentQuestionIndex + 1} / {questions.length}
          </div>

          {/* Timer */}
          <div style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: isTimeUp ? '#F44336' : timeRemaining < 300 ? '#FF9800' : '#2D4059',
            backgroundColor: isTimeUp ? '#FFCDD2' : timeRemaining < 300 ? '#FFF3E0' : 'transparent',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            minWidth: '80px',
            textAlign: 'center'
          }}>
            ⏱️ {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      {/* Time Up Warning */}
      {isTimeUp && (
        <div style={{
          backgroundColor: '#FFCDD2',
          color: '#C62828',
          padding: '1rem',
          textAlign: 'center',
          fontSize: '1rem',
          fontWeight: 700,
          borderBottom: '2px solid #F44336',
          flexShrink: 0
        }}>
          ⚠️ Time is up! Your answers have been submitted automatically.
        </div>
      )}

      {/* Main Content Area - Flexible but with footer space */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        minHeight: 0
      }}>
        {/* Question Palette Sidebar */}
        <QuestionPalette
          totalQuestions={questions.length}
          currentQuestion={currentQuestionIndex + 1}
          answeredQuestions={answeredQuestions}
          onSelectQuestion={handleSelectQuestion}
          isMobile={isMobile}
        />

        {/* Question Content - Scrollable */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem 2rem 0 2rem',
          overflowY: 'auto',
          backgroundColor: '#FAFAFA',
          position: 'relative',
          justifyContent: 'center'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '0'
          }}>
            {currentQuestion ? (
              <QuestionRenderer
                question={currentQuestion}
                answer={currentAnswer}
                onChange={handleAnswerChange}
                onSubmit={
                  currentQuestion.questionType === 'multiple-choice'
                    ? () => handleAnswerSubmit()
                    : handleAnswerSubmit
                }
                disabled={isTimeUp}
                autoFocus={true}
              />
            ) : (
              <div style={{ fontSize: '1.2rem', color: '#999' }}>
                Loading question...
              </div>
            )}
          </div>

          {/* Navigation Buttons - FIXED TO QUESTION BOX */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            padding: '0.3rem 0.5rem 0.5rem 0.5rem',
            backgroundColor: '#fff',
            borderTop: '2px solid #E5E5E5',
            flexWrap: 'wrap',
            position: 'sticky',
            bottom: 0,
            zIndex: 100,
            margin: '0',
            marginTop: 'auto'
          }}>
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0 || isTimeUp}
              style={{
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                backgroundColor: currentQuestionIndex === 0 ? '#CCC' : '#F5F5F5',
                color: '#2D4059',
                border: '2px solid #E0E0E0',
                borderRadius: '6px',
                cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (currentQuestionIndex > 0 && !isTimeUp) {
                  e.target.style.backgroundColor = '#E8F5E9';
                  e.target.style.borderColor = '#58CC02';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#F5F5F5';
                e.target.style.borderColor = '#E0E0E0';
              }}
            >
              ← Previous
            </button>

            {currentQuestion.questionType === 'multiple-choice' && (
              <button
                onClick={handleAnswerSubmit}
                disabled={!currentAnswer || isTimeUp}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: !currentAnswer || isTimeUp ? '#CCC' : '#58CC02',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: !currentAnswer || isTimeUp ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (currentAnswer && !isTimeUp) {
                    e.target.style.backgroundColor = '#46A302';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentAnswer && !isTimeUp) {
                    e.target.style.backgroundColor = '#58CC02';
                  }
                }}
              >
                Next →
              </button>
            )}

            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1 || isTimeUp}
              style={{
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                backgroundColor: currentQuestionIndex === questions.length - 1 ? '#CCC' : '#F5F5F5',
                color: '#2D4059',
                border: '2px solid #E0E0E0',
                borderRadius: '6px',
                cursor: currentQuestionIndex === questions.length - 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (currentQuestionIndex < questions.length - 1 && !isTimeUp) {
                  e.target.style.backgroundColor = '#E8F5E9';
                  e.target.style.borderColor = '#58CC02';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#F5F5F5';
                e.target.style.borderColor = '#E0E0E0';
              }}
            >
              Skip →
            </button>

            <button
              onClick={handleSubmitAssessment}
              style={{
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                backgroundColor: '#4A90E2',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#357ABD';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#4A90E2';
              }}
            >
              ✓ Submit Assessment
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AssessmentPage;
