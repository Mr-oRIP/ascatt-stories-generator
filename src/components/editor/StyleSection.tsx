import { Palette, Upload } from 'lucide-react';
import { useRef, useState, type ChangeEvent } from 'react';
import type { StoryState } from '../../hooks/useStoryState';
import type { Theme } from '../../types/story';
import { prepareClubLogo } from '../../utils/logo';
import { CheckboxField } from '../ui/CheckboxField';

interface StyleSectionProps {
  config: StoryState['config'];
  updateConfig: StoryState['updateConfig'];
}

const THEME_OPTIONS: Array<{ value: Theme; label: string; activeClass: string; dotClass: string }> = [
  {
    value: 'fitet-light',
    label: 'Stile Olimpia (Chiaro)',
    activeClass: 'bg-blue-600 text-white border-blue-600 shadow-sm',
    dotClass: 'bg-gradient-to-tr from-blue-900 to-red-500 border-white',
  },
  {
    value: 'asca-dark',
    label: 'Stile ASCA TT (Blu/Fluo)',
    activeClass: 'bg-[#071f46] text-[#00e676] border-[#071f46] shadow-sm',
    dotClass: 'bg-[#00e676] border-slate-800',
  },
];

export function StyleSection({ config, updateConfig }: StyleSectionProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  const handleLogoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Azzerato per poter ricaricare lo stesso file dopo averlo rimosso
    event.target.value = '';
    if (!file) return;

    try {
      updateConfig('customClubLogo', await prepareClubLogo(file));
      setLogoError(null);
    } catch {
      setLogoError('Immagine non valida: prova con un altro file PNG o JPG.');
    }
  };

  return (
    <section className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-blue-600" />
          Stile Grafica Storia
        </h2>
        <CheckboxField
          label="Mostra Stemmi"
          checked={config.showLogos}
          onCheckedChange={(checked) => updateConfig('showLogos', checked)}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {THEME_OPTIONS.map(({ value, label, activeClass, dotClass }) => (
          <button
            key={value}
            type="button"
            onClick={() => updateConfig('theme', value)}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold border transition ${
              config.theme === value ? activeClass : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className={`w-3 h-3 rounded-full border ${dotClass}`} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/70">
        <div className="flex items-center gap-2">
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => logoInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-lg transition"
          >
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            {config.customClubLogo ? 'Cambia Logo Società' : 'Carica Logo PNG'}
          </button>
          {config.customClubLogo && (
            <button
              type="button"
              onClick={() => updateConfig('customClubLogo', null)}
              className="text-xs text-red-600 hover:underline font-medium"
            >
              Rimuovi
            </button>
          )}
        </div>

        <CheckboxField
          label="Inverti lati se in trasferta"
          checked={config.autoSwapAway}
          onCheckedChange={(checked) => updateConfig('autoSwapAway', checked)}
        />
      </div>

      {logoError && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {logoError}
        </p>
      )}
    </section>
  );
}
