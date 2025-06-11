import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Work } from 'src/app/store/volumes/model';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'ks-work-info',
  templateUrl: './work-info.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzGridModule,
    NzSpaceModule,
    NzDividerModule,
    NzTypographyModule,
  ],
})
export class TocSectionComponent {
  @Input() work: Work = {
    code: '',
    sections: [],
    ordinal: 0,
    title: '',
    volumeNumber: 0,
    volumeTitle: '',
  };
}
