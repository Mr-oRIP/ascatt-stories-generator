// Confronta i PNG esportati con quelli di riferimento, per verificare i refactor.
//
// Con l'app avviata (npm run dev o npm run preview):
//   node scripts/compare-png.mjs capture <cartella> [url]
//   node scripts/compare-png.mjs compare <cartella> [url]
//
// I riferimenti vanno tenuti fuori dal repository: dipendono da browser e macchina.
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const [mode, dir, url = 'http://localhost:5173/'] = process.argv.slice(2);
if (!['capture', 'compare'].includes(mode) || !dir) {
  console.error('Uso: node scripts/compare-png.mjs capture|compare <cartella> [url]');
  process.exit(2);
}

const CONFIG_KEY = 'asca_story_config_v1';
const MATCHES_KEY = 'asca_story_matches_v1';

const baseConfig = {
  titleNumber: '5°',
  titleText: 'GIORNATA FITET',
  subtitle: 'M A T C H D A Y',
  globalDate: '23 NOVEMBRE',
  globalTime: '15.15',
  clubName: 'ASCA TT',
  website: 'www.ascatt.it',
  theme: 'fitet-light',
  autoSwapAway: false,
  showLogos: true,
  customClubLogo: null,
};

const OPPONENTS = ['PSG LIMITO', 'CSI MORBEGNO', 'TT BANFI', 'TT VALMADRERA'];
const COLORS = ['#6b21a8', '#1e40af', '#b91c1c', '#047857', '#d97706'];

const makeMatches = (count, overrides = {}) =>
  Array.from({ length: count }, (_, i) => ({
    id: `s${i}`,
    category: `D${(i % 3) + 1}`,
    girone: `GIR. ${String.fromCharCode(65 + (i % 8))}`,
    isHome: i % 2 === 0,
    locationText: i % 2 === 0 ? 'IN CASA' : 'IN TRASFERTA',
    ourTeam: 'ASCA TT',
    opponent: OPPONENTS[i % OPPONENTS.length],
    date: '23 NOVEMBRE',
    time: `1${i % 9}.15`,
    opponentColor: COLORS[i % COLORS.length],
    ...overrides,
  }));

const scenarios = [];
for (const theme of ['fitet-light', 'asca-dark']) {
  for (const count of [1, 5, 8, 12]) {
    scenarios.push({ name: `${theme}-${count}`, config: { theme }, matches: makeMatches(count) });
  }
  scenarios.push(
    { name: `${theme}-senza-stemmi`, config: { theme, showLogos: false }, matches: makeMatches(5) },
    { name: `${theme}-inverti-trasferta`, config: { theme, autoSwapAway: true }, matches: makeMatches(5) },
    { name: `${theme}-senza-orario`, config: { theme }, matches: makeMatches(5, { time: '' }) },
    { name: `${theme}-logo-quadrato`, config: { theme }, logo: [256, 256], matches: makeMatches(5) },
    { name: `${theme}-logo-largo`, config: { theme }, logo: [400, 160], matches: makeMatches(5) },
  );
}

const sha = (buffer) => createHash('sha256').update(buffer).digest('hex');

const makeLogo = (page, [width, height]) =>
  page.evaluate(([w, h]) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, Math.min(w, h) / 3, 0, Math.PI * 2);
    ctx.fill();
    return canvas.toDataURL('image/png');
  }, [width, height]);

const browser = await chromium.launch();
const context = await browser.newContext({ acceptDownloads: true, viewport: { width: 1400, height: 1000 } });
const page = await context.newPage();
await mkdir(dir, { recursive: true });

let failures = 0;
for (const scenario of scenarios) {
  await page.goto(url);
  const logo = scenario.logo ? await makeLogo(page, scenario.logo) : null;
  await page.evaluate(
    ([configKey, matchesKey, config, matches]) => {
      localStorage.setItem(configKey, JSON.stringify(config));
      localStorage.setItem(matchesKey, JSON.stringify(matches));
    },
    [CONFIG_KEY, MATCHES_KEY, { ...baseConfig, ...scenario.config, customClubLogo: logo }, scenario.matches],
  );
  await page.reload();

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: /Scarica Storia/ }).click(),
  ]);
  const png = await readFile(await download.path());
  const file = path.join(dir, `${scenario.name}.png`);

  if (mode === 'capture') {
    await writeFile(file, png);
    console.log(`salvato  ${scenario.name}`);
  } else if (sha(png) === sha(await readFile(file))) {
    console.log(`uguale   ${scenario.name}`);
  } else {
    failures += 1;
    await writeFile(path.join(dir, `${scenario.name}.diverso.png`), png);
    console.log(`DIVERSO  ${scenario.name}`);
  }
}

await browser.close();
if (mode === 'compare') console.log(failures ? `\n${failures} scenari diversi` : '\nTutti gli scenari sono identici');
process.exit(failures ? 1 : 0);
