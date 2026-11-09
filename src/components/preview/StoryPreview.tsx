import { useEffect, useRef } from 'react';
import { STORY_HEIGHT, STORY_WIDTH } from '../../canvas/constants';
import { renderStory } from '../../canvas/renderStory';
import { useClubLogo } from '../../hooks/useClubLogo';
import type { Match, StoryConfig } from '../../types/story';

interface StoryPreviewProps {
  config: StoryConfig;
  matches: Match[];
}

/** Anteprima live: stesso disegno del PNG, ridotto via CSS */
export function StoryPreview({ config, matches }: StoryPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clubLogo = useClubLogo(config.customClubLogo);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Riassegnare la larghezza azzera disegno e stato del contesto
    canvas.width = STORY_WIDTH;
    renderStory(ctx, { config, matches, clubLogo });
  }, [config, matches, clubLogo]);

  return (
    <canvas
      ref={canvasRef}
      width={STORY_WIDTH}
      height={STORY_HEIGHT}
      role="img"
      aria-label={`Anteprima della storia: ${matches.length} partite`}
      className={`block shrink-0 w-[355px] sm:w-[396px] h-auto rounded-2xl shadow-2xl border ${
        config.theme === 'asca-dark' ? 'border-slate-800' : 'border-white'
      }`}
    />
  );
}
