import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingLicensesComponent } from './admin-pending-licenses.component';

describe('AdminPendingLicensesComponent', () => {
  let component: AdminPendingLicensesComponent;
  let fixture: ComponentFixture<AdminPendingLicensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPendingLicensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPendingLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
