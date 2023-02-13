import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTemplateNewsComponent } from './page-template-news.component';

describe('PageTemplateNewsComponent', () => {
  let component: PageTemplateNewsComponent;
  let fixture: ComponentFixture<PageTemplateNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTemplateNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTemplateNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
