import { TestBed } from '@angular/core/testing';

import { TypeDeMutuelleService } from './type-de-mutuelle.service';

describe('TypeDeMutuelleService', () => {
  let service: TypeDeMutuelleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDeMutuelleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
