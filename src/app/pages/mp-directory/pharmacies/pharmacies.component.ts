import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './pharmacies.component.html',
  styleUrls: ['./pharmacies.component.scss']
})
export class PharmaciesComponent implements OnInit {

  public apiData: any = {};
  constructor(public apiservice: ApiserviceService) { }


  ngOnInit(): void {
    this.getPharmacies();
  }

  public getPharmacies(): void {
    this.apiservice
      .apigetcall('pharmacies', {})
      .subscribe(resp => {
        if (resp) {
          this.apiData.pharmaciesData = resp;
        }
      });
  }

  public deletePharmacies(pharmaciesId: string) {
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
      .apideletecall(`pharmacies/${pharmaciesId}`, {})
        .subscribe(resp => {
          if (resp) {
            this.getPharmacies();
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
