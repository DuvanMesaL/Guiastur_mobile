import { TestBed } from '@angular/core/testing';

import { GetbuqueService } from './getbuque.service';

describe('GetbuqueService', () => {
  let service: GetbuqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetbuqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
