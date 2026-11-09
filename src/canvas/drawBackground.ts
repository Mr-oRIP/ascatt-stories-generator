import { STORY_HEIGHT as H, STORY_WIDTH as W } from './constants';
import type { StoryPalette } from './theme';

function fillPolygon(ctx: CanvasRenderingContext2D, points: Array<[number, number]>, color: string): void {
  ctx.beginPath();
  points.forEach(([x, y], index) => (index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

/** Sfondo (gradiente e trama diagonale) e nastri decorativi agli angoli */
export function drawBackground(ctx: CanvasRenderingContext2D, palette: StoryPalette): void {
  const { backgroundStops: stops, backgroundDiagonal, pattern } = palette;

  const gradient = ctx.createLinearGradient(0, 0, backgroundDiagonal ? W : 0, H);
  gradient.addColorStop(0, stops[0]);
  gradient.addColorStop(0.5, stops[1]);
  gradient.addColorStop(1, stops[2]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.strokeStyle = pattern.stroke;
  ctx.lineWidth = pattern.lineWidth;
  for (let i = -H; i < W + H; i += pattern.spacing) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i - H * pattern.slant, H);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  fillPolygon(ctx, [[0, 0], [250, 0], [0, 260]], palette.ribbonMain);
  fillPolygon(ctx, [[250, 0], [310, 0], [0, 325], [0, 260]], palette.ribbonAccent);
  fillPolygon(ctx, [[W, H], [W - 250, H], [W, H - 260]], palette.ribbonMain);
  fillPolygon(ctx, [[W - 250, H], [W - 310, H], [W, H - 325], [W, H - 260]], palette.ribbonAccent);
  ctx.restore();
}
