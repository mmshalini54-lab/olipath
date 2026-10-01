import { useState, useEffect, useCallback, useRef } from 'react';
import { LanguageCode } from '../types';

export function useSpeech(language: LanguageCode) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      setIsSupported(true);

      const updateVoices = () => {
        if (synthRef.current) {
          const voices = synthRef.current.getVoices();
          setAvailableVoices(voices);
        }
      };

      updateVoices();
      if ('onvoiceschanged' in window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    } else {
      setIsSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const getVoiceForLanguage = useCallback((lang: LanguageCode): SpeechSynthesisVoice | null => {
    const voices = availableVoices.length > 0 ? availableVoices : (synthRef.current?.getVoices() || []);
    if (voices.length === 0) return null;

    if (lang === 'ta') {
      // Look for Tamil voice specifically (ta-IN, Tamil, etc.)
      const tamilVoice = voices.find(v => 
        v.lang.toLowerCase().startsWith('ta') ||
        v.name.toLowerCase().includes('tamil') ||
        v.lang.toLowerCase().includes('ta-in')
      );
      if (tamilVoice) return tamilVoice;
    }

    if (lang === 'hi') {
      const hindiVoice = voices.find(v => 
        v.lang.toLowerCase().startsWith('hi') ||
        v.name.toLowerCase().includes('hindi')
      );
      if (hindiVoice) return hindiVoice;
    }

    // English or fallback
    const enVoice = voices.find(v => 
      v.lang.toLowerCase().startsWith('en-in') || 
      v.lang.toLowerCase().startsWith('en')
    );

    return enVoice || voices[0] || null;
  }, [availableVoices]);

  const speak = useCallback((text: string) => {
    if (!synthRef.current || !isSupported) return;

    synthRef.current.cancel();

    // Clean text for speech
    const cleanText = text.replace(/[\(\)\[\]\/—#*]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voice = getVoiceForLanguage(language);
    if (voice) {
      utterance.voice = voice;
    }
    
    // Set appropriate lang tag
    if (language === 'ta') utterance.lang = 'ta-IN';
    else if (language === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-IN';

    utterance.rate = 0.92; // comfortable rate for clear comprehension
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    synthRef.current.speak(utterance);
  }, [language, isSupported, getVoiceForLanguage]);

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const toggle = useCallback((text: string) => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  }, [isSpeaking, speak, stop]);

  return {
    isSpeaking,
    isSupported,
    speak,
    stop,
    toggle
  };
}
