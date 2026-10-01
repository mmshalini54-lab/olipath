import React from 'react';
import { ScreenId, LanguageCode } from '../types';
import { translations } from '../data/translations';
import { ArrowLeft, Globe, VolumeX } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenId;
  language: LanguageCode;
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  onLanguageChange: (lang: LanguageCode) => void;
  isSpeaking: boolean;
  onStopSpeech: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  language,
  onNavigate,
  onBack,
  onLanguageChange,
  isSpeaking,
  onStopSpeech,
}) => {
  const t = translations[language];

  const screensOrder: ScreenId[] = [
    'welcome',
    'language',
    'upload',
    'analysis',
    'explanation',
    'guided',
    'completion'
  ];

  const currentIndex = screensOrder.indexOf(currentScreen);
  const showBack = currentIndex > 0;

  const languageLabels: Record<LanguageCode, string> = {
    ta: 'தமிழ்',
    hi: 'हिन्दी',
    en: 'English'
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: Back button + Brand Wordmark */}
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              className="p-2 -ml-1 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label={t.backButton}
              title={t.backButton}
            >
              <ArrowLeft className="w-5 h-5 text-slate-800 stroke-[2.5]" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onNavigate('welcome')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-sm">
              ஒ
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                OliPath
              </span>
              <span className="text-[10px] -mt-1 font-semibold text-amber-700 tracking-wider">
                ஒளிபாத்
              </span>
            </div>
          </button>
        </div>

        {/* Right Slot: Language Indicator + Audio Readout control */}
        <div className="flex items-center gap-2">
          {/* Audio Stop button if currently speaking */}
          {isSpeaking && (
            <button
              type="button"
              onClick={onStopSpeech}
              className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-amber-500 text-slate-950 flex items-center gap-1 min-h-[36px] animate-pulse cursor-pointer shadow-sm"
              title={t.stopAudio}
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{t.stopAudio}</span>
            </button>
          )}

          {/* Small Language Indicator: "Language: தமிழ்" */}
          <button
            type="button"
            onClick={() => onNavigate('language')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 border border-slate-200 hover:border-amber-300 text-xs sm:text-sm font-semibold text-slate-800 transition-all cursor-pointer min-h-[38px] active:scale-95"
            title="Change Language / மொழியை மாற்ற"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-600 font-normal">Language:</span>
            <span className="font-extrabold text-amber-800">{languageLabels[language]}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
