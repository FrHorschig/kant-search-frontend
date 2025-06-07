import { Work } from 'src/app/common/model/work';

export class TitleUtil {
  static getVolNoPlusTitle(work: Work): string {
    return `${work.volumeNumber}: ${TitleUtil.truncate(work.title, 70)}`;
  }

  static truncate(str: string, maxLen: number): string {
    // TODO make max len configurable
    if (str.length <= maxLen) {
      return str;
    }

    const truncated = str.slice(0, maxLen - 4);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    if (lastSpaceIndex === -1) {
      return truncated + ' ...';
    }
    return truncated.slice(0, lastSpaceIndex) + '...';
  }
}
