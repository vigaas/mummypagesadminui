import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';
import { AuthGuard } from '../modules/auth/_services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'article',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./article/article.module').then((m) => m.ArticleModule),
      },
      {
        path: 'category',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'mpdirectory',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./mp-directory/mp-directory.module').then((m) => m.MpDirectoryModule),
      },
      {
        path: 'digital-magazine',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./digital-magazine/digital-magazine.module').then((m) => m.DigitalMagazineModule),
      },
      {
        path: '',
        redirectTo: 'auth/login',
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
