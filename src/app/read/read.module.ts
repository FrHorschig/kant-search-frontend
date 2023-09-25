import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MessagesModule } from 'primeng/messages';
import { TreeModule } from 'primeng/tree';
import { CheckboxModule } from 'primeng/checkbox';
import { ReadRoutingModule } from './read-routing.module';
import { CommonModule as AppCommonModule } from '../common/common.module';
import { NormalModeComponent } from './presentational/normal-mode/normal-mode.component';
import { TocComponent } from './container/toc/toc.component';
import { TextComponent } from './container/text/text.component';
import { OriginalModeComponent } from './presentational/original-mode/original-mode.component';
import { FormsModule } from '@angular/forms';
import { OriginalModePipe } from './pipes/original-mode.pipe';

@NgModule({
  declarations: [
    NormalModeComponent,
    TocComponent,
    TextComponent,
    OriginalModeComponent,
    OriginalModePipe,
  ],
  imports: [
    FormsModule,
    CommonModule,
    TranslateModule,
    ReadRoutingModule,
    AppCommonModule,
    MessagesModule,
    TreeModule,
    CheckboxModule,
  ],
})
export class ReadModule {}
