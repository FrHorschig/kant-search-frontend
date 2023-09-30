import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxWorksMenuComponent } from './checkbox-works-menu.component';
import { TreeNode } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'primeng/tree';
import { of } from 'rxjs';
import { WorksMenuStore } from 'src/app/common/shared/works-menu-store/works-menu.store';
import { ButtonModule } from 'primeng/button';

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
    // WHEN
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
});
