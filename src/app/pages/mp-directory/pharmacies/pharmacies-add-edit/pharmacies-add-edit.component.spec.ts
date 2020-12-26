import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaciesAddEditComponent } from './pharmacies-add-edit.component';

describe('PharmaciesAddEditComponent', () => {
  let component: PharmaciesAddEditComponent;
  let fixture: ComponentFixture<PharmaciesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmaciesAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaciesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
