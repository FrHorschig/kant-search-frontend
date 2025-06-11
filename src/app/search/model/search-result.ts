import { Work } from 'src/app/store/volumes/model';

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
