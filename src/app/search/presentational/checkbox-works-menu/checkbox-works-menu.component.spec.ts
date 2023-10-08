import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxWorksMenuComponent } from './checkbox-works-menu.component';
import { TreeNode } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'primeng/tree';
import { of } from 'rxjs';
import { WorksMenuStore } from 'src/app/common/shared/works-menu-store/works-menu.store';
import { ButtonModule } from 'primeng/button';
import { Work } from 'kant-search-api';
import { Testdata } from 'src/app/common/test/testdata';

describe('CheckboxWorksMenuComponent', () => {
  let component: CheckboxWorksMenuComponent;
  let fixture: ComponentFixture<CheckboxWorksMenuComponent>;
  const mockWmStore = jasmine.createSpyObj(
    'WorksMenuStore',
    ['select', 'buildNodes'],
    { nodes$: of([]) }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxWorksMenuComponent],
      imports: [TranslateModule.forRoot(), TreeModule, ButtonModule],
    }).compileComponents();
    TestBed.overrideProvider(WorksMenuStore, { useValue: mockWmStore });

    fixture = TestBed.createComponent(CheckboxWorksMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a single work when only one node is selected', () => {
    const mockNodes: TreeNode[] = [{ data: { id: 1, title: 'Work A' } }];
    // GIVEN
    spyOn(component.selectionChangeEmitter, 'emit');
    // WHEN
    component.onSelectionChange(mockNodes);
    // THEN
    expect(component.selectionChangeEmitter.emit).toHaveBeenCalledWith([
      mockNodes[0].data,
    ]);
  });

  it('should emit multiple works when multiple nodes are selected', () => {
    const mockNodes: TreeNode[] = [
      { data: { id: 1, title: 'Work A' } },
      { data: { id: 2, title: 'Work B' } },
    ];
    // GIVEN
    spyOn(component.selectionChangeEmitter, 'emit');
    // WHEN
    component.onSelectionChange(mockNodes);
    // THEN
    expect(component.selectionChangeEmitter.emit).toHaveBeenCalledWith([
      mockNodes[0].data,
      mockNodes[1].data,
    ]);
  });

  it('should select all nodes when onSelectAll is called', () => {
    const child = { data: Testdata.work } as TreeNode;
    const parent = { children: [child] } as TreeNode;
    const mockNodes: TreeNode[] = [parent];
    // GIVEN
    if (component.tree) {
      component.tree.value = mockNodes;
    } else {
      expect(component.tree).toBeDefined();
    }
    spyOn(component.selectionChangeEmitter, 'emit');
    // WHEN
    component.onSelectAll();
    // THEN
    expect(component.tree?.selection).toContain(parent);
    expect(component.tree?.selection).toContain(child);
    expect(component.selectionChangeEmitter.emit).toHaveBeenCalledWith([
      Testdata.work,
    ]);
  });

  it('should remove all nodes when onRemoveAll is called', () => {
    const child = { data: Testdata.work } as TreeNode;
    const parent = { children: [child] } as TreeNode;
    const mockNodes: TreeNode[] = [parent];
    // GIVEN
    if (component.tree) {
      component.tree.selection = mockNodes;
      component.tree.value = mockNodes;
    } else {
      expect(component.tree).toBeDefined();
    }
    fixture.detectChanges();
    spyOn(component.selectionChangeEmitter, 'emit');
    // WHEN
    component.onRemoveAll();
    // THEN
    expect(component.tree?.selection).toEqual([]);
    expect(component.selectionChangeEmitter.emit).toHaveBeenCalledWith([]);
  });

  it('should emit when onClose is called', () => {
    // GIVEN
    spyOn(component.closeEmitter, 'emit');
    // WHEN
    component.onClose();
    // THEN
    expect(component.closeEmitter.emit).toHaveBeenCalled();
  });
});
