import type { Theme } from '../types/story';

type GradientStops = readonly [string, string];

/** Colori e trama di sfondo della storia per ciascun tema */
export interface StoryPalette {
  backgroundStops: readonly [string, string, string];
  /** True: sfondo in diagonale. False: sfondo verticale */
  backgroundDiagonal: boolean;
  pattern: { stroke: string; lineWidth: number; spacing: number; slant: number };
  ribbonMain: string;
  ribbonAccent: string;
  badgeBorder: string;
  fitetName: string;
  fitetDetail: string;
  titleNumber: string;
  titleText: string;
  subtitle: string;
  subtitleLine: string;
  cardShadow: string;
  cardFill: string;
  /** Bordo sottile della card, solo tema scuro */
  cardBorder: string | null;
  dateBlockEven: GradientStops;
  dateBlockOdd: GradientStops;
  /** Striscia fluo sul bordo obliquo, solo tema scuro */
  slantStrip: string | null;
  pillFill: string;
  pillText: string;
  divider: string;
  pinHome: string;
  pinAway: string;
  pinHole: string;
  location: string;
  vsEven: GradientStops;
  vsOdd: GradientStops;
  teamName: string;
  footer: string;
}

const FITET_LIGHT: StoryPalette = {
  backgroundStops: ['#f8fafc', '#f1f5f9', '#e2e8f0'],
  backgroundDiagonal: true,
  pattern: { stroke: 'rgba(15, 23, 42, 0.03)', lineWidth: 3, spacing: 60, slant: 0.4 },
  ribbonMain: '#0a2e65',
  ribbonAccent: '#e11d48',
  badgeBorder: '#1e3a8a',
  fitetName: '#0f2942',
  fitetDetail: '#334155',
  titleNumber: '#ef233c',
  titleText: '#0a2558',
  subtitle: '#334155',
  subtitleLine: '#64748b',
  cardShadow: 'rgba(15, 23, 42, 0.14)',
  cardFill: '#ffffff',
  cardBorder: null,
  dateBlockEven: ['#0c357a', '#071e48'],
  dateBlockOdd: ['#ef233c', '#b91c1c'],
  slantStrip: null,
  pillFill: '#ef233c',
  pillText: '#ffffff',
  divider: '#94a3b8',
  pinHome: '#ef233c',
  pinAway: '#0284c7',
  pinHole: '#ffffff',
  location: '#0a2558',
  vsEven: ['#ef233c', '#991b1b'],
  vsOdd: ['#2563eb', '#1e3a8a'],
  teamName: '#0a2558',
  footer: '#0a2558',
};

const ASCA_DARK: StoryPalette = {
  backgroundStops: ['#04122c', '#071f46', '#030d22'],
  backgroundDiagonal: false,
  pattern: { stroke: 'rgba(255,255,255,0.025)', lineWidth: 2, spacing: 45, slant: 0.5 },
  ribbonMain: '#0b3b8c',
  ribbonAccent: '#00e676',
  badgeBorder: '#00e676',
  fitetName: '#ffffff',
  fitetDetail: '#94a3b8',
  titleNumber: '#00e676',
  titleText: '#ffffff',
  subtitle: '#94a3b8',
  subtitleLine: 'rgba(255,255,255,0.25)',
  cardShadow: 'rgba(0,0,0,0.45)',
  cardFill: '#0d2752',
  cardBorder: 'rgba(255,255,255,0.12)',
  dateBlockEven: ['#0284c7', '#1e3a8a'],
  dateBlockOdd: ['#6b21a8', '#4c1d95'],
  slantStrip: '#00e676',
  pillFill: '#00e676',
  pillText: '#04122c',
  divider: 'rgba(255,255,255,0.3)',
  pinHome: '#00e676',
  pinAway: '#38bdf8',
  pinHole: '#0d2752',
  location: '#e2e8f0',
  vsEven: ['#00e676', '#38bdf8'],
  vsOdd: ['#00e676', '#38bdf8'],
  teamName: '#ffffff',
  footer: '#00e676',
};

export const getPalette = (theme: Theme): StoryPalette =>
  theme === 'asca-dark' ? ASCA_DARK : FITET_LIGHT;
