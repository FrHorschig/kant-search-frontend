import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { TocSectionComponent } from './section/section.component';
import { TocComponent } from './toc.component';

describe('TocComponent', () => {
  let component: TocComponent;
  let fixture: ComponentFixture<TocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TocComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    })
      .overrideComponent(TocComponent, {
        set: {
          imports: [
            CommonModule,
            TranslateModule,
            NzFlexModule,
            NzDividerModule,
            TocSectionComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on onClick', () => {
    spyOn(component.onClickEmitter, 'emit');
    component.onClick(2);
    expect(component.onClickEmitter.emit).toHaveBeenCalledWith(2);
  });
});
