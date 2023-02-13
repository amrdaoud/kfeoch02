import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSiteContentNavComponent } from './admin-site-content-nav.component';

describe('AdminSiteContentNavComponent', () => {
  let component: AdminSiteContentNavComponent;
  let fixture: ComponentFixture<AdminSiteContentNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSiteContentNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSiteContentNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
