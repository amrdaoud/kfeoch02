import { TestBed } from '@angular/core/testing';

import { OfficeLicenseService } from './office-license.service';

describe('OfficeLicenseService', () => {
  let service: OfficeLicenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeLicenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
