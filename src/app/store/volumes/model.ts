import { Section } from '@frhorschig/kant-search-api';

export interface Work {
  abbreviation?: string;
  code: string;
  paragraphs?: Array<number>;
  sections: Array<Section>;
  ordinal: number;
  title: string;
  year: string;
  volumeNumber: number;
  volumeTitle: string;
}

export const emptyWork: Work = {
  code: '',
  sections: [],
  ordinal: 0,
  title: '',
  year: '',
  volumeNumber: 0,
  volumeTitle: '',
};
