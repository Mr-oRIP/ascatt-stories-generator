/** Carica un'immagine (es. logo caricato come data URL). Risolve `null` in caso di errore. */
export const loadImage = (src: string | null | undefined): Promise<HTMLImageElement | null> => {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

/** Traccia (senza riempire) un rettangolo con angoli arrotondati */
export const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void => {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
};

/** Disegna un'immagine centrata in un riquadro di lato `size`, senza deformarla né tagliarla */
export const drawImageContained = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  cx: number,
  cy: number,
  size: number
): void => {
  const { naturalWidth: width, naturalHeight: height } = image;
  const longestSide = Math.max(width, height, 1);
  const drawW = (size * (width || longestSide)) / longestSide;
  const drawH = (size * (height || longestSide)) / longestSide;
  ctx.drawImage(image, cx - drawW / 2, cy - drawH / 2, drawW, drawH);
};
