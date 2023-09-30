import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleInputComponent } from './simple-input.component';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupComponent } from 'src/app/common/shared/input-group/input-group.component';
import { DialogModule } from 'primeng/dialog';
import { MockCheckboxWorksMenuComponent } from 'src/app/common/test/mocks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SimpleInputComponent', () => {
  let component: SimpleInputComponent;
  let fixture: ComponentFixture<SimpleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SimpleInputComponent,
        InputGroupComponent,
        MockCheckboxWorksMenuComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        ButtonModule,
        PanelModule,
        AccordionModule,
        DialogModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
