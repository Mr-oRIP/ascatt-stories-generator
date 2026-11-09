import type { Match, StoryConfig } from '../types/story';
import { STORY_WIDTH } from './constants';
import { drawBackground } from './drawBackground';
import { drawHeader } from './drawHeader';
import { drawMatchCard } from './drawMatchCard';
import { computeCardLayout } from './layout';
import { getPalette, type StoryPalette } from './theme';

export interface StoryScene {
  config: StoryConfig;
  matches: Match[];
  clubLogo: HTMLImageElement | null;
}

function drawFooter(ctx: CanvasRenderingContext2D, website: string, palette: StoryPalette): void {
  ctx.save();
  ctx.font = 'italic 800 32px "Inter", Arial, sans-serif';
  ctx.fillStyle = palette.footer;
  ctx.textAlign = 'center';
  ctx.fillText(website || 'www.ascatt.it', STORY_WIDTH / 2, 1872);
  ctx.restore();
}

/** Disegna l'intera storia. Unico motore grafico dell'app */
export function renderStory(ctx: CanvasRenderingContext2D, { config, matches, clubLogo }: StoryScene): void {
  const palette = getPalette(config.theme);
  const layout = computeCardLayout(matches.length);

  drawBackground(ctx, palette);
  drawHeader(ctx, config, palette, clubLogo);
  matches.forEach((match, index) => {
    drawMatchCard(ctx, {
      match,
      index,
      layout,
      palette,
      showLogos: config.showLogos,
      autoSwapAway: config.autoSwapAway,
      clubLogo,
    });
  });
  drawFooter(ctx, config.website, palette);
}
