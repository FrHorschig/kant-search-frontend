import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { PagenumberNormalModePipe } from './pipes/pagenumber-normal-mode/pagenumber-normal-mode.pipe';
import { HighlightSearchTermsPipe } from './pipes/highlight-search-terms/highlight-search-terms.pipe';

@NgModule({
  declarations: [PagenumberNormalModePipe, HighlightSearchTermsPipe],
  imports: [NgCommonModule],
  exports: [PagenumberNormalModePipe],
})
export class CommonModule {}
