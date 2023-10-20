import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksMenuComponent } from './works-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'primeng/tree';
import { Work } from 'kant-search-api';
import { TreeNode } from 'primeng/api';
import { Testdata } from '../../test/testdata';

describe('WorksMenuComponent', () => {
  let component: WorksMenuComponent;
  let fixture: ComponentFixture<WorksMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorksMenuComponent],
      imports: [TranslateModule.forRoot(), TreeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WorksMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit workSelectEmitter when onNodeSelect is called', () => {
    const work = Testdata.work;
    const spy = spyOn(component.workSelectEmitter, 'emit');
    component.onNodeSelect({ node: { data: work } as TreeNode });
    expect(spy).toHaveBeenCalledWith(work);
  });

  it('should emit expandableSelectEmitter when onClick is called', () => {
    const key = '1-2';
    const spy = spyOn(component.expandableSelectEmitter, 'emit');
    component.onClick({ key } as TreeNode);
    expect(spy).toHaveBeenCalledWith(key);
  });
});
