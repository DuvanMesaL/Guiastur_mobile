import { TestBed } from '@angular/core/testing';

import { CreaterecaladaService } from './createrecalada.service';

describe('CreaterecaladaService', () => {
  let service: CreaterecaladaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreaterecaladaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
