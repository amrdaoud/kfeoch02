import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseFormAddComponent } from './license-form-add.component';

describe('LicenseFormAddComponent', () => {
  let component: LicenseFormAddComponent;
  let fixture: ComponentFixture<LicenseFormAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseFormAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
