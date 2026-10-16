// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Trash2,
  Download,
  MapPin,
  Calendar,
  Clock,
  RotateCcw,
  Sparkles,
  Upload,
  ArrowUp,
  ArrowDown,
  Home,
  Plane,
  Palette,
  Check,
  Copy,
  Shield,
  SlidersHorizontal
} from 'lucide-react';

// ==========================================
// DATI INIZIALI (Squadre Base ASCA TT)
// ==========================================
const DEFAULT_CONFIG = {
  titleNumber: '5°',
  titleText: 'GIORNATA FITET',
  subtitle: 'M A T C H D A Y',
  globalDate: '23 NOVEMBRE',
  globalTime: '15.15',
  clubName: 'ASCA TT',
  website: 'www.ascatt.it',
  theme: 'fitet-light', // 'fitet-light' (Stile Olimpia) | 'asca-dark' (Stile Blu/Verde Fluo ASCA)
  autoSwapAway: false,  // Se attivo, mette l'avversario a sinistra quando in trasferta
  showLogos: true,
  customClubLogo: null,
  customFitetLogo: null
};

const DEFAULT_MATCHES = [
  {
    id: 'm1',
    category: 'D1',
    girone: 'GIR. C',
    isHome: true,
    locationText: 'IN CASA',
    ourTeam: 'ASCA TT',
    opponent: 'PSG LIMITO',
    date: '23 NOVEMBRE',
    time: '15.15',
    opponentColor: '#6b21a8'
  },
  {
    id: 'm2',
    category: 'D1',
    girone: 'GIR. G',
    isHome: true,
    locationText: 'IN CASA',
    ourTeam: 'ASCA TT',
    opponent: 'CSI MORBEGNO',
    date: '23 NOVEMBRE',
    time: '15.15',
    opponentColor: '#1e40af'
  },
  {
    id: 'm3',
    category: 'D2',
    girone: 'GIR. F',
    isHome: false,
    locationText: 'IN TRASFERTA',
    ourTeam: 'ASCA TT',
    opponent: 'PSG LIMITO',
    date: '23 NOVEMBRE',
    time: '15.30',
    opponentColor: '#b91c1c'
  },
  {
    id: 'm4',
    category: 'D2',
    girone: 'GIR. I',
    isHome: true,
    locationText: 'IN CASA',
    ourTeam: 'ASCA TT',
    opponent: 'CSI MORBEGNO',
    date: '23 NOVEMBRE',
    time: '18.30',
    opponentColor: '#047857'
  },
  {
    id: 'm5',
    category: 'D3',
    girone: 'GIR. MI D',
    isHome: false,
    locationText: 'IN TRASFERTA',
    ourTeam: 'ASCA TT',
    opponent: 'TT BANFI',
    date: '24 NOVEMBRE',
    time: '10.00',
    opponentColor: '#d97706'
  }
];

const OPPONENT_PALETTE = [
  '#1e40af', '#b91c1c', '#6b21a8', '#047857', '#d97706', '#0f172a', '#0284c7', '#be123c'
];

// ==========================================
// COMPONENTI SVG LOGHI DI DEFAULT
// ==========================================
const AscaCrestSVG = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Corona esterna */}
    <circle cx="60" cy="60" r="56" fill="#16a34a" stroke="#facc15" strokeWidth="5" />
    <circle cx="60" cy="60" r="46" fill="#ffffff" stroke="#15803d" strokeWidth="2" />
    {/* Scudo interno */}
    <path d="M36 34 H84 V62 C84 80 60 92 60 92 C60 92 36 80 36 62 Z" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" />
    <path d="M36 34 H60 V91 C60 91 36 79 36 62 Z" fill="#16a34a" />
    {/* Racchetta & Pallina stilizzate */}
    <circle cx="60" cy="56" r="13" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
    <rect x="57" y="67" width="6" height="12" rx="2" fill="#92400e" stroke="#ffffff" strokeWidth="1.5" />
    <circle cx="67" cy="49" r="5" fill="#ffffff" />
    {/* Testo ASCA TT */}
    <path id="textArcTop" d="M 22,60 A 38,38 0 1,1 98,60" fill="none" />
    <text fill="#ffffff" fontSize="10.5" fontWeight="900" letterSpacing="1.5" textAnchor="middle">
      <textPath href="#textArcTop" startOffset="50%">U.S. ASCA T.T.</textPath>
    </text>
  </svg>
);

const FitetLogoSVG = ({ className = "w-16 h-12", dark = false }) => (
  <svg viewBox="0 0 180 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Archi dinamici FITET */}
    <path d="M35 80 C10 55, 25 18, 85 15 C135 12, 165 35, 170 50 C150 30, 115 24, 78 27 C38 30, 25 56, 48 76 Z" fill="#0284c7" />
    <path d="M55 20 C95 10, 145 20, 165 45 C145 28, 105 22, 65 26 Z" fill="#ef4444" />
    <path d="M45 24 C85 16, 130 24, 155 46 C135 32, 95 26, 55 30 Z" fill="#16a34a" />
    <circle cx="115" cy="88" r="13" fill="#0369a1" />
    <path d="M35 78 C55 92, 85 95, 108 90" stroke="#0369a1" strokeWidth="6" strokeLinecap="round" />
    <text x="92" y="56" textAnchor="middle" fill={dark ? "#ffffff" : "#0f2942"} fontStyle="italic" fontWeight="900" fontSize="26" fontFamily="Arial, sans-serif" letterSpacing="1">
      FITET
    </text>
    <text x="92" y="68" textAnchor="middle" fill={dark ? "#cbd5e1" : "#334155"} fontWeight="700" fontSize="6.5" fontFamily="Arial, sans-serif" letterSpacing="0.6">
      FEDERAZIONE ITALIANA
    </text>
    <text x="92" y="76" textAnchor="middle" fill={dark ? "#cbd5e1" : "#334155"} fontWeight="700" fontSize="6.5" fontFamily="Arial, sans-serif" letterSpacing="0.6">
      TENNISTAVOLO
    </text>
  </svg>
);

const OpponentBadgeSVG = ({ name, color = '#1e40af', className = "w-10 h-10" }) => {
  const initials = (name || 'TT')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 16 H82 V54 C82 77 50 90 50 90 C50 90 18 77 18 54 Z"
        fill="#ffffff"
        stroke={color}
        strokeWidth="6"
      />
      <path
        d="M24 22 H76 V52 C76 71 50 82 50 82 C50 82 24 71 24 52 Z"
        fill={color}
        fillOpacity="0.12"
      />
      {/* Piccola racchetta stilizzata */}
      <circle cx="50" cy="40" r="15" fill={color} />
      <text
        x="50"
        y="45"
        textAnchor="middle"
        fill="#ffffff"
        fontWeight="900"
        fontSize="13"
        fontFamily="Arial, sans-serif"
      >
        {initials}
      </text>
      <text
        x="50"
        y="69"
        textAnchor="middle"
        fill={color}
        fontWeight="800"
        fontSize="9"
        fontFamily="Arial, sans-serif"
      >
        T.T.
      </text>
    </svg>
  );
};

// ==========================================
// COMPONENTE PRINCIPALE APP
// ==========================================
export default function App() {
  // Caricamento stato salvato o default
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('asca_story_config_v1');
      return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  });

  const [matches, setMatches] = useState(() => {
    try {
      const saved = localStorage.getItem('asca_story_matches_v1');
      return saved ? JSON.parse(saved) : DEFAULT_MATCHES;
    } catch (e) {
      return DEFAULT_MATCHES;
    }
  });

  const [isExporting, setIsExporting] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const clubLogoInputRef = useRef(null);

  // Salvataggio automatico su localStorage
  useEffect(() => {
    try {
      localStorage.setItem('asca_story_config_v1', JSON.stringify(config));
      localStorage.setItem('asca_story_matches_v1', JSON.stringify(matches));
    } catch (e) {
      // Ignora errori quota localStorage
    }
  }, [config, matches]);

  // ==========================================
  // FUNZIONI DI GESTIONE PARTITE
  // ==========================================
  const handleConfigChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleMatchChange = (id, field, value) => {
    setMatches(prev =>
      prev.map(m => {
        if (m.id !== id) return m;
        const updated = { ...m, [field]: value };
        // Se cambia il toggle Casa/Trasferta e il testo luogo era quello standard, aggiornalo automaticamente
        if (field === 'isHome') {
          if (value === true && (m.locationText === 'IN TRASFERTA' || m.locationText === 'TRASFERTA')) {
            updated.locationText = 'IN CASA';
          } else if (value === false && (m.locationText === 'IN CASA' || m.locationText === 'CASA')) {
            updated.locationText = 'IN TRASFERTA';
          }
        }
        return updated;
      })
    );
  };

  const addMatch = (preset = null) => {
    const newId = 'm_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const color = OPPONENT_PALETTE[matches.length % OPPONENT_PALETTE.length];

    if (preset === 'femminile') {
      setMatches(prev => [
        ...prev,
        {
          id: newId,
          category: 'SERIE C FEMM.',
          girone: 'GIR. A',
          isHome: true,
          locationText: 'IN CASA',
          ourTeam: 'ASCA TT FEMM.',
          opponent: 'TT VALMADRERA',
          date: config.globalDate || '24 NOVEMBRE',
          time: '10.00',
          opponentColor: '#be123c'
        }
      ]);
      return;
    }

    setMatches(prev => [
      ...prev,
      {
        id: newId,
        category: 'D3',
        girone: 'GIR. MI I',
        isHome: true,
        locationText: 'IN CASA',
        ourTeam: config.clubName || 'ASCA TT',
        opponent: 'NUOVA SQUADRA',
        date: config.globalDate || '23 NOVEMBRE',
        time: config.globalTime || '15.15',
        opponentColor: color
      }
    ]);
  };

  const duplicateMatch = (match) => {
    const newId = 'm_' + Date.now();
    setMatches(prev => [...prev, { ...match, id: newId }]);
  };

  const removeMatch = (id) => {
    if (matches.length <= 1) return;
    setMatches(prev => prev.filter(m => m.id !== id));
  };

  const moveMatch = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= matches.length) return;
    const copy = [...matches];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setMatches(copy);
  };

  const applyGlobalDateToAll = () => {
    setMatches(prev =>
      prev.map(m => ({
        ...m,
        date: config.globalDate
      }))
    );
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const resetDefaults = () => {
    setConfig(DEFAULT_CONFIG);
    setMatches(DEFAULT_MATCHES);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleConfigChange('customClubLogo', reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ==========================================
  // MOTORE DI ESPORTAZIONE CANVAS 1080x1920
  // ==========================================
  const loadImageHelper = (src) => {
    return new Promise((resolve) => {
      if (!src) return resolve(null);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  };

  const drawRoundedRect = (ctx, x, y, w, h, r) => {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  };

  const exportStoryPNG = async () => {
    setIsExporting(true);
    try {
      const W = 1080;
      const H = 1920;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      const isDark = config.theme === 'asca-dark';

      // 1. SFONDO
      if (isDark) {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
        bgGrad.addColorStop(0, '#04122c');
        bgGrad.addColorStop(0.5, '#071f46');
        bgGrad.addColorStop(1, '#030d22');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Pattern diagonale sportivo leggero
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.025)';
        ctx.lineWidth = 2;
        for (let i = -H; i < W + H; i += 45) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i - H * 0.5, H);
          ctx.stroke();
        }
        ctx.restore();
      } else {
        const bgGrad = ctx.createLinearGradient(0, 0, W, H);
        bgGrad.addColorStop(0, '#f8fafc');
        bgGrad.addColorStop(0.5, '#f1f5f9');
        bgGrad.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Trama geometrica chiarissima sullo sfondo (stile Olimpia)
        ctx.save();
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.03)';
        ctx.lineWidth = 3;
        for (let i = -H; i < W + H; i += 60) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i - H * 0.4, H);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. NASTRI DECORATIVI AGLI ANGOLI (Top-Left & Bottom-Right come nella foto 2)
      ctx.save();
      // Angolo in alto a sinistra
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(250, 0);
      ctx.lineTo(0, 260);
      ctx.closePath();
      ctx.fillStyle = isDark ? '#0b3b8c' : '#0a2e65';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(250, 0);
      ctx.lineTo(310, 0);
      ctx.lineTo(0, 325);
      ctx.lineTo(0, 260);
      ctx.closePath();
      ctx.fillStyle = isDark ? '#00e676' : '#e11d48';
      ctx.fill();

      // Angolo in basso a destra
      ctx.beginPath();
      ctx.moveTo(W, H);
      ctx.lineTo(W - 250, H);
      ctx.lineTo(W, H - 260);
      ctx.closePath();
      ctx.fillStyle = isDark ? '#0b3b8c' : '#0a2e65';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(W - 250, H);
      ctx.lineTo(W - 310, H);
      ctx.lineTo(W, H - 325);
      ctx.lineTo(W, H - 260);
      ctx.closePath();
      ctx.fillStyle = isDark ? '#00e676' : '#e11d48';
      ctx.fill();
      ctx.restore();

      // 3. HEADER: LOGO CENTRALE + FITET IN ALTO A DESTRA
      const customLogoImg = await loadImageHelper(config.customClubLogo);

      // Disegna ovale/stemma centrale in alto
      const headerCenterY = 145;
      if (customLogoImg) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(W / 2, headerCenterY, 92, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.18)';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.clip();
        ctx.drawImage(customLogoImg, W / 2 - 86, headerCenterY - 86, 172, 172);
        ctx.restore();
      } else {
        // Stemma Ufficiale ASCA TT / Olimpia style oval badge
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.15)';
        ctx.shadowBlur = 18;
        ctx.shadowOffsetY = 6;
        drawRoundedRect(ctx, W / 2 - 190, 58, 380, 174, 87);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.strokeStyle = isDark ? '#00e676' : '#1e3a8a';
        ctx.stroke();
        ctx.restore();

        // Cerchio stemma interno a sinistra nell'ovale
        ctx.save();
        ctx.beginPath();
        ctx.arc(W / 2 - 102, 145, 58, 0, Math.PI * 2);
        ctx.fillStyle = '#16a34a';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#facc15';
        ctx.stroke();

        // Racchetta nel logo
        ctx.beginPath();
        ctx.arc(W / 2 - 102, 140, 26, 0, Math.PI * 2);
        ctx.fillStyle = '#dc2626';
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(W / 2 - 90, 132, 9, 0, Math.PI * 2);
        ctx.fill();

        // Testo Nome Società nel badge superiore
        ctx.fillStyle = '#0f172a';
        ctx.font = '900 36px "Inter", "Arial Black", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(config.clubName || 'ASCA TT', W / 2 - 28, 138);

        ctx.fillStyle = '#dc2626';
        ctx.font = '800 18px "Inter", Arial, sans-serif';
        ctx.fillText('TENNISTAVOLO', W / 2 - 28, 166);

        ctx.fillStyle = '#64748b';
        ctx.font = '700 14px "Inter", Arial, sans-serif';
        ctx.fillText('A.S.D.', W / 2 - 28, 188);
        ctx.restore();
      }

      // Logo FITET in alto a destra
      ctx.save();
      const fx = W - 155;
      const fy = 125;
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(fx, fy, 55, Math.PI * 0.75, Math.PI * 1.85);
      ctx.stroke();

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(fx + 4, fy - 4, 48, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();

      ctx.fillStyle = isDark ? '#ffffff' : '#0f2942';
      ctx.font = 'italic 900 32px "Arial Black", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('FITET', fx + 6, fy + 6);

      ctx.fillStyle = isDark ? '#94a3b8' : '#334155';
      ctx.font = '700 9px Arial, sans-serif';
      ctx.fillText('FEDERAZIONE ITALIANA', fx + 6, fy + 20);
      ctx.fillText('TENNISTAVOLO', fx + 6, fy + 30);
      ctx.restore();

      // 4. TITOLO GIORNATA & SOTTOTITOLO MATCHDAY
      const titleY = 318;
      ctx.save();
      ctx.font = '900 68px "Inter", "Arial Black", sans-serif';
      const numText = (config.titleNumber || '').trim() + ' ';
      const mainTitle = (config.titleText || 'GIORNATA FITET').trim();

      const numWidth = ctx.measureText(numText).width;
      const mainWidth = ctx.measureText(mainTitle).width;
      const totalTitleW = numWidth + mainWidth;
      const startTitleX = (W - totalTitleW) / 2;

      ctx.textAlign = 'left';
      ctx.shadowColor = 'rgba(0,0,0,0.12)';
      ctx.shadowBlur = 10;
      ctx.fillStyle = isDark ? '#00e676' : '#ef233c';
      ctx.fillText(numText, startTitleX, titleY);

      ctx.fillStyle = isDark ? '#ffffff' : '#0a2558';
      ctx.fillText(mainTitle, startTitleX + numWidth, titleY);
      ctx.restore();

      // Sottotitolo con linee laterali (— M A T C H D A Y —)
      const subY = 368;
      ctx.save();
      ctx.font = '600 28px "Inter", Arial, sans-serif';
      ctx.fillStyle = isDark ? '#94a3b8' : '#334155';
      ctx.textAlign = 'center';
      const subStr = config.subtitle || 'M A T C H D A Y';
      ctx.fillText(subStr, W / 2, subY);

      const subW = ctx.measureText(subStr).width;
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.25)' : '#64748b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(W / 2 - subW / 2 - 140, subY - 10);
      ctx.lineTo(W / 2 - subW / 2 - 25, subY - 10);
      ctx.moveTo(W / 2 + subW / 2 + 25, subY - 10);
      ctx.lineTo(W / 2 + subW / 2 + 140, subY - 10);
      ctx.stroke();
      ctx.restore();

      // 5. CALCOLO AUTO-SCALING DELLE CARD PARTITE
      const count = Math.max(1, matches.length);
      const areaTop = 405;
      const areaBottom = 1815;
      const availableH = areaBottom - areaTop; // 1410px disponibili

      // Spaziatura e altezza dinamica per centrare sempre tutto alla perfezione
      const gap = count <= 4 ? 28 : count <= 6 ? 20 : 14;
      const maxCardH = 225;
      const rawCardH = (availableH - gap * (count - 1)) / count;
      const cardH = Math.min(maxCardH, Math.max(118, rawCardH));
      const totalCardsH = cardH * count + gap * (count - 1);
      const startY = areaTop + (availableH - totalCardsH) / 2;

      const cardX = 48;
      const cardW = W - 96; // 984px
      const scale = cardH / 180; // Fattore di scala proporzionale

      for (let i = 0; i < matches.length; i++) {
        const m = matches[i];
        const y = startY + i * (cardH + gap);
        const isEven = i % 2 === 0;

        // Ombra esterna della card
        ctx.save();
        ctx.shadowColor = isDark ? 'rgba(0,0,0,0.45)' : 'rgba(15, 23, 42, 0.14)';
        ctx.shadowBlur = 18;
        ctx.shadowOffsetY = 6;
        drawRoundedRect(ctx, cardX, y, cardW, cardH, 20);
        ctx.fillStyle = isDark ? '#0d2752' : '#ffffff';
        ctx.fill();
        ctx.restore();

        // Clip dentro la card arrotondata
        ctx.save();
        drawRoundedRect(ctx, cardX, y, cardW, cardH, 20);
        ctx.clip();

        // Bordo sottile se dark
        if (isDark) {
          ctx.strokeStyle = 'rgba(255,255,255,0.12)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // BLOCCO DESTRO OBLIQUO (Data & Ora)
        const rightTopX = cardX + cardW * 0.72;
        const rightBottomX = cardX + cardW * 0.665;

        ctx.beginPath();
        ctx.moveTo(rightTopX, y);
        ctx.lineTo(cardX + cardW, y);
        ctx.lineTo(cardX + cardW, y + cardH);
        ctx.lineTo(rightBottomX, y + cardH);
        ctx.closePath();

        const blockGrad = ctx.createLinearGradient(rightTopX, y, cardX + cardW, y + cardH);
        if (isDark) {
          if (isEven) {
            blockGrad.addColorStop(0, '#0284c7');
            blockGrad.addColorStop(1, '#1e3a8a');
          } else {
            blockGrad.addColorStop(0, '#6b21a8');
            blockGrad.addColorStop(1, '#4c1d95');
          }
        } else {
          if (isEven) {
            blockGrad.addColorStop(0, '#0c357a');
            blockGrad.addColorStop(1, '#071e48');
          } else {
            blockGrad.addColorStop(0, '#ef233c');
            blockGrad.addColorStop(1, '#b91c1c');
          }
        }
        ctx.fillStyle = blockGrad;
        ctx.fill();

        // Striscia fluo sul bordo obliquo se in modalità ASCA TT Dark
        if (isDark) {
          ctx.beginPath();
          ctx.moveTo(rightTopX, y);
          ctx.lineTo(rightTopX + 8, y);
          ctx.lineTo(rightBottomX + 8, y + cardH);
          ctx.lineTo(rightBottomX, y + cardH);
          ctx.closePath();
          ctx.fillStyle = '#00e676';
          ctx.fill();
        }

        // Testi Data e Ora nel blocco destro
        const rightCenterX = (rightTopX + rightBottomX) / 2 + (cardX + cardW - (rightTopX + rightBottomX) / 2) / 2 + 8;
        const hasTime = m.time && m.time.trim().length > 0;

        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';

        if (hasTime) {
          // Data in alto
          const dateFontSize = Math.round(Math.min(30, Math.max(20, 27 * scale)));
          ctx.font = `800 ${dateFontSize}px "Inter", Arial, sans-serif`;
          ctx.fillText((m.date || '').toUpperCase(), rightCenterX, y + cardH * 0.27);

          // Linea divisoria sottile
          ctx.strokeStyle = 'rgba(255,255,255,0.45)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(rightCenterX - 95, y + cardH * 0.36);
          ctx.lineTo(rightCenterX + 95, y + cardH * 0.36);
          ctx.stroke();

          // Label "ORE"
          const oreFontSize = Math.round(Math.min(22, Math.max(15, 20 * scale)));
          ctx.font = `700 ${oreFontSize}px "Inter", Arial, sans-serif`;
          ctx.fillStyle = 'rgba(255,255,255,0.9)';
          ctx.fillText('ORE', rightCenterX, y + cardH * 0.54);

          // Orario Grande
          const timeFontSize = Math.round(Math.min(64, Math.max(38, 56 * scale)));
          ctx.font = `900 ${timeFontSize}px "Inter", "Arial Black", sans-serif`;
          ctx.fillStyle = '#ffffff';
          ctx.fillText(m.time.trim(), rightCenterX, y + cardH * 0.88);
        } else {
          // Solo Data centrata grande
          const dateFontSize = Math.round(Math.min(36, Math.max(24, 34 * scale)));
          ctx.font = `900 ${dateFontSize}px "Inter", "Arial Black", sans-serif`;
          ctx.fillText((m.date || 'DA DEFINIRE').toUpperCase(), rightCenterX, y + cardH * 0.56);
        }

        // BARRA SUPERIORE SINISTRA: PILL CATEGORIA/GIRONE + PIN CASA/TRASFERTA
        const pillX = cardX + 22;
        const pillY = y + Math.max(10, 14 * scale);
        const pillH = Math.min(38, Math.max(26, 34 * scale));
        const catGirText = `${m.category || ''} ${m.girone || ''}`.trim().toUpperCase();

        ctx.font = `900 ${Math.round(pillH * 0.62)}px "Inter", Arial, sans-serif`;
        const catTextW = ctx.measureText(catGirText).width;
        const pillW = Math.max(140, catTextW + 36);

        drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 10);
        ctx.fillStyle = isDark ? '#00e676' : '#ef233c';
        ctx.fill();

        ctx.fillStyle = isDark ? '#04122c' : '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(catGirText, pillX + pillW / 2, pillY + pillH * 0.73);

        // Divisore verticale
        const divX = pillX + pillW + 18;
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.3)' : '#94a3b8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(divX, pillY + 3);
        ctx.lineTo(divX, pillY + pillH - 3);
        ctx.stroke();

        // Icona Pin & Testo Casa/Trasferta
        const pinCenterX = divX + 22;
        const pinCenterY = pillY + pillH / 2;
        ctx.fillStyle = m.isHome ? (isDark ? '#00e676' : '#ef233c') : (isDark ? '#38bdf8' : '#0284c7');
        ctx.beginPath();
        ctx.arc(pinCenterX, pinCenterY - 3, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(pinCenterX - 7, pinCenterY + 1);
        ctx.lineTo(pinCenterX + 7, pinCenterY + 1);
        ctx.lineTo(pinCenterX, pinCenterY + 13);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = isDark ? '#0d2752' : '#ffffff';
        ctx.beginPath();
        ctx.arc(pinCenterX, pinCenterY - 3, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.textAlign = 'left';
        ctx.fillStyle = isDark ? '#e2e8f0' : '#0a2558';
        ctx.font = `800 ${Math.round(pillH * 0.62)}px "Inter", Arial, sans-serif`;
        const locLabel = (m.locationText || (m.isHome ? 'IN CASA' : 'IN TRASFERTA')).toUpperCase();
        ctx.fillText(locLabel, pinCenterX + 16, pillY + pillH * 0.73);

        // SQUADRE & STEMMI (Area principale sinistra)
        const leftAreaW = rightBottomX - cardX;
        const team1IsOur = config.autoSwapAway ? m.isHome : true;
        const leftTeamName = team1IsOur ? m.ourTeam : m.opponent;
        const rightTeamName = team1IsOur ? m.opponent : m.ourTeam;

        const leftColX = cardX + leftAreaW * 0.25;
        const vsCenterX = cardX + leftAreaW * 0.51;
        const rightColX = cardX + leftAreaW * 0.76;

        const bodyCenterY = y + pillH + (cardH - pillH) * 0.42;
        const logoRadius = Math.min(38, Math.max(22, 34 * scale));

        // Funzione interna per disegnare lo stemma nel Canvas
        const drawTeamCrest = (cx, cy, isOur, teamName, color) => {
          if (isOur) {
            if (customLogoImg) {
              ctx.save();
              ctx.beginPath();
              ctx.arc(cx, cy, logoRadius, 0, Math.PI * 2);
              ctx.clip();
              ctx.drawImage(customLogoImg, cx - logoRadius, cy - logoRadius, logoRadius * 2, logoRadius * 2);
              ctx.restore();
            } else {
              // Ovale/Stemma ASCA TT
              ctx.save();
              drawRoundedRect(ctx, cx - logoRadius * 1.65, cy - logoRadius * 0.85, logoRadius * 3.3, logoRadius * 1.7, logoRadius * 0.85);
              ctx.fillStyle = '#ffffff';
              ctx.fill();
              ctx.lineWidth = 3;
              ctx.strokeStyle = '#16a34a';
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(cx - logoRadius * 0.8, cy, logoRadius * 0.55, 0, Math.PI * 2);
              ctx.fillStyle = '#16a34a';
              ctx.fill();
              ctx.strokeStyle = '#facc15';
              ctx.lineWidth = 2;
              ctx.stroke();

              ctx.fillStyle = '#0f172a';
              ctx.font = `900 ${Math.round(logoRadius * 0.48)}px "Inter", Arial, sans-serif`;
              ctx.textAlign = 'left';
              ctx.fillText('ASCA TT', cx - logoRadius * 0.1, cy + logoRadius * 0.16);
              ctx.restore();
            }
          } else {
            // Stemma Avversario
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, logoRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = color || '#1e40af';
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(cx, cy, logoRadius * 0.72, 0, Math.PI * 2);
            ctx.fillStyle = color || '#1e40af';
            ctx.fill();

            const initials = (teamName || 'TT')
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map(w => w[0])
              .join('')
              .toUpperCase();

            ctx.fillStyle = '#ffffff';
            ctx.font = `900 ${Math.round(logoRadius * 0.62)}px "Inter", Arial, sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText(initials, cx, cy + logoRadius * 0.22);
            ctx.restore();
          }
        };

        if (config.showLogos) {
          drawTeamCrest(leftColX, bodyCenterY, team1IsOur, leftTeamName, m.opponentColor);
          drawTeamCrest(rightColX, bodyCenterY, !team1IsOur, rightTeamName, m.opponentColor);
        }

        // Scritta "VS" al centro
        ctx.save();
        const vsFontSize = Math.round(Math.min(54, Math.max(32, 48 * scale)));
        ctx.font = `italic 900 ${vsFontSize}px "Inter", "Arial Black", sans-serif`;
        ctx.textAlign = 'center';
        const vsGrad = ctx.createLinearGradient(vsCenterX, bodyCenterY - 20, vsCenterX, bodyCenterY + 25);
        if (isDark) {
          vsGrad.addColorStop(0, '#00e676');
          vsGrad.addColorStop(1, '#38bdf8');
        } else if (isEven) {
          vsGrad.addColorStop(0, '#ef233c');
          vsGrad.addColorStop(1, '#991b1b');
        } else {
          vsGrad.addColorStop(0, '#2563eb');
          vsGrad.addColorStop(1, '#1e3a8a');
        }
        ctx.fillStyle = vsGrad;
        ctx.fillText('VS', vsCenterX, config.showLogos ? bodyCenterY + vsFontSize * 0.35 : y + cardH * 0.62);
        ctx.restore();

        // Nomi delle due squadre in basso nella card
        const nameY = y + cardH - Math.max(10, 13 * scale);
        const nameFontSize = Math.round(Math.min(22, Math.max(14, 19.5 * scale)));
        ctx.font = `900 ${nameFontSize}px "Inter", Arial, sans-serif`;
        ctx.fillStyle = isDark ? '#ffffff' : '#0a2558';
        ctx.textAlign = 'center';

        const displayLeft = (leftTeamName || '').toUpperCase();
        const displayRight = (rightTeamName || '').toUpperCase();

        ctx.fillText(
          displayLeft,
          leftColX,
          config.showLogos ? nameY : y + cardH * 0.64,
          leftAreaW * 0.44
        );
        ctx.fillText(
          displayRight,
          rightColX,
          config.showLogos ? nameY : y + cardH * 0.64,
          leftAreaW * 0.44
        );

        ctx.restore();
      }

      // 6. FOOTER WEBSITE
      ctx.save();
      ctx.font = 'italic 800 32px "Inter", Arial, sans-serif';
      ctx.fillStyle = isDark ? '#00e676' : '#0a2558';
      ctx.textAlign = 'center';
      ctx.fillText(config.website || 'www.ascatt.it', W / 2, 1872);
      ctx.restore();

      // Trigger Download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const cleanDay = (config.titleNumber || 'matchday').replace(/[^a-zA-Z0-9]/g, '');
      link.download = `storia-matchday-ascatt-${cleanDay || 'fitet'}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Errore durante la generazione PNG:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // ==========================================
  // CALCOLO PARAMETRI RESPONSIVE ANTEPRIMA LIVE
  // ==========================================
  const matchCount = Math.max(1, matches.length);
  const isDarkTheme = config.theme === 'asca-dark';

  // Calcolo dinamico compattezza per far stare da 1 a 8+ squadre senza mai sbordare
  const getCardMetrics = () => {
    if (matchCount <= 3) {
      return { gap: '12px', padY: '10px', logoSize: 'w-11 h-11', titleText: 'text-[11px]', timeText: 'text-2xl', dateText: 'text-[10.5px]', vsText: 'text-2xl' };
    }
    if (matchCount === 4) {
      return { gap: '9px', padY: '8px', logoSize: 'w-10 h-10', titleText: 'text-[10px]', timeText: 'text-xl', dateText: 'text-[10px]', vsText: 'text-xl' };
    }
    if (matchCount === 5) {
      return { gap: '7px', padY: '6px', logoSize: 'w-9 h-9', titleText: 'text-[9.5px]', timeText: 'text-lg', dateText: 'text-[9.5px]', vsText: 'text-lg' };
    }
    if (matchCount === 6) {
      return { gap: '6px', padY: '4px', logoSize: 'w-8 h-8', titleText: 'text-[8.5px]', timeText: 'text-base', dateText: 'text-[8.5px]', vsText: 'text-base' };
    }
    return { gap: '4px', padY: '3px', logoSize: 'w-6 h-6', titleText: 'text-[8px]', timeText: 'text-sm', dateText: 'text-[8px]', vsText: 'text-sm' };
  };

  const metrics = getCardMetrics();

  return (
    <div className="min-h-screen bg-[#e5e7eb] text-slate-800 flex flex-col lg:flex-row font-sans">
      {/* ==========================================
          COLONNA SINISTRA: MODIFICA DATI (Come nella Foto 1)
         ========================================== */}
      <aside className="w-full lg:w-[470px] xl:w-[510px] bg-white border-r border-slate-200 lg:h-screen lg:overflow-y-auto shadow-sm flex-shrink-0">
        <div className="p-5 sm:p-6 space-y-6">
          {/* Header Pannello */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Modifica Dati Storia
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Generatore automatico locandina 9:16 • ASCA TT
              </p>
            </div>
            <button
              onClick={resetDefaults}
              title="Ripristina squadre di base"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Base
            </button>
          </div>

          {/* Sezione Stile & Personalizzazione */}
          <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-blue-600" />
                Stile Grafica Storia
              </span>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={config.showLogos}
                    onChange={(e) => handleConfigChange('showLogos', e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Mostra Stemmi
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleConfigChange('theme', 'fitet-light')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold border transition ${
                  config.theme === 'fitet-light'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-blue-900 to-red-500 border border-white" />
                Stile Olimpia (Chiaro)
              </button>

              <button
                type="button"
                onClick={() => handleConfigChange('theme', 'asca-dark')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold border transition ${
                  config.theme === 'asca-dark'
                    ? 'bg-[#071f46] text-[#00e676] border-[#071f46] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#00e676] border border-slate-800" />
                Stile ASCA TT (Blu/Fluo)
              </button>
            </div>

            {/* Opzioni Logo & Swap Trasferta */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/70">
              <div className="flex items-center gap-2">
                <input
                  ref={clubLogoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => clubLogoInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-lg transition"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  {config.customClubLogo ? 'Cambia Logo Società' : 'Carica Logo PNG'}
                </button>
                {config.customClubLogo && (
                  <button
                    type="button"
                    onClick={() => handleConfigChange('customClubLogo', null)}
                    className="text-xs text-red-600 hover:underline font-medium"
                  >
                    Rimuovi
                  </button>
                )}
              </div>

              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={config.autoSwapAway}
                  onChange={(e) => handleConfigChange('autoSwapAway', e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                Inverti lati se in trasferta
              </label>
            </div>
          </div>

          {/* Sezione TITOLO & DATA GLOBALE */}
          <div className="space-y-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
              TITOLO & INTESTAZIONE STORIA
            </label>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase">N° Giornata</span>
                <input
                  type="text"
                  value={config.titleNumber}
                  onChange={(e) => handleConfigChange('titleNumber', e.target.value)}
                  placeholder="Es. 5°"
                  className="w-full mt-0.5 px-3 py-2 text-sm font-bold bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Titolo Principale</span>
                <input
                  type="text"
                  value={config.titleText}
                  onChange={(e) => handleConfigChange('titleText', e.target.value)}
                  placeholder="GIORNATA FITET"
                  className="w-full mt-0.5 px-3 py-2 text-sm font-bold bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Sottotitolo</span>
                <input
                  type="text"
                  value={config.subtitle}
                  onChange={(e) => handleConfigChange('subtitle', e.target.value)}
                  placeholder="M A T C H D A Y"
                  className="w-full mt-0.5 px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Sito Web Footer</span>
                <input
                  type="text"
                  value={config.website}
                  onChange={(e) => handleConfigChange('website', e.target.value)}
                  placeholder="www.ascatt.it"
                  className="w-full mt-0.5 px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Impostazione Data Rapida per tutte le partite */}
            <div className="pt-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">
                Data Predefinita Weekend (Comoda per impostare tutte insieme)
              </span>
              <div className="flex gap-2 mt-0.5">
                <input
                  type="text"
                  value={config.globalDate}
                  onChange={(e) => handleConfigChange('globalDate', e.target.value)}
                  placeholder="Es. 23 NOVEMBRE"
                  className="flex-1 px-3 py-2 text-xs font-bold bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                />
                <button
                  type="button"
                  onClick={applyGlobalDateToAll}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition whitespace-nowrap"
                >
                  {savedToast ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Applicata!
                    </>
                  ) : (
                    <>
                      <Calendar className="w-3.5 h-3.5" />
                      Applica a tutte
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Sezione LISTA SQUADRE / PARTITE */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  SQUADRE IN CAMPO ({matches.length})
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => addMatch('femminile')}
                  className="inline-flex items-center gap-1 text-xs font-bold bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 px-2.5 py-1.5 rounded-lg transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Femminile
                </button>
                <button
                  type="button"
                  onClick={() => addMatch()}
                  className="inline-flex items-center gap-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Aggiungi Partita
                </button>
              </div>
            </div>

            {/* Box singole partite (Stile identico alla tua Foto 1) */}
            <div className="space-y-3.5">
              {matches.map((match, idx) => (
                <div
                  key={match.id}
                  className="bg-[#f8fafc] border border-slate-200/90 rounded-xl p-3.5 space-y-2.5 shadow-sm hover:border-slate-300 transition"
                >
                  {/* Riga 1: Titolo Box + Pulsanti Ordine / Duplica / Elimina */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                      PARTITA {idx + 1}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveMatch(idx, -1)}
                        disabled={idx === 0}
                        title="Sposta su"
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveMatch(idx, 1)}
                        disabled={idx === matches.length - 1}
                        title="Sposta giù"
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => duplicateMatch(match)}
                        title="Duplica partita"
                        className="p-1 text-slate-400 hover:text-blue-600 rounded"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeMatch(match.id)}
                        disabled={matches.length <= 1}
                        title="Rimuovi partita"
                        className="p-1 text-red-400 hover:text-red-600 disabled:opacity-30 rounded ml-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Riga 2: Categoria, Girone, Toggle Casa/Trasferta */}
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3">
                      <input
                        type="text"
                        value={match.category}
                        onChange={(e) => handleMatchChange(match.id, 'category', e.target.value)}
                        placeholder="Cat (D1)"
                        className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="text"
                        value={match.girone}
                        onChange={(e) => handleMatchChange(match.id, 'girone', e.target.value)}
                        placeholder="GIR. C"
                        className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      />
                    </div>

                    {/* Selettore Rapido IN CASA / TRASFERTA */}
                    <div className="col-span-6 grid grid-cols-2 bg-slate-200/70 p-0.5 rounded-md">
                      <button
                        type="button"
                        onClick={() => handleMatchChange(match.id, 'isHome', true)}
                        className={`flex items-center justify-center gap-1 text-[11px] font-extrabold rounded py-1 transition ${
                          match.isHome
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Home className="w-3 h-3" />
                        CASA
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMatchChange(match.id, 'isHome', false)}
                        className={`flex items-center justify-center gap-1 text-[11px] font-extrabold rounded py-1 transition ${
                          !match.isHome
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Plane className="w-3 h-3" />
                        TRASF.
                      </button>
                    </div>
                  </div>

                  {/* Riga 3: Squadra Nostra vs Squadra Avversaria */}
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <input
                        type="text"
                        value={match.ourTeam}
                        onChange={(e) => handleMatchChange(match.id, 'ourTeam', e.target.value)}
                        placeholder="Nostra Squadra"
                        className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      />
                    </div>
                    <div className="col-span-6">
                      <input
                        type="text"
                        value={match.opponent}
                        onChange={(e) => handleMatchChange(match.id, 'opponent', e.target.value)}
                        placeholder="Squadra Avversaria"
                        className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <input
                        type="color"
                        value={match.opponentColor || '#1e40af'}
                        onChange={(e) => handleMatchChange(match.id, 'opponentColor', e.target.value)}
                        title="Colore stemma avversario"
                        className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                      />
                    </div>
                  </div>

                  {/* Riga 4: Dicitura Luogo, Data e Orario */}
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-5 relative">
                      <MapPin className="w-3 h-3 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={match.locationText}
                        onChange={(e) => handleMatchChange(match.id, 'locationText', e.target.value)}
                        placeholder="IN CASA / A BERGAMO"
                        title="Testo che compare accanto al pin"
                        className="w-full pl-7 pr-2 py-1.5 text-[11px] font-semibold bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      />
                    </div>
                    <div className="col-span-4 relative">
                      <Calendar className="w-3 h-3 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={match.date}
                        onChange={(e) => handleMatchChange(match.id, 'date', e.target.value)}
                        placeholder="23 NOVEMBRE"
                        className="w-full pl-7 pr-2 py-1.5 text-[11px] font-bold bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      />
                    </div>
                    <div className="col-span-3 relative">
                      <Clock className="w-3 h-3 text-slate-400 absolute left-2 top-2.5" />
                      <input
                        type="text"
                        value={match.time}
                        onChange={(e) => handleMatchChange(match.id, 'time', e.target.value)}
                        placeholder="15.15"
                        title="Orario (lascia vuoto se vuoi mostrare solo la data)"
                        className="w-full pl-6 pr-2 py-1.5 text-[11px] font-extrabold bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pulsante grande aggiunta in fondo alla lista */}
            <button
              type="button"
              onClick={() => addMatch()}
              className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-blue-500 text-slate-500 hover:text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              Aggiungi un'altra partita al weekend
            </button>
          </div>
        </div>
      </aside>

      {/* ==========================================
          COLONNA DESTRA: ANTEPRIMA LIVE 9:16 + SCARICA PNG
         ========================================== */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:h-screen lg:overflow-y-auto">
        {/* CONTENITORE STORIA 9:16 (380x675px su schermo, 1080x1920px in export) */}
        <div
          className={`relative w-[355px] sm:w-[396px] aspect-[9/16] rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between select-none border ${
            isDarkTheme
              ? 'bg-gradient-to-b from-[#04122c] via-[#071f46] to-[#030d22] border-slate-800'
              : 'bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] border-white'
          }`}
        >
          {/* Nastri Decorativi Angolo Alto-Sinistra */}
          <div className="absolute top-0 left-0 w-28 h-28 pointer-events-none z-0">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <polygon
                points="0,0 92,0 0,96"
                fill={isDarkTheme ? '#0b3b8c' : '#0a2e65'}
              />
              <polygon
                points="92,0 114,0 0,118 0,96"
                fill={isDarkTheme ? '#00e676' : '#e11d48'}
              />
            </svg>
          </div>

          {/* Nastri Decorativi Angolo Basso-Destra */}
          <div className="absolute bottom-0 right-0 w-28 h-28 pointer-events-none z-0">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <polygon
                points="120,120 28,120 120,24"
                fill={isDarkTheme ? '#0b3b8c' : '#0a2e65'}
              />
              <polygon
                points="28,120 6,120 120,2 120,24"
                fill={isDarkTheme ? '#00e676' : '#e11d48'}
              />
            </svg>
          </div>

          {/* 1. INTESTAZIONE STORIA (Logo Società + Logo FITET + Titolo Giornata) */}
          <div className="relative z-10 pt-3.5 px-4 text-center">
            <div className="flex items-center justify-center relative">
              {/* Badge Centrale Società */}
              {config.customClubLogo ? (
                <div className="w-16 h-16 rounded-full bg-white shadow-md p-1 flex items-center justify-center border-2 border-blue-900 overflow-hidden">
                  <img
                    src={config.customClubLogo}
                    alt="Logo Club"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div
                  className={`inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full shadow-md border-2 ${
                    isDarkTheme ? 'border-[#00e676]' : 'border-[#1e3a8a]'
                  }`}
                >
                  <AscaCrestSVG className="w-10 h-10 flex-shrink-0" />
                  <div className="text-left pr-1">
                    <div className="text-xs font-black text-slate-900 leading-none tracking-tight">
                      {config.clubName || 'ASCA TT'}
                    </div>
                    <div className="text-[8px] font-extrabold text-red-600 tracking-wider leading-tight mt-0.5">
                      TENNISTAVOLO
                    </div>
                    <div className="text-[7px] font-bold text-slate-400 leading-none">
                      A.S.D.
                    </div>
                  </div>
                </div>
              )}

              {/* Logo FITET a destra */}
              <div className="absolute right-0 top-1">
                <FitetLogoSVG className="w-14 h-10" dark={isDarkTheme} />
              </div>
            </div>

            {/* Titolo Giornata */}
            <div className="mt-2 leading-none">
              <h2 className="text-[22px] sm:text-[25px] font-black tracking-tight uppercase drop-shadow-xs">
                <span className={isDarkTheme ? 'text-[#00e676]' : 'text-[#ef233c]'}>
                  {config.titleNumber}{' '}
                </span>
                <span className={isDarkTheme ? 'text-white' : 'text-[#0a2558]'}>
                  {config.titleText}
                </span>
              </h2>
            </div>

            {/* Sottotitolo con linee */}
            <div className="flex items-center justify-center gap-2.5 mt-1">
              <span
                className={`h-[1.5px] w-10 ${
                  isDarkTheme ? 'bg-slate-600' : 'bg-slate-400'
                }`}
              />
              <span
                className={`text-[9.5px] font-semibold uppercase tracking-[0.22em] ${
                  isDarkTheme ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {config.subtitle || 'MATCHDAY'}
              </span>
              <span
                className={`h-[1.5px] w-10 ${
                  isDarkTheme ? 'bg-slate-600' : 'bg-slate-400'
                }`}
              />
            </div>
          </div>

          {/* 2. LISTA PARTITE AUTO-CENTRATA */}
          <div
            className="relative z-10 flex-1 flex flex-col justify-center px-3.5 my-1.5 overflow-hidden"
            style={{ gap: metrics.gap }}
          >
            {matches.map((match, idx) => {
              const isEven = idx % 2 === 0;
              const team1IsOur = config.autoSwapAway ? match.isHome : true;
              const leftTeam = team1IsOur ? match.ourTeam : match.opponent;
              const rightTeam = team1IsOur ? match.opponent : match.ourTeam;
              const hasTime = match.time && match.time.trim().length > 0;

              // Colori blocco obliquo destro
              const rightBgClass = isDarkTheme
                ? isEven
                  ? 'from-[#0284c7] to-[#1e3a8a]'
                  : 'from-[#6b21a8] to-[#4c1d95]'
                : isEven
                ? 'from-[#0c357a] to-[#071e48]'
                : 'from-[#ef233c] to-[#b91c1c]';

              return (
                <div
                  key={match.id}
                  style={{ paddingTop: metrics.padY, paddingBottom: metrics.padY }}
                  className={`relative rounded-xl shadow-md overflow-hidden flex items-stretch transition-all ${
                    isDarkTheme
                      ? 'bg-[#0d2752] border border-white/10'
                      : 'bg-white border border-slate-200/80'
                  }`}
                >
                  {/* SEZIONE SINISTRA (Categoria, Luogo, Squadre) */}
                  <div className="w-[69%] pl-2.5 pr-1 flex flex-col justify-between z-10">
                    {/* Barra Superiore: Pillola Categoria/Girone + Pin Casa/Trasferta */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[8.5px] font-black uppercase tracking-tight leading-tight shadow-2xs ${
                          isDarkTheme
                            ? 'bg-[#00e676] text-[#04122c]'
                            : 'bg-[#ef233c] text-white'
                        }`}
                      >
                        {match.category} {match.girone}
                      </span>

                      <span
                        className={`text-[10px] font-light ${
                          isDarkTheme ? 'text-slate-500' : 'text-slate-300'
                        }`}
                      >
                        |
                      </span>

                      <div className="flex items-center gap-0.5 min-w-0">
                        <MapPin
                          className={`w-3 h-3 flex-shrink-0 ${
                            match.isHome
                              ? isDarkTheme
                                ? 'text-[#00e676]'
                                : 'text-[#ef233c]'
                              : 'text-sky-500'
                          }`}
                        />
                        <span
                          className={`text-[8.5px] font-extrabold uppercase truncate ${
                            isDarkTheme ? 'text-slate-200' : 'text-[#0a2558]'
                          }`}
                        >
                          {match.locationText || (match.isHome ? 'IN CASA' : 'IN TRASFERTA')}
                        </span>
                      </div>
                    </div>

                    {/* Area Centrale: Squadra 1 vs Squadra 2 */}
                    <div className="grid grid-cols-11 items-center my-auto pt-1">
                      {/* Squadra Sinistra */}
                      <div className="col-span-5 flex flex-col items-center text-center">
                        {config.showLogos && (
                          <div className="mb-0.5">
                            {team1IsOur ? (
                              config.customClubLogo ? (
                                <img
                                  src={config.customClubLogo}
                                  alt="Logo"
                                  className={`${metrics.logoSize} object-contain`}
                                />
                              ) : (
                                <AscaCrestSVG className={metrics.logoSize} />
                              )
                            ) : (
                              <OpponentBadgeSVG
                                name={leftTeam}
                                color={match.opponentColor}
                                className={metrics.logoSize}
                              />
                            )}
                          </div>
                        )}
                        <span
                          className={`${metrics.titleText} font-black uppercase leading-none tracking-tight truncate w-full ${
                            isDarkTheme ? 'text-white' : 'text-[#0a2558]'
                          }`}
                        >
                          {leftTeam}
                        </span>
                      </div>

                      {/* VS Centrale */}
                      <div className="col-span-1 flex items-center justify-center">
                        <span
                          className={`${metrics.vsText} font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-b ${
                            isDarkTheme
                              ? 'from-[#00e676] to-sky-400'
                              : isEven
                              ? 'from-[#ef233c] to-red-900'
                              : 'from-blue-600 to-blue-950'
                          }`}
                        >
                          VS
                        </span>
                      </div>

                      {/* Squadra Destra */}
                      <div className="col-span-5 flex flex-col items-center text-center">
                        {config.showLogos && (
                          <div className="mb-0.5">
                            {!team1IsOur ? (
                              config.customClubLogo ? (
                                <img
                                  src={config.customClubLogo}
                                  alt="Logo"
                                  className={`${metrics.logoSize} object-contain`}
                                />
                              ) : (
                                <AscaCrestSVG className={metrics.logoSize} />
                              )
                            ) : (
                              <OpponentBadgeSVG
                                name={rightTeam}
                                color={match.opponentColor}
                                className={metrics.logoSize}
                              />
                            )}
                          </div>
                        )}
                        <span
                          className={`${metrics.titleText} font-black uppercase leading-none tracking-tight truncate w-full ${
                            isDarkTheme ? 'text-white' : 'text-[#0a2558]'
                          }`}
                        >
                          {rightTeam}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SEZIONE DESTRA OBLIQUA (Data e Orario) */}
                  <div
                    style={{
                      clipPath: 'polygon(16% 0, 100% 0, 100% 100%, 0% 100%)'
                    }}
                    className={` absolute right-0 top-0 bottom-0 w-[33%] bg-gradient-to-br ${rightBgClass} text-white flex flex-col items-center justify-center pl-3 pr-1.5 text-center`}
                  >
                    {isDarkTheme && (
                      <div
                        style={{
                          clipPath: 'polygon(16% 0, 22% 0, 6% 100%, 0% 100%)'
                        }}
                        className="absolute inset-0 bg-[#00e676]"
                      />
                    )}

                    {hasTime ? (
                      <>
                        <div
                          className={`${metrics.dateText} font-extrabold uppercase tracking-tight leading-tight`}
                        >
                          {match.date}
                        </div>
                        <div className="w-14 h-[1px] bg-white/40 my-0.5" />
                        <div className="text-[7.5px] font-bold uppercase tracking-widest text-white/90 leading-none">
                          ORE
                        </div>
                        <div
                          className={`${metrics.timeText} font-black tracking-tight leading-none mt-0.5`}
                        >
                          {match.time}
                        </div>
                      </>
                    ) : (
                      <div className="text-xs font-black uppercase tracking-tight leading-tight px-1">
                        {match.date || 'DATA DA DEF.'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3. FOOTER SITO WEB */}
          <div className="relative z-10 pb-2.5 text-center">
            <span
              className={`text-xs font-extrabold italic tracking-wide ${
                isDarkTheme ? 'text-[#00e676]' : 'text-[#0a2558]'
              }`}
            >
              {config.website || 'www.ascatt.it'}
            </span>
          </div>
        </div>

        {/* PULSANTONE SCARICA STORIA .PNG (Come nella tua Foto 1) */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={exportStoryPNG}
            disabled={isExporting}
            className="inline-flex items-center gap-2.5 bg-[#1d63dc] hover:bg-[#1552bc] active:scale-[0.99] text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/30 transition cursor-pointer disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Generazione Storia HD...' : 'Scarica Storia .PNG'}
          </button>
          <span className="text-[11px] text-slate-500 font-medium">
            Formato Instagram / WhatsApp Story • Alta Risoluzione (1080 × 1920 px)
          </span>
        </div>
      </main>
    </div>
  );
}