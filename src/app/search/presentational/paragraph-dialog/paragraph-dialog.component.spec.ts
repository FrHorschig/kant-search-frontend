import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphDialogComponent } from './paragraph-dialog.component';

describe('ParagraphDialogComponent', () => {
  let component: ParagraphDialogComponent;
  let fixture: ComponentFixture<ParagraphDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagraphDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParagraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
