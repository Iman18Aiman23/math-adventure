import { useCallback } from 'react';
import SpeechManager from '../../../services/SpeechManager';

export default function useMtTts() {
  const speak = useCallback((text, lang = 'ms-MY') => {
    if (!text) return;
    SpeechManager.speak(text, lang, { rate: 0.88 });
  }, []);

  const stop = useCallback(() => {
    SpeechManager.stopSpeaking();
  }, []);

  return { speak, stop };
}
