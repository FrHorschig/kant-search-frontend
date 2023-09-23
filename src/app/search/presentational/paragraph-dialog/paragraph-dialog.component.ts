import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-paragraph-dialog',
  templateUrl: './paragraph-dialog.component.html',
})
export class ParagraphDialogComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() workId = 0;
  @Input() paragraphId = 0;
  @Input() text = '';
  @Input() pages: number[] = [];

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
