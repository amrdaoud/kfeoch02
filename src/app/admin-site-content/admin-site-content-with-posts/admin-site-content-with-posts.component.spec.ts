import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSiteContentWithPostsComponent } from './admin-site-content-with-posts.component';

describe('AdminSiteContentWithPostsComponent', () => {
  let component: AdminSiteContentWithPostsComponent;
  let fixture: ComponentFixture<AdminSiteContentWithPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSiteContentWithPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSiteContentWithPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
