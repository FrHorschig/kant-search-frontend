import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from './navbar/navbar.component';
import { MessagesModule } from 'primeng/messages';
import { RouterTestingModule } from '@angular/router/testing';
import { TabMenuModule } from 'primeng/tabmenu';

class MockTranslateService {
  setDefaultLang = jasmine.createSpy('setDefaultLang');
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockTranslateService: MockTranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponent],
      providers: [
        {
          provide: MessageService,
          useValue: jasmine.createSpyObj<MessageService>,
        },
        { provide: TranslateService, useClass: MockTranslateService },
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default language to "en"', () => {
    expect(mockTranslateService.setDefaultLang).toHaveBeenCalledWith('en');
  });
});
