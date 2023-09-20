import { Volume, Work } from 'kant-search-api';

export class Testdata {
  static volume: Volume = { id: 1, title: 'Volume 1', section: 1 };
  static work: Work = {
    id: 1,
    title: 'Work 1',
    ordinal: 0,
    volumeId: 1,
  };
  static volumes: Volume[] = [this.volume];
  static works: Work[] = [this.work];
}
