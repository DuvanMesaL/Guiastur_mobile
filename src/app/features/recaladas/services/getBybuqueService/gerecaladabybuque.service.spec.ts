import { TestBed } from '@angular/core/testing';

import { GerecaladabybuqueService } from './gerecaladabybuque.service';

describe('GerecaladabybuqueService', () => {
  let service: GerecaladabybuqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerecaladabybuqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
