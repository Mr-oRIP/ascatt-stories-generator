import { Calendar, Check } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { StoryState } from '../../hooks/useStoryState';
import { TextField } from '../ui/TextField';

interface TitleSectionProps {
  config: StoryState['config'];
  updateConfig: StoryState['updateConfig'];
  applyGlobalDateToAll: StoryState['applyGlobalDateToAll'];
}

const LARGE_INPUT = 'mt-0.5 px-3 py-2 text-sm font-bold rounded-lg';
const SMALL_INPUT = 'mt-0.5 px-3 py-2 text-xs font-semibold rounded-lg';

function Field({ label, className = '', children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] font-semibold text-slate-400 uppercase">{label}</span>
      {children}
    </label>
  );
}

export function TitleSection({ config, updateConfig, applyGlobalDateToAll }: TitleSectionProps) {
  const [dateApplied, setDateApplied] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const handleApplyDate = () => {
    applyGlobalDateToAll();
    setDateApplied(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setDateApplied(false), 2000);
  };

  return (
    <section className="space-y-3">
      <h2 className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
        TITOLO & INTESTAZIONE STORIA
      </h2>

      <div className="grid grid-cols-3 gap-2">
        <Field label="N° Giornata">
          <TextField
            value={config.titleNumber}
            onValueChange={(value) => updateConfig('titleNumber', value)}
            placeholder="Es. 5°"
            className={LARGE_INPUT}
          />
        </Field>
        <Field label="Titolo Principale" className="col-span-2">
          <TextField
            value={config.titleText}
            onValueChange={(value) => updateConfig('titleText', value)}
            placeholder="GIORNATA FITET"
            className={LARGE_INPUT}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Field label="Sottotitolo">
          <TextField
            value={config.subtitle}
            onValueChange={(value) => updateConfig('subtitle', value)}
            placeholder="M A T C H D A Y"
            className={SMALL_INPUT}
          />
        </Field>
        <Field label="Sito Web Footer">
          <TextField
            value={config.website}
            onValueChange={(value) => updateConfig('website', value)}
            placeholder="www.ascatt.it"
            className={SMALL_INPUT}
          />
        </Field>
        <Field label="Nome Società">
          <TextField
            value={config.clubName}
            onValueChange={(value) => updateConfig('clubName', value)}
            placeholder="ASCA TT"
            className={SMALL_INPUT}
          />
        </Field>
        <Field label="Orario Nuove Partite">
          <TextField
            value={config.globalTime}
            onValueChange={(value) => updateConfig('globalTime', value)}
            placeholder="15.15"
            className={SMALL_INPUT}
          />
        </Field>
      </div>

      <div className="pt-1">
        <span className="text-[10px] font-semibold text-slate-400 uppercase">
          Data Predefinita Weekend (Comoda per impostare tutte insieme)
        </span>
        <div className="flex gap-2 mt-0.5">
          <div className="flex-1">
            <TextField
              value={config.globalDate}
              onValueChange={(value) => updateConfig('globalDate', value)}
              placeholder="Es. 23 NOVEMBRE"
              aria-label="Data predefinita weekend"
              className="px-3 py-2 text-xs font-bold rounded-lg uppercase"
            />
          </div>
          <button
            type="button"
            onClick={handleApplyDate}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition whitespace-nowrap"
          >
            {dateApplied ? (
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
    </section>
  );
}
