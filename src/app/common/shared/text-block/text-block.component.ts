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
    text = text.replace(
      /(<ks-meta-page\b[^>]*>)(.*?)(<\/ks-meta-page>)/gi,
      (_, openTag, innerText, closeTag) => `${openTag}[${innerText}]${closeTag}`
    );
    text = text.replace(
      /(<ks-meta-fnref\b[^>]*>)(.*?)(<\/ks-meta-fnref>)/gi,
      (_, openTag, innerText, closeTag) => `${openTag}(${innerText})${closeTag}`
    );
    this.trustedText = this.sanitizer.bypassSecurityTrustHtml(text);
  }
  trustedText: SafeHtml = '';
}
