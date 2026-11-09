import { describe, expect, it } from 'vitest';
import { buildStoryFileName } from './file';

describe('buildStoryFileName', () => {
  it('toglie i simboli dal numero di giornata', () => {
    expect(buildStoryFileName('5°')).toBe('storia-matchday-ascatt-5.png');
  });
  it('usa matchday se il numero è vuoto', () => {
    expect(buildStoryFileName('')).toBe('storia-matchday-ascatt-matchday.png');
  });
  it('usa fitet se restano solo simboli', () => {
    expect(buildStoryFileName('°')).toBe('storia-matchday-ascatt-fitet.png');
  });
});
