import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'ks-results-input',
  templateUrl: './results-input.component.html',
  imports: [
    FormsModule,
    TranslateModule,
    NzGridModule,
    NzButtonModule,
    NzTooltipModule,
    NzIconModule,
    NzInputModule,
  ],
})
export class ResultsInputComponent {
  @Input() searchTerms = '';

  @Output() searchTermsEmitter = new EventEmitter<string>();
  @Output() doUpdateEmitter = new EventEmitter<void>();

  isCopied = false;

  onSearchTermsChange(searchTerms: string) {
    this.searchTermsEmitter.emit(searchTerms);
  }

  onSubmit() {
    this.doUpdateEmitter.emit();
  }

  onCopyClick(): void {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 1500);
    });
  }
}
