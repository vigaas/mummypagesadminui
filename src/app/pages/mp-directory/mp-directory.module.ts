import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalComponent } from './hospital/hospital.component';
import { HospitalAddEditComponent } from './hospital/hospital-add-edit/hospital-add-edit.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorAddEditComponent } from './doctor/doctor-add-edit/doctor-add-edit.component';
import { MidwifesComponent } from './midwifes/midwifes.component';
import { MidwifesAddEditComponent } from './midwifes/midwifes-add-edit/midwifes-add-edit.component';
import { ClinicsComponent } from './clinics/clinics.component';
import { ClinicsAddEditComponent } from './clinics/clinics-add-edit/clinics-add-edit.component';
import { PharmaciesComponent } from './pharmacies/pharmacies.component';
import { PharmaciesAddEditComponent } from './pharmacies/pharmacies-add-edit/pharmacies-add-edit.component';
import { MpDirectoryComponent } from './mp-directory.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: MpDirectoryComponent,
    children: [
      {
        path: 'hospital',
        component: HospitalComponent
      },
      {
        path: 'hospital/add',
        component: HospitalAddEditComponent
      },
      {
        path: 'hospital/edit/:hospitalId',
        component: HospitalAddEditComponent
      },
      {
        path: 'doctor',
        component: DoctorComponent
      },
      {
        path: 'doctor/add',
        component: DoctorAddEditComponent
      },
      {
        path: 'doctor/edit/:doctorId',
        component: DoctorAddEditComponent
      },
      {
        path: 'midwifes',
        component: MidwifesComponent
      },
      {
        path: 'midwifes/add',
        component: MidwifesAddEditComponent
      },
      {
        path: 'midwifes/edit/:midwifesId',
        component: MidwifesAddEditComponent
      },
      {
        path: 'clinics',
        component: ClinicsComponent
      },
      {
        path: 'clinics/add',
        component: ClinicsAddEditComponent
      },
      {
        path: 'clinics/edit/:clinicsId',
        component: ClinicsAddEditComponent
      },
      {
        path: 'pharmacies',
        component: PharmaciesComponent
      },
      {
        path: 'pharmacies/add',
        component: PharmaciesAddEditComponent
      },
      {
        path: 'pharmacies/edit/:pharmaciesId',
        component: PharmaciesAddEditComponent
      },
       {
        path: 'language',
        component: SettingsComponent
      },
      { path: '', redirectTo: 'hospital', pathMatch: 'full' },
      { path: '**', redirectTo: 'hospital', pathMatch: 'full' }
    ]
  }
];


@NgModule({
// tslint:disable-next-line: max-line-length
  declarations: [MpDirectoryComponent, HospitalComponent, HospitalAddEditComponent, DoctorComponent, DoctorAddEditComponent, MidwifesComponent, MidwifesAddEditComponent, ClinicsComponent, ClinicsAddEditComponent, PharmaciesComponent, PharmaciesAddEditComponent, SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class MpDirectoryModule { }
