import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTemplateWithPhotoComponent } from './page-template-with-photo.component';

describe('PageTemplateWithPhotoComponent', () => {
  let component: PageTemplateWithPhotoComponent;
  let fixture: ComponentFixture<PageTemplateWithPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTemplateWithPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTemplateWithPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
