import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagesNavComponent } from './admin-messages-nav.component';

describe('AdminMessagesNavComponent', () => {
  let component: AdminMessagesNavComponent;
  let fixture: ComponentFixture<AdminMessagesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMessagesNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMessagesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
