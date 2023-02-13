import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseFormEditComponent } from './license-form-edit.component';

describe('LicenseFormEditComponent', () => {
  let component: LicenseFormEditComponent;
  let fixture: ComponentFixture<LicenseFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseFormEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
