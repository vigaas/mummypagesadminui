import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifesAddEditComponent } from './midwifes-add-edit.component';

describe('MidwifesAddEditComponent', () => {
  let component: MidwifesAddEditComponent;
  let fixture: ComponentFixture<MidwifesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifesAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
