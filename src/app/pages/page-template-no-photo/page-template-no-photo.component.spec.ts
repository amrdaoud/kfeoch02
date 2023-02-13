import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTemplateNoPhotoComponent } from './page-template-no-photo.component';

describe('PageTemplateNoPhotoComponent', () => {
  let component: PageTemplateNoPhotoComponent;
  let fixture: ComponentFixture<PageTemplateNoPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTemplateNoPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTemplateNoPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
