export enum WorksGroup {
  All = 'ALL',
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
  includeFootnotes: boolean;
  includeHeadings: boolean;
  includeSummaries: boolean;
}
