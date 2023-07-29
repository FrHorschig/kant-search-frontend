import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'primeng/tree';
import { PagenumberNormalModePipe } from './pipes/pagenumber-normal-mode/pagenumber-normal-mode.pipe';
import { HighlightSearchTermsPipe } from './pipes/highlight-search-terms/highlight-search-terms.pipe';
import { WorksMenuComponent } from './shared/works-menu/works-menu.component';

@NgModule({
  declarations: [
    WorksMenuComponent,
    PagenumberNormalModePipe,
    HighlightSearchTermsPipe,
  ],
  imports: [NgCommonModule, TranslateModule, TreeModule],
  exports: [
    WorksMenuComponent,
    PagenumberNormalModePipe,
    HighlightSearchTermsPipe,
  ],
})
export class CommonModule {}
