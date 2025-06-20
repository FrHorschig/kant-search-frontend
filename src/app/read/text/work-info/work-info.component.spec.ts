import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { WorkInfoComponent } from './work-info.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

describe('WorkInfoComponent', () => {
  let component: WorkInfoComponent;
  let fixture: ComponentFixture<WorkInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WorkInfoComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    })
      .overrideComponent(WorkInfoComponent, {
        set: {
          imports: [
            CommonModule,
            TranslateModule,
            NzGridModule,
            NzSpaceModule,
            NzDividerModule,
            NzTypographyModule,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(WorkInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
