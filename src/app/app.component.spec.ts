import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { VolumesStore } from './common/store/volumes/volumes.store';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { MockNavbarComponent } from './app/navbar/navbar.component.spec';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { MockVolumesStore } from './common/store/volumes/volumes.store.spec';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockVolumesStore: MockVolumesStore;
  let mockNavbarComponent: MockNavbarComponent;

  beforeEach(async () => {
    mockVolumesStore = new MockVolumesStore();
    mockNavbarComponent = new MockNavbarComponent();

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [{ provide: VolumesStore, useValue: mockVolumesStore }],
    })
      .overrideComponent(AppComponent, {
        set: {
          imports: [
            CommonModule,
            RouterModule,
            NzFlexModule,
            NzSpaceModule,
            MockNavbarComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadData from VolumesStore on creation', () => {
    expect(mockVolumesStore.loadData).toHaveBeenCalled();
  });
});
