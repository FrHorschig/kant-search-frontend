import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HitMetadata } from '../../model/hit-metadata';
import { FullTextInfo } from '../../model/full-text-info';

@Component({
  selector: 'ks-paragraph-dialog',
  templateUrl: './paragraph-dialog.component.html',
  standalone: false,
})
export class ParagraphDialogComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() metadata: HitMetadata = {
    workCode: '',
    hit: { ordinal: 0, pages: [], snippets: [] },
    index: 0,
  } as HitMetadata;

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
      workCode: this.metadata.workCode,
      fragment: `paragraph-${this.metadata.hit.ordinal}`,
    });
  }
}
