import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HitData } from '../../model/hit-data';
import { FullTextInfo } from '../../model/full-text-info';
import { TitleUtil } from '../../util/title-util';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ks-paragraph-dialog',
  templateUrl: './paragraph-dialog.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    NzFlexDirective,
    NzButtonComponent,
    NzModalModule,
    NzToolTipModule,
    NzIconModule,
    TextBlockComponent,
  ],
})
export class ParagraphDialogComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() data: HitData = {
    work: { code: '', sections: [], ordinal: 0, title: '', volumeNumber: 0 },
    snippets: [],
    text: '',
    ordinal: 0,
    index: 0,
  } as HitData;

  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() navigateEmitter = new EventEmitter<FullTextInfo>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible']) {
      this.isVisible = changes['isVisible'].currentValue;
      this.isVisibleChange.emit(this.isVisible);
    }
  }

  getWorkTitle(): string {
    return TitleUtil.truncate(this.data.work.title, 70);
  }

  getTextWithHighlights(): string {
    const highlightRegex = /<ks-meta-hit>(.*?)<\/ks-meta-hit>/g;
    const highlights = new Set<string>();
    for (const snippet of this.data.snippets) {
      let match: RegExpExecArray | null;
      while ((match = highlightRegex.exec(snippet)) !== null) {
        highlights.add(match[1]);
      }
    }

    let highlighted = this.data.text;
    for (const hl of highlights) {
      highlighted = highlighted.replaceAll(
        hl,
        `<ks-meta-hit>${hl}</ks-meta-hit>`
      );
    }
    return highlighted;
  }

  onHide() {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  onNavigate() {
    this.navigateEmitter.emit({
      workCode: this.data.work.code,
      fragment: `content-${this.data.ordinal}`,
    });
  }
}
