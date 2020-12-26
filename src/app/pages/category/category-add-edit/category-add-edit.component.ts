import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../modules/auth/_services/apiservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.scss']
})
export class CategoryAddEditComponent implements OnInit {
  public categoryFormFields: any = {
    name: '',
    number: ''
  };
  public categoryId = this.activeroute.snapshot.paramMap.get('categoryId');

  constructor(
    public apiservice: ApiserviceService,
    public router: Router,
    public activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.categoryId) {
      this._getCategoryById();
    }
  }

  public onClickSaveCategory(form) {
    if (form.invalid) {
      return;
    }

    const payload = {
      name: this.categoryFormFields.name,
      number: this.categoryFormFields.number.toString()
    };
    if (this.categoryId){
      this.apiservice
      .apiputcall(`category/${this.categoryId}`, payload)
      .subscribe(results => {
        this.router.navigate(['/category']);
      });
    }
    else{
      this.apiservice
      .apipostcall('category', payload)
      .subscribe(results => {
        this.router.navigate(['/category']);
      });
    }
  }



  private _getCategoryById(): void {
    this.apiservice
      .apigetcall(`category/${this.categoryId}`, {})
      .subscribe(resp => {
        if (resp) {
          this.categoryFormFields = resp;
        }
      });
  }
}
