/** Legge un file (es. logo PNG) come data URL */
export const readFileAsDataURL = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

/** Avvia il download di un data URL con il nome file indicato */
export const downloadDataUrl = (dataUrl: string, fileName: string): void => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/** Nome file della storia esportata, es. "storia-matchday-ascatt-5.png" */
export const buildStoryFileName = (titleNumber: string): string => {
  const cleanDay = (titleNumber || 'matchday').replace(/[^a-zA-Z0-9]/g, '');
  return `storia-matchday-ascatt-${cleanDay || 'fitet'}.png`;
};
