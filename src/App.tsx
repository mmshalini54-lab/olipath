/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, LanguageCode, SampleDoc, GeminiAnalysisResult } from './types';
import { sampleDocumentsByLang } from './data/sampleDocs';
import { useSpeech } from './hooks/useSpeech';
import { getDemoImageDataUrl } from './utils/demoImageGenerator';
import { Header } from './components/Header';
import { ScreenWelcome } from './components/ScreenWelcome';
import { ScreenLanguage } from './components/ScreenLanguage';
import { ScreenUpload } from './components/ScreenUpload';
import { ScreenAnalysis } from './components/ScreenAnalysis';
import { ScreenExplanation } from './components/ScreenExplanation';
import { ScreenGuidedJourney } from './components/ScreenGuidedJourney';
import { ScreenCompletion } from './components/ScreenCompletion';

export default function App() {
  // Primary demo language is Tamil ('ta') as requested
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('welcome');
  const [language, setLanguage] = useState<LanguageCode>('ta');
  const [selectedDocId, setSelectedDocId] = useState<string>('patta-chitta');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [activeAnalysisImage, setActiveAnalysisImage] = useState<string>('');
  const [geminiResult, setGeminiResult] = useState<GeminiAnalysisResult | null>(null);

  const { isSpeaking, toggle, stop } = useSpeech(language);

  // Retrieve current active doc based on language
  const availableDocs = sampleDocumentsByLang[language] || sampleDocumentsByLang.ta;
  const currentDoc = availableDocs.find(d => d.id === selectedDocId) || availableDocs[0];

  // Screen navigation sequence
  const screenOrder: ScreenId[] = [
    'welcome',
    'language',
    'upload',
    'analysis',
    'explanation',
    'guided',
    'completion'
  ];

  const handleBack = () => {
    stop();
    const currentIndex = screenOrder.indexOf(currentScreen);
    if (currentIndex > 0) {
      setCurrentScreen(screenOrder[currentIndex - 1]);
    }
  };

  const handleNavigate = (target: ScreenId) => {
    stop();
    setCurrentScreen(target);
  };

  const handleLanguageChange = (newLang: LanguageCode) => {
    stop();
    setLanguage(newLang);
  };

  const handleSelectLanguageAndContinue = (newLang: LanguageCode) => {
    stop();
    setLanguage(newLang);
    setCurrentScreen('upload');
  };

  const handleStart = () => {
    stop();
    setCurrentScreen('language');
  };

  const handleTryDemo = () => {
    stop();
    setSelectedDocId('patta-chitta');
    setCustomImage(null);
    setGeminiResult(null);
    const demoImg = getDemoImageDataUrl();
    setActiveAnalysisImage(demoImg);
    setCurrentScreen('explanation');
  };

  const handleProceedToAnalyze = () => {
    stop();
    const imageToAnalyze = customImage || getDemoImageDataUrl();
    setActiveAnalysisImage(imageToAnalyze);
    setCurrentScreen('analysis');
  };

  const handleAnalysisSuccess = (result: GeminiAnalysisResult) => {
    setGeminiResult(result);
    setCurrentScreen('explanation');
  };

  const handleUseFallbackDemo = () => {
    setGeminiResult(null);
    setSelectedDocId('patta-chitta');
    setCurrentScreen('explanation');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 selection:bg-amber-200">
      {/* Top Application Bar */}
      <Header
        currentScreen={currentScreen}
        language={language}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onLanguageChange={handleLanguageChange}
        isSpeaking={isSpeaking}
        onStopSpeech={stop}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col justify-start pb-8">
        {currentScreen === 'welcome' && (
          <ScreenWelcome
            language={language}
            onStart={handleStart}
            onTryDemo={handleTryDemo}
            isSpeaking={isSpeaking}
            onToggleSpeech={toggle}
          />
        )}

        {currentScreen === 'language' && (
          <ScreenLanguage
            currentLanguage={language}
            onSelectLanguage={handleSelectLanguageAndContinue}
            onBack={handleBack}
            isSpeaking={isSpeaking}
            onToggleSpeech={toggle}
          />
        )}

        {currentScreen === 'upload' && (
          <ScreenUpload
            language={language}
            selectedDoc={currentDoc}
            customImage={customImage}
            onSelectDoc={(doc: SampleDoc) => setSelectedDocId(doc.id)}
            onSetCustomImage={setCustomImage}
            onProceedToAnalyze={handleProceedToAnalyze}
            onBack={handleBack}
            isSpeaking={isSpeaking}
            onToggleSpeech={toggle}
          />
        )}

        {currentScreen === 'analysis' && (
          <ScreenAnalysis
            language={language}
            imageDataUrl={activeAnalysisImage}
            selectedDoc={currentDoc}
            onAnalysisSuccess={handleAnalysisSuccess}
            onUploadClearer={() => {
              setCustomImage(null);
              setCurrentScreen('upload');
            }}
            onUseFallbackDemo={handleUseFallbackDemo}
            isSpeaking={isSpeaking}
            onToggleSpeech={toggle}
          />
        )}

        {currentScreen === 'explanation' && (
          <ScreenExplanation
            language={language}
            selectedDoc={currentDoc}
            geminiResult={geminiResult}
            imageDataUrl={activeAnalysisImage || getDemoImageDataUrl()}
            onProceedToGuide={() => setCurrentScreen('guided')}
            isSpeaking={isSpeaking}
            onToggleSpeech={toggle}
          />
        )}

        {currentScreen === 'guided' && (
          <ScreenGuidedJourney
            language={language}
            selectedDoc={currentDoc}
            onFinishGuide={() => setCurrentScreen('completion')}
            isSpeaking={isSpeaking}
            onToggleSpeech={toggle}
          />
        )}

        {currentScreen === 'completion' && (
          <ScreenCompletion
            language={language}
            selectedDoc={currentDoc}
            onTryAnother={() => {
              setCustomImage(null);
              setGeminiResult(null);
              setCurrentScreen('upload');
            }}
            onReviewSteps={() => setCurrentScreen('guided')}
            isSpeaking={isSpeaking}
            onToggleSpeech={toggle}
          />
        )}
      </main>

      {/* Subtle Mobile-Friendly Footer */}
      <footer className="py-4 px-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white/60">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <span className="font-semibold text-slate-700">OliPath · ஒளிபாத்</span>
          <span>எளிய டிஜிட்டல் வழிகாட்டி</span>
        </div>
      </footer>
    </div>
  );
}
