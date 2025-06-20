import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TocSectionComponent } from './section.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { Heading } from '@frhorschig/kant-search-api';
import { Testdata } from 'src/app/common/test/testdata';

describe('TocSectionComponent', () => {
  let component: TocSectionComponent;
  let fixture: ComponentFixture<TocSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TocSectionComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    })
      .overrideComponent(TocSectionComponent, {
        set: {
          imports: [CommonModule, TranslateModule, NzFlexModule],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TocSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should find heading', () => {
    component.headByOrdinal = new Map([1].map((n) => [n, Testdata.heading]));
    const h = component.getHeading(1);
    expect(h).toEqual(Testdata.heading);
  });

  it('should handle unknown heading', () => {
    component.headByOrdinal = new Map([1].map((n) => [n, Testdata.heading]));
    const h = component.getHeading(0);
    expect(h).toBeUndefined();
  });

  it('should emit on onClick', () => {
    spyOn(component.onClickEmitter, 'emit');
    component.onClick(8382);
    expect(component.onClickEmitter.emit).toHaveBeenCalledWith(8382);
  });
});
