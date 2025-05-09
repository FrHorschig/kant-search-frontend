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
import { TextBlockComponent } from './shared/block/block.component';

@NgModule({
  declarations: [
    WorksMenuComponent,
    InputGroupComponent,
    LinkButtonComponent,
    PaginationPipe,
    TextBlockComponent,
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
    TextBlockComponent,
  ],
})
export class CommonModule {}
