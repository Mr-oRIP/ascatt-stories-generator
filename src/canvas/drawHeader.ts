import type { StoryConfig } from '../types/story';
import { STORY_WIDTH as W } from './constants';
import { drawAscaCrest, drawFitetLogo } from './drawLogos';
import { drawImageContained, drawRoundedRect } from './helpers';
import type { StoryPalette } from './theme';

const HEADER_CENTER_Y = 145;
const CLUB_LOGO_SIZE = 120;
const TITLE_Y = 318;
const TITLE_FONT_SIZE = 68;
const TITLE_MAX_WIDTH = W - 120;
const SUBTITLE_Y = 368;
const SUBTITLE_MAX_WIDTH = 640;
const CLUB_NAME_MAX_WIDTH = 200;

function drawClubBadge(
  ctx: CanvasRenderingContext2D,
  clubName: string,
  palette: StoryPalette,
  clubLogo: HTMLImageElement | null
): void {
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

  if (clubLogo) {
    drawImageContained(ctx, clubLogo, W / 2 - 102, HEADER_CENTER_Y, CLUB_LOGO_SIZE);
  } else {
    drawAscaCrest(ctx, W / 2 - 102, HEADER_CENTER_Y, CLUB_LOGO_SIZE);
  }

  ctx.save();
  ctx.textAlign = 'left';
  ctx.fillStyle = '#0f172a';
  ctx.font = '900 36px "Inter", "Arial Black", sans-serif';
  ctx.fillText(clubName || 'ASCA TT', W / 2 - 28, 138, CLUB_NAME_MAX_WIDTH);

  ctx.fillStyle = '#dc2626';
  ctx.font = '800 18px "Inter", Arial, sans-serif';
  ctx.fillText('TENNISTAVOLO', W / 2 - 28, 166);

  ctx.fillStyle = '#64748b';
  ctx.font = '700 14px "Inter", Arial, sans-serif';
  ctx.fillText('A.S.D.', W / 2 - 28, 188);
  ctx.restore();
}

/** Titolo su due colori, ridotto se non entra nella larghezza della storia */
function drawTitle(ctx: CanvasRenderingContext2D, config: StoryConfig, palette: StoryPalette): void {
  const titleFont = (size: number) => `900 ${size}px "Inter", "Arial Black", sans-serif`;
  const numberText = (config.titleNumber || '').trim() + ' ';
  const mainText = (config.titleText || 'GIORNATA FITET').trim();

  ctx.save();
  ctx.font = titleFont(TITLE_FONT_SIZE);
  const naturalWidth = ctx.measureText(numberText).width + ctx.measureText(mainText).width;
  if (naturalWidth > TITLE_MAX_WIDTH) {
    ctx.font = titleFont(Math.floor((TITLE_FONT_SIZE * TITLE_MAX_WIDTH) / naturalWidth));
  }

  const numberWidth = ctx.measureText(numberText).width;
  const totalWidth = numberWidth + ctx.measureText(mainText).width;
  const startX = (W - totalWidth) / 2;

  ctx.textAlign = 'left';
  ctx.shadowColor = 'rgba(0,0,0,0.12)';
  ctx.shadowBlur = 10;
  ctx.fillStyle = palette.titleNumber;
  ctx.fillText(numberText, startX, TITLE_Y);
  ctx.fillStyle = palette.titleText;
  ctx.fillText(mainText, startX + numberWidth, TITLE_Y);
  ctx.restore();
}

function drawSubtitle(ctx: CanvasRenderingContext2D, subtitle: string, palette: StoryPalette): void {
  const text = subtitle || 'M A T C H D A Y';

  ctx.save();
  ctx.font = '600 28px "Inter", Arial, sans-serif';
  ctx.fillStyle = palette.subtitle;
  ctx.textAlign = 'center';
  ctx.fillText(text, W / 2, SUBTITLE_Y, SUBTITLE_MAX_WIDTH);

  const halfWidth = Math.min(ctx.measureText(text).width, SUBTITLE_MAX_WIDTH) / 2;
  ctx.strokeStyle = palette.subtitleLine;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - halfWidth - 140, SUBTITLE_Y - 10);
  ctx.lineTo(W / 2 - halfWidth - 25, SUBTITLE_Y - 10);
  ctx.moveTo(W / 2 + halfWidth + 25, SUBTITLE_Y - 10);
  ctx.lineTo(W / 2 + halfWidth + 140, SUBTITLE_Y - 10);
  ctx.stroke();
  ctx.restore();
}

/** Intestazione: logo società, logo FITET, titolo giornata e sottotitolo */
export function drawHeader(
  ctx: CanvasRenderingContext2D,
  config: StoryConfig,
  palette: StoryPalette,
  clubLogo: HTMLImageElement | null
): void {
  drawClubBadge(ctx, config.clubName, palette, clubLogo);
  drawFitetLogo(ctx, W - 155, 125, 207, palette);
  drawTitle(ctx, config, palette);
  drawSubtitle(ctx, config.subtitle, palette);
}
