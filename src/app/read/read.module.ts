import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MessagesModule } from 'primeng/messages';
import { TreeModule } from 'primeng/tree';
import { CheckboxModule } from 'primeng/checkbox';
import { ReadRoutingModule } from './read-routing.module';
import { CommonModule as AppCommonModule } from '../common/common.module';
import { TocSectionComponent } from './text/toc/section/section.component';
import { TextComponent } from './text/text.component';
import { FormsModule } from '@angular/forms';
import { TocComponent } from './text/toc/toc.component';
import { FootnoteComponent } from './text/content/footnote/footnote.component';
import { ContentComponent } from './text/content/content.component';
import { ParagraphComponent } from './text/content/paragraph/paragraph.component';

@NgModule({
  declarations: [
    TextComponent,
    TocComponent,
    TocSectionComponent,
    ContentComponent,
    ParagraphComponent,
    FootnoteComponent,
    TocSectionComponent,
    // TODO selection component
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
