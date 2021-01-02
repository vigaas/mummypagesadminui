import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './dashboards.component';
import { DasboardModuleComponent } from './dasboards-module.component';

const routes: Routes = [
  {
    path: '',
    component: DasboardModuleComponent,
    children: [
      {
        path: '',
        component: DashboardsComponent
      },
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];
@NgModule({
  declarations: [DashboardsComponent, DasboardModuleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class DashboardModule {}
