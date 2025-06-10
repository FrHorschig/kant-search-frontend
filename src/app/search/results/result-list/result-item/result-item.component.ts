import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';
import { Hit } from 'src/app/search/model/search-result';

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
  @Input() hit: Hit = {
    ordinal: 0,
    pages: [],
    snippets: [],
    text: '',
    index: 0,
    work: { code: '', sections: [], ordinal: 0, title: '', volumeNumber: 0 },
  };

  @Output() onClick = new EventEmitter<void>();

  onCardClick() {
    this.onClick.emit();
  }
}
