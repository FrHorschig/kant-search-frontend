import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { InputGroupComponent } from './shared/input-group/input-group.component';
import { LinkButtonComponent } from './shared/link-button/link-button.component';
import { PaginationPipe } from './pipes/pagination.pipe';
import { TextBlockComponent } from './shared/text-block/text-block.component';
import { RightLabeledInputComponent } from './shared/right-labeled-input/right-labeled-input.component';

@NgModule({
  declarations: [
    InputGroupComponent,
    RightLabeledInputComponent,
    LinkButtonComponent,
    PaginationPipe,
    TextBlockComponent,
  ],
  imports: [
    NgCommonModule,
    TranslateModule,
    NzNotificationModule,
    NzGridModule,
    NzSpaceModule,
    NzIconModule,
    NzToolTipModule,
  ],
  exports: [
    PaginationPipe,
    InputGroupComponent,
    RightLabeledInputComponent,
    LinkButtonComponent,
    TextBlockComponent,
  ],
})
export class CommonModule {}
