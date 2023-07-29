import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadRoutingModule } from './read-routing.module';
import { MessagesModule } from 'primeng/messages';
import { TreeModule } from 'primeng/tree';
import { CommonModule as AppCommonModule } from '../common/common.module';
import { NormalModeComponent } from './presentational/normal-mode/normal-mode.component';
import { WorksMenuComponent } from './presentational/works-menu/works-menu.component';
import { TocComponent } from './container/toc/toc.component';
import { TextComponent } from './container/text/text.component';

@NgModule({
  declarations: [
    NormalModeComponent,
    WorksMenuComponent,
    TocComponent,
    TextComponent,
  ],
  imports: [
    CommonModule,
    ReadRoutingModule,
    AppCommonModule,
    MessagesModule,
    TreeModule,
  ],
})
export class ReadModule {}
