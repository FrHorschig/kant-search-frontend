import { Work } from 'src/app/common/model/work';

export interface HitData {
  work: Work;
  snippets: string[];
  text: string;
  ordinal: number;
  index: number;
}
