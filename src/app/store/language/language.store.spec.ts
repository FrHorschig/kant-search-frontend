import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { LanguageStore } from './language.store';

describe('LanguageStore', () => {
  let sut: LanguageStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageStore],
    });

    sut = TestBed.inject(LanguageStore);
  });
});
