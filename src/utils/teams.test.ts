import { describe, expect, it } from 'vitest';
import { DEFAULT_MATCHES } from '../constants/defaults';
import { getInitials, getLocationForSide, getLocationLabel, getTeamSides, hasMatchTime } from './teams';

const match = DEFAULT_MATCHES[0];

describe('getInitials', () => {
  it('usa le prime due parole', () => expect(getInitials('psg limito nord')).toBe('PL'));
  it('ripiega su TT se il nome è vuoto o di soli spazi', () => {
    expect(getInitials('')).toBe('TT');
    expect(getInitials('   ')).toBe('TT');
    expect(getInitials(undefined)).toBe('TT');
  });
});

describe('getTeamSides', () => {
  it('tiene la nostra squadra a sinistra senza inversione', () => {
    expect(getTeamSides({ ...match, isHome: false }, false).leftTeam).toBe(match.ourTeam);
  });
  it('mette l’avversario a sinistra in trasferta con inversione', () => {
    expect(getTeamSides({ ...match, isHome: false }, true).leftTeam).toBe(match.opponent);
    expect(getTeamSides({ ...match, isHome: true }, true).leftTeam).toBe(match.ourTeam);
  });
});

describe('diciture luogo', () => {
  it('aggiorna solo le diciture standard', () => {
    expect(getLocationForSide('IN CASA', false)).toBe('IN TRASFERTA');
    expect(getLocationForSide('TRASFERTA', true)).toBe('IN CASA');
    expect(getLocationForSide('A BERGAMO', false)).toBe('A BERGAMO');
  });
  it('ripiega sulla dicitura standard se il testo è vuoto', () => {
    expect(getLocationLabel({ ...match, locationText: '', isHome: false })).toBe('IN TRASFERTA');
  });
});

describe('hasMatchTime', () => {
  it('ignora gli spazi', () => {
    expect(hasMatchTime({ ...match, time: '  ' })).toBe(false);
    expect(hasMatchTime({ ...match, time: '15.15' })).toBe(true);
  });
});
