import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-digital-magazine-list',
  templateUrl: './digital-magazine-list.component.html',
  styleUrls: ['./digital-magazine-list.component.scss']
})
export class DigitalMagazineListComponent implements OnInit {
  public apiData: any = {};
  constructor(public apiservice: ApiserviceService) { }

  ngOnInit(): void {
    this._getDigitalMagazines();
  }

  public _getDigitalMagazines(): void {
    this.apiservice
      .apigetcall('magazines', {})
      .subscribe(resp => {
        if (resp) {
          this.apiData.digitalMagazineData = resp.map(data => {
            return{
              title: data.title,
              description : data.description,
              image : data.thumbnailImage,
              id : data._id,
              downloadLink: data.magazinePDF
            };
          });
        }
      });
  }

  public deletePharmacies(id: string) {
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
      .apideletecall(`magazines/${id}`, {})
        .subscribe(resp => {
          if (resp) {
            this._getDigitalMagazines();
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
