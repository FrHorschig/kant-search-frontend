import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksMenuComponent } from './works-menu.component';

describe('WorksMenuComponent', () => {
  let component: WorksMenuComponent;
  let fixture: ComponentFixture<WorksMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorksMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
