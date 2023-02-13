import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationAddComponent } from './information-add.component';

describe('InformationAddComponent', () => {
  let component: InformationAddComponent;
  let fixture: ComponentFixture<InformationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
