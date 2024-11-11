import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBackEventComponent } from './list-back-event.component';

describe('ListBackEventComponent', () => {
  let component: ListBackEventComponent;
  let fixture: ComponentFixture<ListBackEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBackEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBackEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
