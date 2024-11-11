import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllergieComponent } from './add-allergie.component';

describe('AddAllergieComponent', () => {
  let component: AddAllergieComponent;
  let fixture: ComponentFixture<AddAllergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAllergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAllergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
