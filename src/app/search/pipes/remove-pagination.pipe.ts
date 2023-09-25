import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removePagination',
})
export class RemovePaginationPipe implements PipeTransform {
  transform(text: string): string {
    if (!text) {
      return '';
    }
    return text.replace(/\s*\{[a-zA-Z0-9.]+\}\s*/g, ' ');
  }
}
