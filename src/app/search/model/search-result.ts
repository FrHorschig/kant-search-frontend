import { Work } from 'src/app/common/model/model';

export interface SearchResult {
  hits: Hit[];
  workCode: string;
}

export interface Hit {
  snippets: Snippet[];
  fmtTextWithHl: string;
  ordinal: number;
  index: number;
  work: Work;
}

export interface Snippet {
  page: number;
  line: number;
  text: string;
  hasHighlights: boolean;
}

export const emptyHit: Hit = {
  snippets: [],
  fmtTextWithHl: '',
  ordinal: 0,
  index: 0,
  work: {
    code: '',
    sections: [],
    ordinal: 0,
    title: '',
    year: '',
    volumeNumber: 0,
    volumeTitle: '',
  },
};
