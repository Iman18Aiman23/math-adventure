import React, { useState, useEffect, createContext, useContext, Suspense } from 'react';
import HomePage from './components/HomePage';
import BMPage from './components/SpeakingPage/BMPage';
import JawiPage from './components/JawiScriptPage/JawiPage';
import MathHome from './components/MathematicsPage/MathHome';
import GameMenu from './components/MathematicsPage/GameMenu';
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
import MascotIcon from './components/icons/MascotIcon';
import ReadingPage from './components/ReadingPage/ReadingPage';
import AgeGroupPage from './components/AgeGroups/AgeGroupPage';
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
import HeartShopModal from './components/HeartShopModal';
const AchievementPage  = React.lazy(() => import('./components/AchievementPage'));
const LeaderboardHome  = React.lazy(() => import('./components/Leaderboard/LeaderboardHome'));
import AssessmentSelector from './pages/AssessmentSelector';
import AssessmentPage from './pages/AssessmentPage';
import { getMuted, setMuted, preloadSounds, unlockAudio, playHoverSound } from './utils/soundManager';
import { useGameState } from './hooks/useGameState';
import { loadPlayerName, savePlayerName, recordLogin, calcStreak } from './services/storageService';
import { getGameData } from './utils/gameStatsManager';
import { baseAssessments } from './data/curriculum/assessment';

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
        <LeaderboardHome language={language} gameState={gameState} />
      </Suspense>
    );
    if (activeTab === 'profile')     return <ProfilePlaceholder playerName={playerName} gameState={gameState} language={language} streak={streak} />;
    if (activeTab === 'achievement') {
      // If an assessment is selected, show AssessmentPage
      if (selectedAssessment) {
        return <AssessmentPage assessment={selectedAssessment} onBack={() => setSelectedAssessment(null)} language={language} gameState={gameState} />;
      }
      // Otherwise show AchievementPage with callback to select assessment
      return <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading achievements...</div>}>
        <AchievementPage
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
        />
      )}

      <div className={`app-container${activeTab === 'leaderboard' ? ' app-leaderboard' : ''}`}>
        {!playerName && <WelcomeModal onSave={handleSaveName} />}
        <LevelUpToast level={levelUpInfo?.newLevel} onDismiss={clearLevelUp} />


        {/* Page Content */}
        <div className="app-content">
          <div key={viewKey} className="view-container">
            {renderContent()}
          </div>
        </div>

        {/* CosmicMobileNav for non-home tabs — HomePage renders its own */}
        {!inActiveQuiz && !isPlayingJawiGame && !selectedAssessment && !currentAgeGame && activeTab !== 'learn' && (
          <CosmicMobileNav
            activeTab={activeTab}
            language={language}
            onTabChange={setActiveTab}
            onHome={handleBackToHome}
            onToggleLang={handleToggleLang}
          />
        )}
      </div>
    </GameStateContext.Provider>
  );
}

// ── Placeholder screens for tabs ─────────────────────────────────────────────
function ProfilePlaceholder({ playerName, gameState, language, streak = 0 }) {
  // Load game data from localStorage
  const gameData = getGameData();
  const totalXP = gameData.stars; // Each star = 1 XP
  const gems = gameData.gems;
  const hearts = gameData.hearts;
  const [isHeartShopOpen, setIsHeartShopOpen] = useState(false);

  const openHeartShop = () => setIsHeartShopOpen(true);
  const closeHeartShop = () => setIsHeartShopOpen(false);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#f7f7f7' }}>
      <div style={{ background: '#fff', padding: '2rem 1.5rem', textAlign: 'center', borderBottom: '2px solid #E5E5E5' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <div style={{ width: '80px', height: '80px' }}>
            <MascotIcon size={80} />
          </div>
        </div>
        <h2 style={{ fontWeight: 900, fontSize: '1.4rem', color: '#3C3C3C', marginBottom: '4px' }}>{playerName || 'Player'}</h2>
        <p style={{ color: '#AFAFAF', fontWeight: 600, fontSize: '0.85rem' }}>Level {gameState?.level ?? 1} Explorer</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '1.25rem 1rem', maxWidth: '700px', margin: '0 auto' }}>
        {[
          { label: language === 'bm' ? 'Hari Aktif' : 'Streak', value: streak, color: '#FF9600', emoji: '🔥' },
          { label: 'Level',   value: gameState?.level ?? 1,   color: '#CE82FF', emoji: '🏆' },
          { label: language === 'bm' ? 'Nyawa' : 'Hearts', value: hearts, color: '#FF4B4B', emoji: '❤️' },
          { label: 'Stars', value: totalXP, color: '#FFC800', emoji: '⭐' },
          { label: language === 'bm' ? 'Permata' : 'Gems', value: gems, color: '#CE82FF', emoji: '💎'},
        ].map(stat => {
          const isClickable = stat.emoji === '❤️' || stat.emoji === '⭐' || stat.emoji === '💎';
          return (
            <button
              key={stat.label}
              className="profile-stat-card"
              onMouseEnter={playHoverSound}
              onClick={isClickable ? openHeartShop : undefined}
              style={{
                background: '#fff',
                border: '2px solid #E5E5E5',
                borderRadius: '16px',
                padding: '1rem',
                textAlign: 'center',
                cursor: isClickable ? 'pointer' : 'default'
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{stat.emoji}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
            </button>
          );
        })}
      </div>
      <style>{`
        .profile-stat-card {
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .profile-stat-card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          border-color: #999 !important;
        }

        .profile-stat-card:active {
          transform: translateY(-4px) scale(1.02);
        }
      `}</style>
      <HeartShopModal isOpen={isHeartShopOpen} onClose={closeHeartShop} language={language} />
    </div>
  );
}
