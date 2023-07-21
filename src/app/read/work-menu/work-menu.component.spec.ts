import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMenuComponent } from './work-menu.component';

describe('WorkMenuComponent', () => {
  let component: WorkMenuComponent;
  let fixture: ComponentFixture<WorkMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
