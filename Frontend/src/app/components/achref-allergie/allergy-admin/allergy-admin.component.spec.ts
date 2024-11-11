import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyAdminComponent } from './allergy-admin.component';

describe('AllergyAdminComponent', () => {
  let component: AllergyAdminComponent;
  let fixture: ComponentFixture<AllergyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergyAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllergyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
