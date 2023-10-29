import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removePagination',
})
export class RemovePaginationPipe implements PipeTransform {
  transform(text: string): string {
    if (!text) {
      return '';
    }
    return (
      text
        .replace(/\s*\{p\d{1,5}\}\s*/g, ' ')
        .replace(/\s*\{l\d{1,3}\}\s*/g, ' ')
        .replace(/\s*\{fr\d{1,5}\.\d{1,3}\}\s*/g, ' ')
        .replace(/\s*\{fn\d{1,5}\.\d{1,3}\}\s*/g, ' ')
        // handle cases where the end of the pagination string is cut off
        .replace(/\s*\{p\d{0,5} /g, ' ')
        .replace(/\s*\{l\d{0,5} /g, ' ')
        .replace(/\s*\{fr\d{0,5}(?:\.\d{0,3})?/g, ' ')
        .replace(/\s*\{fn\d{0,5}(?:\.\d{0,3})?/g, ' ')
        // handle cases where the start of the pagination string is cut off
        .replace(/p\d{1,5}\}\s*/g, ' ')
        .replace(/l\d{1,5}\}\s*/g, ' ')
        .replace(/fr\d{1,5}\.\d{1,3}\}\s*/g, ' ')
        .replace(/fn\d{1,5}\.\d{1,3}\}\s*/g, ' ')
    );
  }
}
