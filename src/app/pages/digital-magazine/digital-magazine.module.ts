import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalMagazineComponent } from './digital-magazine.component';
import { DigitalMagazineListComponent } from './digital-magazine-list/digital-magazine-list.component';
import { DigitalMagazineAddEditComponent } from './digital-magazine-add-edit/digital-magazine-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DigitalMagazineComponent,
    children: [
      {
        path: 'list',
        component: DigitalMagazineListComponent
      },
      {
        path: 'add',
        component: DigitalMagazineAddEditComponent
      },
      {
        path: 'edit/:digitalMagazineId',
        component: DigitalMagazineAddEditComponent
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [DigitalMagazineComponent, DigitalMagazineListComponent, DigitalMagazineAddEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DigitalMagazineModule { }
