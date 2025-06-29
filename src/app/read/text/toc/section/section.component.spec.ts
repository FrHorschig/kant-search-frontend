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
import { Testdata } from 'src/app/common/test/testdata';
import { createErrorServiceSpy } from 'src/app/common/test/services';
import { ErrorService } from 'src/app/common/service/error.service';

describe('TocSectionComponent', () => {
  let component: TocSectionComponent;
  let fixture: ComponentFixture<TocSectionComponent>;
  let errService: jasmine.SpyObj<ErrorService>;

  beforeEach(async () => {
    errService = createErrorServiceSpy();

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
      .overrideProvider(ErrorService, { useValue: errService })
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
    expect(errService.logError).toHaveBeenCalled();
    expect(h).toBeUndefined();
  });

  it('should emit on onClick', () => {
    spyOn(component.onClickEmitter, 'emit');
    component.onClick(8382);
    expect(component.onClickEmitter.emit).toHaveBeenCalledWith(8382);
  });
});
