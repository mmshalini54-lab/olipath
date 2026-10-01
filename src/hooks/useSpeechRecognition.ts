import { useState, useEffect, useCallback, useRef } from 'react';
import { LanguageCode } from '../types';

export function useSpeechRecognition(language: LanguageCode) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
          setErrorNotice(null);
          setPermissionDenied(false);
        };

        recognition.onresult = (event: any) => {
          const current = event.resultIndex || 0;
          const text = event.results[current][0]?.transcript || '';
          if (text) {
            setTranscript(text);
          }
        };

        recognition.onerror = (event: any) => {
          setIsListening(false);
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setPermissionDenied(true);
            setErrorNotice('Voice is unavailable. You can type instead.');
          } else if (event.error === 'no-speech') {
            // User didn't say anything, silent reset
          } else {
            setErrorNotice('Voice is unavailable. You can type instead.');
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch (err) {
        setIsSupported(false);
        setErrorNotice('Voice is unavailable. You can type instead.');
      }
    } else {
      setIsSupported(false);
      setErrorNotice('Voice is unavailable. You can type instead.');
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current) {
      setPermissionDenied(true);
      setErrorNotice('Voice is unavailable. You can type instead.');
      return;
    }

    try {
      const langMap: Record<LanguageCode, string> = {
        ta: 'ta-IN',
        hi: 'hi-IN',
        en: 'en-IN',
      };
      recognitionRef.current.lang = langMap[language] || 'ta-IN';
      setTranscript('');
      recognitionRef.current.start();
    } catch (err) {
      console.warn('Could not start speech recognition:', err);
      setIsListening(false);
    }
  }, [isSupported, language]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // ignore
      }
      setIsListening(false);
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setErrorNotice(null);
  }, []);

  return {
    isListening,
    transcript,
    isSupported,
    permissionDenied: permissionDenied || !isSupported,
    errorNotice,
    startListening,
    stopListening,
    resetTranscript,
    setTranscript,
  };
}
