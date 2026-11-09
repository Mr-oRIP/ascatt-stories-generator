import { getInitials } from '../utils/teams';
import { drawRoundedRect } from './helpers';

/** Stemma della nostra squadra in una card: logo caricato oppure ovale ASCA TT */
export function drawClubCrest(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  clubLogo: HTMLImageElement | null
): void {
  ctx.save();
  if (clubLogo) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(clubLogo, cx - radius, cy - radius, radius * 2, radius * 2);
  } else {
    drawRoundedRect(ctx, cx - radius * 1.65, cy - radius * 0.85, radius * 3.3, radius * 1.7, radius * 0.85);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#16a34a';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx - radius * 0.8, cy, radius * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = '#16a34a';
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = `900 ${Math.round(radius * 0.48)}px "Inter", Arial, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText('ASCA TT', cx - radius * 0.1, cy + radius * 0.16);
  }
  ctx.restore();
}

/** Stemma dell'avversario con le iniziali, nel colore scelto */
export function drawOpponentCrest(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  teamName: string,
  color: string
): void {
  const crestColor = color || '#1e40af';

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = crestColor;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.72, 0, Math.PI * 2);
  ctx.fillStyle = crestColor;
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = `900 ${Math.round(radius * 0.62)}px "Inter", Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(getInitials(teamName), cx, cy + radius * 0.22);
  ctx.restore();
}
