import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpDirectoryComponent } from './mp-directory.component';

describe('MpDirectoryComponent', () => {
  let component: MpDirectoryComponent;
  let fixture: ComponentFixture<MpDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpDirectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
