import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeCertificatesNavComponent } from './office-certificates-nav.component';

describe('OfficeCertificatesNavComponent', () => {
  let component: OfficeCertificatesNavComponent;
  let fixture: ComponentFixture<OfficeCertificatesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeCertificatesNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeCertificatesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
