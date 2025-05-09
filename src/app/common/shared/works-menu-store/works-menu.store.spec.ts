import { TestBed } from '@angular/core/testing';
import { Volume, Work } from '@frhorschig/kant-search-api';
import { TreeNode } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { WorksStore } from 'src/app/store/works/works.store';
import { Testdata } from '../../test/testdata';
import { WorksMenuStore } from './works-menu.store';

const assertSingleSectionNode = (
  nodes: TreeNode[],
  works: Work[],
  n: number,
  isSelectable: boolean,
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
  let volumeById$: BehaviorSubject<Map<number, Volume>>;
  let works$: BehaviorSubject<Work[]>;
  let isLoaded$: BehaviorSubject<boolean>;

  let sut: WorksMenuStore;
  let worksStore: jasmine.SpyObj<WorksStore>;

  beforeEach(() => {
    volumeById$ = new BehaviorSubject<Map<number, Volume>>(
      new Map<number, Volume>(),
    );
    works$ = new BehaviorSubject<Work[]>([]);
    isLoaded$ = new BehaviorSubject<boolean>(true);
    worksStore = jasmine.createSpyObj('WorksStore', ['loadData'], {
      volumeById$: volumeById$,
      works$: works$,
      isLoaded$: isLoaded$,
    });

    TestBed.configureTestingModule({
      providers: [
        WorksMenuStore,
        { provide: WorksStore, useValue: worksStore },
      ],
    });

    sut = TestBed.inject(WorksMenuStore);
  });

  it('should create section nodes correctly', () => {
    const volumeNodes: TreeNode[] = [{ key: 'key' }];
    const result = sut['createSectionNode'](1, true, volumeNodes);
    expect(result.key).toEqual('1');
    expect(result.label).toEqual('SECTIONS.SEC_1');
    expect(result.selectable).toBeTrue();
    expect(result.children).toEqual(volumeNodes);
  });

  it('should create volume nodes correctly', () => {
    const workNodes: TreeNode[] = [{ key: 'key' }];
    const result = sut['createVolumeNode'](1, Testdata.volume, true, workNodes);
    expect(result.key).toEqual('1-1');
    expect(result.label).toEqual('VOLUMES.VOL_1');
    expect(result.selectable).toBeTrue();
    expect(result.children).toEqual(workNodes);
  });

  it('should create work nodes correctly', () => {
    const result = sut['createWorkNode'](1, Testdata.work);
    expect(result.key).toEqual('1-1-1');
    expect(result.label).toEqual('WORKS.ABC');
    expect(result.selectable).toBeTrue();
    expect(result.data).toEqual(Testdata.work);
  });

  it('should create nodes correctly', (done) => {
    const works = [
      Testdata.work,
      Testdata.work2,
      {
        id: 3,
        code: 'Work 3',
        ordinal: 0,
        volumeId: 3,
      },
    ];
    const volumeById = new Map<number, Volume>([
      [1, Testdata.volume],
      [2, { id: 2, section: 2 }],
      [3, { id: 3, section: 3 }],
    ]);

    // GIVEN
    works$.next(works);
    volumeById$.next(volumeById);

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
    const volumeById = new Map<number, Volume>([
      [1, Testdata.volume],
      [2, { id: 2, section: 2 }],
      [3, { id: 3, section: 3 }],
    ]);

    // GIVEN
    works$.next(works);
    volumeById$.next(volumeById);

    // WHEN
    sut.buildNodes(true);

    // THEN
    sut.nodes$.subscribe((nodes) => {
      expect(nodes).toHaveSize(0);
      done();
    });
  });

  it('should create no nodes when no volume is found', (done) => {
    const works = [Testdata.work];
    const volumeById = new Map<number, Volume>([]);

    // GIVEN
    works$.next(works);
    volumeById$.next(volumeById);

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
    works$.next(works);
    volumeById$.next(volumeById);

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
    works$.next(works);
    volumeById$.next(volumeById);
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
    works$.next(works);
    volumeById$.next(volumeById);
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
