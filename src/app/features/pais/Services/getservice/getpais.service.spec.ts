import { TestBed } from '@angular/core/testing';

import { GetpaisService } from './getpais.service';

describe('GetpaisService', () => {
  let service: GetpaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetpaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
