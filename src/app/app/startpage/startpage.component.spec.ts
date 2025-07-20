import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { StartpageComponent } from './startpage.component';
import { MockStartpageStore } from './startpage.store.spec';
import { CommonModule } from '@angular/common';
import { StartpageStore } from './startpage.store';

describe('StartpageComponent', () => {
  let component: StartpageComponent;
  let fixture: ComponentFixture<StartpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StartpageComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [
        { provide: StartpageStore, useValue: new MockStartpageStore() },
      ],
    })
      .overrideComponent(StartpageComponent, {
        set: {
          imports: [TranslateModule, CommonModule, NzFlexModule],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(StartpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
