import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MessagesModule } from 'primeng/messages';
import { TreeModule } from 'primeng/tree';
import { ReadRoutingModule } from './read-routing.module';
import { CommonModule as AppCommonModule } from '../common/common.module';
import { NormalModeComponent } from './presentational/normal-mode/normal-mode.component';
import { TocComponent } from './container/toc/toc.component';
import { TextComponent } from './container/text/text.component';
import { OriginalModeComponent } from './presentational/original-mode/original-mode.component';

@NgModule({
  declarations: [
    NormalModeComponent,
    TocComponent,
    TextComponent,
    OriginalModeComponent,
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
