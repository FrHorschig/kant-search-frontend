import { Match, Paragraph, Volume, Work } from 'kant-search-api';

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
  static work2: Work = {
    id: 2,
    title: 'Work 2',
    ordinal: 0,
    volumeId: 2,
  };
  static volumes: Volume[] = [this.volume];
  static works: Work[] = [this.work];
  static volumeById = new Map<number, Volume>([[1, this.volume]]);
  static workById = new Map<number, Work>([[1, this.work]]);

  static match: Match = {
    snippet: 'snippet',
    text: 'text',
    pages: [1, 2],
    sentenceId: 3,
    paragraphId: 4,
  };
  static paragraph: Paragraph = {
    id: 1,
    text: 'text',
    pages: [1, 2],
    workId: 1,
  };
}
