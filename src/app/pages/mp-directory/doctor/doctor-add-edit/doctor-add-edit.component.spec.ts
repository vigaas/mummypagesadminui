import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAddEditComponent } from './doctor-add-edit.component';

describe('DoctorAddEditComponent', () => {
  let component: DoctorAddEditComponent;
  let fixture: ComponentFixture<DoctorAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
