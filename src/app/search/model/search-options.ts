export enum WorksGroup {
  ALL = 'ALL',
  PRECRITICAL = 'PRECRITICAL',
  CRITIQUES = 'CRITIQUES',
  CUSTOM = 'CUSTOM',
}

export enum ResultSort {
  AA_ORDER = 'AA_ORDER',
  YEAR = 'YEAR',
}

export interface AdvancedOptions {
  sort: ResultSort;
  withStemming: boolean;
  includeFootnotes: boolean;
  includeHeadings: boolean;
  includeSummaries: boolean;
}
