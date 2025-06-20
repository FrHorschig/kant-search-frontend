import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { LeftLabeledInputComponent } from './left-labeled-input.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';

describe('LeftLabeledInputComponent', () => {
  let component: LeftLabeledInputComponent;
  let fixture: ComponentFixture<LeftLabeledInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LeftLabeledInputComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    })
      .overrideComponent(LeftLabeledInputComponent, {
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

    fixture = TestBed.createComponent(LeftLabeledInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
