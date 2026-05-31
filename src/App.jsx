import React, { useState, useEffect, createContext, useContext, Suspense, useTransition } from 'react';
import HomePage from './components/HomePage';
import LoadingSkeleton from './components/LoadingSkeleton';
import BMPage from './components/SpeakingPage/BMPage';
import JawiPage from './components/JawiScriptPage/JawiPage';
import MathHome from './components/MathematicsPage/MathHome';
import OpsLandingPage from './components/MathematicsPage/OpsLandingPage';
import TimeGameMenu from './components/MathematicsPage/TimeGameMenu';
const MonthsGame = React.lazy(() => import('./components/MathematicsPage/MonthsGame'));
const ClockGame = React.lazy(() => import('./components/MathematicsPage/ClockGame'));
const MonthLearning = React.lazy(() => import('./components/MathematicsPage/MonthLearning'));
const MathOperationsGame = React.lazy(() => import('./components/MathematicsPage/MathOperationsGame'));
const ColumnMathGame = React.lazy(() => import('./components/MathematicsPage/ColumnMathGame'));
import LevelUpToast from './components/LevelUpToast';
import WelcomeModal from './components/WelcomeModal';
import DesktopSidebar from './components/DesktopSidebar';
import CosmicMobileNav from './components/CosmicMobileNav';
import ReadingPage from './components/ReadingPage/ReadingPage';
import EarlyExplorersHome from './components/AgeGroup-4-6/EarlyExplorersHome';
import Grade1AdventurersHome from './components/AgeGroup-7/Grade1AdventurersHome';
import Grade2DiscoverersHome from './components/AgeGroup-8/Grade2DiscoverersHome';
import Grade3AchieversHome from './components/AgeGroup-9/Grade3AchieversHome';
import './components/AgeGroup-4-6/age46-ui.css';
// Game leaf components are code-split (React.lazy) so they stay out of the main
// bundle. This keeps the initial chunk small — the homepage and age-group menus
// load/parse fast, so the first click isn't blocked by a giant bundle compile.
const KVLearningPage46 = React.lazy(() => import('./components/ReadingPage/KVLearningPage'));
const NumberCards = React.lazy(() => import('./components/AgeGroup-4-6/NumberCards'));
const AlphabetSafari = React.lazy(() => import('./components/AgeGroup-4-6/AlphabetSafari'));
const BelajarMengira = React.lazy(() => import('./components/AgeGroup-4-6/BelajarMengira'));
const ShapeSorter = React.lazy(() => import('./components/AgeGroup-4-6/ShapeSorter'));
const NumberMatch = React.lazy(() => import('./components/AgeGroup-4-6/NumberMatch'));
const AppleAddition = React.lazy(() => import('./components/AgeGroup-4-6/AppleAddition'));
const MissingNumber = React.lazy(() => import('./components/AgeGroup-4-6/MissingNumber'));
const SpeakingGame4to6 = React.lazy(() => import('./components/AgeGroup-4-6/SpeakingGame4to6'));
const JawiLetterCards = React.lazy(() => import('./components/AgeGroup-4-6/JawiLetterCards'));
const JawiLetterMatch = React.lazy(() => import('./components/AgeGroup-4-6/JawiLetterMatch'));
const LetterTrace = React.lazy(() => import('./components/AgeGroup-4-6/LetterTrace'));
const PhoneticsPop = React.lazy(() => import('./components/AgeGroup-4-6/PhoneticsPop'));
const SoundMatching = React.lazy(() => import('./components/AgeGroup-4-6/SoundMatching'));
const LetterSoundPuzzle = React.lazy(() => import('./components/AgeGroup-4-6/LetterSoundPuzzle'));
const SentenceBuilder = React.lazy(() => import('./components/AgeGroup-7/SentenceBuilder'));
const SukuKataBinaPerkataan = React.lazy(() => import('./components/AgeGroup-7/SukuKataBinaPerkataan'));
const JenisKata = React.lazy(() => import('./components/AgeGroup-7/JenisKata'));
const KataTanya = React.lazy(() => import('./components/AgeGroup-7/KataTanya'));
const KataHubungSendi = React.lazy(() => import('./components/AgeGroup-7/KataHubungSendi'));
const KataImbuhan = React.lazy(() => import('./components/AgeGroup-7/KataImbuhan'));
const EjaanTandaBaca = React.lazy(() => import('./components/AgeGroup-7/EjaanTandaBaca'));
const KataGanda = React.lazy(() => import('./components/AgeGroup-7/KataGanda'));
const KefahamanBacaan = React.lazy(() => import('./components/AgeGroup-7/KefahamanBacaan'));
const BacaSukuKataJawi = React.lazy(() => import('./components/AgeGroup-7/BacaSukuKataJawi'));
const BinaPerkataanJawi = React.lazy(() => import('./components/AgeGroup-7/BinaPerkataanJawi'));
const PadanPerkataanJawi = React.lazy(() => import('./components/AgeGroup-7/PadanPerkataanJawi'));
const BacaAyatJawi = React.lazy(() => import('./components/AgeGroup-7/BacaAyatJawi'));
const TulisJawi = React.lazy(() => import('./components/AgeGroup-7/TulisJawi'));
const TimeTeller = React.lazy(() => import('./components/AgeGroup-7/TimeTeller'));
const CountingMoney = React.lazy(() => import('./components/AgeGroup-7/CountingMoney'));
const SubtractionStory = React.lazy(() => import('./components/AgeGroup-7/SubtractionStory'));
const BacaAyatKuat = React.lazy(() => import('./components/AgeGroup-7/BacaAyatKuat'));
const BertuturBertatasusila = React.lazy(() => import('./components/AgeGroup-7/BertuturBertatasusila'));
const JawabSoalan = React.lazy(() => import('./components/AgeGroup-7/JawabSoalan'));
const SebutLawanKata = React.lazy(() => import('./components/AgeGroup-7/SebutLawanKata'));
const SebutFrasaBergambar = React.lazy(() => import('./components/AgeGroup-7/SebutFrasaBergambar'));
const Nombor100 = React.lazy(() => import('./components/AgeGroup-7/Nombor100'));
const Tambah100 = React.lazy(() => import('./components/AgeGroup-7/Tambah100'));
const Bentuk3D = React.lazy(() => import('./components/AgeGroup-7/Bentuk3D'));
const UkurPanjang = React.lazy(() => import('./components/AgeGroup-7/UkurPanjang'));
const BacaPictograph = React.lazy(() => import('./components/AgeGroup-7/BacaPictograph'));
const Jisim = React.lazy(() => import('./components/AgeGroup-7/Jisim'));
const IsiPaduCecair = React.lazy(() => import('./components/AgeGroup-7/IsiPaduCecair'));
const KosaKataKontekstual = React.lazy(() => import('./components/AgeGroup-8/KosaKataKontekstual'));
const BacaanPemahaman = React.lazy(() => import('./components/AgeGroup-8/BacaanPemahaman'));
const CeritaBacaan = React.lazy(() => import('./components/AgeGroup-8/CeritaBacaan'));
const PengenalanNilai = React.lazy(() => import('./components/AgeGroup-8/PengenalanNilai'));
const PantunBacaan = React.lazy(() => import('./components/AgeGroup-8/PantunBacaan'));
const DarabMudah = React.lazy(() => import('./components/AgeGroup-8/DarabMudah'));
const Wang = React.lazy(() => import('./components/AgeGroup-8/Wang'));
const Masa = React.lazy(() => import('./components/AgeGroup-8/Masa'));
const Pecahan = React.lazy(() => import('./components/AgeGroup-8/Pecahan'));
const Nombor1000 = React.lazy(() => import('./components/AgeGroup-8/Nombor1000'));
const TambahTahun2 = React.lazy(() => import('./components/AgeGroup-8/TambahTahun2'));
const TolakTahun2 = React.lazy(() => import('./components/AgeGroup-8/TolakTahun2'));
const UkuranPanjangTahun2 = React.lazy(() => import('./components/AgeGroup-8/UkuranPanjangTahun2'));
const BacaPetikanJawi = React.lazy(() => import('./components/AgeGroup-8/BacaPetikanJawi'));
const PadanKataKerjaJawi = React.lazy(() => import('./components/AgeGroup-8/PadanKataKerjaJawi'));
const SusunAyatJawi = React.lazy(() => import('./components/AgeGroup-8/SusunAyatJawi'));
const LafazPantun = React.lazy(() => import('./components/AgeGroup-8/LafazPantun'));
const JenisAyat = React.lazy(() => import('./components/AgeGroup-9/JenisAyat'));
const PenjodohBilangan = React.lazy(() => import('./components/AgeGroup-9/PenjodohBilangan'));
const ImbuhanLanjutan = React.lazy(() => import('./components/AgeGroup-9/ImbuhanLanjutan'));
const SimpulanBahasa = React.lazy(() => import('./components/AgeGroup-9/SimpulanBahasa'));
const BacaanPemahamanLanjutan = React.lazy(() => import('./components/AgeGroup-9/BacaanPemahamanLanjutan'));
const Nombor10000    = React.lazy(() => import('./components/AgeGroup-9/Nombor10000'));
const DarabLanjutan  = React.lazy(() => import('./components/AgeGroup-9/DarabLanjutan'));
const BahagiTahun3    = React.lazy(() => import('./components/AgeGroup-9/BahagiTahun3'));
const PecahanLanjutan = React.lazy(() => import('./components/AgeGroup-9/PecahanLanjutan'));
const Perpuluhan      = React.lazy(() => import('./components/AgeGroup-9/Perpuluhan'));
const WangTahun3      = React.lazy(() => import('./components/AgeGroup-9/WangTahun3'));
const MasaTahun3      = React.lazy(() => import('./components/AgeGroup-9/MasaTahun3'));
const PerimeterLuas   = React.lazy(() => import('./components/AgeGroup-9/PerimeterLuas'));
import ProfileHome from './components/Profile/ProfileHome';
import PendidikanIslamHomePage from './components/PendidikanIslamPage/PendidikanIslamHomePage';
const AlQuranTajwidModule = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/AlQuranTajwidModule'));
const HurufHijaiyah       = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/HurufHijaiyah'));
const TandaBacaan         = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/TandaBacaan'));
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
  // Soft & warm — rose. (key kept as 'cosmic' for saved-selection compatibility)
  cosmic: {
    key: 'cosmic', label: 'Blush', swatch: '#E58AA8',
    sidebarBg: 'linear-gradient(180deg, #C76A8C 0%, #E18AA8 45%, #F4B6C8 80%, #C76A8C 100%)',
    appBg: '#3A1E2A',
    contentBg: 'linear-gradient(175deg, #4E2937 0%, #7A4459 40%, #B06E84 70%, #4E2937 100%)',
    heroBg: 'linear-gradient(135deg, #9C546F 0%, #E18AA8 50%, #F8C9D6 100%)',
    heroBorder: '#FAD6E0',
    planetBody: 'radial-gradient(circle at 30% 30%, #F4B6C8, #E18AA8)',
    planetRing: '#FAD6E0',
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
  // Soft & warm — peach/coral. (key kept as 'sunny')
  sunny: {
    key: 'sunny', label: 'Peach', swatch: '#FB9A77',
    sidebarBg: 'linear-gradient(180deg, #E27A57 0%, #FB9A77 45%, #FFC2A6 80%, #E27A57 100%)',
    appBg: '#3A2218',
    contentBg: 'linear-gradient(175deg, #51301F 0%, #834B33 40%, #BE7150 70%, #51301F 100%)',
    heroBg: 'linear-gradient(135deg, #B25C3C 0%, #FB9A77 50%, #FFCDB6 100%)',
    heroBorder: '#FFDCCB',
    planetBody: 'radial-gradient(circle at 30% 30%, #FFC2A6, #FB9A77)',
    planetRing: '#FFDCCB',
  },
  // Soft & warm — sand/caramel. (key kept as 'forest')
  forest: {
    key: 'forest', label: 'Sand', swatch: '#E0AC72',
    sidebarBg: 'linear-gradient(180deg, #C0904F 0%, #E0AC72 45%, #F1D2A4 80%, #C0904F 100%)',
    appBg: '#332515',
    contentBg: 'linear-gradient(175deg, #46341C 0%, #6E5230 40%, #A07C4A 70%, #46341C 100%)',
    heroBg: 'linear-gradient(135deg, #8A6438 0%, #E0AC72 50%, #F3DAB3 100%)',
    heroBorder: '#F6E3C6',
    planetBody: 'radial-gradient(circle at 30% 30%, #F1D2A4, #E0AC72)',
    planetRing: '#F6E3C6',
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
  const [islamModule, setIslamModule] = useState(null);
  const [islamTopic,  setIslamTopic]  = useState(null);

  // useTransition keeps the current screen visible while a lazy game chunk
  // loads, so navigation never blanks to a fallback for fast loads. isPending
  // drives a slim top progress bar for feedback.
  const [isPending, startTransition] = useTransition();
  const navigate = (fn) => startTransition(fn);

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
    // Preload lazy tab bundles after initial paint so first-click is instant
    const t = setTimeout(() => {
      import('./components/Achievement/AchievementHome');
      import('./components/Leaderboard/LeaderboardHome');
    }, 2000);
    return () => {
      document.removeEventListener('click', handleFirstClick);
      clearTimeout(t);
    };
  }, []);

  const handleStartGame    = (op, diff, _nums = [], qType = 'multiple') => { setGameConfig({ operation: op, difficulty: diff, nums: _nums, quizType: qType }); setIsPlaying(true); };
  const handleBackToMenu   = () => setIsPlaying(false);
  const handleStartTimeGame= (gameId) => { setDateTimeSubGame(gameId); setIsPlaying(true); };
  const handleBackToHome   = () => { setIsPlaying(false); setMathSubGame(null); setDateTimeSubGame(null); setCurrentSubject(null); setCurrentAgeGroup(null); setCurrentAgeGame(null); setIslamModule(null); setIslamTopic(null); setActiveTab('learn'); };
  const handleToggleMute   = () => { const m = !isMuted; setIsMuted(m); setMuted(m); };
  const handleToggleLang   = () => setLanguage(l => l === 'bm' ? 'eng' : 'bm');

  const inActiveQuiz = isPlaying;
  const viewKey = `${activeTab}-${currentSubject}-${mathSubGame}-${dateTimeSubGame}-${isPlaying}-${selectedAssessment?.id}`;

  // Hide sidebar during game play or assessment
  const shouldHideSidebar = isPlaying || (currentSubject === 'math' && mathSubGame === 'faq') || isPlayingJawiGame || selectedAssessment || !!currentAgeGame;

  // ── Content renderer ──────────────────────────────────────────────────────
  const renderContent = () => {
    if (activeTab === 'leaderboard') return (
      <Suspense fallback={<LoadingSkeleton />}>
        <LeaderboardHome language={language} gameState={gameState} theme={THEMES[currentTheme]} />
      </Suspense>
    );
    if (activeTab === 'profile') {
      return <ProfileHome playerName={playerName} gameState={gameState} language={language} streak={streak} />;
    }
    if (activeTab === 'achievement') {
      // If an assessment is selected, show AssessmentPage
      if (selectedAssessment) {
        return <AssessmentPage assessment={selectedAssessment} onBack={() => setSelectedAssessment(null)} language={language} gameState={gameState} />;
      }
      // Otherwise show achievement home
      return <Suspense fallback={<LoadingSkeleton />}>
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
      case 'pendidikan-islam-v1':
        if (islamModule === 'al-quran') {
          if (islamTopic === 'huruf-hijaiyah') {
            return <HurufHijaiyah onBack={() => setIslamTopic(null)} language={language} />;
          }
          if (islamTopic === 'tanda-bacaan') {
            return <TandaBacaan onBack={() => setIslamTopic(null)} language={language} />;
          }
          return <AlQuranTajwidModule onBack={() => setIslamModule(null)} language={language} onSelectTopic={(id) => navigate(() => setIslamTopic(id))} />;
        }
        return <PendidikanIslamHomePage onBack={handleBackToHome} language={language} onSelectModule={(id) => navigate(() => setIslamModule(id))} />;
      case 'reading':
        return <ReadingPage onBack={handleBackToHome} language={language} />;
      default:
        // Age-group routing takes precedence over the default home screen.
        if (currentAgeGame === 'alphabet-safari') {
          return <AlphabetSafari onBack={() => setCurrentAgeGame(null)} language={language} theme={THEMES[currentTheme]} />;
        }
        if (currentAgeGame === 'letter-trace') {
          return <LetterTrace onBack={() => setCurrentAgeGame(null)} language={language} theme={THEMES[currentTheme]} />;
        }
        if (currentAgeGame === 'phonics-pop') {
          return <PhoneticsPop onBack={() => setCurrentAgeGame(null)} language={language} theme={THEMES[currentTheme]} />;
        }
        if (currentAgeGame === 'sound-matching') {
          return <SoundMatching onBack={() => setCurrentAgeGame(null)} language={language} theme={THEMES[currentTheme]} />;
        }
        if (currentAgeGame === 'letter-sound-puzzle') {
          return <LetterSoundPuzzle onBack={() => setCurrentAgeGame(null)} language={language} theme={THEMES[currentTheme]} />;
        }
        if (currentAgeGame === 'alphabet-cards') {
          return <KVLearningPage46 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'number-cards') {
          return <NumberCards onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'counting-stars') {
          return <BelajarMengira onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'shape-sorter') {
          return <ShapeSorter onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'number-match') {
          return <NumberMatch onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'apple-addition') {
          return <AppleAddition onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'missing-number') {
          return <MissingNumber onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'sebut-huruf') {
          return <SpeakingGame4to6 category="huruf" onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'sebut-perkataan') {
          return <SpeakingGame4to6 category="perkataan" onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'sebut-nombor') {
          return <SpeakingGame4to6 category="nombor" onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'jawi-letter-cards') {
          return <JawiLetterCards onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'jawi-letter-match') {
          return <JawiLetterMatch onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'sentence-builder') {
          return <SentenceBuilder onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'suku-kata-bina-perkataan') {
          return <SukuKataBinaPerkataan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'jenis-kata') {
          return <JenisKata onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'kata-tanya') {
          return <KataTanya onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'kata-hubung-sendi') {
          return <KataHubungSendi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'kata-imbuhan') {
          return <KataImbuhan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'ejaan-tanda-baca') {
          return <EjaanTandaBaca onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'kata-ganda') {
          return <KataGanda onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'kefahaman-bacaan') {
          return <KefahamanBacaan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'baca-suku-kata-jawi') {
          return <BacaSukuKataJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'bina-perkataan-jawi') {
          return <BinaPerkataanJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'padan-perkataan-jawi') {
          return <PadanPerkataanJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'baca-ayat-jawi') {
          return <BacaAyatJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'tulis-jawi') {
          return <TulisJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'time-teller') {
          return <TimeTeller onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'counting-money') {
          return <CountingMoney onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'subtraction-story') {
          return <SubtractionStory onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'baca-ayat-kuat') {
          return <BacaAyatKuat onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'bertutur-bertatasusila') {
          return <BertuturBertatasusila onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'jawab-soalan') {
          return <JawabSoalan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'sebut-lawan-kata') {
          return <SebutLawanKata onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'sebut-frasa-bergambar') {
          return <SebutFrasaBergambar onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'nombor-100') {
          return <Nombor100 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'tambah-100') {
          return <Tambah100 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'bentuk-3d') {
          return <Bentuk3D onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'ukur-panjang') {
          return <UkurPanjang onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'baca-pictograph') {
          return <BacaPictograph onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'jisim') {
          return <Jisim onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'isi-padu-cecair') {
          return <IsiPaduCecair onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'kosa-kata-kontekstual') {
          return <KosaKataKontekstual onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'bacaan-pemahaman') {
          return <BacaanPemahaman onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'cerita-bacaan') {
          return <CeritaBacaan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'pengenalan-nilai') {
          return <PengenalanNilai onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'pantun-bacaan') {
          return <PantunBacaan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'darab-mudah') {
          return <DarabMudah onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'wang-tahun2') {
          return <Wang onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'masa-tahun2') {
          return <Masa onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'pecahan-tahun2') {
          return <Pecahan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'nombor-1000') {
          return <Nombor1000 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'tambah-tahun2') {
          return <TambahTahun2 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'tolak-tahun2') {
          return <TolakTahun2 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'ukuran-panjang-tahun2') {
          return <UkuranPanjangTahun2 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'baca-petikan-jawi') {
          return <BacaPetikanJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'padan-kata-kerja-jawi') {
          return <PadanKataKerjaJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'susun-ayat-jawi') {
          return <SusunAyatJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'lafaz-pantun') {
          return <LafazPantun onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'jenis-ayat') {
          return <JenisAyat onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'penjodoh-bilangan') {
          return <PenjodohBilangan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'imbuhan-lanjutan') {
          return <ImbuhanLanjutan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'simpulan-bahasa') {
          return <SimpulanBahasa onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'bacaan-pemahaman-lanjutan') {
          return <BacaanPemahamanLanjutan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'nombor-10000') {
          return <Nombor10000 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'darab-lanjutan') {
          return <DarabLanjutan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'bahagi-tahun3') {
          return <BahagiTahun3 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'pecahan-lanjutan') {
          return <PecahanLanjutan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'perpuluhan') {
          return <Perpuluhan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'wang-tahun3') {
          return <WangTahun3 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'masa-tahun3') {
          return <MasaTahun3 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'perimeter-luas') {
          return <PerimeterLuas onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGroup) {
          const ageGroupComponents = {
            'age-4-6': EarlyExplorersHome,
            'age-7': Grade1AdventurersHome,
            'age-8': Grade2DiscoverersHome,
            'age-9': Grade3AchieversHome,
          };
          const AgeGroupComponent = ageGroupComponents[currentAgeGroup];
          if (AgeGroupComponent) {
            return (
              <AgeGroupComponent
                onBack={() => setCurrentAgeGroup(null)}
                onPlayGame={(gameId) => navigate(() => setCurrentAgeGame(gameId))}
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

        {/* Slim top progress bar — shown while a lazy page chunk is loading */}
        {isPending && (
          <>
            <style>{`
              @keyframes routeBarSlide {
                0%   { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
            `}</style>
            <div aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 9999, overflow: 'hidden', background: 'rgba(124,58,237,0.18)' }}>
              <div style={{ width: '40%', height: '100%', background: 'linear-gradient(90deg, transparent, #A78BFA, #7C3AED, transparent)', animation: 'routeBarSlide 0.9s ease-in-out infinite' }} />
            </div>
          </>
        )}

        {/* Page Content */}
        <div className="app-content">
          <div key={viewKey} className="view-container">
            <Suspense fallback={<LoadingSkeleton />}>
              {renderContent()}
            </Suspense>
          </div>
        </div>

        {/* CosmicMobileNav — rendered outside view-container so position:fixed works correctly */}
        {!inActiveQuiz && !isPlayingJawiGame && !selectedAssessment && !currentAgeGame && !currentAgeGroup && !currentSubject && (
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
