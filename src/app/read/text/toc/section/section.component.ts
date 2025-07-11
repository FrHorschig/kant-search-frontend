import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Heading, Section } from '@frhorschig/kant-search-api';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorService } from 'src/app/common/service/error.service';

@Component({
  selector: 'ks-toc-section',
  templateUrl: './section.component.html',
  standalone: true,
  imports: [CommonModule, TranslateModule, NzFlexModule],
})
export class TocSectionComponent {
  @Input() level: number = 0;
  @Input() section: Section | undefined;
  @Input() headByOrdinal: Map<number, Heading> | null = new Map();

  @Output() onClickEmitter = new EventEmitter<number>();

  constructor(private readonly errService: ErrorService) {}

  getHeading(ordinal: number): Heading | undefined {
    const heading = this.headByOrdinal?.get(ordinal);
    if (!heading) {
      this.errService.logError(
        new Error('heading with ordinal ' + ordinal + ' not found')
      );
      return undefined;
    }
    return heading;
  }

  onClick(ordinal: number) {
    this.onClickEmitter.emit(ordinal);
  }
}
