import { TestBed } from '@angular/core/testing';

import { CadastreService } from './cadastre.service';

describe('CadastreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastreService = TestBed.get(CadastreService);
    expect(service).toBeTruthy();
  });
});
