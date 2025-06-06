import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { TooltipModule } from 'primeng/tooltip';
import { InputGroupComponent } from './shared/input-group/input-group.component';
import { LinkButtonComponent } from './shared/link-button/link-button.component';
import { PaginationPipe } from './pipes/pagination.pipe';
import { TextBlockComponent } from './shared/text-block/text-block.component';
import { LabeledSwitchComponent } from './shared/labeled-switch/labeled-switch.component';

@NgModule({
  declarations: [
    InputGroupComponent,
    LabeledSwitchComponent,
    LinkButtonComponent,
    PaginationPipe,
    TextBlockComponent,
  ],
  imports: [
    NgCommonModule,
    TranslateModule,
    NzGridModule,
    NzIconModule,
    NzToolTipModule,
    TreeModule,
    TooltipModule,
    ButtonModule,
  ],
  exports: [
    PaginationPipe,
    InputGroupComponent,
    LabeledSwitchComponent,
    LinkButtonComponent,
    TextBlockComponent,
  ],
})
export class CommonModule {}
