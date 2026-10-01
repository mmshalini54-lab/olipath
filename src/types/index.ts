export type ScreenId =
  | 'welcome'
  | 'language'
  | 'upload'
  | 'analysis'
  | 'explanation'
  | 'guided'
  | 'completion';

export type LanguageCode = 'ta' | 'hi' | 'en';

export interface LanguageOption {
  code: LanguageCode;
  nameNative: string;
  nameEnglish: string;
  tagline: string;
  sampleAudioText: string;
  badge?: string;
}

export interface SimplifiedTerm {
  original: string;
  simple: string;
  meaning: string;
}

export interface GuidedStep {
  stepNumber: number;
  title: string;
  instruction: string;
  spokenText: string;
  fieldName: string;
  fieldType: 'select' | 'text' | 'number' | 'button' | 'verify';
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
  tip: string;
  warning?: string;
  highlightBox: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
}

export interface SampleDoc {
  id: string;
  title: string;
  category: string;
  department: string;
  thumbnailBadge: string;
  summary: string;
  urgency: 'normal' | 'important';
  originalDocumentTitle: string;
  keyThingsToKnow: string[];
  simplifiedTerms: SimplifiedTerm[];
  guidedSteps: GuidedStep[];
}

export type DetectedItemType =
  | 'heading'
  | 'instruction'
  | 'form_field'
  | 'button'
  | 'document_requirement'
  | 'warning'
  | 'unfamiliar_term'
  | 'important_action';

export interface GeminiDetectedItem {
  id?: string;
  title: string;
  type: DetectedItemType;
  simpleExplanation: string;
  simplerExplanation?: string;
  dontUnderstandHelp?: string;
  suggestedUserAction: string;
  confidence: 'high' | 'medium' | 'low';
  isTextClear?: boolean;
  boundingBox?: number[]; // [ymin, xmin, ymax, xmax] 0-1000
  levels?: {
    level1: string;
    level2: string;
    level3: string;
  };
}

export interface GeminiAnalysisResult {
  isValidDocument: boolean;
  unclearReason?: string;
  documentTitle: string;
  detectedLanguage?: string;
  overallSummary: string;
  isBlurryOrUnclear?: boolean;
  unclearNotice?: string;
  detectedItems: GeminiDetectedItem[];
  keyRequirements: string[];
  safetyWarnings: string[];
}
