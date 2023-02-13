import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingLicenseFormComponent } from './admin-pending-license-form.component';

describe('AdminPendingLicenseFormComponent', () => {
  let component: AdminPendingLicenseFormComponent;
  let fixture: ComponentFixture<AdminPendingLicenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPendingLicenseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPendingLicenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
