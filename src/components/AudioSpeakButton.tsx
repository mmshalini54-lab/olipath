import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';

interface AudioSpeakButtonProps {
  textToSpeak: string;
  isSpeaking: boolean;
  onToggle: (text: string) => void;
  language: LanguageCode;
  className?: string;
  size?: 'normal' | 'large' | 'compact';
  labelOverride?: string;
}

export const AudioSpeakButton: React.FC<AudioSpeakButtonProps> = ({
  textToSpeak,
  isSpeaking,
  onToggle,
  language,
  className = '',
  size = 'normal',
  labelOverride
}) => {
  const t = translations[language];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(textToSpeak);
  };

  if (size === 'compact') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={isSpeaking ? t.stopAudio : t.listenButton}
        className={`inline-flex items-center justify-center p-2.5 min-w-[44px] min-h-[44px] rounded-xl transition-all duration-200 border ${
          isSpeaking
            ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md animate-pulse'
            : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200/80 active:scale-95'
        } ${className}`}
      >
        {isSpeaking ? (
          <VolumeX className="w-5 h-5 text-slate-950" />
        ) : (
          <Volume2 className="w-5 h-5 text-amber-800" />
        )}
      </button>
    );
  }

  const isLarge = size === 'large';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isSpeaking ? t.stopAudio : t.listenButton}
      className={`inline-flex items-center justify-center gap-2.5 rounded-xl font-medium transition-all duration-200 border select-none ${
        isLarge
          ? 'w-full py-3.5 px-5 text-base min-h-[52px]'
          : 'py-2.5 px-4 text-sm min-h-[44px]'
      } ${
        isSpeaking
          ? 'bg-amber-500 text-slate-950 border-amber-600 font-semibold shadow-md active:scale-98'
          : 'bg-amber-100/80 hover:bg-amber-200 text-amber-950 border-amber-300/80 hover:border-amber-400 active:scale-98 shadow-sm'
      } ${className}`}
    >
      {isSpeaking ? (
        <>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-3.5 bg-slate-950 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-4.5 bg-slate-950 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-3 bg-slate-950 rounded-full animate-bounce"></span>
          </span>
          <span className="whitespace-nowrap">{t.listeningNow} ({t.stopAudio})</span>
        </>
      ) : (
        <>
          <Volume2 className={isLarge ? 'w-5 h-5 text-amber-900' : 'w-4 h-4 text-amber-900'} />
          <span className="whitespace-nowrap font-medium text-amber-950">
            {labelOverride || t.listenButton}
          </span>
        </>
      )}
    </button>
  );
};
