import { Plus } from 'lucide-react';
import { MAX_MATCHES } from '../../constants/defaults';
import type { StoryState } from '../../hooks/useStoryState';
import { MatchEditor } from './MatchEditor';

type MatchListProps = Pick<
  StoryState,
  'matches' | 'canAddMatch' | 'addMatch' | 'updateMatch' | 'duplicateMatch' | 'removeMatch' | 'moveMatch'
>;

export function MatchList({
  matches,
  canAddMatch,
  addMatch,
  updateMatch,
  duplicateMatch,
  removeMatch,
  moveMatch,
}: MatchListProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
          SQUADRE IN CAMPO ({matches.length})
        </h2>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => addMatch('femminile')}
            disabled={!canAddMatch}
            className="inline-flex items-center gap-1 text-xs font-bold bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 px-2.5 py-1.5 rounded-lg transition disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" />
            Femminile
          </button>
          <button
            type="button"
            onClick={() => addMatch()}
            disabled={!canAddMatch}
            className="inline-flex items-center gap-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" />
            Aggiungi Partita
          </button>
        </div>
      </div>

      <div className="space-y-3.5">
        {matches.map((match, index) => (
          <MatchEditor
            key={match.id}
            match={match}
            index={index}
            total={matches.length}
            canDuplicate={canAddMatch}
            updateMatch={updateMatch}
            duplicateMatch={duplicateMatch}
            removeMatch={removeMatch}
            moveMatch={moveMatch}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => addMatch()}
        disabled={!canAddMatch}
        className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-blue-500 text-slate-500 hover:text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-slate-500"
      >
        <Plus className="w-4 h-4" />
        Aggiungi un'altra partita al weekend
      </button>

      {!canAddMatch && (
        <p className="text-xs font-medium text-slate-500 text-center">
          Massimo {MAX_MATCHES} partite: oltre non entrano nella storia.
        </p>
      )}
    </section>
  );
}
