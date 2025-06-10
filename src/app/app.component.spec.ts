import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { VolumesStore } from './store/volumes/volumes.store';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

class MockVolumesStore {
  loadData = jasmine.createSpy('loadData');
}

export const createTranslateServiceSpy = () =>
  jasmine.createSpyObj<TranslateService>('TranslateService', [
    'get',
    'instant',
  ]);

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockVolumesStore: MockVolumesStore;
  let mockTranslateService: jasmine.SpyObj<TranslateService>;

  beforeEach(async () => {
    mockVolumesStore = new MockVolumesStore();
    mockTranslateService = createTranslateServiceSpy();

    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
      providers: [
        { provide: VolumesStore, useValue: mockVolumesStore },
        { provide: TranslateService, useValue: mockTranslateService },
      ],
    }).compileComponents();

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
