import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleAddEditComponent } from './article-add-edit/article-add-edit.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleAddEditComponent,
    ArticleListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ArticleModule {}
