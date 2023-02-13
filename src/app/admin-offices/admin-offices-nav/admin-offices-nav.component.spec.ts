import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOfficesNavComponent } from './admin-offices-nav.component';

describe('AdminOfficesNavComponent', () => {
  let component: AdminOfficesNavComponent;
  let fixture: ComponentFixture<AdminOfficesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOfficesNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOfficesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
