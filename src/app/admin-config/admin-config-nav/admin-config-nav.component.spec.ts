import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfigNavComponent } from './admin-config-nav.component';

describe('AdminConfigNavComponent', () => {
  let component: AdminConfigNavComponent;
  let fixture: ComponentFixture<AdminConfigNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminConfigNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminConfigNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
