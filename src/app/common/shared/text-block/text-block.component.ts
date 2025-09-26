import { Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionComponent } from '../../base/subscription.component';

@Component({
  selector: 'ks-text-block',
  templateUrl: './text-block.component.html',
  standalone: true,
})
export class TextBlockComponent extends SubscriptionComponent {
  private sanitizer = inject(DomSanitizer);
  private translateService = inject(TranslateService);

  @Input()
  set text(text: string) {
    this.translateService
      .get('READ.CONTENT.FN_ABBREV')
      .pipe(this.takeUntilDestroy())
      .subscribe((tl) => {
        text = text.replaceAll('READ.CONTENT.FN_ABBREV', tl);
        this.trustedText = this.sanitizer.bypassSecurityTrustHtml(text);
      });
  }
  trustedText: SafeHtml = '';
}
