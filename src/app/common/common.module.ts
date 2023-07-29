import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'primeng/tree';
import { PagenumberNormalModePipe } from './pipes/pagenumber-normal-mode/pagenumber-normal-mode.pipe';
import { WorksMenuComponent } from './shared/works-menu/works-menu.component';

@NgModule({
  declarations: [WorksMenuComponent, PagenumberNormalModePipe],
  imports: [NgCommonModule, TranslateModule, TreeModule],
  exports: [WorksMenuComponent, PagenumberNormalModePipe],
})
export class CommonModule {}
