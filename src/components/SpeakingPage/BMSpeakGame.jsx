import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, RefreshCw, SkipForward, Mic, Volume2 } from 'lucide-react';
import SpeechManager from '../../services/SpeechManager';
import { getShuffledItems, checkBilingualMatch } from '../../data/curriculum/index';
import { useGameStateContext } from '../../App';
import MascotIcon from '../icons/MascotIcon';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/soundManager';
import SpeakHeaderArtwork from './SpeakHeaderArtwork';
import './BMSpeakGame.css';

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
  const [micError,    setMicError]    = useState(null); // 'perm' | 'net' | 'nospeech' | null

  // stable refs to avoid stale closures in callbacks
  const indexRef   = useRef(index);
  const itemsRef   = useRef(items);
  const phaseRef   = useRef(phase);
  const attRef     = useRef(attempts);
  const langRef    = useRef(lang);
  const listenActiveRef = useRef(false); // true while a mic session is open (guards double-start)

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
    setMicError(null);
  }, [category]);

  // Cleanup on unmount
  useEffect(() => () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
  }, []);

  // ── Current item ───────────────────────────────────────────────────────────
  const item     = items[index] ?? null;
  const langData = item ? item[lang] : null;

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
    setMicError(null);
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
    if (listenActiveRef.current) return; // session already open — the desktop auto-listen effect
                                         // and the manual tap must not both start one (abort race
                                         // that bounces the button back to "Tekan untuk Bercakap")
    listenActiveRef.current = true;
    setMicError(null);
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
        listenActiveRef.current = false;
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
        listenActiveRef.current = false;
        console.warn('[BMSpeakGame] STT error:', error);
        // Permission / device / insecure-context / network errors won't fix by
        // skipping — show a clear message and let the user grant access & retry.
        if (error === 'not-allowed' || error === 'service-not-allowed' || error === 'audio-capture') {
          setMicError('perm');
          setPhase(PHASE_READY);
          return;
        }
        if (error === 'network') {
          setMicError('net');
          setPhase(PHASE_READY);
          return;
        }
        // no-speech / aborted / other — treat as a missed attempt
        const curAttempts = attRef.current;
        if (curAttempts < MAX_ATTEMPTS) {
          setMicError('nospeech');
          setAttempts(a => a + 1);
          setPhase(PHASE_READY); // let user tap again
        } else {
          setMicError(null);
          setPhase(PHASE_WRONG);
          setLastHeard('');
          setTimeout(() => advanceItem(), 2000);
        }
      },
      { retries: isMobile ? 2 : 1, grammarWords }
    );
  };

  // ── Result handlers ────────────────────────────────────────────────────────
  const handleCorrect = () => {
    setScore(s => s + 1);
    const milestone = (streak + 1) % 5 === 0;
    setStreak(s => s + 1);
    playSound(milestone ? 'streak' : 'correct');
    confetti({ particleCount: milestone ? 150 : 40, spread: milestone ? 100 : 60, origin: { y: 0.6 }, scalar: 0.8 });
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

  const handleWrong = () => {
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

  const handleCrossLang = () => {
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
    listenActiveRef.current = false;
    setMicError(null);
    setPhase(PHASE_SPEAKING);
  };

  const handleSkip = () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    advanceItem();
  };

  const handleToggleLang = () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    setLang(l => l === 'ms' ? 'en' : 'ms');
    setAttempts(0);
    setMicError(null);
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
          <div className="lesson-complete-mascot">
            <MascotIcon size={100} />
          </div>
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

  // Display item text
  const displayText = !item ? '' :
    category === 'common_objects' ? (item.icon || '?') :
    langData ? (langData.word || langData.syllable || item.text || '') : (item.text || '');

  const canSpeak = phase === PHASE_READY || isListening;
  const canNavigate = canSpeak || phase === PHASE_SPEAKING;
  const progress = items.length ? Math.min(index + 1, items.length) : 0;
  const title = language === 'bm' ? 'Dengar dan Sebut' : 'Listen and Say';
  const descriptions = {
    bm_kv: ['Dengar, sebut dan ulang suku kata mudah seperti ba, ca, da.', 'Listen, say and repeat simple syllables like ba, ca, da.'],
    bm_kvk: ['Dengar, sebut dan ulang suku kata tertutup seperti kan, man, cat.', 'Listen, say and repeat closed syllables like kan, man, cat.'],
    en_long_vowels: ['Dengar, sebut dan ulang bunyi vokal Bahasa Inggeris.', 'Listen, say and repeat English long vowel sounds.'],
    numbers: ['Dengar, sebut dan ulang nombor dari 1 hingga 100.', 'Listen, say and repeat numbers from 1 to 100.'],
    common_objects: ['Dengar, sebut dan ulang nama objek di sekeliling kita.', 'Listen, say and repeat the names of everyday objects.'],
  };
  let status = language === 'bm' ? 'Tekan untuk Bercakap' : 'Tap to Speak';
  if (isListening) status = language === 'bm' ? 'Bercakap sekarang...' : 'Speak now...';
  else if (phase === PHASE_SPEAKING) status = language === 'bm' ? 'Dengar dahulu...' : 'Listen first...';
  else if (isCorrect) status = language === 'bm' ? 'Betul! Hebat!' : 'Correct! Great!';
  else if (phase === PHASE_CROSSLANG) status = lang === 'en' ? "That's Malay! Try English." : 'Itu English! Cuba BM.';
  else if (isWrong) status = language === 'bm' ? 'Cuba lagi!' : 'Try again!';

  let errorMessage = '';
  if (phase === PHASE_READY && micError === 'perm') {
    errorMessage = language === 'bm'
      ? (isIOS ? 'Benarkan mikrofon untuk Safari di Tetapan, kemudian cuba lagi.' : 'Benarkan akses mikrofon dalam pelayar, kemudian cuba lagi.')
      : (isIOS ? 'Allow microphone for Safari in Settings, then try again.' : 'Allow microphone access in your browser, then try again.');
  } else if (phase === PHASE_READY && micError === 'net') {
    errorMessage = language === 'bm' ? 'Sambungan internet diperlukan untuk suara. Cuba lagi.' : 'Voice needs an internet connection. Try again.';
  } else if (phase === PHASE_READY && micError === 'nospeech') {
    errorMessage = language === 'bm' ? 'Tak dengar suara. Cuba lagi!' : "Didn't hear you. Try again!";
  }

  return (
    <div className="bm-speak-game">
      <header className="bm-speak-hero">
        <button className="bm-speak-back" aria-label={language === 'bm' ? 'Kembali' : 'Back'}
          onClick={() => { SpeechManager.stop(); SpeechManager.stopSpeaking(); onBack(); }}>
          <ArrowLeft size={19} strokeWidth={3} />
        </button>
        <SpeakHeaderArtwork />
        <div className="bm-speak-heading">
          <span className="bm-speak-category">{(CAT_LABELS[category] || category).replace(/^[^A-Za-z]+/, '')}</span>
          <h1>{title}</h1>
          <p>{descriptions[category]?.[language === 'bm' ? 0 : 1]}</p>
        </div>
        <button className="bm-speak-language" onClick={handleToggleLang} disabled={!canNavigate}
          aria-label={lang === 'ms' ? 'Switch to English' : 'Tukar ke Bahasa Melayu'}>
          {lang === 'ms' ? 'BM → EN' : 'EN → BM'}
        </button>
      </header>

      <main className="bm-speak-content">
        <section className={['bm-speak-card', isCorrect ? 'is-correct' : isWrong ? 'is-wrong' : ''].join(' ')} aria-label={title}>
          {category === 'common_objects' && (
            <button className="bm-speak-hint" onClick={() => setShowHint(h => !h)}
              aria-label={language === 'bm' ? 'Tunjuk petunjuk' : 'Show hint'} aria-pressed={showHint}>💡</button>
          )}
          <p className="bm-speak-prompt">{langData?.prompt || '\u00a0'}</p>
          <div className={['bm-speak-word', category === 'numbers' ? 'is-number' : ''].join(' ')}>{displayText || '…'}</div>
          <button className="bm-speak-speaker" onClick={handleRepeat} disabled={!canSpeak}
            aria-label={language === 'bm' ? 'Dengar sebutan' : 'Hear pronunciation'}>
            <span aria-hidden="true" className="bm-speak-rays" />
            <Volume2 size={29} fill="currentColor" strokeWidth={2.4} />
            <span aria-hidden="true" className="bm-speak-rays bm-speak-rays-right" />
          </button>
          {(attempts >= MAX_ATTEMPTS || showHint) && langData && (
            <p className="bm-speak-answer">{langData.word || langData.syllable}</p>
          )}
        </section>

        <div className="bm-speak-controls">
          <button className={['bm-speak-mic', isListening ? 'is-listening' : ''].join(' ')}
            disabled={!canSpeak} aria-pressed={isListening}
            aria-label={isListening ? (language === 'bm' ? 'Berhenti' : 'Stop') : (language === 'bm' ? 'Tekan untuk Bercakap' : 'Tap to Speak')}
            onClick={() => {
              if (isListening) {
                SpeechManager.stop();
                listenActiveRef.current = false;
                setPhase(PHASE_READY);
              } else {
                // recognition.start() must remain inside the user gesture for iOS.
                startListening();
              }
            }}>
            <Mic size={34} strokeWidth={2.3} aria-hidden="true" />
          </button>
          <div className={['bm-speak-status', isWrong || errorMessage ? 'is-error' : ''].join(' ')} role="status" aria-live="polite">
            <p>{errorMessage || status}</p>
            {lastHeard && (isWrong || isCorrect) && <p className="bm-speak-heard">“{lastHeard}”</p>}
            {phase === PHASE_READY && attempts > 0 && <p className="bm-speak-attempt">{language === 'bm' ? 'Cuba' : 'Try'} {Math.min(attempts + 1, MAX_ATTEMPTS)}/{MAX_ATTEMPTS}</p>}
          </div>
          <div className="bm-speak-actions">
            <button onClick={handleRepeat} disabled={!canSpeak} aria-label={language === 'bm' ? 'Ulang sebutan' : 'Repeat prompt'}>
              <RefreshCw size={21} strokeWidth={2.5} />
            </button>
            <button onClick={handleSkip} disabled={!canNavigate} aria-label={language === 'bm' ? 'Langkau' : 'Skip'}>
              <SkipForward size={21} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </main>

      <footer className="bm-speak-footer">
        <div className="bm-speak-progress" role="progressbar" aria-label={language === 'bm' ? 'Kemajuan' : 'Progress'}
          aria-valuemin={0} aria-valuemax={items.length || ITEMS_PER_ROUND} aria-valuenow={progress}>
          <span style={{ width: (items.length ? progress / items.length * 100 : 0) + '%' }} />
        </div>
        <span className="bm-speak-count">{progress}/{items.length || ITEMS_PER_ROUND}</span>
      </footer>
    </div>
  );
}
