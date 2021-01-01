import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DasboardModuleComponent } from './dasboard-module.component';

const routes: Routes = [
  {
    path: '',
    component: DasboardModuleComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];
@NgModule({
  declarations: [DashboardComponent, DasboardModuleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class DashboardModule {}
