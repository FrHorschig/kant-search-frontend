import { Component, Input } from '@angular/core';
import { Footnote, Summary } from '@frhorschig/kant-search-api';
import { TextContent } from '../model';
import { CommonModule } from '@angular/common';
import { HeadingComponent } from './heading/heading.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ks-content',
  templateUrl: './content.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzFlexModule,
    NzDividerModule,
    HeadingComponent,
    ParagraphComponent,
  ],
})
export class ContentComponent {
  @Input() contents: TextContent[] = [];
  @Input() fnByRef: Map<string, Footnote> | null = new Map();
  @Input() summByRef: Map<string, Summary> | null = new Map();
}
