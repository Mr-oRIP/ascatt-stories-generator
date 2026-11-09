import type { Match, MatchPreset, StoryConfig } from '../types/story';

// ==========================================
// DATI INIZIALI (Squadre Base ASCA TT)
// ==========================================
export const DEFAULT_CONFIG: StoryConfig = {
  titleNumber: '5°',
  titleText: 'GIORNATA FITET',
  subtitle: 'M A T C H D A Y',
  globalDate: '23 NOVEMBRE',
  globalTime: '15.15',
  clubName: 'ASCA TT',
  website: 'www.ascatt.it',
  theme: 'fitet-light', // 'fitet-light' (Stile Olimpia) | 'asca-dark' (Stile Blu/Verde Fluo ASCA)
  autoSwapAway: false,  // Se attivo, mette l'avversario a sinistra quando in trasferta
  showLogos: true,
  customClubLogo: null,
};

export const DEFAULT_MATCHES: Match[] = [
  {
    id: 'm1',
    category: 'D1',
    girone: 'GIR. C',
    isHome: true,
    locationText: 'IN CASA',
    ourTeam: 'ASCA TT',
    opponent: 'PSG LIMITO',
    date: '23 NOVEMBRE',
    time: '15.15',
    opponentColor: '#6b21a8'
  },
  {
    id: 'm2',
    category: 'D1',
    girone: 'GIR. G',
    isHome: true,
    locationText: 'IN CASA',
    ourTeam: 'ASCA TT',
    opponent: 'CSI MORBEGNO',
    date: '23 NOVEMBRE',
    time: '15.15',
    opponentColor: '#1e40af'
  },
  {
    id: 'm3',
    category: 'D2',
    girone: 'GIR. F',
    isHome: false,
    locationText: 'IN TRASFERTA',
    ourTeam: 'ASCA TT',
    opponent: 'PSG LIMITO',
    date: '23 NOVEMBRE',
    time: '15.30',
    opponentColor: '#b91c1c'
  },
  {
    id: 'm4',
    category: 'D2',
    girone: 'GIR. I',
    isHome: true,
    locationText: 'IN CASA',
    ourTeam: 'ASCA TT',
    opponent: 'CSI MORBEGNO',
    date: '23 NOVEMBRE',
    time: '18.30',
    opponentColor: '#047857'
  },
  {
    id: 'm5',
    category: 'D3',
    girone: 'GIR. MI D',
    isHome: false,
    locationText: 'IN TRASFERTA',
    ourTeam: 'ASCA TT',
    opponent: 'TT BANFI',
    date: '24 NOVEMBRE',
    time: '10.00',
    opponentColor: '#d97706'
  }
];

export const OPPONENT_PALETTE = [
  '#1e40af', '#b91c1c', '#6b21a8', '#047857', '#d97706', '#0f172a', '#0284c7', '#be123c'
];

/** Oltre questo numero le card coprirebbero titolo e footer */
export const MAX_MATCHES = 11;

/** Valori che ogni preset sostituisce in una nuova partita */
export const MATCH_PRESETS: Record<MatchPreset, Partial<Match>> = {
  femminile: {
    category: 'SERIE C FEMM.',
    girone: 'GIR. A',
    ourTeam: 'ASCA TT FEMM.',
    opponent: 'TT VALMADRERA',
    time: '10.00',
    opponentColor: '#be123c',
  },
};
