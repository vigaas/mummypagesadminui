import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  public apiData: any = {};
  constructor(public apiservice: ApiserviceService) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  public getDoctors(): void {
    this.apiservice
      .apigetcall('doctors', {})
      .subscribe(resp => {
        if (resp) {
          this.apiData.doctorData = resp;
        }
      });
  }

  public deleteDoctor(doctorId: string)  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiservice
        .apideletecall(`doctors/${doctorId}`, {})
        .subscribe(resp => {
          if (resp) {
            this.getDoctors();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
        }
      });
      }
    });
  }
}
