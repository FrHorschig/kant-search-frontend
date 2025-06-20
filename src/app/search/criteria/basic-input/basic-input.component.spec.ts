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
import { BasicInputComponent } from './basic-input.component';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { WorksGroup } from '../../model/search-options';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NzFormatEmitEvent, NzTreeNodeKey } from 'ng-zorro-antd/core/tree';

describe('BasicInputComponent', () => {
  let component: BasicInputComponent;
  let fixture: ComponentFixture<BasicInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BasicInputComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [provideAnimations()],
    })
      .overrideComponent(BasicInputComponent, {
        set: {
          imports: [
            CommonModule,
            FormsModule,
            TranslateModule,
            NzSpaceModule,
            NzButtonModule,
            NzTreeModule,
            NzCardModule,
            NzSelectModule,
            NzInputModule,
            NzToolTipModule,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BasicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not include "Custom" in initial work group options', () => {
    expect(component.worksGroupOptions).not.toContain(WorksGroup.Custom);
  });

  it('should handle changed search terms', () => {
    spyOn(component.searchTermsEmitter, 'emit');

    component.onSearchTermsChange('term');

    expect(component.searchTerms).toEqual('term');
    expect(component.searchTermsEmitter.emit).toHaveBeenCalledWith('term');
  });

  it('should handle changed work group select', () => {
    spyOn(component.workCodesEmitter, 'emit');
    const input = WorksGroup.Critiques;

    component.onSelectChange(input);

    expect(component.worksGroup).toEqual(input);
    expect(component.checkedKeys).toHaveSize(3);
    // TODO should critiques contain both A and B or only one of them? also see below
    expect(component.checkedKeys).toContain('KRV_B');
    expect(component.checkedKeys).toContain('KPV');
    expect(component.checkedKeys).toContain('KU');
    expect(component.workCodesEmitter.emit).toHaveBeenCalledWith(
      component.checkedKeys
    );
  });

  it('should handle work group change from Custom', () => {
    component.worksGroup = WorksGroup.Custom;
    component.worksGroupOptions.push(WorksGroup.Custom);

    component.onSelectChange(WorksGroup.Critiques);

    expect(component.worksGroupOptions).not.toContain(WorksGroup.Custom);
  });

  it('should handle custom checked keys group', () => {
    spyOn(component.workCodesEmitter, 'emit');
    const input = ['GMS', 'volume-4', 583];

    component.onCheckedKeysChange(input);

    expect(component.checkedKeys).toHaveSize(2);
    expect(component.checkedKeys).toContain('GMS');
    expect(component.checkedKeys).toContain('volume-4');
    expect(component.worksGroupOptions).toContain(WorksGroup.Custom);
    expect(component.workCodesEmitter.emit).toHaveBeenCalledWith(['GMS']);
  });

  it('should handle predefined checked keys group', () => {
    // TODO see above
    const input = ['KRV_B', 'KPV', 'KU'];
    component.worksGroupOptions.push(WorksGroup.Custom);

    component.onCheckedKeysChange(input);

    expect(component.checkedKeys).toHaveSize(3);
    expect(component.worksGroupOptions).not.toContain(WorksGroup.Custom);
  });

  it('should expand node', () => {
    const key = 'volume-1';
    const expandedFunc = jasmine.createSpy('setExpanded');
    const testEvent: NzFormatEmitEvent = {
      node: {
        key: key,
        setExpanded: expandedFunc,
      },
    } as any;

    component.onNodeClick(testEvent);

    expect(component.expandedKeys).toContain(key);
    expect(expandedFunc).toHaveBeenCalledWith(true);
  });

  it('should retract node', () => {
    const key = 'volume-1';
    const expandedFunc = jasmine.createSpy('setExpanded');
    const testEvent: NzFormatEmitEvent = {
      node: {
        key: key,
        setExpanded: expandedFunc,
      },
    } as any;

    component.expandedKeys = ['volume-1', 'volume-2'];
    component.onNodeClick(testEvent);

    expect(component.expandedKeys).not.toContain(key);
    expect(expandedFunc).toHaveBeenCalledWith(false);
  });

  it('should emit on submit', () => {
    spyOn(component.doSearchEmitter, 'emit');
    component.onSubmit();
    expect(component.doSearchEmitter.emit).toBeTruthy();
  });
});
