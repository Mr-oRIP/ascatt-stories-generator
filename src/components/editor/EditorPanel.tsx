import { RotateCcw } from 'lucide-react';
import type { StoryState } from '../../hooks/useStoryState';
import { MatchList } from './MatchList';
import { StyleSection } from './StyleSection';
import { TitleSection } from './TitleSection';

const RESET_MESSAGE = 'Ripristinare squadre e impostazioni di base? Le modifiche e il logo caricato andranno persi.';

/** Colonna sinistra: modifica dei dati della storia */
export function EditorPanel({ story }: { story: StoryState }) {
  const handleReset = () => {
    if (window.confirm(RESET_MESSAGE)) story.resetDefaults();
  };

  return (
    <aside className="w-full lg:w-[470px] xl:w-[510px] bg-white border-r border-slate-200 lg:h-screen lg:overflow-y-auto shadow-sm flex-shrink-0">
      <div className="p-5 sm:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Modifica Dati Storia</h1>
            <p className="text-xs text-slate-500 mt-0.5">Generatore automatico locandina 9:16 • ASCA TT</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            title="Ripristina squadre di base"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Base
          </button>
        </div>

        <StyleSection config={story.config} updateConfig={story.updateConfig} />
        <TitleSection
          config={story.config}
          updateConfig={story.updateConfig}
          applyGlobalDateToAll={story.applyGlobalDateToAll}
        />

        <hr className="border-slate-200" />

        <MatchList
          matches={story.matches}
          canAddMatch={story.canAddMatch}
          addMatch={story.addMatch}
          updateMatch={story.updateMatch}
          duplicateMatch={story.duplicateMatch}
          removeMatch={story.removeMatch}
          moveMatch={story.moveMatch}
        />
      </div>
    </aside>
  );
}
