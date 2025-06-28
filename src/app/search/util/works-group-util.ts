// keep this in sync with <backend-dir>/src/core/upload/internal/mapping/works.go

import { WorksGroup } from '../model/search-options';

const all = [
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
];

const allGerman = [
  // all minus three in vol 1 and one in vol 2
  'ANTH', //
  'AP', //
  'AUSGLEICH', //
  'BDG', //
  'BEM_MORGEN', //
  'BUCHMACHEREI', //
  'DFS', //
  'EACG', //
  'EAD', //
  'FBZE', //
  'FE', //
  'FRAGE_AUFKLAERUNG', //
  'GAJFF', //
  'GMS', //
  'GNVE', //
  'GSE', //
  'GSK', //
  'GUGR', //
  'IDEE_GESCHICHTE', //
  'KPV', //
  'KRV_A', //
  'KRV_B', //
  'KU', //
  'LAMBERT_BRIEFWECHSEL', //
  'LOG', //
  'MAN', //
  'MENSCHENGESCH', //
  'MENSCHENRACE', //
  'MS', //
  'NACHRICHT_AERZTE', //
  'NEV', //
  'NG', //
  'NLBR', //
  'NTH', //
  'PAED', //
  'PG', //
  'PROL', //
  'REZ_HERDER', //
  'REZ_HUFELAND', //
  'REZ_MOSCATI', //
  'REZ_SCHULZ', //
  'REZ_SIL_2', //
  'REZ_SIL_8', //
  'REZ_ULRICH', //
  'RGV', //
  'SF', //
  'TG', //
  'THEODICEE', //
  'TP', //
  'TW', //
  'UD', //
  'UEE', //
  'UEGTP', //
  'UFE', //
  'VBO', //
  'VKK', //
  'VNAEF', //
  'VORREDE_PHIL', //
  'VRML', //
  'VT', //
  'VUB', //
  'VUE', //
  'VULKANE', //
  'VVRM', //
  'WDO', //
  'WITTERUNG', //
  'WOERTERBUCH', //
  'ZEF', //
];

const precritical = [
  // volumes 1 and 2
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
].sort();

const critiques = [
  'KRV_B', //
  'KPV', //
  'KU', //
].sort();

export class WorksGroupUtil {
  static getCodes(group: WorksGroup | null): string[] {
    switch (group) {
      case WorksGroup.All:
        return all;
      case WorksGroup.AllGerman:
        return allGerman;
      case WorksGroup.Precritical:
        return precritical;
      case WorksGroup.Critiques:
        return critiques;
      case WorksGroup.Custom:
        throw new Error(
          'The work group value ' + group + ' is not allowed to be mapped!'
        );
      default:
        return [];
    }
  }

  static getGroup(codes: string[]): WorksGroup | null {
    if (codes.length === 0) {
      return null;
    }
    if (codes.length === all.length) {
      return WorksGroup.All;
    }

    codes.sort();
    if (
      codes.length === allGerman.length &&
      codes.every((c, i) => c === allGerman[i])
    ) {
      return WorksGroup.AllGerman;
    }
    if (
      codes.length === precritical.length &&
      codes.every((c, i) => c === precritical[i])
    ) {
      return WorksGroup.Precritical;
    }
    if (
      codes.length === critiques.length &&
      codes.every((c, i) => c === critiques[i])
    ) {
      return WorksGroup.Critiques;
    }

    return WorksGroup.Custom;
  }
}
