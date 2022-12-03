import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeMembersNavComponent } from './office-members-nav.component';

describe('OfficeMembersNavComponent', () => {
  let component: OfficeMembersNavComponent;
  let fixture: ComponentFixture<OfficeMembersNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeMembersNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeMembersNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
