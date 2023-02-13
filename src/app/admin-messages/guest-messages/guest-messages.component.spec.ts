import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestMessagesComponent } from './guest-messages.component';

describe('GuestMessagesComponent', () => {
  let component: GuestMessagesComponent;
  let fixture: ComponentFixture<GuestMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
