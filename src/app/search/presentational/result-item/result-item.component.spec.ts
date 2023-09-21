import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultItemComponent } from './result-item.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from 'src/app/common/common.module';
import { TranslateModule } from '@ngx-translate/core';

describe('ResultItemComponent', () => {
  let component: ResultItemComponent;
  let fixture: ComponentFixture<ResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultItemComponent],
      imports: [TranslateModule.forRoot(), CardModule, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick event when onCardClick is called', () => {
    // GIVEN
    spyOn(component.onClick, 'emit');
    // WHEN
    component.onCardClick();
    // THEN
    expect(component.onClick.emit).toHaveBeenCalled();
  });
});
