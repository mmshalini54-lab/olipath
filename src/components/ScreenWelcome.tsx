import React from 'react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';
import { AudioSpeakButton } from './AudioSpeakButton';
import { ArrowRight, Sparkles, Eye, Brain, HelpCircle, CheckCircle2, ShieldCheck, PlayCircle } from 'lucide-react';

interface ScreenWelcomeProps {
  language: LanguageCode;
  onStart: () => void;
  onTryDemo: () => void;
  isSpeaking: boolean;
  onToggleSpeech: (text: string) => void;
}

export const ScreenWelcome: React.FC<ScreenWelcomeProps> = ({
  language,
  onStart,
  onTryDemo,
  isSpeaking,
  onToggleSpeech,
}) => {
  const t = translations[language];

  const speechPitch = `${t.appName}. ${t.tagline}. ${t.heroPitch} ${t.heroSub}`;

  const pillars = [
    {
      num: '1',
      title: t.pillarSee,
      desc: t.pillarSeeDesc,
      icon: Eye,
      tag: 'SEE'
    },
    {
      num: '2',
      title: t.pillarUnderstand,
      desc: t.pillarUnderstandDesc,
      icon: Brain,
      tag: 'UNDERSTAND'
    },
    {
      num: '3',
      title: t.pillarExplain,
      desc: t.pillarExplainDesc,
      icon: HelpCircle,
      tag: 'EXPLAIN'
    },
    {
      num: '4',
      title: t.pillarGuide,
      desc: t.pillarGuideDesc,
      icon: CheckCircle2,
      tag: 'GUIDE'
    }
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-10 space-y-8 animate-fadeIn">
      {/* Brand Hero Header */}
      <div className="text-center space-y-4">
        {/* Decorative Light Emblem */}
        <div className="inline-flex items-center justify-center w-18 h-18 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-3xl shadow-lg ring-8 ring-amber-100">
          ஒளி
        </div>

        <div className="space-y-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            OliPath
          </h1>
          <p className="text-base sm:text-lg font-bold text-amber-600 tracking-wide">
            "Show it. Hear it. Understand it. Do it."
          </p>
        </div>

        {/* Hero Pitch Box with High Contrast */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md text-left space-y-3 border border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-amber-400 leading-snug">
            {t.heroPitch}
          </h2>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            {t.heroSub}
          </p>

          <div className="pt-2">
            <AudioSpeakButton
              textToSpeak={speechPitch}
              isSpeaking={isSpeaking}
              onToggle={onToggleSpeech}
              language={language}
              size="normal"
            />
          </div>
        </div>
      </div>

      {/* Primary Action Buttons (Large, high touch target, tactile) */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={onStart}
          className="w-full min-h-[58px] py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-lg flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all active:scale-[0.98] select-none"
        >
          <span>{t.startButton}</span>
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={onTryDemo}
          className="w-full min-h-[54px] py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-bold text-base border-2 border-slate-300 hover:border-slate-400 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] select-none"
        >
          <PlayCircle className="w-5 h-5 text-amber-600" />
          <span>{t.tryDemoButton}</span>
        </button>
      </div>

      {/* 4 Pillars: SEE -> UNDERSTAND -> EXPLAIN -> GUIDE */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-bold tracking-wider px-1">
          <span>எப்படி வேலை செய்கிறது? (How it works)</span>
          <span>4 எளிய படிகள்</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.tag}
                className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-start gap-3.5 hover:border-amber-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 font-bold text-base">
                  <Icon className="w-5 h-5 text-amber-800" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safe & Trustworthy reassurance footer badge */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex items-center gap-3 text-xs sm:text-sm text-amber-950">
        <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0" />
        <p className="leading-snug">
          100% பாதுகாப்பானது. உங்கள் தனிப்பட்ட தரவுகள் மற்றும் கடவுச்சொற்கள் எதுவும் சேமிக்கப்படாது.
        </p>
      </div>
    </div>
  );
};
