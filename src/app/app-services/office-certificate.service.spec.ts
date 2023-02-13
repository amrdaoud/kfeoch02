import { TestBed } from '@angular/core/testing';

import { OfficeCertificateService } from './office-certificate.service';

describe('OfficeCertificateService', () => {
  let service: OfficeCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
