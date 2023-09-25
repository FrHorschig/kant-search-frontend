import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'originalMode',
})
export class OriginalModePipe implements PipeTransform {
  transform(text: string): string {
    return text
      .replace(
        // replace {p#} with [#] where '#' is a number and add a line break
        /\s*\{p(\d+)\}\s*(<span class="ks-h">)?/g,
        (_, p1, p2) => {
          return `${
            p2 ? '' : '</br>'
          }</br><span class="ks-pagination-m">[${p1}]</span>${p2 ? p2 : ''}`;
        }
      )
      .replace(
        /\s*\{l(\d+)\}\s*/g, // replace {l#} with [#] where '#' is a number
        (_, p) => {
          return `</br>${this.s3()}<span class="ks-pagination-s">${this.addLeadingSpace(
            p
          )}</span>${this.s3()}`;
        }
      );
  }

  private addLeadingSpace(n: string) {
    const num = parseInt(n, 10);
    if (num < 10) {
      return `0${num}`;
    }
    return num.toString();
  }

  private s3(): string {
    return `&nbsp;&nbsp;&nbsp;`;
  }
}
