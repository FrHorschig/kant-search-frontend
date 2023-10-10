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
import { SearchComponent } from './container/search/search.component';
import { ResultsComponent } from './container/results/results.component';
import { ResultListComponent } from './presentational/result-list/result-list.component';
import { ResultItemComponent } from './presentational/result-item/result-item.component';
import { ParagraphDialogComponent } from './presentational/paragraph-dialog/paragraph-dialog.component';
import { RemovePaginationPipe } from './pipes/remove-pagination.pipe';
import { SimpleInputComponent } from './presentational/simple-input/simple-input.component';
import { AdvancedInputComponent } from './presentational/advanced-input/advanced-input.component';
import { CheckboxWorksMenuComponent } from './presentational/checkbox-works-menu/checkbox-works-menu.component';

@NgModule({
  declarations: [
    SearchComponent,
    ResultsComponent,
    ResultListComponent,
    ResultItemComponent,
    ParagraphDialogComponent,
    RemovePaginationPipe,
    SimpleInputComponent,
    AdvancedInputComponent,
    CheckboxWorksMenuComponent,
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
