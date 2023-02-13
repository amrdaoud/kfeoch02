import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDictionaryComponent } from './admin-dictionary.component';

describe('AdminDictionaryComponent', () => {
  let component: AdminDictionaryComponent;
  let fixture: ComponentFixture<AdminDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDictionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
