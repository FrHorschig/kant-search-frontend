import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagenumberNormalMode',
})
export class PagenumberNormalModePipe implements PipeTransform {
  transform(text: string): string {
    return text.replace(
      // replace {p#} with [#] where '#' is a number
      // if it's followed by a 'ks-h' span, add a line break
      /\s*\{p(\d+)\}\s*(<span class="ks-h">)?/g,
      (_, p1, p2) => {
        return ` <span class="ks-pagenr-normal">[${p1}]</span> ${
          p2 ? '</br>' + p2 : ''
        }`;
      }
    );
  }
}
