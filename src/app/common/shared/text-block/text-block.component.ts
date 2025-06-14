import { Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ks-text-block',
  templateUrl: './text-block.component.html',
  standalone: true,
})
export class TextBlockComponent {
  private sanitizer = inject(DomSanitizer);

  @Input()
  set text(text: string) {
    text = text.replace(/(<ks-meta-page\b[^>]*>.*?<\/ks-meta-page>)/gi, '[$1]');
    text = text.replace(
      /(<ks-meta-fnref\b[^>]*>.*?<\/ks-meta-fnref>)/gi,
      '($1)'
    );
    this.trustedText = this.sanitizer.bypassSecurityTrustHtml(text);
  }
  trustedText: SafeHtml = '';
}
