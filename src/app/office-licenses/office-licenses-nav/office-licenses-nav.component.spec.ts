import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeLicensesNavComponent } from './office-licenses-nav.component';

describe('OfficeLicensesNavComponent', () => {
  let component: OfficeLicensesNavComponent;
  let fixture: ComponentFixture<OfficeLicensesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeLicensesNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeLicensesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
