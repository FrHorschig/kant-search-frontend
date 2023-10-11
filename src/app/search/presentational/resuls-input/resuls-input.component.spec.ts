import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResulsInputComponent } from './resuls-input.component';

describe('ResulsInputComponent', () => {
  let component: ResulsInputComponent;
  let fixture: ComponentFixture<ResulsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResulsInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResulsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
