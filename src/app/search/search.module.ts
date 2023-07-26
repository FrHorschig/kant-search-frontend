import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import { WorksMenuComponent } from './works-menu/works-menu.component';

@NgModule({
  declarations: [SearchComponent, WorksMenuComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    TranslateModule,
    ButtonModule,
    InputTextModule,
    MessagesModule,
    TooltipModule,
    TreeModule,
  ],
})
export class SearchModule {}
