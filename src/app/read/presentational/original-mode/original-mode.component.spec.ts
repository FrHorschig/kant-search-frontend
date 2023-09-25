import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalModeComponent } from './original-mode.component';

describe('OriginalModeComponent', () => {
  let component: OriginalModeComponent;
  let fixture: ComponentFixture<OriginalModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginalModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginalModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
