import { Work } from 'src/app/store/volumes/model';

export interface SearchResult {
  hits: Hit[];
  workCode: string;
}

export interface Hit {
  ordinal: number;
  pages: number[];
  snippets: string[];
  fmtText: string;
  rawText: string;
  wordIndexMap: Map<number, number>;
  index: number;
  work: Work;
}

export const emptyHit: Hit = {
  ordinal: 0,
  pages: [],
  snippets: [],
  fmtText: '',
  rawText: '',
  wordIndexMap: new Map(),
  index: 0,
  work: {
    code: '',
    sections: [],
    ordinal: 0,
    title: '',
    volumeNumber: 0,
    volumeTitle: '',
  },
};
