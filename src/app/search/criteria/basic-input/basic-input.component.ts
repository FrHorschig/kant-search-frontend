import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Volume } from '@frhorschig/kant-search-api';
import { NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzFormatEmitEvent, NzTreeNodeKey } from 'ng-zorro-antd/core/tree';
import { WorksGroupUtil } from '../../util/works-group-util';
import { TitleUtil } from '../../../common/util/title-util';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LanguageStore } from 'src/app/common/store/language/language.store';
import { SubscriptionComponent } from 'src/app/common/base/container.component';
import { filter } from 'rxjs';
import { WorksGroup } from '../../model/search-options';

@Component({
  selector: 'ks-basic-input',
  templateUrl: './basic-input.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NzSpaceModule,
    NzButtonModule,
    NzTreeModule,
    NzCardModule,
    NzSelectModule,
    NzInputModule,
    NzToolTipModule,
  ],
})
export class BasicInputComponent {
  @Input() nodes: NzTreeNodeOptions[] = [];
  @Input() canSearch: boolean = false;

  @Output() searchTermsEmitter = new EventEmitter<string>();
  @Output() workCodesEmitter = new EventEmitter<string[]>();
  @Output() doSearchEmitter = new EventEmitter<void>();

  searchTerms: string = '';

  worksGroupOptions = Object.values(WorksGroup).filter(
    (value) => value !== 'CUSTOM'
  ) as WorksGroup[];
  worksGroup: WorksGroup | null = null;

  checkedKeys: string[] = [];
  expandedKeys: string[] = [];

  onSearchTermsChange(terms: string) {
    this.searchTerms = terms;
    this.searchTermsEmitter.emit(this.searchTerms);
  }

  onSelectChange(group: WorksGroup) {
    this.worksGroup = group;
    if (
      group !== WorksGroup.Custom &&
      this.worksGroupOptions.includes(WorksGroup.Custom)
    ) {
      this.worksGroupOptions = this.worksGroupOptions.filter(
        (opt) => opt !== WorksGroup.Custom
      );
    }
    this.checkedKeys = WorksGroupUtil.getCodes(group);
    this.workCodesEmitter.emit(this.checkedKeys);
  }

  onCheckedKeysChange(keys: NzTreeNodeKey[]) {
    this.checkedKeys = keys.filter((k) => typeof k === 'string');
    const codes = this.checkedKeys.filter((key) => !key.startsWith('volume-'));
    const group = WorksGroupUtil.getGroup(codes);
    if (group === WorksGroup.Custom) {
      if (!this.worksGroupOptions.includes(WorksGroup.Custom)) {
        this.worksGroupOptions = [...this.worksGroupOptions, WorksGroup.Custom];
      }
    } else {
      this.worksGroupOptions = this.worksGroupOptions.filter(
        (opt) => opt !== WorksGroup.Custom
      );
    }
    this.worksGroup = group;
    this.workCodesEmitter.emit(codes);
  }

  onNodeClick(event: NzFormatEmitEvent) {
    const key = event.node?.key ?? '';
    if (key.startsWith('volume-')) {
      const set = new Set(this.expandedKeys);
      if (set.has(key)) {
        set.delete(key);
        this.expandedKeys = Array.from(set);
        event.node?.setExpanded(false);
      } else {
        set.add(key);
        this.expandedKeys = Array.from(set);
        event.node?.setExpanded(true);
      }
    }
  }

  onSubmit() {
    this.doSearchEmitter.emit();
  }
}
