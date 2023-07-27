import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import { CommonModule as AppCommonModule } from '../common/common.module';
import { WorksMenuComponent } from './works-menu/works-menu.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [SearchComponent, WorksMenuComponent, ResultsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    AppCommonModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MessagesModule,
    TooltipModule,
    TreeModule,
  ],
})
export class SearchModule {}
