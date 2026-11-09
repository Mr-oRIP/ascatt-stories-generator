import { getInitials } from '../utils/teams';
import { drawRoundedRect } from './helpers';
import type { StoryPalette } from './theme';

const SHIELD = new Path2D('M36 34 H84 V62 C84 80 60 92 60 92 C60 92 36 80 36 62 Z');
const SHIELD_LEFT = new Path2D('M36 34 H60 V91 C60 91 36 79 36 62 Z');

const FITET_BLUE_ARC = new Path2D('M35 80 C10 55, 25 18, 85 15 C135 12, 165 35, 170 50 C150 30, 115 24, 78 27 C38 30, 25 56, 48 76 Z');
const FITET_RED_ARC = new Path2D('M55 20 C95 10, 145 20, 165 45 C145 28, 105 22, 65 26 Z');
const FITET_GREEN_ARC = new Path2D('M45 24 C85 16, 130 24, 155 46 C135 32, 95 26, 55 30 Z');
const FITET_TABLE_LINE = new Path2D('M35 78 C55 92, 85 95, 108 90');

const BADGE_OUTER = new Path2D('M18 16 H82 V54 C82 77 50 90 50 90 C50 90 18 77 18 54 Z');
const BADGE_INNER = new Path2D('M24 22 H76 V52 C76 71 50 82 50 82 C50 82 24 71 24 52 Z');

function circle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
}

function fillAndStroke(ctx: CanvasRenderingContext2D, fill: string, stroke: string, lineWidth: number, path?: Path2D): void {
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  if (path) {
    ctx.fill(path);
    ctx.stroke(path);
  } else {
    ctx.fill();
    ctx.stroke();
  }
}

/** Stemma ASCA TT centrato in (cx, cy). `size` è il lato del disegno originale 120x120 */
export function drawAscaCrest(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number): void {
  const scale = size / 120;
  ctx.save();
  ctx.translate(cx - size / 2, cy - size / 2);
  ctx.scale(scale, scale);

  circle(ctx, 60, 60, 56);
  fillAndStroke(ctx, '#16a34a', '#facc15', 5);
  circle(ctx, 60, 60, 46);
  fillAndStroke(ctx, '#ffffff', '#15803d', 2);

  fillAndStroke(ctx, '#facc15', '#1e293b', 2.5, SHIELD);
  ctx.fillStyle = '#16a34a';
  ctx.fill(SHIELD_LEFT);

  circle(ctx, 60, 56, 13);
  fillAndStroke(ctx, '#dc2626', '#ffffff', 2);
  drawRoundedRect(ctx, 57, 67, 6, 12, 2);
  fillAndStroke(ctx, '#92400e', '#ffffff', 1.5);
  circle(ctx, 67, 49, 5);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.restore();
}

/** Logo FITET centrato in (cx, cy). `width` è la larghezza del disegno originale 180x110 */
export function drawFitetLogo(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  palette: StoryPalette
): void {
  const scale = width / 180;
  ctx.save();
  ctx.translate(cx - 90 * scale, cy - 55 * scale);
  ctx.scale(scale, scale);

  ctx.fillStyle = '#0284c7';
  ctx.fill(FITET_BLUE_ARC);
  ctx.fillStyle = '#ef4444';
  ctx.fill(FITET_RED_ARC);
  ctx.fillStyle = '#16a34a';
  ctx.fill(FITET_GREEN_ARC);

  circle(ctx, 115, 88, 13);
  ctx.fillStyle = '#0369a1';
  ctx.fill();
  ctx.strokeStyle = '#0369a1';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.stroke(FITET_TABLE_LINE);

  ctx.textAlign = 'center';
  ctx.letterSpacing = '1px';
  ctx.fillStyle = palette.fitetName;
  ctx.font = 'italic 900 26px "Inter", Arial, sans-serif';
  ctx.fillText('FITET', 92, 56);

  ctx.letterSpacing = '0.6px';
  ctx.fillStyle = palette.fitetDetail;
  ctx.font = '700 6.5px "Inter", Arial, sans-serif';
  ctx.fillText('FEDERAZIONE ITALIANA', 92, 68);
  ctx.fillText('TENNISTAVOLO', 92, 76);

  ctx.restore();
}

/** Scudo dell'avversario con iniziali. `size` è il lato del disegno originale 100x100 */
export function drawOpponentBadge(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  teamName: string,
  color: string
): void {
  const crestColor = color || '#1e40af';
  const scale = size / 100;

  ctx.save();
  // Lo scudo è centrato in (50, 53) nel disegno originale
  ctx.translate(cx - 50 * scale, cy - 53 * scale);
  ctx.scale(scale, scale);

  fillAndStroke(ctx, '#ffffff', crestColor, 6, BADGE_OUTER);
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = crestColor;
  ctx.fill(BADGE_INNER);
  ctx.restore();

  circle(ctx, 50, 40, 15);
  ctx.fillStyle = crestColor;
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 13px "Inter", Arial, sans-serif';
  ctx.fillText(getInitials(teamName), 50, 45);

  ctx.fillStyle = crestColor;
  ctx.font = '800 9px "Inter", Arial, sans-serif';
  ctx.fillText('T.T.', 50, 69);

  ctx.restore();
}
