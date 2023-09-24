import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { SearchRoutingModule } from './search-routing.module';
import { CommonModule as AppCommonModule } from '../common/common.module';
import { SearchComponent } from './container/search/search.component';
import { ResultsComponent } from './container/results/results.component';
import { ResultListComponent } from './presentational/result-list/result-list.component';
import { SearchInputComponent } from './presentational/search-input/search-input.component';
import { ResultItemComponent } from './presentational/result-item/result-item.component';
import { ParagraphDialogComponent } from './presentational/paragraph-dialog/paragraph-dialog.component';

@NgModule({
  declarations: [
    SearchComponent,
    ResultsComponent,
    SearchInputComponent,
    ResultListComponent,
    ResultItemComponent,
    ParagraphDialogComponent,
  ],
  imports: [
    CommonModule,
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
  ],
})
export class SearchModule {}
