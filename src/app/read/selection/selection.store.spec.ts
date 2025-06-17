import { TestBed } from '@angular/core/testing';
import { SelectionStore } from './selection.store';
import { of, Subject } from 'rxjs';
import { VolumesStore } from 'src/app/store/volumes/volumes.store';
import { LanguageStore } from 'src/app/store/language/language.store';
import { TranslateService } from '@ngx-translate/core';
import { MockVolumesStore } from 'src/app/store/volumes/volumes.store.spec';
import { createTranslateServiceSpy } from 'src/app/common/test/services';
import { MockLanguageStore } from 'src/app/store/language/language.store.spec';
import { Testdata } from 'src/app/common/test/testdata';
import { Volume } from '@frhorschig/kant-search-api';

describe('SelectionStore', () => {
  let store: SelectionStore;
  let mockVolumesStore: MockVolumesStore;
  let mockLanguageStore: MockLanguageStore;
  let mockTranslateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    mockVolumesStore = new MockVolumesStore();
    mockLanguageStore = new MockLanguageStore();
    mockTranslateService = createTranslateServiceSpy();

    TestBed.configureTestingModule({
      providers: [
        SelectionStore,
        { provide: VolumesStore, useValue: mockVolumesStore },
        { provide: LanguageStore, useValue: mockLanguageStore },
        { provide: TranslateService, useValue: mockTranslateService },
      ],
    });

    store = TestBed.inject(SelectionStore);
  });

  it('should create nodes when init is triggered', () => {
    const mockVolumes = [Testdata.volume, Testdata.volume2];
    mockVolumes[0].works = [Testdata.work, Testdata.work2];
    mockVolumes[1].works = [Testdata.work3];

    mockVolumesStore.volumes$ = of(mockVolumes);
    mockLanguageStore.ready$ = of(true);
    mockTranslateService.instant.and.callFake((_, params: Volume) => {
      return `${params.volumeNumber}: ${params.title}`;
    });

    store.init();

    store.nodes$.subscribe((nodes) => {
      expect(nodes.length).toEqual(2);
      const v1 = nodes[0];
      expect(v1.children?.length).toEqual(2);
      expect(v1.title).toEqual(
        `${mockVolumes[0].volumeNumber}: ${mockVolumes[0].title}`
      );
      expect(v1.key).toEqual(`volume-${mockVolumes[0].volumeNumber}`);
      const w1 = v1.children?.at(0);
      expect(w1?.title).toEqual(Testdata.work.title);
      expect(w1?.key).toEqual(Testdata.work.code);
      const w2 = v1.children?.at(1);
      expect(w2?.title).toEqual(Testdata.work2.title);
      expect(w2?.key).toEqual(Testdata.work2.code);

      const v2 = nodes[1];
      expect(v2.children?.length).toEqual(1);
      expect(v2.title).toEqual(
        `${mockVolumes[1].volumeNumber}: ${mockVolumes[1].title}`
      );
      expect(v2.key).toEqual(`volume-${mockVolumes[1].volumeNumber}`);
      const w3 = v2.children?.at(0);
      expect(w3?.title).toEqual(Testdata.work3.title);
      expect(w3?.key).toEqual(Testdata.work3.code);
    });
  });
});
