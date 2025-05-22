import { TestBed } from '@angular/core/testing';

import { PoinconService } from './poincon.service';

describe('PoinconService', () => {
  let service: PoinconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoinconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
