import { Hit } from '@frhorschig/kant-search-api';

export interface HitMetadata {
  workId: string;
  workCode: string;
  hit: Hit;
  index: number;
}
