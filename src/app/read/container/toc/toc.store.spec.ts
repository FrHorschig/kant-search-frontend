import { TestBed } from '@angular/core/testing';
import { TocStore } from './toc.store';

describe('TocStore', () => {
  let store: TocStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TocStore],
    });

    store = TestBed.inject(TocStore);
  });
});
