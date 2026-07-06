import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'ks-not-found',
  templateUrl: './not-found.component.html',
  imports: [TranslateModule, NzFlexModule],
})
export class NotFoundComponent {}
