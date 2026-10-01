import React, { useRef, useState } from 'react';
import { LanguageCode, SampleDoc } from '../types';
import { translations } from '../data/translations';
import { sampleDocumentsByLang } from '../data/sampleDocs';
import { AudioSpeakButton } from './AudioSpeakButton';
import { 
  Camera, 
  UploadCloud, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  RefreshCw, 
  ShieldCheck, 
  PlayCircle,
  FileCheck
} from 'lucide-react';

interface ScreenUploadProps {
  language: LanguageCode;
  selectedDoc: SampleDoc;
  customImage: string | null;
  onSelectDoc: (doc: SampleDoc) => void;
  onSetCustomImage: (imgUrl: string | null) => void;
  onProceedToAnalyze: () => void;
  onBack: () => void;
  isSpeaking: boolean;
  onToggleSpeech: (text: string) => void;
}

export const ScreenUpload: React.FC<ScreenUploadProps> = ({
  language,
  selectedDoc,
  customImage,
  onSelectDoc,
  onSetCustomImage,
  onProceedToAnalyze,
  onBack,
  isSpeaking,
  onToggleSpeech,
}) => {
  const t = translations[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const sampleList = sampleDocumentsByLang[language] || sampleDocumentsByLang.ta;

  // Track if a demo document was explicitly picked as the active selection
  const [demoSelected, setDemoSelected] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onSetCustomImage(event.target.result as string);
          setDemoSelected(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryDemoClick = () => {
    onSetCustomImage(null);
    setDemoSelected(true);
  };

  const handleChooseAnother = () => {
    onSetCustomImage(null);
    setDemoSelected(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  // Whether an image is currently selected (either device upload or demo document)
  const hasActiveSelection = Boolean(customImage || demoSelected);

  // Exact headings & explanation as requested
  const headingText = language === 'ta'
    ? 'உங்களுக்கு புரியாததை எனக்கு காட்டுங்கள்'
    : language === 'hi'
    ? 'जो समझ नहीं आ रहा, वह मुझे दिखाइए'
    : "Show me what you don't understand";

  const explanationText = language === 'ta'
    ? 'படிவம், அரசு அறிவிப்பு அல்லது புரியாத தகவலைக் காட்டலாம்.'
    : language === 'hi'
    ? 'फॉर्म, सरकारी नोटिस, आवेदन स्क्रीन या कठिन निर्देश दिखा सकते हैं।'
    : 'You can show me a form, government notice, application screen, or confusing instruction.';

  const spokenGuidance = `${headingText}. ${explanationText}. Take Photo, Upload Image, அல்லது Try Demo தேர்ந்தெடுக்கவும்.`;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Hidden File Inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Screen Heading & Explanation */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {headingText}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              {explanationText}
            </p>
          </div>

          <AudioSpeakButton
            textToSpeak={spokenGuidance}
            isSpeaking={isSpeaking}
            onToggle={onToggleSpeech}
            language={language}
            size="compact"
          />
        </div>
      </div>

      {/* When NO image is selected: Show 3 Large Options */}
      {!hasActiveSelection ? (
        <div className="space-y-4 pt-1">
          {/* Option 1: Take Photo */}
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="w-full min-h-[92px] p-5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold border-2 border-amber-600 shadow-md flex items-center justify-between text-left transition-all active:scale-[0.98] cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                <Camera className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight block">
                  1. Take Photo
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900/90 block mt-0.5">
                  {language === 'ta' ? 'கேமரா மூலம் படம் எடுக்க' : 'Use phone camera to snap document'}
                </span>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 stroke-[3] text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Option 2: Upload Image */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full min-h-[92px] p-5 rounded-2xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-bold border-2 border-slate-300 hover:border-slate-400 shadow-sm flex items-center justify-between text-left transition-all active:scale-[0.98] cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 border border-slate-200 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight block">
                  2. Upload Image
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-600 block mt-0.5">
                  {language === 'ta' ? 'கேலரியிலிருந்து படம் அல்லது ஸ்கிரீன்ஷாட்' : 'Select from gallery or files'}
                </span>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 stroke-[2.5] text-slate-500 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Option 3: Try Demo */}
          <button
            type="button"
            onClick={handleTryDemoClick}
            className="w-full min-h-[92px] p-5 rounded-2xl bg-white hover:bg-amber-50/70 active:bg-amber-100 text-slate-900 font-bold border-2 border-amber-300 hover:border-amber-400 shadow-sm flex items-center justify-between text-left transition-all active:scale-[0.98] cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 border border-amber-300 group-hover:scale-105 transition-transform">
                <PlayCircle className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    3. Try Demo
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-200 text-amber-950">
                    Sample Form
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-600 block mt-0.5">
                  {language === 'ta' ? 'மாதிரி பட்டா / சிட்டா விண்ணப்பம்' : 'Try with Tamil Nadu Land Record portal'}
                </span>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 stroke-[2.5] text-amber-700 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ) : (
        /* When an image or demo is selected: Show Preview + Action Buttons */
        <div className="space-y-4 animate-fadeIn">
          {/* Selected Image Preview Container */}
          <div className="bg-white border-2 border-amber-400 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-sm font-bold text-slate-900">
              <div className="flex items-center gap-2 text-emerald-700 font-extrabold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
                <span>Selected Image (தேர்ந்தெடுக்கப்பட்ட படம்)</span>
              </div>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                {customImage ? 'Uploaded Image' : selectedDoc.thumbnailBadge}
              </span>
            </div>

            {/* Visual Image Render */}
            <div className="w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-300 relative min-h-[220px] flex items-center justify-center">
              {customImage ? (
                <img
                  src={customImage}
                  alt="Uploaded form preview"
                  className="w-full max-h-[300px] object-contain"
                />
              ) : (
                /* Authentic Indian Document Visual Card Preview for Demo */
                <div className="w-full bg-slate-900 text-white p-5 space-y-3 select-none">
                  {/* Top Seal Header */}
                  <div className="border-b border-slate-700 pb-3 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                        GOVERNMENT OF TAMIL NADU · தமிழ்நாடு அரசு
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white leading-tight">
                        {selectedDoc.originalDocumentTitle}
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm">
                      TN
                    </div>
                  </div>

                  {/* Form Mock Fields */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded bg-slate-800/90 border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">District (மாவட்டம்):</span>
                      <span className="font-bold text-white">Madurai / மதுரை</span>
                    </div>
                    <div className="p-2 rounded bg-slate-800/90 border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Taluk (வட்டம்):</span>
                      <span className="font-bold text-white">Melur / மேலூர்</span>
                    </div>
                    <div className="p-2 rounded bg-slate-800/90 border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Survey No (புல எண்):</span>
                      <span className="font-bold text-amber-300">142/3B</span>
                    </div>
                    <div className="p-2 rounded bg-slate-800/90 border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Captcha:</span>
                      <span className="font-mono font-bold tracking-widest text-emerald-400">7 G X 9</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span>Reference: TN-REV-2026-98124</span>
                    <span className="text-amber-400 font-medium">Ready to Analyze</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons: "Analyze this" & "Choose Another Image" */}
          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={onProceedToAnalyze}
              className="w-full min-h-[58px] py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-extrabold text-lg sm:text-xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Analyze this</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>

            <button
              type="button"
              onClick={handleChooseAnother}
              className="w-full min-h-[52px] py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-base border-2 border-slate-300 hover:border-slate-400 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer"
            >
              <RefreshCw className="w-5 h-5 text-slate-600" />
              <span>Choose Another Image</span>
            </button>
          </div>
        </div>
      )}

      {/* Mandatory Privacy Statement: Do not permanently store uploaded images */}
      <div className="bg-slate-100/90 rounded-2xl p-4 border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-slate-600 font-medium">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong className="text-slate-900 block font-semibold">
            Do not permanently store uploaded images.
          </strong>
          {language === 'ta'
            ? 'உங்கள் படங்கள் தற்காலிகமாக மட்டுமே பார்க்கப்படும். எந்த தகவலும் சேமிக்கப்படாது.'
            : 'Your uploaded images are processed temporarily on your device and are never permanently stored.'}
        </p>
      </div>

      {/* Back Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={onBack}
          className="w-full min-h-[52px] py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-base border-2 border-slate-300 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          <span>{t.backButton}</span>
        </button>
      </div>
    </div>
  );
};
