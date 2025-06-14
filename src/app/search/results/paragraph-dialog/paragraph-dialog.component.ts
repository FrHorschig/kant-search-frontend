import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { emptyHit } from '../../model/search-result';
import { FullTextInfo } from '../../model/full-text-info';
import { TitleUtil } from '../../util/title-util';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'ks-paragraph-dialog',
  templateUrl: './paragraph-dialog.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    NzFlexDirective,
    NzSpaceModule,
    NzModalModule,
    NzButtonModule,
    NzToolTipModule,
    NzIconModule,
    TextBlockComponent,
  ],
})
export class ParagraphDialogComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() hit = emptyHit;

  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() navigateEmitter = new EventEmitter<FullTextInfo>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible']) {
      this.isVisible = changes['isVisible'].currentValue;
      this.isVisibleChange.emit(this.isVisible);
    }
  }

  getWorkTitle(): string {
    return TitleUtil.truncate(this.hit.work.title, 60);
  }

  onHide() {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  onNavigate() {
    this.navigateEmitter.emit({
      workCode: this.hit.work.code,
      fragment: `content-${this.hit.ordinal}`,
    });
  }
}
