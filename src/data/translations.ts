import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  heroPitch: string;
  heroSub: string;
  startButton: string;
  tryDemoButton: string;
  backButton: string;
  continueButton: string;
  homeButton: string;
  listenButton: string;
  listeningNow: string;
  stopAudio: string;
  
  // 4 Main Pillars
  pillarSee: string;
  pillarSeeDesc: string;
  pillarUnderstand: string;
  pillarUnderstandDesc: string;
  pillarExplain: string;
  pillarExplainDesc: string;
  pillarGuide: string;
  pillarGuideDesc: string;

  // Language screen
  languageScreenTitle: string;
  chooseYourLanguage: string;
  languageScreenSub: string;
  languageSelectedConfirm: string;
  
  // Upload screen
  uploadScreenTitle: string;
  uploadHeading: string;
  uploadExplanation: string;
  uploadScreenSub: string;
  takePhotoTitle: string;
  takePhotoDesc: string;
  uploadFileTitle: string;
  uploadFileDesc: string;
  takePhotoOption: string;
  uploadImageOption: string;
  tryDemoOption: string;
  analyzeThisButton: string;
  chooseAnotherImage: string;
  noStoragePrivacyNote: string;
  orChooseSample: string;
  selectedFileLabel: string;
  changePhoto: string;
  analyzeButton: string;

  // Analysis screen
  analyzingTitle: string;
  analyzingSub: string;
  stepScanning: string;
  stepIdentifying: string;
  stepSimplifying: string;
  stepReady: string;
  analysisTip: string;
  viewResultButton: string;

  // Explanation screen
  explanationTitle: string;
  explanationSub: string;
  docIdentifiedLabel: string;
  whatIsThisHeading: string;
  whatYouNeedHeading: string;
  confusingWordsHeading: string;
  originalWordLabel: string;
  simpleMeaningLabel: string;
  safetyNoticeHeading: string;
  safetyNoticeText: string;
  startGuideButton: string;

  // Guided Journey screen
  guidedTitle: string;
  stepOf: string;
  whereToLook: string;
  whatToDo: string;
  testYourself: string;
  completedStepBadge: string;
  prevStepButton: string;
  nextStepButton: string;
  finishGuideButton: string;
  inputGuidance: string;
  simulatedInputNotice: string;

  // Completion screen
  completionTitle: string;
  completionSub: string;
  whatYouAchieved: string;
  keyTakeaways: string[];
  tryAnotherButton: string;
  reviewStepsButton: string;
  safetyFinalTip: string;
}

export const translations: Record<LanguageCode, Translations> = {
  ta: {
    appName: 'OliPath',
    tagline: 'காட்டுங்கள். கேளுங்கள். புரிந்து கொள்ளுங்கள். செய்யுங்கள்.',
    heroPitch: 'டிஜிட்டல் படிவம் அல்லது அரசு அறிவிப்பால் குழப்பமா?',
    heroSub: 'அதை ஒளிபாத்திடம் (OliPath) காட்டுங்க. எளிய பேச்சுத் தமிழ்ல, படிப்படியான தெளிவான வழிகாட்டலைப் பெறுங்க.',
    startButton: 'ஆரம்பிக்கலாம் (Start)',
    tryDemoButton: 'மாதிரி பார்க்க (Try Demo)',
    backButton: 'பின்னால் (Back)',
    continueButton: 'தொடரலாம் (Continue)',
    homeButton: 'முகப்பு',
    listenButton: 'குரல் வழியே கேட்க',
    listeningNow: 'பேசுகிறது...',
    stopAudio: 'நிறுத்துங்க',

    pillarSee: '1. காட்டுங்க (SEE)',
    pillarSeeDesc: 'குழப்பமான படிவம் அல்லது திரையை படம் எடுங்க',
    pillarUnderstand: '2. புரிஞ்சுக்கோங்க (UNDERSTAND)',
    pillarUnderstandDesc: 'கடினமான அரசு சொற்களை எளிய தமிழ்ல மாத்துறோம்',
    pillarExplain: '3. விளக்கம் கேளுங்க (EXPLAIN)',
    pillarExplainDesc: 'இது என்ன ஆவணம், என்ன செய்யணும்னு கேளுங்க',
    pillarGuide: '4. வழிகாட்டுதல் (GUIDE)',
    pillarGuideDesc: 'ஒவ்வொரு கட்டத்துலயும் என்ன எழுதணும்னு வழிகாட்டுகிறோம்',

    chooseYourLanguage: 'Choose your language',
    languageScreenTitle: 'Choose your language',
    languageScreenSub: 'உங்களுக்கு வசதியான மொழியைத் தொடுங்கள் (Tap your preferred language)',
    languageSelectedConfirm: 'தேர்ந்தெடுக்கப்பட்ட மொழி: தமிழ்',

    uploadScreenTitle: "Show me what you don't understand",
    uploadHeading: 'உங்களுக்கு புரியாததை எனக்கு காட்டுங்கள்',
    uploadExplanation: 'படிவம், அரசு அறிவிப்பு அல்லது புரியாத தகவலைக் காட்டலாம்.',
    uploadScreenSub: 'படிவம், அரசு அறிவிப்பு அல்லது புரியாத தகவலைக் காட்டலாம்.',
    takePhotoTitle: 'Take Photo',
    takePhotoDesc: 'போன் கேமராவை வச்சு நேரா படம் எடுங்க',
    uploadFileTitle: 'Upload Image',
    uploadFileDesc: 'போன்ல இருக்குற படத்தை அல்லது ஸ்கிரீன்ஷாட்டை எடுங்க',
    takePhotoOption: 'Take Photo',
    uploadImageOption: 'Upload Image',
    tryDemoOption: 'Try Demo',
    analyzeThisButton: 'Analyze this',
    chooseAnotherImage: 'Choose Another Image',
    noStoragePrivacyNote: 'Do not permanently store uploaded images · உங்கள் படங்கள் சேமிக்கப்படாது',
    orChooseSample: 'அல்லது மாதிரி படிவங்களில் ஒன்றை தொடுங்க:',
    selectedFileLabel: 'தேர்ந்தெடுக்கப்பட்ட படம்',
    changePhoto: 'Choose Another Image',
    analyzeButton: 'Analyze this',

    analyzingTitle: 'படிவத்தை பார்க்கிறோம்...',
    analyzingSub: 'ஒரு நிமிஷம் இருங்க... உங்களுக்காக எளிய பேச்சுத் தமிழில் மாத்துறோம்.',
    stepScanning: 'படத்துல இருக்குற எழுத்துக்களை வாசிக்கிறோம்...',
    stepIdentifying: 'இது என்ன அரசு படிவம்னு கண்டுபிடிச்சாச்சு',
    stepSimplifying: 'கஷ்டமான ஆங்கில வார்த்தைகளை எளிய தமிழ்ல மாத்துறோம்',
    stepReady: 'தயாராகிடுச்சு! விளக்கம் தயார்.',
    analysisTip: 'குறிப்பு: உங்க தனிப்பட்ட விவரங்கள் முற்றிலும் பாதுகாப்பாக இருக்கும்.',
    viewResultButton: 'விளக்கத்தைப் பாருங்க',

    explanationTitle: 'படிவத்துல என்ன இருக்கு? எளிய விளக்கம்',
    explanationSub: 'கொஞ்சமும் பயப்பட வேணாம்! இதில் என்ன இருக்குன்னு சுலபமா தெரிஞ்சுக்கோங்க.',
    docIdentifiedLabel: 'கண்டறியப்பட்ட ஆவணம்:',
    whatIsThisHeading: 'இது என்ன ஆவணம்?',
    whatYouNeedHeading: 'நீங்க கவனிக்க வேண்டிய 3 முக்கிய விஷயங்கள்:',
    confusingWordsHeading: 'கஷ்டமான வார்த்தை - சுலபமான அர்த்தம்:',
    originalWordLabel: 'அரசு சொல்',
    simpleMeaningLabel: 'சுலபமான அர்த்தம்',
    safetyNoticeHeading: 'பாதுகாப்பு எச்சரிக்கை:',
    safetyNoticeText: 'முக்கியமானது: அரசு அதிகாரிகள் ஒருபோதும் உங்க வங்கி OTP அல்லது பாஸ்வேர்ட் கேட்க மாட்டாங்க. யார்கிட்டயும் சொல்லாதீங்க!',
    startGuideButton: 'படிப்படியா செய்ய ஆரம்பிக்கலாம்',

    guidedTitle: 'படிவத்தை நிரப்ப வழிகாட்டி',
    stepOf: 'படி',
    whereToLook: 'எங்க பார்க்கணும்:',
    whatToDo: 'என்ன செய்யணும்:',
    testYourself: 'இங்க செஞ்சு பாருங்க:',
    completedStepBadge: 'சரிபார்க்கப்பட்டது',
    prevStepButton: 'முந்தைய படி',
    nextStepButton: 'அடுத்த படி',
    finishGuideButton: 'முடித்துவிட்டேன்',
    inputGuidance: 'உதவி: பச்சை நிற பெட்டி உள்ள இடத்துல உங்க தகவலை உள்ளிடுங்க.',
    simulatedInputNotice: 'இது ஒரு பயிற்சித் திரை மட்டுமே. உங்க உண்மையான தகவல் மாற்றப்படாது.',

    completionTitle: 'ரொம்ப அருமையா முடிச்சிட்டீங்க!',
    completionSub: 'இப்போ இந்த படிவத்தை பத்தின முழு விவரமும் உங்களுக்கு நல்லா புரிஞ்சிருக்கும்.',
    whatYouAchieved: 'நீங்க கத்துக்கிட்டது:',
    keyTakeaways: [
      'படிவத்தின் நோக்கம் மற்றும் துறை தெளிவாகத் தெரிந்துவிட்டது.',
      'கடினமான ஆங்கில/அரசு சொற்களின் பொருள் விளங்கியது.',
      'ஒவ்வொரு கட்டத்திலும் என்ன உள்ளிட வேண்டும் என்பதை பயிற்சி செய்துவிட்டீர்கள்.',
      'எந்தவொரு ரகசிய எண்ணையும் மற்றவரிடம் பகிராமல் பாதுகாப்பாக இருக்க கற்றுக்கொண்டீர்கள்.'
    ],
    tryAnotherButton: 'வேறொரு படிவத்தை சோதிக்க',
    reviewStepsButton: 'படிகளை மறுபடியும் பார்க்க',
    safetyFinalTip: 'நினைவில் வச்சுக்கோங்க: சந்தேகம் வந்தா ஒளிபாத்திடம் (OliPath) காட்டுங்க!'
  },
  hi: {
    appName: 'OliPath',
    tagline: 'दिखाइए। सुनिए। समझिए। करिए।',
    heroPitch: 'क्या किसी डिजिटल फॉर्म या सरकारी नोटिस से उलझन है?',
    heroSub: 'इसे ओलीपाथ (OliPath) को दिखाइए और आसान भाषा में चरण-दर-चरण मार्गदर्शन प्राप्त कीजिए।',
    startButton: 'शुरू करें (Start)',
    tryDemoButton: 'डेमो देखें (Try Demo)',
    backButton: 'पीछे (Back)',
    continueButton: 'आगे बढ़ें (Continue)',
    homeButton: 'होम',
    listenButton: 'आवाज़ में सुनें',
    listeningNow: 'बोल रहा है...',
    stopAudio: 'रोकें',

    pillarSee: '1. दिखाइए (SEE)',
    pillarSeeDesc: 'उलझन भरे फॉर्म या स्क्रीन की फोटो खींचें',
    pillarUnderstand: '2. समझिए (UNDERSTAND)',
    pillarUnderstandDesc: 'कठिन सरकारी शब्दों को सरल भाषा में बदलें',
    pillarExplain: '3. व्याख्या पाएं (EXPLAIN)',
    pillarExplainDesc: 'सुनें कि यह दस्तावेज क्या है और क्या करना है',
    pillarGuide: '4. मार्गदर्शन (GUIDE)',
    pillarGuideDesc: 'हर कदम पर क्या भरना है, हम सिखाते हैं',

    chooseYourLanguage: 'Choose your language',
    languageScreenTitle: 'Choose your language',
    languageScreenSub: 'अपनी पसंदीदा भाषा चुनें (Select your preferred language)',
    languageSelectedConfirm: 'चुनी गई भाषा: हिन्दी',

    uploadScreenTitle: "Show me what you don't understand",
    uploadHeading: 'जो समझ नहीं आ रहा, वह मुझे दिखाइए',
    uploadExplanation: 'फॉर्म, सरकारी नोटिस, आवेदन स्क्रीन या कठिन निर्देश दिखा सकते हैं।',
    uploadScreenSub: 'फॉर्म, सरकारी नोटिस, आवेदन स्क्रीन या कठिन निर्देश दिखा सकते हैं।',
    takePhotoTitle: 'Take Photo',
    takePhotoDesc: 'अपने फोन कैमरे से सीधे फोटो लें',
    uploadFileTitle: 'Upload Image',
    uploadFileDesc: 'गैलरी से फोटो या स्क्रीनशॉट चुनें',
    takePhotoOption: 'Take Photo',
    uploadImageOption: 'Upload Image',
    tryDemoOption: 'Try Demo',
    analyzeThisButton: 'Analyze this',
    chooseAnotherImage: 'Choose Another Image',
    noStoragePrivacyNote: 'Do not permanently store uploaded images · फोटो कहीं भी सुरक्षित नहीं की जाती',
    orChooseSample: 'या इन नमूना फॉर्मों में से एक आज़माएं:',
    selectedFileLabel: 'चुनी गई फोटो',
    changePhoto: 'Choose Another Image',
    analyzeButton: 'Analyze this',

    analyzingTitle: 'फॉर्म की जांच हो रही है...',
    analyzingSub: 'कृपया प्रतीक्षा करें। हम इसे सरल भाषा में तैयार कर रहे हैं।',
    stepScanning: 'दस्तावेज के शब्दों को पढ़ा जा रहा है...',
    stepIdentifying: 'फॉर्म का प्रकार और विभाग पहचाना गया',
    stepSimplifying: 'कठिन तकनीकी शब्दों को आसान भाषा में बदला जा रहा है',
    stepReady: 'तैयार! पूरी व्याख्या उपलब्ध है।',
    analysisTip: 'ध्यान दें: आपकी निजी जानकारी पूरी तरह सुरक्षित है।',
    viewResultButton: 'व्याख्या देखें',

    explanationTitle: 'फॉर्म की सरल व्याख्या',
    explanationSub: 'घबराने की आवश्यकता नहीं है। जानें कि इसमें क्या लिखा है।',
    docIdentifiedLabel: 'पहचाना गया दस्तावेज:',
    whatIsThisHeading: 'यह क्या दस्तावेज है?',
    whatYouNeedHeading: 'आपके लिए जानने योग्य 3 मुख्य बातें:',
    confusingWordsHeading: 'कठिन शब्द - सरल अर्थ:',
    originalWordLabel: 'सरकारी शब्द',
    simpleMeaningLabel: 'सरल अर्थ',
    safetyNoticeHeading: 'सुरक्षा चेतावनी:',
    safetyNoticeText: 'सरकारी अधिकारी कभी भी आपका बैंक OTP या पासवर्ड नहीं मांगते। इसे किसी के साथ साझा न करें।',
    startGuideButton: 'कदम-दर-कदम मार्गदर्शन शुरू करें',

    guidedTitle: 'फॉर्म भरने का मार्गदर्शन',
    stepOf: 'कदम',
    whereToLook: 'कहाँ देखना है:',
    whatToDo: 'क्या करना है:',
    testYourself: 'यहाँ अभ्यास करें:',
    completedStepBadge: 'सत्यापित',
    prevStepButton: 'पिछला कदम',
    nextStepButton: 'अगला कदम',
    finishGuideButton: 'समाप्त करें',
    inputGuidance: 'सुझाव: हरे रंग के बॉक्स में अपनी जानकारी दर्ज करें।',
    simulatedInputNotice: 'यह केवल अभ्यास स्क्रीन है। आपका वास्तविक डेटा नहीं बदला जाएगा।',

    completionTitle: 'बहुत बढ़िया! आपने पूरा कर लिया!',
    completionSub: 'अब आपको इस फॉर्म की पूरी समझ हो गई है।',
    whatYouAchieved: 'आपने क्या सीखा:',
    keyTakeaways: [
      'दस्तावेज का उद्देश्य और सरकारी विभाग स्पष्ट हो गया।',
      'कठिन शब्दों का सरल अर्थ समझ में आ गया।',
      'हर चरण में क्या भरना है इसका अभ्यास हो गया।',
      'धोखाधड़ी से बचने और OTP सुरक्षित रखने के नियम सीख लिए।'
    ],
    tryAnotherButton: 'दूसरा फॉर्म जांचें',
    reviewStepsButton: 'चरण दोबारा देखें',
    safetyFinalTip: 'याद रखें: जागरूक रहें। संदेह होने पर ओलीपाथ (OliPath) को दिखाएं!'
  },
  en: {
    appName: 'OliPath',
    tagline: 'Show it. Hear it. Understand it. Do it.',
    heroPitch: 'Confused by a digital form or government instruction?',
    heroSub: 'Show it to OliPath and get simple step-by-step guidance in your own language.',
    startButton: 'Start',
    tryDemoButton: 'Try Demo',
    backButton: 'Back',
    continueButton: 'Continue',
    homeButton: 'Home',
    listenButton: 'Listen to Voice',
    listeningNow: 'Speaking...',
    stopAudio: 'Stop',

    pillarSee: '1. Show it (SEE)',
    pillarSeeDesc: 'Snap a photo of the confusing form, notice or screen',
    pillarUnderstand: '2. Understand it (UNDERSTAND)',
    pillarUnderstandDesc: 'We turn complicated official terms into plain language',
    pillarExplain: '3. Hear it (EXPLAIN)',
    pillarExplainDesc: 'Listen to what this document is and what it needs from you',
    pillarGuide: '4. Do it (GUIDE)',
    pillarGuideDesc: 'Clear visual step-by-step guidance on every field to fill',

    chooseYourLanguage: 'Choose your language',
    languageScreenTitle: 'Choose your language',
    languageScreenSub: 'Select the language you are most comfortable with',
    languageSelectedConfirm: 'Selected Language: English',

    uploadScreenTitle: "Show me what you don't understand",
    uploadHeading: "Show me what you don't understand",
    uploadExplanation: "You can show me a form, government notice, application screen, or confusing instruction.",
    uploadScreenSub: "You can show me a form, government notice, application screen, or confusing instruction.",
    takePhotoTitle: 'Take Photo',
    takePhotoDesc: 'Use your phone camera to snap the paper or computer screen directly',
    uploadFileTitle: 'Upload Image',
    uploadFileDesc: 'Select an existing photo, download, or screenshot from your device',
    takePhotoOption: 'Take Photo',
    uploadImageOption: 'Upload Image',
    tryDemoOption: 'Try Demo',
    analyzeThisButton: 'Analyze this',
    chooseAnotherImage: 'Choose Another Image',
    noStoragePrivacyNote: 'Do not permanently store uploaded images. Your privacy is safeguarded.',
    orChooseSample: 'Or choose a real-world demo document:',
    selectedFileLabel: 'Selected Image',
    changePhoto: 'Choose Another Image',
    analyzeButton: 'Analyze this',

    analyzingTitle: 'Analyzing your form...',
    analyzingSub: 'Please hold on. We are turning this into simple, spoken instructions.',
    stepScanning: 'Reading words from your image...',
    stepIdentifying: 'Identifying government department and form type...',
    stepSimplifying: 'Translating confusing legal terms into plain words...',
    stepReady: 'Ready! Simple breakdown generated.',
    analysisTip: 'Note: Your personal privacy is safeguarded. No private records are stored.',
    viewResultButton: 'View Explanation',

    explanationTitle: 'Simple Form Explanation',
    explanationSub: 'No need to worry. Here is what this document actually means in simple words.',
    docIdentifiedLabel: 'Identified Document:',
    whatIsThisHeading: 'What is this document?',
    whatYouNeedHeading: '3 key things you must know:',
    confusingWordsHeading: 'Confusing words simplified:',
    originalWordLabel: 'Official Word',
    simpleMeaningLabel: 'Plain Meaning',
    safetyNoticeHeading: 'Safety Warning:',
    safetyNoticeText: 'Government portals never ask for your bank OTP, PIN or advance money for free services. Never share OTP with strangers.',
    startGuideButton: 'Start Step-by-Step Guide',

    guidedTitle: 'Interactive Form Guide',
    stepOf: 'Step',
    whereToLook: 'Where to look on the screen:',
    whatToDo: 'What you need to do:',
    testYourself: 'Try it right here:',
    completedStepBadge: 'Completed',
    prevStepButton: 'Previous Step',
    nextStepButton: 'Next Step',
    finishGuideButton: 'Complete Journey',
    inputGuidance: 'Hint: Enter your details in the highlighted green box.',
    simulatedInputNotice: 'This is a practice simulator. Your actual records will not be altered.',

    completionTitle: 'Well Done! You Completed It!',
    completionSub: 'You now know exactly how this form works and what is required.',
    whatYouAchieved: 'What you learned:',
    keyTakeaways: [
      'Understood the purpose and authority behind the form.',
      'Learned clear meanings for confusing official terms.',
      'Practiced entering the correct details step by step.',
      'Understood essential security rules to avoid fraud.'
    ],
    tryAnotherButton: 'Try Another Form',
    reviewStepsButton: 'Review Steps Again',
    safetyFinalTip: 'Remember: Stay confident. Whenever a digital form confuses you, just show it to OliPath!'
  }
};
