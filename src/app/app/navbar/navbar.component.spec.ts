import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { LanguageStore } from '../../store/language/language.store';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { MockLanguageStore } from '../../store/language/language.store.spec';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import {
  HomeOutline,
  ReadOutline,
  SearchOutline,
  SettingOutline,
} from '@ant-design/icons-angular/icons';
import { of } from 'rxjs';

@Component({
  selector: 'ks-navbar',
  template: '',
  standalone: true,
})
export class MockNavbarComponent {}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockLanguageStore: MockLanguageStore;

  beforeEach(async () => {
    mockLanguageStore = new MockLanguageStore();

    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [
        { provide: LanguageStore, useValue: mockLanguageStore },
        {
          provide: NZ_ICONS,
          useValue: [HomeOutline, ReadOutline, SearchOutline, SettingOutline],
        },
      ],
    })
      .overrideComponent(NavbarComponent, {
        set: {
          imports: [
            CommonModule,
            RouterModule,
            TranslateModule,
            NzFlexModule,
            NzMenuModule,
            NzIconModule,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateCurrentLanguage when updateLang is invoked', () => {
    mockLanguageStore.currentLanguage$ = of('fr');
    component.updateLang('fr');
    expect(mockLanguageStore.updateCurrentLanguage).toHaveBeenCalledWith('fr');
  });
});
