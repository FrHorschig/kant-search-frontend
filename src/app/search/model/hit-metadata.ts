import { Hit } from '@frhorschig/kant-search-api';

export interface HitMetadata {
  workCode: string;
  hit: Hit;
  index: number;
}
