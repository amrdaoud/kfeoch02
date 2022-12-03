import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameHolderComponent } from './name-holder.component';

describe('NameHolderComponent', () => {
  let component: NameHolderComponent;
  let fixture: ComponentFixture<NameHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameHolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
