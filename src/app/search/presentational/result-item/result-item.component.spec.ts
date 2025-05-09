import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultItemComponent } from './result-item.component';
import { CardModule } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';
import { RemovePaginationPipe } from '../../pipes/remove-pagination.pipe';
import { LinkButtonComponent } from 'src/app/common/shared/link-button/link-button.component';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';

describe('ResultItemComponent', () => {
  let component: ResultItemComponent;
  let fixture: ComponentFixture<ResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ResultItemComponent,
        RemovePaginationPipe,
        LinkButtonComponent,
      ],
      imports: [
        TranslateModule.forRoot(),
        CardModule,
        TooltipModule,
        MenuModule,
      ],
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
