import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { FootnoteComponent } from './footnote.component';

describe('FootnoteComponent', () => {
  let component: FootnoteComponent;
  let fixture: ComponentFixture<FootnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FootnoteComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    })
      .overrideComponent(FootnoteComponent, {
        set: {
          imports: [NzFlexModule, TextBlockComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FootnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
