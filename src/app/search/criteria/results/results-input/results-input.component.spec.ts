import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ResultsInputComponent } from './results-input.component';
import { ReloadOutline } from '@ant-design/icons-angular/icons';

describe('ResultsInputComponent', () => {
  let component: ResultsInputComponent;
  let fixture: ComponentFixture<ResultsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResultsInputComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [{ provide: NZ_ICONS, useValue: [ReloadOutline] }],
    })
      .overrideComponent(ResultsInputComponent, {
        set: {
          imports: [
            FormsModule,
            TranslateModule,
            NzSpaceModule,
            NzButtonModule,
            NzToolTipModule,
            NzIconModule,
            NzInputModule,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ResultsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle changed search terms', () => {
    spyOn(component.searchTermsEmitter, 'emit');
    component.onSearchTermsChange('term');
    expect(component.searchTermsEmitter.emit).toHaveBeenCalledWith('term');
  });

  it('should emit on submit', () => {
    spyOn(component.doUpdateEmitter, 'emit');
    component.onSubmit();
    expect(component.doUpdateEmitter.emit).toBeTruthy();
  });
});
