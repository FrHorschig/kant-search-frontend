import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInputComponent } from './basic-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupComponent } from 'src/app/common/shared/input-group/input-group.component';
import { DialogModule } from 'primeng/dialog';
import { MockCheckboxWorksMenuComponent } from 'src/app/common/test/mocks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Work } from 'kant-search-api';
import { Testdata } from 'src/app/common/test/testdata';
import { ReactiveFormsModule } from '@angular/forms';
import { Section } from '../../model/simple-input';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';

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
        ReactiveFormsModule,
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

  it('should emit worksChangeEmitter when onWorksChange is called', () => {
    const works: Work[] = [Testdata.work, Testdata.work2];
    // GIVEN
    spyOn(component.worksEmitter, 'emit');
    // WHEN
    component.onWorksChange(works);
    // THEN
    expect(component.worksEmitter.emit).toHaveBeenCalledWith(works);
  });

  it('should emit simpleInputEmitter when onSearchStringChange is called', () => {
    // GIVEN
    spyOn(component.simpleInputEmitter, 'emit');
    // WHEN
    component.form.setValue({ section: Section.SEC1, searchString: 'Kant' });
    // THEN
    expect(component.simpleInputEmitter.emit).toHaveBeenCalledWith({
      section: Section.SEC1,
      searchString: 'Kant',
    });
  });
});
