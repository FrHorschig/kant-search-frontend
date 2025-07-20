import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { CriteriaComponent } from './criteria.component';
import { MockAdvancedInputComponent } from './advanced-input/advanced-input.component.spec';
import { MockBasicInputComponent } from './basic-input/basic-input.component.spec';
import { MockCriteriaStore } from './criteria.store.spec';
import { CriteriaStore } from './criteria.store';
import { AdvancedOptions, ResultSort } from '../model/search-options';
import { ConfigStore } from 'src/app/app/config/config.store';
import { MockConfigStore } from 'src/app/app/config/config.store.spec';

describe('CriteriaComponent', () => {
  let component: CriteriaComponent;
  let fixture: ComponentFixture<CriteriaComponent>;
  let mockConfigStore: MockConfigStore;
  let mockCriteriaStore: MockCriteriaStore;

  beforeEach(async () => {
    mockConfigStore = new MockConfigStore();
    mockCriteriaStore = new MockCriteriaStore();

    await TestBed.configureTestingModule({
      imports: [
        CriteriaComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    })
      .overrideComponent(CriteriaComponent, {
        set: {
          imports: [
            CommonModule,
            NzSpaceModule,
            MockBasicInputComponent,
            MockAdvancedInputComponent,
          ],
        },
      })
      .overrideProvider(ConfigStore, { useValue: mockConfigStore })
      .overrideProvider(CriteriaStore, { useValue: mockCriteriaStore })
      .compileComponents();

    fixture = TestBed.createComponent(CriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search terms', () => {
    const input = 'search terms';
    component.onSearchTermsChange(input);
    expect(mockCriteriaStore.putSearchTerms).toHaveBeenCalledWith(input);
  });

  it('should emit work codes', () => {
    const input = ['work', 'codes'];
    component.onWorkCodesChange(input);
    expect(mockCriteriaStore.putWorkCodes).toHaveBeenCalledWith(input);
  });

  it('should start search', () => {
    component.onSearch();
    expect(mockCriteriaStore.navigateSearch).toHaveBeenCalled();
  });

  it('should emit options', () => {
    const input: AdvancedOptions = {
      sort: ResultSort.Year,
      withStemming: true,
      includeFootnotes: true,
      includeParagraphs: true,
      includeHeadings: true,
    };
    component.onOptionsChange(input);
    expect(mockCriteriaStore.putOptions).toHaveBeenCalledWith(input);
  });
});
