import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TocSectionComponent } from '../toc/section/section.component';

describe('NormalModeComponent', () => {
  let component: TocSectionComponent;
  let fixture: ComponentFixture<TocSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TocSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TocSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
