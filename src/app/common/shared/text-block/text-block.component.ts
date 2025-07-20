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
    text = text.replaceAll('<ks-meta-page>', '<ks-meta-page>[');
    text = text.replaceAll('</ks-meta-page>', ']</ks-meta-page>');
    text = text.replaceAll('<ks-meta-fnref>', '<ks-meta-fnref>(');
    text = text.replaceAll('</ks-meta-fnref>', ')</ks-meta-fnref>');
    text = text.replaceAll('<ks-fmt-table>', '<table>');
    text = text.replaceAll('</ks-fmt-table>', '</table>');
    this.trustedText = this.sanitizer.bypassSecurityTrustHtml(text);
  }
  trustedText: SafeHtml = '';
}
