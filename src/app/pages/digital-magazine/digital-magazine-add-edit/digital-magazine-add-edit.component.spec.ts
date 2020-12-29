import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalMagazineAddEditComponent } from './digital-magazine-add-edit.component';

describe('DigitalMagazineAddEditComponent', () => {
  let component: DigitalMagazineAddEditComponent;
  let fixture: ComponentFixture<DigitalMagazineAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalMagazineAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalMagazineAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
