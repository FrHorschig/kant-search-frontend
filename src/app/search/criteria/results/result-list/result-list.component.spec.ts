import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ResultItemComponent } from './result-item/result-item.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { ResultListComponent } from './result-list.component';
import { Testdata } from 'src/app/common/test/testdata';
import { Hit } from '../../model/search-result';

describe('ResultListComponent', () => {
  let component: ResultListComponent;
  let fixture: ComponentFixture<ResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResultListComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    })
      .overrideComponent(ResultListComponent, {
        set: {
          imports: [
            CommonModule,
            TranslateModule,
            NzFlexModule,
            NzSpaceModule,
            NzPaginationModule,
            NzDividerModule,
            ResultItemComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update hits on page or pagesize change', () => {
    const work = Testdata.work;
    const hits = [
      {
        snippets: [
          { page: 1, line: 1, text: '', hasHighlights: false },
          { page: 2, line: 2, text: '', hasHighlights: false },
        ],
        fmtTextWithHl: '',
        index: 1,
        ordinal: 1,
        work,
      },
      {
        snippets: [{ page: 3, line: 3, text: '', hasHighlights: false }],
        fmtTextWithHl: '',
        index: 2,
        ordinal: 2,
        work,
      },
    ];

    component.hits = hits;
    expect(component.hits).toBe(hits);
    expect(component.paginatedHits).toEqual(hits);

    component.pageSize = 1;
    expect(component.paginatedHits).toEqual([hits[0]]);

    component.page = 2;
    expect(component.paginatedHits).toEqual([hits[1]]);
  });

  it('should emit on match click', () => {
    const hit: Hit = {
      snippets: [{ page: 3, line: 3, text: '', hasHighlights: false }],
      fmtTextWithHl: '',
      index: 2,
      ordinal: 2,
      work: Testdata.work,
    };
    spyOn(component.onClick, 'emit');

    component.onMatchClick(hit);

    expect(component.onClick.emit).toHaveBeenCalledWith(hit);
  });

  it('should emit on page change', () => {
    spyOn(component.pageChange, 'emit');
    component.onPageChange(8);
    expect(component.pageChange.emit).toHaveBeenCalledWith(8);
  });
});
