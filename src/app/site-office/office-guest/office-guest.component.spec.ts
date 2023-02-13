import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeGuestComponent } from './office-guest.component';

describe('OfficeGuestComponent', () => {
  let component: OfficeGuestComponent;
  let fixture: ComponentFixture<OfficeGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeGuestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
