import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_CONFIG, DEFAULT_MATCHES } from '../constants/defaults';
import { STORAGE_KEYS } from '../constants/storage';
import { loadConfig, loadMatches, saveConfig, saveMatches } from './persistence';

const store = new Map<string, string>();

beforeEach(() => {
  store.clear();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
  });
});

describe('chiavi di salvataggio', () => {
  it('non cambiano, per non perdere i dati degli utenti', () => {
    expect(STORAGE_KEYS).toEqual({ config: 'asca_story_config_v1', matches: 'asca_story_matches_v1' });
  });
});

describe('loadMatches', () => {
  it('usa i default senza dati, con JSON rotto o con dati non validi', () => {
    expect(loadMatches()).toBe(DEFAULT_MATCHES);
    for (const saved of ['{rotto', '{}', '[]', '[1, null]', '"testo"']) {
      store.set(STORAGE_KEYS.matches, saved);
      expect(loadMatches()).toBe(DEFAULT_MATCHES);
    }
  });
  it('conserva le partite valide e completa i campi mancanti', () => {
    store.set(STORAGE_KEYS.matches, JSON.stringify([{ id: 'a', opponent: 'TT BANFI', isHome: false }]));
    expect(loadMatches()[0]).toMatchObject({ id: 'a', opponent: 'TT BANFI', isHome: false, time: '', date: '' });
  });
});

describe('loadConfig', () => {
  it('unisce i dati salvati ai default', () => {
    store.set(STORAGE_KEYS.config, JSON.stringify({ titleNumber: '9°' }));
    expect(loadConfig()).toEqual({ ...DEFAULT_CONFIG, titleNumber: '9°' });
  });
  it('ignora dati non validi', () => {
    store.set(STORAGE_KEYS.config, '[1,2]');
    expect(loadConfig()).toBe(DEFAULT_CONFIG);
  });
});

describe('salvataggio', () => {
  it('un errore sul config non impedisce di salvare le partite', () => {
    vi.stubGlobal('localStorage', {
      setItem: (key: string, value: string) => {
        if (key === STORAGE_KEYS.config) throw new DOMException('pieno', 'QuotaExceededError');
        store.set(key, value);
      },
    });
    expect(saveConfig(DEFAULT_CONFIG)).toBe(false);
    expect(saveMatches(DEFAULT_MATCHES)).toBe(true);
    expect(store.has(STORAGE_KEYS.matches)).toBe(true);
  });
});
