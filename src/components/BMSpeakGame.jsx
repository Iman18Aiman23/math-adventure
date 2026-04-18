import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, RefreshCw, SkipForward } from 'lucide-react';
import SpeechManager from '../services/SpeechManager';
import { getShuffledItems, checkBilingualMatch } from '../data/curriculum/index';
import { useGameStateContext } from '../App';
import confetti from 'canvas-confetti';

const ITEMS_PER_ROUND = 10;
const MAX_ATTEMPTS    = 3;

const CAT_LABELS = {
  bm_kv:          '🇲🇾 Suku Kata KV',
  bm_kvk:         '🇲🇾 Suku Kata KVK',
  en_long_vowels: '🇬🇧 Long Vowels',
  numbers:        '🔢 Numbers 1–100',
  common_objects: '🎯 Common Objects',
};

// ── Phase constants ──────────────────────────────────────────────────────────
const PHASE_IDLE      = 'idle';      // item shown, waiting for tap (mobile) or auto-start
const PHASE_SPEAKING  = 'speaking';  // TTS is playing
const PHASE_READY     = 'ready';     // awaiting user to tap 🎤
const PHASE_LISTENING = 'listening'; // mic active
const PHASE_CORRECT   = 'correct';   // correct feedback
const PHASE_WRONG     = 'wrong';     // wrong feedback
const PHASE_CROSSLANG = 'crosslang'; // user said the other language
const PHASE_COMPLETE  = 'complete';  // all items done

export default function BMSpeakGame({ category, onBack, language = 'bm' }) {
  const gameState = useGameStateContext();
  const isIOS     = SpeechManager.isIOS();
  const isMobile  = SpeechManager.isMobile();

  // ── Game state ─────────────────────────────────────────────────────────────
  const [items,       setItems]       = useState([]);
  const [index,       setIndex]       = useState(0);
  const [phase,       setPhase]       = useState(PHASE_IDLE);
  const [score,       setScore]       = useState(0);
  const [streak,      setStreak]      = useState(0);
  const [attempts,    setAttempts]    = useState(0);
  const [lang,        setLang]        = useState(category === 'en_long_vowels' ? 'en' : 'ms');       // 'ms' | 'en'
  const [showHint,    setShowHint]    = useState(false);
  const [lastHeard,   setLastHeard]   = useState('');
  const [phaseTimers, setPhaseTimers] = useState([]);

  // stable refs to avoid stale closures in callbacks
  const indexRef   = useRef(index);
  const itemsRef   = useRef(items);
  const phaseRef   = useRef(phase);
  const attRef     = useRef(attempts);
  const langRef    = useRef(lang);

  useEffect(() => { indexRef.current  = index;    }, [index]);
  useEffect(() => { itemsRef.current  = items;    }, [items]);
  useEffect(() => { phaseRef.current  = phase;    }, [phase]);
  useEffect(() => { attRef.current    = attempts; }, [attempts]);
  useEffect(() => { langRef.current   = lang;     }, [lang]);

  // ── Load items on mount / category change ──────────────────────────────────
  useEffect(() => {
    const loaded = getShuffledItems(category, ITEMS_PER_ROUND);
    setItems(loaded);
    setIndex(0);
    setScore(0);
    setStreak(0);
    setAttempts(0);
    setLang(category === 'en_long_vowels' ? 'en' : 'ms');
    setShowHint(false);
    setPhase(PHASE_SPEAKING);
    setLastHeard('');
  }, [category]);

  // Cleanup on unmount
  useEffect(() => () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
  }, []);

  // ── Current item ───────────────────────────────────────────────────────────
  const item     = items[index] ?? null;
  const langData = item ? item[lang] : null;
  const progress = items.length > 0 ? (index / items.length) * 100 : 0;

  // ── TTS helper ─────────────────────────────────────────────────────────────
  const speak = useCallback(async (text, l) => {
    if (!SpeechManager.isTTSSupported()) return;
    const ttsLang = l === 'ms' ? 'ms-MY' : 'en-US';
    await SpeechManager.speak(text, ttsLang);
  }, []);

  // ── Advance to next item ───────────────────────────────────────────────────
  const advanceItem = useCallback((nextIndex) => {
    const ni = nextIndex ?? (indexRef.current + 1);
    if (ni >= itemsRef.current.length) {
      setPhase(PHASE_COMPLETE);
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      return;
    }
    setIndex(ni);
    setAttempts(0);
    setLastHeard('');
    setShowHint(false);
    setPhase(PHASE_SPEAKING);
  }, []);

  // ── Auto-speak when phase becomes SPEAKING ─────────────────────────────────
  useEffect(() => {
    if (phase !== PHASE_SPEAKING || !item || !langData) return;
    let cancelled = false;

    (async () => {
      await speak(langData.prompt, lang);
      if (cancelled) return;
      // On desktop → auto-start mic; on mobile → wait for tap
      setPhase(isMobile ? PHASE_READY : PHASE_LISTENING);
    })();

    return () => { cancelled = true; SpeechManager.stopSpeaking(); };
  }, [phase, item, langData, lang, isMobile, speak]);

  // ── Auto-listen when phase becomes LISTENING (desktop only) ───────────────
  useEffect(() => {
    if (phase !== PHASE_LISTENING) return;
    if (isMobile) return; // mobile starts via tap button (user gesture)
    startListening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ── Core listening function ────────────────────────────────────────────────
  // This MUST be called directly from onClick on iOS (no async chain before it)
  const startListening = () => {
    if (!SpeechManager.isSupported()) return;
    setPhase(PHASE_LISTENING);

    const currentItem = itemsRef.current[indexRef.current];
    const currentLang = langRef.current;
    const currentLangData = currentItem?.[currentLang];
    const recLang = currentLang === 'ms' ? 'ms-MY' : 'en-US';
    const grammarWords = currentLangData
      ? [currentLangData.word || currentLangData.syllable || '', ...(currentLangData.matches || [])]
      : [];

    SpeechManager.listen(
      recLang,
      (transcript, confidence, alts) => {
        // Check match
        let matchResult = checkBilingualMatch(currentItem, currentLang, transcript, confidence, isMobile);
        // Check alternatives
        if (!matchResult.matched && !matchResult.crossLang && alts?.length > 1) {
          for (const alt of alts) {
            const r = checkBilingualMatch(currentItem, currentLang, alt.transcript, alt.confidence, isMobile);
            if (r.matched || r.crossLang) { matchResult = r; break; }
          }
        }

        setLastHeard(transcript);

        if (matchResult.matched) {
          handleCorrect(currentItem, transcript);
        } else if (matchResult.crossLang) {
          handleCrossLang(currentItem, transcript);
        } else {
          handleWrong(currentItem, transcript);
        }
      },
      (error) => {
        console.warn('[BMSpeakGame] STT error:', error);
        const curAttempts = attRef.current;
        if (curAttempts < MAX_ATTEMPTS) {
          setAttempts(a => a + 1);
          setPhase(PHASE_READY); // let user tap again
        } else {
          setPhase(PHASE_WRONG);
          setLastHeard('');
          setTimeout(() => advanceItem(), 2000);
        }
      },
      { retries: isMobile ? 2 : 1, grammarWords }
    );
  };

  // ── Result handlers ────────────────────────────────────────────────────────
  const handleCorrect = (currentItem, transcript) => {
    setScore(s => s + 1);
    setStreak(s => {
      const next = s + 1;
      if (next > 0 && next % 5 === 0) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
      return next;
    });
    setAttempts(0);
    setPhase(PHASE_CORRECT);
    gameState?.addWin?.(10);

    // TTS praise
    const praises = lang === 'ms'
      ? ['Bagus!', 'Hebat!', 'Cemerlang!', 'Bijak!', 'Terbaik!']
      : ['Good job!', 'Excellent!', 'Brilliant!', 'Awesome!', 'Perfect!'];
    speak(praises[Math.floor(Math.random() * praises.length)], lang);

    setTimeout(() => advanceItem(), 1800);
  };

  const handleWrong = (currentItem, transcript) => {
    setStreak(0);
    setAttempts(a => a + 1);
    const over = attRef.current + 1 >= MAX_ATTEMPTS;
    setPhase(PHASE_WRONG);
    if (over) {
      setTimeout(() => advanceItem(), 2200);
    } else {
      setTimeout(() => setPhase(PHASE_READY), 1800);
    }
  };

  const handleCrossLang = (currentItem, transcript) => {
    setPhase(PHASE_CROSSLANG);
    const msg = lang === 'en'
      ? "That's Malay! Try English."
      : "Itu English! Cuba Bahasa Melayu.";
    speak(msg, lang);
    setTimeout(() => setPhase(PHASE_READY), 2500);
  };

  const handleRepeat = () => {
    if (!langData) return;
    SpeechManager.stop();
    speak(langData.prompt, lang).then(() => {
      if (isMobile) setPhase(PHASE_READY);
      else { setPhase(PHASE_LISTENING); }
    });
  };

  const handleSkip = () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    advanceItem();
  };

  const handleToggleLang = () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    setLang(l => l === 'ms' ? 'en' : 'ms');
    setAttempts(0);
    setPhase(PHASE_SPEAKING);
  };

  // ── Complete screen ────────────────────────────────────────────────────────
  if (phase === PHASE_COMPLETE) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#fff' }}>
        <div className="game-header">
          <div className="header-section left">
            <button onClick={onBack} style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={22} />
            </button>
          </div>
          <div className="header-section middle">
            <span className="header-title">🗣️ {CAT_LABELS[category] || category}</span>
          </div>
          <div className="header-section right" />
        </div>

        <div className="lesson-complete fade-in">
          <div className="lesson-complete-mascot">🦉</div>
          <h2 className="lesson-complete-title win">
            {language === 'bm' ? 'Tahniah! 🎉' : 'Well Done! 🎉'}
          </h2>
          <div className="lesson-complete-stats">
            <div className="lesson-stat-chip">
              <div className="lesson-stat-chip-label">Score</div>
              <div className="lesson-stat-chip-value" style={{ color: '#FFC800' }}>⭐ {score}</div>
            </div>
            <div className="lesson-stat-chip">
              <div className="lesson-stat-chip-label">Best Streak</div>
              <div className="lesson-stat-chip-value" style={{ color: '#FF9600' }}>🔥 {streak}</div>
            </div>
            <div className="lesson-stat-chip">
              <div className="lesson-stat-chip-label">+XP</div>
              <div className="lesson-stat-chip-value" style={{ color: '#58CC02' }}>{score * 10}</div>
            </div>
          </div>
          <button className="btn-primary w-full" style={{ marginTop: '1rem', padding: '1.1rem' }} onClick={onBack}>
            {language === 'bm' ? 'Kembali' : 'Back to Menu'}
          </button>
        </div>
      </div>
    );
  }

  // ── Not supported ──────────────────────────────────────────────────────────
  const unsupportedReason = SpeechManager.getUnsupportedReason();
  if (unsupportedReason) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#fff' }}>
        <div className="game-header">
          <div className="header-section left">
            <button onClick={onBack} style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={22} />
            </button>
          </div>
          <div className="header-section middle">
            <span className="header-title">🗣️ Speak & Play</span>
          </div>
          <div className="header-section right" />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem' }}>🎤</div>
          <h2 style={{ fontWeight: 800, fontSize: '1.2rem', color: '#3C3C3C' }}>Suara Tidak Tersedia</h2>
          <p style={{ color: '#777', fontWeight: 600, lineHeight: 1.5 }}>{unsupportedReason}</p>
          <button className="btn-secondary" onClick={onBack} style={{ marginTop: '0.5rem' }}>
            ← {language === 'bm' ? 'Kembali' : 'Go Back'}
          </button>
        </div>
      </div>
    );
  }

  // ── Active game ────────────────────────────────────────────────────────────
  const isListening = phase === PHASE_LISTENING;
  const isCorrect   = phase === PHASE_CORRECT;
  const isWrong     = phase === PHASE_WRONG || phase === PHASE_CROSSLANG;
  const canTap      = phase === PHASE_READY && isMobile;
  const canTapIOS   = phase === PHASE_READY && isIOS; // iOS: must call startListening directly in onClick

  // Display item text
  const displayText = !item ? '' :
    category === 'common_objects' ? (item.icon || '?') :
    langData ? (langData.word || langData.syllable || item.text || '') : (item.text || '');

  // Colors
  const cardBorder = isCorrect ? '#58CC02' : isWrong ? '#FF4B4B' : '#E5E5E5';
  const cardBg     = isCorrect ? '#F0FFF0' : isWrong ? '#FFF0F0' : '#FFFFFF';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'auto', background: '#fff', position: 'relative' }}>

      {/* ── Header ── */}
      <div className="game-header">
        <div className="header-section left">
          <button onClick={() => { SpeechManager.stop(); SpeechManager.stopSpeaking(); onBack(); }}
            style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={22} />
          </button>
        </div>
        <div className="header-section middle" style={{ flex: 2 }}>
          <div className="lesson-progress-track">
            <div className="lesson-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="header-section right" style={{ gap: '8px' }}>
          <span style={{ fontWeight: 800, color: '#FFC800', fontSize: '0.95rem' }}>⭐ {score}</span>
          <span style={{ fontWeight: 800, color: '#FF9600', fontSize: '0.95rem' }}>🔥 {streak}</span>
        </div>
      </div>

      {/* ── Sub-header: category + lang toggle ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', background: '#f7f7f7', borderBottom: '1px solid #E5E5E5', flexShrink: 0 }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#AFAFAF' }}>{CAT_LABELS[category] || category}</span>
        <button onClick={handleToggleLang}
          style={{ background: '#fff', border: '2px solid #E5E5E5', borderRadius: '999px', padding: '4px 14px', fontWeight: 800, fontSize: '0.8rem', color: '#1CB0F6', cursor: 'pointer' }}>
          {lang === 'ms' ? 'BM → EN' : 'EN → BM'}
        </button>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 1rem', gap: '1rem', overflow: 'visible' }}>

        {/* Item card */}
        <div style={{
          background: cardBg,
          border: `3px solid ${cardBorder}`,
          borderRadius: '24px',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          width: '100%',
          maxWidth: '480px',
          transition: 'background 0.3s, border-color 0.3s',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          position: 'relative'
        }}>
          {category === 'common_objects' && (
            <button
              onClick={() => setShowHint(h => !h)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.4rem',
                padding: '4px',
                color: '#1CB0F6',
                transition: 'transform 0.1s'
              }}
              title="Show Hint"
            >
              💡
            </button>
          )}

          {/* Hint / hint text at top */}
          {langData?.prompt && (
            <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#AFAFAF', marginBottom: '0.75rem', letterSpacing: '0.3px', padding: '0 2rem' }}>
              {langData.prompt}
            </p>
          )}

          {/* Big display text / emoji */}
          <div style={{
            fontSize: category === 'common_objects' ? '5rem' : category === 'numbers' ? 'clamp(1.8rem, 6vw, 2.8rem)' : 'clamp(2.5rem, 14vw, 4.5rem)',
            lineHeight: 1.2,
            fontWeight: 900,
            color: isCorrect ? '#46A302' : isWrong ? '#CC3B3B' : '#3C3C3C',
            animation: phase === PHASE_IDLE || phase === PHASE_SPEAKING ? 'bounce 2.5s ease-in-out infinite' : 'none',
            fontFamily: category === 'numbers' ? '"Nunito", sans-serif' : 'inherit',
            transition: 'color 0.3s',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            maxWidth: '100%',
          }}>
            {displayText || '⏳'}
          </div>

          {/* Hint: show answer when max attempts reached or showHint is true */}
          {((attempts >= MAX_ATTEMPTS) || showHint) && langData && (
            <div style={{ marginTop: '0.75rem', background: '#EDD9FF', borderRadius: '12px', padding: '0.5rem 1rem' }}>
              <span style={{ fontWeight: 800, color: '#9B59B6', fontSize: '1.2rem' }}>
                {langData.word || langData.syllable}
              </span>
            </div>
          )}
        </div>

        {/* Phase indicator / mic state */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minHeight: '80px', justifyContent: 'center' }}>

          {/* Listening pulsing ring */}
          {isListening && (
            <div style={{ position: 'relative', width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', width: 72, height: 72, borderRadius: '50%', background: 'rgba(28,176,246,0.15)', animation: 'pulseRing 1.2s ease-out infinite' }} />
              <div style={{ position: 'absolute', width: 56, height: 56, borderRadius: '50%', background: 'rgba(28,176,246,0.2)', animation: 'pulseRing 1.2s ease-out 0.3s infinite' }} />
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#1CB0F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', boxShadow: '0 4px 12px rgba(28,176,246,0.4)' }}>
                🎤
              </div>
            </div>
          )}
          {isListening && (
            <p style={{ fontWeight: 800, color: '#1CB0F6', fontSize: '0.9rem' }}>
              {language === 'bm' ? 'Bercakap sekarang...' : 'Speak now...'}
            </p>
          )}

          {/* Speaking / loading */}
          {phase === PHASE_SPEAKING && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#AFAFAF', fontWeight: 700, fontSize: '0.9rem' }}>
              <span style={{ animation: 'bounce 1s ease-in-out infinite', fontSize: '1.4rem' }}>🔊</span>
              <span>{language === 'bm' ? 'Mendengar arahan...' : 'Playing prompt...'}</span>
            </div>
          )}

          {/* Ready to tap */}
          {phase === PHASE_READY && (
            <p style={{ fontWeight: 700, color: '#AFAFAF', fontSize: '0.88rem' }}>
              {language === 'bm' ? 'Tekan 🎤 untuk bercakap' : 'Tap 🎤 to speak'}
              {attempts > 0 && ` (${language === 'bm' ? 'Cuba' : 'Try'} ${attempts + 1}/${MAX_ATTEMPTS})`}
            </p>
          )}

          {/* Feedback text */}
          {lastHeard && (phase === PHASE_WRONG || phase === PHASE_CORRECT) && (
            <p style={{ fontWeight: 700, fontSize: '0.85rem', color: isCorrect ? '#46A302' : '#CC3B3B' }}>
              "{lastHeard}"
            </p>
          )}
          {phase === PHASE_CROSSLANG && (
            <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#CE82FF', textAlign: 'center' }}>
              {lang === 'en' ? "That's Malay! Try English 🔄" : "Itu English! Cuba BM 🔄"}
            </p>
          )}
        </div>

        {/* Aux buttons: Repeat (left) | Skip (right) */}
        {(phase === PHASE_READY || phase === PHASE_LISTENING || phase === PHASE_SPEAKING) && (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={handleRepeat}
              style={{
                width: 52, height: 52, borderRadius: '50%',
                background: '#fff', border: '2px solid #E5E5E5',
                borderBottom: '4px solid #D0D0D0', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                transition: 'transform 0.1s', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
              title="Repeat prompt">
              <RefreshCw size={22} color="#FF9600" />
            </button>
            <button onClick={handleSkip}
              style={{
                width: 52, height: 52, borderRadius: '50%',
                background: '#fff', border: '2px solid #E5E5E5',
                borderBottom: '4px solid #D0D0D0', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                transition: 'transform 0.1s', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
              title="Skip">
              <SkipForward size={22} color="#FF4B4B" />
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom: large MIC tap button (mobile) ── */}
      {(phase === PHASE_READY || phase === PHASE_LISTENING || phase === PHASE_CORRECT || phase === PHASE_WRONG) && (
        <div style={{ padding: '1rem 1.5rem', paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))', background: '#fff', borderTop: '2px solid #E5E5E5', flexShrink: 0 }}>
          {phase === PHASE_READY && (
            <button
              onClick={() => {
                // iOS: recognition.start() must fire directly in this onClick (no await)
                startListening();
              }}
              className="btn-primary w-full"
              style={{
                padding: '1.1rem',
                fontSize: '1.1rem',
                background: '#1CB0F6',
                borderBottomColor: '#0B8DC0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              }}
            >
              🎤 {language === 'bm' ? 'Tekan untuk Bercakap' : 'Tap to Speak'}
            </button>
          )}

          {phase === PHASE_LISTENING && (
            <button
              onClick={() => { SpeechManager.stop(); setPhase(PHASE_READY); }}
              className="btn-secondary w-full"
              style={{ padding: '1.1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              ⏸ {language === 'bm' ? 'Berhenti' : 'Stop'}
            </button>
          )}

          {(phase === PHASE_CORRECT || phase === PHASE_WRONG) && (
            <button
              onClick={() => advanceItem()}
              className="btn-primary w-full"
              style={{
                padding: '1.1rem', fontSize: '1.1rem',
                background: isCorrect ? '#58CC02' : '#FF4B4B',
                borderBottomColor: isCorrect ? '#46A302' : '#CC3B3B',
              }}
            >
              {isCorrect ? (language === 'bm' ? '✓ Teruskan' : '✓ Continue') : (language === 'bm' ? '→ Soalan Seterusnya' : '→ Next')}
            </button>
          )}
        </div>
      )}

      {/* Desktop: auto-listening, feedback drawer style */}
      {!isMobile && (phase === PHASE_CORRECT || phase === PHASE_WRONG || phase === PHASE_CROSSLANG) && (
        <div className={`feedback-drawer ${isCorrect ? 'correct' : 'wrong'}`}>
          <div className="drawer-mascot">{isCorrect ? '🦉' : phase === PHASE_CROSSLANG ? '🔄' : '🦉'}</div>
          <div className="drawer-content">
            <div className="drawer-label">
              {isCorrect ? (language === 'bm' ? 'Betul! Hebat!' : 'Correct! Great!') :
               phase === PHASE_CROSSLANG ? (language === 'bm' ? 'Cuba Bahasa Melayu!' : 'Try English!') :
               (language === 'bm' ? 'Cuba lagi!' : 'Try again!')}
            </div>
            {lastHeard && <div className="drawer-answer">"{lastHeard}"</div>}
          </div>
          <button className="drawer-btn" onClick={() => isCorrect ? advanceItem() : setPhase(PHASE_LISTENING)}>
            {isCorrect ? (language === 'bm' ? 'Terus' : 'Continue') : (language === 'bm' ? 'Cuba' : 'Retry')}
          </button>
        </div>
      )}

      {/* Pulse ring animation */}
      <style>{`
        @keyframes pulseRing {
          0%   { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
