import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAddRelatedProductComponent } from './article-add-related-product.component';

describe('ArticleAddRelatedProductComponent', () => {
  let component: ArticleAddRelatedProductComponent;
  let fixture: ComponentFixture<ArticleAddRelatedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleAddRelatedProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAddRelatedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
