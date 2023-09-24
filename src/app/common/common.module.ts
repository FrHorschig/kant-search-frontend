import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'primeng/tree';
import { PagenumberNormalModePipe } from './pipes/pagenumber-normal-mode.pipe';
import { WorksMenuComponent } from './shared/works-menu/works-menu.component';
import { TooltipModule } from 'primeng/tooltip';
import { InputGroupComponent } from './shared/input-group/input-group.component';

@NgModule({
  declarations: [
    WorksMenuComponent,
    PagenumberNormalModePipe,
    InputGroupComponent,
  ],
  imports: [NgCommonModule, TranslateModule, TreeModule, TooltipModule],
  exports: [WorksMenuComponent, PagenumberNormalModePipe, InputGroupComponent],
})
export class CommonModule {}
