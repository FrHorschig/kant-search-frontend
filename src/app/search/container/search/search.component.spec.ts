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

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSearchStore = jasmine.createSpyObj(
    'SearchStore',
    ['putSearchTerms', 'putWorks'],
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
      ],
      providers: [provideMockStore({})],
      imports: [TranslateModule.forRoot(), ButtonModule, TooltipModule],
    }).compileComponents();
    TestBed.overrideProvider(SearchStore, { useValue: mockSearchStore });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delegate putSearchTerms call to searchStore', () => {
    // WHEN
    component.onInput('test');
    // THEN
    expect(mockSearchStore.putSearchTerms).toHaveBeenCalledWith('test');
  });

  it('should delegate putWorks call to searchStore', () => {
    // WHEN
    component.onSelect(Testdata.works);
    // THEN
    expect(mockSearchStore.putWorks).toHaveBeenCalledWith(Testdata.works);
  });
});
