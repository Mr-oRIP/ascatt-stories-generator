import { EditorPanel } from './components/editor/EditorPanel';
import { ExportButton } from './components/preview/ExportButton';
import { StoryPreview } from './components/preview/StoryPreview';
import { useStoryState } from './hooks/useStoryState';

export default function App() {
  const story = useStoryState();

  return (
    <div className="min-h-screen bg-[#e5e7eb] text-slate-800 flex flex-col lg:flex-row font-sans">
      <EditorPanel story={story} />

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:h-screen lg:overflow-y-auto">
        <StoryPreview config={story.config} matches={story.matches} />
        <ExportButton config={story.config} matches={story.matches} />
        {!story.isSaved && (
          <p role="alert" className="mt-3 max-w-sm text-center text-xs font-medium text-red-600">
            Spazio del browser esaurito: le ultime modifiche non verranno ricordate. Prova a caricare un logo più
            leggero.
          </p>
        )}
      </main>
    </div>
  );
}
