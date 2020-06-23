import { TestBed } from '@angular/core/testing';

import { DirectoryListsService } from './directory-lists.service';

describe('DirectoryListsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DirectoryListsService = TestBed.get(DirectoryListsService);
    expect(service).toBeTruthy();
  });
});
