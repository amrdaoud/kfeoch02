import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSiteContentWithPhotoComponent } from './admin-site-content-with-photo.component';

describe('AdminSiteContentWithPhotoComponent', () => {
  let component: AdminSiteContentWithPhotoComponent;
  let fixture: ComponentFixture<AdminSiteContentWithPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSiteContentWithPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSiteContentWithPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
