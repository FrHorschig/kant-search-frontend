import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzFormatEmitEvent, NzTreeNodeKey } from 'ng-zorro-antd/core/tree';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TranslateModule } from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { all, custom } from '../../model/search-options';
import { WorkGroup } from 'src/app/app/config/config.store';

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
  @Input() workGroups: WorkGroup[] = [];

  @Output() searchTermsEmitter = new EventEmitter<string>();
  @Output() workCodesEmitter = new EventEmitter<string[]>();
  @Output() doSearchEmitter = new EventEmitter<void>();

  searchTerms: string = '';
  group: WorkGroup | null = null;

  checkedKeys: string[] = [];
  expandedKeys: string[] = [];

  onSearchTermsChange(terms: string) {
    this.searchTerms = terms;
    this.searchTermsEmitter.emit(this.searchTerms);
  }

  onSelectChange(group: WorkGroup | null) {
    this.group = group;
    if (group !== custom && this.workGroups.includes(custom)) {
      this.workGroups = this.workGroups.filter((wg) => wg !== custom);
    }
    this.checkedKeys = group?.codes ?? [];
    this.workCodesEmitter.emit(this.checkedKeys);
  }

  onCheckedKeysChange(keys: NzTreeNodeKey[]) {
    this.checkedKeys = keys.filter((k) => typeof k === 'string');
    const codes = this.checkedKeys.filter((key) => !key.startsWith('volume-'));
    const group = this.getGroup(codes);
    if (group === custom) {
      if (!this.workGroups.includes(custom)) {
        this.workGroups = [...this.workGroups, custom];
      }
    } else {
      this.workGroups = this.workGroups.filter((wg) => wg !== custom);
    }
    this.group = group;
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

  private getGroup(codes: string[]): WorkGroup | null {
    if (codes.length === 0) {
      return null;
    }
    if (codes.length === all.codes.length) {
      return all;
    }

    codes.sort();
    for (const wg of this.workGroups) {
      if (
        codes.length === wg.codes.length &&
        codes.every((c, i) => c === wg.codes[i])
      ) {
        return wg;
      }
    }
    return custom;
  }
}
