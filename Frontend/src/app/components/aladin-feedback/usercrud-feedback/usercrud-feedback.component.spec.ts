import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercrudFeedbackComponent } from './usercrud-feedback.component';

describe('UsercrudFeedbackComponent', () => {
  let component: UsercrudFeedbackComponent;
  let fixture: ComponentFixture<UsercrudFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsercrudFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsercrudFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
