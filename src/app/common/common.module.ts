import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { PagenumberNormalModePipe } from './pipes/pagenumber-normal-mode/pagenumber-normal-mode.pipe';

@NgModule({
  declarations: [PagenumberNormalModePipe],
  imports: [NgCommonModule],
  exports: [PagenumberNormalModePipe],
})
export class CommonModule {}
