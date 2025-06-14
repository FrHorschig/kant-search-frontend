import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'ks-left-labeled-input',
  templateUrl: './left-labeled-input.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzFlexModule,
    NzGridModule,
    NzSpaceModule,
    NzToolTipModule,
    NzIconModule,
  ],
})
export class LeftLabeledInputComponent {
  @Input() idString = '';
  @Input() i18nString = '';
  @Input() withTooltip = false;
}
