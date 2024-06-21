import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { TabMenuModule } from 'primeng/tabmenu';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { Testdata } from './common/test/testdata';
import { WorksStore } from './store/works/works.store';

class MockTranslateService {
  setDefaultLang = jasmine.createSpy('setDefaultLang');
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockTranslateService: MockTranslateService;
  let worksStore = jasmine.createSpyObj('WorksStore', ['loadData'], {});

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
          useValue: jasmine.createSpyObj('Store', ['dispatch']),
        },
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        MessagesModule,
        TabMenuModule,
        MenuModule,
      ],
    })
      .overrideProvider(WorksStore, { useValue: worksStore })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockTranslateService = TestBed.inject(TranslateService) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default language to "de"', () => {
    expect(mockTranslateService.setDefaultLang).toHaveBeenCalledWith('de');
  });

  it('should dispatch loadWorks action', () => {
    expect(worksStore.loadData).toHaveBeenCalled();
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
