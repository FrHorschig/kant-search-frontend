import { WorkGroup } from "src/app/app/config/config.store";

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

export const all: WorkGroup = {
  translateString: 'ALL',
  codes: [
    // --- volume 1 ------------------
    'GSK', //
    'UFE', //
    'FE', //
    'NTH', //
    'Di', //
    'PND', //
    'VUE', //
    'GNVE', //
    'FBZE', //
    'MON_PH', //
    'TW', //
    // --- volume 2 ------------------
    'EACG', //
    'NLBR', //
    'VBO', //
    'GAJFF', //
    'DFS', //
    'BDG', //
    'NG', //
    'GSE', //
    'VKK', //
    'REZ_SIL_2', //
    'UD', //
    'NEV', //
    'TG', //
    'GUGR', //
    'MSI', //
    'REZ_MOSCATI', //
    'VVRM', //
    'AP', //
    // --- volume 3 ------------------
    'KRV_B', //
    // --- volume 4 ------------------
    'KRV_A', //
    'PROL', //
    'GMS', //
    'MAN', //
    // --- volume 5 ------------------
    'KPV', //
    'KU', //
    // --- volume 6 ------------------
    'RGV', //
    'MS', //
    // --- volume 7 ------------------
    'SF', //
    'ANTH', //
    // --- volume 8 ------------------
    'LAMBERT_BRIEFWECHSEL', //
    'NACHRICHT_AERZTE', //
    'REZ_SCHULZ', //
    'IDEE_GESCHICHTE', //
    'FRAGE_AUFKLAERUNG', //
    'REZ_HERDER', //
    'VULKANE', //
    'VUB', //
    'MENSCHENRACE', //
    'MENSCHENGESCH', //
    'REZ_HUFELAND', //
    'WDO', //
    'BEM_MORGEN', //
    'UEGTP', //
    'UEE', //
    'THEODICEE', //
    'TP', //
    'WITTERUNG', //
    'EAD', //
    'ZEF', //
    'VT', //
    'AUSGLEICH', //
    'VNAEF', //
    'VRML', //
    'BUCHMACHEREI', //
    'VORREDE_PHIL', //
    'WOERTERBUCH', //
    'REZ_SIL_8', //
    'REZ_ULRICH', //
    // --- volume 9 ------------------
    'LOG', //
    'PG', //
    'PAED', //
  ],
};

export const custom: WorkGroup = {
  translateString: 'CUSTOM',
  codes: [],
};