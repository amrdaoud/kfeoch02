import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSiteContentVideosComponent } from './admin-site-content-videos.component';

describe('AdminSiteContentVideosComponent', () => {
  let component: AdminSiteContentVideosComponent;
  let fixture: ComponentFixture<AdminSiteContentVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSiteContentVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSiteContentVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
