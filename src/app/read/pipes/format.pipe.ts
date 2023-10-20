import { Pipe, PipeTransform } from '@angular/core';
import { Paragraph } from 'kant-search-api';

@Pipe({
  name: 'format',
})
export class FormatPipe implements PipeTransform {
  transform(p: Paragraph): string {
    if (p.headingLevel) {
      const textAfterPageNumber = p.text.search(/(?<=\}) /) + 1;
      p.text = `${p.text.slice(0, textAfterPageNumber)}<h${
        p.headingLevel
      }>${p.text.slice(textAfterPageNumber)}</h${p.headingLevel}>`;
    }
    if (p.footnoteName) {
      p.text = `<span id="${p.footnoteName}" class="ks-footnote"><sup><span class="ks-fn-ref">(${p.footnoteName})</span></sup> ${p.text}</span>`;
    }
    return p.text;
  }
}
