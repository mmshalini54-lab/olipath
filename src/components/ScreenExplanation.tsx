import React, { useState, useEffect } from 'react';
import { LanguageCode, SampleDoc, GeminiAnalysisResult, GeminiDetectedItem } from '../types';
import { translations } from '../data/translations';
import { defaultDemoSectionsByLang } from '../data/demoSections';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { askFieldQuestion, makeItSimpler, SimplerLevels } from '../services/geminiService';
import { AudioSpeakButton } from './AudioSpeakButton';
import { 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  ChevronRight, 
  Mic, 
  MicOff, 
  Send, 
  Loader2, 
  Check, 
  RotateCcw,
  MessageSquare,
  Layers,
  HeartHandshake
} from 'lucide-react';

interface ScreenExplanationProps {
  language: LanguageCode;
  selectedDoc: SampleDoc;
  geminiResult: GeminiAnalysisResult | null;
  imageDataUrl: string;
  onProceedToGuide: () => void;
  isSpeaking: boolean;
  onToggleSpeech: (text: string) => void;
}

export const ScreenExplanation: React.FC<ScreenExplanationProps> = ({
  language,
  selectedDoc,
  geminiResult,
  imageDataUrl,
  onProceedToGuide,
  isSpeaking,
  onToggleSpeech,
}) => {
  const t = translations[language];

  // Derive detected sections: either from Gemini analysis result or default demo sections
  const fallbackSections = defaultDemoSectionsByLang[language] || defaultDemoSectionsByLang.ta;
  const sections: GeminiDetectedItem[] = 
    geminiResult?.detectedItems && geminiResult.detectedItems.length > 0
      ? geminiResult.detectedItems
      : fallbackSections;

  // Selected section state (defaults to first item)
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showDontUnderstandHelp, setShowDontUnderstandHelp] = useState<boolean>(false);

  // "Make It Simpler" 3-level explanation state
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);
  const [isSimplerOpen, setIsSimplerOpen] = useState<boolean>(false);
  const [isGeneratingSimpler, setIsGeneratingSimpler] = useState<boolean>(false);
  const [cachedLevels, setCachedLevels] = useState<Record<string, SimplerLevels>>({});

  // Question & Voice Q&A state
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [isAskingQuestion, setIsAskingQuestion] = useState<boolean>(false);
  const [answerResult, setAnswerResult] = useState<string | null>(null);
  const [answerError, setAnswerError] = useState<string | null>(null);

  // Speech Recognition hook
  const {
    isListening,
    transcript,
    isSupported: isSpeechRecSupported,
    permissionDenied,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition(language);

  // Active item
  const activeItem = sections[selectedIndex] || sections[0];

  // Initialize cached levels from item if available
  useEffect(() => {
    if (activeItem.levels && !cachedLevels[activeItem.title]) {
      setCachedLevels(prev => ({
        ...prev,
        [activeItem.title]: activeItem.levels!
      }));
    }
  }, [activeItem, cachedLevels]);

  // Sync transcript into question input
  useEffect(() => {
    if (transcript) {
      setUserQuestion(transcript);
    }
  }, [transcript]);

  // Reset simpler mode / Q&A state when selecting another card
  const handleSelectSection = (index: number) => {
    setSelectedIndex(index);
    setActiveLevel(1);
    setIsSimplerOpen(false);
    setShowDontUnderstandHelp(false);
    setUserQuestion('');
    setAnswerResult(null);
    setAnswerError(null);
    resetTranscript();
  };

  // Next Step handler
  const handleNextStep = () => {
    if (selectedIndex < sections.length - 1) {
      handleSelectSection(selectedIndex + 1);
    } else {
      onProceedToGuide();
    }
  };

  // Check if active item has reliable normalized coordinates [ymin, xmin, ymax, xmax] (0-1000)
  const hasReliableBox = Boolean(
    activeItem?.boundingBox &&
    activeItem.boundingBox.length === 4 &&
    activeItem.boundingBox[2] > activeItem.boundingBox[0] &&
    activeItem.boundingBox[3] > activeItem.boundingBox[1]
  );

  const boxStyle = hasReliableBox && activeItem.boundingBox ? {
    top: `${(activeItem.boundingBox[0] / 10).toFixed(1)}%`,
    left: `${(activeItem.boundingBox[1] / 10).toFixed(1)}%`,
    height: `${((activeItem.boundingBox[2] - activeItem.boundingBox[0]) / 10).toFixed(1)}%`,
    width: `${((activeItem.boundingBox[3] - activeItem.boundingBox[1]) / 10).toFixed(1)}%`,
  } : null;

  // Resolve current explanation text based on selected level (Level 1, 2, or 3)
  const currentLevels = cachedLevels[activeItem.title] || activeItem.levels;

  const currentExplanation = (() => {
    if (currentLevels) {
      if (activeLevel === 2) return currentLevels.level2;
      if (activeLevel === 3) return currentLevels.level3;
      return currentLevels.level1;
    }
    // Fallback if levels not yet fetched
    if (activeLevel === 2 && activeItem.simplerExplanation) {
      return activeItem.simplerExplanation;
    }
    return activeItem.simpleExplanation;
  })();

  const currentAction = activeItem.suggestedUserAction;
  const spokenFieldText = `${activeItem.title}. ${currentExplanation}. ${currentAction}`;

  const handleHearToggle = () => {
    onToggleSpeech(spokenFieldText);
  };

  // Trigger Gemini rewrite for 3 levels
  const handleToggleMakeItSimpler = async () => {
    if (!isSimplerOpen) {
      setIsSimplerOpen(true);
      // If we don't have level 2/3 yet, call Gemini
      if (!currentLevels && !isGeneratingSimpler) {
        setIsGeneratingSimpler(true);
        const res = await makeItSimpler(
          activeItem.title,
          activeItem.simpleExplanation,
          activeItem.suggestedUserAction,
          language
        );
        setIsGeneratingSimpler(false);
        if (res.success && res.data) {
          setCachedLevels(prev => ({
            ...prev,
            [activeItem.title]: res.data!
          }));
          setActiveLevel(2);
        }
      } else {
        // Toggle to level 2 if currently level 1
        setActiveLevel(prev => (prev === 1 ? 2 : prev === 2 ? 3 : 1));
      }
    } else {
      // Advance level 1 -> 2 -> 3 -> 1
      setActiveLevel(prev => (prev === 1 ? 2 : prev === 2 ? 3 : 1));
    }
  };

  // Direct level switch
  const handleSelectLevel = async (level: 1 | 2 | 3) => {
    setActiveLevel(level);
    setIsSimplerOpen(true);

    if (!currentLevels && !isGeneratingSimpler) {
      setIsGeneratingSimpler(true);
      const res = await makeItSimpler(
        activeItem.title,
        activeItem.simpleExplanation,
        activeItem.suggestedUserAction,
        language
      );
      setIsGeneratingSimpler(false);
      if (res.success && res.data) {
        setCachedLevels(prev => ({
          ...prev,
          [activeItem.title]: res.data!
        }));
      }
    }
  };

  const handleAskQuestion = async (qText?: string) => {
    const q = (qText || userQuestion).trim();
    if (!q) return;

    stopListening();
    setIsAskingQuestion(true);
    setAnswerError(null);
    setAnswerResult(null);

    const res = await askFieldQuestion(
      q,
      activeItem.title,
      currentExplanation,
      activeItem.suggestedUserAction,
      language
    );

    setIsAskingQuestion(false);
    if (res.success && res.answer) {
      setAnswerResult(res.answer);
      onToggleSpeech(res.answer);
    } else {
      setAnswerError(res.error || 'Could not get an answer at this moment.');
    }
  };

  const sampleQuestionsByLang: Record<LanguageCode, string[]> = {
    ta: ['இதற்கு என்ன வேண்டும்?', 'எங்கு சமர்ப்பிக்க வேண்டும்?', 'கட்டணம் செலுத்த வேண்டுமா?'],
    hi: ['इसके लिए क्या चाहिए?', 'कहाँ जमा करना होगा?', 'क्या कोई शुल्क लगेगा?'],
    en: ['What do I need for this?', 'Where do I get this?', 'Is there any fee?'],
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-6 space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded">
                Point & Explain
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {language === 'ta' ? 'தொட்டுப் புரிந்து கொள்ளுங்கள்' : 'Touch any section to understand'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {geminiResult?.documentTitle || selectedDoc.title}
            </h2>
          </div>

          <AudioSpeakButton
            textToSpeak={spokenFieldText}
            isSpeaking={isSpeaking}
            onToggle={onToggleSpeech}
            language={language}
            size="compact"
          />
        </div>
      </div>

      {/* Main Grid: LEFT / TOP (Uploaded Image) & RIGHT / BELOW (Detected Sections) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / TOP: The Uploaded Image Viewport */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span className="flex items-center gap-1.5 text-slate-800">
              <Eye className="w-4 h-4 text-amber-600" />
              <span>{language === 'ta' ? 'பதிவேற்றிய ஆவணம் / திரை' : 'Uploaded Image / Screen'}</span>
            </span>
            <span className="text-slate-500">
              {hasReliableBox
                ? (language === 'ta' ? '🎯 இடம் குறிக்கப்பட்டுள்ளது' : '🎯 Highlighted')
                : (language === 'ta' ? 'கார்டைத் தொட்டுப் பார்க்கவும்' : 'Tap cards to inspect')}
            </span>
          </div>

          {/* Image Container with Safe Overlay */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-300 shadow-md min-h-[260px] max-h-[460px] flex items-center justify-center">
            {imageDataUrl ? (
              <img
                src={imageDataUrl}
                alt="Uploaded form preview"
                className="w-full h-full object-contain max-h-[440px]"
              />
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">
                No preview available
              </div>
            )}

            {/* Reliable visual highlight box ONLY IF coordinates are accurate */}
            {hasReliableBox && boxStyle && (
              <div
                className="absolute border-3 border-amber-400 bg-amber-400/25 rounded-lg shadow-lg ring-4 ring-amber-400/40 pointer-events-none transition-all duration-300 flex items-start justify-end p-1 animate-pulse"
                style={boxStyle}
              >
                <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded shadow">
                  {selectedIndex + 1}
                </span>
              </div>
            )}
          </div>

          {/* Coordinate Accuracy Notice */}
          <div className="text-xs text-slate-500 flex items-center justify-between px-1">
            <span>
              {hasReliableBox
                ? (language === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட பகுதி மேலே மஞ்சள் நிறத்தில் குறிக்கப்பட்டுள்ளது.' : 'Active field is highlighted on the image.')
                : (language === 'ta' ? 'துல்லியமான பெட்டி கிடைக்காததால், கார்டுகள் மூலம் தெளிவாகக் காட்டப்படுகிறது.' : 'Reliable exact coordinates unavailable; presented cleanly via selectable cards.')}
            </span>
          </div>
        </div>

        {/* RIGHT / BELOW: Detected Sections as Large Selectable Cards + Detail Panel */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span className="text-slate-900 font-extrabold uppercase tracking-wide">
              {language === 'ta' ? 'கண்டறியப்பட்ட பகுதிகள் (Detected Sections)' : 'Detected Sections'}
            </span>
            <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              {sections.length} {language === 'ta' ? 'பகுதிகள்' : 'Sections'}
            </span>
          </div>

          {/* Section Selection Cards Carousel/Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 max-h-[190px] overflow-y-auto pr-1">
            {sections.map((item, idx) => {
              const isSelected = selectedIndex === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSection(idx)}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer select-none ${
                    isSelected
                      ? 'bg-amber-500 border-amber-600 text-slate-950 shadow-md ring-2 ring-amber-300'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                        isSelected
                          ? 'bg-slate-950 text-amber-400'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <span className="font-extrabold text-sm block truncate">
                        {item.title}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isSelected ? (
                      <Check className="w-4 h-4 stroke-[3] text-slate-950" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE DETAIL CARD: Field Name, Explanation, Suggested User Action & Actions */}
          <div className="bg-white rounded-2xl p-5 border-2 border-amber-400 shadow-md space-y-4">
            {/* Header: Field Name & Index */}
            <div className="border-b border-slate-100 pb-3 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded uppercase">
                  {language === 'ta' ? 'படிவம் பகுதி' : 'Section'} {selectedIndex + 1} of {sections.length}
                </span>
                <span className="text-xs font-bold text-slate-500 capitalize">
                  {activeItem.type.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {activeItem.title}
              </h3>
            </div>

            {/* THREE EXPLANATION LEVELS SELECTOR ("Make It Simpler") */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  {language === 'ta' ? 'விளக்க நிலை (Explanation Level):' : 'Explanation Level:'}
                </span>

                {isGeneratingSimpler && (
                  <span className="text-[11px] font-semibold text-purple-700 flex items-center gap-1 bg-purple-50 px-2 py-0.5 rounded animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    {language === 'ta' ? 'எளிதாக்குகிறது...' : 'Simplifying with Gemini...'}
                  </span>
                )}
              </div>

              {/* Three level tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
                {/* LEVEL 1: Simple */}
                <button
                  type="button"
                  onClick={() => handleSelectLevel(1)}
                  className={`p-2 rounded-lg text-center transition-all cursor-pointer ${
                    activeLevel === 1
                      ? 'bg-white text-slate-950 shadow-sm font-extrabold ring-1 ring-slate-300'
                      : 'text-slate-600 hover:text-slate-900 font-semibold'
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">
                    LEVEL 1
                  </div>
                  <div className="text-xs sm:text-sm font-bold truncate">
                    {language === 'ta' ? 'எளியது' : 'Simple'}
                  </div>
                </button>

                {/* LEVEL 2: Very Simple + Example */}
                <button
                  type="button"
                  onClick={() => handleSelectLevel(2)}
                  className={`p-2 rounded-lg text-center transition-all cursor-pointer ${
                    activeLevel === 2
                      ? 'bg-purple-600 text-white shadow-sm font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 font-semibold'
                  }`}
                >
                  <div className={`text-[10px] uppercase tracking-wide font-bold ${activeLevel === 2 ? 'text-purple-200' : 'text-slate-400'}`}>
                    LEVEL 2
                  </div>
                  <div className="text-xs sm:text-sm font-bold truncate">
                    {language === 'ta' ? 'உதாரணத்துடன்' : 'Very Simple + Ex'}
                  </div>
                </button>

                {/* LEVEL 3: First-time digital user */}
                <button
                  type="button"
                  onClick={() => handleSelectLevel(3)}
                  className={`p-2 rounded-lg text-center transition-all cursor-pointer ${
                    activeLevel === 3
                      ? 'bg-emerald-600 text-white shadow-sm font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 font-semibold'
                  }`}
                >
                  <div className={`text-[10px] uppercase tracking-wide font-bold ${activeLevel === 3 ? 'text-emerald-200' : 'text-slate-400'}`}>
                    LEVEL 3
                  </div>
                  <div className="text-xs sm:text-sm font-bold truncate">
                    {language === 'ta' ? 'முதல் முறை' : 'First-Timer'}
                  </div>
                </button>
              </div>

              {/* Active Explanation Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 transition-all">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500">
                    {activeLevel === 1 && (language === 'ta' ? 'நிலை 1: எளிய விளக்கம்' : 'Level 1: Simple explanation')}
                    {activeLevel === 2 && (language === 'ta' ? 'நிலை 2: உதாரணத்துடன் கூடிய மிக எளிய விளக்கம்' : 'Level 2: Very simple with example')}
                    {activeLevel === 3 && (language === 'ta' ? 'நிலை 3: முதல் முறை டிஜிட்டல் பயனருக்கான எளிய முறை' : 'Level 3: Explained for first-time users')}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {language === 'ta' ? 'எளிய பேச்சுத் தமிழ்' : 'Conversational Plain Speech'}
                  </span>
                </div>

                <p className="text-base sm:text-lg text-slate-900 font-bold leading-relaxed">
                  {currentExplanation}
                </p>
              </div>
            </div>

            {/* Suggested User Action */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 space-y-1">
              <span className="text-xs font-extrabold text-amber-950 uppercase tracking-wide block">
                👉 {language === 'ta' ? 'நீங்கள் என்ன செய்ய வேண்டும்?' : 'What action should you take?'}
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {currentAction}
              </p>
            </div>

            {/* "I Don't Understand" Clarification Box */}
            {showDontUnderstandHelp && (
              <div className="p-4 rounded-xl bg-blue-50 border-2 border-blue-200 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <HelpCircle className="w-4 h-4 text-blue-700" />
                  <span>{language === 'ta' ? 'கூடுதல் உதவி & உதாரணம்:' : 'Extra Help & Everyday Examples:'}</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-950 font-medium leading-relaxed">
                  {activeItem.dontUnderstandHelp ||
                    (language === 'ta'
                      ? 'கவலைப்பட வேண்டாம்! இந்த தகவலுக்கு உங்கள் குடும்ப அட்டை, ஆதார் அட்டை அல்லது மின் கட்டண ரசீதை எடுத்து வைத்துக்கொள்ளுங்கள். உங்களுக்கு சந்தேகம் இருந்தால் வீட்டிலுள்ளவர்களிடம் இந்த விவரத்தைக் காட்டலாம்.'
                      : 'No worries! Keep your ID or document photo ready. You do not need to rush or pay any middlemen.')}
                </p>
              </div>
            )}

            {/* 4 PRIMARY CONTROL BUTTONS with explicit ▶ Hear / ⏹ Stop & Make It Simpler */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {/* 1. Speech Synthesis Button: ▶ Hear / ⏹ Stop */}
              <button
                type="button"
                onClick={handleHearToggle}
                className={`min-h-[50px] px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all active:scale-[0.98] cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md animate-pulse font-extrabold'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                }`}
                title={isSpeaking ? 'Stop Audio' : 'Hear Audio'}
              >
                {isSpeaking ? (
                  <>
                    <span className="text-base font-black">⏹</span>
                    <span>{language === 'ta' ? '⏹ நிறுத்துக (Stop)' : '⏹ Stop'}</span>
                  </>
                ) : (
                  <>
                    <span className="text-base font-black text-amber-900">▶</span>
                    <span>{language === 'ta' ? '▶ கேளுங்கள் (Hear)' : '▶ Hear'}</span>
                  </>
                )}
              </button>

              {/* 2. ✨ Make It Simpler Button (cycles levels & triggers rewrite) */}
              <button
                type="button"
                onClick={handleToggleMakeItSimpler}
                className={`min-h-[50px] px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all active:scale-[0.98] cursor-pointer ${
                  activeLevel > 1
                    ? 'bg-purple-600 text-white border-purple-700 shadow-md font-extrabold'
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-950 border-purple-200'
                }`}
                title="Rewrite explanation in an even simpler way"
              >
                <Sparkles className="w-4 h-4 text-purple-300 shrink-0" />
                <span className="truncate">
                  {activeLevel === 1
                    ? (language === 'ta' ? '✨ இன்னும் எளிதாக' : '✨ Make It Simpler')
                    : (language === 'ta' ? `✨ நிலை ${activeLevel}` : `✨ Level ${activeLevel}`)}
                </span>
              </button>

              {/* 3. ❓ I Don't Understand */}
              <button
                type="button"
                onClick={() => setShowDontUnderstandHelp(prev => !prev)}
                className={`min-h-[50px] px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all active:scale-[0.98] cursor-pointer ${
                  showDontUnderstandHelp
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-950 border-blue-200'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-blue-700 shrink-0" />
                <span className="truncate">
                  {language === 'ta' ? '❓ புரியவில்லை' : '❓ I Don\'t Understand'}
                </span>
              </button>

              {/* 4. ➡️ Next Step */}
              <button
                type="button"
                onClick={handleNextStep}
                className="min-h-[50px] px-3.5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="truncate">
                  {selectedIndex < sections.length - 1
                    ? (language === 'ta' ? '➡️ அடுத்த படி' : '➡️ Next Step')
                    : (language === 'ta' ? 'முழுமை பெறுக' : 'Finish')}
                </span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] text-amber-400 shrink-0" />
              </button>
            </div>

            {/* VOICE QUESTION & ANSWER SECTION */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                  {language === 'ta' ? 'சந்தேகம் கேட்க (Ask a question)' : 'Ask a Question'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === 'ta' ? 'மைக் அல்லது தட்டச்சு' : 'Mic or Type'}
                </span>
              </div>

              {/* Fallback Warning if Voice Recognition is unavailable or permission denied */}
              {(permissionDenied || !isSpeechRecSupported) && (
                <div className="p-3 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-700 font-medium flex items-center gap-2">
                  <MicOff className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>
                    Voice is unavailable. You can type instead.
                    {language === 'ta' && ' (குரல் வசதி கிடைக்கவில்லை. நீங்கள் தட்டச்சு செய்யலாம்.)'}
                  </span>
                </div>
              )}

              {/* Input row: Mic button + Text Input Fallback + Ask Button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center shrink-0 min-w-[48px] min-h-[48px] cursor-pointer ${
                    isListening
                      ? 'bg-red-500 text-white border-red-600 shadow-md animate-pulse ring-4 ring-red-200'
                      : !isSpeechRecSupported || permissionDenied
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 active:scale-95'
                  }`}
                  title={
                    isListening
                      ? 'Listening... Click to stop'
                      : !isSpeechRecSupported || permissionDenied
                      ? 'Voice is unavailable. You can type instead.'
                      : 'Tap to speak your question'
                  }
                  aria-label="Microphone"
                >
                  {isListening ? (
                    <Mic className="w-5 h-5 text-white animate-spin" />
                  ) : !isSpeechRecSupported || permissionDenied ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5 text-amber-900" />
                  )}
                </button>

                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAskQuestion();
                    }
                  }}
                  placeholder={
                    isListening
                      ? (language === 'ta' ? 'பேசுங்கள்... கேட்கிறது...' : 'Listening... Speak now...')
                      : (language === 'ta' ? 'எ.கா: "இதற்கு என்ன வேண்டும்?"' : 'e.g. "What do I need for this?"')
                  }
                  className="flex-1 min-h-[48px] px-3.5 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm font-semibold text-slate-900 bg-slate-50"
                />

                <button
                  type="button"
                  onClick={() => handleAskQuestion()}
                  disabled={isAskingQuestion || !userQuestion.trim()}
                  className={`min-h-[48px] px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shrink-0 ${
                    userQuestion.trim() && !isAskingQuestion
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border border-amber-600 cursor-pointer shadow-sm active:scale-95'
                      : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
                  }`}
                >
                  {isAskingQuestion ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">
                    {language === 'ta' ? 'கேளுங்கள்' : 'Ask'}
                  </span>
                </button>
              </div>

              {/* Sample question chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[11px] font-semibold text-slate-500 mr-1">
                  {language === 'ta' ? 'உதாரணம்:' : 'Try:'}
                </span>
                {sampleQuestionsByLang[language].map((sampleQ, qIdx) => (
                  <button
                    key={qIdx}
                    type="button"
                    onClick={() => {
                      setUserQuestion(sampleQ);
                      handleAskQuestion(sampleQ);
                    }}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-950 border border-slate-200 hover:border-amber-300 transition-colors cursor-pointer"
                  >
                    "{sampleQ}"
                  </button>
                ))}
              </div>

              {/* Answer Box */}
              {answerResult && (
                <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-700" />
                      <span>{language === 'ta' ? 'ஒளிபாத் பதில் (OliPath Answer):' : 'OliPath Answer:'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleSpeech(answerResult)}
                      className="px-2.5 py-1 rounded bg-amber-200 hover:bg-amber-300 text-amber-950 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {isSpeaking ? '⏹ Stop' : '▶ Hear'}
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {answerResult}
                  </p>
                </div>
              )}

              {answerError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 font-medium">
                  {answerError}
                </div>
              )}
            </div>
          </div>

          {/* Proceed to Guided Journey Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onProceedToGuide}
              className="w-full min-h-[56px] py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{t.startGuideButton}</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
