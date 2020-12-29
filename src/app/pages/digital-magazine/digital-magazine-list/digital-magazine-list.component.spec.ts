import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalMagazineListComponent } from './digital-magazine-list.component';

describe('DigitalMagazineListComponent', () => {
  let component: DigitalMagazineListComponent;
  let fixture: ComponentFixture<DigitalMagazineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalMagazineListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalMagazineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
