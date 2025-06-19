import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormatEmitEvent, NzTreeModule } from 'ng-zorro-antd/tree';
import { SelectionComponent } from './selection.component';
import { MockLanguageStore } from 'src/app/common/store/language.store.spec';
import { MockVolumesStore } from 'src/app/common/store/volumes.store.spec';
import { LanguageStore } from 'src/app/common/store/language.store';
import { VolumesStore } from 'src/app/common/store/volumes.store';
import { createRouterSpy } from 'src/app/common/test/services';
import { of } from 'rxjs';

describe('SelectionComponent', () => {
  let component: SelectionComponent;
  let fixture: ComponentFixture<SelectionComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLanguageStore: MockLanguageStore;
  let mockVolumesStore: MockVolumesStore;

  beforeEach(async () => {
    mockRouter = createRouterSpy();
    mockLanguageStore = new MockLanguageStore();
    mockVolumesStore = new MockVolumesStore();

    await TestBed.configureTestingModule({
      imports: [
        SelectionComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [
        { provide: LanguageStore, useValue: mockLanguageStore },
        { provide: VolumesStore, useValue: mockVolumesStore },
        { provide: Router, useValue: mockRouter },
      ],
    })
      .overrideComponent(SelectionComponent, {
        set: {
          imports: [
            CommonModule,
            RouterModule,
            TranslateModule,
            NzSpaceModule,
            NzTreeModule,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
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

  it('should navigate to work', () => {
    const key = 'work-123';
    const testEvent: NzFormatEmitEvent = {
      node: {
        key: key,
      },
    } as any;

    mockLanguageStore.currentLanguage$ = of('en');
    component.onNodeClick(testEvent);

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      'en',
      'read',
      'text',
      'work-123',
    ]);
  });
});
