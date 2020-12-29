import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalMagazineComponent } from './digital-magazine.component';

describe('DigitalMagazineComponent', () => {
  let component: DigitalMagazineComponent;
  let fixture: ComponentFixture<DigitalMagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalMagazineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
