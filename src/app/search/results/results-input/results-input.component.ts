import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeModule } from 'ng-zorro-antd/tree';

@Component({
  selector: 'ks-results-input',
  templateUrl: './results-input.component.html',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    NzSpaceModule,
    NzButtonModule,
    NzToolTipModule,
    NzIconModule,
    NzInputModule,
  ],
})
export class ResultsInputComponent {
  @Input() searchTerms = '';

  @Output() searchTermsEmitter = new EventEmitter<string>();
  @Output() doUpdateEmitter = new EventEmitter<void>();

  onSearchTermsChange(searchTerms: string) {
    this.searchTermsEmitter.emit(searchTerms);
  }

  onSubmit() {
    this.doUpdateEmitter.emit();
  }
}
