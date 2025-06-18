import { Component } from '@angular/core';
import { AdvancedOptions } from '../model/search-options';
import { CriteriaStore } from './criteria.store';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { BasicInputComponent } from './basic-input/basic-input.component';
import { AdvancedInputComponent } from './advanced-input/advanced-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ks-criteria',
  templateUrl: './criteria.component.html',
  providers: [CriteriaStore],
  standalone: true,
  imports: [
    CommonModule,
    NzSpaceModule,
    BasicInputComponent,
    AdvancedInputComponent,
  ],
})
export class CriteriaComponent {
  nodes$ = this.store.nodes$;
  canSearch$ = this.store.canSearch$;
  options$ = this.store.options$;

  defaultCodeSet = new Set<string>();
  showWorksSelectDialog = false;

  constructor(private readonly store: CriteriaStore) {}

  onSearchTermsChange(searchTerms: string) {
    this.store.putSearchTerms(searchTerms);
  }

  onWorkCodesChange(workCodes: string[]) {
    this.store.putWorkCodes(workCodes);
  }

  onSearch() {
    this.store.navigateSearch();
  }

  onOptionsChange(options: AdvancedOptions) {
    this.store.putOptions(options);
  }
}
