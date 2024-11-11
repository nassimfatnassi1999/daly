import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailseventfrontComponent } from './detailseventfront.component';

describe('DetailseventfrontComponent', () => {
  let component: DetailseventfrontComponent;
  let fixture: ComponentFixture<DetailseventfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailseventfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailseventfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
