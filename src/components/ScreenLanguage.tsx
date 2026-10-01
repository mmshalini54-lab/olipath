import React from 'react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';
import { AudioSpeakButton } from './AudioSpeakButton';
import { ArrowLeft, ArrowRight, Check, Volume2, Sparkles } from 'lucide-react';

interface ScreenLanguageProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onBack: () => void;
  isSpeaking: boolean;
  onToggleSpeech: (text: string) => void;
}

export const ScreenLanguage: React.FC<ScreenLanguageProps> = ({
  currentLanguage,
  onSelectLanguage,
  onBack,
  isSpeaking,
  onToggleSpeech,
}) => {
  const t = translations[currentLanguage];

  const handleLanguageClick = (langCode: LanguageCode) => {
    // Save selected language in application state and continue to the Upload screen
    onSelectLanguage(langCode);
  };

  const spokenGuidance = "Choose your language. தமிழ், हिन्दी, English. உங்களுக்கு விருப்பமான மொழியைத் தொடுங்கள்.";

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Title Section */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Choose your language
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium mt-1">
              உங்களுக்கு வசதியான மொழியைத் தொடுங்கள்
            </p>
          </div>
          <AudioSpeakButton
            textToSpeak={spokenGuidance}
            isSpeaking={isSpeaking}
            onToggle={onToggleSpeech}
            language={currentLanguage}
            size="compact"
          />
        </div>
      </div>

      {/* Three Large Buttons */}
      <div className="space-y-4 pt-2">
        {/* 1. தமிழ் (Tamil) - First and Visually Prominent Option */}
        <button
          type="button"
          onClick={() => handleLanguageClick('ta')}
          className="w-full min-h-[96px] p-5 sm:p-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold border-3 border-amber-600 shadow-lg ring-4 ring-amber-200/60 flex items-center justify-between text-left transition-all duration-200 active:scale-[0.98] cursor-pointer group"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-wide">
                தமிழ்
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-slate-950 text-amber-400 shadow-sm">
                முதன்மை / Recommended
              </span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
              எளிய பேச்சுத் தமிழ்ல வழிகாட்டுகிறேன் · Tamil
            </p>
          </div>

          <div className="w-12 h-12 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform shadow-md">
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </div>
        </button>

        {/* 2. हिन्दी (Hindi) - Large Button */}
        <button
          type="button"
          onClick={() => handleLanguageClick('hi')}
          className="w-full min-h-[86px] p-5 rounded-2xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-bold border-2 border-slate-300 hover:border-slate-400 shadow-sm flex items-center justify-between text-left transition-all duration-200 active:scale-[0.98] cursor-pointer group"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                हिन्दी
              </span>
              <span className="text-xs font-semibold text-slate-500">
                (Hindi)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              आसान और सरल हिन्दी में स्पष्ट मार्गदर्शन
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform border border-slate-200">
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </div>
        </button>

        {/* 3. English - Large Button */}
        <button
          type="button"
          onClick={() => handleLanguageClick('en')}
          className="w-full min-h-[86px] p-5 rounded-2xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-bold border-2 border-slate-300 hover:border-slate-400 shadow-sm flex items-center justify-between text-left transition-all duration-200 active:scale-[0.98] cursor-pointer group"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                English
              </span>
              <span className="text-xs font-semibold text-slate-500">
                (Simple English)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Clear step-by-step guidance in plain English
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform border border-slate-200">
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </div>
        </button>
      </div>

      {/* Explanatory note */}
      <div className="bg-slate-100/90 rounded-xl p-3.5 text-center text-xs sm:text-sm text-slate-700 border border-slate-200 font-medium">
        தொட்டவுடன் அடுத்த திரைக்குச் செல்லும் · Tap any language to proceed directly to upload
      </div>

      {/* Explicit Large Back Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-full min-h-[54px] py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-base border-2 border-slate-300 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          <span>{t.backButton}</span>
        </button>
      </div>
    </div>
  );
};
