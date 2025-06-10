// import { TestBed } from '@angular/core/testing';
// import { NavigationEnd, Router, RouterModule } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
// import { ReplaySubject } from 'rxjs';
// import { LanguageStore } from './language.store';

// describe('LanguageStore', () => {
//   let store: LanguageStore;
//   let router: Router;
//   const emitNavigationEndEvent = (url: string) => {
//     (router.events as ReplaySubject<any>).next(new NavigationEnd(0, url, url));
//   };

//   beforeEach(() => {
//     const mockTranslateService = jasmine.createSpyObj('TranslateService', [
//       'use',
//     ]);

//     TestBed.configureTestingModule({
//       providers: [
//         LanguageStore,
//         { provide: TranslateService, useValue: mockTranslateService },
//       ],
//       imports: [RouterModule.forRoot([])],
//     });

//     store = TestBed.inject(LanguageStore);
//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//   });

//   it('should have correct initial state', () => {
//     store.availableLanguages$.subscribe((languages) => {
//       expect(languages).toEqual(['de', 'en']);
//     });

//     store.currentLanguage$.subscribe((language) => {
//       expect(language).toBe('de');
//     });
//   });

//   it('should change the current language when updateCurrentLanguage is called', () => {
//     spyOn(router, 'navigateByUrl');
//     const newLang = 'en';
//     store.updateCurrentLanguage(newLang);
//     expect(router.navigateByUrl).toHaveBeenCalledWith(newLang);
//   });

//   it('should navigate to "not-found" if language is not available', () => {
//     spyOn(router, 'navigate');
//     emitNavigationEndEvent(`abcdef/another/path`);
//     expect(router.navigate).toHaveBeenCalledWith(['/not-found']);
//   });
// });
