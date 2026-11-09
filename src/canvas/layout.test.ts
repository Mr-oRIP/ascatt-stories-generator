import { describe, expect, it } from 'vitest';
import { MAX_MATCHES } from '../constants/defaults';
import { CARDS_AREA_BOTTOM, CARDS_AREA_TOP } from './constants';
import { computeCardLayout } from './layout';

describe('computeCardLayout', () => {
  it('limita l’altezza delle card con poche partite', () => {
    expect(computeCardLayout(1).cardH).toBe(225);
  });
  it('tratta zero partite come una', () => {
    expect(computeCardLayout(0)).toEqual(computeCardLayout(1));
  });
  it('fino al massimo consentito non tocca il sottotitolo né il footer', () => {
    for (let count = 1; count <= MAX_MATCHES; count += 1) {
      const { cardH, gap, startY } = computeCardLayout(count);
      expect(startY).toBeGreaterThan(CARDS_AREA_TOP - 20);
      expect(startY + cardH * count + gap * (count - 1)).toBeLessThan(CARDS_AREA_BOTTOM + 20);
    }
  });
});
