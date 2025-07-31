import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ParagraphDialogComponent } from './paragraph-dialog.component';
import { NzFlexDirective, NzFlexModule } from 'ng-zorro-antd/flex';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';
import { Hit } from '../../model/search-result';
import { Testdata } from 'src/app/common/test/testdata';

describe('ParagraphDialogComponent', () => {
  let component: ParagraphDialogComponent;
  let fixture: ComponentFixture<ParagraphDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ParagraphDialogComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    })
      .overrideComponent(ParagraphDialogComponent, {
        set: {
          imports: [
            TranslateModule,
            NzFlexModule,
            NzSpaceModule,
            NzModalModule,
            NzButtonModule,
            NzToolTipModule,
            NzIconModule,
            TextBlockComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ParagraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should find work title', () => {
    component.hit = {
      snippets: [],
      fmtTextWithHl: '',
      index: 1,
      ordinal: 1,
      work: Testdata.work,
    };
    component.hit.work.title = 'work title';
    expect(component.getWorkTitle(10)).toEqual('work title');
    expect(component.getWorkTitle(8)).toEqual('work ...');
  });

  it('should emit on changes', () => {
    component.isVisible = false;
    spyOn(component.isVisibleChange, 'emit');

    component.ngOnChanges({
      ['isVisible']: {
        previousValue: false,
        currentValue: true,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.isVisibleChange.emit).toHaveBeenCalledWith(true);
    expect(component.isVisible).toEqual(true);
  });

  it('should emit on hide', () => {
    component.isVisible = true;
    spyOn(component.isVisibleChange, 'emit');

    component.onHide();

    expect(component.isVisibleChange.emit).toHaveBeenCalledWith(false);
    expect(component.isVisible).toEqual(false);
  });

  it('should emit hit data on navigation', () => {
    const hit: Hit = {
      snippets: [{ page: 3, line: 3, text: '', hasHighlights: false }],
      fmtTextWithHl: '',
      index: 2,
      ordinal: 2,
      work: Testdata.work,
    };
    component.hit = hit;
    spyOn(component.navigateEmitter, 'emit');

    component.onNavigate();

    expect(component.navigateEmitter.emit).toHaveBeenCalledWith({
      workCode: Testdata.work.code,
      fragment: 'content-2',
    });
  });
});
