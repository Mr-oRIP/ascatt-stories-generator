import { useEffect, useState } from 'react';
import { loadImage } from '../canvas/helpers';

/** Carica il logo come immagine pronta per il canvas */
export function useClubLogo(src: string | null): HTMLImageElement | null {
  const [loaded, setLoaded] = useState<{ src: string; image: HTMLImageElement | null } | null>(null);

  useEffect(() => {
    if (!src) return;
    let active = true;
    void loadImage(src).then((image) => {
      if (active) setLoaded({ src, image });
    });
    return () => {
      active = false;
    };
  }, [src]);

  return src && loaded?.src === src ? loaded.image : null;
}
