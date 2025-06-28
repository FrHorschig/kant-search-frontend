import { EMPTY, Observable } from 'rxjs';
import { AdvancedOptions } from '../model/search-options';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

export class MockCriteriaStore {
  nodes$: Observable<NzTreeNodeOptions[]> = EMPTY;
  options$: Observable<AdvancedOptions> = EMPTY;
  canSearch$: Observable<boolean> = EMPTY;
  ready$: Observable<boolean> = EMPTY;

  navigateSearch = jasmine.createSpy('navigateSearch');
  putSearchTerms = jasmine.createSpy('putSearchTerms');
  putWorkCodes = jasmine.createSpy('putWorkCodes');
  putOptions = jasmine.createSpy('putOptions');
}
