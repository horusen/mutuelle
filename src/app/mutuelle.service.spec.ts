import { TestBed } from '@angular/core/testing';

import { MutuelleService } from './mutuelle.service';

describe('MutuelleService', () => {
  let service: MutuelleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutuelleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
