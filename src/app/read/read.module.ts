import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MessagesModule } from 'primeng/messages';
import { TreeModule } from 'primeng/tree';
import { ReadRoutingModule } from './read-routing.module';
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
    TranslateModule,
    ReadRoutingModule,
    AppCommonModule,
    MessagesModule,
    TreeModule,
  ],
})
export class ReadModule {}
