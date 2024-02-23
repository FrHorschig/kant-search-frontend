import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  transform(text: string): string {
    return (
      text
        // replace footnote information {fn123} with HTML footnote reference
        .replace(
          /\{fn(\d+\.\d+)\}/g,
          (_, g1) => `<sup><span class="ks-fn-ref">(${g1})</span></sup>`
        ) //
        // remove line information {l123}
        .replace(/\s*\{l(\d+)\}\s*/g, ' ') //
        // remove page information {p123} with HTML page reference
        .replace(
          /\s*\{p(\d+)\}\s*/g,
          (_, g1) => ` <span class="ks-pagination-s">[${g1}]</span> `
        )
    );
  }
}
