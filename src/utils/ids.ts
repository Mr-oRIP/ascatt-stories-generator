/** Id univoco per una partita (timestamp + suffisso casuale per evitare collisioni) */
export const createMatchId = (): string =>
  'm_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
