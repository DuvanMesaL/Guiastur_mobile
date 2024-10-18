import { TestBed } from '@angular/core/testing';

import { CreateAtencionService } from './create-atencion.service';

describe('CreateAtencionService', () => {
  let service: CreateAtencionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAtencionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
