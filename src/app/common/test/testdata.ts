import { Volume, Work } from 'kant-search-api';

export class Testdata {
  static volume: Volume = { id: 1, title: 'Volume 1', section: 1 };
  static work: Work = {
    id: 1,
    title: 'Work 1',
    abbreviation: 'Abbrev 1',
    ordinal: 0,
    year: '1234',
    volumeId: 1,
  };
  static volumes: Volume[] = [this.volume];
  static works: Work[] = [this.work];
  static volumeById = new Map<number, Volume>([[1, this.volume]]);
  static workById = new Map<number, Work>([[1, this.work]]);
}
