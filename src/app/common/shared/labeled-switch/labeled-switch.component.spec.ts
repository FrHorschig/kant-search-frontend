import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledSwitchComponent } from './labeled-switch.component';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

describe('LabeledSwitchComponent', () => {
  let component: LabeledSwitchComponent;
  let fixture: ComponentFixture<LabeledSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabeledSwitchComponent],
      imports: [TranslateModule.forRoot(), TooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LabeledSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
