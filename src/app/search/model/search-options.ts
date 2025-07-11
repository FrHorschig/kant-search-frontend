export enum WorksGroup {
  All = 'ALL',
  AllGerman = 'ALL_GERMAN',
  Precritical = 'PRECRITICAL',
  Critiques = 'CRITIQUES',
  Custom = 'CUSTOM',
}

export enum ResultSort {
  AaOrder = 'AA_ORDER',
  Year = 'YEAR',
}

export interface AdvancedOptions {
  sort: ResultSort;
  withStemming: boolean;
  includeHeadings: boolean;
  includeParagraphs: boolean;
  includeFootnotes: boolean;
}
