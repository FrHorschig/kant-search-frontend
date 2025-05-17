import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInputComponent } from './basic-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupComponent } from 'src/app/common/shared/input-group/input-group.component';
import { DialogModule } from 'primeng/dialog';
import { MockCheckboxWorksMenuComponent } from 'src/app/common/test/mocks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Work } from '@frhorschig/kant-search-api';
import { Testdata } from 'src/app/common/test/testdata';
import { FormsModule } from '@angular/forms';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { SelectionGroup } from '../../model/selection-group';

describe('BasicInputComponent', () => {
  let component: BasicInputComponent;
  let fixture: ComponentFixture<BasicInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BasicInputComponent,
        InputGroupComponent,
        MockCheckboxWorksMenuComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        FormsModule,
        ButtonModule,
        DialogModule,
        DropdownModule,
        TooltipModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isCustomSelection to true if new value is CUSTOM', () => {
    // GIVEN
    component.isCustomSelection = false;
    component.showWorksMenu = false;
    // WHEN
    component.ngOnChanges({
      selectionGroup: {
        currentValue: SelectionGroup.CUSTOM,
        previousValue: SelectionGroup.ALL,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    // THEN
    expect(component.isCustomSelection).toEqual(true);
    expect(component.showWorksMenu).toEqual(true);
  });

  it('should set showWorksMenu to true if isCustomSelection is false', () => {
    // GIVEN
    component.isCustomSelection = false;
    // WHEN
    component.onWorksMenuClick();
    // THEN
    expect(component.showWorksMenu).toBe(true);
  });

  it('should emit works when onWorksChange is called', () => {
    const works: Work[] = [Testdata.work, Testdata.work2];
    // GIVEN
    spyOn(component.worksEmitter, 'emit');
    // WHEN
    component.onWorksChange(works);
    // THEN
    expect(component.worksEmitter.emit).toHaveBeenCalledWith(works);
  });

  it('should emit new value when onSelectionGroupChange is called', () => {
    // GIVEN
    spyOn(component.selectionGroupEmitter, 'emit');
    component.selectionGroup = SelectionGroup.ALL;
    // WHEN
    component.onSelectionGroupChange({
      value: SelectionGroup.SEC1,
    } as DropdownChangeEvent);
    // THEN
    expect(component.selectionGroupEmitter.emit).toHaveBeenCalledWith(
      SelectionGroup.SEC1
    );
  });

  it('should emit searchStringEmitter when onSearchStringChange is called', () => {
    // GIVEN
    spyOn(component.searchStringEmitter, 'emit');
    // WHEN
    component.onSearchStringChange('test');
    // THEN
    expect(component.searchStringEmitter.emit).toHaveBeenCalledWith('test');
  });

  it('should emit doSearchEmitter when onSubmit is called', () => {
    // GIVEN
    spyOn(component.doSearchEmitter, 'emit');
    // WHEN
    component.onSubmit();
    // THEN
    expect(component.doSearchEmitter.emit).toHaveBeenCalled();
  });
});
