import { TestBed } from '@angular/core/testing';

import { WorksLoadedService } from './works-guard.guard';

// TODO frhorsch: add tests for works-guard

describe('WorksLoadedService', () => {
  let service: WorksLoadedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorksLoadedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
