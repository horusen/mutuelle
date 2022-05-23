import { TestBed } from '@angular/core/testing';

import { RecapitulatifService } from './recapitulatif.service';

describe('RecapitulatifService', () => {
  let service: RecapitulatifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecapitulatifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
