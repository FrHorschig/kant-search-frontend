export class TitleUtil {
  static truncate(str: string, maxLen: number): string {
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

  static titleCase(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
