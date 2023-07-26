import { TestBed } from '@angular/core/testing';

import { WorkTreeBuilderService } from './work-tree-builder.service';

describe('WorkTreeBuilderService', () => {
  let service: WorkTreeBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkTreeBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
