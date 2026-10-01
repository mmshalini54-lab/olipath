import { SampleDoc, LanguageCode } from '../types';

export const sampleDocumentsByLang: Record<LanguageCode, SampleDoc[]> = {
  ta: [
    {
      id: 'patta-chitta',
      title: 'தமிழ்நாடு பட்டா / சிட்டா இணையதள விண்ணப்பம்',
      category: 'வருவாய்த்துறை (Revenue Dept)',
      department: 'நில நிர்வாக ஆணையரகம், தமிழ்நாடு அரசு',
      thumbnailBadge: 'நில ஆவணம்',
      summary: 'உங்க நிலத்தோட உரிமைச் சான்றிதழை (பட்டா/சிட்டா) இணையத்துல சரிபார்த்து பதிவிறக்கம் செய்யுறதுக்கான படிவம் இது.',
      urgency: 'normal',
      originalDocumentTitle: 'Tamil Nadu E-Services: AnyTime / Anywhere e-Services (Patta & FMB / Chitta Extract)',
      keyThingsToKnow: [
        'இதுக்கு எந்த கட்டணமும் தர வேணாம். அரசு தர்ற 100% இலவச சேவை இது.',
        'உங்க பத்திரத்தில் இருக்குற மாவட்டம், தாலுகா, கிராமம் மற்றும் சர்வே எண் மட்டும் போதும்.',
        'படிவத்துல கேட்கப்படும் எண்களை கவனமா உள்ளீடு பண்ணா போதும்.'
      ],
      simplifiedTerms: [
        {
          original: 'District & Taluk',
          simple: 'மாவட்டம் & வட்டம்',
          meaning: 'உங்கள் நிலம் எந்த மாவட்டத்திலும், எந்த வட்டாட்சியர் (வட்டம்) எல்லைக்குள்ளும் வருகிறது என்ற விவரம்.'
        },
        {
          original: 'Survey Number',
          simple: 'புல எண் (சர்வே எண்)',
          meaning: 'நிலத்தின் பத்திரத்தில் "புல எண்" என்று குறிப்பிடப்பட்டிருக்கும் பிரத்யேக அடையாளம்.'
        },
        {
          original: 'Sub-Division Number',
          simple: 'உட்பிரிவு எண்',
          meaning: 'சர்வே எண்ணுக்கு அடுத்து வரும் சிறிய பிரிவு எண் (எடுத்துக்காட்டாக 12/3B).'
        },
        {
          original: 'Captcha Verification',
          simple: 'பாதுகாப்பு குறியீடு',
          meaning: 'கீழே படத்தில் தென்படும் எழுத்துக்களை அப்படியே பார்த்து தட்டச்சு செய்யும் பாதுகாப்பு முறை.'
        }
      ],
      guidedSteps: [
        {
          stepNumber: 1,
          title: 'மாவட்டம் மற்றும் வட்டத்தைத் தேர்ந்தெடுக்கவும்',
          instruction: 'முதலில் உங்கள் நிலம் அமைந்திருக்கும் மாவட்டப் பெயரைப் பட்டியலிலிருந்து தேர்ந்தெடுக்கவும்.',
          spokenText: 'படி ஒன்று: உங்கள் நிலம் இருக்கும் மாவட்டத்தைத் தொட்டு தேர்ந்தெடுக்கவும்.',
          fieldName: 'மாவட்டம் (District)',
          fieldType: 'select',
          options: ['சென்னை (Chennai)', 'மதுரை (Madurai)', 'கோயம்புத்தூர் (Coimbatore)', 'திருச்சிராப்பள்ளி (Tiruchirappalli)', 'சேலம் (Salem)'],
          defaultValue: 'மதுரை (Madurai)',
          tip: 'குறிப்பு: உங்கள் பத்திரத்தின் முதல் பக்கத்தில் உள்ள முகவரியைப் பார்க்கவும்.',
          highlightBox: { top: '16%', left: '8%', width: '84%', height: '14%' }
        },
        {
          stepNumber: 2,
          title: 'கிராமப் பெயரைத் தேர்ந்தெடுக்கவும்',
          instruction: 'உங்கள் நிலம் இருக்கும் கிராமத்தின் பெயரைத் தொடுங்கள்.',
          spokenText: 'படி இரண்டு: உங்கள் நிலம் அமைந்துள்ள கிராமப் பெயரைத் தேர்ந்தெடுக்கவும்.',
          fieldName: 'கிராமம் (Village)',
          fieldType: 'select',
          options: ['ஆலங்குளம் (Alangulam)', 'மேலூர் (Melur)', 'வாடிப்பட்டி (Vadipatti)', 'உசிலம்பட்டி (Usilampatti)'],
          defaultValue: 'மேலூர் (Melur)',
          tip: 'குறிப்பு: கிராமத்தின் பெயர் பஞ்சாயத்து பெயருடன் ஒத்திருக்கலாம்.',
          highlightBox: { top: '33%', left: '8%', width: '84%', height: '14%' }
        },
        {
          stepNumber: 3,
          title: 'புல எண் (Survey No) உள்ளிடவும்',
          instruction: 'நிலப் பத்திரத்தில் உள்ள சர்வே எண்ணை எண்களாக தட்டச்சு செய்யவும்.',
          spokenText: 'படி மூன்று: உங்கள் பத்திரத்தில் உள்ள நில புல எண்ணை உள்ளிடவும்.',
          fieldName: 'புல எண் (Survey Number)',
          fieldType: 'number',
          placeholder: 'எடுத்துக்காட்டு: 142',
          defaultValue: '142',
          tip: 'கவனிக்க: எழுத்துக்கள் இல்லாமல் எண்களை மட்டுமே பதிவு செய்யவும்.',
          highlightBox: { top: '50%', left: '8%', width: '84%', height: '14%' }
        },
        {
          stepNumber: 4,
          title: 'பாதுகாப்பு குறியீட்டைப் பார்த்து பதிவு செய்க',
          instruction: 'திரையில் தெரியும் எழுத்துக்களை (Captcha) உள்ளிட்டு "சமர்ப்பிக்க" பொத்தானை அழுத்தவும்.',
          spokenText: 'படி நான்கு: திரையில் தெரியும் எழுத்துக்களை உள்ளிட்டு சமர்ப்பிக்க பொத்தானை அழுத்தவும்.',
          fieldName: 'பாதுகாப்பு குறியீடு (Captcha)',
          fieldType: 'text',
          placeholder: 'எழுத்துக்கள்: 7 G X 9',
          defaultValue: '7GX9',
          tip: 'பெரிய எழுத்து, சிறிய எழுத்து இரண்டையும் சரியாக பார்த்து எழுதவும்.',
          warning: 'எந்த கட்டணமும் தேவையில்லை. சமர்ப்பித்தவுடன் பட்டா நகல் திரையில் தோன்றும்.',
          highlightBox: { top: '67%', left: '8%', width: '84%', height: '20%' }
        }
      ]
    },
    {
      id: 'ration-kyc',
      title: 'ரேஷன் அட்டை ஆதார் E-KYC சரிபார்ப்பு அறிவிப்பு',
      category: 'உணவு & நுகர்வோர் பாதுகாப்புத் துறை',
      department: 'பொது விநியோகத் திட்டம் (PDS), தமிழ்நாடு அரசு',
      thumbnailBadge: 'முக்கிய அறிவிப்பு',
      summary: 'ரேஷன் குடும்ப அட்டையில் உள்ள உறுப்பினர்களின் ஆதார் எண்ணை சரிபார்ப்பதற்கான அதிகாரப்பூர்வ அரசு அறிவிப்பு.',
      urgency: 'important',
      originalDocumentTitle: 'Tamil Nadu Civil Supplies: Mandatory Aadhaar Seeding & Biometric E-KYC Notice',
      keyThingsToKnow: [
        'உங்கள் ரேஷன் கார்டு செயலிழக்காமல் இருக்க இந்த எளிய சரிபார்ப்பை செய்ய வேண்டும்.',
        'அருகிலுள்ள நியாயவிலைக் கடை (ரேஷன் கடை) அல்லது இ-சேவை மையத்தில் கைரேகை பதிவு செய்யலாம்.',
        'யாராவது போன் செய்து OTP கேட்டால் ஒருபோதும் கூறாதீர்கள்!'
      ],
      simplifiedTerms: [
        {
          original: 'E-KYC (Know Your Customer)',
          simple: 'நேரடி அடையாளம் சரிபார்ப்பு',
          meaning: 'அரசுப் பலன்கள் உண்மையான குடும்பத்தினருக்கே போய்ச் சேர ஆதார் மூலம் உறுதிப்படுத்துதல்.'
        },
        {
          original: 'Biometric Authentication',
          simple: 'கைரேகை அல்லது கண் விழி சரிபார்ப்பு',
          meaning: 'ரேஷன் கடையில் உள்ள கருவியில் கைவிரல் வைத்து அடையாளத்தை உறுதி செய்யும் முறை.'
        },
        {
          original: 'Family Card Smart Card No',
          simple: 'ஸ்மார்ட் கார்டு எண்',
          meaning: 'உங்கள் ரேஷன் அட்டையின் முன்பக்கத்தில் உள்ள 12 இலக்க அட்டை எண்.'
        }
      ],
      guidedSteps: [
        {
          stepNumber: 1,
          title: 'ரேஷன் அட்டை எண்ணை சரிபார்க்கவும்',
          instruction: 'உங்கள் ஸ்மார்ட் கார்டு முன்பக்க எண்ணை சரிபார்த்து உறுதி செய்யவும்.',
          spokenText: 'படி ஒன்று: உங்கள் ரேஷன் அட்டையில் உள்ள எண்ணை சரிபார்க்கவும்.',
          fieldName: 'ஸ்மார்ட் அட்டை எண் (Card Number)',
          fieldType: 'number',
          placeholder: '3301XXXXXXXX',
          defaultValue: '330184920184',
          tip: 'குறிப்பு: 12 இலக்க எண் சரியாக உள்ளதா என்று பார்க்கவும்.',
          highlightBox: { top: '20%', left: '8%', width: '84%', height: '18%' }
        },
        {
          stepNumber: 2,
          title: 'குடும்ப உறுப்பினர் பெயரைத் தேர்வு செய்க',
          instruction: 'சரிபார்க்க வேண்டிய குடும்பத் தலைவர் அல்லது உறுப்பினர் பெயரைத் தொடவும்.',
          spokenText: 'படி இரண்டு: சரிபார்க்க வேண்டிய குடும்ப உறுப்பினர் பெயரைத் தேர்ந்தெடுக்கவும்.',
          fieldName: 'உறுப்பினர் பெயர் (Family Member)',
          fieldType: 'select',
          options: ['கண்ணன் (குடும்பத் தலைவர்)', 'லட்சுமி (மனைவி)', 'கார்த்திக் (மகன்)'],
          defaultValue: 'கண்ணன் (குடும்பத் தலைவர்)',
          tip: 'குடும்பத்தில் உள்ள அனைவரும் தங்களது கைரேகையை ஒரு முறை பதிய வேண்டும்.',
          highlightBox: { top: '42%', left: '8%', width: '84%', height: '18%' }
        },
        {
          stepNumber: 3,
          title: 'நேரடி முறை அல்லது மொபைல் OTP முறை',
          instruction: 'ரேஷன் கடையில் கைரேகை வைக்கலாம் அல்லது ஆதாருடன் இணைக்கப்பட்ட போனுக்கு வரும் OTP உள்ளிடலாம்.',
          spokenText: 'படி மூன்று: உங்கள் போனுக்கு வரும் OTP எண்ணை உள்ளிடவும். இந்த எண்ணை யாருக்கும் பகிர வேண்டாம்.',
          fieldName: 'ஆதார் OTP எண் (Aadhaar OTP)',
          fieldType: 'number',
          placeholder: '6 இலக்க எண் (எ.கா: 481920)',
          defaultValue: '481920',
          tip: 'ரகசியத்தை பாதுகாக்கவும்: போன் செய்து கேட்பவர்களிடம் OTP சொல்லக்கூடாது.',
          warning: 'அரசு அதிகாரிகள் ஒருபோதும் உங்கள் வங்கி OTP அல்லது கடவுச்சொல்லை கேட்க மாட்டார்கள்.',
          highlightBox: { top: '64%', left: '8%', width: '84%', height: '22%' }
        }
      ]
    },
    {
      id: 'tangedco-bill',
      title: 'மின் கட்டணம் செலுத்தும் இணைய படிவம் (TANGEDCO)',
      category: 'மின்சார வாரியம்',
      department: 'தமிழ்நாடு மின் உற்பத்தி மற்றும் பகிர்மான கழகம்',
      thumbnailBadge: 'கட்டணப் படிவம்',
      summary: 'உங்கள் வீட்டின் மாத மின் கட்டணத்தை ஆன்லைனில் தவறில்லாமல் சரிபார்த்து செலுத்தும் திரை.',
      urgency: 'normal',
      originalDocumentTitle: 'TANGEDCO Online Payment: Consumer Quick Pay Assessment',
      keyThingsToKnow: [
        'உங்கள் மின்சார அட்டை அல்லது பழைய ரசீதில் உள்ள நுகர்வோர் எண் (Consumer No) மட்டும் போதும்.',
        'கட்ட வேண்டிய தொகை மற்றும் கடைசி தேதி தெளிவாகத் தெரியும்.',
        'கூடுதல் கட்டணம் எதுவும் கிடையாது.'
      ],
      simplifiedTerms: [
        {
          original: 'Consumer Number',
          simple: 'நுகர்வோர் எண்',
          meaning: 'மின்சார கணக்கு புத்தகத்தில் அச்சிடப்பட்ட பகுதி குறியீடு மற்றும் இணைப்பு எண்.'
        },
        {
          original: 'Due Date',
          simple: 'கடைசி தேதி',
          meaning: 'அபராதக் கட்டணம் இன்றி பணம் செலுத்த வேண்டிய இறுதி நாள்.'
        },
        {
          original: 'Assessment Amount',
          simple: 'செலுத்த வேண்டிய மின் கட்டணம்',
          meaning: 'இந்த மாதம் நீங்கள் பயன்படுத்திய மின்சாரத்திற்கான மொத்த தொகை.'
        }
      ],
      guidedSteps: [
        {
          stepNumber: 1,
          title: 'மண்டல குறியீடு மற்றும் நுகர்வோர் எண்',
          instruction: 'உங்கள் மின் அட்டையில் உள்ள 9 அல்லது 10 இலக்க எண்ணை உள்ளிடவும்.',
          spokenText: 'படி ஒன்று: உங்கள் மின்சார அட்டை எண்ணை பதிவு செய்யவும்.',
          fieldName: 'மின் இணைப்பு எண் (Consumer Number)',
          fieldType: 'number',
          placeholder: 'எடுத்துக்காட்டு: 0412345678',
          defaultValue: '0412345678',
          tip: 'குறிப்பு: முதல் இரண்டு எண்கள் உங்கள் மின் மண்டலத்தைக் குறிக்கும்.',
          highlightBox: { top: '22%', left: '8%', width: '84%', height: '18%' }
        },
        {
          stepNumber: 2,
          title: 'தொகையை சரிபார்க்கவும்',
          instruction: 'திரையில் தோன்றும் உங்கள் பெயர் மற்றும் கட்டணத் தொகையை சரிபார்க்கவும்.',
          spokenText: 'படி இரண்டு: உங்கள் பெயர் மற்றும் மின் கட்டணத் தொகையை உறுதிப்படுத்திக் கொள்ளுங்கள்.',
          fieldName: 'கட்ட வேண்டிய தொகை',
          fieldType: 'verify',
          defaultValue: '₹ 450.00 (கடைசி தேதி: 15-அக்டோபர்)',
          tip: 'பெயர் உங்கள் மின் அட்டையில் உள்ள பெயருடன் ஒத்துப்போகிறதா என்று கவனிக்கவும்.',
          highlightBox: { top: '44%', left: '8%', width: '84%', height: '18%' }
        },
        {
          stepNumber: 3,
          title: 'கட்டண முறையைத் தேர்ந்தெடுக்கவும் (UPI / QR)',
          instruction: 'எளிய முறையில் Google Pay / PhonePe / BHIM QR குறியீடு மூலமாக செலுத்தலாம்.',
          spokenText: 'படி மூன்று: உங்கள் போனில் உள்ள கூகிள் பே அல்லது போன்பே மூலம் கட்டணத்தை முடிக்கவும்.',
          fieldName: 'கட்டண முறை',
          fieldType: 'select',
          options: ['UPI QR குறியீடு (Google Pay, PhonePe)', 'டெபிட் கார்டு (ATM Card)', 'நெட் பேங்கிங்'],
          defaultValue: 'UPI QR குறியீடு (Google Pay, PhonePe)',
          tip: 'QR குறியீட்டை ஸ்கேன் செய்தால் நேரடியாக மின்வாரிய கணக்கிற்கு பணம் சென்றுவிடும்.',
          highlightBox: { top: '65%', left: '8%', width: '84%', height: '22%' }
        }
      ]
    }
  ],
  hi: [
    {
      id: 'patta-chitta',
      title: 'ई-सेवा भूमि दस्तावेज (खतौनी / पट्टा) फॉर्म',
      category: 'राजस्व विभाग (Revenue Dept)',
      department: 'भूमि एवं राजस्व प्रभाग',
      thumbnailBadge: 'भूमि दस्तावेज',
      summary: 'अपनी भूमि के मालिकाना हक का प्रमाण पत्र ऑनलाइन देखने और डाउनलोड करने का फॉर्म।',
      urgency: 'normal',
      originalDocumentTitle: 'E-Services: Land Record Record of Rights & Survey Details Form',
      keyThingsToKnow: [
        'इस सेवा के लिए कोई सरकारी शुल्क नहीं है। यह पूर्णतः निःशुल्क है।',
        'दस्तावेज के लिए आपका जिला, तहसील, गाँव और खसरा/सर्वे नंबर चाहिए।',
        'फॉर्म में कठिन तकनीकी शब्दों की जगह सरल चरणों का पालन करें।'
      ],
      simplifiedTerms: [
        {
          original: 'District & Tehsil',
          simple: 'जिला और तहसील',
          meaning: 'आपकी भूमि किस जिले और तहसील क्षेत्र के अंतर्गत आती है।'
        },
        {
          original: 'Survey / Khasra No',
          simple: 'खसरा / सर्वे नंबर',
          meaning: 'आपकी जमीन के कागजात पर लिखा विशेष पहचान नंबर।'
        },
        {
          original: 'Captcha Verification',
          simple: 'सुरक्षा कोड',
          meaning: 'नीचे चित्र में दिख रहे अक्षरों को देखकर वैसा ही लिखना।'
        }
      ],
      guidedSteps: [
        {
          stepNumber: 1,
          title: 'अपना जिला और तहसील चुनें',
          instruction: 'सूची में से अपनी जमीन के जिले का नाम चुनें।',
          spokenText: 'कदम एक: अपनी भूमि का जिला चुनें।',
          fieldName: 'जिला (District)',
          fieldType: 'select',
          options: ['लखनऊ (Lucknow)', 'कानपुर (Kanpur)', 'वाराणसी (Varanasi)', 'आगरा (Agra)'],
          defaultValue: 'वाराणसी (Varanasi)',
          tip: 'सुझाव: अपने पुराने कागजात पर लिखा जिला देखें।',
          highlightBox: { top: '16%', left: '8%', width: '84%', height: '14%' }
        },
        {
          stepNumber: 2,
          title: 'गाँव का नाम चुनें',
          instruction: 'गाँव की सूची से अपने गाँव का चयन करें।',
          spokenText: 'कदम दो: अपने गाँव का नाम चुनें।',
          fieldName: 'गाँव (Village)',
          fieldType: 'select',
          options: ['रामपुर (Rampur)', 'शिवपुर (Shivpur)', 'कल्याणपुर (Kalyanpur)'],
          defaultValue: 'शिवपुर (Shivpur)',
          tip: 'सुझाव: ग्राम पंचायत के नाम से भी खोज सकते हैं।',
          highlightBox: { top: '33%', left: '8%', width: '84%', height: '14%' }
        },
        {
          stepNumber: 3,
          title: 'खसरा या सर्वे संख्या दर्ज करें',
          instruction: 'जमीन की रजिस्ट्री पर लिखी सर्वे संख्या दर्ज करें।',
          spokenText: 'कदम तीन: अपनी जमीन की सर्वे संख्या दर्ज करें।',
          fieldName: 'सर्वे संख्या (Survey Number)',
          fieldType: 'number',
          placeholder: 'उदाहरण: 142',
          defaultValue: '142',
          tip: 'केवल अंक दर्ज करें।',
          highlightBox: { top: '50%', left: '8%', width: '84%', height: '14%' }
        },
        {
          stepNumber: 4,
          title: 'सुरक्षा कोड देखकर सबमिट करें',
          instruction: 'दिख रहे अक्षरों को लिखकर सबमिट बटन दबाएं।',
          spokenText: 'कदम चार: सुरक्षा कोड लिखकर सबमिट करें।',
          fieldName: 'सुरक्षा कोड (Captcha)',
          fieldType: 'text',
          placeholder: '7 G X 9',
          defaultValue: '7GX9',
          tip: 'बड़ा और छोटा अक्षर ध्यान से लिखें।',
          highlightBox: { top: '67%', left: '8%', width: '84%', height: '20%' }
        }
      ]
    },
    {
      id: 'ration-kyc',
      title: 'राशन कार्ड आधार E-KYC सूचना',
      category: 'खाद्य एवं रसद विभाग',
      department: 'सार्वजनिक वितरण प्रणाली (PDS)',
      thumbnailBadge: 'ज़रूरी सूचना',
      summary: 'राशन कार्ड में परिवार के सदस्यों का आधार सत्यापन कराने का आधिकारिक नोटिस।',
      urgency: 'important',
      originalDocumentTitle: 'Civil Supplies: Aadhaar Seeding & Biometric E-KYC Notice',
      keyThingsToKnow: [
        'राशन कार्ड सुचारू रखने के लिए यह सत्यापन आवश्यक है।',
        'नजदीकी कोटेदार या जन सेवा केंद्र पर अंगूठा लगाकर कराया जा सकता है।',
        'कोई फोन पर OTP मांगे तो कभी न बताएं!'
      ],
      simplifiedTerms: [
        {
          original: 'E-KYC',
          simple: 'पहचान सत्यापन',
          meaning: 'यह पुष्टि करना कि सरकारी राशन सही व्यक्ति को ही मिल रहा है।'
        },
        {
          original: 'Biometric Authentication',
          simple: 'फिंगरप्रिंट या अंगूठा सत्यापन',
          meaning: 'मशीन पर अंगूठा रखकर पहचान प्रमाणित करने की प्रक्रिया।'
        }
      ],
      guidedSteps: [
        {
          stepNumber: 1,
          title: 'राशन कार्ड संख्या जांचें',
          instruction: 'अपने कार्ड पर लिखी 12 अंकों की संख्या दर्ज करें।',
          spokenText: 'कदम एक: अपने राशन कार्ड का नंबर जांचें।',
          fieldName: 'राशन कार्ड नंबर',
          fieldType: 'number',
          defaultValue: '330184920184',
          tip: 'कार्ड के सामने लिखी संख्या देखें।',
          highlightBox: { top: '20%', left: '8%', width: '84%', height: '18%' }
        },
        {
          stepNumber: 2,
          title: 'सदस्य का नाम चुनें',
          instruction: 'जिसका सत्यापन होना है उसका नाम चुनें।',
          spokenText: 'कदम दो: सदस्य का नाम चुनें।',
          fieldName: 'सदस्य का नाम',
          fieldType: 'select',
          options: ['रामेश्वर (मुखिया)', 'सुनीता देवी (पत्नी)', 'अमित (पुत्र)'],
          defaultValue: 'रामेश्वर (मुखिया)',
          tip: 'परिवार के सभी सदस्यों का एक-एक कर सत्यापन होता है।',
          highlightBox: { top: '42%', left: '8%', width: '84%', height: '18%' }
        },
        {
          stepNumber: 3,
          title: 'आधार OTP दर्ज करें',
          instruction: 'आधार से जुड़े मोबाइल नंबर पर आया 6 अंकों का OTP दर्ज करें।',
          spokenText: 'कदम तीन: आधार से जुड़े मोबाइल पर आया OTP दर्ज करें। इसे किसी अजनबी को न बताएं।',
          fieldName: 'आधार OTP',
          fieldType: 'number',
          placeholder: '6 अंकों का कोड',
          defaultValue: '481920',
          tip: 'सावधानी: सरकारी अधिकारी कभी फोन पर OTP नहीं मांगते।',
          highlightBox: { top: '64%', left: '8%', width: '84%', height: '22%' }
        }
      ]
    },
    {
      id: 'tangedco-bill',
      title: 'बिजली बिल ऑनलाइन भुगतान फॉर्म',
      category: 'विद्युत वितरण निगम',
      department: 'राज्य विद्युत बोर्ड',
      thumbnailBadge: 'बिल भुगतान',
      summary: 'अपने घर का बिजली बिल देखकर सुरक्षित ऑनलाइन भुगतान करने का फॉर्म।',
      urgency: 'normal',
      originalDocumentTitle: 'Electricity Distribution: Consumer Quick Bill Payment Portal',
      keyThingsToKnow: [
        'अपने पुराने बिल पर लिखा उपभोक्ता नंबर (Consumer Number) ही काफी है।',
        'भुगतान की अंतिम तारीख और राशि साफ दिखाई देगी।',
        'UPI या QR कोड से भुगतान सबसे सुरक्षित और आसान है।'
      ],
      simplifiedTerms: [
        {
          original: 'Consumer Number',
          simple: 'उपभोक्ता संख्या',
          meaning: 'बिजली के मीटर या रसीद पर छपा खाता नंबर।'
        },
        {
          original: 'Due Date',
          simple: 'अंतिम तारीख',
          meaning: 'बिना पेनल्टी के बिल भरने का आखिरी दिन।'
        }
      ],
      guidedSteps: [
        {
          stepNumber: 1,
          title: 'उपभोक्ता खाता संख्या दर्ज करें',
          instruction: 'अपने बिजली बिल पर लिखा कनेक्शन नंबर लिखें।',
          spokenText: 'कदम एक: अपने बिजली बिल पर लिखा खाता नंबर दर्ज करें।',
          fieldName: 'उपभोक्ता नंबर (Consumer No)',
          fieldType: 'number',
          defaultValue: '0412345678',
          tip: 'पुराने बिल की पर्ची में यह नंबर मिलेगा।',
          highlightBox: { top: '22%', left: '8%', width: '84%', height: '18%' }
        },
        {
          stepNumber: 2,
          title: 'राशि और नाम की पुष्टि करें',
          instruction: 'अपना नाम और बकाया राशि देख लें।',
          spokenText: 'कदम दो: अपना नाम और राशि की पुष्टि करें।',
          fieldName: 'देय राशि (Amount Due)',
          fieldType: 'verify',
          defaultValue: '₹ 450.00 (अंतिम तारीख: 15 अक्टूबर)',
          tip: 'नाम सही है तभी आगे बढ़ें।',
          highlightBox: { top: '44%', left: '8%', width: '84%', height: '18%' }
        },
        {
          stepNumber: 3,
          title: 'भुगतान का तरीका चुनें (UPI QR)',
          instruction: 'Google Pay या PhonePe से QR कोड स्कैन कर भुगतान करें।',
          spokenText: 'कदम तीन: Google Pay या PhonePe से QR कोड स्कैन कर भुगतान करें।',
          fieldName: 'भुगतान माध्यम',
          fieldType: 'select',
          options: ['UPI QR कोड (Google Pay, PhonePe)', 'ATM डेबिट कार्ड', 'नेट बैंकिंग'],
          defaultValue: 'UPI QR कोड (Google Pay, PhonePe)',
          tip: 'QR कोड स्कैन करने पर पैसा सीधे बिजली बोर्ड के खाते में जाएगा।',
          highlightBox: { top: '65%', left: '8%', width: '84%', height: '22%' }
        }
      ]
    }
  ],
  en: [
    {
      id: 'patta-chitta',
      title: 'Land Ownership Record (Patta / Chitta) Portal',
      category: 'Revenue Department',
      department: 'Land Administration Directorate',
      thumbnailBadge: 'Land Record',
      summary: 'Official form to verify and download your land ownership certificate and survey record online.',
      urgency: 'normal',
      originalDocumentTitle: 'Tamil Nadu E-Services: AnyTime / Anywhere e-Services (Patta & FMB / Chitta Extract)',
      keyThingsToKnow: [
        'This is a 100% free government service. No payment is required.',
        'You only need the District, Taluk, Village, and Survey Number from your deed.',
        'Follow simple inputs step by step instead of getting lost in legal jargon.'
      ],
      simplifiedTerms: [
        {
          original: 'District & Taluk',
          simple: 'District and Sub-District',
          meaning: 'The administrative region where your land is geographically situated.'
        },
        {
          original: 'Survey Number',
          simple: 'Land Identity Number',
          meaning: 'The unique numerical identification assigned to your plot on the revenue deed.'
        },
        {
          original: 'Sub-Division Number',
          simple: 'Split Plot Number',
          meaning: 'The minor division identifier that follows the survey number (e.g. 142/3B).'
        },
        {
          original: 'Captcha Verification',
          simple: 'Anti-Robot Security Code',
          meaning: 'Letters and numbers shown in an image that you re-type to prove you are human.'
        }
      ],
      guidedSteps: [
        {
          stepNumber: 1,
          title: 'Select District and Taluk',
          instruction: 'Choose the administrative district where your property is situated.',
          spokenText: 'Step one: Tap to select your district from the dropdown list.',
          fieldName: 'District',
          fieldType: 'select',
          options: ['Chennai', 'Madurai', 'Coimbatore', 'Tiruchirappalli', 'Salem'],
          defaultValue: 'Madurai',
          tip: 'Hint: Check the top of the first page of your property deed document.',
          highlightBox: { top: '16%', left: '8%', width: '84%', height: '14%' }
        },
        {
          stepNumber: 2,
          title: 'Select Village Name',
          instruction: 'Pick the village or revenue block from the provided options.',
          spokenText: 'Step two: Select your village name.',
          fieldName: 'Village',
          fieldType: 'select',
          options: ['Alangulam', 'Melur', 'Vadipatti', 'Usilampatti'],
          defaultValue: 'Melur',
          tip: 'Hint: Usually matches your local panchayat or municipality jurisdiction.',
          highlightBox: { top: '33%', left: '8%', width: '84%', height: '14%' }
        },
        {
          stepNumber: 3,
          title: 'Enter Land Survey Number',
          instruction: 'Type in the primary survey number printed on your property deed.',
          spokenText: 'Step three: Type the survey number written on your deed.',
          fieldName: 'Survey Number',
          fieldType: 'number',
          placeholder: 'Example: 142',
          defaultValue: '142',
          tip: 'Only numbers should be entered in this field.',
          highlightBox: { top: '50%', left: '8%', width: '84%', height: '14%' }
        },
        {
          stepNumber: 4,
          title: 'Enter Captcha Security Code & Submit',
          instruction: 'Read the characters displayed on screen, type them, and hit Submit.',
          spokenText: 'Step four: Enter the security characters and press Submit.',
          fieldName: 'Captcha Code',
          fieldType: 'text',
          placeholder: '7 G X 9',
          defaultValue: '7GX9',
          tip: 'Make sure capital and small letters match what is shown in the image.',
          warning: 'No fees required. Your certificate will generate on screen immediately.',
          highlightBox: { top: '67%', left: '8%', width: '84%', height: '20%' }
        }
      ]
    },
    {
      id: 'ration-kyc',
      title: 'Ration Smart Card Aadhaar E-KYC Notice',
      category: 'Food & Consumer Protection',
      department: 'Public Distribution System (PDS)',
      thumbnailBadge: 'Important Notice',
      summary: 'Official instruction notice requiring cardholders to link and verify Aadhaar biometrics.',
      urgency: 'important',
      originalDocumentTitle: 'Civil Supplies Department: Aadhaar Seeding & Biometric E-KYC Notice',
      keyThingsToKnow: [
        'Required so your family ration card remains active and benefits reach you.',
        'Can be completed at your local Fair Price Shop (Ration Shop) or E-Seva center.',
        'Never disclose OTP or bank account numbers to callers claiming to be officials.'
      ],
      simplifiedTerms: [
        {
          original: 'E-KYC (Electronic Know Your Customer)',
          simple: 'Digital Identity Verification',
          meaning: 'Confirming your biometric or Aadhaar identity so welfare benefits reach the right family.'
        },
        {
          original: 'Biometric Authentication',
          simple: 'Fingerprint or Iris Scan',
          meaning: 'Placing your thumb on the POS machine scanner at the ration shop to prove your identity.'
        }
      ],
      guidedSteps: [
        {
          stepNumber: 1,
          title: 'Verify Your Smart Card Number',
          instruction: 'Check the 12-digit number printed on the front of your family card.',
          spokenText: 'Step one: Verify the 12-digit number on your smart ration card.',
          fieldName: 'Smart Card Number',
          fieldType: 'number',
          defaultValue: '330184920184',
          tip: 'Ensure all 12 digits match your plastic smart card.',
          highlightBox: { top: '20%', left: '8%', width: '84%', height: '18%' }
        },
        {
          stepNumber: 2,
          title: 'Select Family Member to Verify',
          instruction: 'Select which member of the household is completing their verification.',
          spokenText: 'Step two: Select which family member is being verified.',
          fieldName: 'Family Member',
          fieldType: 'select',
          options: ['Kannan (Head of Household)', 'Lakshmi (Spouse)', 'Karthik (Son)'],
          defaultValue: 'Kannan (Head of Household)',
          tip: 'All family members over 5 years old need biometric verification once.',
          highlightBox: { top: '42%', left: '8%', width: '84%', height: '18%' }
        },
        {
          stepNumber: 3,
          title: 'Enter Aadhaar OTP or Thumbprint',
          instruction: 'Enter the 6-digit OTP received on your Aadhaar-registered mobile phone.',
          spokenText: 'Step three: Enter the 6-digit OTP from your phone. Never share it with strangers.',
          fieldName: 'Aadhaar OTP',
          fieldType: 'number',
          placeholder: '6-digit code',
          defaultValue: '481920',
          tip: 'Security reminder: Government officers will NEVER call you to ask for this OTP.',
          warning: 'Do not share this code with anyone over phone calls or WhatsApp.',
          highlightBox: { top: '64%', left: '8%', width: '84%', height: '22%' }
        }
      ]
    },
    {
      id: 'tangedco-bill',
      title: 'Electricity Board Online Payment Form',
      category: 'Power & Energy',
      department: 'State Electricity Distribution Corporation',
      thumbnailBadge: 'Bill Payment',
      summary: 'Screen to view monthly electricity assessment and pay without penalty.',
      urgency: 'normal',
      originalDocumentTitle: 'Electricity Distribution: Consumer Quick Bill Payment Portal',
      keyThingsToKnow: [
        'You only need the Consumer Number printed on your yellow card or previous bill.',
        'Due date and current amount due are shown clearly.',
        'Paying through UPI / QR code carries zero service fees.'
      ],
      simplifiedTerms: [
        {
          original: 'Consumer Number',
          simple: 'Customer Account Number',
          meaning: 'The unique sequence identifying your home or business power connection.'
        },
        {
          original: 'Due Date',
          simple: 'Last Date to Pay',
          meaning: 'The final date to settle your electricity bill without paying a late penalty fee.'
        }
      ],
      guidedSteps: [
        {
          stepNumber: 1,
          title: 'Enter Consumer Connection Number',
          instruction: 'Type the 9 or 10-digit number from your electricity card.',
          spokenText: 'Step one: Enter the consumer number written on your electricity card.',
          fieldName: 'Consumer Number',
          fieldType: 'number',
          defaultValue: '0412345678',
          tip: 'Hint: The first two digits signify your regional electricity distribution circle.',
          highlightBox: { top: '22%', left: '8%', width: '84%', height: '18%' }
        },
        {
          stepNumber: 2,
          title: 'Verify Account Name and Amount',
          instruction: 'Make sure your name and bill amount match your meter readings.',
          spokenText: 'Step two: Check that your name and the bill amount match.',
          fieldName: 'Total Amount Due',
          fieldType: 'verify',
          defaultValue: '₹ 450.00 (Due Date: 15-Oct)',
          tip: 'Double check the account owner name before proceeding.',
          highlightBox: { top: '44%', left: '8%', width: '84%', height: '18%' }
        },
        {
          stepNumber: 3,
          title: 'Choose Payment Method (UPI QR)',
          instruction: 'Pay easily by scanning the official QR code using Google Pay or PhonePe.',
          spokenText: 'Step three: Scan the QR code with Google Pay or PhonePe to finish payment safely.',
          fieldName: 'Payment Mode',
          fieldType: 'select',
          options: ['UPI QR Code (Google Pay, PhonePe)', 'Debit Card / ATM Card', 'Net Banking'],
          defaultValue: 'UPI QR Code (Google Pay, PhonePe)',
          tip: 'QR codes go directly to the verified electricity board account.',
          highlightBox: { top: '65%', left: '8%', width: '84%', height: '22%' }
        }
      ]
    }
  ]
};
