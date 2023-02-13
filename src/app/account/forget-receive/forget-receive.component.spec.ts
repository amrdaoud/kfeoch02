import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetReceiveComponent } from './forget-receive.component';

describe('ForgetReceiveComponent', () => {
  let component: ForgetReceiveComponent;
  let fixture: ComponentFixture<ForgetReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetReceiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
