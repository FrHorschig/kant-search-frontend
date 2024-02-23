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
        .replace(/\s{0,10}\{(p|l|fr|fn)\d+(?:\.\d+)?\}\s{0,10}/g, ' ')
        // handle cases where the end of the pagination string is cut off
        .replace(/\s{0,10}\{(p|l|fr|fn)?(\d{0,10})?(?:\.\d{0,10})?/g, ' ')
        // handle cases where the start of the pagination string is cut off
        .replace(/(p|l|fr|fn)?(\d+)?(?:\.\d+)?\}\s{0,10}/g, ' ')
    );
  }
}
