import { Volume } from '@frhorschig/kant-search-api';
import { Work } from '../model/model';

export class Testdata {
  static readonly volume: Volume = {
    title: 'Volume',
    volumeNumber: 1,
    works: [],
  };
  static readonly volume2: Volume = {
    title: 'Volume 2',
    volumeNumber: 2,
    works: [],
  };

  static readonly work: Work = {
    code: 'code',
    sections: [],
    ordinal: 1,
    title: 'Work',
    year: '1789',
    volumeNumber: 1,
    volumeTitle: 'Volume',
  };
  static readonly work2: Work = {
    code: 'code2',
    sections: [],
    ordinal: 2,
    title: 'Work 2',
    year: '1788',
    volumeNumber: 1,
    volumeTitle: 'Volume',
  };
  static readonly work3: Work = {
    code: 'code3',
    sections: [],
    ordinal: 1,
    title: 'Work 3',
    year: '1787',
    volumeNumber: 2,
    volumeTitle: 'Volume 2',
  };
}
