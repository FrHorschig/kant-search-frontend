import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagenumberNormalMode',
})
export class PagenumberNormalModePipe implements PipeTransform {
  transform(text: string): string {
    return text.replace(
      /\s*\{p(\d+)\}\s*(<span class="ks-h">)?/g,
      (match, p1, p2) => {
        return ` <span class="ks-page-no-normal">[${p1}]</span> ${
          p2 ? '</br>' + p2 : ''
        }`;
      }
    );
  }
}
