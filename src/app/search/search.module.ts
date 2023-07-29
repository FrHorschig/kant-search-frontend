import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { SearchRoutingModule } from './search-routing.module';
import { CommonModule as AppCommonModule } from '../common/common.module';
import { SearchComponent } from './container/search/search.component';
import { ResultsComponent } from './container/results/results.component';
import { ResultListComponent } from './presentational/result-list/result-list.component';
import { WorksMenuComponent } from './presentational/works-menu/works-menu.component';
import { SearchInputComponent } from './presentational/search-input/search-input.component';
import { ResultItemComponent } from './presentational/result-item/result-item.component';

@NgModule({
  declarations: [
    SearchComponent,
    ResultsComponent,
    SearchInputComponent,
    WorksMenuComponent,
    ResultListComponent,
    ResultItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    AppCommonModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    DividerModule,
    InputTextModule,
    MessagesModule,
    TooltipModule,
    TreeModule,
  ],
})
export class SearchModule {}
