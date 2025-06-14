import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';
import { emptyHit } from 'src/app/search/model/search-result';

@Component({
  selector: 'ks-result-item',
  templateUrl: './result-item.component.html',
  styleUrl: './result-item.component.less',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzFlexModule,
    NzGridModule,
    NzSpaceModule,
    NzCardModule,
    TextBlockComponent,
  ],
})
export class ResultItemComponent {
  @Input() hit = emptyHit;

  @Output() onClick = new EventEmitter<void>();

  onCardClick() {
    this.onClick.emit();
  }
}
