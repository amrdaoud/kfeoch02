import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLicenseNavComponent } from './admin-license-nav.component';

describe('AdminLicenseNavComponent', () => {
  let component: AdminLicenseNavComponent;
  let fixture: ComponentFixture<AdminLicenseNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLicenseNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLicenseNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
