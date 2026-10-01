import { GeminiAnalysisResult, LanguageCode } from '../types';

export interface AnalyzeResponse {
  success: boolean;
  data?: GeminiAnalysisResult;
  error?: string;
}

export interface AskQuestionResponse {
  success: boolean;
  answer?: string;
  error?: string;
}

export interface SimplerLevels {
  level1: string;
  level2: string;
  level3: string;
}

export interface SimplerResponse {
  success: boolean;
  data?: SimplerLevels;
  error?: string;
}

export async function analyzeDocumentWithGemini(
  imageDataUrl: string,
  language: LanguageCode
): Promise<AnalyzeResponse> {
  try {
    const response = await fetch('/api/analyze-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageDataUrl,
        language,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result?.error || `Server responded with status ${response.status}`,
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (err: any) {
    console.error('Error contacting OliPath analysis server:', err);
    return {
      success: false,
      error: err?.message || 'Could not connect to the analysis service. Please check your network connection.',
    };
  }
}

export async function askFieldQuestion(
  question: string,
  fieldName: string,
  fieldExplanation: string,
  fieldAction: string,
  language: LanguageCode
): Promise<AskQuestionResponse> {
  try {
    const response = await fetch('/api/ask-field-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        fieldName,
        fieldExplanation,
        fieldAction,
        language,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result?.error || 'Could not get answer.',
      };
    }

    return {
      success: true,
      answer: result.answer,
    };
  } catch (err: any) {
    console.error('Error calling askFieldQuestion:', err);
    return {
      success: false,
      error: err?.message || 'Failed to connect to assistant service.',
    };
  }
}

export async function makeItSimpler(
  fieldTitle: string,
  currentExplanation: string,
  action: string,
  language: LanguageCode
): Promise<SimplerResponse> {
  try {
    const response = await fetch('/api/make-it-simpler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fieldTitle,
        currentExplanation,
        action,
        language,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result?.error || 'Could not simplify explanation.',
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (err: any) {
    console.error('Error in makeItSimpler:', err);
    return {
      success: false,
      error: err?.message || 'Failed to contact simplification service.',
    };
  }
}
