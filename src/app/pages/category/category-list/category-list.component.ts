import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  public apiData: any = {};
  constructor(public apiservice: ApiserviceService,
    ) {


     }

  ngOnInit(): void {
    this.getCategory();
  }

  public getCategory(): void {
    this.apiservice
      .apigetcall('category', {})
      .subscribe(resp => {
        if (resp) {
          this.apiData.categoryData = resp;
        }
      });
  }

  public deleteCategory(id: string) {
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
      .apideletecall(`category/${id}`, {})
        .subscribe(resp => {
          if (resp) {
            this.getCategory();
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
