import { TestBed } from '@angular/core/testing';

import { GetrecaladaintheportService } from './getrecaladaintheport.service';

describe('GetrecaladaintheportService', () => {
  let service: GetrecaladaintheportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetrecaladaintheportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
