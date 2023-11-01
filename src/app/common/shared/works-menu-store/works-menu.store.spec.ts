import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { WorksMenuStore } from './works-menu.store';
import { TreeNode } from 'primeng/api';
import { Testdata } from '../../test/testdata';
import { WorksReducers } from 'src/app/store/works';
import { Volume, Work } from '@frhorschig/kant-search-api';
import { of } from 'rxjs';

const assertSingleSectionNode = (
  nodes: TreeNode[],
  works: Work[],
  n: number,
  isSelectable: boolean
) => {
  expect(nodes[n].key).toEqual(`${n + 1}`);
  expect(nodes[n].selectable).toEqual(isSelectable);
  const volumeNodes = nodes[n].children;
  if (volumeNodes !== undefined) {
    expect(volumeNodes[0].key).toEqual(`${n + 1}-${n + 1}`);
    expect(volumeNodes[0].children).toBeDefined;
    expect(volumeNodes[0].selectable).toEqual(isSelectable);
    const workNodes = volumeNodes[0].children;
    if (workNodes !== undefined) {
      expect(workNodes[0].key).toEqual(`${n + 1}-${n + 1}-${n + 1}`);
      expect(workNodes[0].data).toEqual(works[n]);
      expect(workNodes[0].selectable).toBeTrue();
    }
  }
};

describe('WorksMenuStore', () => {
  let sut: WorksMenuStore;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorksMenuStore,
        { provide: Store, useValue: jasmine.createSpyObj('Store', ['select']) },
      ],
    });

    mockStore = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    sut = TestBed.inject(WorksMenuStore);
  });

  it('should create section nodes correctly', () => {
    const volumeNodes: TreeNode[] = [{ key: 'key' }];
    const result = sut['createSectionNode'](1, true, volumeNodes);
    expect(result.key).toEqual('1');
    expect(result.label).toEqual('COMMON.SECTION_1');
    expect(result.selectable).toBeTrue();
    expect(result.children).toEqual(volumeNodes);
  });

  it('should create volume nodes correctly', () => {
    const workNodes: TreeNode[] = [{ key: 'key' }];
    const result = sut['createVolumeNode'](1, Testdata.volume, true, workNodes);
    expect(result.key).toEqual('1-1');
    expect(result.label).toEqual('Band 1: Volume 1');
    expect(result.selectable).toBeTrue();
    expect(result.children).toEqual(workNodes);
  });

  it('should create work nodes correctly', () => {
    const result = sut['createWorkNode'](1, Testdata.work);
    expect(result.key).toEqual('1-1-1');
    expect(result.label).toEqual('Abbrev 1: Work 1 (1234)');
    expect(result.selectable).toBeTrue();
    expect(result.data).toEqual(Testdata.work);
  });

  it('should create nodes correctly', (done) => {
    const works = [
      Testdata.work,
      Testdata.work2,
      {
        id: 3,
        title: 'Work 3',
        ordinal: 0,
        volumeId: 3,
      },
    ];
    const volumeById = new Map<number, Volume>([
      [1, Testdata.volume],
      [2, { id: 2, title: 'Volume 2', section: 2 }],
      [3, { id: 3, title: 'Volume 3', section: 3 }],
    ]);

    // GIVEN
    mockStore.select.and.callFake((selector: any) => {
      if (selector === WorksReducers.selectIsLoaded) {
        return of(true);
      } else if (selector === WorksReducers.selectWorks) {
        return of(works);
      } else if (selector === WorksReducers.selectVolumeById) {
        return of(volumeById);
      }
      return of();
    });

    // WHEN
    sut.buildNodes(false);

    // THEN
    sut.nodes$.subscribe((nodes) => {
      expect(nodes).toHaveSize(3);
      assertSingleSectionNode(nodes, works, 0, false);
      assertSingleSectionNode(nodes, works, 1, false);
      assertSingleSectionNode(nodes, works, 2, false);
      done();
    });
  });

  it('should create no nodes with empty works', (done) => {
    const works: Work[] = [];
    const volumeById = new Map<number, Volume>([]);

    // GIVEN
    mockStore.select.and.callFake((selector: any) => {
      if (selector === WorksReducers.selectIsLoaded) {
        return of(true);
      } else if (selector === WorksReducers.selectWorks) {
        return of(works);
      } else if (selector === WorksReducers.selectVolumeById) {
        return of(volumeById);
      }
      return of();
    });

    // WHEN
    sut.buildNodes(true);

    // THEN
    sut.nodes$.subscribe((nodes) => {
      expect(nodes).toHaveSize(0);
      done();
    });
  });

  it('should create no nodes when no volume is found', (done) => {
    const works: Work[] = [Testdata.work];
    const volumeById = new Map<number, Volume>([]);

    // GIVEN
    mockStore.select.and.callFake((selector: any) => {
      if (selector === WorksReducers.selectIsLoaded) {
        return of(true);
      } else if (selector === WorksReducers.selectWorks) {
        return of(works);
      } else if (selector === WorksReducers.selectVolumeById) {
        return of(volumeById);
      }
      return of();
    });

    // WHEN
    sut.buildNodes(true);

    // THEN
    sut.nodes$.subscribe((nodes) => {
      expect(nodes).toHaveSize(0);
      done();
    });
  });

  it('should create one node when one volume is not found', (done) => {
    const works: Work[] = [Testdata.work, Testdata.work2];
    const volumeById = new Map<number, Volume>([[1, Testdata.volume]]);

    // GIVEN
    mockStore.select.and.callFake((selector: any) => {
      if (selector === WorksReducers.selectIsLoaded) {
        return of(true);
      } else if (selector === WorksReducers.selectWorks) {
        return of(works);
      } else if (selector === WorksReducers.selectVolumeById) {
        return of(volumeById);
      }
      return of();
    });

    // WHEN
    sut.buildNodes(true);

    // THEN
    sut.nodes$.subscribe((nodes) => {
      expect(nodes).toHaveSize(1);
      assertSingleSectionNode(nodes, [Testdata.work], 0, true);
      done();
    });
  });

  it('should toggle node expansion', (done) => {
    const works: Work[] = [Testdata.work, Testdata.work2];
    const volumeById = new Map<number, Volume>([[1, Testdata.volume]]);

    // GIVEN
    mockStore.select.and.callFake((selector: any) => {
      if (selector === WorksReducers.selectIsLoaded) {
        return of(true);
      } else if (selector === WorksReducers.selectWorks) {
        return of(works);
      } else if (selector === WorksReducers.selectVolumeById) {
        return of(volumeById);
      }
      return of();
    });
    sut.buildNodes(false);

    // WHEN
    sut.toggleNode('1-1-1');

    // THEN
    sut.nodes$.subscribe((nodes) => {
      const children = nodes[0].children || [];
      expect(children[0].expanded).toBeFalsy();
      const children2 = children[0].children || [];
      expect(children2[0].expanded).toBeTrue();
      done();
    });
  });

  it('should not toggle node expansion for unknown key', (done) => {
    const works: Work[] = [Testdata.work, Testdata.work2];
    const volumeById = new Map<number, Volume>([[1, Testdata.volume]]);

    // GIVEN
    mockStore.select.and.callFake((selector: any) => {
      if (selector === WorksReducers.selectIsLoaded) {
        return of(true);
      } else if (selector === WorksReducers.selectWorks) {
        return of(works);
      } else if (selector === WorksReducers.selectVolumeById) {
        return of(volumeById);
      }
      return of();
    });
    sut.buildNodes(false);

    // WHEN
    sut.toggleNode('x');

    // THEN
    sut.nodes$.subscribe((nodes) => {
      const children = nodes[0].children || [];
      expect(children[0].expanded).toBeFalsy();
      const children2 = children[0].children || [];
      expect(children2[0].expanded).toBeFalsy();
      done();
    });
  });
});
