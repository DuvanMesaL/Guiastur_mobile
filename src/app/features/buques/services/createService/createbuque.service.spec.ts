import { TestBed } from '@angular/core/testing';

import { CreatebuqueService } from './createbuque.service';

describe('CreatebuqueService', () => {
  let service: CreatebuqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatebuqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
