export class TitleUtil {
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
