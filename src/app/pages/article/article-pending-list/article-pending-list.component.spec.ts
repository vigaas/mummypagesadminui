import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePendingListComponent } from './article-pending-list.component';

describe('ArticlePendingListComponent', () => {
  let component: ArticlePendingListComponent;
  let fixture: ComponentFixture<ArticlePendingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlePendingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
