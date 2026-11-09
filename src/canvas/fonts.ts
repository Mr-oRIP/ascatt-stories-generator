import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import '@fontsource/inter/800-italic.css';
import '@fontsource/inter/900-italic.css';

const FONT_SPECS = [
  '600 28px Inter',
  '700 20px Inter',
  '800 30px Inter',
  '900 68px Inter',
  'italic 800 32px Inter',
  'italic 900 48px Inter',
];

/** Caratteri campione: il browser scarica solo i sottoinsiemi del font che servono */
const SAMPLE_TEXT = 'AZaz09°ÀÈŽĆ';

let fontsLoaded: Promise<void> | null = null;

/** Attende i font della storia: il canvas non li scarica da solo. Se falliscono usa i font di riserva */
export const loadStoryFonts = (): Promise<void> => {
  fontsLoaded ??= Promise.all(FONT_SPECS.map((spec) => document.fonts.load(spec, SAMPLE_TEXT))).then(
    () => undefined,
    () => undefined
  );
  return fontsLoaded;
};
