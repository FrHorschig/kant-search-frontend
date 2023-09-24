import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SearchScope } from 'kant-search-api';
import { SearchInput } from '../../model/search-input';
import { SearchInputComponent } from './search-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
      providers: [FormBuilder],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        ButtonModule,
        DropdownModule,
        TooltipModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSearch event when form is submitted', () => {
    const searchInput: SearchInput = {
      searchTerms: 'test',
      excludedTerms: 'exclude',
      scope: SearchScope.Paragraph,
    };
    spyOn(component.onSearch, 'emit');
    component.form.setValue(searchInput);
    component.onSubmit();
    expect(component.onSearch.emit).toHaveBeenCalledWith(searchInput);
  });
});
