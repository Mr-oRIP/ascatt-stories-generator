import { useEffect, useState } from 'react';
import { loadStoryFonts } from '../canvas/fonts';

/** Diventa true quando i font della storia sono pronti, per ridisegnare l'anteprima */
export function useStoryFonts(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    void loadStoryFonts().then(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  return ready;
}
