import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RightLabeledInputComponent } from './right-labeled-input/right-labeled-input.component';
import { LeftLabeledInputComponent } from './left-labeled-input/left-labeled-input.component';
import { AdvancedInputComponent } from './advanced-input.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AdvancedInputComponent', () => {
  let component: AdvancedInputComponent;
  let fixture: ComponentFixture<AdvancedInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdvancedInputComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [provideAnimations()],
    })
      .overrideComponent(AdvancedInputComponent, {
        set: {
          imports: [
            FormsModule,
            ReactiveFormsModule,
            TranslateModule,
            NzSpaceModule,
            NzTypographyModule,
            NzCardModule,
            NzSwitchModule,
            NzDividerModule,
            NzSelectModule,
            RightLabeledInputComponent,
            LeftLabeledInputComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AdvancedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  //   it('should write input values into form', () => {
  //     const opts = {
  //       sort: ResultSort.Year,
  //       withStemming: true,
  //       includeFootnotes: true,
  //       includeHeadings: true,
  //       includeSummaries: true,
  //     };
  //     component.options = opts;

  //     component.ngOnInit();

  //     expect(component.form. ...?).toEqual(opts.sort);
  //   });

  //   it('should emit if value changes', () => {
  //     const opts = {
  //       sort: ResultSort.Year,
  //       withStemming: true,
  //       includeFootnotes: true,
  //       includeHeadings: true,
  //       includeSummaries: true,
  //     };
  //     component.options = opts;
  //     component.ngOnInit();

  //     component.form.setValue

  //     expect(component.form. ...?).toEqual(opts.sort);
  //   });
});
