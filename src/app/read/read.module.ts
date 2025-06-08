import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
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
import { SelectionComponent } from './selection/selection.component';
import { SummaryComponent } from './text/content/summary/summary.component';
import { HeadingComponent } from './text/content/heading/heading.component';

@NgModule({
  declarations: [
    SelectionComponent,
    TextComponent,
    TocComponent,
    TocSectionComponent,
    ContentComponent,
    HeadingComponent,
    ParagraphComponent,
    FootnoteComponent,
    SummaryComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    TranslateModule,
    ReadRoutingModule,
    AppCommonModule,
    MessagesModule,
    NzFlexModule,
    NzSpaceModule,
    NzDividerModule,
    NzListModule,
    NzTreeModule,
    NzCardModule,
    TreeModule,
    CheckboxModule,
  ],
})
export class ReadModule {}
