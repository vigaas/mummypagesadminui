import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {
  public apiData: any = {};


  constructor(public apiservice: ApiserviceService) { }

  ngOnInit(): void {
    this.getHospitals();
  }

  public getHospitals(): void {
    this.apiservice
      .apigetcall('hospitals', {})
      .subscribe(resp => {
        if (resp) {
          this.apiData.hospitalData = resp;
        }
      });
  }

  public deleteHospital(hospitalId: string)  {
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
        this.apiservice.apideletecall(`hospitals/${hospitalId}`, {})
        .subscribe(resp => {
          if (resp) {
            this.getHospitals();
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
