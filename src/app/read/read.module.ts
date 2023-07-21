import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadRoutingModule } from './read-routing.module';
import { TreeModule } from 'primeng/tree';
import { ReadComponent } from './read/read.component';
import { NormalModeComponent } from './normal-mode/normal-mode.component';
import { WorkMenuComponent } from './work-menu/work-menu.component';

@NgModule({
  declarations: [ReadComponent, NormalModeComponent, WorkMenuComponent],
  imports: [CommonModule, ReadRoutingModule, TreeModule],
})
export class ReadModule {}
