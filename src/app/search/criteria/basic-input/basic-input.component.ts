import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorksGroup } from '../../model/works-group';
import { Volume } from '@frhorschig/kant-search-api';
import { NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeNodeKey } from 'ng-zorro-antd/core/tree';
import { WorksGroupUtil } from '../../util/works-group-util';
import { TitleUtil } from '../../util/title-util';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LanguageStore } from 'src/app/store/language/language.store';
import { SubscriptionComponent } from 'src/app/common/base/container.component';
import { filter } from 'rxjs';

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
export class BasicInputComponent
  extends SubscriptionComponent
  implements OnInit
{
  @Input() volumes: Volume[] = [];
  @Input() canSearch: boolean = false;

  @Output() searchTermsEmitter = new EventEmitter<string>();
  @Output() workCodesEmitter = new EventEmitter<string[]>();
  @Output() doSearchEmitter = new EventEmitter<void>();

  searchTerms: string = '';

  worksGroupOptions = Object.values(WorksGroup).filter(
    (value) => typeof value === 'number' && value !== 99
  ) as WorksGroup[];
  worksGroup: WorksGroup | null = null;

  nodes: NzTreeNodeOptions[] = [];
  checkedKeys: string[] = [];

  constructor(
    private readonly translateService: TranslateService,
    private readonly langStore: LanguageStore
  ) {
    super();
  }

  ngOnInit() {
    this.langStore.ready$
      .pipe(
        filter((ready) => ready),
        this.takeUntilDestroy()
      )
      .subscribe(() => this.buildNodes());
    this.worksGroup = WorksGroup.ALL;
    this.checkedKeys = WorksGroupUtil.getCodes(WorksGroup.ALL);
    this.workCodesEmitter.emit(this.checkedKeys);
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
    this.workCodesEmitter.emit(this.checkedKeys);
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
    this.workCodesEmitter.emit(codes);
  }

  onSubmit() {
    this.doSearchEmitter.emit();
  }

  private buildNodes() {
    this.nodes = this.volumes.map((vol) => {
      const children = vol.works.map((work) => {
        return {
          title: TitleUtil.truncate(work.title, 75),
          key: work.code,
          isLeaf: true,
        };
      });
      return {
        title: this.translateService.instant('COMMON.VOL_WORK_TITLE', {
          volumeNumber: vol.volumeNumber,
          title: vol.title,
        }),
        key: `volume-${vol.volumeNumber}`,
        children: children,
      };
    });
  }
}
