import React, { useState, useEffect, createContext, useContext, Suspense } from 'react';
import HomePage from './components/HomePage';
import BMPage from './components/SpeakingPage/BMPage';
import JawiPage from './components/JawiScriptPage/JawiPage';
import MathHome from './components/MathematicsPage/MathHome';
import OpsLandingPage from './components/MathematicsPage/OpsLandingPage';
import TimeGameMenu from './components/MathematicsPage/TimeGameMenu';
import MonthsGame from './components/MathematicsPage/MonthsGame';
import ClockGame from './components/MathematicsPage/ClockGame';
import MonthLearning from './components/MathematicsPage/MonthLearning';
import MathOperationsGame from './components/MathematicsPage/MathOperationsGame';
import ColumnMathGame from './components/MathematicsPage/ColumnMathGame';
import LevelUpToast from './components/LevelUpToast';
import WelcomeModal from './components/WelcomeModal';
import DesktopSidebar from './components/DesktopSidebar';
import CosmicMobileNav from './components/CosmicMobileNav';
import ReadingPage from './components/ReadingPage/ReadingPage';
import EarlyExplorersHome from './components/AgeGroup-4-5/EarlyExplorersHome';
import KindergartenScholarsHome from './components/AgeGroup-5-6/KindergartenScholarsHome';
import Grade1AdventurersHome from './components/AgeGroup-6-7/Grade1AdventurersHome';
import Grade2DiscoverersHome from './components/AgeGroup-7-8/Grade2DiscoverersHome';
import Grade3AchieversHome from './components/AgeGroup-8-9/Grade3AchieversHome';
import AlphabetSafari from './components/AgeGroup-4-5/AlphabetSafari';
import LetterTrace from './components/AgeGroup-4-5/LetterTrace';
import PhoneticsPop from './components/AgeGroup-4-5/PhoneticsPop';
import SoundMatching from './components/AgeGroup-4-5/SoundMatching';
import LetterSoundPuzzle from './components/AgeGroup-4-5/LetterSoundPuzzle';
import PhoneticsSprint from './components/AgeGroup-4-5/PhoneticsSprint';
import ProfileHome from './components/Profile/ProfileHome';
const AchievementHome  = React.lazy(() => import('./components/Achievement/AchievementHome'));
const LeaderboardHome  = React.lazy(() => import('./components/Leaderboard/LeaderboardHome'));
import AssessmentSelector from './pages/AssessmentSelector';
import AssessmentPage from './pages/AssessmentPage';
import { getMuted, setMuted, preloadSounds, unlockAudio, playHoverSound } from './utils/soundManager';
import { useGameState } from './hooks/useGameState';
import { loadPlayerName, savePlayerName, recordLogin, calcStreak } from './services/storageService';
import { getGameData } from './utils/gameStatsManager';
import { baseAssessments } from './data/curriculum/assessment';

// ── Themes ───────────────────────────────────────────────────────────────────
export const THEMES = {
  cosmic: {
    key: 'cosmic', label: 'Cosmic', swatch: '#5B42D4',
    sidebarBg: 'linear-gradient(180deg, #332881 0%, #4B39BB 35%, #3E309C 65%, #332881 100%)',
    appBg: '#FAF6F0',
    contentBg: 'linear-gradient(175deg, #1F184E 0%, #3E309C 40%, #5B42D4 70%, #3A2A8A 100%)',
    heroBg: 'linear-gradient(175deg, #0F0B1E 0%, #1A1040 35%, #2D1B69 65%, #1A1040 100%)',
    heroBorder: '#A78BFA',
    planetBody: 'radial-gradient(circle at 30% 30%, #C084FC, #6B21A8)',
    planetRing: '#A78BFA',
  },
  ocean: {
    key: 'ocean', label: 'Ocean', swatch: '#1565c0',
    sidebarBg: 'linear-gradient(180deg, #0d3b66 0%, #1565c0 50%, #0a2d4d 100%)',
    appBg: '#071929',
    contentBg: 'linear-gradient(175deg, #0a2d4d 0%, #0d3b66 40%, #1565c0 70%, #0a2d4d 100%)',
    heroBg: 'linear-gradient(135deg, #0d3b66 0%, #1565c0 50%, #42a5f5 100%)',
    heroBorder: '#80cbc4',
    planetBody: 'radial-gradient(circle at 30% 30%, #42a5f5, #1565c0)',
    planetRing: '#80cbc4',
  },
  sunny: {
    key: 'sunny', label: 'Sunny', swatch: '#f57c00',
    sidebarBg: 'linear-gradient(180deg, #e65100 0%, #f57c00 50%, #bf360c 100%)',
    appBg: '#7a2608',
    contentBg: 'linear-gradient(175deg, #bf360c 0%, #e65100 40%, #f57c00 70%, #bf360c 100%)',
    heroBg: 'linear-gradient(135deg, #e65100 0%, #f57c00 50%, #ffa000 100%)',
    heroBorder: '#fdd835',
    planetBody: 'radial-gradient(circle at 30% 30%, #ffa000, #f57c00)',
    planetRing: '#fdd835',
  },
  forest: {
    key: 'forest', label: 'Forest', swatch: '#2e7d32',
    sidebarBg: 'linear-gradient(180deg, #1b5e20 0%, #2e7d32 50%, #0d3b11 100%)',
    appBg: '#0a1f0a',
    contentBg: 'linear-gradient(175deg, #0d3b11 0%, #1b5e20 40%, #2e7d32 70%, #0d3b11 100%)',
    heroBg: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #43a047 100%)',
    heroBorder: '#8bc34a',
    planetBody: 'radial-gradient(circle at 30% 30%, #43a047, #2e7d32)',
    planetRing: '#8bc34a',
  },
};

// ── Context ──────────────────────────────────────────────────────────────────
export const GameStateContext = createContext(null);
export const useGameStateContext = () => useContext(GameStateContext);

// ── Desktop detection hook ───────────────────────────────────────────────────
function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : false
  );
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    setIsDesktop(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);
  return isDesktop;
}

// ── Game ID mapping ───────────────────────────────────────────────────────────
function getActiveGameId(currentSubject, mathSubGame) {
  if (currentSubject === 'jawi') return 'jawi';
  if (currentSubject === 'bm')   return 'bm';
  if (currentSubject === 'math') {
    if (mathSubGame === 'operations') return 'math-operations';
    if (mathSubGame === 'datetime')   return 'math-datetime';
    if (mathSubGame === 'faq')        return 'math-faq';
    return 'math';
  }
  return 'home';
}

// ── Find matching assessment for achievement ───────────────────────────────────
function findMatchingAssessment(achievement) {
  if (!achievement) return null;

  // Try to find assessment that matches the achievement's topic and level
  return baseAssessments.find(assessment => {
    const topicMatch = assessment.topic === achievement.topic;
    const levelMatch = assessment.level === achievement.level;
    const questionTypeMatch = assessment.questionType === achievement.questionType;

    // Return if all three match, or at least topic and level match
    return topicMatch && levelMatch && (questionTypeMatch || true);
  }) || baseAssessments.find(a => a.topic === achievement.topic);
}


export default function App() {
  const isDesktop = useIsDesktop();
  const [playerName,     setPlayerName]     = useState(() => loadPlayerName());
  const [currentSubject, setCurrentSubject] = useState(null);
  const [mathSubGame,    setMathSubGame]    = useState(null);
  const [dateTimeSubGame,setDateTimeSubGame]= useState(null);
  const [isPlaying,      setIsPlaying]      = useState(false);
  const [gameConfig,     setGameConfig]     = useState({ operation: 'add', difficulty: 'easy', nums: [], quizType: 'multiple' });
  const [isMuted,        setIsMuted]        = useState(getMuted());
  const [language,       setLanguage]       = useState('bm');
  const [activeTab,      setActiveTab]      = useState('learn');
  const [streak,         setStreak]         = useState(0);
  const [isPlayingJawiGame, setIsPlayingJawiGame] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentAgeGroup, setCurrentAgeGroup] = useState(null);
  const [currentAgeGame, setCurrentAgeGame] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('cosmic');

  const activeGameId = getActiveGameId(currentSubject, mathSubGame);
  const { gameState, levelUpInfo, clearLevelUp } = useGameState(activeGameId);

  const handleSaveName = (name) => { savePlayerName(name); setPlayerName(name); };

  useEffect(() => {
    preloadSounds();
    // Record today's login and compute streak
    const dates = recordLogin();
    setStreak(calcStreak(dates));
    const handleFirstClick = () => { unlockAudio(); document.removeEventListener('click', handleFirstClick); };
    document.addEventListener('click', handleFirstClick);
    return () => {
      document.removeEventListener('click', handleFirstClick);
    };
  }, []);

  const handleStartGame    = (op, diff, _nums = [], qType = 'multiple') => { setGameConfig({ operation: op, difficulty: diff, nums: _nums, quizType: qType }); setIsPlaying(true); };
  const handleBackToMenu   = () => setIsPlaying(false);
  const handleStartTimeGame= (gameId) => { setDateTimeSubGame(gameId); setIsPlaying(true); };
  const handleBackToHome   = () => { setIsPlaying(false); setMathSubGame(null); setDateTimeSubGame(null); setCurrentSubject(null); setCurrentAgeGroup(null); setCurrentAgeGame(null); setActiveTab('learn'); };
  const handleToggleMute   = () => { const m = !isMuted; setIsMuted(m); setMuted(m); };
  const handleToggleLang   = () => setLanguage(l => l === 'bm' ? 'eng' : 'bm');

  const inActiveQuiz = isPlaying;
  const viewKey = `${activeTab}-${currentSubject}-${mathSubGame}-${dateTimeSubGame}-${isPlaying}-${selectedAssessment?.id}`;

  // Hide sidebar during game play or assessment
  const shouldHideSidebar = isPlaying || (currentSubject === 'math' && mathSubGame === 'faq') || isPlayingJawiGame || selectedAssessment || !!currentAgeGame;

  // ── Content renderer ──────────────────────────────────────────────────────
  const renderContent = () => {
    if (activeTab === 'leaderboard') return (
      <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
        <LeaderboardHome language={language} gameState={gameState} theme={THEMES[currentTheme]} />
      </Suspense>
    );
    if (activeTab === 'profile')     return <ProfileHome playerName={playerName} gameState={gameState} language={language} streak={streak} />;
    if (activeTab === 'achievement') {
      // If an assessment is selected, show AssessmentPage
      if (selectedAssessment) {
        return <AssessmentPage assessment={selectedAssessment} onBack={() => setSelectedAssessment(null)} language={language} gameState={gameState} />;
      }
      // Otherwise show achievement home
      return <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading achievements...</div>}>
        <AchievementHome
          onBack={handleBackToHome}
          onHome={handleBackToHome}
          language={language}
          gameState={gameState}
          onTakeAssessment={(achievement) => {
          console.log('Taking assessment:', achievement);
          // The achievement from baseAssessments can be used directly as an assessment
          // if it has all required properties (totalQuestions, duration, topic, level, questionType)
          if (achievement && achievement.totalQuestions && achievement.duration) {
            console.log('✓ Assessment has required fields, using directly:', achievement);
            setSelectedAssessment(achievement);
          } else {
            // Otherwise try to find a matching one
            console.log('Assessment missing fields, finding match...', achievement);
            const matchingAssessment = findMatchingAssessment(achievement);
            if (matchingAssessment) {
              console.log('✓ Found matching assessment:', matchingAssessment);
              setSelectedAssessment(matchingAssessment);
            } else {
              console.error('✗ No matching assessment found for:', achievement);
              alert('Could not find matching assessment');
            }
          }
        }}
        />
      </Suspense>;
    }

    switch (currentSubject) {
      case 'math':
        if (!mathSubGame) return <MathHome onSelectSubGame={setMathSubGame} onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
        if (mathSubGame === 'operations') {
          return !isPlaying
            ? <OpsLandingPage onStart={handleStartGame} onBack={() => setMathSubGame(null)} onHome={handleBackToHome} language={language} />
            : <MathOperationsGame operation={gameConfig.operation} difficulty={gameConfig.difficulty} nums={gameConfig.nums} quizType={gameConfig.quizType} onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
        }
        if (mathSubGame === 'datetime') {
          if (!isPlaying) return <TimeGameMenu onBack={() => setMathSubGame(null)} onStart={handleStartTimeGame} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'months')          return <MonthsGame    onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'clock')           return <ClockGame     onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'month-learning')  return <MonthLearning onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
        }
        if (mathSubGame === 'faq') {
          return <ColumnMathGame onBack={() => setMathSubGame(null)} language={language} />;
        }
        return <MathHome onSelectSubGame={setMathSubGame} onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
      case 'bm':
        return <BMPage onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
      case 'jawi':
        return <JawiPage onBack={handleBackToHome} onHome={handleBackToHome} language={language} onGameStart={() => setIsPlayingJawiGame(true)} onGameEnd={() => setIsPlayingJawiGame(false)} />;
      case 'reading':
        return <ReadingPage onBack={handleBackToHome} language={language} />;
      default:
        // Age-group routing takes precedence over the default home screen.
        if (currentAgeGame === 'alphabet-safari') {
          return <AlphabetSafari onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'letter-trace') {
          return <LetterTrace onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'phonics-pop') {
          return <PhoneticsPop onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'sound-matching') {
          return <SoundMatching onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'letter-sound-puzzle') {
          return <LetterSoundPuzzle onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'phonics-sprint') {
          return <PhoneticsSprint onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGroup) {
          const ageGroupComponents = {
            'age-4-5': EarlyExplorersHome,
            'age-5-6': KindergartenScholarsHome,
            'age-6-7': Grade1AdventurersHome,
            'age-7-8': Grade2DiscoverersHome,
            'age-8-9': Grade3AchieversHome,
          };
          const AgeGroupComponent = ageGroupComponents[currentAgeGroup];
          if (AgeGroupComponent) {
            return (
              <AgeGroupComponent
                onBack={() => setCurrentAgeGroup(null)}
                onPlayGame={(gameId) => setCurrentAgeGame(gameId)}
                language={language}
              />
            );
          }
        }
        return <HomePage
          onSelectSubject={setCurrentSubject}
          onSelectAgeGroup={setCurrentAgeGroup}
          language={language}
          playerName={playerName}
          gameState={gameState}
          streak={streak}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onHome={handleBackToHome}
          onToggleLang={handleToggleLang}
          theme={THEMES[currentTheme]}
        />;
    }
  };

  return (
    <GameStateContext.Provider value={gameState}>
      {/* Desktop Sidebar — rendered outside .app-container, inside #root row */}
      {isDesktop && !shouldHideSidebar && (
        <DesktopSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          language={language}
          onToggleLanguage={handleToggleLang}
          playerName={playerName}
          gameState={gameState}
          onHome={handleBackToHome}
          theme={THEMES[currentTheme]}
          onThemeChange={setCurrentTheme}
          themes={THEMES}
        />
      )}

      <div
        className={`app-container${activeTab === 'leaderboard' ? ' app-leaderboard' : ''}${activeTab === 'learn' && !currentSubject && !currentAgeGroup ? ' app-home' : ''}`}
        style={{
          '--theme-hero-bg':     THEMES[currentTheme].heroBg,
          '--theme-hero-border': THEMES[currentTheme].heroBorder,
          '--theme-planet-body': THEMES[currentTheme].planetBody,
          '--theme-planet-ring': THEMES[currentTheme].planetRing,
        }}
      >
        {!playerName && <WelcomeModal onSave={handleSaveName} />}
        <LevelUpToast level={levelUpInfo?.newLevel} onDismiss={clearLevelUp} />


        {/* Page Content */}
        <div className="app-content">
          <div key={viewKey} className="view-container">
            {renderContent()}
          </div>
        </div>

        {/* CosmicMobileNav — rendered outside view-container so position:fixed works correctly */}
        {!inActiveQuiz && !isPlayingJawiGame && !selectedAssessment && !currentAgeGame && (
          <CosmicMobileNav
            activeTab={activeTab}
            language={language}
            onTabChange={setActiveTab}
            onHome={handleBackToHome}
            onToggleLang={handleToggleLang}
            theme={THEMES[currentTheme]}
            themes={THEMES}
            onThemeChange={setCurrentTheme}
          />
        )}
      </div>
    </GameStateContext.Provider>
  );
}
