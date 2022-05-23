import { TestBed } from '@angular/core/testing';

import { MutuelleDeSanteService } from './mutuelle-de-sante.service';

describe('MutuelleDeSanteService', () => {
  let service: MutuelleDeSanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutuelleDeSanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
