import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../modules/auth/_services/apiservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {
  public userData = {
      children: [],
      iamUserDetails: { }
  };
  constructor(public router: Router,  public apiservice: ApiserviceService, public activeroute: ActivatedRoute, ) { }


  ngOnInit(): void {
    this._getClinicById();
  }

  private _getClinicById(): void {
    this.apiservice.apigetcall(`users`, {}).subscribe(resp => {
      if (resp) {
       this.userData = resp;
       console.log('clinics', this.userData);
      }
    });
  }
}
