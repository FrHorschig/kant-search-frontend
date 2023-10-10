import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInputComponent } from './basic-input.component';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupComponent } from 'src/app/common/shared/input-group/input-group.component';
import { DialogModule } from 'primeng/dialog';
import { MockCheckboxWorksMenuComponent } from 'src/app/common/test/mocks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Work } from 'kant-search-api';
import { Testdata } from 'src/app/common/test/testdata';
import { FormsModule } from '@angular/forms';

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
        PanelModule,
        AccordionModule,
        DialogModule,
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
    spyOn(component.worksChangeEmitter, 'emit');
    // WHEN
    component.onWorksChange(works);
    // THEN
    expect(component.worksChangeEmitter.emit).toHaveBeenCalledWith(works);
  });

  it('should emit searchStringChangeEmitter when onSearchStringChange is called', () => {
    // GIVEN
    spyOn(component.searchStringChangeEmitter, 'emit');
    // WHEN
    component.searchString = 'Kant';
    component.onSearchStringChange();
    // THEN
    expect(component.searchStringChangeEmitter.emit).toHaveBeenCalledWith(
      'Kant'
    );
  });
});
