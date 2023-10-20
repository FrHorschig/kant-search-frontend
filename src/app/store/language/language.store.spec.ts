import { TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { LanguageStore } from './language.store';

class MockRouter {
  private _events = new Subject();
  private _root: any;

  get events() {
    return this._events.asObservable();
  }
  get routerState() {
    return {
      root: this._root,
    };
  }
  public pushEvent(event: any) {
    this._events.next(event);
  }
  public setRoot(root: any) {
    this._root = root;
  }
  public navigate = jasmine.createSpy('navigate');
}

describe('LanguageStore', () => {
  let store: LanguageStore;
  let mockRouterEvents: Subject<any>;
  let mockTranslateServiceUse: jasmine.Spy;

  beforeEach(() => {
    mockRouterEvents = new Subject();

    TestBed.configureTestingModule({
      providers: [
        LanguageStore,
        { provide: Router, useClass: MockRouter },
        {
          provide: TranslateService,
          useValue: { use: jasmine.createSpy('use') },
        },
      ],
    });

    store = TestBed.inject(LanguageStore);
    mockTranslateServiceUse = TestBed.inject(TranslateService)
      .use as jasmine.Spy;
  });

  it('should have correct initial state', () => {
    store.availableLanguages$.subscribe((languages) => {
      expect(languages).toEqual(['de', 'en']);
    });

    store.currentLanguage$.subscribe((language) => {
      expect(language).toBe('de');
    });
  });

  it('updateCurrentLanguage should set current language and call translateService', () => {
    store.updateCurrentLanguage('en');
    store.currentLanguage$.subscribe((language) => {
      expect(language).toBe('en');
    });
    expect(mockTranslateServiceUse).toHaveBeenCalledWith('en');
  });
});
