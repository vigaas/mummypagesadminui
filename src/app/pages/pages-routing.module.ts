import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'article',
        loadChildren: () =>
          import('./article/article.module').then((m) => m.ArticleModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'mpdirectory',
        loadChildren: () =>
          import('./mp-directory/mp-directory.module').then((m) => m.MpDirectoryModule),
      },
      {
        path: 'digital-magazine',
        loadChildren: () =>
          import('./digital-magazine/digital-magazine.module').then((m) => m.DigitalMagazineModule),
      },
      {
        path: '',
        redirectTo: 'article',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'errors/404',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
