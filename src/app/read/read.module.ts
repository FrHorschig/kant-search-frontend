import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MessagesModule } from 'primeng/messages';
import { TreeModule } from 'primeng/tree';
import { CheckboxModule } from 'primeng/checkbox';
import { ReadRoutingModule } from './read-routing.module';
import { CommonModule as AppCommonModule } from '../common/common.module';
import { TextComponent } from './presentational/text/text.component';
import { TocComponent } from './container/toc/toc.component';
import { ReadComponent } from './container/read/read.component';
import { FormsModule } from '@angular/forms';
import { FormatPipe } from './pipes/format.pipe';

@NgModule({
  declarations: [TextComponent, TocComponent, ReadComponent, FormatPipe],
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
