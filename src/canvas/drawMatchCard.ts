import type { Match } from '../types/story';
import { getLocationLabel, getTeamSides, hasMatchTime } from '../utils/teams';
import { CARD_W, CARD_X } from './constants';
import { drawClubCrest, drawOpponentCrest } from './drawCrests';
import { drawRoundedRect } from './helpers';
import type { CardLayout } from './layout';
import type { StoryPalette } from './theme';

export interface MatchCardOptions {
  match: Match;
  index: number;
  layout: CardLayout;
  palette: StoryPalette;
  showLogos: boolean;
  autoSwapAway: boolean;
  clubLogo: HTMLImageElement | null;
}

/** Limita `value` all'intervallo tra `min` e `max` */
const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const linearGradient = (
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  [start, end]: readonly [string, string]
): CanvasGradient => {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  gradient.addColorStop(0, start);
  gradient.addColorStop(1, end);
  return gradient;
};

function drawCardFrame(ctx: CanvasRenderingContext2D, y: number, h: number, palette: StoryPalette): void {
  ctx.save();
  ctx.shadowColor = palette.cardShadow;
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;
  drawRoundedRect(ctx, CARD_X, y, CARD_W, h, 20);
  ctx.fillStyle = palette.cardFill;
  ctx.fill();
  ctx.restore();
}

/** Blocco obliquo a destra con data e orario */
function drawDateBlock(
  ctx: CanvasRenderingContext2D,
  match: Match,
  y: number,
  h: number,
  scale: number,
  isEven: boolean,
  palette: StoryPalette
): { rightBottomX: number } {
  const right = CARD_X + CARD_W;
  const rightTopX = CARD_X + CARD_W * 0.72;
  const rightBottomX = CARD_X + CARD_W * 0.665;

  ctx.beginPath();
  ctx.moveTo(rightTopX, y);
  ctx.lineTo(right, y);
  ctx.lineTo(right, y + h);
  ctx.lineTo(rightBottomX, y + h);
  ctx.closePath();
  ctx.fillStyle = linearGradient(ctx, rightTopX, y, right, y + h, isEven ? palette.dateBlockEven : palette.dateBlockOdd);
  ctx.fill();

  if (palette.slantStrip) {
    ctx.beginPath();
    ctx.moveTo(rightTopX, y);
    ctx.lineTo(rightTopX + 8, y);
    ctx.lineTo(rightBottomX + 8, y + h);
    ctx.lineTo(rightBottomX, y + h);
    ctx.closePath();
    ctx.fillStyle = palette.slantStrip;
    ctx.fill();
  }

  const slantMidX = (rightTopX + rightBottomX) / 2;
  const centerX = slantMidX + (right - slantMidX) / 2 + 8;

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';

  if (hasMatchTime(match)) {
    const dateSize = Math.round(clamp(27 * scale, 20, 30));
    ctx.font = `800 ${dateSize}px "Inter", Arial, sans-serif`;
    ctx.fillText((match.date || '').toUpperCase(), centerX, y + h * 0.27);

    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 95, y + h * 0.36);
    ctx.lineTo(centerX + 95, y + h * 0.36);
    ctx.stroke();

    const labelSize = Math.round(clamp(20 * scale, 15, 22));
    ctx.font = `700 ${labelSize}px "Inter", Arial, sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillText('ORE', centerX, y + h * 0.54);

    const timeSize = Math.round(clamp(56 * scale, 38, 64));
    ctx.font = `900 ${timeSize}px "Inter", "Arial Black", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(match.time.trim(), centerX, y + h * 0.88);
  } else {
    const dateSize = Math.round(clamp(34 * scale, 24, 36));
    ctx.font = `900 ${dateSize}px "Inter", "Arial Black", sans-serif`;
    ctx.fillText((match.date || 'DA DEFINIRE').toUpperCase(), centerX, y + h * 0.56);
  }

  return { rightBottomX };
}

/** Barra superiore: categoria e girone, pin e dicitura casa/trasferta */
function drawInfoBar(
  ctx: CanvasRenderingContext2D,
  match: Match,
  y: number,
  scale: number,
  palette: StoryPalette
): { pillH: number } {
  const pillX = CARD_X + 22;
  const pillY = y + Math.max(10, 14 * scale);
  const pillH = clamp(34 * scale, 26, 38);
  const label = `${match.category || ''} ${match.girone || ''}`.trim().toUpperCase();

  ctx.font = `900 ${Math.round(pillH * 0.62)}px "Inter", Arial, sans-serif`;
  const pillW = Math.max(140, ctx.measureText(label).width + 36);

  drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 10);
  ctx.fillStyle = palette.pillFill;
  ctx.fill();

  ctx.fillStyle = palette.pillText;
  ctx.textAlign = 'center';
  ctx.fillText(label, pillX + pillW / 2, pillY + pillH * 0.73);

  const dividerX = pillX + pillW + 18;
  ctx.strokeStyle = palette.divider;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(dividerX, pillY + 3);
  ctx.lineTo(dividerX, pillY + pillH - 3);
  ctx.stroke();

  const pinX = dividerX + 22;
  const pinY = pillY + pillH / 2;
  ctx.fillStyle = match.isHome ? palette.pinHome : palette.pinAway;
  ctx.beginPath();
  ctx.arc(pinX, pinY - 3, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pinX - 7, pinY + 1);
  ctx.lineTo(pinX + 7, pinY + 1);
  ctx.lineTo(pinX, pinY + 13);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = palette.pinHole;
  ctx.beginPath();
  ctx.arc(pinX, pinY - 3, 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = 'left';
  ctx.fillStyle = palette.location;
  ctx.font = `800 ${Math.round(pillH * 0.62)}px "Inter", Arial, sans-serif`;
  ctx.fillText(getLocationLabel(match).toUpperCase(), pinX + 16, pillY + pillH * 0.73);

  return { pillH };
}

/** Area principale: stemmi, scritta VS e nomi delle due squadre */
function drawTeams(
  ctx: CanvasRenderingContext2D,
  { match, index, layout, palette, showLogos, autoSwapAway, clubLogo }: MatchCardOptions,
  y: number,
  pillH: number,
  rightBottomX: number
): void {
  const { cardH: h, scale } = layout;
  const { team1IsOur, leftTeam, rightTeam } = getTeamSides(match, autoSwapAway);

  const areaW = rightBottomX - CARD_X;
  const leftX = CARD_X + areaW * 0.25;
  const vsX = CARD_X + areaW * 0.51;
  const rightX = CARD_X + areaW * 0.76;
  const bodyY = y + pillH + (h - pillH) * 0.42;
  const crestRadius = clamp(34 * scale, 22, 38);

  if (showLogos) {
    const drawCrest = (x: number, isOurs: boolean, name: string) =>
      isOurs
        ? drawClubCrest(ctx, x, bodyY, crestRadius, clubLogo)
        : drawOpponentCrest(ctx, x, bodyY, crestRadius, name, match.opponentColor);

    drawCrest(leftX, team1IsOur, leftTeam);
    drawCrest(rightX, !team1IsOur, rightTeam);
  }

  ctx.save();
  const vsSize = Math.round(clamp(48 * scale, 32, 54));
  ctx.font = `italic 900 ${vsSize}px "Inter", "Arial Black", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillStyle = linearGradient(ctx, vsX, bodyY - 20, vsX, bodyY + 25, index % 2 === 0 ? palette.vsEven : palette.vsOdd);
  ctx.fillText('VS', vsX, showLogos ? bodyY + vsSize * 0.35 : y + h * 0.62);
  ctx.restore();

  const nameSize = Math.round(clamp(19.5 * scale, 14, 22));
  const nameY = showLogos ? y + h - Math.max(10, 13 * scale) : y + h * 0.64;
  ctx.font = `900 ${nameSize}px "Inter", Arial, sans-serif`;
  ctx.fillStyle = palette.teamName;
  ctx.textAlign = 'center';
  ctx.fillText((leftTeam || '').toUpperCase(), leftX, nameY, areaW * 0.44);
  ctx.fillText((rightTeam || '').toUpperCase(), rightX, nameY, areaW * 0.44);
}

/** Disegna la card di una partita */
export function drawMatchCard(ctx: CanvasRenderingContext2D, options: MatchCardOptions): void {
  const { match, index, layout, palette } = options;
  const { cardH: h, gap, startY, scale } = layout;
  const y = startY + index * (h + gap);

  drawCardFrame(ctx, y, h, palette);

  ctx.save();
  drawRoundedRect(ctx, CARD_X, y, CARD_W, h, 20);
  ctx.clip();

  if (palette.cardBorder) {
    ctx.strokeStyle = palette.cardBorder;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  const { rightBottomX } = drawDateBlock(ctx, match, y, h, scale, index % 2 === 0, palette);
  const { pillH } = drawInfoBar(ctx, match, y, scale, palette);
  drawTeams(ctx, options, y, pillH, rightBottomX);

  ctx.restore();
}
