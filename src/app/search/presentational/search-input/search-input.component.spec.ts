import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';
import { Work } from 'kant-search-api';
import { Testdata } from 'src/app/common/test/testdata';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MockWorksMenuComponent } from 'src/app/common/test/mocks';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputComponent, MockWorksMenuComponent],
      imports: [TranslateModule.forRoot(), ButtonModule, TooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onInput event on input change', () => {
    spyOn(component.onInput, 'emit');
    component.onInputChange({ target: { value: 'testValue' } });
    expect(component.onInput.emit).toHaveBeenCalledWith('testValue');
  });

  it('should handle undefined event object gracefully on input change', () => {
    spyOn(component.onInput, 'emit');
    component.onInputChange(undefined);
    expect(component.onInput.emit).toHaveBeenCalledWith('');
  });

  it('should emit onSelect event on selection change', () => {
    const mockWorks: Work[] = [Testdata.work, Testdata.work2];
    spyOn(component.onSelect, 'emit');
    component.onSelectionChange(mockWorks);
    expect(component.onSelect.emit).toHaveBeenCalledWith(mockWorks);
  });

  it('should emit onSearch event on search click', () => {
    spyOn(component.onSearch, 'emit');
    component.onSearchClick();
    expect(component.onSearch.emit).toHaveBeenCalled();
  });
});
