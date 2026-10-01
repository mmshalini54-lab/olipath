/**
 * Generates a clean base64 PNG data-url of an authentic Tamil Nadu government
 * land record (Patta/Chitta) E-Services portal screen for multimodal demo analysis.
 */
export function getDemoImageDataUrl(): string {
  if (typeof document === 'undefined') {
    return '';
  }

  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 800, 600);

  // Card container
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(40, 30, 720, 540);

  // Header banner
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(40, 30, 720, 65);

  // Header text
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('GOVERNMENT OF TAMIL NADU · வருவாய்த்துறை', 60, 60);
  ctx.font = '14px sans-serif';
  ctx.fillText('e-Services: Patta / Chitta & Land Ownership Verification Portal', 60, 82);

  // Subtitle
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('AnyTime / Anywhere Land Record Extract (படிவம்)', 60, 130);

  // Form Field 1: District
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText('1. Select District (மாவட்டம்):', 60, 165);
  ctx.fillStyle = '#334155';
  ctx.fillRect(60, 175, 320, 42);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('Madurai (மதுரை)', 75, 202);

  // Form Field 2: Taluk
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText('2. Select Taluk (வட்டம்):', 420, 165);
  ctx.fillStyle = '#334155';
  ctx.fillRect(420, 175, 320, 42);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('Melur (மேலூர்)', 435, 202);

  // Form Field 3: Village
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText('3. Select Village (கிராமம்):', 60, 245);
  ctx.fillStyle = '#334155';
  ctx.fillRect(60, 255, 320, 42);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('Melur Village (மேலூர்)', 75, 282);

  // Form Field 4: Survey Number
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText('4. Enter Survey No & Sub-Division (புல எண் / உட்பிரிவு எண்):', 420, 245);
  ctx.fillStyle = '#334155';
  ctx.fillRect(420, 255, 320, 42);
  ctx.fillStyle = '#fde68a';
  ctx.font = 'bold 15px monospace';
  ctx.fillText('142 / 3B', 435, 282);

  // Captcha Security Box
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText('5. Enter Authentication Code (பாதுகாப்பு குறியீடு):', 60, 325);
  ctx.fillStyle = '#020617';
  ctx.fillRect(60, 335, 180, 50);
  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('7 G X 9', 95, 370);

  ctx.fillStyle = '#334155';
  ctx.fillRect(260, 335, 200, 50);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('7GX9', 280, 368);

  // Warning text
  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('WARNING: Never disclose OTP or passwords. No government fee is required for this service.', 60, 430);

  // Buttons
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(60, 465, 200, 48);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Submit (சமர்ப்பிக்க)', 85, 496);

  ctx.fillStyle = '#475569';
  ctx.fillRect(280, 465, 150, 48);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Reset (ரத்து)', 320, 496);

  return canvas.toDataURL('image/png');
}
