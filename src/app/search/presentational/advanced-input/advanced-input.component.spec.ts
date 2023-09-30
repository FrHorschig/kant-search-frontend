import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedInputComponent } from './advanced-input.component';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { TranslateModule } from '@ngx-translate/core';
import { InputGroupComponent } from 'src/app/common/shared/input-group/input-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'primeng/tooltip';

describe('AdvancedInputComponent', () => {
  let component: AdvancedInputComponent;
  let fixture: ComponentFixture<AdvancedInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvancedInputComponent, InputGroupComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        DropdownModule,
        AccordionModule,
        TooltipModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvancedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
