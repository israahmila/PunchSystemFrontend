import { TestBed } from '@angular/core/testing';

import { UtilisationService } from './utilisation.service';

describe('UtilisationService', () => {
  let service: UtilisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
