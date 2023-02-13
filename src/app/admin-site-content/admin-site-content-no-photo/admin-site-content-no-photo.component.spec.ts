import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSiteContentNoPhotoComponent } from './admin-site-content-no-photo.component';

describe('AdminSiteContentNoPhotoComponent', () => {
  let component: AdminSiteContentNoPhotoComponent;
  let fixture: ComponentFixture<AdminSiteContentNoPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSiteContentNoPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSiteContentNoPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
