import { TestBed } from '@angular/core/testing';

import { SocketEmitFileService } from './socket-emit-file.service';

describe('SocketEmitFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketEmitFileService = TestBed.get(SocketEmitFileService);
    expect(service).toBeTruthy();
  });
});
