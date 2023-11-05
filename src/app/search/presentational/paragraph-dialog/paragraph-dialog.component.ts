import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatchInfo } from '../../model/match-info';
import { FullTextInfo } from '../../model/full-text-info';

@Component({
  selector: 'app-paragraph-dialog',
  templateUrl: './paragraph-dialog.component.html',
})
export class ParagraphDialogComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() info: MatchInfo = {
    workId: 0,
    workCode: '',
    match: { snippet: '', text: '', pages: [], paragraphId: 0 },
    index: 0,
  } as MatchInfo;

  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() navigateEmitter = new EventEmitter<FullTextInfo>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible']) {
      this.isVisible = changes['isVisible'].currentValue;
      this.isVisibleChange.emit(this.isVisible);
    }
  }

  onHide() {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  onNavigate() {
    this.navigateEmitter.emit({
      workId: this.info.workId,
      fragment: `paragraph-${this.info.match.paragraphId}`,
    });
  }
}
