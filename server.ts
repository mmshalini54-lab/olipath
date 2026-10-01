import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const port = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();

  // Allow larger payload for base64 image transfers
  app.use(express.json({ limit: '25mb' }));

  // Helper to initialize GoogleGenAI safely on demand
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // POST endpoint: /api/analyze-form
  app.post('/api/analyze-form', async (req, res) => {
    try {
      const { image, language = 'ta' } = req.body;

      if (!image) {
        return res.status(400).json({
          success: false,
          error: 'No image provided for analysis',
        });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(500).json({
          success: false,
          error: 'GEMINI_API_KEY is not configured on the server. Please check the Secrets panel.',
        });
      }

      // Parse base64 and mimeType
      let mimeType = 'image/jpeg';
      let base64Data = image;

      const dataUrlMatch = image.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
      if (dataUrlMatch) {
        mimeType = dataUrlMatch[1];
        base64Data = dataUrlMatch[2];
      }

      const langInstructions: Record<string, string> = {
        ta: 'Simple, colloquial, conversational Tamil (எளிய பேச்சுத் தமிழ்). Use clear everyday Tamil words for explanations and actions, and mention the English original in parentheses when helpful.',
        hi: 'Simple, conversational Hindi (सरल हिन्दी). Use straightforward everyday words.',
        en: 'Clear, plain, simple English suitable for first-time digital users.'
      };

      const selectedLangInstruction = langInstructions[language] || langInstructions.ta;

      const systemInstruction = `You are OliPath, an empathetic, highly accurate digital accessibility assistant helping first-time digital users in India understand complicated digital forms, government notices, application screens, and instructions.

CRITICAL INSTRUCTIONS:
1. Analyze ONLY what is physically and clearly visible in the image. Do NOT invent, assume, or hallucinate information that is not visible.
2. If text or numbers are unclear, blurry, or cropped, explicitly state that they are unclear in the explanation and mark isTextClear as false.
3. If no useful form, government notice, or digital screen instruction is detected (e.g. random photo, landscape, completely unreadable blur, or blank screen), set isValidDocument to false and provide a friendly explanation in unclearReason asking the user to upload a clearer or brighter photo of the document.
4. Thoroughly identify:
   - headings
   - instructions
   - form fields (input boxes, checkboxes, dropdowns)
   - buttons (submit, pay, proceed, cancel)
   - document requirements (what the user needs to have ready, e.g. Aadhaar number, survey number, etc.)
   - warnings (critical deadlines, fraud prevention, penalty notices)
   - unfamiliar terms (complicated official or bureaucratic jargon)
   - important actions (what the user must physically or digitally do next)
5. For EVERY detected item return:
   - title: exact name or visible label
   - type: one of "heading", "instruction", "form_field", "button", "document_requirement", "warning", "unfamiliar_term", "important_action"
   - simpleExplanation: explain in very simple everyday language what this means
   - suggestedUserAction: concrete, step-by-step advice on what the user should do
   - confidence: "high", "medium", or "low"
   - isTextClear: boolean (false if partially blurry or cut off)
6. Language for output: Provide all explanations, summaries, and suggested actions in: ${selectedLangInstruction}.`;

      const prompt = `Analyze this uploaded image of a form, government notice, or application screen. Extract all visible headings, instructions, form fields, buttons, requirements, warnings, unfamiliar terms, and important actions. Return structured information as specified. Remember: do not invent information; if text is unclear, say so.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: base64Data,
              },
            },
            {
              text: prompt,
            },
          ],
        },
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isValidDocument: {
                type: Type.BOOLEAN,
                description: 'True if a form, government notice, application screen or instruction is visible. False if unrelated, completely illegible or blank.',
              },
              unclearReason: {
                type: Type.STRING,
                description: 'Friendly message explaining why the image could not be understood and asking to upload a clearer photo if isValidDocument is false or text is unclear.',
              },
              documentTitle: {
                type: Type.STRING,
                description: 'Concise title of the detected form or notice.',
              },
              detectedLanguage: {
                type: Type.STRING,
                description: 'Languages seen in the document, e.g. Tamil, English, etc.',
              },
              overallSummary: {
                type: Type.STRING,
                description: 'Simple 2-3 sentence overview of what this document is about in plain words.',
              },
              isBlurryOrUnclear: {
                type: Type.BOOLEAN,
                description: 'True if any part of the image has low legibility or blur.',
              },
              unclearNotice: {
                type: Type.STRING,
                description: 'Specific note about which parts are difficult to read, if any.',
              },
              detectedItems: {
                type: Type.ARRAY,
                description: 'List of detected headings, instructions, fields, buttons, requirements, warnings, terms, and actions.',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: {
                      type: Type.STRING,
                      description: 'Exact visible title or label.',
                    },
                    type: {
                      type: Type.STRING,
                      description: 'One of: heading, instruction, form_field, button, document_requirement, warning, unfamiliar_term, important_action.',
                    },
                    simpleExplanation: {
                      type: Type.STRING,
                      description: 'Easy-to-understand explanation in the target language.',
                    },
                    simplerExplanation: {
                      type: Type.STRING,
                      description: 'Even simpler, ultra-plain 1-sentence explanation in the requested language when user clicks "Make It Simpler".',
                    },
                    dontUnderstandHelp: {
                      type: Type.STRING,
                      description: 'Helpful examples, practical tips, or clarification in the requested language when user clicks "I Don\'t Understand".',
                    },
                    suggestedUserAction: {
                      type: Type.STRING,
                      description: 'Actionable step for the user.',
                    },
                    confidence: {
                      type: Type.STRING,
                      description: 'high, medium, or low.',
                    },
                    isTextClear: {
                      type: Type.BOOLEAN,
                      description: 'True if text was clearly readable, false if partially unclear.',
                    },
                    boundingBox: {
                      type: Type.ARRAY,
                      items: { type: Type.INTEGER },
                      description: 'Optional 4 integers [ymin, xmin, ymax, xmax] normalized to 0-1000 ONLY if accurately detectable. Leave empty if coordinates are not reliably known.',
                    },
                  },
                  required: ['title', 'type', 'simpleExplanation', 'suggestedUserAction', 'confidence'],
                },
              },
              keyRequirements: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Things the user needs to know or bring (e.g. free service, keep survey number ready).',
              },
              safetyWarnings: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Crucial fraud prevention warnings (e.g. never share OTP or pay unverified intermediaries).',
              },
            },
            required: [
              'isValidDocument',
              'documentTitle',
              'overallSummary',
              'detectedItems',
              'keyRequirements',
              'safetyWarnings',
            ],
          },
        },
      });

      const rawText = response.text?.trim() || '{}';
      let parsedData;
      try {
        parsedData = JSON.parse(rawText);
      } catch (parseErr) {
        console.error('Failed to parse Gemini response as JSON:', rawText);
        return res.status(500).json({
          success: false,
          error: 'Failed to parse model output into structured information.',
        });
      }

      return res.json({
        success: true,
        data: parsedData,
      });
    } catch (err: any) {
      console.error('Gemini API Error in /api/analyze-form:', err);
      return res.status(500).json({
        success: false,
        error: err?.message || 'An error occurred while analyzing the document with Gemini.',
      });
    }
  });

  // POST endpoint: /api/ask-field-question
  app.post('/api/ask-field-question', async (req, res) => {
    try {
      const { question, fieldName, fieldExplanation, fieldAction, language = 'ta' } = req.body;

      if (!question) {
        return res.status(400).json({ success: false, error: 'Question is required' });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(500).json({ success: false, error: 'GEMINI_API_KEY is not configured on the server.' });
      }

      const langMap: Record<string, string> = {
        ta: 'simple, friendly conversational Tamil (எளிய பேச்சுத் தமிழ்).',
        hi: 'simple, friendly conversational Hindi (सरल हिन्दी).',
        en: 'clear, plain conversational English.',
      };

      const systemInstruction = `You are OliPath's helpful voice assistant for first-time digital users in India.
The user is asking a question about a specific field on their form or document.
Answer directly, concisely (2-3 sentences max), warmly, and helpfully in ${langMap[language] || langMap.ta}.
Give clear, concrete examples (e.g. Aadhaar card, electricity bill, ration card) if they ask about required documents.
Do not use complicated bureaucratic words.`;

      const prompt = `Field Name: ${fieldName || 'Not specified'}
Current Explanation: ${fieldExplanation || 'Not specified'}
Suggested Action: ${fieldAction || 'Not specified'}

User Question: "${question}"

Provide a concise, direct, spoken answer to the user's question:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      const answer = response.text?.trim() || '';

      return res.json({
        success: true,
        answer,
      });
    } catch (err: any) {
      console.error('Error in /api/ask-field-question:', err);
      return res.status(500).json({
        success: false,
        error: err?.message || 'Could not process question.',
      });
    }
  });

  // POST endpoint: /api/make-it-simpler
  app.post('/api/make-it-simpler', async (req, res) => {
    try {
      const { fieldTitle, currentExplanation, action, language = 'ta' } = req.body;

      if (!fieldTitle && !currentExplanation) {
        return res.status(400).json({ success: false, error: 'Field details are required' });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(500).json({ success: false, error: 'GEMINI_API_KEY is not configured on the server.' });
      }

      const langMap: Record<string, string> = {
        ta: 'very simple, warm, conversational Tamil (எளிய பேச்சுத் தமிழ்).',
        hi: 'very simple, clear conversational Hindi (सरल हिन्दी).',
        en: 'clear, plain conversational English.',
      };

      const systemInstruction = `You are OliPath's empathetic simplification assistant.
Your task is to take an explanation of a field or instruction from a digital form and provide THREE progressive levels of simplicity in ${langMap[language] || langMap.ta}.

LEVEL 1: Simple explanation. Straightforward and free of official jargon.
LEVEL 2: Very simple explanation with a helpful everyday example (e.g. mentioning common documents like Aadhaar card, electricity bill, ration card).
LEVEL 3: Explain it as if this is the user's first time using a digital service. Gentle, step-by-step, reassuring, explaining what to tap or look for.

STRICT RULES:
- Never make fun of the user's lack of knowledge.
- Never tell the user what personal information they should enter (do not tell them specific private numbers or names to type).
- Only explain what the field requires.
- Provide all 3 levels in ${langMap[language] || langMap.ta}.`;

      const prompt = `Field Name: ${fieldTitle || 'Form Field'}
Current Explanation: ${currentExplanation || 'Not specified'}
Action: ${action || 'Not specified'}

Rewrite this explanation into Level 1, Level 2, and Level 3 according to the guidelines.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.2,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              level1: {
                type: Type.STRING,
                description: 'Level 1: Simple explanation without jargon.',
              },
              level2: {
                type: Type.STRING,
                description: 'Level 2: Very simple explanation with a helpful real-life example.',
              },
              level3: {
                type: Type.STRING,
                description: 'Level 3: Explained gently as if this is the user\'s first time using a digital service or phone.',
              },
            },
            required: ['level1', 'level2', 'level3'],
          },
        },
      });

      const parsed = JSON.parse(response.text?.trim() || '{}');

      return res.json({
        success: true,
        data: parsed,
      });
    } catch (err: any) {
      console.error('Error in /api/make-it-simpler:', err);
      return res.status(500).json({
        success: false,
        error: err?.message || 'Could not generate simpler explanations.',
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Serve static assets in production or Vite middleware in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`OliPath server running on http://0.0.0.0:${port}`);
  });
}

startServer();
