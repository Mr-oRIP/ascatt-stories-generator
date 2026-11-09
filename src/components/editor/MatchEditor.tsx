import { ArrowDown, ArrowUp, Calendar, Clock, Copy, Home, MapPin, Plane, Trash2 } from 'lucide-react';
import type { StoryState } from '../../hooks/useStoryState';
import type { Match } from '../../types/story';
import { TextField } from '../ui/TextField';

interface MatchEditorProps {
  match: Match;
  index: number;
  total: number;
  canDuplicate: boolean;
  updateMatch: StoryState['updateMatch'];
  duplicateMatch: StoryState['duplicateMatch'];
  removeMatch: StoryState['removeMatch'];
  moveMatch: StoryState['moveMatch'];
}

const BOLD_INPUT = 'px-2.5 py-1.5 text-xs font-bold rounded-md uppercase';
const ICON_BUTTON = 'p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded';

export function MatchEditor({
  match,
  index,
  total,
  canDuplicate,
  updateMatch,
  duplicateMatch,
  removeMatch,
  moveMatch,
}: MatchEditorProps) {
  const update = <K extends keyof Match>(field: K) => (value: Match[K]) => updateMatch(match.id, field, value);

  const sideButton = (isHome: boolean) =>
    `flex items-center justify-center gap-1 text-[11px] font-extrabold rounded py-1 transition ${
      match.isHome === isHome
        ? `${isHome ? 'bg-emerald-600' : 'bg-amber-600'} text-white shadow-xs`
        : 'text-slate-600 hover:text-slate-900'
    }`;

  return (
    <div className="bg-[#f8fafc] border border-slate-200/90 rounded-xl p-3.5 space-y-2.5 shadow-sm hover:border-slate-300 transition">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">PARTITA {index + 1}</h3>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => moveMatch(index, -1)}
            disabled={index === 0}
            title="Sposta su"
            aria-label="Sposta su"
            className={ICON_BUTTON}
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => moveMatch(index, 1)}
            disabled={index === total - 1}
            title="Sposta giù"
            aria-label="Sposta giù"
            className={ICON_BUTTON}
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => duplicateMatch(match)}
            disabled={!canDuplicate}
            title="Duplica partita"
            aria-label="Duplica partita"
            className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-30 rounded"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => removeMatch(match.id)}
            disabled={total <= 1}
            title="Rimuovi partita"
            aria-label="Rimuovi partita"
            className="p-1 text-red-400 hover:text-red-600 disabled:opacity-30 rounded ml-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-3">
          <TextField
            value={match.category}
            onValueChange={update('category')}
            placeholder="Cat (D1)"
            aria-label="Categoria"
            className={BOLD_INPUT}
          />
        </div>
        <div className="col-span-3">
          <TextField
            value={match.girone}
            onValueChange={update('girone')}
            placeholder="GIR. C"
            aria-label="Girone"
            className={BOLD_INPUT}
          />
        </div>

        <div className="col-span-6 grid grid-cols-2 bg-slate-200/70 p-0.5 rounded-md">
          <button
            type="button"
            onClick={() => updateMatch(match.id, 'isHome', true)}
            aria-pressed={match.isHome}
            className={sideButton(true)}
          >
            <Home className="w-3 h-3" />
            CASA
          </button>
          <button
            type="button"
            onClick={() => updateMatch(match.id, 'isHome', false)}
            aria-pressed={!match.isHome}
            className={sideButton(false)}
          >
            <Plane className="w-3 h-3" />
            TRASF.
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 items-center">
        <div className="col-span-5">
          <TextField
            value={match.ourTeam}
            onValueChange={update('ourTeam')}
            placeholder="Nostra Squadra"
            aria-label="Nostra squadra"
            className={BOLD_INPUT}
          />
        </div>
        <div className="col-span-6">
          <TextField
            value={match.opponent}
            onValueChange={update('opponent')}
            placeholder="Squadra Avversaria"
            aria-label="Squadra avversaria"
            className={BOLD_INPUT}
          />
        </div>
        <div className="col-span-1 flex justify-center">
          <input
            type="color"
            value={match.opponentColor || '#1e40af'}
            onChange={(event) => updateMatch(match.id, 'opponentColor', event.target.value)}
            title="Colore stemma avversario"
            aria-label="Colore stemma avversario"
            className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-5 relative">
          <MapPin className="w-3 h-3 text-slate-400 absolute left-2.5 top-2.5" />
          <TextField
            value={match.locationText}
            onValueChange={update('locationText')}
            placeholder="IN CASA / A BERGAMO"
            title="Testo che compare accanto al pin"
            aria-label="Dicitura luogo"
            className="pl-7 pr-2 py-1.5 text-[11px] font-semibold rounded-md uppercase"
          />
        </div>
        <div className="col-span-4 relative">
          <Calendar className="w-3 h-3 text-slate-400 absolute left-2.5 top-2.5" />
          <TextField
            value={match.date}
            onValueChange={update('date')}
            placeholder="23 NOVEMBRE"
            aria-label="Data"
            className="pl-7 pr-2 py-1.5 text-[11px] font-bold rounded-md uppercase"
          />
        </div>
        <div className="col-span-3 relative">
          <Clock className="w-3 h-3 text-slate-400 absolute left-2 top-2.5" />
          <TextField
            value={match.time}
            onValueChange={update('time')}
            placeholder="15.15"
            title="Orario (lascia vuoto se vuoi mostrare solo la data)"
            aria-label="Orario"
            className="pl-6 pr-2 py-1.5 text-[11px] font-extrabold rounded-md text-center"
          />
        </div>
      </div>
    </div>
  );
}
