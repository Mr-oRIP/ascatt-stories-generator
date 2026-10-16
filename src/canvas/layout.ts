import { CARDS_AREA_BOTTOM, CARDS_AREA_TOP } from './constants';

export interface CardLayout {
  cardH: number;
  gap: number;
  startY: number;
  /** Fattore di scala proporzionale rispetto a una card "standard" alta 180px */
  scale: number;
}

/** 5. Calcolo auto-scaling delle card partite, per centrare sempre tutto alla perfezione */
export function computeCardLayout(matchCount: number): CardLayout {
  const count = Math.max(1, matchCount);
  const areaTop = CARDS_AREA_TOP;
  const areaBottom = CARDS_AREA_BOTTOM;
  const availableH = areaBottom - areaTop; // 1410px disponibili

  // Spaziatura e altezza dinamica per centrare sempre tutto alla perfezione
  const gap = count <= 4 ? 28 : count <= 6 ? 20 : 14;
  const maxCardH = 225;
  const rawCardH = (availableH - gap * (count - 1)) / count;
  const cardH = Math.min(maxCardH, Math.max(118, rawCardH));
  const totalCardsH = cardH * count + gap * (count - 1);
  const startY = areaTop + (availableH - totalCardsH) / 2;

  const scale = cardH / 180; // Fattore di scala proporzionale

  return { cardH, gap, startY, scale };
}
