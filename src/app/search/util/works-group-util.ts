import { WorksGroup } from '../model/works-group';

// keep this in sync with <backend-dir>/src/core/upload/internal/mapping/works.go
// TODO fetch these arrays from a config file
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
  // 'INTRO_1', //
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
  'REZ_SILBERSCHLAG_2', //
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
  'VULKANE_MOND', //
  'VUB', //
  'BEGRIFF_MENSCHENRACE', //
  'ANFANG_MENSCHENGESCHICHTE', //
  'REZ_HUFELAND', //
  'WDO', //
  'BEM_MORGENSTUNDEN', //
  'UEGTP', //
  'UEE', //
  'MISSLINGEN_THEODICEE', //
  'TP', //
  'MOND_WITTERUNG', //
  'EAD', //
  'ZEF', //
  'VT', //
  'AUSGLEICH_STREIT', //
  'VNAEF', //
  'VRML', //
  'BUCHMACHEREI', //
  'VORREDE_REL_PHIL', //
  'NACHSCHRIFT_WOERTERBUCH', //
  // TODO how to handle this special case?
  // 'NACHTRAG_8', //
  'REZ_SILBERSCHLAG_8', //
  // 'ANHANG_8', //
  'REZ_ULRICH', //
  // --- volume 9 ------------------
  'LOG', //
  'PG', //
  'PAED', //
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
  'REZ_SILBERSCHLAG_2', //
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
  private WorksSelectUtil() {}

  static getCodes(group: WorksGroup | null): string[] {
    switch (group) {
      case WorksGroup.ALL:
        return all;
      case WorksGroup.PRECRITICAL:
        return precritical;
      case WorksGroup.CRITIQUES:
        return critiques;
      case WorksGroup.CUSTOM:
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
    const a = all;
    if (codes.length === all.length) {
      return WorksGroup.ALL;
    }

    const inSorted = codes.sort();
    if (
      codes.length === precritical.length &&
      inSorted.every((c, i) => c === precritical[i])
    ) {
      return WorksGroup.PRECRITICAL;
    }
    if (
      codes.length === critiques.length &&
      inSorted.every((c, i) => c === critiques[i])
    ) {
      return WorksGroup.CRITIQUES;
    }

    return WorksGroup.CUSTOM;
  }
}
