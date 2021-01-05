import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './dashboards.component';
import { DasboardsModuleComponent } from './dasboards-module.component';

const routes: Routes = [
  {
    path: '',
    component: DasboardsModuleComponent,
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
  declarations: [DashboardsComponent, DasboardsModuleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class DashboardsModule {}
