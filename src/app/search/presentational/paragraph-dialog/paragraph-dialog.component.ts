import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Match } from 'kant-search-api';

@Component({
  selector: 'app-paragraph-dialog',
  templateUrl: './paragraph-dialog.component.html',
})
export class ParagraphDialogComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() workId = 0;
  @Input() match: Match = { snippet: '', text: '', pages: [], paragraphId: 0 };

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
