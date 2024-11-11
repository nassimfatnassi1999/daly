import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcontactComponent } from './listcontact.component';

describe('ListcontactComponent', () => {
  let component: ListcontactComponent;
  let fixture: ComponentFixture<ListcontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcontactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
