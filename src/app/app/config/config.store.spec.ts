import { EMPTY, Observable } from 'rxjs';
import { WorkGroup } from './config.store';

export class MockConfigStore {
  korporaUrl$: Observable<string> = EMPTY;
  workGroups$: Observable<WorkGroup[]> = EMPTY;

  init = jasmine.createSpy('init');
  navigateToSection = jasmine.createSpy('navigateToSection');
}
