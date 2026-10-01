import React from 'react';
import { LanguageCode, SampleDoc } from '../types';
import { translations } from '../data/translations';
import { AudioSpeakButton } from './AudioSpeakButton';
import { CheckCircle2, RotateCcw, Sparkles, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

interface ScreenCompletionProps {
  language: LanguageCode;
  selectedDoc: SampleDoc;
  onTryAnother: () => void;
  onReviewSteps: () => void;
  isSpeaking: boolean;
  onToggleSpeech: (text: string) => void;
}

export const ScreenCompletion: React.FC<ScreenCompletionProps> = ({
  language,
  selectedDoc,
  onTryAnother,
  onReviewSteps,
  isSpeaking,
  onToggleSpeech,
}) => {
  const t = translations[language];

  const spokenCompletion = `${t.completionTitle}. ${t.completionSub}. ${t.whatYouAchieved}: ${t.keyTakeaways.join('. ')}. ${t.safetyFinalTip}`;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Celebration Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-500 text-white font-extrabold shadow-lg ring-8 ring-emerald-100">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.completionTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {t.completionSub}
          </p>
        </div>

        <div className="flex justify-center pt-1">
          <AudioSpeakButton
            textToSpeak={spokenCompletion}
            isSpeaking={isSpeaking}
            onToggle={onToggleSpeech}
            language={language}
            size="normal"
          />
        </div>
      </div>

      {/* Accomplished Document Summary Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-2 shadow-sm">
        <div className="text-xs uppercase font-bold text-amber-400">
          படிவம் வெற்றிகரமாக முடிந்தது:
        </div>
        <h3 className="text-xl font-bold text-white">
          {selectedDoc.title}
        </h3>
        <p className="text-xs text-slate-300">
          {selectedDoc.department}
        </p>
      </div>

      {/* Key Takeaways Checklist */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3.5">
        <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
          {t.whatYouAchieved}
        </h4>

        <div className="space-y-3">
          {t.keyTakeaways.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-sm sm:text-base text-slate-800 font-medium leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Final Safety Note */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3 text-amber-950 font-medium text-sm">
        <ShieldCheck className="w-6 h-6 text-amber-800 shrink-0 mt-0.5" />
        <p className="leading-snug">{t.safetyFinalTip}</p>
      </div>

      {/* Action Buttons (Large, high touch targets) */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={onTryAnother}
          className="w-full min-h-[58px] py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-extrabold text-lg flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all active:scale-[0.98] select-none"
        >
          <span>{t.tryAnotherButton}</span>
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={onReviewSteps}
          className="w-full min-h-[54px] py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-base border-2 border-slate-300 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] select-none"
        >
          <RotateCcw className="w-5 h-5 text-slate-700" />
          <span>{t.reviewStepsButton}</span>
        </button>
      </div>
    </div>
  );
};
