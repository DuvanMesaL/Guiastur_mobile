import { TestBed } from '@angular/core/testing';

import { GetrecaladaService } from './getrecalada.service';

describe('GetrecaladaService', () => {
  let service: GetrecaladaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetrecaladaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
