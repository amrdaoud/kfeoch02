import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportsNavComponent } from './admin-reports-nav.component';

describe('AdminReportsNavComponent', () => {
  let component: AdminReportsNavComponent;
  let fixture: ComponentFixture<AdminReportsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReportsNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReportsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
