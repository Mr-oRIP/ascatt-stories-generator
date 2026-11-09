import { DEFAULT_CONFIG, DEFAULT_MATCHES } from '../constants/defaults';
import { STORAGE_KEYS } from '../constants/storage';
import type { Match, StoryConfig } from '../types/story';
import { createMatchId } from './ids';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asString = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value : fallback);

const readJson = (key: string): unknown => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const writeJson = (key: string, value: unknown): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const loadConfig = (): StoryConfig => {
  const saved = readJson(STORAGE_KEYS.config);
  return isRecord(saved) ? { ...DEFAULT_CONFIG, ...saved } : DEFAULT_CONFIG;
};

const normalizeMatch = (saved: Record<string, unknown>): Match => ({
  id: asString(saved.id) || createMatchId(),
  category: asString(saved.category),
  girone: asString(saved.girone),
  isHome: saved.isHome !== false,
  locationText: asString(saved.locationText),
  ourTeam: asString(saved.ourTeam),
  opponent: asString(saved.opponent),
  date: asString(saved.date),
  time: asString(saved.time),
  opponentColor: asString(saved.opponentColor, '#1e40af'),
});

/** Carica le partite salvate, scartando quelle illeggibili. Senza dati validi usa i default */
export const loadMatches = (): Match[] => {
  const saved = readJson(STORAGE_KEYS.matches);
  const matches = Array.isArray(saved) ? saved.filter(isRecord).map(normalizeMatch) : [];
  return matches.length > 0 ? matches : DEFAULT_MATCHES;
};

/** Restituisce false se il browser ha rifiutato il salvataggio */
export const saveConfig = (config: StoryConfig): boolean => writeJson(STORAGE_KEYS.config, config);

/** Restituisce false se il browser ha rifiutato il salvataggio */
export const saveMatches = (matches: Match[]): boolean => writeJson(STORAGE_KEYS.matches, matches);
