import { useEffect, useState } from 'react';
import {
  DEFAULT_CONFIG,
  DEFAULT_MATCHES,
  MATCH_PRESETS,
  MAX_MATCHES,
  OPPONENT_PALETTE,
} from '../constants/defaults';
import { LOCATION_HOME } from '../constants/labels';
import type { Match, MatchPreset, StoryConfig } from '../types/story';
import { createMatchId } from '../utils/ids';
import { loadConfig, loadMatches, saveConfig, saveMatches } from '../utils/persistence';
import { getLocationForSide } from '../utils/teams';

const createMatch = (config: StoryConfig, position: number, preset?: MatchPreset): Match => ({
  id: createMatchId(),
  category: 'D3',
  girone: 'GIR. MI I',
  isHome: true,
  locationText: LOCATION_HOME,
  ourTeam: config.clubName || DEFAULT_CONFIG.clubName,
  opponent: 'NUOVA SQUADRA',
  date: config.globalDate || DEFAULT_CONFIG.globalDate,
  time: config.globalTime || DEFAULT_CONFIG.globalTime,
  opponentColor: OPPONENT_PALETTE[position % OPPONENT_PALETTE.length],
  ...(preset ? MATCH_PRESETS[preset] : {}),
});

/** Stato della storia (impostazioni e partite), con salvataggio automatico nel browser */
export function useStoryState() {
  const [config, setConfig] = useState(loadConfig);
  const [matches, setMatches] = useState(loadMatches);
  const [configSaved, setConfigSaved] = useState(true);
  const [matchesSaved, setMatchesSaved] = useState(true);

  // Il setState riporta solo l'esito della scrittura nel browser: se non cambia, React non ridisegna
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfigSaved(saveConfig(config));
  }, [config]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatchesSaved(saveMatches(matches));
  }, [matches]);

  const updateConfig = <K extends keyof StoryConfig>(field: K, value: StoryConfig[K]) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const updateMatch = <K extends keyof Match>(id: string, field: K, value: Match[K]) => {
    setMatches((prev) =>
      prev.map((match) => {
        if (match.id !== id) return match;
        const updated: Match = { ...match, [field]: value };
        if (field === 'isHome') updated.locationText = getLocationForSide(match.locationText, Boolean(value));
        return updated;
      })
    );
  };

  const addMatch = (preset?: MatchPreset) => {
    setMatches((prev) => (prev.length >= MAX_MATCHES ? prev : [...prev, createMatch(config, prev.length, preset)]));
  };

  const duplicateMatch = (match: Match) => {
    setMatches((prev) => (prev.length >= MAX_MATCHES ? prev : [...prev, { ...match, id: createMatchId() }]));
  };

  const removeMatch = (id: string) => {
    setMatches((prev) => (prev.length <= 1 ? prev : prev.filter((match) => match.id !== id)));
  };

  const moveMatch = (index: number, direction: -1 | 1) => {
    setMatches((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const reordered = [...prev];
      [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
      return reordered;
    });
  };

  const applyGlobalDateToAll = () => {
    setMatches((prev) => prev.map((match) => ({ ...match, date: config.globalDate })));
  };

  const resetDefaults = () => {
    setConfig(DEFAULT_CONFIG);
    setMatches(DEFAULT_MATCHES);
  };

  return {
    config,
    matches,
    canAddMatch: matches.length < MAX_MATCHES,
    isSaved: configSaved && matchesSaved,
    updateConfig,
    updateMatch,
    addMatch,
    duplicateMatch,
    removeMatch,
    moveMatch,
    applyGlobalDateToAll,
    resetDefaults,
  };
}

export type StoryState = ReturnType<typeof useStoryState>;
