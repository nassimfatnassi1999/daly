import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAllergieComponent } from './detail-allergie.component';

describe('DetailAllergieComponent', () => {
  let component: DetailAllergieComponent;
  let fixture: ComponentFixture<DetailAllergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAllergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAllergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
