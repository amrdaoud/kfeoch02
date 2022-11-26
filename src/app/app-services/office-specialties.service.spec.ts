import { TestBed } from '@angular/core/testing';

import { OfficeSpecialtiesService } from './office-specialties.service';

describe('OfficeSpecialtiesService', () => {
  let service: OfficeSpecialtiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeSpecialtiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
