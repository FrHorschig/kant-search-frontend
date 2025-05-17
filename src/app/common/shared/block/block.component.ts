import { Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ks-text-block',
  templateUrl: './block.component.html',
  standalone: false,
})
export class TextBlockComponent {
  @Input() text: string = '';
  private sanitizer = inject(DomSanitizer);

  trustText(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
