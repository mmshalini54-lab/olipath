import React, { useState } from 'react';
import { LanguageCode, SampleDoc, GuidedStep } from '../types';
import { translations } from '../data/translations';
import { AudioSpeakButton } from './AudioSpeakButton';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Eye } from 'lucide-react';

interface ScreenGuidedJourneyProps {
  language: LanguageCode;
  selectedDoc: SampleDoc;
  onFinishGuide: () => void;
  isSpeaking: boolean;
  onToggleSpeech: (text: string) => void;
}

export const ScreenGuidedJourney: React.FC<ScreenGuidedJourneyProps> = ({
  language,
  selectedDoc,
  onFinishGuide,
  isSpeaking,
  onToggleSpeech,
}) => {
  const t = translations[language];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});

  const totalSteps = selectedDoc.guidedSteps.length;
  const currentStep = selectedDoc.guidedSteps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onFinishGuide();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleInputChange = (val: string) => {
    setUserInputs(prev => ({
      ...prev,
      [currentStepIndex]: val
    }));
  };

  const currentInputValue = userInputs[currentStepIndex] ?? (currentStep.defaultValue || '');

  const spokenStep = `${t.guidedTitle}. ${t.stepOf} ${currentStep.stepNumber}: ${currentStep.title}. ${currentStep.instruction}. ${currentStep.tip}`;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6 animate-fadeIn">
      {/* Header & Step Counter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span className="text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg">
            {t.stepOf} {currentStep.stepNumber} / {totalSteps}
          </span>
          <span className="truncate max-w-[200px] text-slate-700">
            {selectedDoc.title}
          </span>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
          {selectedDoc.guidedSteps.map((_, idx) => (
            <div
              key={idx}
              className={`h-full transition-all duration-300 flex-1 ${
                idx < currentStepIndex
                  ? 'bg-emerald-500'
                  : idx === currentStepIndex
                  ? 'bg-amber-500'
                  : 'bg-slate-200'
              } ${idx > 0 ? 'border-l border-white' : ''}`}
            />
          ))}
        </div>

        {/* Step Title & Spoken Button */}
        <div className="flex items-start justify-between gap-3 pt-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {currentStep.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 mt-1 font-medium">
              {currentStep.instruction}
            </p>
          </div>
          <AudioSpeakButton
            textToSpeak={spokenStep}
            isSpeaking={isSpeaking}
            onToggle={onToggleSpeech}
            language={language}
            size="compact"
          />
        </div>
      </div>

      {/* Visual Simulated Document Screen with Highlight Target */}
      <div className="bg-slate-900 rounded-2xl p-3 sm:p-4 border border-slate-800 shadow-md space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="flex items-center gap-1 text-amber-400 font-semibold">
            <Eye className="w-3.5 h-3.5" />
            {t.whereToLook}
          </span>
          <span>{selectedDoc.originalDocumentTitle.substring(0, 32)}...</span>
        </div>

        {/* Mock Screen Representation */}
        <div className="relative bg-slate-950 rounded-xl p-4 border border-slate-800 min-h-[170px] overflow-hidden select-none">
          {/* Wireframe Mock Fields */}
          <div className="space-y-2.5 opacity-60">
            <div className="h-4 bg-slate-800 rounded w-1/3"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-9 bg-slate-800/90 rounded border border-slate-700"></div>
              <div className="h-9 bg-slate-800/90 rounded border border-slate-700"></div>
            </div>
            <div className="h-9 bg-slate-800/90 rounded border border-slate-700"></div>
            <div className="h-8 bg-slate-700 rounded w-28 ml-auto"></div>
          </div>

          {/* Active Highlight Bounding Box (Pulsing Amber) */}
          <div
            className="absolute rounded-xl border-3 border-amber-400 bg-amber-400/20 shadow-lg ring-4 ring-amber-400/30 flex items-center justify-between px-3 transition-all duration-300"
            style={{
              top: currentStep.highlightBox.top,
              left: currentStep.highlightBox.left,
              width: currentStep.highlightBox.width,
              height: currentStep.highlightBox.height,
            }}
          >
            <span className="text-xs font-extrabold text-slate-950 bg-amber-300 px-2 py-0.5 rounded shadow-sm">
              👈 {currentStep.fieldName}
            </span>
            <span className="text-[11px] font-bold text-white bg-slate-900/90 px-1.5 py-0.5 rounded">
              {t.stepOf} {currentStep.stepNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Practice Box (Try It Yourself) */}
      <div className="bg-white rounded-2xl p-5 border-2 border-amber-400 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md uppercase tracking-wide">
            {t.testYourself}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {t.simulatedInputNotice}
          </span>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-900">
            {currentStep.fieldName}:
          </label>

          {currentStep.fieldType === 'select' && currentStep.options && (
            <select
              value={currentInputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full min-h-[52px] px-4 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-base font-semibold text-slate-900 bg-slate-50 cursor-pointer"
            >
              {currentStep.options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {(currentStep.fieldType === 'text' || currentStep.fieldType === 'number') && (
            <input
              type={currentStep.fieldType === 'number' ? 'text' : 'text'}
              value={currentInputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={currentStep.placeholder}
              className="w-full min-h-[52px] px-4 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-base font-semibold text-slate-900 bg-slate-50"
            />
          )}

          {currentStep.fieldType === 'verify' && (
            <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 font-bold text-base flex items-center justify-between">
              <span>{currentStep.defaultValue}</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
          )}
        </div>

        {/* Helpful Tip */}
        <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-start gap-2.5 text-xs sm:text-sm text-amber-950 font-medium">
          <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>{currentStep.tip}</span>
        </div>

        {/* Optional Warning */}
        {currentStep.warning && (
          <div className="p-3 bg-red-50 rounded-xl border border-red-200 flex items-start gap-2.5 text-xs sm:text-sm text-red-950 font-medium">
            <AlertTriangle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
            <span>{currentStep.warning}</span>
          </div>
        )}
      </div>

      {/* Navigation Buttons (Large Prev/Next) */}
      <div className="flex items-center gap-3 pt-2">
        {currentStepIndex > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="flex-1 min-h-[56px] py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border-2 border-slate-300 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.prevStepButton}</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="flex-2 min-h-[56px] py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-extrabold text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] transition-all select-none"
        >
          <span>
            {currentStepIndex === totalSteps - 1
              ? t.finishGuideButton
              : t.nextStepButton}
          </span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
