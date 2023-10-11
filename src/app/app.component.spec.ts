import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from './app/navbar/navbar.component';
import { MessagesModule } from 'primeng/messages';
import { RouterTestingModule } from '@angular/router/testing';
import { TabMenuModule } from 'primeng/tabmenu';
import { Store } from '@ngrx/store';
import { WorksActions } from './store/works';

class MockTranslateService {
  setDefaultLang = jasmine.createSpy('setDefaultLang');
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockTranslateService: MockTranslateService;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponent],
      providers: [
        {
          provide: MessageService,
          useValue: jasmine.createSpyObj<MessageService>,
        },
        { provide: TranslateService, useClass: MockTranslateService },
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['dispatch']),
        },
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        MessagesModule,
        TabMenuModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockTranslateService = TestBed.inject(TranslateService) as any;
    mockStore = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default language to "en"', () => {
    expect(mockTranslateService.setDefaultLang).toHaveBeenCalledWith('en');
  });

  it('should dispatch loadWorks action', () => {
    expect(mockStore.dispatch).toHaveBeenCalledWith(WorksActions.loadWorks());
  });

  it('should set showButton to true when window.scrollY > 200', () => {
    spyOnProperty(window, 'scrollY').and.returnValue(201);
    component.onWindowScroll();
    expect(component.showButton).toBeTrue();
  });

  it('should set showButton to false when window.scrollY <= 200', () => {
    spyOnProperty(window, 'scrollY').and.returnValue(200);
    component.onWindowScroll();
    expect(component.showButton).toBeFalse();
  });

  it('should call window.scrollTo with correct parameters', () => {
    const scrollSpy = spyOn(window as any, 'scrollTo');
    component.scrollTop();
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
