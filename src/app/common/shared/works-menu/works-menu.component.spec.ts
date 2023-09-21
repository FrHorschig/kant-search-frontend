import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksMenuComponent } from './works-menu.component';
import { WorksMenuStore } from './works-menu.store';
import { TreeNode } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'primeng/tree';

describe('WorksMenuComponent', () => {
  let sut: WorksMenuComponent;
  let fixture: ComponentFixture<WorksMenuComponent>;
  let mockStore: jasmine.SpyObj<WorksMenuStore>;

  beforeEach(async () => {
    const mockStoreSpy = {
      nodes$: jasmine.createSpyObj('Observable', {
        subscribe: null,
      }),
      buildNodes: jasmine.createSpy('buildNodes'),
    };

    await TestBed.configureTestingModule({
      declarations: [WorksMenuComponent],
      providers: [{ provide: WorksMenuStore, useValue: mockStoreSpy }],
      imports: [TranslateModule.forRoot(), TreeModule],
    }).compileComponents();

    mockStore = TestBed.inject(
      WorksMenuStore
    ) as jasmine.SpyObj<WorksMenuStore>;
    fixture = TestBed.createComponent(WorksMenuComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should set mode to "checkbox" if isSelectable is true', () => {
    // WHEN
    sut.isSelectable = true;
    // THEN
    expect(sut.mode).toBe('checkbox');
    expect(mockStore.buildNodes).toHaveBeenCalledWith(true);
  });

  it('should set mode to "single" if isSelectable is false', () => {
    // WHEN
    sut.isSelectable = false;
    // WHEN
    expect(sut.mode).toBe('single');
    expect(mockStore.buildNodes).toHaveBeenCalledWith(false);
  });

  it('should emit a single work when only one node is selected', () => {
    const mockNode = { data: { id: 1, title: 'Work A' } } as TreeNode;
    // GIVEN
    spyOn(sut.onSelectionChange, 'emit');
    // WHEN
    sut.onNodeSelect({ node: mockNode });
    // WHEN
    expect(sut.onSelectionChange.emit).toHaveBeenCalledWith([mockNode.data]);
  });

  it('should emit multiple works when multiple nodes are selected', () => {
    const mockNodes = [
      { data: { id: 1, title: 'Work A' } },
      { data: { id: 2, title: 'Work B' } },
    ] as TreeNode[];
    // GIVEN
    sut.selection = mockNodes;
    spyOn(sut.onSelectionChange, 'emit');
    // WHEN
    sut.onNodeSelect({ node: mockNodes[0] });
    // THEN
    expect(sut.onSelectionChange.emit).toHaveBeenCalledWith([
      mockNodes[0].data,
      mockNodes[1].data,
    ]);
  });

  it('should emit selected works on node unselect', () => {
    const mockNodes = [{ data: { id: 1, title: 'Work A' } }] as TreeNode[];
    // GIVEN
    sut.selection = mockNodes;
    spyOn(sut.onSelectionChange, 'emit');
    // WHEN
    sut.onNodeUnselect();
    // THEN
    expect(sut.onSelectionChange.emit).toHaveBeenCalledWith([
      mockNodes[0].data,
    ]);
  });
});
