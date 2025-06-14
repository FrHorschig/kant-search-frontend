import { Volume, Work } from '@frhorschig/kant-search-api';
import { EMPTY, Observable } from 'rxjs';

export class MockVolumesStore {
  volumes$: Observable<Volume[]> = EMPTY;
  workByCode$: Observable<Map<string, Work>> = EMPTY;
  isLoaded$: Observable<boolean> = EMPTY;

  loadData = jasmine.createSpy('loadData');
}
