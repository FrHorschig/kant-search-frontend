import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  transform(text: string): string {
    return text
      .replace(
        /\{fn(\d+.\d+)\}/g,
        (_, g1) => `<sup><span class="ks-fn-ref">(${g1})</span></sup>`
      ) //
      .replace(/\s*\{l(\d+)\}\s*/g, ' ') //
      .replace(
        /\s*\{p(\d+)\}\s*/g,
        (_, g1) => ` <span class="ks-pagination-s">[${g1}]</span> `
      );
  }
}
