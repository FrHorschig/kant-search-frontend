import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hit } from '@frhorschig/kant-search-api';
import { TranslateModule } from '@ngx-translate/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';

@Component({
  selector: 'ks-result-item',
  templateUrl: './result-item.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzFlexModule,
    NzSpaceModule,
    NzSpaceModule,
    NzCardModule,
    TextBlockComponent,
  ],
})
export class ResultItemComponent {
  @Input() workCode = '';
  @Input() workAbbrev = '';
  @Input() index = 0;
  @Input() hit: Hit = { ordinal: 0, pages: [], snippets: [] };

  @Output() onClick = new EventEmitter<void>();

  onCardClick() {
    this.onClick.emit();
  }
}
