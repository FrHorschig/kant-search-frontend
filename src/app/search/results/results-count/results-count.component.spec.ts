import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ResultsCountComponent } from './results-count.component';
import { Testdata } from 'src/app/common/test/testdata';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ResultsCountComponent', () => {
  let component: ResultsCountComponent;
  let fixture: ComponentFixture<ResultsCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResultsCountComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [provideAnimations()],
    })
      .overrideComponent(ResultsCountComponent, {
        set: {
          imports: [
            CommonModule,
            TranslateModule,
            NzFlexModule,
            NzCollapseModule,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ResultsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total count', () => {
    const workCode = Testdata.work.code;
    const work = Testdata.work;

    component.results = [
      {
        workCode,
        hits: [
          {
            snippets: [
              { page: 1, line: 1, text: '' },
              { page: 2, line: 2, text: '' },
            ],
            fmtTextWithHl: '',
            index: 1,
            ordinal: 1,
            work,
          },
        ],
      },
      {
        workCode,
        hits: [
          {
            snippets: [{ page: 3, line: 3, text: '' }],
            fmtTextWithHl: '',
            index: 2,
            ordinal: 2,
            work,
          },
        ],
      },
    ];

    expect(component.getTotalCount()).toEqual(2);
  });
});
