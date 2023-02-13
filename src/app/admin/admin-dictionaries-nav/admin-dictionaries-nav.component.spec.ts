import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDictionariesNavComponent } from './admin-dictionaries-nav.component';

describe('AdminDictionariesNavComponent', () => {
  let component: AdminDictionariesNavComponent;
  let fixture: ComponentFixture<AdminDictionariesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDictionariesNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDictionariesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
