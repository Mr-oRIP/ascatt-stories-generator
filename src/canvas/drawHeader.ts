import type { StoryConfig } from '../types/story';
import { STORY_WIDTH as W } from './constants';
import { drawRoundedRect } from './helpers';
import type { StoryPalette } from './theme';

/** 3. Header (logo società + logo FITET) e 4. titolo giornata + sottotitolo */
export function drawHeader(
  ctx: CanvasRenderingContext2D,
  config: StoryConfig,
  palette: StoryPalette,
  customLogoImg: HTMLImageElement | null
): void {
  // 3. HEADER: LOGO CENTRALE + FITET IN ALTO A DESTRA

  // Disegna ovale/stemma centrale in alto
  const headerCenterY = 145;
  if (customLogoImg) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(W / 2, headerCenterY, 92, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.18)';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.clip();
    ctx.drawImage(customLogoImg, W / 2 - 86, headerCenterY - 86, 172, 172);
    ctx.restore();
  } else {
    // Stemma Ufficiale ASCA TT / Olimpia style oval badge
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    drawRoundedRect(ctx, W / 2 - 190, 58, 380, 174, 87);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = palette.badgeBorder;
    ctx.stroke();
    ctx.restore();

    // Cerchio stemma interno a sinistra nell'ovale
    ctx.save();
    ctx.beginPath();
    ctx.arc(W / 2 - 102, 145, 58, 0, Math.PI * 2);
    ctx.fillStyle = '#16a34a';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#facc15';
    ctx.stroke();

    // Racchetta nel logo
    ctx.beginPath();
    ctx.arc(W / 2 - 102, 140, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#dc2626';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(W / 2 - 90, 132, 9, 0, Math.PI * 2);
    ctx.fill();

    // Testo Nome Società nel badge superiore
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 36px "Inter", "Arial Black", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(config.clubName || 'ASCA TT', W / 2 - 28, 138);

    ctx.fillStyle = '#dc2626';
    ctx.font = '800 18px "Inter", Arial, sans-serif';
    ctx.fillText('TENNISTAVOLO', W / 2 - 28, 166);

    ctx.fillStyle = '#64748b';
    ctx.font = '700 14px "Inter", Arial, sans-serif';
    ctx.fillText('A.S.D.', W / 2 - 28, 188);
    ctx.restore();
  }

  // Logo FITET in alto a destra
  ctx.save();
  const fx = W - 155;
  const fy = 125;
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(fx, fy, 55, Math.PI * 0.75, Math.PI * 1.85);
  ctx.stroke();

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(fx + 4, fy - 4, 48, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();

  ctx.fillStyle = palette.fitetName;
  ctx.font = 'italic 900 32px "Arial Black", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('FITET', fx + 6, fy + 6);

  ctx.fillStyle = palette.fitetDetail;
  ctx.font = '700 9px Arial, sans-serif';
  ctx.fillText('FEDERAZIONE ITALIANA', fx + 6, fy + 20);
  ctx.fillText('TENNISTAVOLO', fx + 6, fy + 30);
  ctx.restore();

  // 4. TITOLO GIORNATA & SOTTOTITOLO MATCHDAY
  const titleY = 318;
  ctx.save();
  ctx.font = '900 68px "Inter", "Arial Black", sans-serif';
  const numText = (config.titleNumber || '').trim() + ' ';
  const mainTitle = (config.titleText || 'GIORNATA FITET').trim();

  const numWidth = ctx.measureText(numText).width;
  const mainWidth = ctx.measureText(mainTitle).width;
  const totalTitleW = numWidth + mainWidth;
  const startTitleX = (W - totalTitleW) / 2;

  ctx.textAlign = 'left';
  ctx.shadowColor = 'rgba(0,0,0,0.12)';
  ctx.shadowBlur = 10;
  ctx.fillStyle = palette.titleNumber;
  ctx.fillText(numText, startTitleX, titleY);

  ctx.fillStyle = palette.titleText;
  ctx.fillText(mainTitle, startTitleX + numWidth, titleY);
  ctx.restore();

  // Sottotitolo con linee laterali (— M A T C H D A Y —)
  const subY = 368;
  ctx.save();
  ctx.font = '600 28px "Inter", Arial, sans-serif';
  ctx.fillStyle = palette.subtitle;
  ctx.textAlign = 'center';
  const subStr = config.subtitle || 'M A T C H D A Y';
  ctx.fillText(subStr, W / 2, subY);

  const subW = ctx.measureText(subStr).width;
  ctx.strokeStyle = palette.subtitleLine;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - subW / 2 - 140, subY - 10);
  ctx.lineTo(W / 2 - subW / 2 - 25, subY - 10);
  ctx.moveTo(W / 2 + subW / 2 + 25, subY - 10);
  ctx.lineTo(W / 2 + subW / 2 + 140, subY - 10);
  ctx.stroke();
  ctx.restore();
}
