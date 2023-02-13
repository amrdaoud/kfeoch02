import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTemplateWithPostsComponent } from './page-template-with-posts.component';

describe('PageTemplateWithPostsComponent', () => {
  let component: PageTemplateWithPostsComponent;
  let fixture: ComponentFixture<PageTemplateWithPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTemplateWithPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTemplateWithPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
