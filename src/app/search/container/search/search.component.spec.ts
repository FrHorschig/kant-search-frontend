import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SearchComponent } from './search.component';
import { of } from 'rxjs';
import { SearchStore } from './search.store';
import { TranslateModule } from '@ngx-translate/core';
import { MockCheckboxWorksMenuComponent } from 'src/app/common/test/mocks';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupComponent } from 'src/app/common/shared/input-group/input-group.component';
import { SimpleInputComponent } from '../../presentational/simple-input/simple-input.component';
import { AdvancedInputComponent } from '../../presentational/advanced-input/advanced-input.component';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeModule } from 'primeng/tree';
import { Testdata } from 'src/app/common/test/testdata';
import { SearchScope } from 'kant-search-api';
import { MessageService } from 'primeng/api';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSearchStore = jasmine.createSpyObj(
    'SearchStore',
    ['putWorks', 'putSearchString', 'putOptions', 'navigateSearch'],
    {
      isSearchPermitted$: of(false),
    }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        MockCheckboxWorksMenuComponent,
        InputGroupComponent,
        SimpleInputComponent,
        AdvancedInputComponent,
      ],
      providers: [
        provideMockStore({}),
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
        PanelModule,
        AccordionModule,
        DialogModule,
        TreeModule,
      ],
    }).compileComponents();
    TestBed.overrideProvider(SearchStore, { useValue: mockSearchStore });

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

  it('should call searchStore.putSearchString when onSearchStringChange is called', () => {
    const searchString = 'Kant';
    // WHEN
    component.onSearchStringChange(searchString);
    // THEN
    expect(mockSearchStore.putSearchString).toHaveBeenCalledWith(searchString);
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
