import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatchInfo } from '../../model/match-info';

@Component({
  selector: 'app-paragraph-dialog',
  templateUrl: './paragraph-dialog.component.html',
})
export class ParagraphDialogComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() info: MatchInfo = {
    workId: 0,
    workTitle: '',
    match: { snippet: '', text: '', pages: [], paragraphId: 0 },
    index: 0,
  } as MatchInfo;

  @Output() isVisibleChange = new EventEmitter<boolean>();

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
}
