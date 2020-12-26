import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifesComponent } from './midwifes.component';

describe('MidwifesComponent', () => {
  let component: MidwifesComponent;
  let fixture: ComponentFixture<MidwifesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidwifesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
