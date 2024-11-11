import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFeedbackComponent } from './find-feedback.component';

describe('FindFeedbackComponent', () => {
  let component: FindFeedbackComponent;
  let fixture: ComponentFixture<FindFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
