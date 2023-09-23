import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksMenuComponent } from './works-menu.component';
import { WorksMenuStore } from './works-menu.store';
import { TreeNode } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'primeng/tree';
import { of } from 'rxjs';

describe('WorksMenuComponent', () => {
  let component: WorksMenuComponent;
  let fixture: ComponentFixture<WorksMenuComponent>;
  const mockWmStore = jasmine.createSpyObj(
    'WorksMenuStore',
    ['select', 'buildNodes'],
    { nodes$: of([]) }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorksMenuComponent],
      providers: [{ provide: WorksMenuStore, useValue: mockWmStore }],
      imports: [TranslateModule.forRoot(), TreeModule],
    }).compileComponents();
    TestBed.overrideProvider(WorksMenuStore, { useValue: mockWmStore });

    fixture = TestBed.createComponent(WorksMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set mode to "checkbox" if isSelectable is true', () => {
    // WHEN
    component.isSelectable = true;
    // THEN
    expect(component.mode).toBe('checkbox');
    expect(mockWmStore.buildNodes).toHaveBeenCalledWith(true);
  });

  it('should set mode to "single" if isSelectable is false', () => {
    // WHEN
    component.isSelectable = false;
    // WHEN
    expect(component.mode).toBe('single');
    expect(mockWmStore.buildNodes).toHaveBeenCalledWith(false);
  });

  it('should emit a single work when only one node is selected', () => {
    const mockNode = { data: { id: 1, title: 'Work A' } } as TreeNode;
    // GIVEN
    spyOn(component.onSelectionChange, 'emit');
    // WHEN
    component.onNodeSelect({ node: mockNode });
    // WHEN
    expect(component.onSelectionChange.emit).toHaveBeenCalledWith([
      mockNode.data,
    ]);
  });

  it('should emit multiple works when multiple nodes are selected', () => {
    const mockNodes = [
      { data: { id: 1, title: 'Work A' } },
      { data: { id: 2, title: 'Work B' } },
    ] as TreeNode[];
    // GIVEN
    component.selection = mockNodes;
    spyOn(component.onSelectionChange, 'emit');
    // WHEN
    component.onNodeSelect({ node: mockNodes[0] });
    // THEN
    expect(component.onSelectionChange.emit).toHaveBeenCalledWith([
      mockNodes[0].data,
      mockNodes[1].data,
    ]);
  });

  it('should emit selected works on node unselect', () => {
    const mockNodes = [{ data: { id: 1, title: 'Work A' } }] as TreeNode[];
    // GIVEN
    component.selection = mockNodes;
    spyOn(component.onSelectionChange, 'emit');
    // WHEN
    component.onNodeUnselect();
    // THEN
    expect(component.onSelectionChange.emit).toHaveBeenCalledWith([
      mockNodes[0].data,
    ]);
  });
});
