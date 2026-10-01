import React, { useEffect, useState, useRef } from 'react';
import { LanguageCode, SampleDoc, GeminiAnalysisResult } from '../types';
import { translations } from '../data/translations';
import { analyzeDocumentWithGemini } from '../services/geminiService';
import { AudioSpeakButton } from './AudioSpeakButton';
import { 
  Loader2, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ArrowRight, 
  ShieldCheck, 
  Camera, 
  Eye, 
  Sparkles,
  HelpCircle,
  FileQuestion
} from 'lucide-react';

interface ScreenAnalysisProps {
  language: LanguageCode;
  imageDataUrl: string;
  selectedDoc: SampleDoc;
  onAnalysisSuccess: (result: GeminiAnalysisResult) => void;
  onUploadClearer: () => void;
  onUseFallbackDemo: () => void;
  isSpeaking: boolean;
  onToggleSpeech: (text: string) => void;
}

export const ScreenAnalysis: React.FC<ScreenAnalysisProps> = ({
  language,
  imageDataUrl,
  selectedDoc,
  onAnalysisSuccess,
  onUploadClearer,
  onUseFallbackDemo,
  isSpeaking,
  onToggleSpeech,
}) => {
  const t = translations[language];

  const [status, setStatus] = useState<'loading' | 'success' | 'unclear' | 'error'>('loading');
  const [analysisResult, setAnalysisResult] = useState<GeminiAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingPhase, setLoadingPhase] = useState<number>(0);
  const hasCalledApi = useRef(false);

  // Exact headings specified by the user
  const loadingHeading = language === 'ta'
    ? 'உங்கள் ஆவணத்தைப் புரிந்துகொள்கிறேன்...'
    : language === 'hi'
    ? 'आपके दस्तावेज़ को समझ रहे हैं...'
    : 'Understanding your document...';

  const loadingSub = language === 'ta'
    ? 'படத்திலுள்ள எழுத்துக்கள், கட்டங்கள் மற்றும் பொத்தான்களை நேரில் பார்த்து ஆராய்கிறது.'
    : language === 'hi'
    ? 'छवि में दिखने वाले शीर्षकों, निर्देशों, फ़ील्ड और बटनों की पहचान की जा रही है।'
    : 'Examining visible headings, instructions, fields, and buttons on your screen.';

  useEffect(() => {
    // Cycle subtle loading status messages for user reassurance
    const timer1 = setTimeout(() => setLoadingPhase(1), 1200);
    const timer2 = setTimeout(() => setLoadingPhase(2), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const runAnalysis = async () => {
    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await analyzeDocumentWithGemini(imageDataUrl, language);

      if (!response.success || !response.data) {
        setStatus('error');
        setErrorMessage(response.error || 'Could not complete analysis.');
        return;
      }

      const data = response.data;
      setAnalysisResult(data);

      if (!data.isValidDocument) {
        // Document is not valid / unreadable / blank
        setStatus('unclear');
      } else {
        setStatus('success');
      }
    } catch (err: any) {
      console.error('Analysis execution failed:', err);
      setStatus('error');
      setErrorMessage(err?.message || 'Unexpected error occurred.');
    }
  };

  useEffect(() => {
    if (!hasCalledApi.current) {
      hasCalledApi.current = true;
      runAnalysis();
    }
  }, []);

  const spokenGuidance = status === 'loading'
    ? `${loadingHeading}. ${loadingSub}`
    : status === 'success' && analysisResult
    ? `${analysisResult.documentTitle}. ${analysisResult.overallSummary}`
    : status === 'unclear'
    ? (language === 'ta'
        ? 'படிவம் அல்லது உரிய தகவல் தெளிவாகத் தெரியவில்லை. தயவுசெய்து தெளிவான படத்தை மீண்டும் பதிவேற்றவும்.'
        : 'No useful form or instruction detected. Please upload a clearer image.')
    : 'பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.';

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Screen Title */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-between gap-2 max-w-sm mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight flex-1 text-center">
            {status === 'loading'
              ? loadingHeading
              : status === 'success'
              ? (language === 'ta' ? 'ஆவணம் புரிந்தது!' : 'Document Understood!')
              : status === 'unclear'
              ? (language === 'ta' ? 'தெளிவான படம் தேவை' : 'Clearer Image Needed')
              : (language === 'ta' ? 'தற்காலிக பிழை' : 'Analysis Notice')}
          </h2>

          <AudioSpeakButton
            textToSpeak={spokenGuidance}
            isSpeaking={isSpeaking}
            onToggle={onToggleSpeech}
            language={language}
            size="compact"
          />
        </div>

        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-md mx-auto">
          {status === 'loading'
            ? loadingSub
            : status === 'success'
            ? (language === 'ta'
                ? 'உங்கள் படிவத்தில் உள்ள விவரங்கள் எளிய தமிழில் தொகுக்கப்பட்டுள்ளன.'
                : 'Visible items on your document have been identified and simplified.')
            : status === 'unclear'
            ? (language === 'ta'
                ? 'படிவம் அல்லது எழுத்துக்கள் தெளிவாகத் தெரியவில்லை.'
                : 'No clear form or instruction could be detected from this image.')
            : errorMessage}
        </p>
      </div>

      {/* Visual Scanning Frame with Image Preview */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-700 shadow-md">
        {imageDataUrl ? (
          <img
            src={imageDataUrl}
            alt="Document being analyzed"
            className="w-full max-h-[260px] object-contain opacity-85"
          />
        ) : (
          <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
            Sample Document Preview
          </div>
        )}

        {/* Animated Scanner Laser Bar when loading */}
        {status === 'loading' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-full h-1 bg-amber-400 shadow-[0_0_15px_#f59e0b] animate-bounce duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent"></div>
          </div>
        )}

        {/* Status Badge overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-700">
          <span className="flex items-center gap-1.5">
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                <span className="text-amber-300">
                  {loadingPhase === 0
                    ? 'Scanning visible headings...'
                    : loadingPhase === 1
                    ? 'Detecting fields & instructions...'
                    : 'Simplifying official terms...'}
                </span>
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">
                  {analysisResult?.detectedItems.length || 0} items identified
                </span>
              </>
            ) : status === 'unclear' ? (
              <>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300">Unclear Image</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-300">Analysis Error</span>
              </>
            )}
          </span>
          <span className="text-slate-400 font-normal">Gemini Multimodal</span>
        </div>
      </div>

      {/* Case 1: LOADING STATE */}
      {status === 'loading' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div className="text-sm font-semibold text-slate-800">
              {language === 'ta' ? 'படத்திலுள்ள எழுத்துக்களை வாசிக்கிறது' : 'Reading visible text and titles'}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="text-sm font-semibold text-slate-800">
              {language === 'ta' ? 'படிவத்தின் கட்டங்கள் மற்றும் எச்சரிக்கைகளை அடையாளம் காண்கிறது' : 'Detecting form fields, buttons & warnings'}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div className="text-sm font-semibold text-slate-800">
              {language === 'ta' ? 'கடினமான சொற்களை எளிய தமிழில் மாற்றுகிறது' : 'Translating complex terms into plain speech'}
            </div>
          </div>
        </div>
      )}

      {/* Case 2: SUCCESS STATE */}
      {status === 'success' && analysisResult && (
        <div className="space-y-4">
          {/* Summary Box */}
          <div className="bg-white rounded-2xl p-5 border-2 border-emerald-400 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
              <span>{analysisResult.detectedLanguage || 'Identified Document'}</span>
              <span>100% Verified</span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
              {analysisResult.documentTitle}
            </h3>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              {analysisResult.overallSummary}
            </p>

            {/* Notice if text was partially unclear */}
            {analysisResult.isBlurryOrUnclear && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-xs sm:text-sm text-amber-950 font-medium flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  {analysisResult.unclearNotice ||
                    (language === 'ta'
                      ? 'குறிப்பு: சில எழுத்துக்கள் தெளிவாக இல்லை, ஆனால் முக்கியமான பகுதிகள் கண்டறியப்பட்டுள்ளன.'
                      : 'Notice: Some text was unclear or faint, but main sections are detected.')}
                </span>
              </div>
            )}
          </div>

          {/* Action Button: View Explanation */}
          <button
            type="button"
            onClick={() => onAnalysisSuccess(analysisResult)}
            className="w-full min-h-[58px] py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-extrabold text-lg sm:text-xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>{language === 'ta' ? 'விளக்கத்தைக் காணவும்' : 'View Explanation'}</span>
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </button>
        </div>
      )}

      {/* Case 3: UNCLEAR / NO USEFUL FORM DETECTED */}
      {status === 'unclear' && (
        <div className="bg-white rounded-2xl p-5 border-2 border-amber-400 shadow-sm space-y-4">
          <div className="flex items-start gap-3 text-amber-950">
            <FileQuestion className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'ta' ? 'தெளிவான படம் தேவை' : 'No useful form or instruction detected'}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {analysisResult?.unclearReason ||
                  (language === 'ta'
                    ? 'இந்த புகைப்படத்தில் படிவம் அல்லது அரசு அறிவிப்பு தெளிவாகத் தெரியவில்லை. போன் கேமராவை வெளிச்சத்தில் வைத்து, படிவம் முழுவதும் தெரியும்படி மீண்டும் படம் எடுக்கவும்.'
                    : 'No useful form, official notice, or clear instructions could be detected in this photo. Please upload a clearer, brighter photo.')}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={onUploadClearer}
              className="w-full min-h-[54px] py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] cursor-pointer"
            >
              <Camera className="w-5 h-5 stroke-[2.5]" />
              <span>{language === 'ta' ? 'தெளிவான படத்தை எடுக்க / பதிவேற்ற' : 'Upload Clearer Image'}</span>
            </button>

            <button
              type="button"
              onClick={onUseFallbackDemo}
              className="w-full min-h-[48px] py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{language === 'ta' ? 'மாதிரி ஆவணத்தை சோதிக்க (Try Demo)' : 'Try Demo Document Instead'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Case 4: ERROR STATE */}
      {status === 'error' && (
        <div className="bg-red-50 rounded-2xl p-5 border-2 border-red-300 shadow-sm space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-red-950">
                {language === 'ta' ? 'சேவை தொடர்பு பிழை' : 'Analysis Service Notice'}
              </h3>
              <p className="text-xs sm:text-sm text-red-800">
                {errorMessage || 'Unable to connect to the Gemini analysis service.'}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={runAnalysis}
              className="w-full min-h-[52px] py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <RefreshCw className="w-5 h-5" />
              <span>{language === 'ta' ? 'மீண்டும் முயற்சிக்க' : 'Try Again'}</span>
            </button>

            <button
              type="button"
              onClick={onUseFallbackDemo}
              className="w-full min-h-[48px] py-2.5 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{language === 'ta' ? 'மாதிரி ஆவணத்துடன் தொடர (Use Demo)' : 'Continue with Demo Sample'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Privacy guarantee */}
      <div className="bg-slate-100/90 rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-slate-600 justify-center">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Do not permanently store uploaded images · உங்கள் படங்கள் சேமிக்கப்படாது.</span>
      </div>
    </div>
  );
};
