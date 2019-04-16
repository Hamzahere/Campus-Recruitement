import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestudentprofileComponent } from './createstudentprofile.component';

describe('CreatestudentprofileComponent', () => {
  let component: CreatestudentprofileComponent;
  let fixture: ComponentFixture<CreatestudentprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatestudentprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatestudentprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
