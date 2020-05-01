import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerHomeComponent } from './examiner-home.component';

describe('ExaminerHomeComponent', () => {
  let component: ExaminerHomeComponent;
  let fixture: ComponentFixture<ExaminerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
