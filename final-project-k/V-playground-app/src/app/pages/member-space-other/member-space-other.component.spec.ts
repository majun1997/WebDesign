import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSpaceOtherComponent } from './member-space-other.component';

describe('MemberSpaceOtherComponent', () => {
  let component: MemberSpaceOtherComponent;
  let fixture: ComponentFixture<MemberSpaceOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberSpaceOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSpaceOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
