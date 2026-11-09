import { Download } from 'lucide-react';
import { useState } from 'react';
import { exportStoryPng } from '../../export/exportStoryPng';
import type { Match, StoryConfig } from '../../types/story';

interface ExportButtonProps {
  config: StoryConfig;
  matches: Match[];
}

export function ExportButton({ config, matches }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFailed, setExportFailed] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    setExportFailed(false);
    try {
      await exportStoryPng(config, matches);
    } catch (error) {
      console.error('Errore durante la generazione PNG:', error);
      setExportFailed(true);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleExport}
        disabled={isExporting}
        className="inline-flex items-center gap-2.5 bg-[#1d63dc] hover:bg-[#1552bc] active:scale-[0.99] text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/30 transition cursor-pointer disabled:opacity-60"
      >
        <Download className="w-4 h-4" />
        {isExporting ? 'Generazione Storia HD...' : 'Scarica Storia .PNG'}
      </button>
      <span className="text-[11px] text-slate-500 font-medium">
        Formato Instagram / WhatsApp Story • Alta Risoluzione (1080 × 1920 px)
      </span>
      {exportFailed && (
        <p role="alert" className="text-xs font-medium text-red-600">
          Non è stato possibile generare il PNG. Riprova.
        </p>
      )}
    </div>
  );
}
