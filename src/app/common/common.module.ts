import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'primeng/tree';
import { WorksMenuComponent } from './shared/works-menu/works-menu.component';
import { TooltipModule } from 'primeng/tooltip';
import { InputGroupComponent } from './shared/input-group/input-group.component';
import { OriginalModePipe } from './pipes/original-mode.pipe';
import { NormalModePipe } from './pipes/normal-mode.pipe';

@NgModule({
  declarations: [
    WorksMenuComponent,
    InputGroupComponent,
    OriginalModePipe,
    NormalModePipe,
  ],
  imports: [NgCommonModule, TranslateModule, TreeModule, TooltipModule],
  exports: [
    WorksMenuComponent,
    NormalModePipe,
    OriginalModePipe,
    InputGroupComponent,
  ],
})
export class CommonModule {}
