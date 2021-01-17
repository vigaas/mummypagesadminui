import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleAddEditComponent } from './article-add-edit/article-add-edit.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ArticlePendingListComponent } from './article-pending-list/article-pending-list.component';
import { ArticleAddRelatedProductComponent } from './article-add-related-product/article-add-related-product.component';
import { NgxFroalaModule } from 'ngx-froala';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    children: [
      {
        path: '',
        component: ArticleListComponent
      },
      {
        path: 'add',
        component: ArticleAddEditComponent
      },
      {
        path: 'edit/:articleId',
        component: ArticleAddEditComponent
      },
      {
        path: 'delete/:articleId',
        component: ArticleAddEditComponent
      },
      {
        path: 'pending-approval',
        component: ArticlePendingListComponent
      },
      {
        path: 'add-related-product/:articleId',
        component: ArticleAddRelatedProductComponent
      },
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleAddEditComponent,
    ArticleListComponent,
    ArticlePendingListComponent,
    ArticleAddRelatedProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgxFroalaModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ArticleModule {}
