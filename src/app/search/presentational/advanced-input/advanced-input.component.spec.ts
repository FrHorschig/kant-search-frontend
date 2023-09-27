import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedInputComponent } from './advanced-input.component';

describe('AdvancedInputComponent', () => {
  let component: AdvancedInputComponent;
  let fixture: ComponentFixture<AdvancedInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
