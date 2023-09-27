import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { SearchComponent } from './search.component';
import { of } from 'rxjs';
import { SearchStore } from './search.store';
import { Testdata } from 'src/app/common/test/testdata';
import { SearchInputComponent } from '../../presentational/search-input/search-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { MockWorksMenuComponent } from 'src/app/common/test/mocks';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SearchInput } from '../../model/search-input';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroupComponent } from 'src/app/common/shared/input-group/input-group.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSearchStore = jasmine.createSpyObj(
    'SearchStore',
    ['putsearchString', 'putWorks', 'navigateSearch'],
    {
      isSearchPermitted$: of(false),
    }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        SearchInputComponent,
        MockWorksMenuComponent,
        InputGroupComponent,
      ],
      providers: [provideMockStore({})],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        ButtonModule,
        TooltipModule,
        DropdownModule,
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

  it('should delegate putWorks call to searchStore', () => {
    // WHEN
    component.onSelectionChange(Testdata.works);
    // THEN
    expect(mockSearchStore.putWorks).toHaveBeenCalledWith(Testdata.works);
  });

  it('should call navigateSearch', () => {
    // WHEN
    component.onSearch(new SearchInput());
    // THEN
    expect(mockSearchStore.navigateSearch).toHaveBeenCalled();
  });
});
