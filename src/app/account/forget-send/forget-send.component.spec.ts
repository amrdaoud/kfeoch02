import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetSendComponent } from './forget-send.component';

describe('ForgetSendComponent', () => {
  let component: ForgetSendComponent;
  let fixture: ComponentFixture<ForgetSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetSendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
