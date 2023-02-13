import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTemplateNewsPostComponent } from './page-template-news-post.component';

describe('PageTemplateNewsPostComponent', () => {
  let component: PageTemplateNewsPostComponent;
  let fixture: ComponentFixture<PageTemplateNewsPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTemplateNewsPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTemplateNewsPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
