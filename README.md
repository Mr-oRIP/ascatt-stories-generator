# ASCA TT Stories Generator

Web app per creare in pochi secondi la storia Instagram (o WhatsApp) del matchday di una società di tennistavolo. Inserisci giornata, data e incontri, premi un pulsante e scarichi l'immagine pronta da pubblicare.

Realizzata per i social della società ASD ASCA TT.

## Cosa fa

- **Anteprima in tempo reale** della storia in formato 9:16.
- **Export in PNG** a 1080 × 1920 px, con nome file automatico (es. `storia-matchday-ascatt-5.png`).
- **Incontri:** aggiungi, duplica, elimina e riordina le partite; categoria, girone, casa o trasferta, data, ora e colore dell'avversario.
- **Temi grafici:** chiaro (stile FITeT) e scuro (blu e verde fluo della società).
- **Loghi personalizzabili:** carichi il logo della società e quello della federazione.
- **Dati in locale:** configurazione e partite restano nel browser (`localStorage`), niente server e niente account.

## Stack

React, TypeScript, Vite, Tailwind CSS, lucide-react. La grafica viene disegnata su `canvas` e scaricata come PNG.

## Avvio

```bash
npm install
npm run dev       # sviluppo
npm run build     # build di produzione in dist/
npm run preview   # prova della build
```

Servono Node.js e npm.

## Struttura

```
src/
├── App.tsx            interfaccia ed export
├── canvas/            funzioni di disegno (sfondo, intestazione, layout)
├── constants/         valori di default e chiavi di salvataggio
├── types/             tipi
└── utils/             file, id, squadre
```

## Stato del progetto

Funziona e viene usato per i post della società. Il codice principale è ancora concentrato in `App.tsx` ed è da suddividere in componenti; la parte di disegno su canvas è già separata in `src/canvas/`.
