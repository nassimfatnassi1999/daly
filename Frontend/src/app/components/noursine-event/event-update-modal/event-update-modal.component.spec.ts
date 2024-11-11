import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUpdateModalComponent } from './event-update-modal.component';

describe('EventUpdateModalComponent', () => {
  let component: EventUpdateModalComponent;
  let fixture: ComponentFixture<EventUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventUpdateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
