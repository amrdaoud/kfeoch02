import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeMemberListComponent } from './office-member-list.component';

describe('OfficeMemberListComponent', () => {
  let component: OfficeMemberListComponent;
  let fixture: ComponentFixture<OfficeMemberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeMemberListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
