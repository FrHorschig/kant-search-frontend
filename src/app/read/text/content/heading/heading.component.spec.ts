import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TextBlockComponent } from 'src/app/common/shared/text-block/text-block.component';
import { HeadingComponent } from './heading.component';
import { Testdata } from 'src/app/common/test/testdata';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ErrorService } from 'src/app/common/service/error.service';
import { createErrorServiceSpy } from 'src/app/common/test/services';

describe('HeadingComponent', () => {
  let component: HeadingComponent;
  let fixture: ComponentFixture<HeadingComponent>;
  let errService: jasmine.SpyObj<ErrorService>;

  beforeEach(async () => {
    errService = createErrorServiceSpy();

    await TestBed.configureTestingModule({
      imports: [
        HeadingComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [provideAnimations()],
    })
      .overrideComponent(HeadingComponent, {
        set: {
          imports: [TextBlockComponent],
        },
      })
      .overrideProvider(ErrorService, { useValue: errService })
      .compileComponents();

    fixture = TestBed.createComponent(HeadingComponent);
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
});
