import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';
import { ParagraphComponent } from './paragraph.component';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FootnoteComponent } from '../footnote/footnote.component';
import { SummaryComponent } from '../summary/summary.component';
import { Testdata } from 'src/app/common/test/testdata';
import { ErrorService } from 'src/app/common/service/error.service';
import { createErrorServiceSpy } from 'src/app/common/test/services';

describe('ParagraphComponent', () => {
  let component: ParagraphComponent;
  let fixture: ComponentFixture<ParagraphComponent>;
  let errService: jasmine.SpyObj<ErrorService>;

  beforeEach(async () => {
    errService = createErrorServiceSpy();

    await TestBed.configureTestingModule({
      imports: [
        ParagraphComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    })
      .overrideComponent(ParagraphComponent, {
        set: {
          imports: [
            CommonModule,
            NzSpaceModule,
            NzTreeModule,
            NzCardModule,
            TextBlockComponent,
            FootnoteComponent,
            SummaryComponent,
          ],
        },
      })
      .overrideProvider(ErrorService, { useValue: errService })
      .compileComponents();

    fixture = TestBed.createComponent(ParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should find footnote', () => {
    component.fnByRef = new Map(['fn'].map((s) => [s, Testdata.footnote]));
    const result = component.getFn('fn');
    expect(result).toEqual(Testdata.footnote);
  });

  it('should handle unknown footnote', () => {
    component.fnByRef = new Map(['fn'].map((s) => [s, Testdata.footnote]));
    const result = component.getFn('other');
    expect(errService.logError).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should find summary', () => {
    component.summByRef = new Map(['sm'].map((s) => [s, Testdata.summary]));
    const result = component.getSummary('sm');
    expect(result).toEqual(Testdata.summary);
  });

  it('should handle unknown summary', () => {
    component.summByRef = new Map(['sm'].map((s) => [s, Testdata.summary]));
    const result = component.getSummary('other');
    expect(errService.logError).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});
