import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzFlexDirective, NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'ks-right-labeled-input',
  templateUrl: './right-labeled-input.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    NzFlexModule,
    NzGridModule,
    NzToolTipModule,
    NzIconModule,
  ],
})
export class RightLabeledInputComponent {
  @Input() idString = '';
  @Input() i18nString = '';
}
