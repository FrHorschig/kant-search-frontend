import { EMPTY, Observable } from 'rxjs';

export class MockLanguageStore {
  availableLanguages$: Observable<string[]> = EMPTY;
  currentLanguage$: Observable<string> = EMPTY;
  ready$: Observable<boolean> = EMPTY;

  updateCurrentLanguage = jasmine.createSpy('updateCurrentLanguage');
  init = jasmine.createSpy('init');
}
