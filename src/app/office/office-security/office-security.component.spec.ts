import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSecurityComponent } from './office-security.component';

describe('OfficeSecurityComponent', () => {
  let component: OfficeSecurityComponent;
  let fixture: ComponentFixture<OfficeSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeSecurityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
