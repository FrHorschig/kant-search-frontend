import { Injectable, NgZone } from '@angular/core';
import { take } from 'rxjs';

@Injectable()
export class ScrollService {
  constructor(private readonly ngZone: NgZone) {}

  scrollToAnchor(anchor: string): void {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      requestAnimationFrame(() => {
        const targetElement = document.getElementById(anchor);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'instant' });
        }
      });
    });
  }
}
