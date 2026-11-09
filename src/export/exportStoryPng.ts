import { STORY_HEIGHT, STORY_WIDTH } from '../canvas/constants';
import { loadStoryFonts } from '../canvas/fonts';
import { loadImage } from '../canvas/helpers';
import { renderStory } from '../canvas/renderStory';
import type { Match, StoryConfig } from '../types/story';
import { buildStoryFileName, downloadDataUrl } from '../utils/file';
import { getClubLogoSrc } from '../utils/logo';

/** Genera la storia 1080x1920 e avvia il download del PNG */
export async function exportStoryPng(config: StoryConfig, matches: Match[]): Promise<void> {
  const canvas = document.createElement('canvas');
  canvas.width = STORY_WIDTH;
  canvas.height = STORY_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D non disponibile');

  const [clubLogo] = await Promise.all([loadImage(getClubLogoSrc(config.customClubLogo)), loadStoryFonts()]);
  renderStory(ctx, { config, matches, clubLogo });
  downloadDataUrl(canvas.toDataURL('image/png'), buildStoryFileName(config.titleNumber));
}
