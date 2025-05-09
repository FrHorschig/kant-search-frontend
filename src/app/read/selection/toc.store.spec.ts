import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LanguageStore } from 'src/app/store/language/language.store';
import { TocStore } from './toc.store';

describe('TocStore', () => {
  let store: TocStore;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLangStore: jasmine.SpyObj<LanguageStore>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockLangStore = jasmine.createSpyObj('LanguageStore', [], {
      currentLanguage$: of('en'),
    });

    TestBed.configureTestingModule({
      providers: [
        TocStore,
        { provide: Router, useValue: mockRouter },
        { provide: LanguageStore, useValue: mockLangStore },
      ],
    });

    store = TestBed.inject(TocStore);
  });

  it('should navigate correctly based on workId and current language', () => {
    store.navigateToText(of(123));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/en/read/text', 123]);
  });
});
