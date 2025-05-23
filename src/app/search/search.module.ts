import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
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
import { ResultItemComponent } from './results/result-item/result-item.component';
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
