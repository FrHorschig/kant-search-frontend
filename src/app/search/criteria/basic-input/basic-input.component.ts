import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorksGroup } from '../../model/works-group';
import { Volume } from '@frhorschig/kant-search-api';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeNodeKey } from 'ng-zorro-antd/core/tree';
import { WorksGroupUtil } from '../../util/works-group-util';

@Component({
  selector: 'ks-basic-input',
  templateUrl: './basic-input.component.html',
  standalone: false,
})
export class BasicInputComponent implements OnInit {
  @Input() volumes: Volume[] = [];
  @Input() canSearch: boolean = false;

  @Output() searchTermsEmitter = new EventEmitter<string>();
  @Output() workCodesEmitter = new EventEmitter<Set<string>>();
  @Output() doSearchEmitter = new EventEmitter<void>();

  searchTerms: string = '';

  // customGroup = WorksGroup.CUSTOM;
  worksGroupOptions = Object.values(WorksGroup).filter(
    (value) => typeof value === 'number' && value !== 99
  ) as WorksGroup[];
  worksGroup: WorksGroup | null = null;

  nodes: NzTreeNodeOptions[] = [];
  checkedKeys: string[] = [];

  constructor() {}

  ngOnInit() {
    this.nodes = this.volumes.map((vol) => {
      const children = vol.works.map((work) => {
        return {
          title: this.truncate(work.title),
          key: work.code,
          isLeaf: true,
        };
      });
      return {
        title: vol.title,
        key: `volume-${vol.volumeNumber}`,
        children: children,
      };
    });
    this.worksGroup = WorksGroup.ALL;
    this.checkedKeys = WorksGroupUtil.getCodes(WorksGroup.ALL);
    this.workCodesEmitter.emit(new Set(this.checkedKeys));
  }

  getWorksGroupString(value: WorksGroup): string {
    return WorksGroup[value];
  }

  onSearchTermsChange(terms: string) {
    this.searchTerms = terms;
    this.searchTermsEmitter.emit(this.searchTerms);
  }

  onSelectChange(group: WorksGroup) {
    this.worksGroup = group;
    if (
      group !== WorksGroup.CUSTOM &&
      this.worksGroupOptions.includes(WorksGroup.CUSTOM)
    ) {
      this.worksGroupOptions = this.worksGroupOptions.filter(
        (opt) => opt !== WorksGroup.CUSTOM
      );
    }
    this.checkedKeys = WorksGroupUtil.getCodes(group);
    this.workCodesEmitter.emit(new Set(this.checkedKeys));
  }

  onCheckedKeysChange(keys: NzTreeNodeKey[]) {
    this.checkedKeys = keys.filter((k) => typeof k === 'string');
    const codes = this.checkedKeys.filter((key) => !key.startsWith('volume-'));
    const group = WorksGroupUtil.getGroup(codes);
    if (group === WorksGroup.CUSTOM) {
      if (!this.worksGroupOptions.includes(WorksGroup.CUSTOM)) {
        this.worksGroupOptions = [...this.worksGroupOptions, WorksGroup.CUSTOM];
      }
    } else {
      this.worksGroupOptions = this.worksGroupOptions.filter(
        (opt) => opt !== WorksGroup.CUSTOM
      );
    }
    this.worksGroup = group;
    this.workCodesEmitter.emit(new Set(codes));
  }

  onSubmit() {
    this.doSearchEmitter.emit();
  }

  private truncate(str: string): string {
    // TODO make max len configurable
    const maxLength = 75;
    if (str.length <= maxLength) {
      return str;
    }

    const truncated = str.slice(0, maxLength - 4);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    if (lastSpaceIndex === -1) {
      return truncated + ' ...';
    }
    return truncated.slice(0, lastSpaceIndex) + '...';
  }
}
