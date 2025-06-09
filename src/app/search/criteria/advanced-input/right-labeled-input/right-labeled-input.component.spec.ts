import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightLabeledInputComponent } from './right-labeled-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

describe('LabeledSwitchComponent', () => {
  let component: RightLabeledInputComponent;
  let fixture: ComponentFixture<RightLabeledInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RightLabeledInputComponent],
      imports: [TranslateModule.forRoot(), TooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RightLabeledInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
