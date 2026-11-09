# ASCA TT Stories Generator

Web app per creare in pochi secondi la storia Instagram (o WhatsApp) del matchday di una società di tennistavolo. Inserisci giornata, data e incontri, premi un pulsante e scarichi l'immagine pronta da pubblicare.

Realizzata per i social della società ASD ASCA TT.

## Cosa fa

- **Anteprima in tempo reale** in formato 9:16, disegnata dallo stesso motore del PNG.
- **Export in PNG** a 1080 × 1920 px, con nome file automatico (es. `storia-matchday-ascatt-5.png`).
- **Incontri:** fino a 11 partite da aggiungere, duplicare, eliminare e riordinare; categoria, girone, casa o trasferta, data, ora e colore dell'avversario.
- **Temi grafici:** chiaro e scuro (blu e verde fluo della società).
- **Logo della società:** quello di ASCA TT è già incluso (`public/logo-asca.png`) e si può sostituire caricandone un altro.
- **Dati in locale:** configurazione e partite restano nel browser (`localStorage`), niente server e niente account.

## Stack

React, TypeScript, Vite, Tailwind CSS, lucide-react. La grafica viene disegnata su `canvas` con il font Inter, incluso nel progetto.

## Avvio

```bash
npm install
npm run dev       # sviluppo
npm run build     # build di produzione in dist/
npm run preview   # prova della build
npm run lint      # controllo del codice
npm test          # test automatici
```

Servono Node.js e npm.

## Struttura

```
src/
├── App.tsx            composizione della pagina
├── canvas/            motore grafico: renderStory disegna tutta la storia
├── export/            generazione e download del PNG
├── hooks/             stato della storia, logo e font
├── components/        editor, anteprima e campi riutilizzabili
├── constants/         valori di default, diciture e chiavi di salvataggio
├── types/             tipi
└── utils/             file, id, squadre, logo, salvataggio
```

## Verificare che il PNG non cambi

Con l'app avviata, `scripts/compare-png.mjs` esporta una serie di scenari e li confronta con PNG di riferimento. Serve Chromium per Playwright (`npx playwright install chromium`).

```bash
node scripts/compare-png.mjs capture <cartella-fuori-dal-repo>   # prima della modifica
node scripts/compare-png.mjs compare <cartella-fuori-dal-repo>   # dopo la modifica
```
