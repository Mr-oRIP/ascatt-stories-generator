import { loadImage } from '../canvas/helpers';
import { readFileAsDataURL } from './file';

/** Logo ASCA TT predefinito, sostituibile caricandone un altro */
const DEFAULT_CLUB_LOGO_URL = `${import.meta.env.BASE_URL}logo-asca.png`;

/** Sorgente del logo da disegnare: quello caricato, altrimenti il predefinito */
export const getClubLogoSrc = (customClubLogo: string | null): string => customClubLogo || DEFAULT_CLUB_LOGO_URL;

/** Lato massimo del logo salvato: basta per l'export e limita lo spazio occupato nel browser */
const MAX_LOGO_SIDE = 512;

/** Legge il logo caricato e, se è troppo grande, lo riduce mantenendo le proporzioni */
export async function prepareClubLogo(file: File): Promise<string> {
  const dataUrl = await readFileAsDataURL(file);
  const image = await loadImage(dataUrl);
  if (!image) throw new Error('Immagine non leggibile');

  const { naturalWidth: width, naturalHeight: height } = image;
  const longestSide = Math.max(width, height);
  if (longestSide <= MAX_LOGO_SIDE) return dataUrl;

  const canvas = document.createElement('canvas');
  const ratio = MAX_LOGO_SIDE / longestSide;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  const ctx = canvas.getContext('2d');
  if (!ctx) return dataUrl;

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/png');
}
