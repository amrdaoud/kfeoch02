import { TestBed } from '@angular/core/testing';

import { OfficeContactListService } from './office-contact-list.service';

describe('OfficeContactListService', () => {
  let service: OfficeContactListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeContactListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
