import { Match, Paragraph, Volume, Work } from '@frhorschig/kant-search-api';
import { MatchInfo } from 'src/app/search/model/match-info';

export class Testdata {
  static readonly volume: Volume = { id: 1, section: 1 };
  static readonly volume2: Volume = { id: 2, section: 2 };
  static readonly volume3: Volume = { id: 3, section: 3 };
  static readonly work: Work = {
    id: 1,
    code: 'ABC',
    abbreviation: 'Abbrev 1',
    ordinal: 0,
    year: '1234',
    volumeId: 1,
  };
  static readonly work2: Work = {
    id: 2,
    code: 'DEF',
    ordinal: 0,
    volumeId: 2,
  };
  static readonly work3: Work = {
    id: 3,
    code: 'GHI',
    ordinal: 0,
    volumeId: 3,
  };
  static readonly volumeById = new Map<number, Volume>([
    [1, this.volume],
    [2, this.volume2],
    [3, this.volume3],
  ]);
  static readonly workById = new Map<number, Work>([
    [1, this.work],
    [2, this.work2],
    [3, this.work3],
  ]);
  static readonly worksBySection = new Map<number, Work[]>([
    [0, [this.work, this.work2, this.work3]],
    [1, [this.work]],
    [2, [this.work2]],
    [3, [this.work3]],
  ]);

  static readonly match: Match = {
    snippet: 'snippet',
    text: 'text',
    pages: [1, 2],
    sentenceId: 3,
    paragraphId: 4,
  };
  static readonly matchInfo: MatchInfo = {
    workId: 1,
    workCode: 'code',
    match: Testdata.match,
    index: 1,
  };
  static readonly paragraph: Paragraph = {
    id: 1,
    text: 'text',
    pages: [1, 2],
    workId: 1,
  };
}
