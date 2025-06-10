import { Work } from 'src/app/common/model/work';

export interface SearchResult {
  hits: Hit[];
  workCode: string;
}

export interface Hit {
  ordinal: number;
  pages: number[];
  snippets: string[];
  text: string;
  index: number;
  work: Work;
}
