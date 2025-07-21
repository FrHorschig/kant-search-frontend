import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RightLabeledInputComponent } from './right-labeled-input.component';
import { CommonModule } from '@angular/common';

describe('RightLabeledInputComponent', () => {
  let component: RightLabeledInputComponent;
  let fixture: ComponentFixture<RightLabeledInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RightLabeledInputComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    })
      .overrideComponent(RightLabeledInputComponent, {
        set: {
          imports: [
    CommonModule,
            TranslateModule,
            NzFlexModule,
            NzGridModule,
            NzSpaceModule,
            NzToolTipModule,
            NzIconModule,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(RightLabeledInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
