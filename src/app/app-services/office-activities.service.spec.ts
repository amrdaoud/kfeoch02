import { TestBed } from '@angular/core/testing';

import { OfficeActivitiesService } from './office-activities.service';

describe('OfficeActivitiesService', () => {
  let service: OfficeActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
