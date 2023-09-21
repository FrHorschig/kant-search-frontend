import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParagraphDialogComponent } from './paragraph-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from 'src/app/common/common.module';

describe('ParagraphDialogComponent', () => {
  let component: ParagraphDialogComponent;
  let fixture: ComponentFixture<ParagraphDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParagraphDialogComponent],
      imports: [TranslateModule.forRoot(), DialogModule, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ParagraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit `isVisibleChange` when `isVisible` input changes', () => {
    // GIVEN
    spyOn(component.isVisibleChange, 'emit');
    // WHEN
    component.ngOnChanges({
      isVisible: {
        previousValue: false,
        currentValue: true,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    // THEN
    expect(component.isVisibleChange.emit).toHaveBeenCalledWith(true);
  });

  it('should set `isVisible` to false and emit `isVisibleChange` when `onHide` is called', () => {
    // GIVEN
    spyOn(component.isVisibleChange, 'emit');
    // WHEN
    component.onHide();
    // THEN
    expect(component.isVisible).toBeFalse();
    expect(component.isVisibleChange.emit).toHaveBeenCalledWith(false);
  });
});
