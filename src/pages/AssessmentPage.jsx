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

  // Timer effect. The interval is created once per attempt, so it must not
  // capture handleSubmitAssessment directly — that closure would hold the
  // first render's empty `questions` and the timeout auto-submit would no-op.
  // A ref always points at the latest submit callback instead.
  const submitRef = useRef(null);
  useEffect(() => { submitRef.current = handleSubmitAssessment; });

  useEffect(() => {
    if (showCertificate) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          submitRef.current?.();
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

  // Navigate to next question
  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  // Mark question as answered
  const handleAnswerSubmit = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    setAnsweredQuestions(prev => new Set([...prev, currentQuestionIndex + 1]));
    handleNextQuestion();
  }, [currentQuestionIndex, questions, handleNextQuestion]);

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
    <div className="assessment-page">
      <style>{`
        .assessment-page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }

        /* ── Header ── */
        .assessment-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.75rem;
          border-bottom: 2px solid #E5E5E5;
          flex-shrink: 0;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .assessment-header.time-up-bg { background-color: #FFEBEE; }
        .assessment-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #2D4059;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 45%;
        }
        .assessment-header-right {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .assessment-progress {
          font-size: 0.75rem;
          color: #666;
          font-weight: 600;
          white-space: nowrap;
        }
        .assessment-timer {
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.35rem 0.6rem;
          border-radius: 8px;
          min-width: 65px;
          text-align: center;
          white-space: nowrap;
        }

        /* ── Time Up Warning ── */
        .time-up-warning {
          background-color: #FFCDD2;
          color: #C62828;
          padding: 0.6rem;
          text-align: center;
          font-size: 0.8rem;
          font-weight: 700;
          border-bottom: 2px solid #F44336;
          flex-shrink: 0;
        }

        /* ── Main Content ── */
        .assessment-main {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
          min-height: 0;
        }

        /* ── Sidebar (Question Palette) ── */
        .assessment-sidebar {
          display: none;
          flex-shrink: 0;
        }

        /* ── Question Content (NO SCROLL) ── */
        .assessment-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0.5rem 0.75rem;
          overflow: hidden;
          background-color: #FAFAFA;
          min-height: 0;
        }
        .assessment-question-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          min-height: 0;
          font-size: 0.85rem;
        }

        /* ── Footer Nav (always at bottom) ── */
        .assessment-nav {
          display: flex;
          gap: 0.6rem;
          justify-content: center;
          align-items: center;
          padding: 0.65rem 0.75rem;
          background-color: #fff;
          border-top: 1px solid #E5E5E5;
          box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
          flex-wrap: wrap;
          flex-shrink: 0;
        }
        .assessment-nav .nav-btn {
          padding: 0.45rem 0.75rem;
          font-size: 0.72rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          border: 2px solid #E0E0E0;
          background-color: #F5F5F5;
          color: #2D4059;
        }
        .assessment-nav .nav-btn:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .assessment-nav .nav-btn.btn-next {
          background-color: #58CC02;
          color: white;
          border: none;
        }
        .assessment-nav .nav-btn.btn-next:disabled {
          background-color: #CCC;
        }
        .assessment-nav .nav-btn.btn-submit {
          background-color: #4A90E2;
          color: white;
          border: none;
        }
        .assessment-nav .nav-btn:hover:not(:disabled) {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }

        /* ═══════════════════════════════════════════
           Small (Landscape Phones): min-width 576px
           ═══════════════════════════════════════════ */
        @media (min-width: 576px) {
          .assessment-header { padding: 0.75rem 1rem; }
          .assessment-title { font-size: 0.95rem; max-width: 50%; }
          .assessment-header-right { gap: 1rem; }
          .assessment-progress { font-size: 0.8rem; }
          .assessment-timer { font-size: 0.9rem; padding: 0.4rem 0.75rem; }
          .time-up-warning { font-size: 0.85rem; padding: 0.75rem; }
          .assessment-content { padding: 0.75rem 1rem; }
          .assessment-question-wrap { font-size: 0.9rem; }
          .assessment-nav { gap: 0.65rem; padding: 0.75rem 1rem; }
          .assessment-nav .nav-btn { padding: 0.5rem 0.85rem; font-size: 0.76rem; }
        }

        /* ═══════════════════════════════════════
           Medium (Tablets): min-width 768px
           ═══════════════════════════════════════ */
        @media (min-width: 768px) {
          .assessment-main { flex-direction: row; }
          .assessment-sidebar { display: flex; }
          .assessment-header { padding: 0.85rem 1.25rem; flex-wrap: nowrap; }
          .assessment-title { font-size: 1rem; max-width: 55%; }
          .assessment-header-right { gap: 1.5rem; }
          .assessment-progress { font-size: 0.85rem; }
          .assessment-timer { font-size: 1rem; padding: 0.45rem 0.85rem; min-width: 75px; }
          .time-up-warning { font-size: 0.9rem; padding: 0.85rem; }
          .assessment-content { padding: 1rem 1.5rem; }
          .assessment-question-wrap { font-size: 0.95rem; }
          .assessment-nav { gap: 0.75rem; padding: 0.85rem 1.5rem; }
          .assessment-nav .nav-btn { padding: 0.5rem 0.95rem; font-size: 0.8rem; }
        }

        /* ═══════════════════════════════════════════════
           Large (Laptops/Desktops): min-width 992px
           ═══════════════════════════════════════════════ */
        @media (min-width: 992px) {
          .assessment-header { padding: 1rem 1.5rem; }
          .assessment-title { font-size: 1.1rem; max-width: 60%; }
          .assessment-header-right { gap: 2rem; }
          .assessment-progress { font-size: 0.9rem; }
          .assessment-timer { font-size: 1.1rem; padding: 0.5rem 1rem; min-width: 80px; }
          .time-up-warning { font-size: 1rem; padding: 1rem; }
          .assessment-content { padding: 1.25rem 2rem; }
          .assessment-question-wrap { font-size: 1rem; }
          .assessment-nav { gap: 0.85rem; padding: 1rem 2rem; }
          .assessment-nav .nav-btn { padding: 0.55rem 1.1rem; font-size: 0.84rem; }
        }

        /* ═══════════════════════════════════════════════
           Extra Large (Wide Desktops): min-width 1200px
           ═══════════════════════════════════════════════ */
        @media (min-width: 1200px) {
          .assessment-header { padding: 1rem 2rem; }
          .assessment-title {
            font-size: 1.15rem;
            max-width: none;
          }
          .assessment-content { padding: 1.5rem 2.5rem; }
          .assessment-nav { padding: 1.1rem 2.5rem; }
          .assessment-nav .nav-btn { padding: 0.65rem 1.25rem; font-size: 0.88rem; }
        }
      `}</style>

      {/* Header with Timer */}
      <div className={`assessment-header ${isTimeUp ? 'time-up-bg' : ''}`}>
        <div className="assessment-title">
          {assessment.name}
        </div>
        <div className="assessment-header-right">
          <div className="assessment-progress">
            Q{currentQuestionIndex + 1} / {questions.length}
          </div>
          <div
            className="assessment-timer"
            style={{
              color: isTimeUp ? '#F44336' : timeRemaining < 300 ? '#FF9800' : '#2D4059',
              backgroundColor: isTimeUp ? '#FFCDD2' : timeRemaining < 300 ? '#FFF3E0' : 'transparent',
            }}
          >
            ⏱️ {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      {/* Time Up Warning */}
      {isTimeUp && (
        <div className="time-up-warning">
          ⚠️ Time is up! Your answers have been submitted automatically.
        </div>
      )}

      {/* Main Content Area */}
      <div className="assessment-main">
        {/* Question Palette Sidebar */}
        <div className="assessment-sidebar">
          <QuestionPalette
            totalQuestions={questions.length}
            currentQuestion={currentQuestionIndex + 1}
            answeredQuestions={answeredQuestions}
            onSelectQuestion={handleSelectQuestion}
            isMobile={false}
          />
        </div>

        {/* Question Content */}
        <div className="assessment-content">
          <div className="assessment-question-wrap">
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

          {/* Navigation Buttons */}
          <div className="assessment-nav">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0 || isTimeUp}
              className="nav-btn"
            >
              ← Previous
            </button>

            {currentQuestion.questionType === 'multiple-choice' && (
              <button
                onClick={handleAnswerSubmit}
                disabled={!currentAnswer || isTimeUp}
                className="nav-btn btn-next"
              >
                Next →
              </button>
            )}

            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1 || isTimeUp}
              className="nav-btn"
            >
              Skip →
            </button>

            <button
              onClick={handleSubmitAssessment}
              className="nav-btn btn-submit"
            >
              ✓ Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
