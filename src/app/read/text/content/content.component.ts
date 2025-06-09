import { Component, HostListener, Input } from '@angular/core';
import { Footnote, Summary } from '@frhorschig/kant-search-api';
import { TextContent } from '../model';
import { CommonModule } from '@angular/common';
import { HeadingComponent } from './heading/heading.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ks-content',
  templateUrl: './content.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzFlexModule,
    NzDividerModule,
    NzFloatButtonModule,
    NzToolTipModule,
    NzIconModule,
    HeadingComponent,
    ParagraphComponent,
  ],
})
export class ContentComponent {
  @Input() contents: TextContent[] = [];
  @Input() fnByRef: Map<string, Footnote> | null = new Map();
  @Input() summByRef: Map<string, Summary> | null = new Map();

  showUpButton = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showUpButton = window.scrollY > 200;
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
