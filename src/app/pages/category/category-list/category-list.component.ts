import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../modules/auth/_services/apiservice.service';

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

  public deleteCategory(categoryId: string) {
    this.apiservice
      .apideletecall(`category/${categoryId}`, {})
      .subscribe(resp => {
        if (resp) {
        this.getCategory();
        }
      });
  }

}
