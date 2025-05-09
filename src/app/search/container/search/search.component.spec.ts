import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchScope } from '@frhorschig/kant-search-api';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { of } from 'rxjs';
import { InputGroupComponent } from 'src/app/common/shared/input-group/input-group.component';
import { MockCheckboxWorksMenuComponent } from 'src/app/common/test/mocks';
import { Testdata } from 'src/app/common/test/testdata';
import { WorksStore } from 'src/app/store/works/works.store';
import { SelectionGroup } from '../../model/selection-group';
import { AdvancedInputComponent } from '../../presentational/advanced-input/advanced-input.component';
import { BasicInputComponent } from '../../presentational/basic-input/basic-input.component';
import { SearchComponent } from './search.component';
import { SearchStore } from './search.store';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSearchStore = jasmine.createSpyObj(
    'SearchStore',
    [
      'putWorks',
      'putSelectionGroup',
      'putSearchString',
      'putOptions',
      'navigateSearch',
    ],
    {
      isSearchPermitted$: of(false),
    },
  );
  let worksStore = jasmine.createSpyObj('WorksStore', ['loadData']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        MockCheckboxWorksMenuComponent,
        InputGroupComponent,
        BasicInputComponent,
        AdvancedInputComponent,
      ],
      providers: [
        {
          provide: MessageService,
          useValue: jasmine.createSpyObj('MessageService', ['clear']),
        },
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        ButtonModule,
        TooltipModule,
        DropdownModule,
        DividerModule,
        DialogModule,
        TreeModule,
      ],
    })
      .overrideProvider(SearchStore, { useValue: mockSearchStore })
      .overrideProvider(WorksStore, { useValue: worksStore })
      .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchStore.putWorks when onWorksChange is called', () => {
    const works = [Testdata.work];
    // WHEN
    component.onWorksChange(works);
    // THEN
    expect(mockSearchStore.putWorks).toHaveBeenCalledWith(works);
  });

  it('should call searchStore.putWorks when onWorksChange is called', () => {
    // WHEN
    component.onSelectionGroupChange(SelectionGroup.ALL);
    // THEN
    expect(mockSearchStore.putSelectionGroup).toHaveBeenCalledWith(
      SelectionGroup.ALL,
    );
  });

  it('should call searchStore.putSearchString when onBasicInputChange is called', () => {
    // WHEN
    component.onSearchStringChange('test');
    // THEN
    expect(mockSearchStore.putSearchString).toHaveBeenCalledWith('test');
  });

  it('should call searchStore.putOptions when onOptionsChange is called', () => {
    const options = { scope: SearchScope.Sentence };
    // WHEN
    component.onOptionsChange(options);
    // THEN
    expect(mockSearchStore.putOptions).toHaveBeenCalledWith(options);
  });

  it('should call searchStore.navigateSearch when onSearch is called', () => {
    // WHEN
    component.onSearch();
    // THEN
    expect(mockSearchStore.navigateSearch).toHaveBeenCalled();
  });
});
