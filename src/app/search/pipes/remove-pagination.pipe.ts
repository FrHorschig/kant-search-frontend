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
        .replace(/\s*\{(p|l|fr|fn)\d+(?:\.\d+)?\}\s*/g, ' ')
        // handle cases where the end of the pagination string is cut off
        .replace(/\s*\{(p|l|fr|fn)?(\d*)?(?:\.\d*)?/g, ' ')
        // handle cases where the start of the pagination string is cut off
        .replace(/(p|l|fr|fn)?(\d+)?(?:\.\d+)?\}\s*/g, ' ')
    );
  }
}
