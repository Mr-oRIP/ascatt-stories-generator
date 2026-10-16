/** Tema grafico della storia */
export type Theme = 'fitet-light' | 'asca-dark'; // 'fitet-light' (Stile Olimpia) | 'asca-dark' (Stile Blu/Verde Fluo ASCA)

/** Preset disponibili quando si aggiunge una nuova partita */
export type MatchPreset = 'femminile';

/** Impostazioni globali della storia (intestazione, footer, stile) */
export interface StoryConfig {
  titleNumber: string;
  titleText: string;
  subtitle: string;
  globalDate: string;
  globalTime: string;
  clubName: string;
  website: string;
  theme: Theme;
  /** Se attivo, mette l'avversario a sinistra quando in trasferta */
  autoSwapAway: boolean;
  showLogos: boolean;
  /** Logo società caricato dall'utente (data URL) */
  customClubLogo: string | null;
  /** @deprecated Mai utilizzato: mantenuto solo per compatibilità con i dati già salvati */
  customFitetLogo?: string | null;
}

/** Singola partita mostrata nella storia */
export interface Match {
  id: string;
  category: string;
  girone: string;
  isHome: boolean;
  /** Testo che compare accanto al pin (es. "IN CASA", "A BERGAMO") */
  locationText: string;
  ourTeam: string;
  opponent: string;
  date: string;
  /** Orario: se vuoto viene mostrata solo la data */
  time: string;
  opponentColor: string;
}
