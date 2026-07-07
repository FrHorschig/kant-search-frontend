
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { emptyWork, Work } from 'src/app/common/model/model';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'ks-notes',
  templateUrl: './notes.component.html',
  imports: [TranslateModule, NzDividerModule],
})
export class NotesComponent {
  @Input() work: Work = emptyWork;
  @Input() korporaUrl: string = '';

  geWithLeadingZeros(num: number) {
    return num.toString().padStart(2, '0');
  }
}
