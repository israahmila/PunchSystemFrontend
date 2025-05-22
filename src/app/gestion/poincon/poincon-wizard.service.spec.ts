import { TestBed } from '@angular/core/testing';

import { PoinconWizardService } from './poincon-wizard.service';

describe('PoinconWizardService', () => {
  let service: PoinconWizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoinconWizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
