import { LOCATION_AWAY, LOCATION_HOME } from '../constants/labels';
import type { Match } from '../types/story';

/** Iniziali della squadra (max 2 lettere), es. "PSG LIMITO" → "PL" */
export const getInitials = (name: string | undefined): string =>
  (name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase() || 'TT';

/**
 * Decide quale squadra va a sinistra e quale a destra.
 * Con `autoSwapAway` attivo, in trasferta l'avversario va a sinistra.
 */
export const getTeamSides = (match: Match, autoSwapAway: boolean) => {
  const team1IsOur = autoSwapAway ? match.isHome : true;
  return {
    team1IsOur,
    leftTeam: team1IsOur ? match.ourTeam : match.opponent,
    rightTeam: team1IsOur ? match.opponent : match.ourTeam,
  };
};

/** Testo da mostrare accanto al pin (fallback su IN CASA / IN TRASFERTA) */
export const getLocationLabel = (match: Match): string =>
  match.locationText || (match.isHome ? LOCATION_HOME : LOCATION_AWAY);

/** True se la partita ha un orario impostato */
export const hasMatchTime = (match: Match): boolean =>
  Boolean(match.time && match.time.trim().length > 0);

/** Dopo il cambio casa/trasferta aggiorna la dicitura solo se era quella standard */
export const getLocationForSide = (current: string, isHome: boolean): string => {
  if (isHome && (current === LOCATION_AWAY || current === 'TRASFERTA')) return LOCATION_HOME;
  if (!isHome && (current === LOCATION_HOME || current === 'CASA')) return LOCATION_AWAY;
  return current;
};
