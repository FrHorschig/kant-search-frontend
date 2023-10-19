import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { WorksMenuComponent } from './shared/works-menu/works-menu.component';
import { TooltipModule } from 'primeng/tooltip';
import { InputGroupComponent } from './shared/input-group/input-group.component';
import { LinkButtonComponent } from './shared/link-button/link-button.component';
import { PaginationPipe } from './pipes/pagination.pipe';

@NgModule({
  declarations: [
    WorksMenuComponent,
    InputGroupComponent,
    LinkButtonComponent,
    PaginationPipe,
  ],
  imports: [
    NgCommonModule,
    TranslateModule,
    TreeModule,
    TooltipModule,
    ButtonModule,
  ],
  exports: [
    WorksMenuComponent,
    PaginationPipe,
    InputGroupComponent,
    LinkButtonComponent,
  ],
})
export class CommonModule {}
