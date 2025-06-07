import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { TreeModule } from 'primeng/tree';
import { SearchRoutingModule } from './search-routing.module';
import { CommonModule as AppCommonModule } from '../common/common.module';
import { ResultListComponent } from './results/result-list/result-list.component';
import { ResultItemComponent } from './results/result-list/result-item/result-item.component';
import { ParagraphDialogComponent } from './results/paragraph-dialog/paragraph-dialog.component';
import { RemovePaginationPipe } from './pipes/remove-pagination.pipe';
import { AdvancedInputComponent } from './criteria/advanced-input/advanced-input.component';
import { BasicInputComponent } from './criteria/basic-input/basic-input.component';
import { ResultsInputComponent } from './results/results-input/results-input.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    CriteriaComponent,
    ResultsComponent,
    ResultListComponent,
    ResultItemComponent,
    ParagraphDialogComponent,
    RemovePaginationPipe,
    BasicInputComponent,
    AdvancedInputComponent,
    ResultsInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SearchRoutingModule,
    AppCommonModule,
    ButtonModule,
    NzFlexModule,
    NzGridModule,
    NzSpaceModule,
    NzButtonModule,
    NzToolTipModule,
    NzSelectModule,
    NzDividerModule,
    NzSwitchModule,
    NzModalModule,
    NzTreeModule,
    NzInputModule,
    NzCardModule,
    NzCollapseModule,
    NzTypographyModule,
    NzIconModule,
    CardModule,
    DialogModule,
    DividerModule,
    InputTextModule,
    MessagesModule,
    TooltipModule,
    DropdownModule,
    TreeModule,
  ],
})
export class SearchModule {}
