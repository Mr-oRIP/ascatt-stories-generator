import { STORY_HEIGHT as H, STORY_WIDTH as W } from './constants';

/** 1. Sfondo (gradiente + trama diagonale) e 2. nastri decorativi agli angoli */
export function drawBackground(ctx: CanvasRenderingContext2D, isDark: boolean): void {
  // 1. SFONDO
  if (isDark) {
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#04122c');
    bgGrad.addColorStop(0.5, '#071f46');
    bgGrad.addColorStop(1, '#030d22');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Pattern diagonale sportivo leggero
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.025)';
    ctx.lineWidth = 2;
    for (let i = -H; i < W + H; i += 45) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - H * 0.5, H);
      ctx.stroke();
    }
    ctx.restore();
  } else {
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#f8fafc');
    bgGrad.addColorStop(0.5, '#f1f5f9');
    bgGrad.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Trama geometrica chiarissima sullo sfondo (stile Olimpia)
    ctx.save();
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.03)';
    ctx.lineWidth = 3;
    for (let i = -H; i < W + H; i += 60) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - H * 0.4, H);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 2. NASTRI DECORATIVI AGLI ANGOLI (Top-Left & Bottom-Right come nella foto 2)
  ctx.save();
  // Angolo in alto a sinistra
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(250, 0);
  ctx.lineTo(0, 260);
  ctx.closePath();
  ctx.fillStyle = isDark ? '#0b3b8c' : '#0a2e65';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(250, 0);
  ctx.lineTo(310, 0);
  ctx.lineTo(0, 325);
  ctx.lineTo(0, 260);
  ctx.closePath();
  ctx.fillStyle = isDark ? '#00e676' : '#e11d48';
  ctx.fill();

  // Angolo in basso a destra
  ctx.beginPath();
  ctx.moveTo(W, H);
  ctx.lineTo(W - 250, H);
  ctx.lineTo(W, H - 260);
  ctx.closePath();
  ctx.fillStyle = isDark ? '#0b3b8c' : '#0a2e65';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(W - 250, H);
  ctx.lineTo(W - 310, H);
  ctx.lineTo(W, H - 325);
  ctx.lineTo(W, H - 260);
  ctx.closePath();
  ctx.fillStyle = isDark ? '#00e676' : '#e11d48';
  ctx.fill();
  ctx.restore();
}
