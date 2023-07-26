import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadRoutingModule } from './read-routing.module';
import { MessagesModule } from 'primeng/messages';
import { TreeModule } from 'primeng/tree';
import { CommonModule as AppCommonModule } from '../common/common.module';
import { ReadComponent } from './read/read.component';
import { NormalModeComponent } from './normal-mode/normal-mode.component';
import { WorksMenuComponent } from './works-menu/works-menu.component';

@NgModule({
  declarations: [ReadComponent, NormalModeComponent, WorksMenuComponent],
  imports: [
    CommonModule,
    ReadRoutingModule,
    AppCommonModule,
    MessagesModule,
    TreeModule,
  ],
})
export class ReadModule {}
