import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsAddEditComponent } from './clinics-add-edit.component';

describe('ClinicsAddEditComponent', () => {
  let component: ClinicsAddEditComponent;
  let fixture: ComponentFixture<ClinicsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicsAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
