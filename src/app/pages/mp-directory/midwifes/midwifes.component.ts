import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-midwifes',
  templateUrl: './midwifes.component.html',
  styleUrls: ['./midwifes.component.scss']
})
export class MidwifesComponent implements OnInit {
  public apiData: any = {};
  constructor(public apiservice: ApiserviceService) { }

  ngOnInit(): void {
    this.getMidWifes();
  }

  public getMidWifes(): void {
    this.apiservice
      .apigetcall('midwifes', {})
      .subscribe(resp => {
        if (resp) {
          this.apiData.midWifesData = resp;
        }
      });
  }

  public deleteMidWifes(midwifesId: string) {
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
      .apideletecall(`midwifes/${midwifesId}`, {})
        .subscribe(resp => {
          if (resp) {
            this.getMidWifes();
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
