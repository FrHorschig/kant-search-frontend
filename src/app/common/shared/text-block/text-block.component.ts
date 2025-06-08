import { Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ks-text-block',
  templateUrl: './text-block.component.html',
  standalone: false,
})
export class TextBlockComponent {
  private sanitizer = inject(DomSanitizer);

  @Input()
  set text(text: string) {
    this.trustedText = this.sanitizer.bypassSecurityTrustHtml(text);
  }
  trustedText: SafeHtml = '';
}
